<template>
    <div>
        <div>
            <video controls src="http://localhost:5000/api/video/stream/The.Last.Avatar.2014.720p.WEBRip.x264.AAC-[YTS.MX].mp4">
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
                <textarea id="comment_content" name="comment_content" rows="4" cols="50" />
            </form>
            <button v-on:click="validate">Submit</button><br><br>
           
        </div>
    </div>
    
</template>

<script>
import { post_comment } from "../functions/functions";
import moment from 'moment';


export default {
    data() {
        return {
            play: false,
            movie: 'test',
            comment_content:'',
            submit: true,
            errors:[],
            success:[]
        }
    },
    methods: {
         validate: function() {
            this.errors = []
            if (this.comment_content.length < 4) {
                this.errors.push('Comments must have at least 10 characters')
                return
            }
            if (this.errors.length == 0) {
                this.addComment()
            }
         },
         addComment: async function() {
              const data = {
                'user_id': 3,
                'movie_id': 45,
                'comment_content': this.comment_content,
                'created_at': moment().format("YYYY-MM-DD HH:mm:ss")
            }
            var results = await post_comment('/api/video/addcomment', data)
            if (results !== "Error!") {
                if (results.data.error) {
                    this.errors = results.data.error
                } else if (results.data.success) {
                    this.success.push("Comment Added!!!")
                    this.clean_input()
                }
            } else {
                this.errors.push("An unexpected error happened")
            }   
         },
        play_movie() {
            this.play = true
        },
        clean_input() {
            this.comment_content = '',
            this.errors = []
        }
    }
}
</script>