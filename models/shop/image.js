const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {
        type: String, // Define urls as an array of strings
       
    },
   
    
});

module.exports = mongoose.model('image', imageSchema);
