//获取seach值
var se = window.location.search
//判断是否有值，有则说明已经登录
if (se.length > 0) {
	var usernum = se.split("=")[1]
	//获取cookie值
	var cook = getCookie(usernum)
	//获取注册登录文本盒子
	var text1 = document.querySelector(".nav-right").firstElementChild.children[0]
	var text2 = document.querySelector(".left-nav2-left-login")
	//渲染内容
	text1.innerHTML = `<li><a href="javascript:;" style="color:#fff">欢迎&nbsp;${cook}</a></li>`
	text2.innerHTML = `<h5><a href="./login.html">欢迎&nbsp;${cook}</a></h5>`
}

//获取数据库数据进行渲染
(async function () {
	var dt = await promiseAjax({
		url: '../php/index3.php',
		datatype: 'json'
	})
	//进行数据渲染
	//获取热销单品对象
	var hotItem = document.querySelector('.hotItem')
	//获取热销单品容器对象
	var hotItmeRight = hotItem.querySelector('.hotItme-right')
	//热销单品渲染
	hotItmeRight.firstElementChild.innerHTML = indexRenderer(dt[0])

	//获取手机对象
	var phone = document.querySelector(".phone")
	//获取查看更多跳转对象、
	var phoneDuo = phone.querySelector("h3").firstElementChild
	phoneDuo.addEventListener('click', function () {
		window.location.href = "./list.html?id=1001&user=" + usernum
	})
	//获取手机容器对象
	var phoneRight = phone.querySelector(".phone-right")
	//将拼接好的内容渲染
	phoneRight.firstElementChild.innerHTML = indexRenderer(dt[1])

	//获取智能穿戴与运动健康对象
	var wear = document.querySelector(".wear")
	//获取查看更多跳转对象、
	var wearDuo = wear.querySelector("h3").firstElementChild
	wearDuo.addEventListener('click', function () {
		window.location.href = "./list.html?id=1002&user=" + usernum
	})
	//获取智能穿戴与运动健康容器对象
	var wearRight = wear.querySelector(".wear-right")
	//获取儿童手表容器对象
	var wearBottomBox = wear.querySelector('.wear-bottom-box')
	//进行渲染
	let wearStr = '<li><a href=""><img src="../images/zhineng.jpg"></a></li>'
	//将拼接好的内容渲染
	wearRight.firstElementChild.innerHTML = wearStr + indexRenderer(dt[2])
	//儿童手表切换
	let wearBottomBoxStr = ''
	dt[11].forEach(itme => {
		wearBottomBoxStr += `
			<li><a href="./details.html?id=${itme.id}&user=${usernum}" target="_blank">
				<div>
					<img src="${itme.imglink}">
					<h3>${itme.descr}</h3>
				</div>
				<h4>${itme.title}</h4>
				<p>￥<span>${itme.price}</span></p>
			</a></li>
		`
	})
	wearBottomBox.firstElementChild.innerHTML = wearBottomBoxStr

	//获取耳机音箱眼镜对象
	var goods = document.querySelector(".goods")
	//获取查看更多跳转对象、
	var goodsDuo = goods.querySelector("h3").firstElementChild
	goodsDuo.addEventListener('click', function () {
		window.location.href = "./list.html?id=1004&user=" + usernum
	})
	//获取耳机音箱眼镜容器对象
	var goodsRight = goods.querySelector(".goods-right")
	//进行渲染
	let goodsStr = '<li><a href=""><img src="../images/erji.png"></a></li>'
	//将拼接好的内容渲染
	goodsRight.firstElementChild.innerHTML = goodsStr + indexRenderer(dt[4])

	//获取智慧屏对象
	var zhihuip = document.querySelector(".zhihuip")
	//获取查看更多跳转对象、
	var zhihuipDuo = zhihuip.querySelector("h3").firstElementChild
	zhihuipDuo.addEventListener('click', function () {
		window.location.href = "./list.html?id=1007&user=" + usernum
	})
	//获取智慧屏容器对象
	var zhihuipRight = zhihuip.querySelector(".zhihuip-right")
	//进行渲染
	let zhihuipStr = '<li><a href=""><img src="../images/erji.png"></a></li>'
	//将拼接好的内容渲染
	zhihuipRight.firstElementChild.innerHTML = zhihuipStr + indexRenderer(dt[4])

	//获取笔记本电脑对象
	var book = document.querySelector(".book")
	//获取查看更多跳转对象、
	var bookDuo = book.querySelector("h3").firstElementChild
	bookDuo.addEventListener('click', function () {
		window.location.href = "./list.html?id=1003&user=" + usernum
	})
	//获取笔记本电脑容器对象
	var bookRight = book.querySelector(".book-right")
	//进行渲染
	let bookStr = '<li><a href=""><img src="../images/book.png"></a></li>'
	//将拼接好的内容渲染
	bookRight.firstElementChild.innerHTML = bookStr + indexRenderer(dt[3])

	//获取精品平板对象
	var flat = document.querySelector(".flat")
	//获取查看更多跳转对象、
	var flatDuo = flat.querySelector("h3").firstElementChild
	flatDuo.addEventListener('click', function () {
		window.location.href = "./list.html?id=1008&user=" + usernum
	})
	//获取精品平板容器对象
	var flatRight = flat.querySelector(".flat-right")
	//进行渲染
	let flatStr = '<li><a href=""><img src="../images/pingban.jpg"></a></li>'
	//将拼接好的内容渲染
	flatRight.firstElementChild.innerHTML = flatStr + indexRenderer(dt[8])

	//获取智能路由对象
	var route = document.querySelector(".route")
	//获取查看更多跳转对象、
	var routeDuo = route.querySelector("h3").firstElementChild
	routeDuo.addEventListener('click', function () {
		window.location.href = "./list.html?id=1005&user=" + usernum
	})
	//获取智能路由容器对象
	var routeRight = route.querySelector(".route-right")
	//进行渲染
	let routeStr = '<li><a href=""><img src="../images/luyouqi.png"></a></li>'
	//将拼接好的内容渲染
	routeRight.firstElementChild.innerHTML = routeStr + indexRenderer(dt[5])

	//获取通用配件对象
	var parts = document.querySelector(".parts")
	//获取查看更多跳转对象、
	var partsDuo = parts.querySelector("h3").firstElementChild
	partsDuo.addEventListener('click', function () {
		window.location.href = "./list.html?id=1007&user=" + usernum
	})
	//获取通用配件容器对象
	var partsRight = parts.querySelector(".parts-right")
	//进行渲染
	let partsStr = '<li><a href=""><img src="../images/peijian.png"></a></li>'
	//将拼接好的内容渲染
	partsRight.firstElementChild.innerHTML = partsStr + indexRenderer(dt[7])

	//获取生态精品对象
	var ecology = document.querySelector(".ecology")
	//获取查看更多跳转对象、
	var ecologyDuo = ecology.querySelector("h3").firstElementChild
	ecologyDuo.addEventListener('click', function () {
		window.location.href = "./list.html?id=1009&user=" + usernum
	})
	//获取生态精品容器对象
	var ecologyRight = ecology.querySelector(".ecology-right")
	//进行渲染
	let ecologyStr = '<li><a href=""><img src="../images/shenghuo.jpg"></a></li>'
	//将拼接好的内容渲染
	ecologyRight.firstElementChild.innerHTML = ecologyStr + indexRenderer(dt[9])

	//获取美酒对象
	var food = document.querySelector(".food")
	//获取查看更多跳转对象、
	var foodDuo = food.querySelector("h3").firstElementChild
	foodDuo.addEventListener('click', function () {
		window.location.href = "./list.html?id=1006&user=" + usernum
	})
	//获取美酒容器对象
	var foodRight = food.querySelector(".food-right")
	//进行渲染
	let foodStr = '<li><a href=""><img src="../images/meishi.jpg"></a></li>'
	//将拼接好的内容渲染
	foodRight.firstElementChild.innerHTML = foodStr + indexRenderer(dt[6])

	//精品推荐渲染
	//获取操作对象
	var recommend = document.querySelector(".recommend")
	var recommendBox = recommend.querySelector(".recommend-box")
	//进行渲染
	let recommendStr = ''
	dt[10].forEach(itme => {
		//判断itme.lable是否有值
		if (itme.lable) {
			recommendStr += `
				<li><a href="./details.html?id=${itme.id}&user=${usernum}" target="_blank">
					<div>
						<u>
							<i>${itme.lable}</i>
						</u>
						<img src="${itme.imglink}">
						<h3>${itme.descr}</h3>
					</div>
					<h4>${itme.title}</h4>
					<p>￥<span>${itme.price}</span></p>
				</a></li>
			`
		} else {
			recommendStr += `
				<li><a href="./details.html?id=${itme.id}&user=${usernum}" target="_blank">
					<div>
						<u></u>
						<img src="${itme.imglink}">
						<h3>${itme.descr}</h3>
					</div>
					<h4>${itme.title}</h4>
					<p>￥<span>${itme.price}</span></p>
				</a></li>
			`
		}
	})
	//将拼接好的内容渲染
	recommendBox.firstElementChild.innerHTML = recommendStr
})()


