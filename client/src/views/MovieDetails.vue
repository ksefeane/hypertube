<template>
    <div>
        <app-header></app-header>
        <div>
            <router-link to="/search">Search</router-link> | 
            <router-link to="/library">Library</router-link>  
            <div v-if="show">
                <video controls :src="stream" height="500" width="900">
                No video support
                </video>
            </div>
            <h1>{{ id }}</h1>
            <!-- <p>{{ film }}</p> -->
            <img v-if="pic" :src="film.img" alt="">
            <br>
            <small v-for="torrent in torrents" :key="torrent">
                <button @click="download_film(torrent.magnet)">{{torrent.quality}} {{torrent.name}} {{torrent.size}} {{torrent.seeders}} seeders</button><br>
            </small><br><br>
            <small>Score: {{ film.score }}</small> <br>
            <!-- <small>Rating: {{ film.mpa_rating }}</small> -->
            <br>
            <p>Year: {{ film.year }}</p>
            <p>Runtime: {{ film.runtime }} minutes</p>
            <p>{{ film.summary }}</p>
            <!-- <button @click="download_film" v-if="!show">Download {{ id }}</button> -->
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
import axios from "axios";
import sweet from 'sweetalert'
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventBus from "../event_bus/event_bus";

export default {
    components: {
        'app-header': Header,
        'app-footer': Footer,
    },
    data() {
        return {
            film: {},
            id: this.$route.params.id,
            show: false,
            pic: true,
            loading: false,
            ready: false,
            stream: '',
            file_name: '',
            magnet: '',
            type: '',
            torrents: []
        }
    },
    methods: {
        async movieinfo() {

            let mov = await axios.get('http://localhost:5000/api/library/movieinfo/'+this.id)
                .catch(e => {console.log(e)})
            let ani = await axios.get('http://localhost:5000/api/library/animeinfo/'+this.id)
                .catch(e => {console.log(e)})
            if (mov.data.length) {
                this.film = mov.data[0]
                this.torrents = mov.data[0].torrents
                console.log(this.film)
            } else {
                this.film = ani.data.find(e => e.title == this.id)
                this.animeTorrents()
            }
        },
        async animeTorrents() {
            let ani = await axios.get('http://localhost:5000/api/library/animetorrents/'+this.id)
                .catch(e => {console.log(e)})
            this.torrents = ani.data
           // console.log(this.film.torrents)
            console.log(ani.data)
        },
        async download_film(magnet) {
            this.magnet = magnet
            let status = null
            while (!status) {
                let mov = await axios.get('http://localhost:5000/api/video/downloadMagnet/'+magnet)
                    .catch(e => {console.log(e)})
                if (mov.data.downloading) {
                    status = mov.data.downloading
                    this.file_name = mov.data.downloading
                    sweet("downloading", `${this.file_name}`)
                    this.stream_movie()
                }
            }
        },
        async stream_movie() {
            while (!this.ready) {
                console.log(this.file_name)
                let vid = await axios.get('http://localhost:5000/api/video/status/'+this.file_name)
                    .catch(e => {console.log(e)})
                console.log(vid.data)
                if (vid.data.status == 'ready')
                    this.ready = true
            }
            if (this.ready) {
                this.show = true
                this.pic = false
                this.stream = `http://localhost:5000/api/video/stream/${this.file_name}`
            }  
        }
    },
    mounted() {
        EventBus.$on('movie_details', (data) => {
            this.film = data;
        })
    },
    created() {
        this.movieinfo()
    },
}
</script>