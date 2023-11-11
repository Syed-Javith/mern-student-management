const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()
const url = process.env.MONGO_URL

const connectToDB = async () => {

    await mongoose.connect(url)
    .then((result) => {
        console.log("connected to database");
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = connectToDB;
