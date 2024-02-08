const Filter = require('../models/filter');
const Products = require('../models/products');

exports.Postfilter = async (req, res) => {
    try {
        // Extract filter criteria from request body
        const { color, size, price, properties } = req.body;

        // Construct filter object based on provided criteria
        const filterObject = {};
        if (color) filterObject.color = color;
        if (size) filterObject.size = size;
        if (properties) filterObject.Properties = properties;

        // Add price range query if price is provided
        if (price) {
            filterObject.price = {
                $lte: parseInt(price) // Filter products with price less than or equal to the specified price
            };
        }

        // Find products matching the filter criteria
        const filteredProducts = await Products.find(filterObject);

        // Return filtered products
        res.status(200).json({
            success: true,
            message: "Filtered products fetched successfully!",
            data: filteredProducts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in filtering products.",
        });
    }
}
