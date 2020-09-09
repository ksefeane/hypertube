import { si, pantsu } from 'nyaapi'
import axios from 'axios'
import { maintainVideos } from '../models/videoModel'
import { createMagnet } from '../models/torrent'
import keys from '../config/keys'

const destination = 'server/public/videos/'

//sweep library for expired videos
export async function sweepLibrary(req, res) {
    let find = await maintainVideos(destination)
    res.send(find)
}

//fetches anime by top seeder from nyaa.si
export async function animeSearch(req, res) {
    try {
        let search = await si.search(req.params.search, 1, {sort: 'seeders'})
        search = search[0]
        let find = search ? {'name': search.name, 'size': search.filesize, 'seeders': search.seeders, 'magnet': search.magnet} : 
            'torrent not found'
        res.send(find)
    } catch (e) {console.log(e)}
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

export async function animeInfo(req, res) {
    try {
        let name = req.params.search
        let search = await pantsu.search(name, 1, {sort: 'seeders'})
        search = search[0]
        // name = search.title
        let jikan = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${name}`)
        jikan = jikan.data.results
        //console.log(jikan[0])
        let find = []
        for (let i in jikan) {
            let date = jikan[i].start_date ? jikan[i].start_date.substring(0, 10) : null
            find.push({
                "name": jikan[i].title,
                "score": jikan[i].score,
                "summary": jikan[i].synopsis,
                "year": date ,
                "img": jikan[i].image_url
            })
        }
        find = find.length > 0 ? find[0] : 'no information available'
        res.send(find)
    } catch (e) {console.log(e)}
}

//fetches movie search name & magnet
export async function movieSearch(req, res) {
    try {
        let search = req.params.search
        let stat = await axios.get('https://yts.mx/api/v2/list_movies.json?query_term='+search+'&sort_by=seeds')
        let suc = stat.data.data.movies
        let find = []
        let torrents = []
        for (let i in suc) {
            let name = suc[i].title_long
            for (let j in suc[i].torrents) {
                let magnet = await createMagnet(suc[i].torrents[j].hash, name)
                let seeders = suc[i].torrents[j].seeds
                let size = suc[i].torrents[j].size
                torrents.push({'magnet': magnet, 'seeders': seeders, 'size': size})
            }
            find.push({'name': name, 'torrents': torrents})
        }
        find = find.length ? find : 'no torrent found'
        res.send(find)
    } catch (e) { console.log(e)}
}

export async function movieInfo(req, res) {
    try {
        let search = req.params.search
        let stat = await axios.get('https://yts.mx/api/v2/list_movies.json?query_term='+search+'&sort_by=seeds')
        let suc = stat.data.data.movies
        let find = []
        for (let i in suc) {
            let id = suc[i].imdb_code
            let imdb = await axios.get(`http://www.omdbapi.com/?apikey=${keys.imdb}&i=${id}`)
            let info = imdb.data 
            find.push({
                'name': suc[i].title_long, 
                'score': info.imdbRating,
                'cast': info.Actors,
                'summary': info.Plot,
                'year': info.Year,
                'img': info.Poster
            })
        }
        find = find.length ? find[0] : 'no information available'
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