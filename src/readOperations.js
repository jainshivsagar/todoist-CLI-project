const fetch = require("node-fetch");
const chalk = require("chalk");
const { config } = require("dotenv");

config(); //loading env variables to process.env object
const baseUrl = "https://api.todoist.com/rest/v1/";

const header = {
  Authorization: "Bearer " + process.env.API_TOKEN,
};

async function displayAllPojects() {
  let response = await fetch(baseUrl + "projects", {
    headers: header,
  });

  let data = await response.json();
  console.table(data);
}

async function displayAllTasks() {
  let response = await fetch(baseUrl + "tasks", {
    headers: header,
  });

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
module.exports = {
  displayAllPojects,
  displayAllTasks,
};
