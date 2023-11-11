const mongoose = require('mongoose');

const url = 'mongodb+srv://Syed-Javith:RT6D5Hvu.m7h5TB@cluster0.negnedn.mongodb.net/ip'

const connectToDB = async () => {

    await mongoose.connect(url)
    .then((result) => {
        console.log("connected to database");
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = connectToDB;
