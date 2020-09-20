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

export async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkExpiry(file, path) {
    let today = new Date().getDate()
    let loc = await q.fetchone('videos', 'created', 'name', file)
    let exp = !loc ? null : 
        loc[0].created + 28 > 30 ? loc[0].created - 2 : 
        loc[0].created + 28
    if (exp == today || !loc ) {
        fs.unlink(path+file, () => {
            console.log('schedule delete: '+file)
            return ('schedule delete'+file)
         })
    } else {
        return (file)
    }
}

export async function createFolder(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
        return ({'success':'videos folder created'})
    }
}

export async function maintainVideos(path) {
    let find = []
    let len = 0
    fs.readdir(path, (err, files) => {
        if (err) throw err
        if (!files) {
            console.log('library empty\n')
            return ('library empty')
        }
        files.forEach(async file => {checkExpiry(file, path)})
    })
    await sleep(100)
    fs.readdir(path, (err, files) => {
        if (err) throw err
        find.push(files)
        len = files.length
    })
    await sleep(100)
//    console.log(len+' videos available  \n')
    return (find[0])
}

export async function insertVideo(video) {
    let params = ['title', 'name', 'ext', 'size', 'hash', 'status', 'created']
    let created = new Date().getDate()
    let payload = [video.title, video.name, video.ext, video.size, video.hash, 'downloading', created]
    let res = await q.fetchone('videos', 'name', 'name', video.name)
    if (res)
        return (res[0].name)
    await q.insert('videos', params, payload)
    return (1)
}
export async function fetchTitle(name) {
    let res = await q.fetchone('videos', 'name', 'title', name)
    return (res ? res : null)
}
export async function findVideo(name) {
    let find = await q.fetchregex('videos', 'title', 'name', name)
    let uni = []
    for (let i in find) {
        if (!uni.find(el => el === find[i].title))
            uni = [...uni, find[i].title]
    }
    return (uni)
}

export async function latestVideos() {
    let date = new Date().getDate()
    let res = await q.fetchone('videos', 'title', 'created', date)
    let uni = []
    for (let i in res) {
        if (!uni.find(el => el === res[i].title))
            uni.push(res[i].title)
    }
    return (uni)
}

export async function infoHash(hash) {
    let find = await q.fetchone('videos', 'name', 'hash', hash)
    return (find ? find[0] : 0)
}

export async function newComment2(username, movie, comment, date_time) {
    const params = ['username', 'movie_title', 'content', 'created_at']
    const vals = [username, movie, comment, date_time]
    await q.insert('comments', params, vals)
    return {'success':'comment added'}
}

export async function getComments2(movie) {
    return (await q.fetchone('comments', '*', 'movie_title', movie))
}