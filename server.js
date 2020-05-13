const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const request = require("request");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors());

app.use(cookieParser());

app.use(bodyParser.json({ limit: "50mb", extended: true }));

app.get('/', (req, res) => res.json("hello world"));

app.get('/login', (req, res) => {
    res.json({
        id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI_ENCODED,
        state:process.env.STATE
    });
});

app.get('/oauth/callback', (req, res) => {
    global.code = req.query.code;
    let client_id = process.env.CLIENT_ID;
    let client_secret = process.env.CLIENT_SECRET;
    let redirect_uri = process.env.REDIRECT_URI;

    request.post({
        url: 'https://api.monzo.com/oauth2/token',
        form: {
            grant_type: 'authorization_code',
            client_id,
            client_secret,
            redirect_uri,
            code
        }
    },
    (err, res, body) => {
        accessToken = JSON.parse(body);
        res.send(accessToken);
        }
    );

});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));