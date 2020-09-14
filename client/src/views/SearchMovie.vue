<template>
    <div>
        <app-header></app-header>
        <router-link to="/library">Library</router-link> 
        <form>
            <input type="text" name="" id="" placeholder="search for..." v-model="movie">
        </form>
        <button @click="search_movie">Search</button>
        <br>
        Query:  {{ movie }}
        <div v-if="found_movies">
            
            <div v-for="(film, index) in found_movies" v-bind:key="index" @click="send_info(film)">
                <router-link v-bind:to="'/info/' + film.title">
                    <h2>{{ film.title }}</h2>
                <img :src="film.img" alt=""><br><br>
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
            found_movies: [],
        }
    },
    methods: {
        jwtHeader() {
            return {
                'Authorization': 'Bearer '+localStorage.getItem("jwt")
            }
        },
        async search_movie() {
            let movies = {
                method: 'get',
                url: 'http://localhost:5000/api/library/movieinfo/'+this.movie
            }
            let anime = {
                method: 'get',
                url: 'http://localhost:5000/api/library/animeinfo/'+this.movie
            }
            let mov = await axios(movies).catch(e => {console.log(e)})
            let ani = await axios(anime).catch(e => {console.log(e)})
            // console.log(mov.data)
            //console.log(ani.data)
            this.found_movies = [...mov.data, ...ani.data]
        },
        sort_by_year_desc() {
            this.found_movies.sort((a, b) => (a.year > b.year) ? -1: 1)
        },
        send_info(movie) {
            EventBus.$emit('movie_details', movie)
        }
    }
}
</script>