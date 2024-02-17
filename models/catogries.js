const mongoose = require('mongoose');


const categoriesSchema = new mongoose.Schema({
    title : {
        type : String,
    },
    files: {
        type: Array   
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategories'
    }
})

module.exports = mongoose.model('categories', categoriesSchema);