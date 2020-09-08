<template>
    <div>
        <h1>{{ id }}</h1>
        <!-- <p>{{ film }}</p> -->
        <img :src="film.large_cover_image" alt="">
        <br>
        <small>Score: {{ film.rating }}</small> <br>
        <small>Rating: {{ film.mpa_rating }}</small>
        <br>
        <p>Year: {{ film.year }}</p>
        <p>Runtime: {{ film.runtime }} minutes</p>
        <p>{{ film.summary }}</p>
        <button @click="download_film">Download {{ id }}</button>
    </div>
</template>

<script>
import EventBus from "../event_bus/event_bus";

export default {
    data() {
        return {
            film: {},
            id: this.$route.params.id,
        }
    },
    methods: {
        download_film() {
            this.$router.push('/play')
        }
    },
    mounted() {
        EventBus.$on('movie_details', (data) => {
            this.film = data;
            console.log(data)
            // alert('created')
        })
    }
}
</script>