const express = require("express");

const {
  fetchTopNotifications,
} = require("../controllers/notificationController");

const router = express.Router();

router.get(
  "/top10",
  fetchTopNotifications
);

module.exports = router;