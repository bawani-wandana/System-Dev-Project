const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const userRoutes = require('../server/routes/userRoutes');
const itemRoutes = require('./routes/itemsRoute');
const itemsCustomerRoutes = require ('./routes/itemsCustomerRoutes');
const userManageRoutes = require ('./routes/userManageRoutes')
const staffHandlingRoutes = require ('./routes/staffHandlingRoutes')
const cartRoutes = require ('./routes/cartRoutes')
const orderRoutes = require ('./routes/orderRoutes')
const orderDetailsRoutes = require ('./routes/orderDetailsRoutes')
const addressRoutes = require ('./routes/adressRoutes')

require ('dotenv').config();
const db = require ('./config/databaseConnection');
const restockRoutes = require('./routes/restockRoutes');
const itemsCategoryRoutes = require('./routes/itemsCategoryRoutes')

const PORT = process.env.PORT
const app = express();
app.use(cors());
app.use(express.json());


app.use(bodyParser.json());

app.use("/routes", userRoutes);
app.use("/routes", itemRoutes);
app.use("/routes",itemsCustomerRoutes);
app.use ("/routes", userManageRoutes);
app.use("/routes", staffHandlingRoutes);
app.use("/routes", cartRoutes);
app.use("/routes", restockRoutes);
app.use("/routes", orderRoutes );
// app.use("/routes", orderDetailsRoutes);
app.use("/routes", itemsCategoryRoutes);
app.use("/routes", addressRoutes);

app.listen(PORT, () => {
    console.log("Server is listening on port 8081");
});

