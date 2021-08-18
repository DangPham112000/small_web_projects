const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const mainEl = document.querySelector('main');
const formEl = document.getElementById('form');
const searchEl = document.getElementById('search');


// Initialy get some movies
getMovies(APIURL);

async function getMovies(URL) {
    // clear main
    mainEl.innerHTML = '';
    
    const resp = await fetch(URL);
    const respData = await resp.json();

    console.log(respData);

    respData.results.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <div class="movie-media">
                <img src="${IMGPATH + movie.poster_path}" alt="${movie.original_title}">
            </div>
            <div class="movie-info">
                <h3>${movie.original_title}</h3>
                <span class="${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
            </div>
            <div class="overview">
                <img src="${IMGPATH + movie.backdrop_path}" alt="${movie.original_title}">
                <div class="overview-info">
                    <h3>${movie.original_title}</h3>
                    <h4>Overview:</h4>
                    <p>${movie.overview}</p>
                </div>
            </div>
        `;

        mainEl.appendChild(movieEl);
    });
}


function getClassByRate(rate) {
    if (rate >= 8) {
        return "green";
    } else if (rate >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchText = searchEl.value;
    if (searchText) {
        const url = SEARCHAPI + searchText;
        getMovies(url);

        searchEl.value = '';
    }
});