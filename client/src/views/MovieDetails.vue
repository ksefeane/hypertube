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
            <div v-if="show">
                <form>
                <div id="err" v-for="error in errors" v-bind:key="error">
                    <span>{{ error }}</span>
                </div>
                <div id="succ" v-for="succ in success" v-bind:key="succ">
                    <span>{{ succ }}</span>
                </div>
                    <label for="comment">Comment </label><br>
                    <textarea v-model="comment_content" id="comment_content" name="comment_content" rows="4" cols="50" />
                </form>
                <button v-on:click="validate">Submit</button><br><br>

                <div id="comm">
                    <div v-for="comment in comments" v-bind:key="comment.id">
                        <p><i>{{ comment.created_at }}</i> <strong>{{ comment.username }}</strong>: {{ comment.content }}</p>
                    </div>
                </div>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
import axios from "axios";
import moment from 'moment';
import {  axios_post} from "../functions/functions";

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
            pic: true,
            loading: false,
            ready: false,
            stream: '',
            file_name: '',
            magnet: '',
            type: '',
            torrents: [],
            errors:[],
            success:[],
            username: localStorage.getItem('user'),
            comments: [],
            comment_content:'',
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
                console.log(this.torrents)
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
                    this.stream_movie()
                }
            }
        },
        async stream_movie() {
            while (!this.ready) {
                console.log(this.file_name)
                let vid = await axios.get('http://localhost:5000/api/video/status/'+this.file_name)
                    .catch(e => {console.log(e)})
                if (vid.data.status == 'ready')
                    this.ready = true
            }
            if (this.ready) {
                this.show = true
                this.pic = false
                this.stream = `http://localhost:5000/api/video/stream/${this.file_name}`
                console.log(this.stream)
            }  
        },
        validate: function() {
            this.errors = []
            if (this.comment_content.length < 1) {
                this.errors.push('Comments must have at least 1 characters')
                return
            }
            if (this.comment_content.length > 140) {
                this.errors.push('Comments must have at most 140 characters')
                return
            }
            if (this.errors.length == 0) {
                this.addComment()
            }
        },
        addComment: async function() {
            console.log(this.film.title)
            this.success = []
            const data = {
                'username': this.username,
                'movie': this.id,
                'comment': this.comment_content,
                'created_at': moment().format("YYYY-MM-DD HH:mm:ss")
            }
            // console.log(data)
            var results = await axios_post('/api/video/addcomment', data)
            if (results !== "Oops!") {
                if (results.data.error) {
                    this.errors.push(results.data.error)
                } else if (results.data.affectedRows) {
                    this.success.push("Comment Added!!!")
                    this.fetchComments()
                    this.clean_input()
                }
                console.log(results)
            } else {
                this.errors.push("An unexpected error happened")
            }   
        },
        async fetchComments() {
            const data = {
                'movie': this.id
            }
            var results = await axios_post('/api/video/fetch-comments', data)
            if (results.data.error) {
                this.errors.push(results.data.error)
            } else {
                this.comments = results.data
                this.clean_input()
            }
        },
        play_movie() {
            this.play = true
        },
        clean_input() {
            this.comment_content = '',
            this.errors = []
        }
    },
    mounted() {
        EventBus.$on('movie_details', (data) => {
            this.film = data;
        })
    },
    created() {
        this.movieinfo()
        this.username = localStorage.getItem('user')
        console.log(moment().format("YYYY-MM-DD HH:mm:ss"))
        console.log(this.username)
        this.fetchComments()
    },
}
</script>

<style scoped>
#comm {
    width: 99%;
    display: block;
    overflow: auto;
    position: relative;
    max-height: 250px;
    background-color: aqua;
}
</style>