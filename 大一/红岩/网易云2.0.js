
var app = new Vue({
    el: "#app",
    data: {
        list: [],
        keywords: "",
        musicId: "",
        musicUrl: "",
        rankinglist_show: false,
        musicList: [],
        phone: "",
        password: "",
        enroll_show: false,
        comments:[],
        com_show: false,
        recommend:[],
        squares:[],
        ly_show:false,
        lyrics:"",
        details:""
    },
    methods: {
        searchMusic: function () {
            var that = this;
            axios.get("http://redrock.udday.cn:2022/search?keywords=" + this.keywords)
                .then((res) => {
                    that.list = res.data.result.songs;
                })
        },
        playMusic: function (musicId) {
            var that = this;
            axios.get("http://redrock.udday.cn:2022/song/url?id=" + musicId)
                .then((res) => {
                    console.log(res.data.data[0].url);
                    that.musicUrl = res.data.data[0].url;
                })
        },
        hotsong: function () {
            var that = this;
            axios.get("http://redrock.udday.cn:2022/search/hot/detail")
                .then(function (res) {
                    that.rankinglist_show = !that.rankinglist_show;
                    that.musicList = res.data.data;
                })
        },
        getEnroll: function () {
            var that = this;
            axios.post("http://redrock.udday.cn:2022/login/cellphone?phone=" + this.phone + "&password=" + this.password)
                .then((res) => {
                    console.log(res);
                    alert('登录成功！');
                }, (err) => {
                    alert('输入错误，请重新登录！')
                })
        },
        getComment: function (musicId) {
            var that = this;
            axios.get('http://redrock.udday.cn:2022/comment/hot?id='+musicId+'&type=0')
                .then((res) => {
                    that.com_show = !that.com_show;
                    console.log(res);
                    that.comments = res.data.hotComments;
                    console.log(comments);
                })
        },
        getRecommend: function () {
            var that = this;
            axios.get("http://redrock.udday.cn:2022/personalized?limit=5")
            .then((res)=>{
                that.recommend = res.data.result;
            })
        },
        getSquare: function () {
            var that = this;
            axios.get("http://redrock.udday.cn:2022/top/playlist?limit=8")
            .then((res)=>{
                console.log(res);
                that.squares = res.data.playlists;
            })
        },
        getDetail: function(listId){
            var that = this;
            axios.get("http://redrock.udday.cn:2022/playlist/detail?id="+listId)
            .then((res)=>{
                console.log(2);
                console.log(res);
                that.detail = res.data.playlist.descrption;
                console.log(that.details);
                alert('歌单详情：'+that.details);
            })
        },
        getLyrics: function(musicId){
            var that = this;
            axios.get("http://redrock.udday.cn:2022/lyric?id="+musicId)
            .then((res)=>{
                console.log(res);
                that.ly_show = true;
                that.lyrics = res.data.lrc.lyric;
                console.log(lyrics);
            })
        }
    }
})

// //登录页面
var enroll = document.querySelector('.enroll');
var click_enroll = document.querySelector('.click_enroll').onclick = function () {
    enroll.style.display = 'block';
}
var enroll_close = document.querySelector('.enroll_close').onclick = function () {
    enroll.style.display = 'none';
}

//评论页面
var com_content = document.querySelector('.com_content');
var com_close = document.querySelector('.com_close').onclick = function () {
    com_content.style.display = 'none';
}

//歌词页面
var lyrics = document.querySelector('.lyrics');
var ly_close = document.querySelector('.ly_close').onclick = function () {
    lyrics.style.display = 'none';
}

//轮播图
var focus_ol = document.querySelector('.focus_ol');
var focus = document.querySelector('.focus');
var arrow_l = document.querySelector('.arrow_l');
var arrow_r = document.querySelector('.arrow_r');
function animate(obj, target) {
    var timer = setInterval(function () {
        if (obj.offsetLeft >= target) {
            clearInterval(timer);
        }
        obj.style.left = obj.offsetLeft - 460 + 'px';
    }, 10)
}
var num = 0;
arrow_r.addEventListener('click', function () {
    if (num == 9) {
        focus_ol.style.left = 959 + 'px';
        num = 0;
    }
    num++;
    animate(focus_ol, -460 * num);
});
// arrow_l.addEventListener('click',function() {
//     if(num == 0){
//     }
//     num--;
//     animate2(focus_ol,460*num);
// })
var auto_timer = setInterval(() => { arrow_r.click() }, 2000);

focus_ol.addEventListener('mouseenter', function () {
    arrow_l.style.display = 'block';
    arrow_r.style.display = 'block'
})
// focus_ol.addEventListner('mouseleave',function(){
//     arrow_l.style.display = 'none';
//     arrow_r.style.display = 'none';
// })

// var cover_l = document.querySelector('.cover_l');
// var cover_r = document.querySelector('.cover_r');
// for(var i = 1;i<=4;i++){
//     item[i].onclick = () =>{
//         console.log(1);
//         cover_l.style.display = 'none';
//         cover_r.style.display = 'none';
//     }

// tab栏切换
var tab_list = document.querySelector('.tab_list');
var lis = tab_list.querySelectorAll('li');
var tab_con = document.querySelector('tab_con');
var item = document.querySelectorAll('.item');
for (var i = 0; i < lis.length; i++) {
    lis[i].setAttribute('index', i);
    lis[i].onclick = function () {
        console.log(1);
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = '';
        }
        this.className = 'current';
        var index = this.getAttribute('index');
        for (var i = 0; i < item.length; i++) {
            item[i].style.display = 'none';
        }
        item[index].style.display = 'block';
    }
}