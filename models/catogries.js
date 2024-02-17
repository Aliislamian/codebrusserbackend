const mongoose = require('mongoose');


const categoriesSchema = new mongoose.Schema({
    title : {
        type : String,
    },
    files: {
        type: Array   
    },

})

module.exports = mongoose.model('categories', categoriesSchema);