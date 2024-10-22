const movies = [
  {
    title: "Dirty Dancing - Ritmo Quente",
    acceptable_guess: ["dirty dancing - ritmo quente", "dirty dancing", "dirty dancing ritmo quente", "dirty dancing: ritmo quente", "ritmo quente"],
    start_image: "1",
    hints: {
      year: "1986",
      genre: ["drama romântico", " musical"],
      director: "Emile Ardolino",
      synopsis:
        "Passando o verão em um resort em Catskills com sua família, Frances 'Baby' Houseman se apaixona pelo instrutor de dança do acampamento, Johnny Castle.",
    },
  },
  {
    title: "Thor: Ragnarok",
    acceptable_guess: ["thor: ragnarok", "thor ragnarok", "thor 3"],
    start_image: "7",
    hints: {
      year: "2017",
      genre: "super-herói",
      director: "Taika Waititi",
      synopsis:
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
      <p id="hints" class="hints"> </p>
        <button class="btn" type="button" id="btn-hint" onClick="hint(movie)">Dica</button>
      </div>
      </div> <br>
      <div class="movie__images__slider"  id="movie-images">
		    <img class="movie__image" src="${`./assets/movies/img_${movie.start_image}.jpeg`}" alt="${`image_${movie.start_image}`}" />
      </div>
      <div class="time__card" id="time-card"> </div>
      <div class="lobby_guesses" id="guess-lobby">
      <h3> Tentativas: </h3>
      </div>
		  <form class="movie__form" id="movie-form" onSubmit="return false;">
		  	<input class="input" id="guess-input" type="text" placeholder="Tente um filme ou aperte tentar para pular para a próxima imagem"/>
		  	<button class="btn" style="margin: 1rem .5rem" type="button" onClick="guessMovie()">Tentar</button>
		  </form>
    `;

  document.getElementById("movie-card").innerHTML = startCard;
  startTimer();
};

const restart = () => {
  window.location.reload();
};

// Function for the guess lobby
const guessLobby = (playerGuess) => {
  const guessLobby = document.getElementById("guess-lobby");

  // Conditionals to display the guesses
  if (movie.acceptable_guess.includes(playerGuess.toLowerCase())) {
    guessLobby.innerHTML = guessLobby.innerHTML + `<span> &#9989: ${playerGuess} </span>`;
  } else if (playerGuess == "") {
    guessLobby.innerHTML = guessLobby.innerHTML + `<span> &#10060: Pulou </span>`;
  } else {
    guessLobby.innerHTML = guessLobby.innerHTML + `<span> &#10060: ${playerGuess} </span>`;
  }
};

const guessMovie = () => {
  const playerGuess = document.getElementById("guess-input").value;
  guessLobby(playerGuess);
  // Check if the guess is correct
  if (movie.acceptable_guess.includes(playerGuess.trim().toLowerCase())) {
    const movieCard = document.getElementById("movie-card");
    const movieForm = document.getElementById("movie-form");

    movieForm.children[1].remove();
    movieForm.innerHTML =
      movieForm.innerHTML +
      `<button class="btn" style="margin: 1rem .5rem" id:"btn_tryAgain" type="button" onClick="restart()">Tentar novamente</button>`;
    movieForm.innerHTML = `<div style="width: 100%"> <h2 class="success">Você Acertou!</h2> <br> <div  class="movie__form"> ${movieForm.innerHTML} </div> </div>`;
  } else {
    // If not, show next image
    const movieImages = document.getElementById("movie-images");
    const imagesNumber = movieImages.childElementCount;

    if (imagesNumber < 6) {
      const firstImageNumber = Number(movie.start_image);
      const newImageContainer = Object.freeze(document.createElement("div"));
      newImageContainer.innerHTML = `<img class="movie__image" src="${`./assets/movies/img_${
        +firstImageNumber + imagesNumber
      }.jpeg`}" alt="${`image_${+firstImageNumber + imagesNumber}`}" />`;

      movieImages.appendChild(newImageContainer.firstChild);

      setTimeout(() => (movieImages.scrollLeft = movieImages.scrollWidth), 500);
    } else {
      // If wasted all guesses, show restart button
      const movieCard = document.getElementById("movie-card");
      const movieForm = document.getElementById("movie-form");

      movieForm.children[1].remove();

      movieForm.innerHTML =
        movieForm.innerHTML + `<button class="btn" style="margin: 1rem .5rem" type="button" onClick="restart()">Tentar novamente</button>`;
      movieForm.innerHTML = `<div style="width: 100%"> <h2 class="fail">Você Falhou!</h2>  <h3 class="answer"> Resposta: ${movie.title} </h3> <br> <div  class="movie__form"> ${movieForm.innerHTML} </div> </div>`;
    }
  }
};

// Function for the hint button
const hint = (movie) => {
  // Function to display the tips
  const hints = document.getElementById("hints");
  const hintCard = `
    <h2 style="padding-top: 1rem">Dicas</h2>
    <p id="hint_1">Ano de lançamento: ${movie.hints.year} </p>`;

  // Conditionals to display the hints in order
  if (document.getElementById("hint_1") === null) {
    return (hints.innerHTML = hintCard);
  } else if (document.getElementById("hint_2") === null) {
    return (hints.innerHTML = hints.innerHTML + `<p id="hint_2">Gênero: ${movie.hints.genre} </p>`);
  } else if (document.getElementById("hint_3") === null) {
    return (hints.innerHTML = hints.innerHTML + `<p id="hint_3">Diretor: ${movie.hints.director} </p>`);
  } else if (document.getElementById("hint_4") === null) {
    return (hints.innerHTML = hints.innerHTML + `<p id="hint_4">Sinópse: ${movie.hints.synopsis} </p>`);
  } else {
    hints.innerHTML;
  }
};

// Function to update the time
const updateTime = () => {
  // Constants to get information from html
  const seconds = document.getElementById("secs");
  const minutes = document.getElementById("mins");
  const secondsCount = Number(seconds.innerHTML);
  const minutesCount = Number(minutes.innerHTML);

  // Conditionals for timer operation
  if (minutesCount === 0 && secondsCount === 0) {
    const movieForm = document.getElementById("movie-form");

    movieForm.children[1].remove();

    movieForm.innerHTML =
      movieForm.innerHTML + `<button class="btn" style="margin: 1rem .5rem" type="button" onClick="restart()">Tentar novamente</button>`;
    movieForm.innerHTML = `<div style="width: 100%"> <h2 class="fail">Você Falhou!</h2>  <h3 class="answer"> Resposta: ${movie.title} </h3> <br> <div  class="movie__form"> ${movieForm.innerHTML} </div> </div>`;

    return clearInterval();
  } else if (secondsCount > 0) {
    if (secondsCount > 10) {
      seconds.innerHTML = secondsCount - 1;
    } else if (secondsCount <= 10) {
      seconds.innerHTML = `0${secondsCount - 1}`;
    }
  } else {
    minutes.innerHTML = `0${minutesCount - 1}`;
    seconds.innerHTML = 59;
  }
};

// Function to start the timer
const startTimer = () => {
  // Function to display the timer
  document.getElementById("time-card").innerHTML =
    '<span><span class="minutes" id="mins">01</span><span>:</span><span class="seconds" id="secs">00</span></span>';
  // Function to call time update every 1000 milisecond (1 second)
  setInterval(() => updateTime(), 1000);
};
