const mongoose = require('mongoose');

const filterSchema = new mongoose.Schema({
   
    properties:{
        type: String,
    },
    color:{
        type: String,
    },
    size:{
        type: String,
    },
    price:{
        type: String,
    },
    
});

module.exports = mongoose.model('filter', filterSchema);
