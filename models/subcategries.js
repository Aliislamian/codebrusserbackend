const mongoose = require('mongoose');

const subcategoriesSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    }
});

module.exports = mongoose.model('subcategories', subcategoriesSchema);
