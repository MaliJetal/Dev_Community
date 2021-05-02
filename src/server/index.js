const express = require("express");
//const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');

//api routes
//const users = require('./routes/api/users');

//express
const app = express();
app.use(express.static(__dirname,'..', '..', '/public'));
//body-parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//DB config
const config={
    autoIndex:false,
    useNewUrlParser: true,
    useUnifiedTopology: true
};
//const db = require('./config/keys').mongoURL;

//connect to mongoDb
//mongoose.connect(db,config).then(() => console.log("Mongo DB Connected")).catch(err=> console.log(err));

//passport middleware
//app.use(passport.initialize());

// Passport Config
//require('./config/passport')(passport);

//use routes
//app.use("/api/users", users);

app.use("/", (req,res) => res.send("Hello World"));

const port = process.env.PORT|| 5000;

app.listen(port, () => console.log(`Server running at port ${port}`));