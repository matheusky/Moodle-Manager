const axios = require('axios');

var server = 'http://192.168.3.31/moodle/webservice/rest/server.php';
var token = '6372d800049e29d142710fdb4be08b58';
var functionname = 'core_webservice_get_site_info';
var format = 'json';

axios.post(server, null, {
    params: {
        wstoken: token,
        moodlewsrestformat: format,
        wsfunction: functionname
    }
}).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.log(error);
});