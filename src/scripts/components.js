const axios = require('axios');
const FormData = require('form-data');
const csvToJson = require('convert-csv-to-json');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

//---Read Token File---
const TOKEN_PATH = path.join(__dirname, "../../config/token.json");
const rawdata = fs.readFileSync(TOKEN_PATH, 'utf8')
const dataToken = JSON.parse(rawdata);
const token = dataToken.token;
//---------------------


//---console-frontend---
function setConsole(text) {
    document.getElementById("consol").value += text + ' \n';
    document.getElementById("consol").scrollTop = document.getElementById("consol").scrollHeight;
};

function clearConsole() {
    document.getElementById("consol").value = '';
};
  //---------------------