import axios from 'axios';
import {REACT_APP_API_KEY, REACT_APP_ACCESS_TOKEN} from '@env';

const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
      api_key: REACT_APP_API_KEY,
    },
  });


export const fetchBestMovies = async () => {
    try {
        const response = await api.get('/movie/popular', {
            page:1,
          });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching Best movies:', error);
        throw error;
    }
};

export const fetchMarvelMovies = async () => {
    try {
      const response = await api.get('/discover/movie', {
        params: {
          with_companies: 420,
        },
      });
      return response.data.results;
    } catch (error) {
        console.error('Error fetching Marvel movies:', error);
      throw error;
    }
};

export const fecthTrendingMovies = async () => {
  try{
    const response = await api.get('/trending/movie/week', {
      params : {
        language: 'en-US',
      },
    });
    return response.data.results.slice(0, 5);
  } catch (error) {
        console.error('Error fetching Trending movies:', error);
      throw error;
    }
}
