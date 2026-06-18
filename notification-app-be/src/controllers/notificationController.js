const {
  getTopNotifications,
} = require("../services/notificationService");

async function fetchTopNotifications(
  req,
  res
) {
  try {
    const notifications =
      await getTopNotifications();

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  fetchTopNotifications,
};