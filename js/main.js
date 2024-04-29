const ApiKey = '21ccf5793f9e51cfba0198fa23b3d541';
const ApiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWNjZjU3OTNmOWU1MWNmYmEwMTk4ZmEyM2IzZDU0MSIsInN1YiI6IjY2MmEwZDFkYmYzMWYyMDA5YWUzMzAzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sNlesGPpMfB6Nt3ZqEFMSIwcE88KWjPts2Waw_I2qp8';

const $form = document.getElementById('search');
const $pageUp = document.getElementById('pageUp');
const $menu_btn = document.querySelectorAll('.menu_btn');

let movies, scrollHeight;

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
    console.log(api.results);
    await createMovieList(movies);
} 


const createMovieList = async (movies)  => {
    document.querySelector("#movie-list").innerHTML = movies.map((e) =>
        `
        <div class="movie ${e.id}" onClick="alert('영화 id: ${e.id}')">
            <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.id}">
            <div class="hover">
                <h3 class="title bold">
                ${e.title}
                </h3>
                <p>
                ${e.overview}
                </p>
                <span>평점: ${e.vote_average}</span>
            </div>
        </div>
        `
    ).join("");


}

const handleSearch = (e) => {
    e.preventDefault();
    let movieSearch = movies.filter((movie) => movie.title.toLowerCase().includes(e.target[0].value.toLowerCase()));
    createMovieList(movieSearch);
}



addEventListener('scroll', (e) => {
    scrollHeight = e.target.documentElement.scrollTop;
    sessionStorage.setItem("scrollY", scrollHeight);
});



$menu_btn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if(!e.target.classList.contains('chk')){
            let $chk = document.getElementsByClassName("chk")[0];
            if(e.target.getAttribute('id') === "popular"){
                movieListAPI();
            }else if(e.target.getAttribute('id') === "top_rated"){
                movieListAPI("/3/movie/top_rated?language=en-US&page=1");
            }
            $chk.classList.remove("chk");
            e.target.className += ' chk';
        }
    });
});



$pageUp.addEventListener('click', (e) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

(async function init() {
    await movieListAPI();

    document.querySelector("#search_input").focus();
    const scrollY = parseInt(sessionStorage.getItem("scrollY"));
    if(scrollY && scrollY > 0){
        window.scrollTo(0, scrollY);
    }
})()


