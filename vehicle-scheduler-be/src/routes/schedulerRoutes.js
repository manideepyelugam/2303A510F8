const express = require("express");

const router = express.Router();

const generateSchedule = require(
  "../controllers/schedulerController"
);

router.get(
  "/schedule/:depotId",
  generateSchedule
);

module.exports = router;