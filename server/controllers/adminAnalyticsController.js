const AdminAnalyticsModel = require("../models/adminAnalyticsModel");
const db = require("../config/databaseConnection");

// Get all product categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await AdminAnalyticsModel.getCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get quantities ordered per product for a given category
exports.getCategoryData = async (req, res) => {
  const { category } = req.params;
  const { startDate, endDate } = req.query;

  try {
    const rows = await AdminAnalyticsModel.getCategoryData(
      category,
      startDate,
      endDate
    );
    const labels = rows.map((row) => row.title);
    const data = rows.map((row) => row.total_quantity);
    res.json({
      labels,
      datasets: [
        {
          label: "Quantities Ordered",
          data,
          fill: true,
          borderColor: "#FF6384",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get revenue generated per product for a given category
exports.getCategoryRevenueData = async (req, res) => {
  const { category } = req.params;
  const { startDate, endDate } = req.query;

  try {
    const rows = await AdminAnalyticsModel.getCategoryRevenueData(
      category,
      startDate,
      endDate
    );
    const labels = rows.map((row) => row.title);
    const data = rows.map((row) => row.total_revenue);

    res.json({
      labels,
      datasets: [
        {
          label: "Revenue Generated",
          data,
          fill: true,
          borderColor: "#36A2EB",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
      ],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



