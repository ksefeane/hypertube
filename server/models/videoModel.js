import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'
import q from './query'

export function getExt(string) {
    let extension = string.match(/.*(\..+?)$/);
    return extension[1].toLowerCase();
}

export function convertMkv(path) {
    var newfile = path.replace('mkv', 'mp4')
    try {
        ffmpeg(path)
            .toFormat('mp4')
            .on('error', (err) => {
                console.log(err)
            })
            .on('progress', (progress) => {
                process.stdout.write(`      ${progress.targetSize} kb converted`+'\r')
            })
            .on('end', () => {
                console.log('conversion complete')
            })
            .save(newfile)
            return(newfile)
    } catch (e) {console.log(e)}
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkExpiry(file, path) {
    let today = new Date().getDate()
    let loc = await q.fetchone('movies', 'created', 'name', file)
    let range = loc ? loc[0].created - today : 0
    if (range == 1 || range > 28 || range < -28 || !loc || range < 0) {
        fs.unlink(path+file, () => {
            console.log('schedule delete: '+file)
         })
    } else {
        console.log(file+' '+loc[0].created)
    }
    
}

export async function maintainVideos(path) {
    await sleep(100)
 //   process.stdout.write('\nscanning library...\r')
    console.log()
    await sleep(400)
    let len = 0
    fs.readdir(path, (err, files) => {
        if (err) throw err
        if (!files)
            console.log('library empty\n')
        files.forEach(async file => {checkExpiry(file, path)})
    })
    await sleep(100)
    fs.readdir(path, (err, files) => {
        if (err) throw err
        len = files.length
    })
    await sleep(100)
    console.log(len+' videos available  \n')
}