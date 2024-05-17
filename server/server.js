const express = require('express');
const cors = require ('cors');
const db = require ('./config/databaseConnection')
const userRoutes = require('./routes/userRoutes');

require ("dotenv").config();


const app = express();

app.use(express.json());

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Routes
app.use('/api/users', userRoutes);

app.use((err, req, res, next)=>{
    err.statusCode =err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        message:err.message,
    });
});



//port assign to the backend server for successful connection requests
app.listen(3000, () => {
    console.log("listening");
  })
  