const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taSchema = new Schema({

      fullName: { 
        type: String, 
        required: true,
    }

  });

const TA = mongoose.model('TA', taSchema);

module.exports = TA;