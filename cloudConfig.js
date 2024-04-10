const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//we are sharing our confidiential detail ,taaki hamare  account access ho ske ,so that we can use..
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//cloudinary me kha jakar files store krwana chahte hai..
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowedformat: ["png","jpg","jpeg","WebP"],
     
    },
  });
   
  //exporting both
  module.exports={
    cloudinary,
    storage
  }