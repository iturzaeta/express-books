const Celebrity = require('../models/celebrity.model');
const Movie = require('../models/movie.model');
const mongoose = require('mongoose');
require('../config/db.config');

const celebrities = [
	{
		name: "Pepe Viyuela",
		catchPhrase: ":|",
		movies: {
			title: "Mortadelo y Filemon",
			genre: "Humor",
			plot: "Lorem ipsum dolor sit amet"
		}
	},
	{
		name: "Brad Pitt",
		catchPhrase: "...",
		movies: {
			title: "Ocean's Eleven",
			genre: "Heist",
			plot: "Lorem ipsum dolor sit amet"
		}
	},
	{
		name: "Charlize Theron",
		catchPhrase: ":/",
		movies: {
			title: "Mad max: fury road",
			gente: "Action",
			plot: "Lorem ipsum dolor sit amet"
		}
	}
];

const createMovies = celebrities.map(celebrity => {
	const newMovie = new Movie(celebrity.movies)
	return newMovie.save()
		.then(movie => {
			console.log(movie);
			return movie.title;
		})
		.catch(error => {
			throw new Error(`Impossible to add the movie. ${error}`)
		})
})


let findMovies = Promise.all(createMovies)
	.then(movies => {
		return celebrities.map(celebrity => {
			return Movie.findOne({ title: celebrity.movies.title })
				.then(movie => {
					if (!movie) {
						throw new Error(`unknown movie ${celebrity.movies.title}`);
					}
					return Object.assign({}, celebrity, { movies: movie._id });
				})
		});
	})
	.catch(error => {
		throw new Error(error)
	})

const saveCelebs = findMovies.then(findMovies => {
	return Promise.all(findMovies)
		.then(celebs => {
			return celebs.map(celeb => {
				console.log(celeb);
				const newCeleb = new Celebrity(celeb);
				return newCeleb.save();
			})
		})
}).then(savedCelebs => {
	Promise.all(savedCelebs)
		.then(celebs => celebs.forEach(celeb => console.log(`created ${celeb.name}`)))
		.then(() => mongoose.connection.close())
		.catch(err => console.log("Error while saving the movie: ", err))
})