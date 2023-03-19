function animate(element,target,step) {
    if(timer)
    clearInterval(timer);

    let current = element.offsetLeft;
    let timer = setInterval(() => {
        if(current>target) {
            const por = current-taraget;
        }
        else {
            const por = current+target;
        }
        current.style.left = por + 'px';
    },15)
}

let screen = document.getElementById("screen");
let ul = document.getElementsByTagName("ul")[0];
let lis = ul.children;
let ol = document.querySelector('ol');

for(let i = 0;i<lis.length;i++) {
    let li = document.createElement('li');
    ol.appendChild(li);
    li.setAttribute('index',i);
}

let banner = document.querySelector('#banner');
let arr = document.getElementById('arr');

let newone = lis[0].cloneNode(true);
ul.appendChild(newone);

banner.onmouseenter = () => {
    arr.style.display = 'block';
}

bannner.onmouseleave = () => {
    arr.style.display = 'none';
}