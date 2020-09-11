<template>
    <div>
        <app-header></app-header>
        <div>
            <router-link to="/search">Search movies</router-link> | 
            <router-link to="/library">Library</router-link>  
            <div v-if="show">
                <video controls :src="stream">
                No video support
                </video>
            </div>
            <h1>{{ id }}</h1>
            <!-- <p>{{ film }}</p> -->
            <img :src="film.img" alt="">
            <br>
            <small>Score: {{ film.rating }}</small> <br>
            <small>Rating: {{ film.mpa_rating }}</small>
            <br>
            <p>Year: {{ film.year }}</p>
            <p>Runtime: {{ film.runtime }} minutes</p>
            <p>{{ film.summary }}</p>
            <button @click="download_film" v-if="!show">Download {{ id }}</button>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
import axios from "axios";

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
            stream: ''
        }
    },
    methods: {
        download_film() {
            // tell backend to download movie
            this.show = true
        },
        stream_movie() {
            const path = 'http://localhost:5000/api/video/stream/' + this.id
            axios.get(path, {
                'movie': this.id
            }).then((result) => {
                console.log(result)
            })
        }
    },
    mounted() {
        EventBus.$on('movie_details', (data) => {
            this.film = data;
            console.log(data)
            // alert('created')
        })
    }
}
</script>