const mysql = require('mysql')
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'pms'
})

module.exports=db