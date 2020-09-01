import { downloadTorrent } from '../models/torrent'

export function downloadVideo(req, res) {
    downloadTorrent(req.body.url)
    res.send('test')
}