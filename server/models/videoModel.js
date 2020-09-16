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
    let range = loc ? loc[0].created - today : 0
    if (range == 1 || range > 28 || range < -28 || !loc || range < 0) {
        fs.unlink(path+file, () => {
            console.log('schedule delete: '+file)
            return ('schedule delete'+file)
         })
    } else {
   //     console.log(file)
        return (file)
    }
}

export async function maintainVideos(path) {
    let find = []
    await sleep(100)
 //   process.stdout.write('\nscanning library...\r')
 //   console.log()
    await sleep(100)
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
    let res = await q.fetchone('videos', 'name', 'name', video.name) == null ? 
        await q.insert('videos', params, payload) : 1
    return (res == 1 ? null : 1)
}
export async function searchvideoName(name) {
    let res = await q.fetchone('videos', 'name', 'name', name)
    return (res)
}
export async function findVideo(name) {
    let find = await q.fetchregex('videos', 'name', 'name', name)
    return (find)
}

export async function infoHash(hash) {
    let find = await q.fetchone('videos', 'name', 'hash', hash)
    return (find ? find[0] : 0)
}

export async function newComment(username, movie, comment, date_time) {
    const params = ['username', 'movie_id', 'content', 'created_at']
    var movie_details = await q.fetchone('videos', 'id', 'title', movie)
    // console.log(movie_details[0].id)
    if (movie_details) {
        const vals = [username, movie_details[0].id, comment, date_time]
        return (await q.insert('comments', params, vals))
    }
    return ({'error': "No movie"})
}

export async function getComments(movie) {
    var movie_details = await q.fetchone('videos', 'id', 'title', movie)
    if (movie_details) {
        return (await q.fetchone('comments', '*', 'movie_id', movie_details[0].id))
    }
    return ({'error': "No movie"})
}