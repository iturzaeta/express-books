const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');

router.get('/', controller.base);
router.get('/celebrities', controller.listCelebrities);
router.get('/celebrities/add', controller.listCelebrities);
router.get('/celebrities/:id', controller.listCelebrities);
router.get('/celebrities/:id/edit', controller.editCelebrity);
router.post('/celebrities/:id/edit', controller.doEditCelebrity);
router.get('/celebrities/:id/delete', controller.deleteCelebrity);

/*router.get('/movies', controller.movies);
router.get('/movies/add', controller.movies);
router.get('/movies/:id', controller.movieDetail);
router.get('/movies/:id/edit', controller.editMovie);
router.post('/movies/:id/edit', controller.doEditMovie);
router.get('/movies/:id/delete', controller.deleteMovie);
*/
module.exports = router;