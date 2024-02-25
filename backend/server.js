const express = require('express');
const connectToDB = require('./db');
const app = express();
const bodyParser = require('body-parser');
const corsMiddleware = require('./middlewares/corsMiddleware');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');
const passport = require('./utils/passportConfig')

connectToDB();

app.use(corsMiddleware)
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.json())

app.use(session({
    secret: 'my_secret_for_project',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',studentRoutes)
app.use('/',authRoutes)
app.use('/',adminRoutes)
app.get('/api/user', (req, res) => {
    res.json({ user: req.user });
});
app.listen(5000 , () =>{
    console.log("server started");
})