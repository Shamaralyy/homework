/**
 * layUI servers 前台交互
 * @param {Object} exports
 */
layui.define(['laytpl', 'layer', 'element', 'util', 'form', 'table'], function(exports) {
	var table = layui.table,
		form = layui.form,
		layer = layui.layer,
		$ = layui.$;

	exports('lserver', {

		/** form表单提交
		 * @param {Object} url 接口地址
		 * @param {Object} data 接口数据
		 * @param {Object} callback 返回函数
		 */
		submitForm: function(url, data, callback) {
			data.token = layui.lserver.layAdminSession("layAdmin").token;
			$.ajax({
				url: url,
				method: 'post',
				async: false,
				data: data,
				dataType: 'JSON',
				success: function(data) {
					if (data.code == 0) {
						layer.msg("更新成功", {
							icon: 1
						});
						//回调函数
						if (callback && $.isFunction(callback))
							callback(data);
					} else if(data.code == 401){
						setTimeout(function(){
							window.location.href = "../views/user/login.html"
						},1000)
					} else {
						layer.msg(data.msg, {
							icon: 2
						});
					}
				},
				error: function(data) {
					layer.msg("网络连接错误", {
						icon: 2
					});
				}
			});

		},

		/** 删除数据
		 * @param {Object} url 接口地址
		 * @param {Object} data 接口数据
		 * @param {Object} callback 返回函数
		 */
		deleteTable: function(url, data, callback) {
			data.token = layui.lserver.layAdminSession("layAdmin").token;
			if(data.loginName == layui.lserver.layAdminSession("layAdmin").account){
				layer.msg("不能删除自己", {
					icon: 2
				});
			}else{
				$.ajax({
					url: url,
					method: 'post',
					data: data,
					async: false,
					dataType: 'JSON',
					success: function(data) {
						if (data.code == 0) {
							layer.msg("删除成功", {
								icon: 1
							});
							//回调函数
							if (callback && $.isFunction(callback))
								callback(data);
						}else if(data.code == 401){
						setTimeout(function(){
							window.location.href = "../views/user/login.html"
						},1000)
					} else {
								
							if(data.msg == null || data.msg == ""){
								layer.msg("删除失败", {
									icon: 2
								});
							}else{
								layer.msg(data.msg, {
									icon: 2
								});
							}
							console.log(data.msg)
						}
					},
					error: function(data) {
						layer.msg("网络连接错误", {
							icon: 2
						});
					}
				});
						
			}
			
		},

		/** 
		 * 获取select 下拉框的值
		 * @param {Object} tid 自定义属性的值  
		 * @param {Object} url 接口地址
		 * @param {Object} data 接口数据
		 */
		getSelectList: function(tid, url, data, callback) {
			data.token = layui.lserver.layAdminSession("layAdmin").token;
			$.ajax({
				url: url,
				method: 'post',
				data: data,
				async: false,
				dataType: 'JSON',
				success: function(data) {
					if (data.code == 0 || data.code == 200 ) {
						var htmlStr = '<option value="">==请选择==</option>';
						for (var x in data.data) {
							if( data.data[x].name == undefined){
								htmlStr += '<option value = "' + data.data[x].id + '">' + data.data[x].mingcheng + '</option>'
							}else{
								htmlStr += '<option value = "' + data.data[x].id + '">' + data.data[x].name + '</option>'
							}
						}
						$("select[tid='" + tid + "']").html(htmlStr);
						form.render();
						callback(data);
					}else if(data.code == 401){
						setTimeout(function(){
							window.location.href = "../views/user/login.html"
						},1000)
					} else {
						layer.msg("获取select中的值失败", {
							icon: 2
						});
						console.log(data.msg)
					}
				},
				error: function(data) {
					layer.msg("网络连接错误", {
						icon: 2
					});
				}
			});
		},
		
		/**
		 * 根据ID获取form表单的中的值
		 * @param {Object} id 
		 * @param {Object} url
		 * @param {Object} data
		 * @param {Object} callback
		 */
		getFormInput: function(id, url, data, callback) {
			data.token = layui.lserver.layAdminSession("layAdmin").token;
			$.ajax({
				url: url,
				method: 'post',
				data: data,
				async: false,
				dataType: 'JSON',
				success: function(data) {
					if (data.code == 0) {
						form.val(id, data.data)
						callback(data);
					}else if(data.code == 401){
						setTimeout(function(){
							window.location.href = "../views/user/login.html"
						},1000)
					} else {
						layer.msg("获取form表单中的值失败", {
							icon: 2
						});
						console.log(data.msg)
					}
				},
				error: function(data) {
					layer.msg("网络连接错误", {
						icon: 2
					});
				}
			});
		},


		/**
		 * 普通请求数据
		 * @param {Object} url
		 * @param {Object} data
		 * @param {Object} callback
		 */
		getAajxData: function( url, data, callback) {
			data.token = layui.lserver.layAdminSession("layAdmin").token;
			$.ajax({
				url: url,
				method: 'post',
				data: data,
				async: false,
				dataType: 'JSON',
				success: function(data) {
					if (data.code == 0) {
						callback(data);
					}else if(data.code == 401){
						setTimeout(function(){
							window.location.href = "../views/user/login.html"
						},1000)
					} else {
						layer.msg("获取普通请求值失败", {
							icon: 2
						});
						console.log(data.msg)
					}
				},
				error: function(data) {
					layer.msg("网络连接错误", {
						icon: 2
					});
				}
			});
		},

		/**
		 * 获取url中的参数信息
		 * @param {Object} variable
		 */
		getQueryVariable: function(name) {
			   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
                var r = window.location.search.substr(1).match(reg);  //匹配目标参数
                if( r != null ) return decodeURI( r[2] ); return null;   
		},
		
		/**
		 * 判断token是否过期 过期或者不存在则
		 * @param {Object} type 默认 为 1  1--子类调用  0--父类调用
		 * 
		 */
		isTokenPastDue : function(type){
			if(type == null || type == ""){
				type = 1;
			}
			var layAdmin = sessionStorage.getItem("layAdmin")
			if(layAdmin == undefined || layAdmin == null || layAdmin == ""){//
				parent.layer.msg('登录过期，即将调转到登录', {icon:2 ,shade: 0.5,time:0});
				setTimeout(function(){
					window.location.href = "../views/user/login.html"
				},1000)
				
			}
		},
		
		layAdminSession : function(name){
			var layAdmin= JSON.parse(sessionStorage.getItem("layAdmin"))
			return layAdmin;
		}
		
	});
});
