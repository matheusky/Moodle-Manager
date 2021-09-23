function stk() {
  try {
    document.getElementById('tkbt').style.display = 'none';
    const rawdata = fs.readFileSync(TOKEN_PATH, 'utf8')
    const data = JSON.parse(rawdata);
    document.getElementById('tk').innerText = data.token;
  } catch (err) {
    console.error(err)
  };

};


function loadURL(paams) {
  document.getElementById('inputURL').value = url;
};

function saveTK() {
  var inputToken = document.getElementById('inputToken').value;
  var inputURL = document.getElementById('inputURL').value;
  if (inputToken.length <= 0) {
    window.alert("Digite algo valido!");
    return
  };
  var token = {
    token: inputToken,
    url: inputURL
  };

  // Store the token to disk for later program executions
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) return window.alert(err);
    window.alert("Configuração salva!");
  });
};