const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

//body parser to act as middleware and help intake data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//directs routing
const routes = require('./routes/routes.js')(app, fs);

//specifies server
const server = app.listen(3000, () => {
    console.log('listening on port %s...', server.address().port);
});




