import WebTorrent from 'webtorrent-hybrid'
import fs from 'fs'

let client = new WebTorrent()
const dest = 'server/public/videos/'
const tpath = '/tmp/webtorrent/'

let stats = {
  progress: 0,
  downloadSpeed: 0,
  ratio: 0
}

let error_message = ""

client.on('error', (err) => {
	error_message = err.message;
})

client.on('download', (bytes) => {
  stats = {
		progress: client.progress * 100 * 100,
		downloadSpeed: Number(client.downloadSpeed/1000).toFixed(1)+'kb/s',
		ratio: client.ratio
  }
  process.stdout.write(stats.downloadSpeed+'\r')
})

export async function magnetUrl(param) {
  param.tr = param.tr.join(',')
  var con = Object.values(param)
  var magnet = con.join(',')
  return ('magnet:?xt='+magnet.replace(',',''))
}


export async function infoTorrent(magnet) {
    var torrent = client.get(magnet)
    var stat = {
      torrentpath: tpath,
      destination: '',
      size: '',
      downloaded: 0+' kb',
      progress: 0+'%',
      downloadSpeed: Number(client.downloadSpeed/1000).toFixed(1)+'kb/s'
    }
    torrent.files.forEach((data) => {
      stat.torrentpath += torrent.infoHash
      stat.destination = dest+data.name
      stat.size = Number(data.length/100).toFixed(0)+' kb'
      stat.downloaded = Number(data.downloaded/100).toFixed(0)+' kb'
      stat.progress = Number((data.downloaded/data.length)*10).toFixed(2)+'%'
    })
    return (stat.destination.length > 0 ? stat : 'initializing torrent: '+torrent.infoHash)    
}

export async function deleteTorrent(magnet) {
    var torrent = client.get(magnet)
    var dir = tpath+torrent.infoHash
    if (!torrent)
      console.log('no torrent')
    else {
      torrent.destroy(() => {
        fs.rmdir(dir, { recursive: true }, (err) => {
          if (err) {
              throw err;
          }
          console.log(`deleted ${torrent.infoHash}`);
      });
        console.log('killed torrent '+torrent.infoHash)
      })
    }
    
}

export async function downloadTorrent(magnet) {
    client.add(magnet, (torrent) => {
        const files = torrent.files
        let len = files.length
      files.forEach((file) => {
        console.log('downloading: '+file.name)
        // Display the file by appending it to the DOM. Supports video, audio, images, and
        // more. Specify a container element (CSS selector or reference to DOM node).
        const stream = file.createReadStream()
        const save = fs.createWriteStream(dest+file.name)
        stream.on('end', () => {
            console.log('download finished')
            len -= 1
            if (!len) {
              process.exit
            }
        }).pipe(save)
      })
    })
}

export default client