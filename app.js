const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(__dirname + '/public/'));

// import DB Connector
const connector = require('./config/dbConnect');

// initializd DB connection
connector.connectDB();

// import routes file
const routes = require('./routes');

// mount routes
app.use(routes);




app.listen(process.env.PORT, console.log(`Server Running On Port ${process.env.PORT}!`))
