const Review = require('../models/review');

exports.Review = async (req, res) => {
    try {
        const {rating, description} = req.body;

        const reviewData = new Review({
            rating: rating,
            description: description
        });

        const data = reviewData.save();

        res.send({
            message: "review Data Posted",
            data : reviewData
        })
        
    } catch (error) {
        res.send({
            message: "Error",
            error: error
        })
    }
}

exports.ReviewGet = async ( req, res) => {
    try {
        
        const Data = await Review.find()

        if(!Data){
            res.send({
                message : "Data not retrive Successfully"
            })
            
        }
        
        res.send({
            message: "Data Get Successfully!!",
            Data : Data
        })

    } catch (error) {
        res.send({
            message: "Error", 
            error: error
        })
    }
}
exports.ReviewGetbyid = async ( req, res) => {
    try {

        const id = req.params.id;
        
        const Data = await Review.findById(id)

        

        if(!Data){
            res.send({
                message : "Data not retrive Successfully"
            })
            
        }
        
        res.send({
            message: "Data Get Successfully!!",
            Data : Data
        })

    } catch (error) {
        res.send({
            message: "Error", 
            error: error
        })
    }
}