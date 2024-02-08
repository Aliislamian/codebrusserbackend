const mongoose = require('mongoose');

const persnalinformationSchema = new mongoose.Schema({
    fname: {
        type: String, // Define urls as an array of strings
       
    },
    lname:{
        type: String,
    },
    gender:{
        type: String,
        enum: ['male', 'female', 'others'],
        default: 'pending',
    },
    dob:{
        type: String,
    },
    state:{
        type: String,
    },
    city:{
        type: String,
    },
    address:{
        type: String,
    },
    
});

module.exports = mongoose.model('persnalinformation', persnalinformationSchema);
