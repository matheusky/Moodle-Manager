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

function saveTK() {
  var inputData = document.getElementById('inputText').value;
  if (inputData.length <= 0) {
    window.alert("Digite algo valido!");
    return
  };
  var token = {
    token: inputData
  };

  // Store the token to disk for later program executions
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) return window.alert(err);
    window.alert("Token salvo!");
  });
};