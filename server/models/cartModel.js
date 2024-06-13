const db = require('../config/databaseConnection');

const CartModel = {

    getCartByUserID: (userID, callback) => {
        db.query(
          "SELECT cartID FROM cart WHERE userID = ?",
          [userID],
          (err, results) => {
            if (err) {
              console.error("Error fetching cart by user ID:", err);
            }
            callback(err, results);
          }
        );
      },

      createCart: (userID, callback) => {
        db.query(
          "INSERT INTO cart (userID) VALUES (?)",
          [userID],
          (err, results) => {
            if (err) {
              console.error("Error creating new cart:", err);
            }
            callback(err, results);
          }
        );
      },

      addItemToCart: (cartID, itemID, callback) => {
        const heldUntil = new Date(Date.now() + 60 * 60 * 1000);
    
        db.query(
          `INSERT INTO cart_details (cartID, itemID, quantity, heldUntil) 
          VALUES (?, ?, 1, ?)
          ON DUPLICATE KEY UPDATE quantity = quantity + 1`,
    
          [cartID, itemID, heldUntil],
          (err, results) => {
            if (err) {
              console.error("Error adding item to cart:", err);
            }
            callback(err, results);
          }
        );
      },

      getCartItemsByUserID: (values, callback) => {
        const sqlGetItemsByUserID = `SELECT ci.cartDetailID, c.cartID, i.itemID, ci.quantity, i.stockCount AS availableQuantity, i.title, i.price, i.imageUrl 
        FROM cart_details ci 
        JOIN cart c ON ci.cartID = c.cartID 
        JOIN items i ON ci.itemID = i.itemID 
        WHERE c.userID = ?`;
        db.query(sqlGetItemsByUserID, values, callback);
      },

      getCartItemCountByUserID: (values, callback) => {
        const sqlGetItemCountByUserID = `SELECT COUNT(*) AS itemCount 
        FROM cart_details ci 
        JOIN cart c ON ci.cartID = c.cartID 
        WHERE c.userID = ?`;
        db.query(sqlGetItemCountByUserID, values, callback);
      },

      removeItemFromCart: (cartDetailID, callback) => {
        const sqlRemoveItem = `DELETE FROM cart_details WHERE cartDetailID = ?`;
        db.query(sqlRemoveItem, [cartDetailID], callback);
      },
    
      updateItemQuantity: (cartDetailID, newQuantity, callback) => {
        const sqlUpdateQuantity = `UPDATE cart_details SET quantity = ? WHERE cartDetailID = ?`;
        db.query(sqlUpdateQuantity, [newQuantity, cartDetailID], callback);
      },
    
      increaseStock: (itemID, quantity, callback) => {
        const sqlIncreaseStock = `UPDATE items SET stockCount = stockCount + ? WHERE itemID = ?`;
        db.query(sqlIncreaseStock, [quantity, itemID], callback);
      },
    
      adjustStock: (itemID, adjustment, callback) => {
        const sqlAdjustStock = `UPDATE items SET stockCount = stockCount + ? WHERE itemID = ?`;
        db.query(sqlAdjustStock, [adjustment, itemID], callback);
     
      }
};

module.exports = CartModel;
