const axios = require("../config/axios");
const { calculatePriority } = require("../utils/priorityCalculator");

// Import logging middleware
const { Log } = require("logging-middleware");

async function getTopNotifications() {
  try {
    await Log(
      "backend",
      "info",
      "service",
      "Fetching notifications from API"
    );

    const response = await axios.get(
      process.env.NOTIFICATION_API,
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      }
    );

    const notifications =
      response.data.notifications || [];

    await Log(
      "backend",
      "info",
      "service",
      `Fetched ${notifications.length} notifications`
    );

    const scoredNotifications =
      notifications.map((notification) => ({
        ...notification,
        priorityScore:
          calculatePriority(notification),
      }));

    scoredNotifications.sort(
      (a, b) =>
        b.priorityScore - a.priorityScore
    );

    const top10 =
      scoredNotifications.slice(0, 10);

    await Log(
      "backend",
      "info",
      "service",
      "Top 10 notifications generated"
    );

    return top10;
  } catch (error) {
    await Log(
      "backend",
      "error",
      "service",
      error.message
    );

    throw error;
  }
}

module.exports = {
  getTopNotifications,
};