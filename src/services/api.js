
import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/
// URL da API: /movie/now_playing?api_key=34ec1e0be0a6b6493e6a8cb227bb8d1c&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;