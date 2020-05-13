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
        id: process.env.client_id,
        redirect_url: process.env.redirect_url
    })
})

app.post('/oauth/callback', (req, res) => {
    console.log("hit")
    request.post({
        url: 'https://api.monzo.com/oauth2/token',
        form: {
            grant_type: 'authorization_code',
            client_id: process.env.client_id,
            client_secret: process.env.client_secret,
            redirect_url: process.env.redirect_url,
            response_type: 'code'
        },
    }), (err, res, body) => {
        accessToken = JSON.parse(body);
        res.send(accessToken);
    }
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));