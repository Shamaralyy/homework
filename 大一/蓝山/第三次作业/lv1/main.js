const ul = document.querySelector('ul');
const input = document.querySelector('input');
const add = document.querySelector('.add');

let item = document.querySelector('.item');


add.onclick = function () {
    if (input.value == '') {
        alert('请输入内容！');
        return false;
    }
    else {
        let newLi = document.createElement('li');
        newLi.className = "item";
        newLi.innerHTML = `
    <input type="checkbox"/>
    <span>${input.value}</span>
    <a href="#"" class="remove">×</a>`
        ul.appendChild(newLi);
        let remove = document.querySelectorAll('.remove');
        for (let i = 0; i < remove.length; i++) {
            remove[i].addEventListener('click', function () {
                ul.removeChild(this.parentNode);
            })
        }
    }
}


