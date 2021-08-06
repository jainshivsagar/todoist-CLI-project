const fs = require("fs");
const chalk = require("chalk");
const readlineSync = require("readline-sync");
const fetch = require("node-fetch");
const { BASE_URL } = require("../constants/constants");

async function checkApiToken() {
  if (!process.env.API_TOKEN) {
    console.warn(
      chalk.yellow(
        "Your Application is not configured. Please Provide Your API Token"
      )
    );
    const options = ["Enter API Token"];
    index = readlineSync.keyInSelect(options, "Press A Number?") + 1;

    if (index == 1) {
      const token = readlineSync.question("API TOKEN :-  ");

      const res = await fetch(BASE_URL + "tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (res.status == 200) {
        const data = `API_TOKEN="${token}"`;
        fs.writeFileSync("./.env", data);
      } else {
        console.warn(chalk.yellow("API Token Not Found."));
        console.log("You Are Exiting From Application...");
        process.exit();
      }
    } else {
      process.exit();
    }
  }
}

module.exports = {
  checkApiToken,
};
