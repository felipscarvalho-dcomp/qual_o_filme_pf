const movies = [
  {
    title: "Dirty Dancing - Ritmo Quente",
    acceptable_guess: ["dirty dancing - ritmo quente", "dirty dancing", "dirty dancing ritmo quente", "dirty dancing: ritmo quente", "ritmo quente"],
    start_image: "img_1",
    hints: {
      year: "1986",
      genre: ["drama romântico", " musical"],
      director: "Emile Ardolino",
      sumary:
        "Passando o verão em um resort em Catskills com sua família, Frances 'Baby' Houseman se apaixona pelo instrutor de dança do acampamento, Johnny Castle.",
    },
  },
  {
    title: "Thor: Ragnarok",
    acceptable_guess: ["thor: ragnarok", "thor ragnarok", "thor 3"],
    start_image: "img_7",
    hints: {
      year: "2017",
      genre: "super-herói",
      director: "Taika Waititi",
      sumary:
        "Thor está aprisionado do outro lado do universo, sem seu martelo, e se vê em uma corrida para voltar até Asgard e impedir o Ragnarok, que está nas mãos de uma nova e poderosa ameaça, a terrível Hela.",
    },
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
      <div class="hint__card" id="hint-card">
        <button class="btn" type="button" id="btn-hint" onClick="hint()">Dica</button>
      </div>
      <div class="movie__images__slider"  id="movie-images">
		    <img class="movie__image" src="${`./assets/movies/${movie.start_image}.jpeg`}" alt="${`image_${movie.start_image.slice(-1)}`}" />
      </div>
		  <form class="movie__form" id="movie-form">
		  	<input class="input" id="guess-input" type="text" />
		  	<button class="btn" style="margin: 1rem .5rem" type="button" onClick="guessMovie()">Tentar</button>
		  </form>
    `;

  document.getElementById("movie-card").innerHTML = startCard;
};

const restart = () => {
  window.location.reload();
};

const guessMovie = () => {
  const playerGuess = document.getElementById("guess-input").value;

  // Check if the guess is correct
  if (movie.acceptable_guess.includes(playerGuess.toLowerCase())) {
    const movieCard = document.getElementById("movie-card");
    const movieForm = document.getElementById("movie-form");

    movieForm.innerHTML = movieForm.innerHTML + `<button type="button" onClick="restart()">Tentar novamente</button>`;
    movieCard.innerHTML = "<h2>Você acertou!!!</h2>" + movieCard.innerHTML;
  } else {
    // If not, show next image
    const movieImages = document.getElementById("movie-images");
    const imagesNumber = movieImages.childElementCount;

    if (imagesNumber < 6) {
      const firstImageNumber = movieImages.children[0].src.slice(-6, -5);
      const newImageContainer = Object.freeze(document.createElement("div"));
      newImageContainer.innerHTML = `<img class="movie__image" src="${`./assets/movies/img_${
        +firstImageNumber + imagesNumber
      }.jpeg`}" alt="${`image_${+firstImageNumber + imagesNumber}`}" />`;

      movieImages.appendChild(newImageContainer.firstChild);
    } else {
      // If wasted all guesses, show restart button
      const movieCard = document.getElementById("movie-card");
      const movieForm = document.getElementById("movie-form");

      movieForm.children[1].remove();

      movieForm.innerHTML =
        movieForm.innerHTML + `<button class="btn" style="margin: 1rem .5rem" type="button" onClick="restart()">Tentar novamente</button>`;
      movieCard.innerHTML = "<h2>Você Falhou!!!</h2>" + movieCard.innerHTML;
    }
  }
};

// função para o botão de dica
const hint = () => {
  const hintCard = `
  <h2 style="padding-top: 1rem">Dicas</h2>
  <p>Ano de lançamento: ${movie.hints.year} </p>
  <button class="btn" type="button" id="btn-hint" onClick="hint()">Dica</button>
        `;
  const hintCard2 = `<h2>Dicas</h2>
  <p>Ano de lançamento: ${movie.hints.year} </p>
  <p>Gênero: ${movie.hints.genre} </p>
  <button class="btn" type="button" id="btn-hint" onClick="hint()">Dica</button>
        `;
  const hintCard3 = `<h2>Dicas</h2>
  <p>Ano de lançamento: ${movie.hints.year} </p>
  <p>Gênero: ${movie.hints.genre} </p>
  <p>Diretor: ${movie.hints.director} </p>
  <button class="btn" type="button" id="btn-hint" onClick="hint()">Dica</button>
        `;
  const hintCard4 = `
  <h2>Dicas</h2>
  <p>Ano de lançamento: ${movie.hints.year} </p>
  <p>Gênero: ${movie.hints.genre} </p>
  <p>Diretor: ${movie.hints.director} </p>
  <p>Sinópse: ${movie.hints.sumary} </p>
  <button class="btn" type="button" id="btn-hint" onClick="hint()">Dica</button>
  `;

  if (document.getElementById("hint-card").childElementCount === 1) {
    return (document.getElementById("hint-card").innerHTML = hintCard);
  } else if (document.getElementById("hint-card").childElementCount === 2) {
    return (document.getElementById("hint-card").innerHTML = hintCard2);
  } else if (document.getElementById("hint-card").childElementCount === 3) {
    return (document.getElementById("hint-card").innerHTML = hintCard3);
  } else if (document.getElementById("hint-card").childElementCount === 4) {
    return (document.getElementById("hint-card").innerHTML = hintCard4);
  } else return (document.getElementById("hint-card").innerHTML = hintCard4);
};
