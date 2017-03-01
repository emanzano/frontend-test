'use strict';
// External Modules Requires
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

// Local Modules Requires
const api = require('./src/routes/api');

// App configuration
let app = express();
// Port
app.set('port', (process.env.PORT || 3000));
// Statics
app.use('/public', express.static(path.join(__dirname, 'dist')));
// Favicon
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
});

app.get('/items(/:id)', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
});

app.use('/api', api);

app.use(function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.sendFile(path.join(__dirname, 'dist/error.html'));
});

app.listen(app.get('port'), function (err) {
    if (err) {
        console.log(err);
    }
    console.info('App Listening on port %s.', app.get('port'));
})