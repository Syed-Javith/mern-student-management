const express = require('express');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const router = express.Router();
const passport = require('../utils/passportConfig');
const verfiyUser = require('../utils/verifyUser');

router.post('/auth/login', async (req, res) => {

    const {
        email,
        password
    } = req.body

    console.log(req.body);

    await User.findOne({
            email: email,
            password: password
        },{password : 0})
        .then((result) => {
            console.log(result);
            if (result?._id) {

                const token = jwt.sign({
                    result 
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
router.get('/verify/:token', async (req,res)=>{
    const token = req.params.token
    try {
        await await jwt.verify(token, 'SYED_JAVITH_R', (err, decoded) => {
            console.log(token);
            console.log(decoded);
            if (err) {
                return err
            }
            if(decoded) return res.status(200).send(decoded)
        });
    } catch (error) {
        console.log(error);
    }
})
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));
  
router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('http://localhost:3000')
    // res.redirect('/profile');
});

router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      console.log(req.user);
      const token = jwt.sign({
        result : req.user
    }, 'SYED_JAVITH_R', {
        expiresIn: '1h'
    })
      res.status(200).send({ token })
    //   res.redirect('http://localhost:3000')
    } else {
      
    }
  });
  

module.exports = router;