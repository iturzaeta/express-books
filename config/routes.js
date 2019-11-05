const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');

router.get('/', controller.base);
router.get('/books', controller.listBooks);
router.get('/books/:id', controller.bookDetail);

module.exports = router;