const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_js_complete',
    password: 'wafula1998'
})

module.exports = pool.promise();