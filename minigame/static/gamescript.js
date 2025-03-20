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
    const image1 = document.getElementById("film1");
    const image2 = document.getElementById("film2");
    const film1text = document.getElementById("film1txt");
    const film2text = document.getElementById("film2txt");

    if (film == 'film1') {
        if (rating1 >= rating2) { score += 1;}
        else { 
            if (score > highScore) {highScore = score}
            score = 0 
        }
    }
    if (film == 'film2') {
        if (rating2 >= rating1) { score += 1; }
        else { 
            if (score > highScore) {highScore = score}
            score = 0 
        }
    }

    const response = await fetch('http://127.0.0.1:5000/api/movies/random');
    const randomFilms = await response.json();
    console.log(randomFilms);

    image1.src = "https://image.tmdb.org/t/p/original" + randomFilms[0].poster_path;
    image2.src = "https://image.tmdb.org/t/p/original" + randomFilms[1].poster_path;
    film1text.innerHTML = randomFilms[0].title;
    film2text.innerHTML = randomFilms[1].title;
    document.getElementById("score").innerText = "current score: " + score;
    rating1 = randomFilms[0].vote_average;
    rating2 = randomFilms[1].vote_average;
}