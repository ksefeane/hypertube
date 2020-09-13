import { si, pantsu } from 'nyaapi'
import axios from 'axios'
import { maintainVideos, findVideo } from '../models/videoModel'
import { createMagnet, filterName } from '../models/torrent'
import keys from '../config/keys'

const destination = 'server/public/videos/'

//sweep library for expired videos
export async function sweep(req, res, next) {
    maintainVideos(destination)
    next()
}

export async function localSearch(req, res) {
    let find = await findVideo(req.params.search)
    find = find ? find : 'no videos found'
    res.send(find)
}
export async function topVideos(req, res) {
    try {
        let name = 'batman'
        let loc = findVideo(name)
        let ani = si.search('*', 5, {sort: 'seeders'})
        let mov = axios.get('https://yts.mx/api/v2/list_movies.json')
        let vid = await Promise.all([loc, ani, mov])
        vid[2] = vid[2].data.data.movies
        let find = []
        // for (let i in vid[0]) {
        //     find.push(vid[0][i])
        // }
        for (let i in ani) {
            let name = await filterName(ani[i].name)
            let jikan = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${name}`)
            jikan = jikan.data.results
            //console.log(jikan[0].start_date).substring(0, 4)
            find.push({
                'title': name,
                'img': jikan[0].image_url,
                'score': jikan[0].score,
                'year': jikan[0].start_date
            })
        }
        for (let i in vid[2]) {
            find.push({
                'title': vid[2][i].title,
                'img': vid[2][i].medium_cover_image,
                'score': vid[2][i].rating,
                'year': vid[2][i].year,
                'runtime': vid[2][i].runtime
            })
        }
        res.send(find)
    } catch (e) {
        res.send({'error': e.code})
    }
}
export async function allSearch(req, res) {
    try {
        let name = req.params.search
        let loc = findVideo(name)
        let ani = si.search(name, 10, {sort: 'seeders'})
        let mov = axios.get('https://yts.mx/api/v2/list_movies.json?query_term='+name+'&sort_by=seeds')
        let vid = await Promise.all([loc, ani, mov])
        vid[2] = vid[2].data.data.movies
        let find = []
        let torrents = []
        for (let i in vid[0]) {
            find.push(vid[0][i])
        }
        for (let i in vid[1]) {
            if (vid[1][i].seeders > 10) {
                find.push({
                    'name': vid[1][i].name, 
                    'size': vid[1][i].filesize, 
                    'seeders': vid[1][i].seeders, 
                    'magnet': vid[1][i].magnet})
            }
        }
        for (let i in vid[2]) {
            let title = vid[2][i].title_long
            for (let j in vid[2][i].torrents) {
                let magnet = await createMagnet(vid[2][i].torrents[j].hash, title)
                let seeders = vid[2][i].torrents[j].seeds
                let size = vid[2][i].torrents[j].size
                torrents.push({'magnet': magnet, 'seeders': seeders, 'size': size})
            }
            find.push({'name': title, 'torrents' : torrents})
        }
        find = find.length > 0 ? find : 'no videos found'
        res.send(find)
    } catch (e) {
        e.code ? res.send({'movie error': e.code}) : 
        res.send({'anime error':e.response})
    }
}

//fetches anime by top seeder from nyaa.si
export async function animeSearch(req, res) {
    try {
        let search = await si.search(req.params.search, 10, {sort: 'seeders'})
        let find = []
        for (let i in search) {
            find.push({'name': search[i].name, 'size': search[i].filesize, 'seeders': search[i].seeders, 'magnet': search[i].magnet})
        }
        find = find.length > 0 ? find : 'no torrent found'
        res.send(find)
    } catch (e) {console.log(e.message)}
}

//find top 20 seeded anime 
export async function animeLibrary(req, res) {
    try {
        let ani = await si.search('*', 5, {sort: 'seeders'})
        let find = []
        let titles = []
        for (let i in ani) {
            let name = await filterName(ani[i].name)
            titles.push(name)
        }
        for (let i in titles) {
            let jikan = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${titles[i]}`)
            jikan = jikan.data.results
            find.push({
                'title': jikan[0].title,
                'img': jikan[0].image_url,
                'score': jikan[0].score,
                'year': jikan[0].start_date.substring(0, 4)
            })
        }
        res.send(find)
    } catch (e) {
        console.log(e)
        res.send({'error': e.code})
    }
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
                'torrents': torrents
            })
        }
        find = find.length ? find : 'no torrent found'
        res.send(find)
    } catch (e) { console.log(e.code)}
}
export async function animeInfo(req, res) {
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
                "name": jikan[i].title,
                "score": jikan[i].score,
                "summary": jikan[i].synopsis,
                "year": date ,
                "img": jikan[i].image_url
            })
        }
        find = find.length > 0 ? find : []
        res.send(find)
    } catch (e) {e.Error}
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