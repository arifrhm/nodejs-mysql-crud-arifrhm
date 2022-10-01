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
            if (err) {
                res.status(404).json(err);
            }
            res.json({
                data: customers?.fields || []
            });
        });
};

controller.save = (req, res) => {
    const data = req.body;
    console.log(req.body);
        const query = client.query('INSERT INTO customer set ?', data, (err, customer) => {
            console.log(customer);
            res.json(req.body);
        })
};

controller.edit = (req, res) => {
    const {id} = req.params;
        client.query("SELECT * FROM customer WHERE id = ?", [id], (err, rows) => {
            res.render('customers_edit', {
                data: rows[0]
            })
        });
};

controller.update = (req, res) => {
    const {id} = req.params;

        client.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
            res.redirect('/');
        });
};

controller.delete = (req, res) => {
    const {id} = req.params;
        client.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
};

module.exports = controller;
