const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
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


module.exports = router;