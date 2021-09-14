const axios = require('axios');
const FormData = require('form-data');


const formData = new FormData();

formData.append('moodlewsrestformat', 'json');
formData.append('wsfunction', 'core_user_create_users');
formData.append('wstoken', '7182f13c6151097156f931d896b13706');
formData.append('users[0][username]', 'sempa@email.com');
formData.append('users[0][password]', 'Test@123');
formData.append('users[0][firstname]', 'Sempa');
formData.append('users[0][lastname]', 'Pasta');
formData.append('users[0][email]', 'sempa@email.com');
formData.append('users[0][preferences][0][type]', 'auth_forcepasswordchange');
formData.append('users[0][preferences][0][value]', '1');

axios.post('http://192.168.3.31/moodle/webservice/rest/server.php', formData, {
    headers: formData.getHeaders()
}).then((response) => {
    console.log(response.data);
}).catch((error) => {
    console.log(error);
});