const express = require('express');
const path = require('path')
const port = 8998;
const app = express();
const db = require('./config/database');
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'/uploads')));
app.use('/',require('./routes/indexRoutes'));
app.listen(port,(err)=>{
    if(err){
        console.log("Server is not ready");
        return false;
    }
    console.log("Server is running on port : "+port);
})