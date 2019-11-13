const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');

router.get('/', controller.base);
router.get('/books', controller.listBooks);
router.get('/books/create', controller.create);
router.post('/books/create', controller.doCreate);
router.get('/books/:id', controller.bookDetail);
router.get('/books/:id/edit', controller.edit);
router.post('/books/:id/delete', controller.delete);
router.post('/books/:id/edit', controller.doEdit);

router.get('/authors', controller.listAuthors);
router.get('/authors/create', controller.createAuthor);
router.post('/authors/create', controller.doCreateAuthor);
router.get('/authors/:id', controller.authorDetail);
router.get('/authors/:id/edit', controller.editAuthor);
router.post('/authors/:id/delete', controller.deleteAuthor);
router.post('/authors/:id/edit', controller.doEditAuthor);

module.exports = router;