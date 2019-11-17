const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const controllerStudent = require('../controllers/students.controller')
const controllerTa = require('../controllers/tas.controller')


////////////////MAIN INDEX//////////////////////////

router.get('/', controller.base);

///////////////////STUDENTS////////////////////

router.get('/students/new', controllerStudent.create)
router.get('/students', controllerStudent.list);
router.get('/students/:id/edit', controllerStudent.edit)
router.get('/students/:id', controllerStudent.studentDetail)



router.post('/students/:id/delete', controllerStudent.doDelete)
router.post('/students/:id', controllerStudent.doEdit)
router.post('/students', controllerStudent.doCreate)

//////////////////TA/////////////////////////


router.get("/tas/new", controllerTa.createTa)
router.get('/tas', controllerTa.list);
router.get('/tas/:id/edit', controllerTa.editTa)
router.get('/tas/:id', controllerTa.taDetail)



router.post('/tas/:id/delete', controllerTa.doDeleteTa)
router.post('/tas/:id', controllerTa.doEditTa)
router.post('/tas', controllerTa.doCreateTa)


module.exports = router;