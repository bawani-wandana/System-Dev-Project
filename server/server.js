const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const userRoutes = require('../server/routes/userRoutes');
require ('dotenv').config();

const PORT = process.env.PORT
const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

app.use("/routes", userRoutes);

app.listen(PORT, () => {
    console.log("Server is listening on port 8081");
});

