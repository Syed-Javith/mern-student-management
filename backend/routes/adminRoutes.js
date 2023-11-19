const express = require('express');
const User = require('../models/userModel');
const sendEmail = require('../utils/Mailer');

const router = express.Router()


router.post('/admin/getstudent', async (req,res)=>{

    const { rollNumber , department , year } = req.body

    console.log(req.body);

    await User.findOne({ rollNumber : rollNumber , department : department , year : year } , {password : 0})
    .then((result) => {
        console.log(result);
        res.status(200).send(result);
    }).catch((err) => {
        console.log(err);
        res.status(200).send(err)
    });

})

router.post('/admin/register', async (req, res) => {
    console.log(req.body);
    const newUser = new User(req.body);
    await User.findOne({ email : req.body.email })
    .then((result) => {
        console.log(result);
        if(result !== null){
            console.log(result);
            res.status(400).send({ message : "user already found" })
        }else{
            newUser.save()
            .then((result) => {
                console.log(result);
                sendEmail(req.body.email , "Added Credentials" , `You have given login crdentials to the student portal your mail is ${req.body.email} and password is ${req.body.password}, Please don't share your password`)
                res.status(200).send(result)
            }).catch((err) => {
                console.log(err);
                res.status(400).send(err)
            });
        }
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err)
    });
});


module.exports = router;
