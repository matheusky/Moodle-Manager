const FormData = require('form-data');
const axios = require('axios');
const csvToJson = require('convert-csv-to-json');
const XLSX = require('xlsx');


//---console-frontend---
function setConsole(text) {
    document.getElementById("consol").value += text + ' \n';
    document.getElementById("consol").scrollTop = document.getElementById("consol").scrollHeight;
};

function clearConsole() {
    document.getElementById("consol").value = '';
}
  //---------------------