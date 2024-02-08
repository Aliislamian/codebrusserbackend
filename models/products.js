const mongoose = require('mongoose');

const subcategoriesSchema = new mongoose.Schema({
    url: {
        type: String, // Define urls as an array of strings
        required: true // Ensure at least one URL is provided
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
