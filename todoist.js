const fetch = require("node-fetch");
const chalk = require("chalk");
const figlet = require("figlet");
const readlineSync = require("readline-sync");
const { displayAllPojects, displayAllTasks } = require("./src/readOperations");
const { exit } = require("yargs");

const options = [
  "New Task",
  "Close Task",
  "Show Task",
  "Delete Task",
  "Display All Projects",
  "Display All Tasks",
];
(async function main() {
  console.log(chalk.green(figlet.textSync("TODOIST", "Banner3-D")));

  let index = 0;
  while (true) {
    index = readlineSync.keyInSelect(options, "Press A Number?") + 1;
    console.log(index);
    switch (index) {
      case 0:
        console.log("You Are Exited.");
        exit();
        break;
      case 1: //code for create a tasks
        break;
      case 2: //code for close a task
        break;
      case 3: //code for show tasks
        break;
      case 4: //code for delete a task
        break;
      case 5:
        console.log("Displaying All Projects...");
        await displayAllPojects();
        break;
      case 6:
        console.log("Displaying All Tasks...");
        await displayAllTasks();
        break;
    }
  }
})();
