const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt =require('bcryptjs');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

router.get("/", (req, res) => {
    res.render('index');
});
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    //console.log(email);
    User.findOne({ email: email }).then(user => {
        if (!user) return done(null, false, { message: 'No User found' });

        bcrypt.compare(password, user.password, (err, matched) => {
            if (err) return err;

            if (matched) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Incorrect password' });
            }
        })
    })
}));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
router.get("/login", (req, res) => {
    res.render('login')
});

router.post("/login", (req, res,next) => {
  passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/register',
        //failureFlash:'true'
    })(req,res,next);
});

// Register Page
router.get("/register", (req, res) => {
    res.render("register");
});
router.post("/register", (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;
                    newUser.save().then(savedUser => {
                        //req.flash('success_message', 'Yor are now registered,please login');
                        res.redirect("/login");
                    })
                })
            })
        } else {
            // req.flash('error_message', 'That email exits please login');
            // res.redirect('/login');
            res.send("Something went wrong");
        }
    })
});


module.exports = router;