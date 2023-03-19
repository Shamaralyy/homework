<script src="https://cdn.staticfile.org/axios/0.18.0/axios.min.js"></script>
<script>
           //vue
            var rankinglist_vue = new Vue({
            el:".rankinglist",
            data:{
                musicList:[response.data.searchWord]
            },
            methods: {
                getList:function(){
                    axios.get("http://redrock.udday.cn:2022/search/hot/detail")
                    .then(function(response){
                        console.log(response.data);
                    },function(err){})
                }
            }
        })

        var broadcast_vue = new Vue({
            el:"#broadcast",
            data:{
                musicUrl:response.data.url
            },
            methods: {
                getMusicUrl:function(){
                    axios.get("http://redrock.udday.cn:2022/song/url?id="+musicId)
                }
            }
        })

        var search_vue = new Vue({
            el:".search",
            data:{
                musicId:""
            },
        })
</script>