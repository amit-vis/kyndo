const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const passport = require("passport");
const fileUpload = require("express-fileupload");
const app = express();
const port = 8000;
require("./config/database");
require("./config/passport-jwt");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(fileUpload({
    useTempFiles: true
}));

app.use("/", require("./routes"));

const resetPasswordRoute = require('./routes/reset_password');
app.use('/api', resetPasswordRoute);

app.listen(port, (err)=>{
    if(err){
        console.log("Server is not listening to the port", err);
    }
    console.log("Server is running on port", port);
});
