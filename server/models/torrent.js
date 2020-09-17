import tor from 'torrent-stream'
import fs from 'fs'
import { 
    sleep, insertVideo, getExt, infoHash, 
} from './videoModel'

const dest = 'server/public/videos/'
const tpath = '/tmp/torrent-stream/'

let engine = null
let mag = null
let infohash = ''
let status = 'initialized'
let file_name = 'torrent'
let progress = 0

async function magnetBoy(magnet) {
    if (!mag) {
        mag = magnet
        engine = tor(mag)
    } else {
        if (mag !== magnet) {
            await killEngine()
            mag = magnet
            engine = tor(mag)
        }
    }
}

async function killEngine() {
    console.log(`killed torrent ${file_name}`)
    engine.remove(() => {})
    engine.destroy(() => {status = 'destroyed'})
    engine = null
    mag = null
    status = 'initialized'
    file_name = 'torrent'
    sleep(5000)
}

async function engineBoy(magnet, title) {
    await magnetBoy(magnet)
    engine.on('ready', () => {
        infohash = engine.infoHash
        console.log(infohash)
        status = 'queued'
        progress = `queued ${title}`
        let len = engine.files.length
        Promise.all(engine.files.map(async (file) => {
            let ext = getExt(file.name)
            let payload = {'title': title,'name':file.name,'ext':ext,'size':file.length,'hash':engine.infoHash}
            if (ext === '.mkv' || ext === '.mp4' || ext === '.avi') {
                let entry = await insertVideo(payload)
                file_name = file.name
                if (entry == 1) {
                    status = 'downloading'
                    let stream = file.createReadStream()
                    let save = fs.createWriteStream(dest+file.name)
                    stream.pipe(save)
                    stream.on('end', async () => {
                        console.log(`download finished (${file.name})`)
                        len--
                        if (!len) {
                            engine.on('idle', () => {status = 'finished'})
                            process.exit
                        }
                    })
                } else {
                    status = 'exists'
                }
            }
        }))
    })
    return ({'engine':engine,'status':status,'file_name':file_name})
}

export async function torrent(magnet, name) {
    let engine = await engineBoy(magnet, name)
    let methods = {
        info: async () => {
            return ({
                'name': name,
                'status': engine.status,
                'file_name': engine.file_name
            })
        }
    }
    return methods
}

// magnet
export async function magnetUrl(param) {
  param.tr = param.tr.join(',')
  var con = Object.values(param)
  var magnet = con.join(',')
  var mag = magnet.replace(',', '')
  return ('magnet:?xt='+mag)
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

//destroy boy
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

