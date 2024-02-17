const express = require('express');
const routes = express.Router();
const Products = require('../models/products');
const Subcategories = require('../models/subcategries');

routes.post('/api/search', async (req, res) => {
    try {
        const { title } = req.body;

        // Search for products based on the title
        const products = await Products.find({ title: { $regex: title, $options: 'i' } });

        // Search for subcategories based on the title
        const subcategories = await Subcategories.find({ title: { $regex: title, $options: 'i' } });

        res.status(200).json({
            success: true,
            message: "Search successful",
            data: {
                products: products,
                subcategories: subcategories
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
});

module.exports = routes;
