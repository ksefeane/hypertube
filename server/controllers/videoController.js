import { downloadTorrent, deleteTorrent, infoTorrent, magnetUrl } from '../models/torrent'
import fs from 'fs'
import { getExt, convertMkv } from '../models/videoModel'
import ffmpeg from 'fluent-ffmpeg'
import { si } from 'nyaapi'

const destination = 'server/public/videos/'

export async function nyaa(req, res) {
    let search = await si.search(req.params.search, 1, {sort: 'seeders'})
    search = search[0]
    let find = search ? {'name': search.name, 'file_size': search.filesize, 'seeders': search.seeders, 'magnet': search.magnet} : 
        'torrent not found'
    res.send(find)
}

export async function downloadSearch(req, res) {
    let search = await si.search(req.params.search, 1, {sort: 'seeders'})
    search = search[0]
    let find = search ? {'name': search.name, 'file_size': search.filesize, 'seeders': search.seeders, 'magnet': search.magnet} :
        'torrent not found'
    let torrent = search ? await downloadTorrent(find.magnet) : 'no torrent to download'
    let stat = [find, torrent]
    res.send(stat)
}

export async function downloadVideo(req, res, next) {
    var magnet = await magnetUrl(req.query)
    var torrent = await downloadTorrent(magnet)
  //  var stat = await infoTorrent(magnet)
    console.log(torrent)
 //   console.log(stat)
    res.send(torrent)
}

export async function deleteVideo(req, res) {
    var magnet = await magnetUrl(req.query)
    var stat = await deleteTorrent(magnet)
    res.send(stat)
}

export async function getInfo(req, res) {
    var stat = infoTorrent()
    res.send(stat)
}

function streamMkv(stream, res, size) {
    try {
            const converter = ffmpeg()
            .input(stream)
            .outputOption('-movflags frag_keyframe+empty_moov')
            .outputOptions('-fs', size/8)
            .outputFormat('-1280x720.mp4')
            .output(res)
            .on('error', (err, stdout, stderr) => { });
            converter.addOption('-vcodec')
            .run()
            // res.on('close', () => {
            //         console.log('converter killed');
            //         converter.kill();
            // })
    } catch(e) {
        res.sendStatus(404)
        res.send('unable to convert')
    }
}

export async function streamVideo(req, res) {
    let movie = req.params.movie
    let path = destination+movie
    fs.stat(path, (err, stat) => {
        if (err && err.code === 'ENOENT') {
            res.sendStatus(404)
        } else {
            const fileSize = stat.size
            let range = req.headers.range
            if (range) {
                let parts = range.replace(/bytes=/,'').split('-')
                let start = parseInt(parts[0], 10)
                let end = parts[1] ? parseInt(parts[1], 10) : fileSize-1
                let chunk = (end-start)+1
                let stream = fs.createReadStream(path, {start, end})
   //             getExt(movie) === '.mkv' ? streamMkv(stream, res, chunk) : 0
                stream.on('open', () => {
                    res.writeHead(206, { 
                        "Content-Range": `bytes ${start}-${end}/${fileSize}`, 
                        "Accept-Ranges":"bytes",
                        "Content-Length": chunk,
                        "Content-Type":"new/mp4"
                    })
                    stream.pipe(res);
                });
            } else {
                let stream = fs.createReadStream(path)
     //           getExt(movie) === '.mkv' ? streamMkv(stream, res, fileSize) : 0
                stream.on('open', () => {
                    res.writeHead(206, {
                        "Content-Length": fileSize,
                        "Content-Type": "new/mp4"
                    })
                    stream.pipe(res)
                })
           }
        }
    })
}