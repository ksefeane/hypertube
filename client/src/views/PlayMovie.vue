<template>
    <div>
        <div>
            <video id="player-overlay" controls src="">
            No video support
            
            </video>

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

            <p>{{ comment_content }}</p>

            <div id="comm">
                <div v-for="comment in comments" v-bind:key="comment.id">
                    <p><i>{{ comment.created_at }}</i> <strong>{{ comment.username }}</strong>: {{ comment.content }}</p>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { axios_post } from "../functions/functions";
import moment from 'moment';


export default {
    data() {
        return {
            play: false,
            movie: 'Spidermanp',
            comment_content:'',
            submit: true,
            errors:[],
            success:[],
            username: localStorage.getItem('user'),
            comments: []
        }
    },
    methods: {
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
            this.success = []
            const data = {
                'username': this.username,
                'movie': this.movie,
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
            } else {
                this.errors.push("An unexpected error happened")
            }   
        },
        async fetchComments() {
            const data = {
                'movie': this.movie
            }
            var results = await axios_post('/api/video/fetch-comments', data)
            if (results.data.error) {
                this.errors.push(results.data.error)
            } else {
                this.comments = results.data
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
    created() {
        this.username = localStorage.getItem('user')
        console.log(moment().format("YYYY-MM-DD HH:mm:ss"))
        console.log(this.username)
        this.fetchComments()
    }
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

#player-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 999;
}

video {
  display: block;
  width: 100%;
  height: 100%;
}
</style>