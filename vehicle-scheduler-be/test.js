const knapsack = require("./src/algorithms/knapsack");

const tasks = [
  {
    TaskID: "A",
    Duration: 10,
    Impact: 60,
  },
  {
    TaskID: "B",
    Duration: 20,
    Impact: 100,
  },
  {
    TaskID: "C",
    Duration: 30,
    Impact: 120,
  },
];

const result = knapsack(tasks, 50);

console.log(result);