DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name NVARCHAR(500) NOT NULL,
    department_name NVARCHAR(500) NOT NULL,
    price DECIMAL(19 , 6 ) NOT NULL,
    stock_quantity INT NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('item1','dept1',10.0,10), ('item2','dept1',10.0,10), ('item3','dept2',20.0,10), ('item4','dept2',20.0,10), ('item5','dept3',30.0,10),
 ('item6','dept3',30.0,10), ('item7','dept4',40.0,10), ('item8','dept4',40.0,10), ('item9','dept5',50.0,10), ('item10','dept5',50.0,10);
 
SELECT *
FROM   products;