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


exports.getbyidsubcategres = async (req, res) => {
    try {
        console.log("object");
        const id = req.params.id;
        const categries = await SubCategries.findById(id)

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
            message : "subCatgries data posted Successfully!!",
            categories : categries,
            
        })

    } catch (error) {
        res.send({
            success : false,
            error : true,
            message : "error in categrey get!!"
           })
    }
}

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
