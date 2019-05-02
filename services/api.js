var fetch = require('node-fetch')
var uj = require('url-join')

var headers = {
    "X-API-TOKEN": "ABC",
    "Accept": "application/json",
    "Content-Type": "application/json",
}

function getLogin(challenge) {
    return fetch(uj("http://localhost:5002", "/v2/oauth/login?login_challenge=", challenge),
            {
                method: 'GET',
                headers: headers,
            })
        .then(function (res) {
            return res.json();
        });
}

function postLogin(challenge, remember) {
    var body = {
        coordinates: "46.65,58.41",
	    email: "test@test.com",
        password: "password",
        challenge: challenge,
        remember: remember.toString()
    }
    return fetch(
        uj("http://localhost:5002", "/v2/oauth/login"),
        {
            method: "POST",
            body: JSON.stringify(body),
            headers: headers,
        })
        .then(function (res) {
            if (res.status != 200) {
                return "error";
            }
            return res.json();
        });
}

var api = {
    getLogin: function(challenge) {
        return getLogin(challenge)
    },
    postLogin: function(challenge, remember) {
        return postLogin(challenge, remember)
    }
}
module.exports = api;