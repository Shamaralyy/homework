let that;
class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        this.fsection = this.main.querySelector('.tabcon');
        this.init();
    }

    // 初始化
    init() {
        that.updateNode();
        this.add.onclick = this.addTab;
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }

    // 重新获取node节点
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon');
        this.spans = this.main.querySelectorAll('.firstnav li span');
    }

    // 1.切换功能
    toggleTab() {
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'contactive';
        console.log('切换');
    }

    // 清除所有li和section的类名
    clearClass() {
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }

    // 2.添加功能
    addTab() {
        that.clearClass();
        const li = `<li class="liactive"><span>测试2</span><svg t="1662086591406" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1629" width="200" height="200"><path d="M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248 512-512 512z m0-572.330667L300.629333 240.213333a42.538667 42.538667 0 0 0-60.16 0.213334 42.410667 42.410667 0 0 0-0.213333 60.16L451.669333 512 240.213333 723.370667a42.538667 42.538667 0 0 0 0.213334 60.16 42.410667 42.410667 0 0 0 60.16 0.213333L512 572.330667l211.370667 211.413333a42.538667 42.538667 0 0 0 60.16-0.213333 42.410667 42.410667 0 0 0 0.213333-60.16L572.330667 512l211.413333-211.370667a42.538667 42.538667 0 0 0-0.213333-60.16 42.410667 42.410667 0 0 0-60.16-0.213333L512 451.669333z" fill="#3D3D3D" p-id="1630"></path></svg></li>`;
        that.ul.insertAdjacentHTML('beforeend', li);
        const section = `<section class="contactive">测试2</section>`;
        that.fsection.insertAdjacentHTML('beforeend', section);
        that.init();
    }

    // 3.删除功能
    removeTab(e) {
        e.stopPropagation(); // 阻止冒泡 防止触发li的点击事件
        let index = this.parentNode.index;
        console.log(index);
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        // 删除前面的li时，选定状态不变
        if (document.querySelector('.liactive')) return;
        // 删除li后，让前一个li处于选定状态
        index--;
        that.lis[index] && that.lis[index].click(); // 前面为真，执行后面的   前面为假，不执行后面的
    }

    // 4.修改功能
    editTab() {
        // 双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // 编辑
        const str = this.innerHTML;
        this.innerHTML = `<input type="text" />`;
        const input = this.children[0];
        input.value = str;
        input.select(); // 文本框文字处于选定状态
        // 离开文本框
        input.onblur = function() {
            this.parentNode.innerHTML = this.value;
        }
        input.onkeyup = function(e) {
            if(e.keyCode === 13) {
                this.blur();
            }
        }
    }
}

new Tab('#tab');