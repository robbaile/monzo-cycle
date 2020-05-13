const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(cookieParser());

app.use(bodyParser.json({ limit: "50mb", extended: true }));

app.get('/', (req, res) => res.json("hello world"));

app.post('/api/email', (req, res) => res.json("Sucessful " + req.body.email));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));