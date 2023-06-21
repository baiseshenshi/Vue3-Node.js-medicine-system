const sqls = [
    // 查询管理员的账号和密码
    'SELECT * from administrator;',
    // 查询药品
    'SELECT * from drug;',
    // 增加药品
    "insert into drug values(?,?,?,?,?,?);",
    // 删除药品
    "delete from drug where dID=?",
    // 修改数据
    'update drug set dName=?,dType=?,dFrom=?,dUsage=?,dTaboo=? where dID=?',
    // 查询药品类型
    'select * from drug where dFrom=?',
    // 登录日志
    'select * from t_loginlog order by id DESC limit 5',
    'select id from t_loginlog order by id DESC limit 1',
    'insert into t_loginlog values(?,?,?,?,?)'
]

module.exports = sqls