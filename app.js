const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const _=require('lodash');


mongoose.connect('mongodb://localhost/mylogin', { useNewUrlParser: true }, () => {
    console.log("Database Connected");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({defaultLayout:'layout'}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());    

app.use("/", require('./routes/index'));

app.use(express.static(path.join(__dirname, 'public')));

const index = require("./routes/index");

app.use('/index', index);

app.listen(4444, (err) => {
    console.log("Listening on port 4444");
});