const movies = [
	{
		title: "Dirty Dancing - Ritmo Quente",
		acceptable_guess: [
			"Dirty Dancing - Ritmo Quente",
			"Dirty Dancing",
			"Dirty Dancing Ritmo Quente",
			"Dirty Dancing: Ritmo Quente",
		],
		start_image: "img_1",
	},
	{
		title: "Thor: Ragnarok",
		acceptable_guess: ["Thor: Ragnarok", "Thor Ragnarok", "Thor 3"],
		start_image: "img_7",
	},
]

const getRandomGame = () => {
	const randomIndex = Math.floor(Math.random() * movies.length)

	return movies[randomIndex]
}

const startGame = () => {
	document.getElementById("start-btn").style.display = "none"

	const movie = getRandomGame()

	const startCard = `
		<h2>Acerte o Filme</h2>
		<img src="${`./assets/movies/${movie.start_image}.jpeg`}" alt="${`image_${movie.start_image.slice(-1)}`}" />
		<form action="">
			<input type="text" />
			<button>Tentar</button>
		</form>
    `

	document.getElementById("movie-card").innerHTML = startCard
}
