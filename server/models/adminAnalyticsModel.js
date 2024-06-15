const db = require("../config/databaseConnection");

const AdminAnalyticsModel = {
  getCategories: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT DISTINCT category FROM items", (err, results) => {
        if (err) return reject(err);
        const categories = results.map((row) => row.category);
        resolve(categories);
      });
    });
  },

  getCategoryData: (category, startDate, endDate) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT i.title, SUM(od.quantity) as total_quantity
        FROM order_details od
        JOIN items i ON od.itemID = i.itemID
        JOIN orders o ON od.orderID = o.orderID
        WHERE i.category = ?
        AND o.orderDate BETWEEN ? AND ?
        GROUP BY i.itemID
        ORDER BY i.title
      `;
      db.query(query, [category, startDate, endDate], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  getCategoryRevenueData: (category, startDate, endDate) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT i.title, SUM(od.quantity * i.price) as total_revenue
        FROM order_details od
        JOIN items i ON i.itemID = od.itemID
        JOIN orders o ON od.orderID = o.orderID
        WHERE i.category = ?
        AND o.orderDate BETWEEN ? AND ?
        GROUP BY i.itemID
        ORDER BY i.title
      `;
      db.query(query, [category, startDate, endDate], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

};

module.exports = AdminAnalyticsModel;