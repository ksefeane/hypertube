<template>
    <div>
        <div>
            <video controls src="../clips/clip.mp4">
            No video support
            </video>
        </div>
    </div>
</template>

<script>

export default {
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