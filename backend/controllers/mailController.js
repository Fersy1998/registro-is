const nodemailer = require("nodemailer");

const url = 'http://localhost:3000/verify'

const sendEmail = async (email, subject, uniqueString) => {
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
      subject: subject,
      html:`Por favor presione <a href=${url}/${uniqueString}>este link</a> para verificar su cuenta. <br> <br> Muchas gracias.`
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

