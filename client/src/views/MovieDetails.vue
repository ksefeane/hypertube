<template>
    <div>
        <app-header></app-header>
        <div>
            <router-link to="/search">Search movies</router-link> | 
            <router-link to="/library">Library</router-link>  
            <div v-if="show">
                <video controls :src="stream_movie(this.file_name)" height="400" width="700">
                No video support
                </video>
            </div>
            <h1>{{ id }}</h1>
            <!-- <p>{{ film }}</p> -->
            <img :src="film.img" alt="">
            <br>
            <small v-for="torrent in film.torrents" :key="torrent">
                <button @click="download_film(torrent.magnet)">{{torrent.quality}} - {{torrent.size}}</button>
            </small><br><br>
            <small>Score: {{ film.score }}</small> <br>
            <!-- <small>Rating: {{ film.mpa_rating }}</small> -->
            <br>
            <p>Year: {{ film.year }}</p>
            <p>Runtime: {{ film.runtime }} minutes</p>
            <p>{{ film.summary }}</p>
            <!-- <button @click="download_film" v-if="!show">Download {{ id }}</button> -->
        </div>
        <!-- <app-footer></app-footer> -->
    </div>
</template>

<script>
import axios from "axios";

import Header from "../components/Header";
// import Footer from "../components/Footer";
import EventBus from "../event_bus/event_bus";

export default {
    components: {
        'app-header': Header,
        // 'app-footer': Footer,
    },
    data() {
        return {
            film: {},
            id: this.$route.params.id,
            show: false,
            stream: '',
            file_name: '',
        }
    },
    methods: {
        async movieinfo() {
            let mov = await axios.get('http://localhost:5000/api/library/movie/'+this.id)
                .catch(e => {console.log(e)})
            //console.log(mov.data[0])
            this.film = mov.data[0]
        },
        async download_film(magnet) {
            let mov = await axios.get('http://localhost:5000/api/video/downloadMagnet/'+magnet)
                 .catch(e => {console.log(e)})
            console.log(mov.data)
            this.file_name = mov.data.downloading
            //console.log(this.film.)
            // this.film = mov.data[0]
            this.show = true
        },
        stream_movie() {
            const path = 'http://localhost:5000/api/video/stream/' + this.file_name
            return (path)
        }
    },
    mounted() {
        EventBus.$on('movie_details', (data) => {
            this.film = data;
            //console.log(data)
            // alert('created')
        })
    },
    created() {
        this.movieinfo()
        //this.download_film()
    },
}
</script>