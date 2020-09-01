const axios = require('axios');

//fetches all the movies from yts
export async function movieLibrary(req, res) {
    try {
        const response = await axios.get('https://yts.mx/api/v2/list_movies.json')
        /**
         * response.data.data
         * Fetches the json object which includes movie_count, limit = 20 for 20 movies per page
         * and page_number = 1
         * 
         * response.data.data.movies
         * access the movie object name attribute which has all the information about the movies
         * 
         * response.data.data.movies[5]
         * if you wanna access a specific element 
         */
        console.log(response.data.data.movies);
        res.send(response.data.data);
    } catch (error) {
        console.log(error);
    }
      
}