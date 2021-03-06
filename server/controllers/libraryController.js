import { si, pantsu } from 'nyaapi'
import axios from 'axios'
import { maintainVideos, findVideo, latestVideos } from '../models/videoModel'
import { createMagnet, filterName } from '../models/torrent'
import keys from '../config/keys'

const destination = 'server/public/videos/'

//sweep library for expired videos
export async function sweep(req, res, next) {
    maintainVideos(destination)
    next()
}
export async function localSearch(req, res) {
    let search = req.params.search
    let find = search === "*" ? await latestVideos(): await findVideo(search)
    let loc = []
    for (let i in find) {
        let stat = await axios.get('https://yts.mx/api/v2/list_movies.json?query_term='+find[i]+'&sort_by=seeds')
        let res = stat.data.data.movies
        if (res) {
            let mov = res.find(el => el.title === find[i])
            loc.push({
                'title': find[i], 
                'score': mov.rating,
                'summary': mov.summary,
                'year': mov.year,
                'img': mov.medium_cover_image,
                'runtime': mov.runtime,
                "type": 'local'
            })
        } else {
            let jikan = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${find[i]}`)
            res = jikan.data.results
            let ani = res.find(el => el.title === find[i])
            let date = ani.start_date ? ani.start_date.substring(0, 10) : null
            loc.push({
                'title': find[i], 
                'score': ani.score,
                'summary': ani.synopsis,
                'year': date,
                'img': ani.image_url,
                'runtime': 25,
                "type": 'local'
            })
        }
    }
    find = loc ? {'local':loc} : []
    res.send(find)
}

export async function movieLibrary(req, res) {
    try {
        let mov = await axios.get('https://yts.mx/api/v2/list_movies.json')
        mov = mov.data.data.movies
        let find = []
        for (let i in mov) {
            find.push({
                'title': mov[i].title,
                'img': mov[i].medium_cover_image,
                'score': mov[i].rating,
                'year': mov[i].year,
                'runtime': mov[i].runtime,
                'summary': mov[i].summary
            })
        }
        res.send(find)
    } catch (e) {
        res.send({'error': e.code})
    }
}
//fetches movie search name & magnet
export async function movieDetails(req, res) {
    try {
        let search = req.params.search
        let stat = await axios.get('https://yts.mx/api/v2/list_movies.json?query_term='+search+'&sort_by=seeds')
        let suc = stat.data.data.movies
        let find = []
        let torrents = []
        for (let i in suc) {
            let name = suc[i].title_long
            for (let j in suc[i].torrents) {
                torrents.push({
                    'magnet': await createMagnet(suc[i].torrents[j].hash, name), 
                    'seeders': suc[i].torrents[j].seeds, 
                    'size': suc[i].torrents[j].size, 
                    'quality': suc[i].torrents[j].quality})
            }
            find.push({
                'title': name, 
                'score': suc[i].rating,
                'summary': suc[i].summary,
                'year': suc[i].year,
                'img': suc[i].medium_cover_image,
                'runtime': suc[i].runtime,
                'torrents': torrents,
                "type": 'movie'
            })
        }
        res.send(find)
    } catch (e) { console.log(e.code)}
}
export async function animeDetails(req, res) {
    try {
        let name = req.params.search
        name = name.length > 20 ? name.substring(0, 20) : name
        // name = search.title
        let jikan = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${name}`)
        jikan = jikan.data.results
        //console.log(jikan[0])
        let find = []
        for (let i in jikan) {
            let date = jikan[i].start_date ? jikan[i].start_date.substring(0, 10) : null
            find.push({
                "title": jikan[i].title,
                "score": jikan[i].score,
                "summary": jikan[i].synopsis,
                "year": date ,
                "img": jikan[i].image_url,
                "runtime": 25,
                "type": 'anime'
            })
        }
        res.send(find)
    } catch (e) {e.Error}
}

//fetches anime by top seeder from nyaa.si
export async function animeTorrents(req, res) {
    try {
        let search = await si.search(req.params.search, 10, {sort: 'seeders'})
        let find = []
        //console.log(search)
        for (let i in search) {
            find.push({
                'name': search[i].name, 
                'size': search[i].filesize, 
                'seeders': search[i].seeders, 
                'magnet': search[i].magnet})
        }
        res.send(find)
    } catch (e) {console.log(e.message)}
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
        find = find.length ? find : []
        res.send(find)
    } catch (e) { console.log(e)}
}

//fetches all the movies from yts


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