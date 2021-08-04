const yargs = require("yargs");

yargs.command("add", "Adds Two Numbers", {
  firstNumber: {
    description: "Take First Number",
    alias: "fn",
    type: "number",
  },
  secondNumber: {
    description: "Take First Number",
    alias: "sn",
    type: "number",
  },
});

module.exports = {
  argsV: yargs.demandCommand(2).argv,
};
