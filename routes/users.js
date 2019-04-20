const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// Load User model
const User = require("../models/User");
// Login Page
router.get("/login", (req, res) => {
    res.render('login')
});
// Register Page
router.get("/register", (req, res) => {
  res.render("register");
});

router.post('/register', (req, res) => {
    // res.send('Not working');
    const { username, password, password2 } = req.body;
    let errors = [];
    if (!username || !password || !password2) {
        res.send("Plaese mark all the fileds");
    }   
    
     else {
            const newUser = new User({
                username,
                password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    });

passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
    User.findOne({ username: username }).then(user => {
        if (!user) return done(null, false, { message: 'No user found' });
        bcrypt.compare(password, user.password, (err, matched) => {
            if (err) return err;
            if (matched) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password' });
            }
        });
    });
}));

module.exports = router;