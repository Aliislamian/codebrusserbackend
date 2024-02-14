const mongoose = require('mongoose')

const userInformationShema = new mongoose.Schema({
      
    country: {
        type:String
    },
    username: {
        type:String
    },
    address: {
        type: String
    },
    city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipcode: {
        type: String,
      },
   
    phoneno: {
        type: Number
    },

    

})

module.exports = mongoose.model('shipping', userInformationShema)