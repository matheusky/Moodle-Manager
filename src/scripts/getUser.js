const axios = require('axios');
const FormData = require('form-data');


const formData = new FormData();

formData.append('moodlewsrestformat', 'json');
formData.append('wsfunction', 'core_user_get_users');
formData.append('wstoken', '7182f13c6151097156f931d896b13706');
formData.append('criteria[0][key]', 'email'); // categoria para pesquisa
formData.append('criteria[0][value]', '%pasta%'); // %raw% busca

axios.post('http://192.168.3.31/moodle/webservice/rest/server.php', formData, {
    headers: formData.getHeaders()
}).then((response) => {
    console.log(response.data);
}).catch((error) => {
    console.log(error);
});