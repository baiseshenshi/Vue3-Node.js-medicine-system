const express = require('express')

const router = express.Router()

// 导入数据库和sql
const db = require('./SQL/mysql.config.js')
const sql = require('./SQL/sqls.js')[0]

// 登录路由，检查用户名和密码是否正确
router.get('/', (req, res) => {
    db.query(sql, (err, results) => {
        if (err) return console.log(err.message);

        const msg = JSON.parse(JSON.stringify(results))
        const arr = []
        msg.forEach((element, index) => {
            arr[index] = element
        });

        const { username, password } = req.query
        for (let i = 0; i < arr.length; i++) {
            if (username === arr[i].aAccountar && password === arr[i].aPassword) {
                return res.send({
                    key: '666',
                    username: arr[i].aName
                })
            }
        }
        res.send("444")
    })
})

// 检验是否经过登录验证的路由，如果登录则发送对象
router.get('/inspect', (req, res) => {
    res.send({ name: 'key', value: '666' })
})

module.exports = router