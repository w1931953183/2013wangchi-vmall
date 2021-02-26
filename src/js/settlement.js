//获取search值
var se = window.location.search
//获取账号
var usernum = se.split("=")[1].split("&")[0]
//获取传入的结算数组
var arrShops = se.split("=")[2]
//判断是否登录
if (se) {
    if(usernum != "undefined"){
		//获取cookie值
		var cook = getCookie(usernum)
		//获取注册登录文本盒子
		var text1 = document.querySelector(".nav-right").firstElementChild.children[0]
		//渲染内容
		text1.innerHTML = `<li><a href="javascript:;" style="color:#333">欢迎&nbsp;${cook}</a></li>`
	}
} else {
    //跳转到登录页并传递网址
    window.location.href = "./login.html" + window.location.href
}

//跳转至首页
//获取顶部左侧导航栏对象
const navLeft = document.querySelector(".nav-left")
//获取首页对象
const navLeftIndex = navLeft.querySelector("li")
//添加点击事件
navLeftIndex.addEventListener("click", function () {
    window.location.href = "./index.html?user=" + usernum
})
//获取localstorage
var usernumList = localStorage.getItem(usernum)
usernumList = JSON.parse(usernumList)
//页面渲染
var usernumListJs = localStorage.getItem(usernum+"js")
//转为数组
usernumListJs = JSON.parse(usernumListJs)
//判断usernumListJs是否为空
if(usernumListJs.length <= 0){
	//跳转到购物车页
	window.location.href = "./shopcart.html?user="+usernum
}
//渲染数据
$(".suborder-box").html(jiesuanRendere(usernumListJs))
//渲染信息
//总金额
let sum = 0
$(".suborder-left").find("ul").find("li").each(function(i) {
	sum += parseFloat($($(".suborder-left").find("ul").find("li")[i]).find("span").html())
})
//渲染
$(".jine").html("￥" + sum.toFixed(2))
$(".jifen").html(sum)
//给结算页面添加点击事件
$(".suborder").click(function(e) {
	var target = e.target
	if (target.innerHTML == "点此提交") {
		//显示地址输入框
		$(".address-box").css("display", "block")
	}
})
//新增收货地址
$(".newadd").click(function() {
	//显示地址输入框
	$(".address-box").css("display", "block")
})
let $people;
let $phonenum;
let $address;
//收货人输入失去焦点事件
$("[name='people']").on("blur", function() {
	//获取输入框的value值
	$people = $("[name='people']").val()
})
//手机号码输入失去焦点事件
$("[name='phonenum']").on("blur", function() {
	//手机号码验证正则表达式
	let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
	if (reg.test($("[name='phonenum']").val())) {
		//获取手机号码
		$phonenum = $("[name='phonenum']").val()
	} else {
		alert("手机号输入有误")
		//输入框聚焦
		// $("[name='phonenum']")[0].focus()
	}
})
//详细地址输入框失去焦点事件
$("[name='adds']").on("blur", function() {
	let dizhi = ''
	//获取地址
	$("#province").find("select").each(function(i) {
		dizhi += $("#province").find("select")[i].value + '-'
	})
	$address = dizhi + $("[name='adds']").val()
})
//添加地址点击事件事件委托
$(".address").click(function(e) {
	var target = e.target
	//点击取消
	if (target.innerHTML == "取消") {
		//隐藏添加地址输入框
		$(".address-box").css("display", "none")
	}
	//点击X
	if (target.innerHTML == "X") {
		//隐藏添加地址输入框
		$(".address-box").css("display", "none")
	}
	//点击保存并使用
	if (target.innerHTML == "保存并使用") {
		//判断是否全部输入成功
		if ($people && $phonenum && $address) {
			//隐藏添加地址输入框
			$(".address-box").css("display", "none")
			//将地址渲染
			$(".newadd").html($people + "," + $phonenum + "," + $address).css({
				"height": "40px",
				"line-height": "40px",
				"width": "600px",
				"border": "none",
				"text-align": "left"
			})
			//隐藏提示没有地址框
			$(".notaddress").css("display", "none")
		} else {
			alert("输入有误!!!")
		}
	}
})
//点击提交订单事件
$(".submitorder").click(function() {
	//判断是否地址已经提交
	if ($(".newadd").html().length > 7) {
		//渲染头部信息
		$(".cart-left").find("div").find("h3").html("提交成功")
		$(".cart-right").find("div").css("background", "url(../images/goumaijindu.svg) -40px -125px no-repeat")
		//提交后显示页面内容
		$(".suborder-box").html(
			`
				<div class="cartlist-kong">
					<h3>提交成功！</h3>
					<h2><a href="./index.html?user=${usernum}">去逛逛</a></h2>
				</div>
			`
		)
		//删除已经购买商品信息
		//遍历
		for (let i = 0; i < usernumListJs.length; i++) {
			usernumList = usernumList.filter(itme => {
				return (itme.id != usernumListJs[i].id && itme.options != usernumListJs[i].options)
			})
		}
		//重新设置localstorage
		localStorage.setItem(usernum, JSON.stringify(usernumList))
		localStorage.setItem(usernum+"js","[]")
	} else {
		alert("您还没有收货地址，点击确定填写")
		//显示地址输入框
		$(".address-box").css("display", "block")
	}
})

//登录注册
logZhu()