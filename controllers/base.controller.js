const createError = require('http-errors');
const mongoose = require('mongoose');
const Book = require('../models/book.model');
const Author = require('../models/author.model');

module.exports.base = (req, res, next) => {
    res.render('index', {
        title: 'Welcome to your CRUD project'
    });
};

module.exports.listBooks = (req, res, next) => {
    Book.find()
        .populate('author')
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
            .populate('author')
            .then(
                book => {
                    console.log(`${JSON.stringify(book)}`)
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
        Promise.all([Book.findById(id), Author.find()])
            .then(
                // Here I should have an array with book in one element and all authors in the other
                data => {
                    return res.render('books/form', { book: data[0], authors: data[1] })
                }
            )
            .catch(
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


module.exports.listAuthors = (req, res, next) => {
    Author.find()
        .then(
            authors => {
                res.render('authors/list', { authors })
            }
        ).catch(
            error => next(error)
        );
};

module.exports.createAuthor = (req, res, next) => {
    res.render('authors/form', {
        author: new Author()
    })
}

module.exports.doCreateAuthor = (req, res, next) => {
    const { name, lastName, birthday, nationality, pictureUrl } = req.body
    const author = new Author({ name, lastName, nationality, birthday, pictureUrl })

    author.save()
        .then(result => {
            console.log('creation result => ', result)
            res.redirect(`/authors/${result._id}`)
        })
        .catch(error => next(error))
}

module.exports.authorDetail = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        Author.findById(id)
            .then(
                author => {
                    res.render('authors/detail', { author })
                }
            ).catch(
                error => next(error)
            );
    }
};

module.exports.editAuthor = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        Author.findById(id)
            .then(
                author => {
                    return res.render('authors/form', {
                        author
                    })
                }
            )
            .catch(
                error => next(error)
            );
    }
}

module.exports.doEditAuthor = (req, res, next) => {
    const id = req.params.id;
    console.log(req.body)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        Author.findByIdAndUpdate(id, req.body, { new: true })
            .then(author => {
                res.redirect(`/authors/${id}`)
            })
            .catch(
                error => next(error)
            )
    }
}

module.exports.deleteAuthor = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        Author.findByIdAndDelete(id)
            .then(deletedAuthor => {
                console.log('author deleted => ', deletedAuthor)
                res.redirect('/authors')
            })
            .catch(error => next(error))
    }
}
