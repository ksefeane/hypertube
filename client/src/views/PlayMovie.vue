<template>
    <div>
        <div>
            <video controls src="http://localhost:5000/api/video/stream/[HorribleSubs] Enen no Shouboutai S2 - 10 [1080p].mkv">
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