//精品推荐左右点击切换功能
//获取操作对象
var recommendBox = document.querySelector('.recommend-box')
var recommendLeft = document.querySelector('.recommend-left')
var recommendRight = document.querySelector('.recommend-right')
//获取recommendBox大盒子的宽
var recommendBoxWidth = recommendBox.offsetWidth
//获取存放内容ul的宽
var recommendBoxChildWidth = recommendBox.firstElementChild.offsetWidth
//给切换图标添加点击事件
recommendLeft.addEventListener('click', function () {
	if (recommendBox.scrollLeft > recommendBoxWidth) {
		move(recommendBox, false)
	} else {
		move(recommendBox, false)
	}
})
recommendRight.addEventListener('click', function () {
	//判断是否移动的距离小于剩下的距离
	if ((recommendBox.scrollLeft + recommendBoxWidth) < recommendBoxChildWidth) {
		//点击则recommendBox盒子向右移动自己宽度的倍数
		move(recommendBox, true)
	} else {
		move(recommendBox, true)
	}
})

//儿童手表切换功能
//获取操作对象
var wear = document.querySelector('.wear')
var wearPrve = wear.querySelector('.wear-prev')
var wearNext = wear.querySelector('.wear-next')
var wearBottomBox = wear.querySelector('.wear-bottom-box')
//获取wearBottomBox的宽
var wearBottomBoxWid = wearBottomBox.offsetWidth
//获取子代ul的宽
var wearBottomBoxChildWid = wearBottomBox.firstElementChild.offsetWidth
//添加点击事件
wearPrve.addEventListener('click', function () {
	if (wearBottomBox.scrollLeft > wearBottomBoxWid) {
		move(wearBottomBox, false)
	} else {
		move(wearBottomBox, false)
	}
})
wearNext.addEventListener('click', function () {
	if (wearBottomBox.scrollLeft + wearBottomBoxWid < wearBottomBoxChildWid) {
		move(wearBottomBox, true)
	} else {
		move(wearBottomBox, true)
	}
})

