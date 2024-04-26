const ApiKey = '21ccf5793f9e51cfba0198fa23b3d541';
const ApiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWNjZjU3OTNmOWU1MWNmYmEwMTk4ZmEyM2IzZDU0MSIsInN1YiI6IjY2MmEwZDFkYmYzMWYyMDA5YWUzMzAzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sNlesGPpMfB6Nt3ZqEFMSIwcE88KWjPts2Waw_I2qp8';

const ApiFetch = async (url = "/3/movie/popular?language=en-US&page=1") => {
// const ApiFetch = async (url = "/3/movie/top_rated?language=en-US&page=1") => {
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
          console.log(json);
      } catch (error) {
        console.error(error);
      }
    return json;
}

const movieList = async () => {
    const api = await ApiFetch();
    const movies = api.results;
    let html = "";
    for (let i = 0; i < movies.length; i++) {
        let movie = await ApiFetch(`/3/movie/${movies[i].id}?original_language="eu"`, );
        console.log(movie);
        html += `${movie.id}<br>${movie.original_title}<br> ${movie.overview}<br> <br>${movie.poster_path}${movie.vote_average}<br> <br>`
    }

    document.querySelector("#movie-list").innerHTML = html;
}

(function init() {
    // movieList();
})()

