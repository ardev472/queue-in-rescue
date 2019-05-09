const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
// const User = require("../models/User");
// Login Page
router.get("/login", (req, res) => {
    res.render('login')
});
// Register Page
router.get("/register", (req, res) => {
  res.render("register");
});

module.exports = router;