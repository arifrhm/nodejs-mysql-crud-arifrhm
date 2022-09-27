const controller = {};
const client = require("../index").client;

controller.list = (req, res) => {
        client.query('SELECT * FROM customer', (err, customers) => {
            if (err) {
                res.json(err);
            }
            res.render('customers', {
                data: customers
            });
        });
};

controller.save = (req, res) => {
    const data = req.body;
    console.log(req.body);
        const query = client.query('INSERT INTO customer set ?', data, (err, customer) => {
            console.log(customer);
            res.redirect('/');
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
