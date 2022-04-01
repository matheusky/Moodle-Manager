const axios = require('axios');
const FormData = require('form-data');
const csvToJson = require('convert-csv-to-json');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();


// create folder "Moodle-Manager" for save token if not exists
if (!fs.existsSync(path.join(homedir, 'Moodle-Manager'))) {
    fs.mkdirSync(path.join(homedir, 'Moodle-Manager'));
    fs.mkdirSync(path.join(homedir, 'Moodle-Manager', 'config'));
}

// Read config File
const TOKEN_PATH = path.join(homedir, 'Moodle-Manager', 'config', 'token.json');
const rawdata = fs.readFileSync(TOKEN_PATH, 'utf8')
const configData = JSON.parse(rawdata);
const token = configData.token;
const url = configData.url;

// console-frontend
function setConsole(text) {
    document.getElementById("consol").value += text + ' \n';
    document.getElementById("consol").scrollTop = document.getElementById("consol").scrollHeight;
};

function clearConsole() {
    document.getElementById("consol").value = '';
};

// create a css popup
function createPopup(title, text, time) {
    let popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = '<h2>' + title + '</h2>' + '<p>' + text + '</p>';
    document.body.appendChild(popup);
    setTimeout(function () {
        popup.remove();
    }, time);
};