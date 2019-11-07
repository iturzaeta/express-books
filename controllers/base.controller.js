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
                res.redirect(`/books/${id}`)
            })
            .catch(
                error => next(error)
            )
    }
}

module.exports.create = (req, res, next) => {
    res.render('books/form', {
        book: new Book()
    })
}

module.exports.doCreate = (req, res, next) => {
    const { title, author, description, rating } = req.body
    const book = new Book({ title, author, description, rating })

    book.save()
        .then(result => {
            console.log('creation result => ', result)
            res.redirect(`/books/${result._id}`)
        })
        .catch(error => next(error))
}

module.exports.delete = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        Book.findByIdAndDelete(id)
            .then(bookDeleted => {
                console.log('book deleted => ', bookDeleted)
                res.redirect('/books')
            })
            .catch(error => next(error))
    }
}
