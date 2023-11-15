const express = require('express');
const User = require('../models/userModel');
const authenticateToken = require('../middlewares/authenticateMidlleware');
const nodemailer = require('nodemailer');

const router = express.Router();


// router.use('/student',authenticateToken)

router.get('/student/:userid', async (req, res) => {

    const userid = req.params.userid;

    await User.findOne({ _id : userid }, { password: 0 })
        .then((result) => {
            // console.log(result);
            if(result){
            res.status(200).send(result)
            }else{
                res.status(404).send(result)
            }
        }).catch((err) => {
            console.log(err);
            res.status(400).send(err);
        });
})

router.get('/student/:userid/:subjectid', async (req,res)=>{

    const { userid , subjectid } = req.params

    console.log(subjectid);

    await User.findOne( { _id : userid , "marks.code" : subjectid } , {"marks.$" : 1} )
    .then((result) => {
        console.log(result);
        res.status(200).send(result)
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });


})

router.patch('/student/add/:userid', async (req, res) => {

    const userid = req.params.userid

    const marks = req.body.marks

    const email = req.body.email

    console.log(userid);

    console.log(marks);

    await User.updateOne({
            _id: userid
        }, {
            $push: {
                marks: marks
            }
        })
        .then((result) => {
            console.log(result);
            sendEmail(email)
            res.status(200).send(result);
        }).catch((err) => {
            console.log(err);
            res.status(400).send(err)
        });

})

router.patch('/student/remove/:userid', async (req, res) => {
    const userid = req.params.userid

    const code = req.body.code;

    const email = req.body.email;

    await User.updateOne({
        _id: userid
    }, {
        $pull: {
            marks: {
                code: code
            }
        }
    }).then((result) => {
        console.log(result);
        send(email)
        res.status(200).send(result)
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err)
    });

})

router.patch('/student/edit/:userid', async (req, res) => {

    const userid = req.params.userid
    const marks = req.body.marks
    const email = req.body.email

    console.log(req.body);

    await User.updateOne({
            _id: userid,
            "marks.code": marks.code
        }, {
            $set: {
                "marks.$.mark": marks.mark
            }
        })
        .then((result) => {
            console.log(result);
            sendEmail(email)
            res.status(200).send(result)
        }).catch((err) => {
            console.log(err);
            res.status(400).send(err)
        });

})

const sendEmail = async (email) => {
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
        subject: 'Mail from student.com',
        text: 'Your marks have been updated please check it now!',
      };
      
      await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}


module.exports = router;