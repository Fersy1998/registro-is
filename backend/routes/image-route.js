const express = require('express');
const fileUploader = require('../config.cloudinary');


const router = express.Router();

router.post('/uploadImage', fileUploader.single('file'), (req, res, next) => {
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    
    res.json({ secure_url: req.file.path });
  });

module.exports = router;