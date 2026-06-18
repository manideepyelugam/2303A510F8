const axios = require("axios");
const { Log } = require("logging-middleware");

async function getVehicles() {
  try {
    await Log(
      "backend",
      "info",
      "service",
      "Starting vehicle fetch"
    );

    const response = await axios.get(
      `${process.env.BASE_URL}/vehicles`,
      {
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
      }
    );

    const vehiclesCount = response.data.vehicles.length;

    await Log(
      "backend",
      "info",
      "service",
      `Vehicle fetch done: ${vehiclesCount} tasks`
    );

    return response.data.vehicles;
  } catch (error) {
    await Log(
      "backend",
      "error",
      "service",
      `Vehicle fetch failed`
    );

    throw error;
  }
}

module.exports = getVehicles;