//跳转购物车
const shopcart = document.querySelector(".shopcart")
//添加点击事件
shopcart.addEventListener("click",function(){
	window.open("./shopcart.html?user="+usernum)
})
//获取localstorage
var usernumList = localStorage.getItem(usernum)
//转为数组
usernumList = JSON.parse(usernumList)
//判断是否存在
if(usernumList){
	//购物车显示为usernumList长度
	shopcart.firstElementChild.children[1].innerHTML = usernumList.length
	//渲染迷你购物车
	// 拼接字符串
	let str = ''
	//遍历
	usernumList.forEach(itme=>{
		str += `
			<li class="clearfix">
				<input type="checkbox" name="xuan" data-id="${itme.id}" data-name="${itme.options}"/>
				<img src="${itme.imglink}"/>
				<div>
					<h3><a href="./details.html?id=${itme.id}&user=${usernum}" target="_blank">${itme.title}</a></h3>
					<p><span>￥${itme.price}</span>&nbsp;&nbsp;&nbsp;&nbsp;<i>x${itme.intnum}</i></p>
				</div>
			</li>
		`
	})
	//获取迷你购物车对象
	const shopcartMin = document.querySelector(".shopcart-box")
	//渲染
	shopcartMin.firstElementChild.innerHTML = str
	//获取选中框对象
	const xuan = document.getElementsByName("xuan")
	//渲染总计
	shopcartMin.children[1].children[1].innerHTML = ("￥" + totalZj())
	//获取提示没有选中商品对象
	const goJiesuan = document.querySelector(".go-jiesuan")
	for(let i = 0;i < xuan.length;i++){
		//给选中框添加点击事件
		xuan[i].addEventListener("click",function(){
			//渲染价格
			shopcartMin.children[1].children[1].innerHTML = ("￥" + totalZj())
		})
	}
	//获取去结算
	const jiesuan = document.querySelector(".settlement")
	//给去结算添加点击事件
	jiesuan.addEventListener("click",function(){
		let n = 0 //计算选中商品数量
		let arrShops = [] //存储选中商品信息
		//判断是否有选中的商品
		for(let j = 0;j < xuan.length;j++){
			if(xuan[j].checked){
				//获取id
				let jid = xuan[j].getAttribute("data-id")
				//获取商品属性
				let jname = xuan[j].getAttribute("data-name")
				//遍历
				usernumList.forEach(im=>{
					//判断商品id是否相等
					if(im.id === jid){
						//判断商品信息是否相等
						if(im.options === jname){
							//添加到数组中
							arrShops.push(im)
						}
					}
				})
				//选中商品数量++
				n++
			}
		}
		//判断n是否大于0
		if(n > 0){
			//将arr添加到usernumjs
			localStorage.setItem(usernum+"js",JSON.stringify(arrShops))
			//跳转到结算页面
			window.location.href = "./settlement.html?user="+usernum
		}else{
			goJiesuan.style.display = "block"
		}
	})
	//给提示没有选中商品对象添加点击事件
	goJiesuan.addEventListener("click",function(e){
		var e = e || window.event
		var target = e.target || e.srcElement
		//点击取消
		if(target.innerHTML == "取消"){
			goJiesuan.style.display = "none"
		}
		//点击在逛逛
		if(target.innerHTML == "再逛逛"){
			goJiesuan.style.display = "none"
		}
		//点击X
		if(target.innerHTML == "X"){
			goJiesuan.style.display = "none"
		}
	})
	//给导航栏购物车添加鼠标移入事件
	shopcart.addEventListener("mouseover",function(){
		//迷你购物车显示
		shopcartMin.style.display = "block"
	})
	//给导航栏购物车添加鼠标移出事件
	shopcart.addEventListener("mouseout",function(){
		//迷你购物车隐藏
		shopcartMin.style.display = "none"
	})
	//给迷你购物车添加鼠标移动事件
	shopcartMin.addEventListener("mousemove",function(){
		//迷你购物车显示
		shopcartMin.style.display = "block"
	})
	//给迷你购物车添加鼠标移出事件
	shopcartMin.addEventListener("mouseout",function(){
		//迷你购物车隐藏
		shopcartMin.style.display = "none"
	})
	//计算总计
	function totalZj(){
		let sumPrice = 0; // 计算选中商品总和
		//遍历所有选项
		for(let i = 0;i < xuan.length;i++){
			//判断是否选中
			if(xuan[i].checked){
				//获取价格
				let jg = xuan[i].nextElementSibling.nextElementSibling.children[1].children[0].innerHTML.split("￥")[1]
				//获取数量
				let sl = xuan[i].nextElementSibling.nextElementSibling.children[1].children[1].innerHTML.split("x")[1]
				//计算
				sumPrice += parseInt(jg) * parseInt(sl)
			}
		}
		return sumPrice.toFixed(2)
	}
}else{
	//购物车显示为0个商品
	shopcart.firstElementChild.children[1].innerHTML = 0
}

