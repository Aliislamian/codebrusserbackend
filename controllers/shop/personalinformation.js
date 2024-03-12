const Vendor = require('../../models/shop/persnalinformation');
const Shop = require('../../models/shop/shopinformation');

exports.Postvendor = async (req, res) => {
    try {
        const { fname, lname, address, state, gender, dob, city } = req.body;
      
        const newUserData = await Vendor.create({
            fname,
            lname,
            address,
            state,
            gender,
            dob,
            city
        });

        res.status(201).json({
            success: true,
            message: "Vendor data uploaded successfully!",
            card: newUserData
        });
    } catch (error) {
        console.error("Error uploading vendor information:", error);
        res.status(500).json({
            success: false,
            message: "Error in uploading vendor information"
        });
    }
}


exports.vendorGet = async (req, res) => {
    try {
        const users = await Vendor.find();
        if(!users){
            res.send({
                success : false,
                error : true,
                message : "vendor information not get!!"
               })
        }


        res.status(200).json({ users });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving vendors' });
      }
}

exports.shoppost = async (req, res) => {
    try {
        const { shopname, companyname, categries, brand, phoneno, email, address } = req.body;
      
        const newUserData = await Shop.create({
            shopname,
            companyname,
            categries,
            brand,
            phoneno,
            email,
            address
        });

        res.status(201).json({
            success: true,
            message: "Vendor data uploaded successfully!",
            card: newUserData
        });
    } catch (error) {
        console.error("Error uploading vendor information:", error);
        res.status(500).json({
            success: false,
            message: "Error in uploading vendor information"
        });
    }
}

exports.shopGet = async (req, res) => {
    try {
        const users = await Shop.find();
        const userCount = users.length; // Get the count of users
        if(!users){
            res.send({
                success : false,
                error : true,
                message : "vendor information not get!!"
               })
        }

        res.status(200).json({userCount, users });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving vendors' });
      }
}
