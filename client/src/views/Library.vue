<template>
  <div>
    <app-header></app-header>
    <!-- <br />
    <br /> -->
    <br />
    <br />
    <h1>Today Movies</h1>
    <!-- <router-link to="/">Home</router-link>  -->
    <!-- <br />
    <br /> -->
    <section class="layout">
      <div v-if="movies">
        <button class="sort-buttons buttons" @click="sort_by_year_asc">Sort by year (asc)</button>
        <button class="sort-buttons buttons" @click="sort_by_year_desc">Sort by year (desc)</button>
        <button class="sort-buttons buttons" @click="sort_by_rating_asc">Sort by rating (asc)</button>
        <button class="sort-buttons buttons" @click="sort_by_rating_desc">Sort by rating (desc)</button>
        <br />
        <br />
        <br />
        <div v-if="locals" class="card-deck">
            
            <div class="my-4">
                <div v-for="loc in localmovies" :key="loc">
                    <router-link v-bind:to="'/info/' + loc.title">
                        <div class="md-3 layout">
                            <div class="card" style="width: 18rem;">
                            <img class="card-img-top" :src="loc.img" alt="Card image cap" />
                            <div class="card-body">
                                <h3 class="card-title">{{ loc.title }}</h3>
                                <p>
                                <small>Score: {{ loc.score }}</small>
                                </p>
                                <p>Year: {{ loc.year }}</p>
                                <p>Runtime: {{ loc.runtime }} minutes</p>
                            </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="card-deck">
          <div
            class="my-4"
            v-for="(film, index) in paginated_movies"
            :key="index"
            @click="send_info(film)"
          >
            <router-link v-bind:to="'/info/' + film.title">
              <div class="md-3 layout">
                <div class="card" style="width: 18rem;">
                  <img class="card-img-top" :src="film.img" alt="Card image cap" />
                  <div class="card-body">
                    <h3 class="card-title">{{ film.title }}</h3>
                    <p>
                      <small>Score: {{ film.score }}</small>
                    </p>
                    <p>Year: {{ film.year }}</p>
                    <p>Runtime: {{ film.runtime }} minutes</p>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <button class="sort-buttons buttons" @click="prev_page">Previous</button>
        <button class="sort-buttons buttons" @click="next_page">Next</button>
      </div>
    </section>
    <app-footer></app-footer>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
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
      movies: [],
      localmovies: [],
      locals: false,
      movie: "",
      page_number: 0,
      no_per_page: 6,
      no_of_movies: 0,
    };
  },
  methods: {
    // async getVideos() {
    //     let res = await axios.get('http://localhost:5000/api/')
    // },
    async getLocal() {
        let res = await axios
            .get("http://localhost:5000/api/library/local/*")
            .catch((e) => {console.log(e)})
            if (res.data.local) {
                this.localmovies = res.data.local
                this.locals = true
            }
    },
    getTodayMovieList: async function () {
      let res = await axios
        .get("http://localhost:5000/api/library/topmovies")
        .catch((e) => {
          console.log(e);
        });
      // console.log(res.data)
      this.movies = res.data;
      this.no_of_movies = this.movies.length;
      // console.log(this.movies)
    },
    logout() {
      localStorage.removeItem("jwt");
      swal("success", "logged out", "success");
      this.$route.push();
    },
    send_info(movie) {
      EventBus.$emit("movie_details", movie);
    },
    next_page() {
      this.page_number++;
      if (this.page_number >= this.no_of_movies / this.no_per_page) {
        this.page_number = this.no_of_movies / this.no_per_page - 1;
      }
      // console.log(this.page_number)
    },
    prev_page() {
      this.page_number--;
      if (this.page_number < 0) {
        this.page_number = 0;
      }
    },
    sort_by_year_asc() {
      this.movies.sort((a, b) => (a.year > b.year ? 1 : -1));
    },
    sort_by_year_desc() {
      this.movies.sort((a, b) => (a.year > b.year ? -1 : 1));
    },
    sort_by_rating_desc() {
      this.movies.sort((a, b) => (a.score > b.score ? -1 : 1));
    },
    sort_by_rating_asc() {
      this.movies.sort((a, b) => (a.score > b.score ? 1 : -1));
    },
  },
  computed: {
    page_count() {
      let num = this.movies.length + this.local;
      let size = this.no_per_page;
      return Math.ceil(num / size);
    },
    paginated_movies() {
      const start = this.page_number * this.no_per_page;
      const end = start + this.no_per_page;
      return this.movies.slice(start, end);
    },
  },
  created: function () {
    this.getLocal()
    this.getTodayMovieList();
  },
};
</script>
<style scoped>
.layout {
   text-align: center;
   width:80%;
   padding-right: -15px;
    padding-left: -15px;
    margin-right: auto;
    margin-left: auto;
}

h1 {
  text-align: center;
}
.card-deck {
    margin: auto 0;
    text-align: center;
    /* float: left; */
    margin-left: 16px;
}
.sort-buttons {
  margin: 5px;
}

.card-img-top {
  height: 350px;
}
.card-body {
  height: 250px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
}
@media screen and (min-width: 768px) {
  .card-body {
  width: 100%;
}

}
</style>
