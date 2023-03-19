function promiseAjax(methods,url,data) {
    return new Promise((resolve,reject) => {
        let xhr = new XMLHttpRequest();

        let data;
        data = data || null;
        let methods;
        methods = methods || 'get';

        xhr.open(methods, url, true);
        xhr.onreadyStatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    resolve(JSON.parse(xhr.responseText))
                }else {
                    reject(xhr.responseText)
                }
            }
        }
        xhr.send(data)
    })
}
promiseAjax('get',url,null).then( (data) => {
    console.log(data);
})

function htmlEscape(htmlstr) {
    return htmlstr.replace(/<|>|"|&/g,(match) => {
        switch (match) {
            case '<': return '&lt;'
            case '>': return '&gt;'
            case '"': return '&quot;'
            case '&': return '&amp;'
        }
    })
}

function htmlUnEscape(str) {
    return str.replace(/&lt;|&dt;|&quot;|&amp;/g,(match) => {
        switch(match) {
            case '&lt;': return '<'
            case '&gt;': return '>'
            case '&quot;': return '"'
            case '&amp;': return '&'
        }
    })
}

module.exports = {
    promiseAjax,
    htmlEscape,
    htmlUnEscape
}