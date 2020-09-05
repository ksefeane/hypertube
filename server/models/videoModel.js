import ffmpeg from 'fluent-ffmpeg'

export function getExt(string) {
    let extension = string.match(/.*(\..+?)$/);
    return extension[1].toLowerCase();
}

export function convertMkv(path, file, dest) {
    var newfile = file.replace('mkv', 'mp4')
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
            .save(dest+newfile)
    } catch (e) {
        console.log(e)
    }

    //ffmpeg(track)
    // .toFormat('wav')
    // .on('error', (err) => {
    // console.log('An error occurred: ' + err.message);
    // }
    // .on('progress', (progress) => {
    //  // console.log(JSON.stringify(progress));
    //  console.log('Processing: ' + progress.targetSize + ' KB converted');
    // })
    // .on('end', () => {
    // console.log('Processing finished !');
    // })
    // .save('./hello.wav');//path where you want to save your file
}