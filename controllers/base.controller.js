const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.base = (req, res, next) => {
    res.render('index', {
        title: 'Welcome to Ironhack Students & TAs Finder',
        subtitle: 'Use it wisely',
    });
};