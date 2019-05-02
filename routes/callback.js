var express = require('express');
var url = require('url');
var simpleOauthModule = require('simple-oauth2');

var router = express.Router();

const oauth2 = simpleOauthModule.create({
    client: {
        id: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET,
    },
    auth: {
        tokenHost: 'http://localhost:4444',
        tokenPath: '/oauth2/token',
        authorizePath: '/oauth2/auth',
    },
});

router.get('/', async function (req, res, next) {
    var query = url.parse(req.url, true).query;
    var code = query.code;
    const options = {
        code,
        redirect_uri: "http://localhost:3000/callback",
    };

    try {
        const result = await oauth2.authorizationCode.getToken(options);

        console.log('The resulting token: ', result);

        const token = oauth2.accessToken.create(result);

        return res.status(200).json(token)
    } catch(error) {
        console.error('Access Token Error', error.message);
        return res.status(500).json('Authentication failed');
    }

});

module.exports = router;