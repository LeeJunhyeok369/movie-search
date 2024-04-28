const ApiKey = '21ccf5793f9e51cfba0198fa23b3d541';
const ApiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWNjZjU3OTNmOWU1MWNmYmEwMTk4ZmEyM2IzZDU0MSIsInN1YiI6IjY2MmEwZDFkYmYzMWYyMDA5YWUzMzAzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sNlesGPpMfB6Nt3ZqEFMSIwcE88KWjPts2Waw_I2qp8';

const $popular = document.getElementById("popular");
const $top_rated = document.getElementById("top_rated");
const $form = document.getElementById('search');

let movies;

const ApiFetch = async (url) => {
    let json;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            // Authorization: `Bearer ${ApiToken}`
          }
      };

      try {
          const response = await fetch(`https://api.themoviedb.org${url}${ url.indexOf('?')!==-1?"&":"?" }api_key=${ApiKey}`, options)
          json = await response.json();
      } catch (error) {
        console.error(error);
      }
    return json;
}

const movieListAPI = async (url = "/3/movie/popular?language=en-US&page=1") => {
    const api = await ApiFetch(url);
    movies = api.results;
    createMovieList(movies);
}


const createMovieList = async (movies)  => {
    let html = "";
    for (let i = 0; i < movies.length; i++) {
        let movie = await ApiFetch(`/3/movie/${movies[i].id}?original_language="eu-US"`, );
        html += `
        <div class="movie ${movie.id}" onClick="alert('영화 id: ${movie.id}')">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.id}">
            <div class="hover">
                <h3 class="title bold">
                ${movie.title}
                </h3>
                <p>
                ${movie.overview}
                </p>
                <span>평점: ${movie.vote_average}</span>
            </div>
        </div>
        `
    }

    document.querySelector("#movie-list").innerHTML = html;
}

const handleSearch = (e) => {
    e.preventDefault();
    let movieSearch = movies.filter((movie) => movie.title.toLowerCase().includes(e.target[0].value.toLowerCase()));
    console.log(movieSearch);
    createMovieList(movieSearch);
}

let scrollHeight = 0;
addEventListener('scroll', (e) => {
    scrollHeight = e.target.documentElement.scrollTop;
    // bottom = el.scrollHeight - el.scrollTop === el.clientHeight
    console.log(scrollHeight);
    sessionStorage.setItem("scrollY", scrollHeight);
});


const html = document.querySelector('html');
const scrollY = parseInt(sessionStorage.getItem("scrollY"));
if(scrollY && scrollY > 0){
    window.scrollTo(scrollY,0);
    console.log(scrollY);
}
$top_rated.addEventListener('click', (e) => {
    if(!e.target.classList.contains('chk')){
        let $chk = document.getElementsByClassName("chk")[0];
        movieListAPI("/3/movie/top_rated?language=en-US&page=1");
        $chk.classList.remove("chk");
        e.target.className += 'chk';
    }
});

$popular.addEventListener('click', (e) => {
    if(!e.target.classList.contains('chk')){
        let $chk = document.getElementsByClassName("chk")[0];
        movieListAPI();
        $chk.classList.remove("chk");
        e.target.className += 'chk';
    }
});

(function init() {
    movieListAPI();


})()











