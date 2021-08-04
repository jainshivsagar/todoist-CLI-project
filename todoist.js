const fetch = require("node-fetch");
const chalk = require("chalk");
const figlet = require("figlet");
const readlineSync = require("readline-sync");
const {
  displayAllPojects,
  displayAllTasks,
  createTask,
  deleteTask,
  closeTask,
} = require("./Operations/crudOperations");
const { exit } = require("yargs");

const options = [
  "New Task",
  "Close A Task",
  "Delete A Task",
  "Show All Projects",
  "Show All Tasks",
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
      case 1:
        await createTask();
        break;
      case 2:
        await displayAllTasks();
        const tId = readlineSync.question("Enter Task Id:- ");
        await closeTask(tId);
        break;
      case 3:
        await displayAllTasks();
        const taskId = readlineSync.question("Enter Task Id:- ");
        await deleteTask(taskId);
        break;
      case 4:
        console.log("Displaying All Projects...");
        await displayAllPojects();
        break;
      case 5:
        console.log("Displaying All Tasks...");
        await displayAllTasks();
        break;
    }
    readlineSync.question("Press 'Enter Key' to continue...");
  }
})();
