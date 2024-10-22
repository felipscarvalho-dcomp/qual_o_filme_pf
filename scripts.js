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
  {
    title: "Up: Altas Aventuras",
    acceptable_guess: ["up: altas aventuras", "up", "altas aventuras", "up altas aventuras", "up: altamente", "up - altas aventuras"],
    start_image: "13",
    hints: {
      year: "2009",
      genre: ["animação", " aventura", " comédia"],
      director: "Pete Docter",
      synopsis: "Carl Fredricksen, de 78 anos, viaja para a América do Sul com sua casa, inadvertidamente levando um menino com ele.",
    },
  },
  {
    title: "Shrek 2",
    acceptable_guess: ["shrek 2", "shrek dois"],
    start_image: "19",
    hints: {
      year: "2004",
      genre: ["animação", " comédia", " aventura"],
      director: ["Andrew Adamson", " Kelly Asbury", " Conrad Vernon"],
      synopsis:
        "Os pais da princesa Fiona convidam ela e Shrek para jantar para celebrar seu casamento, mas eles não sabem que os recém-casados são ogros",
    },
  },
  {
    title: "Velozes e Furiosos 7",
    acceptable_guess: [
      "velozes e furiosos 7",
      "velozes furiosos 7",
      "furious 7",
      "velocidade furiosa 7",
      "velozes e furiosos sete",
      "furious seven",
      "velocidade furiosa sete",
    ],
    start_image: "25",
    hints: {
      year: "2017",
      genre: ["ação"],
      director: "James Wan",
      synopsis: "O Deckard Shaw procura vingar-se do Dominic Toretto e sua familia.",
    },
  },
   {
    title: "O Castelo Animado",
    acceptable_guess: ["o castelo animado", "castelo animado", "o castelo andante", "hauru no ugoku shiro", "howl's moving castle", "howls moving castle"],
    start_image: "31",
    hints: {
      year: "2004",
      genre: ["animação", " fantasia", " aventura"],
      director: "Hayao Miyazaki",
      synopsis: "Uma jovem sem autoconfiança é amaldiçoada com um corpo envelhecido por uma bruxa odiosa. Sua única chance de quebrar o feitiço é um jovem feiticeiro em um castelo itinerante."
    }
  },
  {
    title: "A Fuga das Galinhas",
    acceptable_guess: ["a fuga das galinhas", "fuga das galinhas", "chicken run"],
    start_image: "37",
    hints: {
      year: "2000",
      genre: ["stop-motion", " comédia", " aventura"],
      director: ["Peter Lord", " Nick Park"],
      synopsis: "Quando um galo aparentemente voa para uma fazenda de galinhas, as galinhas o veem como uma oportunidade de escapar de seus maus proprietários."
    }
  },
  {
    title: "Coringa",
    acceptable_guess: ["coringa", "joker"],
    start_image: "43",
    hints: {
      year: "2019",
      genre: ["suspense psicológico"],
      director: "Todd Phillips",
      synopsis: "Um comediante falido enlouquece e se torna um assassino psicopata."
    }
  },
 {
    title: "Homem-Formiga",
    acceptable_guess: ["homem-formiga", "homem formiga", "ant-man", "ant man"],
    start_image: "49",
    hints: {
      year: "2015",
      genre: ["ação", "ficção científica", "aventura", "comédia"],
      director: "Peyton Reed",
      synopsis: "Armado de um terno com a capacidade para se encolher mas para incrementar sua força, o ladrão Scott Lang deberá ser um herói e ajudar a seu mentor, Hank Pym, para fazer um assalto que salvará ao mundo."
    }
  },
  {
    title: "Titanic",
    acceptable_guess: ["titanic"],
    start_image: "55",
    hints: {
      year: "1997",
      genre: [" épico", " drama", " romance"],
      director: "James Cameron",
      synopsis: "Uma aristocrata de dezessete anos se apaixona por um artista gentil mas pobre a bordo do luxuoso e desafortunado navio."
    }
  }
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

  const movieImages = document.getElementById("movie-images");
  const imagesNumber = movieImages.childElementCount;

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
    const movieImages = document.getElementById("movie-images");
    const imagesNumber = movieImages.childElementCount;

  // Check if the guess is correct
  if (movie.acceptable_guess.includes(playerGuess.trim().toLowerCase())) {
    const movieCard = document.getElementById("movie-card");
    const movieForm = document.getElementById("movie-form");

    movieForm.children[1].remove();
    movieForm.innerHTML =
      movieForm.innerHTML +
      `<button class="btn" style="margin: 1rem .5rem" id:"btn_tryAgain" type="button" onClick="restart()">Tentar novamente</button>`;
	  
    if (imagesNumber === 1) {movieForm.innerHTML = `<div style="width: 100%"> <h2 class="success">Parabéns</h2> 
    <h3 class="answer"> Você acertou de primeira em ${Number(document.getElementById("secs").innerHTML)} segundos </h3> <br> 
    <div  class="movie__form"> ${movieForm.innerHTML} </div> </div>`;}
   else {movieForm.innerHTML = `<div style="width: 100%"> <h2 class="success">Parabéns</h2> <h3 class="answer"> Você acertou em ${imagesNumber} tentativas em ${Number(document.getElementById("secs").innerHTML)} segundos </h3> <br> <div  class="movie__form"> ${movieForm.innerHTML} </div> </div>`;}}
    // If not, show next image
    else if (imagesNumber < 6) {
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
