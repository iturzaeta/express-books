const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');

router.get('/', controller.base);
router.get('/books', controller.listBooks);
router.get('/books/add', controller.addBook);
router.post('/books/add', controller.doAddBook);
router.get('/books/:id', controller.bookDetail);
router.get('/books/:id/edit', controller.edit);
router.post('/books/:id/edit', controller.doEdit);
router.post('/books/:id/delete', controller.delete);

module.exports = router;