const mongoose = require('mongoose');


const categoriesSchema = new mongoose.Schema({
    title : {
        type : String,
    }

})

module.exports = mongoose.model('categories', categoriesSchema);