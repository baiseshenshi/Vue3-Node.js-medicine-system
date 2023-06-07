// 导入express
const express = require('express')
const path = require('path')
const app = express()

// 导入路由
const useLogin = require('./router/login.js')
const useDateInfo = require('./router/baseInfo.js')
const useMsgInfo = require('./router/msgInfo.js')

// 解析请求体的中间件
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//解决跨域,要在路由之前解决
const cors = require('cors')
app.use(cors())

// 路由 
app.use('/',useLogin)
app.use('/baseinfo',useDateInfo)
app.use('/msg',useMsgInfo)

app.listen(3000, () => {
    console.log("express listen on 3000");
})