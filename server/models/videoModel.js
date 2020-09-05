import ffmpeg from 'fluent-ffmpeg'

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