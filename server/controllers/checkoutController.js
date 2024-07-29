const CheckoutModel = require("../models/checkoutModel");
const db = require("../config/databaseConnection");

exports.getAddress = (req, res) => {
    const userId = req.params.userId;
  
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
  
    CheckoutModel.getAddress(userId, (error, results) => {
      if (error) {
        console.error("Error fetching address details from the database:", error);
        return res.status(500).json({ error: "Database query error" });
      }
      console.log('Fetched address details:', results); // Log the fetched results
  
      if (results.length === 0) {
        return res.status(404).json({ error: "No address found for the given userId" });
      }
  
      const addressDetails = results.map(row => ({
        firstName: row.firstName,
        phoneNumber: row.phoneNumber,
        email: row.email,
        street: row.street,
        district: row.district,
        city: row.city,
        postalCode: row.postalCode,
        addressID: row.addressID
      }));
  
      res.json(addressDetails);
    });
  };
  
  exports.getCart = async (req, res) => {
    const userId = req.params.userId;
  
    console.log(userId)
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
  
    try {
      const cartResults = await new Promise((resolve, reject) => {
        CheckoutModel.getCartByUserId(userId, (error, results) => {
          if (error) {
            console.error("Error fetching cart from the database:", error);
            reject({ status: 500, error: "Database query error" });
          }
  
          if (results.length === 0) {
            reject({ status: 404, message: "Cart not found" });
          }
  
          resolve(results);
        });
      });
  
      const cartID = cartResults[0].cartID;
      const cartTotal = cartResults[0].cartTotal;
  
      // const items = await new Promise((resolve, reject) => {
      //   CheckoutModel.getCartItemsByCartId(cartID, (err, items) => {
      //     if (err) {
      //       console.error("Error fetching cart items from the database:", err);
      //       reject({ status: 500, error: "Database query error" });
      //     }
      //     resolve(items);
      //   });
      // });
  
      res.json([{ cartID, cartTotal }]);
    } catch (err) {
        res.status(err.status || 500).json(err);
    }
  };

  exports.createPayment = (req, res) => {
    const { cartID, paymentAmount, paymentMethod, paymentDate, paymentStatus } = req.body;
  
    if (!cartID || !paymentAmount || !paymentMethod || !paymentDate || !paymentStatus) {
      return res.status(400).json({ error: "All payment details are required" });
    }
  
    const paymentData = {
      cartID,
      paymentAmount,
      paymentMethod,
      paymentDate,
      paymentStatus
    };
  
    CheckoutModel.createPayment(paymentData, (error, results) => {
      if (error) {
        console.error("Error creating payment in the database:", error);
        return res.status(500).json({ error: "Database query error" });
      }
      res.json({ paymentID: results.insertId });
    });
  };
  

  
  exports.createOrder = async (req, res) => {
    const { orderDate, orderType, totalAmount, orderStatus, userID, addressID, paymentID} = req.body;
  
    console.log(req.body)
    if ( !orderDate || !orderType || !totalAmount || !orderStatus || !userID || !paymentID || !addressID) {
      return res.status(400).json({ error: "All order details are required" });
    }
  
    const orderData = {
      orderDate,
      orderType,
      totalAmount,
      orderStatus,
      userID,
      addressID,
      paymentID,
    };
  
    CheckoutModel.createOrder(orderData, (error, results) => {
      if (error) {
        console.error("Error creating order in the database:", error);
        return res.status(500).json({ error: "Database query error" });
      }
      // res.json({ message: "Order created successfully" });
      res.json({ orderID: results.insertId });
    });
  };

exports.createOrderDetails = (req, res) => {
    const { orderDetails } = req.body;

    if (!orderDetails || !orderDetails.length) {
        return res.status(400).json({ error: "Order details are required" });
    }

    // Validate each order detail entry
    for (let detail of orderDetails) {
        if (detail.orderID == null || detail.itemID == null || detail.quantity == null) {
            return res.status(400).json({ error: "orderID, itemID, and quantity are required for each order detail" });
        }
    }

    CheckoutModel.createOrderDetails(orderDetails, (error, results) => {
        if (error) {
            console.error("Error creating order details in the database:", error);
            return res.status(500).json({ error: "Database query error" });
        }
        res.json({ message: "Order details created successfully" });
    });
};


exports.clearCart = (req, res) => {
    const cartId = req.params.cartId;
    if (!cartId) {
        return res.status(400).json({ error: "cartId is required" });
    }
    CheckoutModel.clearCart(cartId, (error, results) => {
        if (error) {
            console.error("Error clearing cart in the database:", error);
            return res.status(500).json({ error: "Database query error" });
        }
        res.json({ message: "Cart cleared successfully" });
    });
};