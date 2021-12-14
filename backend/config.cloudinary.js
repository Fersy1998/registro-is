const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({ 
    cloud_name: 'drb2arlnh', 
    api_key: '868859237651932', 
    api_secret: 'G7jWuWuzBjGCN82bkcq9Gfs2jYg' 
  });

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
