const mongoose = require('mongoose');

const shopinformationSchema = new mongoose.Schema({
    shopname: {
        type: String, // Define urls as an array of strings
       
    },
    files: {
        type: Array, // Define urls as an array of strings
       
    },
    companyname:{
        
        type: String,
    },
    categries:{
        type: String,
        // enum: ['male', 'female', 'others'],
        // default: 'pending',
    },
    brand:{
        type: String,
    },
    phoneno:{
        type: String,
    },
    email:{
        type: String,
    },
    address:{
        type: String,
    },
    
});

module.exports = mongoose.model('shopinformation', shopinformationSchema);
