const yargs = require("yargs/yargs");
const { addEntry, getTotal, getParsedJSON } = require("./sheetUtils");

const argv = yargs(process.argv.slice(2))
  .alias("a", "add-amount")
  .describe("a", "Add new expense to the table")
  .alias("-c", "-category")
  .describe("c", "Type of expense")
  .command("overview", "Get list of expenses:", () => {
    console.log(getParsedJSON());
  })
  .command("total", "Get total amount", () => {
    console.log("Your total is: " + getTotal());
  }).argv;

if (argv.a && argv.c) {
  addEntry([argv.c, argv.a]);
  console.log("Added expense: ", argv.c, argv.a);
}
