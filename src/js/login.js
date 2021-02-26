// 获取search值
var se = window.location.search
var arrse = se.split("=")
//匹配域名正则表达式
var reg = /^http:\W{2}localhost/
var valnum;//账号
var valpass;//密码
var valurl;// 传入的域名
var valid ;// 传入的域名携带的参数
//获取输入框对象
const usernum = document.querySelector("[name=loginuesr]")
const userpass = document.querySelector("[name=loginpass]")
//判断是否从注册页面传了参数
if (se.length > 0) {
	//判断是否传入的参数有账号密码
	if(se.indexOf("valnum") >= 0 && se.indexOf("valpass") >= 0){
		//遍历
		for(let i = 0;i < arrse.length ;i++){
			// console.log(arrse[i])
			if(arrse[i].indexOf("valnum") >= 0){
				valnum = arrse[i+1].split("&")[0]
				//给输入框赋值
				usernum.value = valnum
			}else if(arrse[i].indexOf("valpass") >= 0){
				//判断是否有 & 这个符号
				if(arrse[i+1].indexOf("&") >= 0){
					valpass = arrse[i+1].split("&")[0]
					//给输入框赋值
					userpass.value = valpass
				}else{
					valpass = arrse[i+1]
					//给输入框赋值
					userpass.value = valpass
				}
			}
		}
	}
	//遍历
	for(let i = 0;i < arrse.length;i++){
		//判断是否传入域名
		if(reg.test(arrse[i])){
			valurl = arrse[i].split("?")[0]
		}
	}
	//判断是否传入 域名并且域名是否携带了参数 
	if(se.split("?").length > 2){
		//判断携带参数是否为 id
		if(se.split("?")[se.split("?").length - 1].indexOf("id") >= 0){
			valid = se.split("?")[se.split("?").length - 1].split("&")[0]
		}
	}
} else {
	//获取输入框的值
	valnum = usernum.value
	valpass = userpass.value
}
//获取登录按钮
const sublogin = document.querySelector("[name=sublogin]")
btnCss()
usernum.addEventListener('input', btnCss)
userpass.addEventListener('input', btnCss)
//添加点击事件
sublogin.addEventListener('click', function () {
	(async function () {
		var dt = await promiseAjax({
			url: "../php/login.php",
			data: `val1=${valnum}&val2=${valpass}`,
			datatype: "json",
			type: "post"
		})
		// console.log(dt[0].username)
		//判段是否为1
		if (dt.length > 0) {
			if (valid) {
				setCookie(valnum, dt[0].username)
				window.location.href = valurl + "?" + valid + "&user=" + valnum
			} else if(valurl){
				setCookie(valnum, dt[0].username)
				window.location.href = valurl + "?user=" + valnum
			}else{
				//添加cookie
				setCookie(valnum, dt[0].username)
				alert("登录成功，点击跳转到首页")
				//跳转至首页
				window.location.href = "./index.html?val=" + valnum
			}
		} else {
			alert("登录失败请检查您的账号密码")
			return false
		}
	})()
})
//查看密码
const have = document.querySelector(".login-have")
const nothave = document.querySelector(".login-not")
//添加点击事件
have.addEventListener('click', function () {
	this.style.display = "none"
	nothave.style.display = "inline-block"
	userpass.setAttribute("type", "text")
})
nothave.addEventListener('click', function () {
	this.style.display = "none"
	have.style.display = "inline-block"
	userpass.setAttribute("type", "password")
})

function btnCss() {
	valnum = usernum.value
	valpass = userpass.value
	//输入框不为空则改变登录按钮样式
	if (valnum.length > 1 && valpass.length > 1) {
		//改变登录按钮的背景颜色
		sublogin.style.backgroundColor = "#CA141D"
		sublogin.style.cursor = "pointer"
	} else {
		//改变登录按钮的背景颜色
		sublogin.style.backgroundColor = "#FF989C"
		sublogin.style.cursor = "not-allowed"
	}
}