var querystring = require('querystring');

const User = require('./mongodb')

const http = require('http')
const url = require('url');

const server = http.createServer()


server.listen(8080, function () {
    console.log('服务器创建成功了')
})

server.on('request', async function (request, response) {

    const method = request.method;
    console.log('收到客户端的请求了，请求路径是', request.url)
    const { pathname, query } = url.parse(request.url, true);

    let users = await User.find();
    if (method == 'GET') {
        if (pathname == '/list') {
            let list = `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
            * {
            padding: 0;
            margin: 0 auto;
            list-style: none;
        }
        
        .memorandum {
            width: 300px;
            height: 400px;
            background-color: antiquewhite;
        }
        
        input {
            width: 260px;
            height: 24px;
        }
        
        .content {
            width: 300px;
            height: 340px;
            margin-top: 10px;
        }
        
        .content ul li {
            display: block;
            width: 280px;
            margin-left: 10px;
            border-bottom: 1px solid black;
        }
            </style>
        </head>
        
        <body>
        <div class="memorandum">
        <h4>备忘录</h4>
        <a href="/add" id="btn">添加</a>
        <a href="/find">查询</a>
    
        <div class="content">
                <ul>`;

            users.forEach(item => {
                list += `<li>${item.content}
                <a href="/delete?id=${item._id}">删除</a>
                <a href="/modify?id=${item._id}">修改</a>
                </li>`
            });

            list += `</ul>
                </div>
                 </div>
                 </body>
                 <script>
        const input = document.querySelector('input');
        const btn = document.querySelector('#btn');
        const ul = document.querySelector('ul');
        btn.addEventListener('click',function() {
            if(input.value == '') {
                alert('请输入内容');
                return false;
            }
        })
    </script>
    </html>`;
            response.end(list);
        }
        else if (pathname == '/add' || pathname == '/modify' || pathname == '/find') {
            let add = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
            <form method="post">
              <input type="text" name="item"/>
              <button type="submit">确定</button>
            </form>
            </body>
            </html>`

            response.end(add);
        }
        else if (pathname == '/delete') {
            await User.findOneAndDelete({ _id: query.id });
            response.writeHead(301, {
                Location: '/list'
            });
            response.end();
        }
    }
    else if (method == 'POST') {
        if (pathname == '/add') {
            let formData = '';
            request.on('data', param => {
                formData += param;
            });
            request.on('end', async () => {
                var msg = querystring.parse(formData);
                let { item } = msg;
                let user = new User({
                    content: item
                });
                await User.create(user);
            })

            response.writeHead(301, {
                Location: '/list'
            });
            response.end();
        }

        if (pathname == '/modify') {

            let formData = '';
            request.on('data', param => {
                formData += param;
            });
            request.on('end', async () => {
                var msg = querystring.parse(formData);
                let { item } = msg;
                User.findByIdAndUpdate(query.id, {
                    content: item
                }, function(err, ret) {
                    if (err) {
                        console.log('更新失败');
                    } else {
                        console.log('更新成功');
                    }
                });
            })

            response.writeHead(301, {
                Location: '/list'
            });
            response.end();
        }

        if (pathname == '/find') {

            let formData = '';
            request.on('data', param => {
                formData += param;
            });
            request.on('end', async () => {
                var msg = querystring.parse(formData);
                let { item } = msg;
                User.find({ content: item }, function (err, ret) {
                    if (err) {
                        console.log('查询失败');
                    } else {
                        console.log('查询到：', ret);
                        var found = ret;
                    }
                    let res = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <h4>查询结果：</h4>
                <ul>`
                    found.forEach(item => {
                        res += `<li>${item.content}</li>`;
                    })
                    res += `                </ul>
                </body>
                </html>`
                    response.end(res);
                });
            })
        }
    }
})