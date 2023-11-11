const express = require('express');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const router = express.Router();


router.post('/auth/login', async (req, res) => {

    const {
        email,
        password
    } = req.body

    await User.findOne({
            email: email,
            password: password
        })
        .then((result) => {
            console.log(result);
            result.password = ''
            if (result?._id) {

                const token = jwt.sign({
                    email,
                }, 'SYED_JAVITH_R', {
                    expiresIn: '1h'
                })
                res.status(200).send({token ,
                    user : result
                })

            } else {
                res.status(400).send(result)
            }

        }).catch((err) => {
            console.log(err);
            res.status(400).send(err)
        });

})


module.exports = router;