import { downloadTorrent, deleteTorrent, infoTorrent, magnetUrl } from '../models/torrent'
import fs from 'fs'

const destination = 'server/public/videos/'

export async function downloadVideo(req, res, next) {
    var magnet = await magnetUrl(req.query)
    downloadTorrent(magnet)
    var stat = await infoTorrent(magnet)
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

export function streamVideo(req, res) {
    let movie = req.params.movie
    let path = destination+movie
    console.log(path)
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
                let file = fs.createReadStream(path, {start, end})
                let head = {
                    'Content-Range': 'bytes ${start}-${end}/${fileSize}',
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunk,
                    'Content-Type': 'video/mp4'
                }
                res.writeHead(200, head)
                file.pipe(res)
            } else {
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': 'video/mp4'
                }
                res.writeHead(200, head)
                fs.createReadStream(path).pipe(res)
            }
        }
    })
    // fs.stat(path, (err, stat) => {
    //     if (err !== null && err.code === 'ENOENT') {
    //         res.sendStatus(404);
    //     }
    //     const fileSize = stat.size
    //     con range = req.headers.range
    //     if (range) {
    //         const parts = range.replace(/bytes=/, "").split("-");
    //         const start = parseInt(parts[0], 10);
    //         const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
    //         const chunksize = (end-start)+1;
    //         const file = fs.createReadStream(path, {start, end});
    //         const head = {
    //             'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    //             'Accept-Ranges': 'bytes',
    //             'Content-Length': chunksize,
    //             'Content-Type': 'video/mp4',
    //         }        
    //         res.writeHead(206, head);
    //         file.pipe(res);
    //     } else {
    //         const head = {
    //             'Content-Length': fileSize,
    //             'Content-Type': 'video/mp4',
    //         }
    //         res.writeHead(200, head);
    //         fs.createReadStream(path).pipe(res);
    //     }
    // });
}