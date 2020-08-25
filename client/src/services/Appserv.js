import { API, key } from '../services/api';

const language = 'en-US';
export default {
    getConfiguration() {
        return API.get(`configuration?api_key=${key}`);
      },
      getMoviesUpcoming(page){
        const url = `movie/upcoming?api_key=${key}&language=${language}&page=${page}`;
        return API.get(url);
      }
    };