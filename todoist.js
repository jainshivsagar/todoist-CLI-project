const fetch = require("node-fetch");
const chalk = require("chalk");
const figlet = require("figlet");
const readlineSync = require("readline-sync");
const { displayAllPojects, displayAllTasks } = require("./src/readOperations");

(async function main() {
  console.log(chalk.green(figlet.textSync("TODOIST", "Banner3-D")));

  console.log("Displaying All Projects...");
  await displayAllPojects();

  console.log("Displaying All Tasks...");
  await displayAllTasks();
})();
