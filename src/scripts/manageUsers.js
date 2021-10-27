async function userList() {

    //clean search
    document.querySelector('#userTable').innerHTML = '';

    //show load
    document.getElementById("loading").style.display = "block";

    //get input value
    const search = document.getElementById('inputText').value;

    //start formdata
    var formData = new URLSearchParams();

    //select id/name/email
    var searchTYPE = document.getElementById('searchType').value;
    formData.append('criteria[0][key]', searchTYPE);

    if (searchTYPE == 'id') {
        formData.append('criteria[0][value]', search);  //id
    } else {
        formData.append('criteria[0][value]', `%${search}%`); // search name/email
    };

    formData.append('moodlewsrestformat', 'json'); //format
    formData.append('wsfunction', 'core_user_get_users'); //function api
    formData.append('wstoken', token); //token


    await axios.post(url, formData)
        .then((response) => {
            //add search input
            document.querySelector('#userTable').insertAdjacentHTML('beforeend', `
            <input type="text" id="inputSearch" onkeyup="filterSearch()" placeholder="Pesquisa...">
            `);

            //add tables headers
            document.querySelector('#userTable').insertAdjacentHTML(
                'beforeend',
                `<tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Suspenso?</th>
                <th>ação</th>
                </tr>`);

            for (let i = 0; i < response.data.users.length; i++) {

                //add icon
                if (response.data.users[i].suspended == true) {
                    var icon = '<i class="fa fa-check-circle"></i>';
                    var buttonA = `<button title="Ativar" onclick="userActive(${response.data.users[i].id})"><i class="fa fa-eye"></i></button>`;
                    var buttonB = `<button disabled title="Suspender" onclick="userArchive(${response.data.users[i].id})"><i class="fa fa-eye-slash"></i></button>`;
                } else {
                    var icon = '<i class="fa fa-times-circle"></i>';
                    var buttonA = `<button disabled title="Ativar" onclick="userActive(${response.data.users[i].id})"><i class="fa fa-eye"></i></button>`;
                    var buttonB = `<button title="Suspender" onclick="userArchive(${response.data.users[i].id})"><i class="fa fa-eye-slash"></i></button>`;
                };

                //add data in table
                document.querySelector('#userTable').insertAdjacentHTML(
                    'beforeend',
                    `<tr id=${response.data.users[i].id}>
                    <td>${response.data.users[i].fullname}</td>
                    <td>${response.data.users[i].email}</td>
                    <td>${icon}</td>
                    <td>
                    ${buttonA}
                    ${buttonB}
                    <button title="Excluir" onclick="userDelete(${response.data.users[i].id})"><i class="fa fa-trash"></i></button>
                    </td>
                    </tr>`);
            };
            
            //close load
            document.getElementById("loading").style.display = "none";

            //show table
            document.getElementById("userTable").style.display = 'table';

        })
        .catch((error) => {
            //console.log(error);
            document.getElementById("loading").style.display = "none";
            createPopup('Erro de conecxao!', `${error}`, 5000);
        });
};

async function userArchive(params) {
    var formData = new URLSearchParams();
    formData.append('moodlewsrestformat', 'json');
    formData.append('wsfunction', 'core_user_update_users');
    formData.append('wstoken', token);
    formData.append('users[0][id]', params);
    formData.append('users[0][suspended]', "1");

    await axios.post(url, formData)
        .then((response) => {
            if (response.data == null) {
                //window.alert("Usuário Suspendido!");
                createPopup('Sucesso!', 'Usuário suspendido com sucesso!', 3000);
                userList();
            } else {
                //window.alert(`${response.data.debuginfo}`);
                createPopup('Erro!', `${response.data.debuginfo}`, 3000);
            };

        }).catch((error) => {
            //console.log(error);
            document.getElementById("loading").style.display = "none";
            createPopup('Erro de conecxao!', `${error}`, 5000);
        });

};

async function userActive(params) {

    var formData = new URLSearchParams();
    formData.append('moodlewsrestformat', 'json');
    formData.append('wsfunction', 'core_user_update_users');
    formData.append('wstoken', token);
    formData.append('users[0][id]', params);
    formData.append('users[0][suspended]', "0");

    await axios.post(url, formData)
        .then((response) => {
            if (response.data == null) {
                //window.alert("Usuário Ativado!");
                createPopup('Sucesso!', 'Usuário ativado com sucesso!', 3000);
                userList();
            } else {
                //window.alert(`${response.data.debuginfo}`);
                createPopup('Erro!', `${response.data.debuginfo}`, 3000);
            };

        }).catch((error) => {
            console.log(error);
            document.getElementById("loading").style.display = "none";
            createPopup('Erro de conecxao!', `${error}`, 5000);
        });

};

async function userDelete(params) {
    var delConfirm = window.confirm("Deseja excluir esse Usuário?");

    if (delConfirm == true) {
        var formData = new URLSearchParams();
        formData.append('moodlewsrestformat', 'json');
        formData.append('wsfunction', 'core_user_delete_users');
        formData.append('wstoken', token);
        formData.append('userids[0]', params);

        await axios.post(url, formData)
            .then((response) => {
                if (response.statusText == "OK") {
                    document.getElementById(params).remove();
                    //window.alert(`Usuário excluido!`);
                    createPopup('Sucesso!', 'Usuário excluido com sucesso!', 3000);
                    userList();
                } else {
                    //window.alert(response.data.debuginfo);
                    createPopup('Erro!', `${response.data.debuginfo}`, 3000);
                };

            }).catch((error) => {
                console.log(error);
                document.getElementById("loading").style.display = "none";
                createPopup('Erro de conecxao!', `${error}`, 5000);
            });
    };
};

function filterSearch() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("inputSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("userTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
