const express = require("express");
const app = express();
const port = 8000;
require("./config/database")

app.use(express.json());

app.listen(port, (err)=>{
    if(err){
        console.log("server is not listening the port",err);
    }
    console.log("server is running on port",port)
})