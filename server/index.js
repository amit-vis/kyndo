const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 8000;
require("./config/database")

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());

app.use("/", require("./routes"))
app.listen(port, (err)=>{
    if(err){
        console.log("server is not listening the port",err);
    }
    console.log("server is running on port",port)
})