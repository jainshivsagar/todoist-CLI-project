const fetch = require("node-fetch");
const { config } = require("dotenv");
const readlineSync = require("readline-sync");
config(); //loading env variables to process.env object
const baseUrl = "https://api.todoist.com/rest/v1/";

const header = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + process.env.API_TOKEN,
};

const tasksProps = ["id", "project_id", "content", "created"];

async function createTask() {
  let task = {};

  console.log("Enter Following Details:- ");
  task.project_id = readlineSync.question("Project Id:-  ");
  task.project_id === ""
    ? delete task.project_id
    : (task.project_id = parseInt(task.project_id));
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
      console.table(data, tasksProps);
    }
  } catch (err) {
    console.log(err);
  }
}
async function displayTasksByProjectId(pid) {
  try {
    let response = await fetch(baseUrl + "tasks?project_id=" + pid, {
      headers: header,
    });

    if (response.status == 200) {
      let data = await response.json();
      console.table(data, tasksProps);
    }
  } catch (err) {
    console.log(err);
  }
}
async function displayProjectById(pid) {
  try {
    let response = await fetch(baseUrl + "projects/" + pid, {
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
// async function displayAllTasks() {
//   try {
//     let response = await fetch(baseUrl + "tasks", {
//       headers: header,
//     });

//     if (response.status == 200) {
//       let data = await response.json();
//       console.table(data, tasksProps);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }
module.exports = {
  createTask,
  deleteTask,
  closeTask,
  displayAllPojects,
  displayAllTasks,
  displayTasksByProjectId,
  displayProjectById,
};
