const express = require('express');
const User = require('../models/userModel');

const router = express.Router()


router.post('/admin/getstudent', async (req,res)=>{

    const { rollNumber , department , year } = req.body

    console.log(req.body);

    await User.findOne({ rollNumber : rollNumber , department : department , year : year })
    .then((result) => {
        console.log(result);
        result.password = ''
        res.status(200).send(result);
    }).catch((err) => {
        console.log(err);
        res.status(200).send(err)
    });

})

module.exports = router;
