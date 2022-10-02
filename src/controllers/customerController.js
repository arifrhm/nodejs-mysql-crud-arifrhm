const controller = {};
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://arifrahman:RSCunited2021@localhost:5432/nodejs2'
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

controller.list = (req, res) => {
        client.query('SELECT * FROM customer', (err, customers) => {
            console.log(customers);
            if (err) {
                res.status(404).json({err: "No data found"});
            }
            res.json({
                data: customers?.fields || []
            });
        });
        client.end();
};

controller.save = (req, res) => {
    const data = req.body;
    console.log(req.body);
        const query = client.query('INSERT INTO customer set ?', data, (err, customer) => {
            console.log(customer);
            if (err){
                res.status(404).json(err);
            }
            res.json({
                data: customer || []
            });
        })
    console.log(query);
    client.end();
};

controller.edit = (req, res) => {
    const {id} = req.params;
        client.query("SELECT * FROM customer WHERE id = ?", [id], (err, rows) => {
            res.render('customers_edit', {
                data: rows[0]
            })
        });
    console.log(query);
    client.end();
};

controller.update = (req, res) => {
    const {id} = req.params;

        client.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
            res.redirect('/');
        });
    client.end();
};

controller.delete = (req, res) => {
    const {id} = req.params;
        client.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    client.end();
};

module.exports = controller;
