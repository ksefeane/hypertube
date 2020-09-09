<template>
    <div>
        <div>
            <video controls src="http://localhost:5000/api/video/stream/[HorribleSubs] Kanojo, Okarishimasu - 09 [720p].mkv">
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