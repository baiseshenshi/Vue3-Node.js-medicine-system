const express = require('express')
const router = express.Router()
const db = require('./SQL/mysql.config.js')

// 发送渲染表格的数据的sql
const sql = require('./SQL/sqls')[1]
// 增加数据的sql
const sqlInsert = require('./SQL/sqls.js')[2]
// 删除数据的sql
const sqlDelete = require('./SQL/sqls.js')[3]
// 修改数据的sql
const sqlUpdate = require('./SQL/sqls.js')[4]
// 查询药品类型的sql
const sqlTyping = require('./SQL/sqls.js')[5]

// 获取数据的路由
router.get('/', (req, res) => {
   db.query(sql, (err, result) => {
      if (err) {
         console.log(err.msg);
         return res.send(err.msg);
      }

      const msg = JSON.parse(JSON.stringify(result))
      res.send({
         msg,
         totalItems: Math.ceil(msg.length / 4)
      })
   })
})

// 增加数据的路由
router.put('/insert', (req, res) => {
   if (req.body.medi) {
      const { dID, dName = " ", dType = " ", dFrom = " ", dUsage = " ", dTaboo = " " } = req.body.medi

      db.query(sqlInsert, [dID, dName, dType, dFrom, dUsage, dTaboo],
         (err, results) => {
            if (err) {
               return res.send(err)
            }
            res.send('ok')
         })
   }
})

// 删除数据的路由
router.delete("/delete", (req, res) => {
   if (req.body) {
      const dID = req.body.item.dID

      db.query(sqlDelete, dID, (err, results) => {
         if (err) {
            return res.send(err)
         }
      })
      res.send('ok')
   }
})

// 修改数据的方法
router.post("/update", (req, res) => {
   if (req.body.medi) {
      const { dID, dName = "1", dType = "1", dFrom = "1", dUsage = "1", dTaboo = "1" }
         = req.body.medi

      db.query(sqlUpdate, [dName, dType, dFrom, dUsage, dTaboo, dID],
         (err, result) => {
            if (err) {
               res.send(err.message)
            }
            else {
               res.send('okddd')
            }
         })
   }
})

// 查询药品的类型的路由
router.get('/typing', (req, res) => {
   if (req) {
       const type = req.query.type
       db.query(sqlTyping,type,(err,result) => {
           if (err) {
               return res.send(err.message)
           }
           res.send(
               {
                   msg: result,
                   totalItems: Math.ceil(result.length/4)
               }
           )
       }) 
   }
})

module.exports = router