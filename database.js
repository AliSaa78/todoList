const mysql2 = require('mysql2');

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ali@@sql123##',
    database: 'toDolist'
});

module.exports = pool.promise();
