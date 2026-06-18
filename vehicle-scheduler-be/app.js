require("dotenv").config();

const express = require("express");
const { Log } = require("logging-middleware");

const schedulerRoutes = require(
  "./src/routes/schedulerRoutes"
);

const app = express();

app.use(express.json());

app.use("/", schedulerRoutes);

const PORT = 3000;

app.listen(PORT, async () => {
  console.log(
    `Server running on port ${PORT}`
  );

  await Log(
    "backend",
    "info",
    "service",
    `Server started on port ${PORT}`
  );
});