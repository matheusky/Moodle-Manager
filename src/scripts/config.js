function stk() {
  try {
    const rawdata = fs.readFileSync(TOKEN_PATH, "utf8");
    const data = JSON.parse(rawdata);
    document.getElementById("tkbt").style.display = "none";
    document.getElementById("tk").innerText = data.token;
    document.getElementById("inputURL").value = data.url;
  } catch (err) {
    //console.error(err);
    createPopup("Erro!", `${err}`, 3000);
  }
}

function saveTK() {
  var inputToken = document.getElementById("inputToken").value;
  var inputURL = document.getElementById("inputURL").value;

  if (inputToken.length <= 0 || inputURL.length <= 0) {
    createPopup("Erro!", "Preencha todos os campos!", 3000);
    return;
  }
  var token = {
    token: inputToken,
    url: inputURL,
  };
  // Store the token to disk for later program executions
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) return createPopup("Erro!", `${err}`, 3000);
    //window.alert("Configuração salva!");
    createPopup("Sucesso!", "Configuração salva!", 3000);
  });
}

async function checkC() {
  var formData = new URLSearchParams();

  formData.append("moodlewsrestformat", "json");
  formData.append("wsfunction", "core_webservice_get_site_info");
  formData.append("wstoken", token);

  document.getElementById("stats").innerText = "Aguarde...";

  await axios
    .post(url, formData)
    .then((response) => {
      document.getElementById("stats").innerText = `OK - ${response.data.sitename}`;
    })
    .catch((error) => {
      document.getElementById("stats").innerText = "Erro";
      createPopup("Erro de conecxao!", `${error}`, 5000);
    });
}
