//Importing libraries 
const cloudinary = require("cloudinary"); 
const dotenv = require("dotenv");

dotenv.config();

/* 
The way that we have set up the Cloudinary config method is to 
insert an object that contains the cloud_name, api_key and api_secret.  
Because all of this is sensitive information, its don’t advised adding
the configuration as plain text which is how the dotenv tool will aid 
in the process. It can use the environment tables to find the information 
by adding a .env file into the root directory along with this code.
*/
cloudinary.config({
    cloud_name: 'dyferab2s',
    api_key: '953374558833214',
    api_secret: 'dsWhHAMdlwsZeXGMHyhZcUgc6M4',
    secure: true
  });

exports.uploads = (file, folder) =>{
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) =>{
            resolve({
                url: result.url, 
                id: result.public_id

            }, {
                resource_type: "auto", 
                folder: folder
            })
        })
    })
}

module.exports = cloudinary;