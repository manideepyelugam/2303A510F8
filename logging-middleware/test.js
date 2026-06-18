const Log = require("./src/logger");

async function test() {
  await Log(
    "backend", "info", "service", "Application started successfully"
  );
}

test();