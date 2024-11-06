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


export const fetchFavoriteMovies = async () => {
    try{
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: REACT_APP_ACCESS_TOKEN,
        },
      };
      let response = [];
      await fetch('https://api.themoviedb.org/3/account/21572239/favorite/movies?language=en-US&page=1&sort_by=created_at.asc', options)
      .then(res => res.json())
      .then(res => {
        response = res;
      });
      return response.results;
        // const response = await api.get('/account/21572239/favorite/movies?language=en-US&page=1&sort_by=created_at.asc');
        // return response.data.results;
    } catch (error) {
        console.error('Error fetching Favorite movies:', error);
      throw error;
    }
};
