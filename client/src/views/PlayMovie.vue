<template>
    <div>
        <app-header></app-header>
        <div v-if="play">
            <video controls src="../clips/clip.mp4" autoplay >
            No video support
            </video>
        </div>
        <div v-else>
            <button @click="play_movie">Play {{ movie }}</button>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
export default {
    components: {
        'app-header': Header,
        'app-footer': Footer
    },
    data() {
        return {
            play: false,
            movie: 'test'
        }
    },
    methods: {
        play_movie() {
            this.play = true
        }
    }
}
</script>