<template>
    <div>
        <app-header></app-header>
        <form>
            <input type="text" name="" id="" placeholder="Enter movie name" v-model="movie">
        </form>
        <button @click="search_movie">Search</button>
        <br>
        Query:  {{ movie }}
        <div v-if="found_movies">
            
            <div v-for="film in found_movies" v-bind:key="film" @click="send_info(film)">
                <router-link v-bind:to="'/info/' + film.title">
                    <h2>{{ film.title }}</h2>
                <img :src="film.medium_cover_image" alt="">
                <!-- <br>
                <small>Score: {{ film.rating }}</small> <br>
                <small>Rating: {{ film.mpa_rating }}</small>
                <br>
                <p>Year: {{ film.year }}</p>
                <p>Runtime: {{ film.runtime }} minutes</p>
                <p>{{ film.summary }}</p> -->
                </router-link>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
// import zooqle from 'zooqle'
import axios from 'axios'
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventBus from "../event_bus/event_bus";


export default {
    components: {
        'app-header': Header,
        'app-footer': Footer
    },
    data() {
        return {
            movie: '',
            found_movies: []
        }
    },
    methods: {
        search_movie() {
            const path = 'https://yts.mx/api/v2/list_movies.json'
            axios.post(path + '?query_term=' + this.movie).then((result) => {
                console.log(result)
                this.found_movies = result.data.data.movies
                console.log(this.found_movies)
                // this.find_magnet()
                // this.movie = ''
            }).catch((err) => {
                console.log(err)
            })
        },
        // find_magnet() {
            // const TorrentSearchApi = require('torrent-search-api');
            // TorrentSearchApi.enableProvider('Torrent9');
            // const activeProviders = TorrentSearchApi.getActiveProviders();
            // console.log(activeProviders)
            // const linkParameters = [
            //     zooqle.enums.SORT.seeders, 
            //     zooqle.enums.SORT_TYPE.descending
            // ]
            // zooqle.search('silicon valley', linkParameters).then(response => {
            //     console.log(response)
            // })
            // var tortuga = require('tortuga');
            // tortuga.search('harry potter', function(results) {
            //     console.log(results);
            // })
            // const TPB = require('tpb-api');
            // const tpb = new TPB();

            // tpb.search('The Walking Dead S07E15')
            // .then(res => console.log(res))
            // .catch(err => console.log(err));
            // const tg = require("torrent-grabber");
            // tg.search('300', { groupByTracker: false }).then(items => console.log(items));
            // const tpb = require('tpb-search')
            // tpb.search('300', function(err, results) {
            //     console.log(results) // returns name, seeders, leechers, url
            // })
        send_info(movie) {
            EventBus.$emit('movie_details', movie)
        }
    }
}
</script>