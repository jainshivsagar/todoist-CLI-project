#!/usr/bin/env node

const fetch = require("node-fetch");
const chalk = require("chalk");
const figlet = require("figlet");
const readlineSync = require("readline-sync");
const {
  addTask,
  updateTask,
  closeTask,
  reOpenTask,
  deleteTask,
  displayAllActiveTasks,
  displayTaskByProjectId,
  displayProjectById,
  displayAllProjects,
} = require("../controller/controller");

const { checkApiToken } = require("./config");
const options = [
  "New Task",
  "Update Task",
  "Close A Task",
  "Reopen Task",
  "Delete A Task",
  "Show All Tasks",
  "Show Tasks Of A Project",
  "Show project by ID",
  "Show All Projects",
];
(async function main() {
  let index = 0;
  await checkApiToken();
  while (true) {
    console.log(
      "**************************************************************************\n"
    );
    console.log(chalk.green(figlet.textSync("TODOIST", "Banner3-D")));
    console.log(
      "\n**************************************************************************"
    );
    index = readlineSync.keyInSelect(options, "Press A Number?") + 1;
    console.log(index);
    switch (index) {
      case 0:
        console.log("You Are Exited.");
        process.exit();
        break;
      case 1:
        await addTask();
        break;
      case 2:
        await updateTask();
        break;
      case 3:
        await closeTask();
        break;
      case 4:
        await reOpenTask();
        break;
      case 5:
        await deleteTask();
        break;
      case 6:
        await displayAllActiveTasks();
        break;
      case 7:
        await displayTaskByProjectId();
        break;
      case 8:
        await displayProjectById();
        break;
      case 9:
        await displayAllProjects();
        break;
    }
    readlineSync.question("Press 'Enter Key' to continue...");
    console.clear();
  }
})();
