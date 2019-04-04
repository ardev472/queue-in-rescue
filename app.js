const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');

mongoose.connect('mongodb://localhost/mylogin', { useNewUrlParser: true }, () => {
    console.log("Database Connected");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({defaultLayout:'layout'}));

app.use("/", require('./routes/routes'));
// app.use("/altsub", require('./routes/altsub/routes'));

app.use(express.static(path.join(__dirname, 'public')));

const post = require("./routes/routes");
app.use('/page', post);

app.listen(8181, (err) => {
    console.log("Listening on port 8181");
});