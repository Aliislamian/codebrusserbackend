const mongoose = require('mongoose')

const userInformationShema = new mongoose.Schema({
      
    country: {
        type:String
    },
    username: {
        type:String
    },
    email: {
        type: String
    },
   
    phoneno: {
        type: Number
    },

    

})

module.exports = mongoose.model('userInformation', userInformationShema)