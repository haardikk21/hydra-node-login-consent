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

// Authorization uri definition
const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: 'http://localhost:3000/callback',
    scope: 'offline',
    state: 'haardik123',
});


router.get('/', (req, res) => {
    res.redirect(authorizationUri);
  });

  module.exports = router;