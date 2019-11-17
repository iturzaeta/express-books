const createError = require('http-errors');
const mongoose = require('mongoose');

const TA = require("../models/ta.model");



/////////////////////////  TAs    //////////////////////

module.exports.list = (req, res, next) => {
    TA.find()
    .then(tas => {
        
        res.render('tas/list', {tas})
        }
    ).catch(
        error => next(error)
    );
 };


 module.exports.taDetail = (req, res, next) => {

    const id = req.params.id

    TA.findById(id)
    .then(ta => {
    
        res.render('tas/detail', {ta})
        })
    .catch(
        error => next(error)
    );
 };


 module.exports.editTa = (req, res, next) => {

    const id = req.params.id;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        TA.findById(id)
            .then(
                ta => {
                    res.render('tas/form', { ta })
                }
            ).catch(
                error => next(error)
            );
    }
}

module.exports.doEditTa = (req, res, next) => {

    const id = req.params.id;
    

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        TA.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
            .then(
                () => {
                    res.redirect('/tas')
                }
            ).catch(
                error => next(error)
            );
    }
}


module.exports.doDeleteTa = (req, res, next) => {

    const id = req.params.id;
    

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        TA.findOneAndDelete(id)
            .then(
                () => {
                    res.redirect('/tas')
                }
            ).catch(
                error => next(error)
            );
    }

}

module.exports.createTa = (req, res, next) => {

    res.render("tas/create")

}

module.exports.doCreateTa = (req, res, next) => {

    // const newCelebrity = {
    //     name: req.body.name,
    //     occupation: req.body.occupation,
    //     catchPhrase: req.body.catchPhrase,
            
    // }  

    // const createdCelebrity = new Celebrity (newCelebrity)

    const createdTA = new TA (req.body)

        createdTA.save()
        .then(
            () => {
                res.redirect('/tas')
            }
        ).catch(
            error => next(error)
        );

}