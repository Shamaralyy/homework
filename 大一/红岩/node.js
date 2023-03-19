const http = require('http')
const server = http.createServer()
server.on('request',function(req,res){
    console.log('visit')
})
server.listen(8080,function(){
    console.log('success!')
})