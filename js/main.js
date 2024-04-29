import { movieListAPI, handleSearch } from "./movie.js"

const $pageUp = document.getElementById('pageUp');
const $menu_btn = document.querySelectorAll('.menu_btn');

let scrollHeight;

addEventListener('scroll', (e) => {
    scrollHeight = e.target.documentElement.scrollTop;
    sessionStorage.setItem("scrollY", scrollHeight);
});

document.getElementById('search').addEventListener('submit', handleSearch);

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


