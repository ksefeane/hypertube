<template>
  <div>
    <app-header></app-header>
    <br />
    <section>
      <br />
      <div>
        <div v-if="show">
          <video controls :src="stream" height="500" width="900">No video support</video>
        </div>
        <h1>{{ id }}</h1>
        <!-- <p>{{ film }}</p> -->
        <img v-if="pic" :src="film.img" alt />
        <br />
        <small v-for="loc in locals" :key="loc">
          <button @click="play_local(loc.name)">play {{loc.name}}</button>
          <br />
        </small>

        <small v-if="loading">downloading {{file_name}} {{size}}</small><br>

        <small v-for="(torrent, index) in torrents" :key="index">
          <button
            @click="download_film(torrent.magnet)"
          >download {{torrent.quality}} {{torrent.name}} {{torrent.size}} {{torrent.seeders}} seeders</button>
          <br />
        </small>
        <br />
        <br />
        <small>Score: {{ film.score }}</small>
        <br />
        <!-- <small>Rating: {{ film.mpa_rating }}</small> -->
        <br />
        <p>Year: {{ film.year }}</p>
        <p>Runtime: {{ film.runtime }} minutes</p>
        <p>{{ film.summary }}</p>
        <!-- <button @click="download_film" v-if="!show">Download {{ id }}</button> -->
      </div>
      <div>
        <form>
          <div id="err" v-for="error in errors" v-bind:key="error">
            <span>{{ error }}</span>
          </div>
          <div id="succ" v-for="succ in success" v-bind:key="succ">
            <span>{{ succ }}</span>
          </div>
          <label for="comment">Comment</label>
          <br />
          <textarea
            v-model="comment_content"
            id="comment_content"
            name="comment_content"
            rows="4"
            cols="50"
          />
        </form>
        <button v-on:click="validate">Submit</button>
        <br />
        <br />

        <div id="comm">
          <div v-for="comment in comments" v-bind:key="comment.id">
            <p>
              <i>{{ comment.created_at.substr(0, 10) }}, {{ comment.created_at.substr(11, 5) }} </i>
              <strong> {{ comment.username }} </strong>
              : {{ comment.content }}
            </p>
          </div>
        </div>
      </div>
    </section>
    <app-footer></app-footer>
  </div>
</template>

<script>
import { axios_post, validComment, htmlEntities } from "../functions/functions";
import moment from "moment";
import axios from "axios";
import sweet from "sweetalert";
import jwt from 'njwt'
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
      film: {},
      id: this.$route.params.id,
      show: false,
      pic: true,
      loading: false,
      ready: false,
      stream: "",
      file_name: "",
      magnet: "",
      type: "",
      torrents: [],
      locals: [],
      errors: [],
      success: [],
      username: '',
      comments: [],
      comment_content: "",
      size: '0kb'
    };
  },
  methods: {
    async movieinfo() {
      let mov = await axios
        .get("http://localhost:5000/api/library/movieinfo/" + this.id)
        .catch((e) => {
          console.log(e);
        });
      let ani = await axios
        .get("http://localhost:5000/api/library/animeinfo/" + this.id)
        .catch((e) => {
          console.log(e);
        });
      if (mov.data.length) {
        this.film = mov.data[0];
        this.torrents = mov.data[0].torrents;
        // console.log(this.film);
      } else {
        this.film = ani.data.find((e) => e.title == this.id);
        this.animeTorrents();
      }
    },
    async getLocals() {
        let loc = await axios
            .get('http://localhost:5000/api/video/local/'+this.id)
            .catch(e => {console.log(e)})
        if (loc.data.locals) {
            this.locals = loc.data.locals
        }
    },
    async animeTorrents() {
      let ani = await axios
        .get("http://localhost:5000/api/library/animetorrents/" + this.id)
        .catch((e) => {
          console.log(e);
        });
      this.torrents = ani.data;
      // console.log(this.film.torrents)
      // console.log(ani.data)
    },
    async download_film(magnet) {
      this.magnet = magnet;
      let status = null;
      while (!status) {
        let mov = await axios
          .get(
            `http://localhost:5000/api/video/downloadMagnet/${this.id}/${magnet}`
          )
          .catch((e) => {
            console.log(e);
          });
          status = 1
        if (mov.data.status == 'downloading' || mov.data.status == 'exists') {
          status = mov.data.status;
          this.file_name = mov.data.file_name;
            this.loading = true
          sweet("downloading", `${this.file_name}`);
          this.stream_movie();
        }
      }
    },
    async play_local(name) {
        this.file_name = name
        this.show = true
        this.pic = false
        this.stream = `http://localhost:5000/api/video/stream/${this.file_name}`;
    },
    async stream_movie() {
        let load = true
        while (load) {
        let vid = await axios
            .get("http://localhost:5000/api/video/status/" + this.file_name)
            .catch((e) => {console.log(e)})
        // console.log(vid.data);
        this.size = vid.data.size
        if (vid.data.status === "ready") {
            this.ready = true;
            load = false
        }
      }
      if (this.ready) {
        this.show = true;
        this.pic = false;
        this.stream = `http://localhost:5000/api/video/stream/${this.file_name}`;
      }
    },
    validate: function () {
      var checkComment = validComment(this.comment_content)
      this.errors = [];
      this.success = []
      if (checkComment !== "good") {
        this.errors.push(checkComment);
      } else {
        this.addComment();
      }
    },
    addComment: async function () {  
      this.success = [];
      const data = {
        username: this.username,
        movie: this.id,
        comment: htmlEntities(this.comment_content),
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      //console.log(data)
      var results = await axios_post("/api/video/addcomment", data);
      if (results !== "Oops!") {
        if (results.data.error) {
          this.errors.push(results.data.error);
        } else if (results.data.success) {
          this.success.push("Comment Added!!!");
          this.fetchComments();
          this.clean_input();
        }
      } else {
        this.errors.push("An unexpected error happened");
      }
    },
    async getUser() {
        let token = localStorage.getItem("jwt")
        let decode = await jwt.verify(token, 'secret')
        this.username = decode.body.name
    },
    async fetchComments() {
      const data = {
        movie: this.id,
      };
      var results = await axios_post("/api/video/fetch-comments", data);
      // console.log(results.data)
      if (results.data.error) {
        this.errors.push(results.data.error);
      } else {
        this.comments = results.data;
      }
    },
    play_movie() {
      this.play = true;
    },
    clean_input() {
      (this.comment_content = ""), (this.errors = []);
    },
  },
  mounted() {
    EventBus.$on("movie_details", (data) => {
      this.film = data;
    });
  },
  created() {
    this.movieinfo();
    this.getUser()
    this.getLocals()
    this.fetchComments();
  },
};
</script>
<style scoped>
button {
  margin-top: 10px;
}
</style>