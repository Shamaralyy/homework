const http = require('http')
const server = http.createServer((req,res) => {
    res.writeHead(200,{'Content-type':'html/text;charset=UTF-8'})
    res.end("Hello Node!")
});
server.listen(8080,'127.0.0.1');

const qs = require('querystring')

const data = {};//需要提交的数据
const content = qs.stringify(data);

const options = {
    hostname: '127.0.0.1',
    port: 8080,
    method: 'GET'
}

const req = http.request(options,(res) => {
    console.log(`状态码：${res.statusCode}`);
    console.log(`响应头：${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data',(chunk) => {
        console.log(`响应主体：${chunk}`);
    });
    res.on('end',() => {
        console.log("响应中已无数据");
    });
});

req.on('error',(e) => {
    console.log(`请求遇到问题${e.message}`);
})

req.end();