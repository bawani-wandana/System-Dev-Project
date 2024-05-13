const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express()
app.use(cors())

const db = mysql.createConnection(
    {
       host:"localhost",
       user:'root',
       password:'',
       database:'pavithra_bookshop' 
    }
)

app.get('/',(re,res)=>{
    return res.json("From Backend Side");
})

app.get('')
app.listen(8081,()=>{
    console.log("listening");
})