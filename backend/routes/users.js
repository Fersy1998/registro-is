const express = require('express');
const router = express.Router();
const fileUploader = require('../config.cloudinary');
const User = require('../models/user')
const nodemailer = require("nodemailer");

const url = 'https://repo-is.herokuapp.com/api/verify'





router.post('/register', async (req, res)=>{
    const {email } = req.body;
    const uniqueString = stringCode();
    const isValid = false;

    const newUser = new User({isValid, uniqueString, ...req.body})
    newUser.save().then(result=>{
        sendEmail(email, uniqueString)
        res.status(200).json(result);
    }).catch(error=>{
        res.status(403).send('Ocurrió un error');
    });
    
    
})

router.get('/verify/:uniqueString', async (req, res) => {
    const {uniqueString} = req.params;
    const user = await User.findOne({uniqueString:uniqueString});
    if(user){
        user.isValid = true;
        await user.save();
        res.status(200).send('Confirmación exitosa');
    }else{
        res.status(403).send('Ocurrió un error');
    }
  });

  router.post('/uploadImage', fileUploader.single('file'), async (req, res, next) => {
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    const user = await User.findById(req.body.id);
    if(user){
        user.profileImageUrl = req.file.path;
         user.save().then(result => {
             res.status(200).json(result)
         }).catch(error => {
            res.status(403).send('Ocurrió un error');
         });
    }else{
        res.status(403).send('Ocurrió un error');
    }
   
  });

  const stringCode = () => {
    const len = 12;
    let randStr = '';
    for (let index = 0; index < len; index++) {
       const ch = Math.floor((Math.random()*10)+1);
       randStr += ch;
        
    }
    return randStr;
}

const sendEmail = async (email,  uniqueString) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user:  'reponoreplyis2021@gmail.com',
          pass: 'Fersita123',
        },
      });
      let sender = "no-reply"
      await transporter.sendMail({
        from: sender,
        to: email,
        subject: 'Confirmación de registro',
        html:`Por favor presione <a href=${url}/${uniqueString}>este link</a> para verificar su cuenta. <br> <br> Muchas gracias.`
      });
      console.log("email sent sucessfully to: ", email);
    } catch (error) {
      console.log("email not sent");
      console.log(error);
    }
  };
  
module.exports = router;