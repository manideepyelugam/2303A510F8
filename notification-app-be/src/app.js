const express = require("express");
require("dotenv").config();

const notificationRoutes =
  require("./routes/notificationRoutes");

const app = express();

app.use(express.json());

app.use(
  "/notifications",
  notificationRoutes
);

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});