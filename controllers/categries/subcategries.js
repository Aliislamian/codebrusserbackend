const SubCategries = require('../../models/subcategries');

exports.Postsubcategries = async (req, res) => {
    try {
        const { title, categoryId } = req.body; // Assuming you send both title and categoryId in the request body

        const subcategoryData = new SubCategries({
            title: title,
            category: categoryId // Assuming categoryId is the ID of the corresponding category
        });

        const newSubcategory = await subcategoryData.save();

        res.send({
            success: true,
            error: false,
            message: "Subcategory data posted successfully!",
            subcategory: newSubcategory
        });
    } catch (error) {
        res.send({
            success: false,
            error: true,
            message: "Error in uploading subcategories."
        });
    }
}


exports.getsubcategries = async (req, res) => {
    try {
        
        const categries = await SubCategries.find()

        if(!categries){
            res.send({
                success : false,
                error : true,
                message : "subCategries not get!!"
               })
        }

        res.send({
            success : true,
            error : false,
            message : "SubCatgries data posted Successfully!!",
            categories : categries,
            
        })

    } catch (error) {
        res.send({
            success : false,
            error : true,
            message : "error in uploading card"
           })
    }
}


exports.getByCategoryTitle = async (req, res) => {
    try {
        const title = req.params.title; // Get the category title from the request parameters
        const category = await SubCategries.findOne({ title }); // Find the category by title
        
        if (!category) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Category not found!"
            });
        }

        return res.status(200).json({
            success: true,
            error: false,
            message: "Category data retrieved successfully!",
            category: category
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Error in retrieving category data!"
        });
    }
};

exports.updatesubcategries = async (req, res) => {
    try {
        const id = req.params.id;
        const title = req.body.title;

        const updatedCategories = await SubCategries.findByIdAndUpdate(id, { title: title }, { new: true });

        if (!updatedCategories) {
            return res.send({
                success: false,
                error: true,
                message: "subCategories not found or could not be updated."
            });
        }

        res.send({
            success: true,
            error: false,
            message: "subCategories updated successfully.",
            categories: updatedCategories
        });
    } catch (error) {
        res.send({
            success: false,
            error: true,
            message: "Error in updating categories."
        });
    }
}

exports.deletesubcategries = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedCategories = await SubCategries.findByIdAndDelete(id);

        if (!deletedCategories) {
            return res.send({
                success: false,
                error: true,
                message: "SubCategories not found or could not be deleted."
            });
        }

        res.send({
            success: true,
            error: false,
            message: "subCategories deleted successfully.",
            categories: deletedCategories
        });
    } catch (error) {
        res.send({
            success: false,
            error: true,
            message: "Error in deleting subcategories."
        });
    }
}
