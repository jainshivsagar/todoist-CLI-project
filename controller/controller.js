const chalk = require("chalk");
const readlineSync = require("readline-sync");
const api = require("../api/todoistAPIMethods");

const tasksProps = ["id", "project_id", "content", "created"];
const projectProps = ["id", "name", "url"];
async function addTask() {
  const task = inputTask("Project");
  try {
    const res = await api.addTask(task);

    if (res.status == 200) {
      let data = await res.json();
      console.log("Task Created Successfully");
      console.table(data);
    } else {
      console.log(res.statusText);
    }
  } catch (err) {
    console.log(err);
  }
}

async function updateTask() {
  const task = inputTask("Task");
  id = task.id;
  delete task.id;
  try {
    const res = await api.updateTask(task, id);

    if (res.status == 204) {
      console.log("Task Update Successfully");
    } else {
      console.log(res.statusText);
    }
  } catch (err) {
    console.log(err);
  }
}

async function closeTask() {
  try {
    const taskId = inputId("Task");
    const res = await api.closeTask(taskId);
    if (res.status == 204) {
      console.log("Task Closed Successfully");
    } else {
      console.log(res.statusText);
    }
  } catch (err) {
    console.log(err);
  }
}

async function reOpenTask() {
  try {
    const taskId = inputId("Task");
    const res = await api.reOpenTask(taskId);
    if (res.status == 204) {
      console.log("Task Reopened Successfully");
    } else {
      console.log(res.statusText);
    }
  } catch (err) {
    console.log(err);
  }
}
async function deleteTask() {
  try {
    const taskId = inputId("Task");
    const res = await api.deleteTask(taskId);
    if (res.status == 204) {
      console.log("Task Deleted Successfully");
    } else {
      console.log(res.statusText);
    }
  } catch (err) {
    console.log(err);
  }
}

async function displayAllActiveTasks() {
  try {
    const res = await api.getAllActiveTasks();
    if (res.status == 200) {
      let data = await res.json();
      console.table(data, tasksProps);
    } else {
      console.log(res.statusText);
    }
  } catch (err) {
    console.log(err);
  }
}

async function displayTaskByProjectId() {
  try {
    await displayAllProjects();
    const pId = inputId("Project");
    const res = await api.getTaskByProjectId(pId);
    if (res.status == 200) {
      let data = await res.json();
      console.table(data, tasksProps);
    } else {
      console.log(res.statusText);
    }
  } catch (err) {
    console.log(err);
  }
}

async function displayAllProjects() {
  try {
    const res = await api.getAllProjects();
    if (res.status == 200) {
      let data = await res.json();
      console.table(data, projectProps);
    } else {
      console.log(res.statusText);
    }
  } catch (err) {
    console.log(err);
  }
}

async function displayProjectById() {
  try {
    const pId = inputId("Project");
    const res = await api.getProjectById(pId);
    if (res.status == 200) {
      let data = await res.json();
      console.table(data);
    } else {
      console.log(res.statusText);
    }
  } catch (err) {
    console.log(err);
  }
}
function inputTask(text) {
  const task = {};
  task.id = inputId(text);
  task.content = readlineSync.question("Content:- ");
  task.description = readlineSync.question("Description:- ");
  task.due_string = readlineSync.question(
    "Due String(e.g. tommorrow at 13):- "
  );

  return task;
}

function inputId(text) {
  let id = 0;
  do {
    id = readlineSync.question(text + " Id:-  ").trim();

    if (id != "" && !isNaN(id)) {
      id = parseInt(id);
      console.log(id);
      return id;
    } else {
      console.warn(chalk.yellow(text + " Id should be a number ."));
    }
  } while (true);
}
module.exports = {
  addTask,
  updateTask,
  closeTask,
  reOpenTask,
  deleteTask,
  displayAllActiveTasks,
  displayTaskByProjectId,
  displayAllProjects,
  displayProjectById,
};
