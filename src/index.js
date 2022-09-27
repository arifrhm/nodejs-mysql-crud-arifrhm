const express = require('express'),
    path = require('path'),
    morgan = require('morgan');

const app = express();

// importing routes
const customerRoutes = require('./routes/customer');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));

const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://naohwsvalqcznu:048b6aa8ac5b19522a239c3fd42407478e099da201be1cdc5b432a2a8c3e45d6@ec2-54-91-223-99.compute-1.amazonaws.com:5432/dfo0f3jgqtrsj9',
  ssl: {
    rejectUnauthorized: false
  }
});
console.log(client);
client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
// routes
app.use('/', customerRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server running on http://localhost:${app.get('port')}`);
});

module.exports = client;