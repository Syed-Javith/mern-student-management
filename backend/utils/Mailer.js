const nodemailer = require('nodemailer');

const sendEmail = async (email, sub , body) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '210701278@rajalakshmi.edu.in',
          pass: 'hgeq ippg blyw cjhq'
        }
      });
      
      var mailOptions = {
        from: '210701278@rajalakshmi.edu.in',
        to: email ,
        subject: sub,
        text: body,
      };
      
      await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}

module.exports = sendEmail
