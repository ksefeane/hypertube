import WebTorrent from 'webtorrent'
import fs from 'fs'
import { getExt, insertVideo, infoHash, sleep } from './videoModel'
import q from './query'

let client = new WebTorrent()
const dest = 'server/public/videos/'
const tpath = '/tmp/webtorrent/'

let error_message = ""

client.on('error', (err) => {
	error_message = err.message;
})

client.on('download', (bytes) => {
	let downloadSpeed = Number(client.downloadSpeed/1000).toFixed(1)+'kb/s'
//  process.stdout.write(downloadSpeed+'\r')
})

client.on('torrent', (tor) => {
    let progress = Number(tor.downloaded/1000000).toFixed(0)+'/'
        +Number(tor.length/1000000).toFixed(0)+' mb'
    let downloadSpeed = Number(client.downloadSpeed/1000).toFixed(1)+'kb/s'
    console.log('downloading '+tor.name)
//   process.stdout.write(downloadSpeed+'  '+tor.name+'\r')
})

export async function magnetUrl(param) {
  param.tr = param.tr.join(',')
  var con = Object.values(param)
  var magnet = con.join(',')
  return ('magnet:?xt='+magnet.replace(',',''))
}

export async function createMagnet(hash, name) {
    try {
        let url = encodeURI(name)
        let trackers = ''
        let track = ['udp://open.demonii.com:1337/announce', 'udp://tracker.openbittorrent.com:80', 'udp://tracker.coppersurfer.tk:6969', 'udp://glotorrents.pw:6969/announce']
        for (let i in track) {
            let uri = encodeURI(track[i])
            trackers += `&tr=${uri}`
        }
        let magnet = `magnet:?xt=urn:btih:${hash}&dn=${url}${trackers}`
        return (magnet)
    } catch (e) {console.log(e)}
    
}

export async function filterName(name) {
    let rep = name.replace(/\[.*?\]|\(.*?\)|.mkv|.mp4/g, '')
    return (rep)
}

export async function deleteTorrent(magnet) {
    var torrent = client.get(magnet)
    
    if (!torrent) 
      console.log('no torrent')
    else {
        var dir = tpath+torrent.infoHash
        torrent.destroy(() => {
            fs.rmdir(dir, { recursive: true }, (err) => {
                if (err) {
                    throw err;
                }
            })
        })
    }
    return (torrent ? `torrent ${torrent.infoHash} destroyed` : 'torrent does not exist')
}

export async function infoTorrent(magnet) {
    var torrent = client.get(magnet)
    var stat = {
      torrentpath: tpath,
      destination: '',
      size: '',
      downloaded: 0+' kb',
      downloadSpeed: Number(client.downloadSpeed/1000).toFixed(1)+'kb/s'
    }
    torrent.files.forEach((data) => {
      stat.torrentpath += torrent.infoHash
      stat.destination = dest+data.name
      stat.size = Number(data.length/100).toFixed(0)+' kb'
      stat.downloaded = Number(data.downloaded/100).toFixed(0)+' kb'
    })
    return (stat.destination.length > 0 ? stat : '\ninitializing torrent: '+torrent.infoHash)    
}

export async function downloadTorrent(magnet, title) {
    await sleep(7000)
    let info = []
    let tor = await streamable(magnet)
    if (tor.tor) {
        return (tor.tor.downloaded ? {'downloading':tor.video.name} : {'queue':tor.video.name})
    } else {
        client.add(magnet, (torrent) => {
            const files = torrent.files
            let len = files.length
            files.forEach(async (file) => {
                let ext = getExt(file.name)
                if (ext == '.mkv' || ext == '.mp4' || ext == 'avi') {
                    let db = await insertVideo(file.name, ext, torrent.infoHash, title)
                    if (db == 0) {
                        const stream = file.createReadStream()
                        const save = fs.createWriteStream(dest+file.name)
                        stream.on('end', async () => {
                            console.log('download finished')
                            let stat = await deleteTorrent(magnet)
                            console.log(stat)
                            len -= 1
                            if (!len)
                            process.exit
                        }).pipe(save)
                    } else {
                        let res = await deleteTorrent(magnet)
                        console.log(res)
                        console.log('movie already downloaded')
                        return ('movie already exists')
                    }                    
                }
            })
        })
        return ('initializing torrent...')
    }
}

export async function streamable(magnet) {
    let info = {}
    info.tor = client.get(magnet) ? client.get(magnet) : 0
    info.video = info.tor ? await infoHash(info.tor.infoHash) : {'name': 'waiting for download'}
    return (info)
}

export default client