import tor from 'torrent-stream'
import fs from 'fs'
const dest = 'server/public/videos/'
const tpath = '/tmp/torrent-stream/'
import { sleep, insertVideo, getExt, infoHash, searchvideoName } from '../models/videoModel'

//create magnet
export async function createMagnet(param) {
    param.tr = param.tr.join(',')
    var con = Object.values(param)
    var magnet = con.join(',')
    var mag = magnet.replace(',', '')
    return ('magnet:?xt='+mag)
  }

//delete torrent

//streamable

let engine = null
let mag = null
let status = 'initialized'
let file_name = 'torrent'
let progress = 0

async function magnetBoy(magnet) {
    if (!mag) {
        mag = magnet
    } else {
        if (mag !== magnet)
            await killEngine()
        mag = magnet
    }
}

async function killEngine() {
    if (engine) {
        engine.remove(() => {})
        engine.destroy(() => {status = 'destroyed'})
    }
    engine = null
    return engine
}

async function engineBoy(magnet, title) {
    await magnetBoy(magnet)
    if (!engine)
        engine = tor(mag)
    engine.on('ready', () => {
        status = 'queued'
        progress = `queued ${title}`
        let len = engine.files.length
        Promise.all(engine.files.map(async (file) => {
            let ext = getExt(file.name)
            let payload = {'title': title,'name':file.name,'ext':ext,'size':file.length,'hash':engine.infoHash}
            if (ext === '.mkv' || ext === '.mp4' || ext === '.avi') {
                let enter = await insertVideo(payload)
                if (enter) {
                    status = 'downloading'
                    file_name = file.name
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