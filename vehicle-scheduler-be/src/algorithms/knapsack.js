const { Log } = require("logging-middleware");

async function knapsack(tasks, capacity) {
  await Log(
    "backend",
    "info",
    "service",
    "Algorithm started"
  );

  await Log(
    "backend",
    "info",
    "service",
    `Capacity ${capacity}h, tasks ${tasks.length}`
  );

  const n = tasks.length;

  const dp = Array(n + 1)
    .fill()
    .map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const duration = tasks[i - 1].Duration;
    const impact = tasks[i - 1].Impact;

    for (let w = 0; w <= capacity; w++) {
      if (duration <= w) {
        dp[i][w] = Math.max(
          impact + dp[i - 1][w - duration],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  let selectedTasks = [];
  let w = capacity;

  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedTasks.push(tasks[i - 1]);
      w -= tasks[i - 1].Duration;
    }
  }

  const maxImpact = dp[n][capacity];

  await Log(
    "backend",
    "info",
    "service",
    `Algorithm done: impact ${maxImpact}, selected ${selectedTasks.length}`
  );

  return {
    maxImpact,
    selectedTasks,
  };
}

module.exports = knapsack;