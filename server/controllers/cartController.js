const CartModel = require('../models/cartModel');
const CartDetails = require('../models/cartDetailsModel');
const db = require('../config/databaseConnection');

const CartController = {

    getCart: (req, res) => {
        const { userId } = req.params;
        const sqlGetCartItems = `SELECT * FROM cart_details WHERE userID = ?`;

        db.query(sqlGetCartItems, [userId], (err, results) => {
            if (err) {
                console.error("Error fetching cart items:", err);
                return res.status(500).send("Error fetching cart items.");
            }
            res.status(200).send(results);
        });
    },

    addToCart: (req, res) => {
        const { userID, itemID } = req.body;

        console.log(userID, itemID);

        db.beginTransaction((transactionErr) => {
            if (transactionErr) {
                console.error("Error starting transaction:", transactionErr);
                return res.status(500).send("Transaction error.");
            }

            const reduceStockQuery =
                "UPDATE items SET stockCount = stockCount - 1 WHERE itemID = ? AND stockCount > 0";
            db.query(
                reduceStockQuery,
                [itemID],
                (reduceStockErr, reduceStockResult) => {
                    if (reduceStockErr) {
                        console.error("Error reducing stock:", reduceStockErr);
                        return db.rollback(() => {
                            res.status(500).send("Error reducing stock.");
                        });
                    }

                    if (reduceStockResult.affectedRows === 0) {
                        return db.rollback(() => {
                            res.status(400).send("Insufficient stock.");
                        });
                    }

                    CartModel.getCartByUserID(userID, (getCartErr, results) => {

                        if (getCartErr) {
                            console.error("Error fetching cart by user ID:", getCartErr);
                            return res
                                .status(500)
                                .send("Error fetching cart by user ID:", getCartErr);
                        }

                        let cartID;

                        const addToCart = (cartID) => {
                            CartModel.addItemToCart(
                                cartID,
                                itemID,
                                (addItemErr, addItemResult) => {
                                    if (addItemErr) {
                                        console.error("Error adding item to cart:", addItemErr);
                                        return db.rollback(() => {
                                            res.status(500).send("Error adding item to cart.");
                                        });
                                    }

                                    // Calculate total from items in the cart
                                    db.query(
                                        "SELECT SUM(i.price * ci.quantity) AS total FROM cart_details ci INNER JOIN items i ON ci.itemID = i.itemID WHERE ci.cartID = ?",
                                        [cartID],
                                        (totalErr, totalResult) => {
                                            if (totalErr) {
                                                console.error("Error calculating cart total:", totalErr);
                                                return res.status(500).send("Error calculating cart total.");
                                            }

                                            const cartTotal = totalResult[0].total;

                                            // Update cart total in the database
                                            db.query(
                                                "UPDATE cart SET cartTotal = ? WHERE cartID = ?",
                                                [cartTotal, cartID],
                                                (updateTotalErr, updateTotalResult) => {
                                                    if (updateTotalErr) {
                                                        console.error("Error updating cart total:", updateTotalErr);
                                                        return res.status(500).send("Error updating cart total.");
                                                    }
                                                    db.commit((commitErr) => {
                                                        if (commitErr) {
                                                            console.error("Error committing transaction:", commitErr);
                                                            return db.rollback(() => {
                                                                res.status(500).send("Transaction commit error.");
                                                            });
                                                        }
                                                        res.status(200).send("Item added to cart and cart total updated.");
                                                    });
                                                }
                                            );
                                        }
                                    );
                                }
                            );
                        };

                        if (results.length > 0) {
                            cartID = results[0].cartID;
                            console.log("Existing cart found:", cartID);
                            addToCart(cartID);
                        } else {
                            console.log("No existing cart found, creating new cart");
                            CartModel.createCart(
                                userID,
                                (createCartErr, createCartResult) => {
                                    if (createCartErr) {
                                        console.error("Error creating new cart:", createCartErr);
                                        return db.rollback(() => {
                                            res.status(500).send("Error creating cart.");
                                        });
                                    }

                                    cartID = createCartResult.insertId;
                                    console.log("New cart created:", cartID);
                                    addToCart(cartID);
                                }
                            );
                        }
                    });
                }
            );
        });
    },

    getCartItems: (req, res) => {
        // console.log("Request params:", req.params);
        const { userId } = req.params;
        // console.log("UserID from request params:", id);
        if (!userId) {
            return res.status(400).json({ error: "UserID is required" });
        }

        CartModel.getCartItemsByUserID([userId], (err, results) => {
            if (err) {
                console.error("Error fetching cart items:", err);
                return res.status(500).send(err);
            }
            // console.log("Success fetching cart items: from request params:");
            res.status(200).json(results);
            // console.log(results)
        });
    },

    getCartItemCount: (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "UserID is required" });
        }

        CartModel.getCartItemCountByUserID([id], (err, results) => {
            if (err) {
                console.error("Error fetching cart item count:", err);
                return res.status(500).send(err);
            }
            res.status(200).json(results);
        });
    },

    removeFromCart: (req, res) => {
        const { cartDetailID, itemID, quantity } = req.body;

        db.beginTransaction((transactionErr) => {
            if (transactionErr) {
                console.error("Error starting transaction:", transactionErr);
                return res.status(500).send("Transaction error.");
            }

            CartModel.removeItemFromCart(cartDetailID, (removeErr) => {
                if (removeErr) {
                    console.error("Error removing item from cart:", removeErr);
                    return db.rollback(() => {
                        res.status(500).send("Error removing item from cart.");
                    });
                }

                CartModel.increaseStock(itemID, quantity, (increaseErr) => {
                    if (increaseErr) {
                        console.error("Error increasing stock:", increaseErr);
                        return db.rollback(() => {
                            res.status(500).send("Error increasing stock.");
                        });
                    }

                    // Calculate total from items in the cart
                    db.query(
                        "SELECT SUM(i.price * ci.quantity) AS total FROM cart_details ci INNER JOIN items i ON ci.itemID = i.itemID WHERE ci.cartID = (SELECT cartID FROM cart_details WHERE cartDetailID = ?)",
                        [cartDetailID],
                        (totalErr, totalResult) => {
                            if (totalErr) {
                                console.error("Error calculating cart total:", totalErr);
                                return db.rollback(() => {
                                    res.status(500).send("Error calculating cart total.");
                                });
                            }

                            const cartTotal = totalResult[0].total;

                            // Update cart total in the database
                            db.query(
                                "UPDATE cart SET cartTotal = ? WHERE cartID = (SELECT cartID FROM cart_details WHERE cartDetailID = ?)",
                                [cartTotal, cartDetailID],
                                (updateTotalErr, updateTotalResult) => {
                                    if (updateTotalErr) {
                                        console.error("Error updating cart total:", updateTotalErr);
                                        return db.rollback(() => {
                                            res.status(500).send("Error updating cart total.");
                                        });
                                    }

                                    db.commit((commitErr) => {
                                        if (commitErr) {
                                            console.error("Error committing transaction:", commitErr);
                                            return db.rollback(() => {
                                                res.status(500).send("Transaction commit error.");
                                            });
                                        }

                                        res.status(200).send("Item removed from cart and stock updated.");
                                    });
                                }
                            );
                        }
                    );
                });
            });
        });
    },

    updateCartItemQuantity: (req, res) => {
        const { cartDetailID, newQuantity, itemID, originalQuantity } =
            req.body;
        const quantityDifference = newQuantity - originalQuantity;

        db.beginTransaction((transactionErr) => {
            if (transactionErr) {
                console.error("Error starting transaction:", transactionErr);
                return res.status(500).send("Transaction error.");
            }

            CartModel.updateItemQuantity(cartDetailID, newQuantity, (updateErr) => {
                if (updateErr) {
                    console.error("Error updating item quantity:", updateErr);
                    return db.rollback(() => {
                        res.status(500).send("Error updating item quantity.");
                    });
                }

                CartModel.adjustStock(
                    itemID,
                    -quantityDifference,
                    (adjustErr) => {
                        if (adjustErr) {
                            console.error("Error adjusting stock:", adjustErr);
                            return db.rollback(() => {
                                res.status(500).send("Error adjusting stock.");
                            });
                        }


                        // Calculate total from items in the cart
                        db.query(
                            "SELECT SUM(i.price * ci.quantity) AS total FROM cart_details ci INNER JOIN items i ON ci.itemID = i.itemID WHERE ci.cartID = (SELECT cartID FROM cart_details WHERE cartDetailID = ?)",
                            [cartDetailID],
                            (totalErr, totalResult) => {
                                if (totalErr) {
                                    console.error("Error calculating cart total:", totalErr);
                                    return db.rollback(() => {
                                        res.status(500).send("Error calculating cart total.");
                                    });
                                }

                                const cartTotal = totalResult[0].total;

                                // Update cart total in the database
                                db.query(
                                    "UPDATE cart SET cartTotal = ? WHERE cartID = (SELECT cartID FROM cart_details WHERE cartDetailID = ?)",
                                    [cartTotal, cartDetailID],
                                    (updateTotalErr, updateTotalResult) => {
                                        if (updateTotalErr) {
                                            console.error("Error updating cart total:", updateTotalErr);
                                            return db.rollback(() => {
                                                res.status(500).send("Error updating cart total.");
                                            });
                                        }

                                        db.commit((commitErr) => {
                                            if (commitErr) {
                                                console.error("Error committing transaction:", commitErr);
                                                return db.rollback(() => {
                                                    res.status(500).send("Transaction commit error.");
                                                });
                                            }

                                            res.status(200).send("Item quantity updated and stock adjusted.");
                                        });
                                    }
                                );
                            }
                        );
                    });
            });
        });
    },

    updateCartTotal: (req, res) => {
        const { userId, cartTotal } = req.body;

        if (!userId || cartTotal === undefined) {
            console.error("User ID and cart total are required.", { userId, cartTotal });
            return res.status(400).send("User ID and cart total are required.");
        }

        const query = `
          UPDATE cart 
          SET cartTotal = ? 
          WHERE userID = ? 
          AND cartID = (
            SELECT cartID 
            FROM cart 
            WHERE userID = ? 
            ORDER BY createdDate DESC 
            LIMIT 1
          )
        `;

        db.query(query, [cartTotal, userId, userId], (err, result) => {
            if (err) {
                console.error("Error updating cart total:", err);
                return res.status(500).send("Error updating cart total.");
            }

            if (result.affectedRows === 0) {
                console.error("No cart found for the user to update.");
                return res.status(404).send("No cart found for the user to update.");
            }

            res.status(200).send("Cart total updated successfully.");
        });
    }

}

module.exports = CartController;