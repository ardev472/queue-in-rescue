const express = require('express');
const router = express.Router();
const post = require('../models/Post');

router.get("/", (req, res) => {
    res.render('index');
});



module.exports = router;