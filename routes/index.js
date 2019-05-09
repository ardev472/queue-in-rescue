const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get("/", (req, res) => {
    res.render('index');
});
router.get("/login", (req, res) => {
    res.render('login')
});

router.post("/login",(req,res)=>{
    res.send("login working");
});

// Register Page
router.post("/register", (req, res) => {
    // let error = [];
    // if (!req.body.name) {
    //     error.push({ message: 'Please add a name' });
    // }
    // if (!req.body.email) {
    //     error.push({ message: "Please add a email" });
    // }
    // if (!req.body.password || !req.body.passwordConfirm) {
    //     error.push({ message: "Password required" });
    // }
    // if (req.body.password != req.body.passwordConfirm) {
    //     error.push({ message: "Passwords does not match" });
    // }
    // if (error.length > 0) {
    //     res.render("/register", {
    //         error: error,
    //         name: req.body.name,
    //         email: req.body.email
    //     });
    // } else 
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
                            // req.flash('success_message','Yor are now registered,please login');
                            res.redirect("/login");
                            //res.send("data inserted");
                        })
                    })
                })
            } else {
                // req.flash('error_message', 'That email exits please login');
                res.redirect('/login');
            }
        })
    
    //res.send("register working");
});
module.exports = router;