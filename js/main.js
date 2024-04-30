import { movieListAPI, handleSearch } from "./movie.js"

const $pageUp = document.getElementById('pageUp');
const $main_menus = document.querySelector("#main_menus");

let scrollHeight;

addEventListener('scroll', (e) => {
    scrollHeight = e.target.documentElement.scrollTop;
    sessionStorage.setItem("scrollY", scrollHeight);
});

document.getElementById('search').addEventListener('submit', handleSearch);

$main_menus.addEventListener('click', (e) => {
    console.log($main_menus); 
    const targetBtn = e.target.closest('.menu_btn');
    if (targetBtn && !targetBtn.classList.contains('chk')) {
        const $chk = document.querySelector(".chk");
        if (targetBtn.id === "popular") {
            movieListAPI();
        } else if (targetBtn.id === "top_rated") {
            movieListAPI("/3/movie/top_rated?language=en-US&page=1");
        }
        if ($chk) {
            $chk.classList.remove("chk");
        }
        targetBtn.classList.add('chk');
    }
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


