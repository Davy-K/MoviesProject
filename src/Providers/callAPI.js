
export const fetchPopularMovies = async () => {
    try {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: process.env.API_ACCESS_TOKEN,
            },
        };

        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return null;
    }
};

export const fetchFavoriteMovies = async () => {
    try{
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: process.env.API_ACCESS_TOKEN,
            },
        };

        const response = await fetch('https://api.themoviedb.org/3/account/21572239/favorite/movies?language=en-US&page=1&sort_by=created_at.asc', options);
        if (!response.ok) {
            throw new Error(`HTTP error! ${response.status}`);
        }

        const data = await response.json();
        return data.results;

    }catch (error) {
        console.error('Error fetching favorite movies:', error);
        return null;
    }
}
