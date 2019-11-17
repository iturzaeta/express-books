const createError = require('http-errors');
const mongoose = require('mongoose');

const Student = require("../models/student.model");



////////////////////STUDENTS////////////////////////

module.exports.list = (req, res, next) => {
    Student.find()
    .then(students => {
        
        res.render('students/list', {students})
        }
    ).catch(
        error => next(error)
    );
 };


 module.exports.studentDetail = (req, res, next) => {

    const id = req.params.id

    Student.findById(id)
    .then(student => {
    
        res.render('students/detail', {student})
        })
    .catch(
        error => next(error)
    );
 };


 module.exports.edit = (req, res, next) => {

    const id = req.params.id;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        Student.findById(id)
            .then(
                student => {
                    res.render('students/form', { student })
                }
            ).catch(
                error => next(error)
            );
    }
}

module.exports.doEdit = (req, res, next) => {

    const id = req.params.id;
    

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        Student.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
            .then(
                () => {
                    res.redirect('/students')
                }
            ).catch(
                error => next(error)
            );
    }
}


module.exports.doDelete = (req, res, next) => {

    const id = req.params.id;
    

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        Student.findOneAndDelete(id)
            .then(
                () => {
                    res.redirect('/students')
                }
            ).catch(
                error => next(error)
            );
    }

}

module.exports.create = (req, res, next) => {

    res.render("students/create")

}

module.exports.doCreate = (req, res, next) => {

    // const newCelebrity = {
    //     name: req.body.name,
    //     occupation: req.body.occupation,
    //     catchPhrase: req.body.catchPhrase,
            
    // }  

    // const createdCelebrity = new Celebrity (newCelebrity)

    const createdStudent = new Student (req.body)

        createdStudent.save()
        .then(
            () => {
                res.redirect('/students')
            }
        ).catch(
            error => next(error)
        );

}