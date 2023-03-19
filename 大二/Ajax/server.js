const express = require('express');
const app = express();
app.get('/server', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(() => {
        res.send('Hello Ajax!')
    }, 3000);
})
app.post('/server', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send('hello POST!!!');
})
app.all('/json-server', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const data = {
        name: 'atguigu111'
    };
    let str = JSON.stringify(data);
    res.send(str);
})
app.listen(8000, () => {
    console.log('服务端已经启动');
})