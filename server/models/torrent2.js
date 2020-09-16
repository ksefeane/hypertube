import tor from 'torrent-stream'
import fs from 'fs'
const dest = 'server/public/videos/'
const tpath = '/tmp/torrent-stream/'
import { sleep, insertVideo, getExt, infoHash } from '../models/videoModel'

var config = {
    tmp: '/tmp',
    path: '/blueshac',
    verify: true,
    tracker: true,
}

//create magnet
export async function createMagnet(param) {
    param.tr = param.tr.join(',')
    var con = Object.values(param)
    var magnet = con.join(',')
    var mag = magnet.replace(',', '')
    return ('magnet:?xt='+mag)
  }

//delete torrent

//infotorrent

//streamable

export async function torrent(magnet, name) {
    let engine = tor(magnet)
    let title = name
    let methods = {
        download: async () => {
            engine.on('ready', () => {
                let len = engine.files.length
                engine.files.forEach(async (file) => {
                    let ext = getExt(file.name)
                    let payload = {'title': title,'name':file.name,'ext':ext,'hash':engine.infoHash}
                    if (ext === '.mkv' || ext === '.mp4' || ext === '.avi') {
                        let enter = await insertVideo(payload)
                        if (enter) {
                            console.log(file.length)
                            let stream = file.createReadStream()
                            let save = fs.createWriteStream(dest+file.name)
                            stream.pipe(save)
                            stream.on('end', async () => {
                                console.log(`download finished (${file.name})`)
                                l--
                                if (!len) {
                                    engine.on('idle', () => {
                                        engine.remove(() => {console.log(`${title} torrent files deleted`)})
                                        engine.destroy(() => {console.log(`torrent ${engine.infoHash} (${title}) destroyed`)})
                                    })
                                    process.exit
                                }
                            })
                        } else {
                            console.log('movie already downloaded')
                            //deletemovie already downloaded
                        } 
                    }                    
                })
               
            })
            
        },
        info: async () => {
            engine.on('torrent', () => {
                let info = engine.infoHash
                console.log(info)
            })
        }
    }
    return methods
}