const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    email : {
        type : String,
    },
    country : {
        type : String,
    },
    fname : {
        type : String,
    },
    lname : {
        type : String,
    },
    address : {
        type : String,
    },
    phoneno : {
        type : String,
    },
    
    dob : {
        type : String,
    },
    password : {
        type : String,
    },
    cpassword : {
        type : String,
    },

})

module.exports = mongoose.model('user', UserSchema)