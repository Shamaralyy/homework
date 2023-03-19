const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
// 创建serve服务
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 开放静态资源
app.use('/public/', express.static('./public/'))
// 服务端模板引擎
app.engine('html', require('express-art-template'))

app.use(router)

// 监听端口
app.listen(3000, () => {
    console.log('serve is running on 3000 port')
})
