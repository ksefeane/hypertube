<template>
    <div>
        <app-header></app-header>

        <h2>Today Movies</h2>
        <!-- <router-link to="/">Home</router-link>  -->
        <div v-if="movies">
                  <div class="col" v-for="film in movies" :key="film" @click="send_info(film)">
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
        movie: ''
      }
    },
    methods:{
        getTodayMovieList: function() {
        return axios.get('https://yts.mx/api/v2/list_movies.json')
        .then((response) => { return this.movies = response.data.data.movies; })
            .catch((error) => {
                throw error.response.data;
            });
        },
        send_info(movie) {
            EventBus.$emit('movie_details', movie)
        }
    },
    created: function() {
        this.getTodayMovieList()

    }
}
</script>