async function get() {
    var formData = new URLSearchParams();

    const search = document.getElementById('inputText').value;
    if (/\@/.test(search)) {
        formData.append('criteria[0][key]', 'email'); // categoria para pesquisa
    } else {
        formData.append('criteria[0][key]', 'fullname'); // categoria para pesquisa
    }

    formData.append('moodlewsrestformat', 'json');
    formData.append('wsfunction', 'core_user_get_users');
    formData.append('wstoken', '7182f13c6151097156f931d896b13706');

    formData.append('criteria[0][value]', `%${search}%`); // %raw% busca


    await axios.post('http://192.168.3.31/moodle/webservice/rest/server.php', formData)
        .then((response) => {

            for (let i = 0; i < response.data.users.length; i++) {

                document.querySelector('#userTable').insertAdjacentHTML(
                    'beforeend',
                    `<tr id=${response.data.users[i].id}>
                    <td>${response.data.users[i].fullname}</td>
                    <td>${response.data.users[i].email}</td>
                    <td><button onclick="userArchive(${response.data.users[i].id})"><i class="fa fa-archive"></i></button></td>
                    <td><button onclick="userDelete(${response.data.users[i].id})"><i class="fa fa-trash"></i></button></td>
                    </tr>`);
            };

            document.getElementById("userTable").style.display = 'table';

        }).catch((error) => {
            console.log(error);
        });


};

async function userArchive(params) {
    //core_user_update_users

    //            WIP

    console.log(params)
    var formData = new URLSearchParams();
    formData.append('moodlewsrestformat', 'json');
    formData.append('wsfunction', 'core_user_delete_users');
    formData.append('wstoken', '7182f13c6151097156f931d896b13706');
    formData.append('users[0][id]', `${params}`);
    formData.append('users[0][suspended]', 'true');

    await axios.post('http://192.168.3.31/moodle/webservice/rest/server.php', formData)
        .then((response) => {
            console.log(response.data)

        }).catch((error) => {
            console.log(error);
        });

};

async function userDelete(params) {
    //core_user_delete_users
    var confirm = window.confirm("Deseja excluir esse Usuário?");

    if (confirm == true) {
        var formData = new URLSearchParams();
        formData.append('moodlewsrestformat', 'json');
        formData.append('wsfunction', 'core_user_delete_users');
        formData.append('wstoken', '7182f13c6151097156f931d896b13706');
        formData.append('userids[0]', `${params}`);

        await axios.post('http://192.168.3.31/moodle/webservice/rest/server.php', formData)
            .then((response) => {
                if (response.statusText == "OK") {
                    window.alert(`Usuário excluido!`);
                    document.getElementById(params).remove();
                } else {
                    window.alert(response.data);
                };

            }).catch((error) => {
                console.log(error);
            });
    }
};