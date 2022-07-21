var apikey = '61a3fbf534abfc7f972efc0a';
var url = 'https://shoffman-7e49.restdb.io/rest/prototype';

/* --- Functions --- */
function getLocation(url,apikey){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        }
    }
}