//轮播图
//轮播图插件对象
new SwiperOpa(".swiper", {
	timer: 5000,
	pagination: ".swiper-pagination",
	prev: ".swiper-prev",
	next: ".swiper-next"
})
//
new SwiperOpa2(".banner-box", {
	timer: 3000,
	pagination: ".swiper-pagination"
})

//右侧导航栏功能
//初始化
//判断是否滚动到了list-box这个位置
if ($(window).scrollTop() > $(".list-box").offset().top) {
	//显示回到顶部
	$(".side-totop").css("display", "block")
} else {
	//隐藏回到顶部
	$(".side-totop").css("display", "none")
}
//判断是否滚动到了phone(手机)这个位置
if ($(window).scrollTop() > $(".phone").offset().top) {
	//显示分类列表
	$(".side-list").css("display", "block")
} else {
	//隐藏分类列表
	$(".side-list").css("display", "none")
}
//滚动距离显示
//滚动事件
$(window).on("scroll", function() {
	//判断是否滚动到了list-box这个位置
	if ($(window).scrollTop() > $(".list-box").offset().top) {
		//显示回到顶部
		$(".side-totop").css("display", "block")
	} else {
		//隐藏回到顶部
		$(".side-totop").css("display", "none")
	}
	//判断是否滚动到了phone(手机)这个位置
	if ($(window).scrollTop() > $(".phone").offset().top) {
		//显示分类列表
		$(".side-list").css("display", "block")
	} else {
		//隐藏分类列表
		$(".side-list").css("display", "none")
	}
	//列表选项盒子距离上面的高度
	/* let maxTop = $(".maxbox").offset().top
	//列表选项盒子的高度
	let maxHeight = $(".maxbox").height()
	console.log(maxHeight,maxTop)
	//判断滚动的距离是否在列表盒子中
	if($(window).scrollTop() >= maxTop && $(window).scrollTop() <= (maxTop + maxHeight)){
		
	} */
	//遍历列表项盒子
	$(".every").each(function(i){
		//判断
		if(($(window).scrollTop() + 100) >= $($(".every")[i]).offset().top && ($(window).scrollTop() + 100) < ($($(".every")[i]).offset().top + $($(".every")[i]).height())){
			//清空所有的li的class属性
			$(".side-list").children().each(function(j){
				//删除class=border-red这个属性
				$($(".side-list").children()[j]).removeClass("border-red")
			})
			//重新设置class属性
			$($(".side-list").children()[i]).attr("class","border-red")
		}
	})
})
//点击返回顶部
$(".side-totop").find("li").click(function() {
	movePosition(0)
})
//点击购物车
$(".side-show").find("li").click(function() {
	//跳转到购物车页
	window.location.href = "./shopcart.html?user="+usernum
})
//点击滚动到指定位置
//给每个列表选项添加点击事件
$(".side-list").children().click(function(){
	//清空所有的li的class属性
	$(".side-list").children().each(function(i){
		//删除class=border-red这个属性
		$(this).removeClass("border-red")
	})
	//重新设置class属性
	$(this).attr("class","border-red")
	//列表选项标题
	let sidelistTitle = $(this).text()
	//遍历所有的列表项盒子的标题
	$(".every-top").each(function(j){
		//判断与点击的列表选项是否相同
		if($($(".every-top")[j]).find("h2").text() == sidelistTitle){
			//获取这个盒子距离顶部的距离
			let boxTop = $($(".every-top")[j]).parent()
			//执行运动函数
			movePosition(boxTop.offset().top)
		}
	})
})

