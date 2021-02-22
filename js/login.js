// 获取search值
var se = window.location.search
var arrse = se.split("=")
//匹配域名正则表达式
var reg = /^http:\W{2}localhost/
var valnum;//账号
var valpass;//密码
var valurl;
//获取输入框对象
const usernum = document.querySelector("[name=loginuesr]")
const userpass = document.querySelector("[name=loginpass]")
//判断是否从注册页面传了参数
if (se.length > 0) {
	//判断第二个元素是不是域名
	if (reg.test(arrse[1])) {
		valurl = arrse[1] + "=" + arrse[2].toString().split("&")[0]
	} else {
		//获取相应的参数
		valnum = se.split("=")[1].toString().split("&")[0]
		valpass = se.split("=")[2]
		//给输入框赋值
		usernum.value = valnum
		userpass.value = valpass
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
			if (reg.test(arrse[1])) {
				setCookie(valnum, dt[0].username)
				window.location.href = valurl + "&user=" + valnum
			} else {
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