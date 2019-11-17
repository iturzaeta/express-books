const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({

    fullName: { 
        type: String, 
        required: true,
    },

    email: { 
        type: String, 
        required: true,
        unique: true
        
    },

    username: { 
        type: String, 
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    TA: [ { type : Schema.Types.ObjectId, ref: 'TA' } ],

  });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;