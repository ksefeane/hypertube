<template>
    <div>
        <app-header></app-header>
        
        <router-link to="/search">Search movies</router-link><br>
        <h2>Today Movies</h2>
        <!-- <router-link to="/">Home</router-link>  -->
        <div v-if="movies">
            <button @click="sort_by_year_asc">Sort by year (asc)</button>
            <button @click="sort_by_year_desc">Sort by year (desc)</button>
            <button @click="sort_by_rating_asc">Sort by rating (asc)</button>
            <button @click="sort_by_rating_desc">Sort by rating (desc)</button>
            <br>
            <div class="col" v-for="film in paginated_movies" :key="film" @click="send_info(film)">
                <router-link v-bind:to="'/info/' + film.title">
                    <div class="card" style="width: 18rem;"  >
                        <img class="card-img-top" :src="film.img" alt="Card image cap">
                        <div class="card-body">
                            <h3 class="card-title">{{ film.title }}</h3>
                            <p><small>Score: {{ film.score }}</small> </p>
                            <p>Year: {{ film.year }}</p>
                            <p>Runtime: {{ film.runtime }} minutes</p>
                        </div>
                    </div>
                </router-link>
            </div>
        <button @click="prev_page">Previous</button>
        <button @click="next_page">Next</button>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventBus from "../event_bus/event_bus";

export default {
    components: {
        'app-header': Header,
        'app-footer': Footer
    },
     data () {
      return {
        movies: [],
        movie: '',
        page_number: 0,
        no_per_page: 5,
        no_of_movies: 0
      }
    },
    methods:{
        // async getVideos() {
        //     let res = await axios.get('http://localhost:5000/api/')
        // },
        getTodayMovieList: async function() {
            let res = await axios.get('http://localhost:5000/api/library/topmovies')
            .catch((e) => {console.log(e)})
                console.log(res.data)
                this.movies = res.data
                this.no_of_movies = this.movies.length
               // console.log(this.movies)
        },
        logout() {
            localStorage.removeItem("jwt")
            swal("success", "logged out", "success")
            this.$route.push()
        },
        send_info(movie) {
            EventBus.$emit('movie_details', movie)
        },
        next_page() {
            this.page_number++
            if (this.page_number >= (this.no_of_movies/this.no_per_page)) {
                this.page_number = (this.no_of_movies/this.no_per_page) -1
            }
            console.log(this.page_number)
        },
        prev_page() {
            this.page_number--;
            if (this.page_number < 0) {
                this.page_number = 0
            }
        },
        sort_by_year_asc() {
            this.movies.sort((a, b) => (a.year > b.year) ? 1: -1)
        },
        sort_by_year_desc() {
            this.movies.sort((a, b) => (a.year > b.year) ? -1: 1)
        },
        sort_by_rating_desc() {
            this.movies.sort((a, b) => (a.rating > b.rating) ? -1: 1)
        },
        sort_by_rating_asc() {
            this.movies.sort((a, b) => (a.rating > b.rating) ? 1: -1)
        }
    },
    computed: {
        page_count() {
            let num = this.movies.length
            let size = this.no_per_page
            return Math.ceil(num/size)
        },
        paginated_movies() {
            const start = this.page_number * this.no_per_page
            const end = start + this.no_per_page
            return this.movies.slice(start, end)
        }
    },
    created: function() {
        this.getTodayMovieList()

    }
}
</script>