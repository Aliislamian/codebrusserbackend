const Categries = require('../../models/catogries');

exports.Postcategries = async (req, res) => {
    try {
        const title = req.body.title;

        const categoriesData = new Categries({
            title:title,
        })

        const newcategoriesData = await categoriesData.save();

        res.send({
            success : true,
            error : false,
            message : "Catgries data posted Successfully!!",
            categories : categoriesData,
            
        })

    } catch (error) {
        res.send({
            success : false,
            error : true,
            message : "error in uploading card"
           })
    }
}

exports.getcategries = async (req, res) => {
    try {
        
        const categries = await Categries.find()

        if(!categries){
            res.send({
                success : false,
                error : true,
                message : "Categries not get!!"
               })
        }

        res.send({
            success : true,
            error : false,
            message : "Catgries data posted Successfully!!",
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


exports.getbyidcategres = async (req, res) => {
    try {
        console.log("object");
        const id = req.params.id;
        const categries = await Categries.findById(id)

        if(!categries){
            res.send({
                success : false,
                error : true,
                message : "Categries not get!!"
               })
        }

        res.send({
            success : true,
            error : false,
            message : "Catgries data posted Successfully!!",
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

exports.updatecategries = async (req, res) => {
    try {
        const id = req.params.id;
        const title = req.body.title;

        const updatedCategories = await Categries.findByIdAndUpdate(id, { title: title }, { new: true });

        if (!updatedCategories) {
            return res.send({
                success: false,
                error: true,
                message: "Categories not found or could not be updated."
            });
        }

        res.send({
            success: true,
            error: false,
            message: "Categories updated successfully.",
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

exports.deletecategries = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedCategories = await Categries.findByIdAndDelete(id);

        if (!deletedCategories) {
            return res.send({
                success: false,
                error: true,
                message: "Categories not found or could not be deleted."
            });
        }

        res.send({
            success: true,
            error: false,
            message: "Categories deleted successfully.",
            categories: deletedCategories
        });
    } catch (error) {
        res.send({
            success: false,
            error: true,
            message: "Error in deleting categories."
        });
    }
}
