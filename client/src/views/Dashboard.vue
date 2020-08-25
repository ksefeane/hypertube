<template>
  <!-- <div class="browse-movie-wrap col-xs-10 col-sm-5">
<a href="https://yts.mx/movies/the-tax-collector-2020" class="browse-movie-link">
<figure>
<img class="img-responsive" src="/assets/images/movies/the_tax_collector_2020/medium-cover.jpg" alt="The Tax Collector (2020) download" width="210" height="315">
<figcaption class="hidden-xs hidden-sm">
<span class="icon-star"></span>
<h4 class="rating">4.7 / 10</h4> <h4>Action</h4>
<h4>Crime</h4>
<span class="button-green-download2-big">View Details</span>
</figcaption>
</figure>
</a>
<div class="browse-movie-bottom">
<a href="https://yts.mx/movies/the-tax-collector-2020" class="browse-movie-title">The Tax Collector</a>
<div class="browse-movie-year">2020</div>
</div>

  </div>-->
  <div>
    <video-frame></video-frame>
    <video-thumbnails></video-thumbnails>
    <div class="videos-container" id="app">
      <div class="video-player">
        <video-frame :source="current"></video-frame>
      </div>
      <div class="video-choices">
        <video-thumbnails :movies="movies" v-on:choose-movie="handleChangeCurrent"></video-thumbnails>
      </div>
    </div>
  </div>
</template>
<script>
const axios = require("axios");

const videoTag = {
  template: `
    <iframe
            allowFullScreen
            frameborder="0"
            height="376"                       :src="source.trailer"
              style="width: 100%; min-width: 750px"
            />
`,
  props: ["source"],
};

const thumbnail = {
  template: `
  <div class="thumbnails">
 <div v-for="movie in movies">
    <div class="poster" @click="changeCurrent(movie)">
      <img :src="movie.poster" height="200"alt="">
    </div>
  </div>
  </div>
`,
  props: ["movies"],
  methods: {
    changeCurrent(movie) {
      this.$emit("choose-movie", movie);
    },
  },
};
export default {
  components: {
    "video-frame": videoTag,
    "video-thumbnails": thumbnail,
  },
  data() {
    return {
      api: "http://www.omdbapi.com/?apikey=9d46d29a&",
      movies: [],
      current: null,
    };
  },
  created() {
    axios.get(this.api).then((res) => {
      this.movies = res.data;
      this.current = this.movies[0];
    });
  },
  methods: {
    handleChangeCurrent(movie) {
      this.current = movie;
    },
  },
};
</script>
<style lang="scss" scoped>
body {
  background: #1e3c72;
  background: linear-gradient(to right, #1e3c72, #2a5298);
  padding: 30px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.videos-container {
  background: #333;
  padding: 10px;
  box-shadow: 0 0 50px 5px rgba(0, 0, 0, 0.25);
  color: #fff;
}

.video-player {
  min-height: 300px;
  width: 100%;
  background: #000;
  margin-bottom: 10px;
}

.video-choices {
  display: flex;

  :not(:last-child) {
    margin-right: 5px;
  }

  img {
    height: 100px;
  }
}
.poster {
  float: left;
}
.thumbnails {
  display: flex;
  justify-content: left;
}
</style>