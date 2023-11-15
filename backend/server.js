const express = require('express');
const connectToDB = require('./db');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes')
const authRoutes = require('./routes/authRoutes')

connectToDB();

app.use(cors({
    allowedHeaders : [ 'Content-type' , 'Authorization' ],
    credentials : true ,
    methods : ['GET' , 'POST' , 'PUT' , 'PATCH' , "DELETE"],
    origin : ['http://localhost:3000']
}))
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.json())

app.use('/',studentRoutes)
app.use('/',authRoutes)
app.use('/',adminRoutes)

app.listen(5000 , ()=> {
    console.log("server started");
})