<template>
    <div>
        <app-header></app-header>
        <router-link to="/search">Search movies</router-link> 
        <h2>Today Movies</h2>
        <!-- <router-link to="/">Home</router-link>  -->
        <div v-if="movies">
            <div class="col" v-for="film in paginated_movies" :key="film" @click="send_info(film)">
                <router-link v-bind:to="'/info/' + film.title">
                    <div class="card" style="width: 18rem;"  >
                        <img class="card-img-top" :src="film.medium_cover_image" alt="Card image cap">
                        <div class="card-body">
                            <h3 class="card-title">{{ film.title }}</h3>
                            <p><small>Score: {{ film.rating }}</small> </p>
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
        getTodayMovieList: function() {
            return axios.get('https://yts.mx/api/v2/list_movies.json')
            .then((response) => { 
                this.movies = response.data.data.movies;
                this.no_of_movies = this.movies.length
                console.log(this.movies)
            })
            .catch((error) => {
                throw error.response.data;
            });
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