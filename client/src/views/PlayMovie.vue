<template>
    <div>
        <div>
            <video controls src="http://localhost:5000/api/video/stream/Anaconda.1997.1080p.BrRip.x264.YIFY.mp4">
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