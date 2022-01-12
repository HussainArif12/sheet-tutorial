const xlsx = require("xlsx");
const path = require("path");

const fileLocation = path.join(__dirname, "Expenses.xlsx");

const fileContents = xlsx.readFile(fileLocation);
const firstSheet = fileContents.SheetNames[0];
const sheetValues = fileContents.Sheets[firstSheet];
const parsedJSON = xlsx.utils.sheet_to_json(sheetValues);

function getParsedJSON() {
  return parsedJSON;
}

function addEntry(text) {
  xlsx.utils.sheet_add_aoa(sheetValues, [text], { origin: -1 });
  xlsx.writeFile(fileContents, fileLocation);
}

function getTotal() {
  const allData = getParsedJSON();
  const totalResult = allData
    .map((item) => item.Amount)
    .reduce((acc, a) => acc + a, 0);
  return totalResult;
}

module.exports = { getParsedJSON, addEntry, getTotal };
