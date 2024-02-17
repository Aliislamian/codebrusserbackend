const mongoose = require('mongoose');

const subcategoriesSchema = new mongoose.Schema({
    files: {
        type: Array   
    },
    title:{
        type: String,
    },
    heading:{
        type: String,
    },
    description:{
        type: String,
    },
    detials:{
        type: String,
    },
    Properties:{
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
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategories'
    }
});

module.exports = mongoose.model('products', subcategoriesSchema);
