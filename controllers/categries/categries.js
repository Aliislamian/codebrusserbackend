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