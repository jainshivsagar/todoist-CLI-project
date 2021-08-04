const fetch = require("node-fetch");
const chalk = require("chalk");
const { config } = require("dotenv");
const readlineSync = require("readline-sync");
config(); //loading env variables to process.env object
const baseUrl = "https://api.todoist.com/rest/v1/";

const header = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + process.env.API_TOKEN,
};

async function createTask() {
  let task = {};

  console.log("Enter Following Details:- ");
  task.content = readlineSync.question("Content:- ");
  task.description = readlineSync.question("Description:- ");
  task.due_string = readlineSync.question(
    "Due String(e.g. tommorrow at 13):- "
  );

  try {
    let response = await fetch(baseUrl + "tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: header,
    });

    if (response.status == 200) {
      let data = await response.json();
      console.log("Following Task Created Successfully");
      console.table(data);
    }
  } catch (err) {
    console.log(err);
  }
}
async function closeTask(taskId) {
  try {
    let response = await fetch(baseUrl + "tasks/" + taskId + "/close", {
      method: "POST",
      headers: header,
    });

    if (response.status == 204) {
      console.log("Task Closed Successfully.");
    }
  } catch (err) {
    console.log(err);
  }
}
async function deleteTask(taskId) {
  try {
    let response = await fetch(baseUrl + "tasks/" + taskId, {
      method: "DELETE",
      headers: header,
    });

    if (response.status == 204) {
      console.log("Task Deleted Successfully.");
    }
  } catch (err) {
    console.log(err);
  }
}
async function displayAllPojects() {
  try {
    let response = await fetch(baseUrl + "projects", {
      headers: header,
    });

    if (response.status == 200) {
      let data = await response.json();
      console.table(data);
    }
  } catch (err) {
    console.log(err);
  }
}

async function displayAllTasks() {
  try {
    let response = await fetch(baseUrl + "tasks", {
      headers: header,
    });

    if (response.status == 200) {
      let data = await response.json();
      let props = [
        "id",
        "project_id",
        "section_id",
        "content",
        "completed",
        "created",
        "url",
      ];
      console.table(data, props);
    }
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  createTask,
  deleteTask,
  closeTask,
  displayAllPojects,
  displayAllTasks,
};
