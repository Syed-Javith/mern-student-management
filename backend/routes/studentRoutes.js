const express = require('express');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

const router = express.Router();


router.use('/student',authenticateToken)

router.get('/student/:userid', async (req, res) => {

    const userid = req.params.userid;

    await User.findOne({ _id : userid })
        .then((result) => {
            console.log(result);
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
            res.status(200).send(result);
        }).catch((err) => {
            console.log(err);
            res.status(400).send(err)
        });

})

router.patch('/student/remove/:userid', async (req, res) => {
    const userid = req.params.userid

    const code = req.body.code;

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
        res.status(200).send(result)
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err)
    });

})

router.patch('/student/edit/:userid', async (req, res) => {

    const userid = req.params.userid
    const marks = req.body

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
            res.status(200).send(result)
        }).catch((err) => {
            console.log(err);
            res.status(400).send(err)
        });

})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log(req.headers);

    if (!token) {
        console.log('no token');
        console.log(authHeader);
        return res.status(401).json({
            message: 'No token provided'
        });
    }
    jwt.verify(token, 'SYED_JAVITH_R', (err, decoded) => {
        console.log(err);
        if (err) {
            return res.status(403).json({
                message: 'Invalid token',
                error : err
            });
        }
        req.user = decoded;
        next();
    });
}

module.exports = router;