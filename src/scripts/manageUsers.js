async function userList() {
    //clean search
    document.querySelector('#userTable').innerHTML = '';

    //show load
    document.getElementById("loading").style.display = "block";

    //get input value
    const search = document.getElementById('inputText').value;

    //start formdata
    var formData = new URLSearchParams();

    //select name/email
    if (/\@/.test(search)) {
        formData.append('criteria[0][key]', 'email');
    } else {
        formData.append('criteria[0][key]', 'firstname');
    };

    formData.append('moodlewsrestformat', 'json');
    formData.append('wsfunction', 'core_user_get_users');
    formData.append('wstoken', token);
    formData.append('criteria[0][value]', `%${search}%`);


    await axios.post('http://192.168.3.31/moodle/webservice/rest/server.php', formData)
        .then((response) => {
            //close load
            document.getElementById("loading").style.display = "none";

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
                    var icon = `<i class="fa fa-check-circle"></i>`;
                } else {
                    var icon = `<i class="fa fa-times-circle"></i>`;
                };

                //add data in table
                document.querySelector('#userTable').insertAdjacentHTML(
                    'beforeend',
                    `<tr id=${response.data.users[i].id}>
                    <td>${response.data.users[i].fullname}</td>
                    <td>${response.data.users[i].email}</td>
                    <td>${icon}</td>
                    <td>
                    <button title="Ativar" onclick="userActive(${response.data.users[i].id})"><i class="fa fa-eye"></i></button>
                    <button title="Suspender" onclick="userArchive(${response.data.users[i].id})"><i class="fa fa-eye-slash"></i></button>
                    <button title="Excluir" onclick="userDelete(${response.data.users[i].id})"><i class="fa fa-trash"></i></button>
                    </td>
                    </tr>`);
            };

            //show table
            document.getElementById("userTable").style.display = 'table';

        });
};

async function userArchive(params) {
    var formData = new URLSearchParams();
    formData.append('moodlewsrestformat', 'json');
    formData.append('wsfunction', 'core_user_update_users');
    formData.append('wstoken', '7182f13c6151097156f931d896b13706');
    formData.append('users[0][id]', params);
    formData.append('users[0][suspended]', "1");

    await axios.post('http://192.168.3.31/moodle/webservice/rest/server.php', formData)
        .then((response) => {
            if (response.data == null) {
                window.alert("Usuário Suspendido!");
                userList();
            } else {
                window.alert(`${response.data.debuginfo}`);
            };

        });

};

async function userActive(params) {

    var formData = new URLSearchParams();
    formData.append('moodlewsrestformat', 'json');
    formData.append('wsfunction', 'core_user_update_users');
    formData.append('wstoken', '7182f13c6151097156f931d896b13706');
    formData.append('users[0][id]', params);
    formData.append('users[0][suspended]', "0");

    await axios.post('http://192.168.3.31/moodle/webservice/rest/server.php', formData)
        .then((response) => {
            if (response.data == null) {
                window.alert("Usuário Ativado!");
                userList();
            } else {
                window.alert(`${response.data.debuginfo}`);
            };

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

        await axios.post('http://192.168.3.31/moodle/webservice/rest/server.php', formData)
            .then((response) => {
                if (response.statusText == "OK") {
                    document.getElementById(params).remove();
                    window.alert(`Usuário excluido!`);
                    userList();
                } else {
                    window.alert(response.data.debuginfo);
                };

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