import { si } from 'nyaapi'
import axios from 'axios'
import { maintainVideos } from '../models/videoModel'

const destination = 'server/public/videos/'


//sweep library for expired videos
export async function sweepLibrary(req, res) {
    let find = await maintainVideos(destination)
    res.send(find)
}

//fetches anime by top seeder from nyaa.si
export async function animeSearch(req, res) {
    let search = await si.search(req.params.search, 1, {sort: 'seeders'})
    search = search[0]
    console.log(search)
    let find = search ? {'name': search.name, 'file_size': search.filesize, 'seeders': search.seeders, 'magnet': search.magnet} : 
        'torrent not found'
    res.send(find)
}

//find top 20 seeded anime 
export async function animeLibrary(req, res) {
    let search = await si.search('*', req.params.number, {sort: 'seeders'})
    let find = []
    for (let i in search) {
        find.push(search[i].name)
    }
    res.send(find)
}

async function createMagnet(hash, name) {
    let url = encodeURI(name)
    let trackers = ''
    let track = ['udp://open.demonii.com:1337/announce', 'udp://tracker.openbittorrent.com:80', 'udp://tracker.coppersurfer.tk:6969', 'udp://glotorrents.pw:6969/announce']
    for (let i in track) {
        let uri = encodeURI(track[i])
        trackers += `&tr=${uri}`
    }
    let magnet = `magnet:?xt=urn:btih:${hash}&dn=${url}${trackers}`
    return (magnet)
}

export async function movieSearch(req, res) {
    try {
        let search = req.params.search
        let stat = await axios.get('https://yts.mx/api/v2/list_movies.json?query_term='+search)
        let suc = stat.data.data.movies
        let find = []
        for (let i in suc) {
            let hash = suc[i].torrents[0].hash
            let name = suc[i].title_long
            find.push({'name': name, 'magnet': await createMagnet(hash, name)})
        }
        res.send(find)
    } catch (e) { console.log(e)}
}

//fetches all the movies from yts
export async function movieLibrary(req, res) {
    try {
        const response = await axios.get('https://yts.mx/api/v2/list_movies.json')
        /**
         * response.data.data
         * Fetches the json object which includes movie_count, limit = 20 for 20 movies per page
         * and page_number = 1
         * 
         * response.data.data.movies
         * access the movie object name attribute which has all the information about the movies
         * 
         * response.data.data.movies[5]
         * if you wanna access a specific element 
         */
        console.log(response.data.data.movies);
        res.send(response.data.data);
    } catch (error) {
        console.log(error);
    }
}

//searches yts directory if the name of the movie is provided
export async function movieSearchLibrary(req, res) {
    var search = req.body.search
    try {
        const response = await axios.get('https://yts.mx/api/v2/list_movies.json?query_term='+search)
        console.log(response.data.data.movies);
        res.send(response.data.data);
    } catch (error) {
        console.log(error);
    }
}