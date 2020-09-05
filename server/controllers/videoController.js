import { downloadTorrent, deleteTorrent, infoTorrent, magnetUrl } from '../models/torrent'
import fs from 'fs'
import { getExt, convertMkv } from '../models/videoModel'
import ffmpeg from 'fluent-ffmpeg'

const destination = 'server/public/videos/'

export async function downloadVideo(req, res, next) {
    var magnet = await magnetUrl(req.query)
    downloadTorrent(magnet)
    var stat = await infoTorrent(magnet)
    console.log(stat)
    res.send(stat)
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

function streamMkv(stream, res) {
    try {
            const converter = ffmpeg()
            .input(stream)
            .outputOption('-movflags frag_keyframe+empty_moov')
            .outputFormat('mp4')
            .output(res)
            .on('progress', (progress) => {
                process.stdout.write(`      ${progress.targetSize} kb converted`+'\r')
            })
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
                streamMkv(stream, res)
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
                streamMkv(stream, res, 0)
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