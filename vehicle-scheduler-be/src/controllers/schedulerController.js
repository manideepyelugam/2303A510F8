const getDepots = require("../services/depotService");
const getVehicles = require("../services/vehicleService");
const knapsack = require("../algorithms/knapsack");
const { Log } = require("logging-middleware");

async function generateSchedule(req, res) {
  try {
    const depotId = Number(req.params.depotId);

    await Log(
      "backend",
      "info",
      "service",
      `Request received: depot ${depotId}`
    );

    const depots = await getDepots();

    const depot = depots.find(
      (d) => d.ID === depotId
    );

    if (!depot) {
      await Log(
        "backend",
        "warn",
        "service",
        `Depot not found: ${depotId}`
      );

      return res.status(404).json({
        message: "Depot not found",
      });
    }

    await Log(
      "backend",
      "info",
      "service",
      `Depot found: ${depotId}, capacity: ${depot.MechanicHours}h`
    );

    const vehicles = await getVehicles();

    await Log(
      "backend",
      "info",
      "service",
      "Knapsack started"
    );

    const result = await knapsack(
      vehicles,
      depot.MechanicHours
    );

    await Log(
      "backend",
      "info",
      "service",
      `Knapsack completed: impact ${result.maxImpact}`
    );

    await Log(
      "backend",
      "info",
      "service",
      `Response sent: depot ${depotId}`
    );

    res.json({
      depotId,
      mechanicHours: depot.MechanicHours,
      totalImpact: result.maxImpact,
      selectedTasks: result.selectedTasks,
    });
  } catch (error) {
    await Log(
      "backend",
      "error",
      "service",
      "Request failed"
    );

    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = generateSchedule;