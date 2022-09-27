const express = require('express'),
    path = require('path'),
    morgan = require('morgan'),
    mysql = require('mysql2'),
    { Pool, Client } = require('pg'),
    psql = new Pool(),
    myConnection = require('express-myconnection');

const app = express();

// importing routes
const customerRoutes = require('./routes/customer');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(myConnection(psql, {
    huser: 'naohwsvalqcznu',
    host: 'ec2-54-91-223-99.compute-1.amazonaws.com',
    database: 'dfo0f3jgqtrsj9',
    password: '048b6aa8ac5b19522a239c3fd42407478e099da201be1cdc5b432a2a8c3e45d6',
    port: 5432,
}, 'single'));
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', customerRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server running on http://localhost:${app.get('port')}`);
});
