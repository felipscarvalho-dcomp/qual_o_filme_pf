const movies = [
  {
    title: "Dirty Dancing - Ritmo Quente",
    acceptable_guess: ["dirty dancing - ditmo duente", "dirty dancing", "dirty dancing ritmo quente", "dirty dancing: ritmo quente"],
    start_image: "img_1",
  },
  {
    title: "Thor: Ragnarok",
    acceptable_guess: ["thor: ragnarok", "thor ragnarok", "thor 3"],
    start_image: "img_7",
  },
];

const getRandomGame = () => {
  const randomIndex = Math.floor(Math.random() * movies.length);

  return movies[randomIndex];
};

const movie = getRandomGame();

const startGame = () => {
  document.getElementById("start-btn").style.display = "none";

  const startCard = `
		<h2>Acerte o Filme</h2>
        <div id="movie-images">
		    <img src="${`./assets/movies/${movie.start_image}.jpeg`}" alt="${`image_${movie.start_image.slice(-1)}`}" />
        </div>
		<form>
			<input id="guess-input" type="text" />
			<button type="button" onClick="guessMovie()">Tentar</button>
		</form>
    `;

  document.getElementById("movie-card").innerHTML = startCard;
};

const guessMovie = () => {
  const playerGuess = document.getElementById("guess-input").value;

  if (movie.acceptable_guess.includes(playerGuess.toLowerCase())) {
    const movieCard = document.getElementById("movie-card");

    movieCard.innerHTML = "<h2>Você acertou!!!</h2>" + movieCard.innerHTML;
  } else {
    const movieImages = document.getElementById("movie-images");
    const imagesNumber = movieImages.childElementCount;

    if (imagesNumber < 6) {
      const firstImageNumber = movieImages.children[0].src.slice(-6, -5);
      const newImageContainer = Object.freeze(document.createElement("div"));
      newImageContainer.innerHTML = `<img src="${`./assets/movies/img_${+firstImageNumber + imagesNumber}.jpeg`}" alt="${`image_${
        +firstImageNumber + imagesNumber
      }`}" />`;

      movieImages.appendChild(newImageContainer.firstChild);
    } else {
      const movieCard = document.getElementById("movie-card");

      movieCard.innerHTML = "<h2>Você Falhou!!!</h2>" + movieCard.innerHTML;
    }
  }
};
