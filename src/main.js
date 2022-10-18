// const axios = require("axios").default;

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
    params: {
        'api_key': API_KEY
    }
})

async function getTrendingMoviesPreview(){
    // /trending/{media_type}/{time_window}
    const media_type = 'movie';
    const time_window = 'day';
    const {data} = await api('/trending/' + media_type + '/' + time_window);
    // const data = await res.json();

    const movies = data.results;
    console.log(movies);

    trendingMoviesPreviewList.innerHTML = '';

    movies.forEach(movie => {        
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const imgMovie = document.createElement('img');
        imgMovie.classList.add('movie-img');
        imgMovie.alt = movie.title;
        imgMovie.src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;

        movieContainer.appendChild(imgMovie);
        trendingMoviesPreviewList.appendChild(movieContainer);
    });
}

async function getCategoryMoviesPreview(){
    // /genre/movie/list
    const {data} = await api('genre/movie/list');
    // const data = await res.json();

    console.log(data)
    const genres = data.genres;

    categoriesPreviewList.innerHTML = '';

    genres.forEach(genre => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const titleCategory = document.createElement('h3');
        titleCategory.classList.add('category-title');
        titleCategory.id = 'id' + genre.id;
        titleCategory.innerText = genre.name;
        categoryContainer.appendChild(titleCategory);
        categoriesPreviewList.appendChild(categoryContainer);
    });
}

