const mongoose = require('mongoose');

const subcategoriesSchema = new mongoose.Schema({
    rating: {
        type: Number,
    },
    description: {
        type: String   
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }
});

module.exports = mongoose.model('review', subcategoriesSchema);
