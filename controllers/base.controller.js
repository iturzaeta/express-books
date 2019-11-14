const createError = require('http-errors');
const mongoose = require('mongoose');

const Celebrity = require('../models/celebrity.model');
const Movie = require('../models/movie.model');

module.exports.base = (req, res, next) => {
	res.render('index', {
		title: 'Welcome to your CRUD project'
	});
};

module.exports.listCelebrities = (req, res, next) => {
	Celebrity.find()
		.then(
			celebrities => res.render('celebrities/list', { celebrities })
		).catch(
			error => next(error)
		);
}

module.exports.editCelebrity = (req, res, next) => {
	Celebrity.findById(req.params.id)
		.then(
			celebrity => res.render('celebrities/form', { celebrity })
		).catch(
			error => next(error)
		);
}

module.exports.doEditCelebrity = (req, res, next) => {
	const id = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		next(createError(404));
	} else {
		Celebrity.findByIdAndUpdate(id, req.body, { new: true })
			.then(
				celebrity => res.redirect(`/celebrities/${id}`)
			).catch(
				error => next(error)
			)
	}
}

module.exports.deleteCelebrity = (req, res, next) => {
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		next(createError(404));
	} else {
		Celebrity.findByIdAndDelete(id)
			.then(
				deleted => res.redirect('/celebrities')
			).catch(
				error => next(error)
			);
	}
}