//遍历所有的列表盒子头部选项
$(".every-top").find("ol").each(function(i){
	//添加点击事件
	$(this).find("li").click(function(){
		//获取点击的文本内容
		let $text = $(this).text()
		//判断是否包含系列这个词
		if(/系列*/.test($text)){
			//去掉系列这个词
			$text = $text.slice(0,$text.length-2)
		}
		//编码后通过URL传输参数
		$text = encodeURI($text)
		//跳转到列表页
		window.location.href = "./list.html?id="+$text+"&user="+usernum
	})
})
//搜索框获得改变
$(".header-right-text").find("[type='text']").on("input",function(){
	//获取输入框的值
	let $val = $(this).val()
	//判断长度是否 大于0
	if($val.length > 0){
		//隐藏搜索框的广告内容
		$(".search-bar-key").css("display","none")
	}else{
		// 显示搜索框广告内容
		$(".search-bar-key").css("display","block")
	}
})
//点击搜索功能
$(".header-right-text").find("[type='button']").click(function(){
	//获取输入框的值
	let $val = $(this).prev().val()
	//判断长度是否大于0
	if($val.length > 0){
		//编码后通过URL传输参数
		$val = encodeURI($val)
		console.log($val)
		//跳转到列表页
		window.location.href = "./list.html?id="+$val+"&user="+usernum
	}else{
		alert("你还没用输入！！！")
	}
})
//遍历搜索框内广告
$(".search-bar-key").children().each(function(){
	$(this).click(function(){
		//获取点击的文本
		let $text = $(this).text()
		//判断是否包含系列这个词
		if(/系列*/.test($text)){
			//去掉系列这个词
			$text = $text.slice(0,$text.length-2)
		}
		//编码后通过URL传输参数
		$text = encodeURI($text)
		//跳转到列表页
		window.location.href = "./list.html?id="+$text+"&user="+usernum
	})
})

//运动函数(移动到的位置)
function movePosition(at){
	//获取现在位置距离顶部的距离
	let top1 = $(window).scrollTop()
	//每次移动两者距离的四分之一
	let sp = Math.ceil(Math.abs(top1 - at)/4)
	//创建定时器
	var timer = setInterval(function(){
		//判断大小确定上下运动
		if(top1 > at){
			top1 -= sp;
			//小于100时清空定时器
			(top1 - at <= 0) && clearInterval(timer);
		}else{
			top1 += sp;
			//小于0时清空定时器
			(at - top1 <= 0) && clearInterval(timer);
		}
		//计算步长
		sp = Math.ceil(Math.abs(top1 - at)/4)
		//重新设置两者距离
		$(window).scrollTop(top1)
	},50)
}