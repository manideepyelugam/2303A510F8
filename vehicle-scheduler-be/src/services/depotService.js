const axios = require("axios");
const { Log } = require("logging-middleware");

async function getDepots() {
  try {
    await Log(
      "backend",
      "info",
      "service",
      "Starting depot fetch"
    );

    const response = await axios.get(
      `${process.env.BASE_URL}/depots`,
      {
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
      }
    );

    const depotsCount = response.data.depots.length;

    await Log(
      "backend",
      "info",
      "service",
      `Depot fetch done: ${depotsCount} depots`
    );

    return response.data.depots;
  } catch (error) {
    await Log(
      "backend",
      "error",
      "service",
      `Depot fetch failed`
    );

    throw error;
  }
}

module.exports = getDepots;