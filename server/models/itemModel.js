const db = require('../config/databaseConnection');


const addItem = (values, callback) => {
    const sqlInsert = "INSERT INTO items (itemID, title, category, stockCount, price, imageUrl, author, isbn, description, userTypeID, threshold) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
    const preparedValues = values.map (value=> value === ''? null:value);
    db.query(sqlInsert, preparedValues, callback);
};



const getItems = (values, callback) => {
  try {
      const sqlgetitems = `SELECT itemID, title, category, stockCount, price,  threshold FROM items`;
      db.query (sqlgetitems, values, callback);
  } catch (error) {
      console.error("Error fetching items from database: ", error);
      throw error;
  }
};

const updateItem = async (item) => {
    try {
      const { itemID, title, category, stockCount, price, author, isbn, description, threshold } = item;
      const sqlUpdate = 'UPDATE items SET title = ?, category = ?, stockCount = ?, price = ?, author = ?, isbn = ?, description = ?, threshold =? WHERE itemID = ?';
      const values = [title, category, stockCount, price, author, isbn, description,threshold, itemID];
      const result = await db.query(sqlUpdate, values);
      return result;
    } catch (error) {
      console.error("Error updating item in database: ", error);
      throw error;
    }
  };

  const deleteItem = async (itemID) => {
    try {
      const sqlDelete = 'DELETE FROM items WHERE itemID = ?';
      const result = await db.query(sqlDelete, [itemID]);
      return result;
    } catch (error) {
      console.error("Error deleting item from database: ", error);
      throw error;
    }
  };


  

module.exports = {
    addItem,
    getItems,
    updateItem,
    deleteItem,
};


