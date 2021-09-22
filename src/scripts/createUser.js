async function creatUser() {
    clearConsole();
    const file = document.getElementById("inputFile").files[0];
    if (!file) {
        setConsole("Erro! Anexe a planilha primeiro!");
        return;
    };
    setConsole("Iniciando...");
    var extension = file.name.split('.').pop();

    if (extension == "xlsx") {
        var workbook = XLSX.readFile(file.path);
        var sheet_name_list = workbook.SheetNames;
        var planilhaJson = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        setConsole("Planilha XLSX Carregada...");
    };
    if (extension == "csv") {
        var planilhaJson = csvToJson.fieldDelimiter(',').getJsonFromCsv(file.path);
        setConsole("Planilha CSV Carregada...");
    };

    for (let i = 0; i < planilhaJson.length; i++) {
        var formData = new URLSearchParams();

        formData.append('moodlewsrestformat', 'json');
        formData.append('wsfunction', 'core_user_create_users');
        formData.append('wstoken', token);
        formData.append('users[0][username]', planilhaJson[i].email);
        formData.append('users[0][password]', planilhaJson[i].password);
        formData.append('users[0][firstname]', planilhaJson[i].firstname);
        formData.append('users[0][lastname]', planilhaJson[i].lastname);
        formData.append('users[0][email]', planilhaJson[i].email);
        formData.append('users[0][preferences][0][type]', 'auth_forcepasswordchange');
        formData.append('users[0][preferences][0][value]', '1');


        await axios.post('http://192.168.3.31/moodle/webservice/rest/server.php', formData)
        .then((response) => {
            if (response.data.debuginfo) {
                setConsole(`Erro: ${response.data.debuginfo}`);
                setConsole(`Progresso: ${i+1} de ${planilhaJson.length}`);
            } else {
                setConsole(`Usuário ${response.data[0].username} foi criado!`);
                setConsole(`Progresso: ${i+1} de ${planilhaJson.length}`);
            };
        });

    };
};