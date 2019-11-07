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

module.exports.addBook = (req, res, next) => {
    res.render('books/form', {
        book: new Book()
    })
}

module.exports.doAddBook = (req, res, next) => {
    console.info('body request => ', req.body)
    const book = new Book(req.body)

    book.save()
        .then(() => res.redirect('/books'))
        .catch(error => next(error));
}

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

module.exports.edit = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        Book.findById(id)
            .then(
                book => {
                    res.render('books/form', { book })
                }
            ).catch(
                error => next(error)
            );
    }
}

module.exports.doEdit = (req, res, next) => {
    const id = req.params.id;
    console.log(req.body)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        Book.findByIdAndUpdate(id, req.body, { new: true })
            .then(book => {
                console.log(book)
                res.redirect('/books')
            })
            .catch(
                error => next(error)
            )
    }
}
