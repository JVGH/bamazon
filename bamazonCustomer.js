const conn = require("./conn");
const inquirer = require("inquirer");

conn.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + conn.threadId + "\n");
    readProducts();
});

function readProducts() {
    console.log("Selecting all products...\n");
    conn.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        start();
    });
};

function start() {
    inquirer
        .prompt([{
            name: "productId",
            type: "input",
            message: "Which product (ID) would you like to purchase?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }, {
            name: "productQty",
            type: "input",
            message: "How many units of the product they would like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }])
        .then(function (answer) {
            conn.query(`SELECT stock_quantity FROM products WHERE item_id = ${parseInt(answer.productId)}`, function (err, res) {
                if (err) throw err;
                //console.log(res);
                if (parseInt(answer.productQty) > parseInt(res.stock_quantity)) {
                    console.log('Insufficient quantity!');
                    conn.end();
                } else {
                    conn.query(`UPDATE products SET stock_quantity = (stock_quantity - ${parseInt(answer.productQty)}) WHERE item_id = ${parseInt(answer.productId)}`,
                        function (err, res) {
                            if (err) throw err;
                            console.log("Order placed successfully!");
                            conn.query(`SELECT price FROM products WHERE item_id = ${parseInt(answer.productId)}`, function (err, res) {
                                if (err) throw err;
                                console.log("Your total is = " + (parseInt(res[0].price) * parseInt(answer.productQty)));
                                conn.end();
                            });
                        });
                };
            });
        });
};