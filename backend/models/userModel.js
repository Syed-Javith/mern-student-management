const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : String ,
    email : String ,
    password : String ,
    rollNumber : Number,
    isAdmin : Boolean ,
    year : Number ,
    department : String,
    gender : String,
    marks : [ {
        subject : String ,
        mark : Number ,
        code : String
    } ]
})

userSchema.pre('save', function (next) {
    if(this.isAdmin){
        this.marks = [];
        this.year = 0 ;

    }
 })

const User = mongoose.model('User',userSchema)

module.exports = User;