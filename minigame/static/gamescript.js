let score = 0;
let highScore = 0;
let rating1 = 0;
let rating2 = 0;

window.onload = function() {
    findFilms();
};

async function findFilms () {
    const image1 = document.getElementById("film1");
    const image2 = document.getElementById("film2");
    const film1text = document.getElementById("film1txt");
    const film2text = document.getElementById("film2txt");

    const response = await fetch('http://127.0.0.1:5000/api/movies/random');
    const randomFilms = await response.json();
    console.log(randomFilms);

    image1.src = "https://image.tmdb.org/t/p/original" + randomFilms[0].poster_path;
    image2.src = "https://image.tmdb.org/t/p/original" + randomFilms[1].poster_path;
    film1text.innerHTML = randomFilms[0].title;
    film2text.innerHTML = randomFilms[1].title;
    rating1 = randomFilms[0].vote_average;
    rating2 = randomFilms[1].vote_average;
}

async function guessFilm(film) {
    const film1text = document.getElementById("film1txt");
    const film2text = document.getElementById("film2txt");
    const image1 = document.getElementById("film1");
    const image2 = document.getElementById("film2");
    const response1 = document.getElementById("bg-film1")
    const response2 = document.getElementById("bg-film2")

    if (film == 'film1') {
        if (rating1 >= rating2) { 
            response1.innerHTML = "&#10003"
            response1.style.color = "rgb(29, 188, 53)";
            response1.style.background = "rgba(43, 130, 19, 0.8)";
            score += 1; 
        }
        else { 
            response1.innerHTML = "✖"
            response1.style.color = "rgb(255, 0, 0)";
            response1.style.background = "rgba(162, 33, 33, 0.8)";
            if (score > highScore) {highScore = score}
            score = 0 
        }
        response1.style.opacity = 1
    }
    if (film == 'film2') {
        if (rating2 >= rating1) { 
            response2.innerHTML = "&#10003"
            response2.style.color = "rgb(29, 188, 53)";
            response2.style.background = "rgba(43, 130, 19, 0.8)";
            score += 1;
        }
        else { 
            response2.innerHTML = "✖"
            response2.style.color = "rgb(255, 0, 0)";
            response2.style.background = "rgba(162, 33, 33, 0.8)";
            if (score > highScore) {highScore = score}
            score = 0
        }
        response2.style.opacity = 1
    }
    document.getElementById("score").innerText = "current score: " + score;
    document.getElementById("high-score").innerText = "high score: " + highScore;

    const response = await fetch('http://127.0.0.1:5000/api/movies/random');
    const randomFilms = await response.json();
    console.log(randomFilms);

    image1.style.opacity = 0;
    image2.style.opacity = 0;
    await new Promise(resolve => setTimeout(resolve, 500));
    response1.style.opacity = 0;
    response2.style.opacity = 0;

    image1.src = "https://image.tmdb.org/t/p/original" + randomFilms[0].poster_path;
    image2.src = "https://image.tmdb.org/t/p/original" + randomFilms[1].poster_path;
    await new Promise(resolve => setTimeout(resolve, 500));
    film1text.innerHTML = randomFilms[0].title;
    film2text.innerHTML = randomFilms[1].title;
    rating1 = randomFilms[0].vote_average;
    rating2 = randomFilms[1].vote_average;

    image1.style.opacity = 1;
    image2.style.opacity = 1;
}