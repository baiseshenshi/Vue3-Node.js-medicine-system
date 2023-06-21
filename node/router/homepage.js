const express = require("express")
const router = express.Router()

const db = require("./SQL/mysql.config.js")
const sql = require("./SQL/sqls.js")[6]
const sqlSelectFinalId = require("./SQL/sqls.js")[7]
const sqlAdd = require("./SQL/sqls.js")[8]

router.get('/', (req, res) => {
    if (req.query) {
        db.query(sql, (err, result) => {
            if (err) {
                return res.send(err.msg)
            }
            res.send(JSON.parse(JSON.stringify(result)))
        })
    }
})

router.use('/loginlog', (req, res, next) => {
    if (req.body.loginLog) {
        const { ip, no, createtime, location } = req.body.loginLog
        db.query(sqlSelectFinalId, (err, result) => {
            if (err) {
                return res.send(err)
            }
            req.id = JSON.parse(JSON.stringify(result))[0].id + 1
            next()
        })
    }
})

router.post('/loginlog', (req, res) => {
    const id = req.id
    const { ip, no, createtime, location } = req.body.loginLog

    db.query(sqlAdd,[id,ip,no,createtime,location],(err,result)=> {
        if (err) {
           return res.send(err)
        }

        return res.send("ok")
    })
})
module.exports = router