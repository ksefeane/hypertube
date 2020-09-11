<template>
    <div>
        <div>
            <video controls src="http://localhost:5000/api/video/stream/The.Last.Avatar.2014.720p.WEBRip.x264.AAC-[YTS.MX].mp4">
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