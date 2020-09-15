import tor from 'node-torrent'
import { sleep } from '../models/videoModel'

var config = {
    port: 9091,
    host:'localhost'
}

var client = new tor()

export async function launchTorrent(magnet, title) {
    //console.log(magnet)
  //  console.log(magnet)
    let torrent = client.addTorrent(magnet)
    console.log(torrent)
    await sleep(10000)

    return ('transmission')
}