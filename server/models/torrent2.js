
export async function downloadTorrent(magnet, title) {
    await sleep(7000)
    let info = []
    let tor = await streamable(magnet)
    if (tor.tor) {
        return (tor.tor.downloaded ? {'downloading':tor.video.name} : {'queue':tor.video.name})
    } else {
        client.add(magnet, (torrent) => {
            const files = torrent.files
            let len = files.length
            files.forEach(async (file) => {
                let ext = getExt(file.name)
                if (ext == '.mkv' || ext == '.mp4' || ext == 'avi') {
                    let db = await insertVideo(title, file.name, ext, torrent.infoHash)
                    if (db == 0) {
                        const stream = file.createReadStream()
                        const save = fs.createWriteStream(dest+file.name)
                        stream.on('end', async () => {
                            console.log('download finished')
                            let stat = await deleteTorrent(magnet)
                            console.log(stat)
                            len -= 1
                            if (!len)
                            process.exit
                        }).pipe(save)
                    } else {
                        let res = await deleteTorrent(magnet)
                        console.log(res)
                        console.log('movie already downloaded')
                        return ('movie already exists')
                    }                    
                }
            })
        })
        return ('initializing torrent...')
    }
}

export async function streamable(magnet) {
    let info = {}
    info.tor = client.get(magnet) ? client.get(magnet) : 0
    info.video = info.tor ? await infoHash(info.tor.infoHash) : {'name': 'waiting for download'}
    return (info)
}

export default client