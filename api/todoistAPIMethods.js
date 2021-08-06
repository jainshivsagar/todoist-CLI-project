const fetch = require("node-fetch");
const { config } = require("dotenv");
const { BASE_URL } = require("../constants/constants");

config(); //loading env variables to process.env object

const header = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + process.env.API_TOKEN,
};

function addTask(task) {
  return fetch(BASE_URL + "tasks", {
    method: "POST",
    body: JSON.stringify(task),
    headers: header,
  });
}
function updateTask(task, id) {
  return fetch(BASE_URL + "tasks/" + id, {
    method: "POST",
    body: JSON.stringify(task),
    headers: header,
  });
}
function closeTask(tId) {
  return fetch(BASE_URL + "tasks/" + tId + "/close", {
    method: "POST",
    headers: header,
  });
}
function reOpenTask(tId) {
  return fetch(BASE_URL + "tasks/" + tId + "/reopen", {
    method: "POST",
    headers: header,
  });
}
function deleteTask(tId) {
  return fetch(BASE_URL + "tasks/" + tId, {
    method: "DELETE",
    headers: header,
  });
}
function getProjectById(pid) {
  return fetch(BASE_URL + "projects/" + pid, {
    method: "GET",
    headers: header,
  });
}
function getTaskByProjectId(pid) {
  return fetch(BASE_URL + "tasks?project_id=" + pid, {
    method: "GET",
    headers: header,
  });
}
function getAllActiveTasks() {
  return fetch(BASE_URL + "tasks", {
    method: "GET",
    headers: header,
  });
}

function getAllProjects() {
  return fetch(BASE_URL + "projects", {
    method: "GET",
    headers: header,
  });
}

module.exports = {
  addTask,
  updateTask,
  closeTask,
  reOpenTask,
  deleteTask,
  getProjectById,
  getTaskByProjectId,
  getAllActiveTasks,
  getAllProjects,
};
