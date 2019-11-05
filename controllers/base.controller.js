const createError = require('http-errors');
const mongoose = require('mongoose');
const Book = require('../models/book.model');

module.exports.base = (req, res, next) => {
    res.render('index', {
        title: 'Welcome to your CRUD project'
    });
};

module.exports.listBooks = (req, res, next) => {
    Book.find()
        .then(
            books => {
                res.render('books/list', { books })
            }
        ).catch(
            error => next(error)
        );
};

module.exports.bookDetail = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        Book.findById(id)
            .then(
                book => {
                    res.render('books/detail', { book })
                }
            ).catch(
                error => next(error)
            );
    }
};
