import WebTorrent from 'webtorrent-hybrid'
import fs from 'fs'

const client = new WebTorrent()
let dest = 'server/public/videos/'

export function downloadTorrent(url) {
    client.add(url, function (torrent) {
        const files = torrent.files
      // Got torrent metadata!
      console.log('Client is downloading:', torrent.infoHash)
     
      files.forEach(function (file) {
        // Display the file by appending it to the DOM. Supports video, audio, images, and
        // more. Specify a container element (CSS selector or reference to DOM node).
        const source = file.createReadStream()
        const destination = fs.createWriteStream(dest+file.name)
        let len = files.length
        source.on('end', () => {
            console.log('download finish')
            len -= 1
            if (!len) process.exit
        }).pipe(destination)
      })
    })
}