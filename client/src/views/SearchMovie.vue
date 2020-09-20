<template>
  <div>
    <app-header></app-header>
    <!--<router-link to="/library">Library</router-link>-->
    <div class="search-input">
    <br />
    <br />
    <h1>Search</h1>
      <input type="text" name id placeholder="search for..." v-model="movie" /><br>
      <button class="search-btn buttons" @click="search_movie">Search</button>
      <br />
    </div>
    <section>
      <div class="card-deck" >
        <div class="row my-4"  v-if="found_movies">
          <div v-for="(film, index) in found_movies" v-bind:key="index" @click="send_info(film)">
            <router-link v-bind:to="'/info/' + film.title">
              <div class="col-md-3">
                  <div class="card" border-light style="width: 18rem;">
                    <img class="card-img-top" :src="film.img" alt />
                    <div class="card-body">
                      <h2>{{ film.title }}</h2>
                      <br />
                      <br />
                    </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <app-footer></app-footer>
  </div>
</template>

<script>
// import zooqle from 'zooqle'
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventBus from "../event_bus/event_bus";

export default {
  components: {
    "app-header": Header,
    "app-footer": Footer,
  },
  data() {
    return {
      movie: "",
      found_movies: [],
    };
  },
  methods: {
    jwtHeader() {
      return {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      };
    },
    async search_movie() {
      let movies = {
        method: "get",
        url: "http://localhost:5000/api/library/movieinfo/" + this.movie,
      };
      let anime = {
        method: "get",
        url: "http://localhost:5000/api/library/animeinfo/" + this.movie,
      };
      let mov = await axios(movies).catch((e) => {
        console.log(e);
      });
      let ani = await axios(anime).catch((e) => {
        console.log(e);
      });
      // console.log(mov.data)
      //console.log(ani.data)
      this.found_movies = [...mov.data, ...ani.data];
    },
    sort_by_year_desc() {
      this.found_movies.sort((a, b) => (a.year > b.year ? -1 : 1));
    },
    send_info(movie) {
      EventBus.$emit("movie_details", movie);
    },
  },
};
</script>
<style scoped>
.search-btn {
  margin: 5px;
}

.card-deck {
    margin: auto 0;
    text-align: center;
    margin-left: 16px;
}
.card {
  /* border: solid; */
  background-color:#b5afbc ;
  margin-top: 20px;
}

.sort-buttons {
  margin: 5px;
}

.card-img-top {
  height: 350px;
}
.card-body {
  height: 250px;
  background: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
}
.card-border{
  border:yellow;
}
.buttons{
    background: #ee4c7c;
    color: white;
    padding: 10px;
    border: 1px solid #ee4c7c;
}
.search-input{
  text-align: center;
  margin: auto;
  width:30%
}
</style>