// const http = require('http')
// const server = http.createServer((req,res) => {
//     res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'})
//     res.end("Hello World!")
// });

// server.listen(8080,'127.0.0.1');

var express = require("express");
var app = express();

app.get('/',function(req,res) {
    res.send("hello!")
});

app.listen(8080,function() {
    console.log("服务器启动了")
})