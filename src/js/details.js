//接受search值
var sea = window.location.search
var id = sea.split("=")[1].toString().split("&")[0]
//获取账号
var usernum = sea.split("=")[2]
//判断是否登录
if (usernum != "undefined") {
	//获取cookie值
	var cook = getCookie(usernum)
	//获取注册登录文本盒子
	var text1 = document.querySelector(".nav-right").firstElementChild.children[0]
	//渲染内容
	text1.innerHTML = `<li><a href="javascript:;" style="color:#fff">欢迎&nbsp;${cook}</a></li>`
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
//获取路径导航对象
var routenav = document.querySelector('.routenav')
//获取商品详情对象
var goodsinfo = document.querySelector('.goodsinfo')
if (sea) {
	(async function () {
		var dt = await promiseAjax({
			url: "../php/details.php",
			data: "id=" + id,
			datatype: 'json'
		})
		//给标题添加字段
		const tit = document.querySelector('title').innerHTML = dt.title
		//拼接字符串
		let str1 = `
			<ol class="breadcrumb clearfix">
			  <li><a href="./index.html">首页</a><i class="iconfont icon-you"></i></li>
			  <li><a href="./list.html?val=${dt.keys}">${dt.keymain}</a><i class="iconfont icon-you"></i></li>
			  <li><a href="javascript:;">${dt.title}</a></i></li>
			</ol>
		`
		//渲染列表导航
		routenav.innerHTML = str1
		//渲染详情数据
		goodsinfo.innerHTML = detailsRenderer(dt)
		//小图左右滑动
		//获取小图对象
		const goodsinfoLeft = document.querySelector(".goodsinfo-left")
		const goodsinfoLeftImgs = goodsinfo.querySelectorAll("li")
		//获取包含小图的盒子
		const goodsinfoLeftBox = goodsinfoLeft.querySelector(".goodsinfo-left-minimg-box")
		//获取他的宽
		var x1 = goodsinfoLeftBox.offsetWidth
		//获取大图对象
		const goodsinfoLeftImg = goodsinfoLeft.querySelector(".goodsinfo-left-maximg")
		//获取左右点击按钮
		const prev = goodsinfoLeft.querySelector(".goodsinfo-left-minimg-left")
		const next = goodsinfoLeft.querySelector(".goodsinfo-left-minimg-right")
		//添加点击事件
		prev.addEventListener("click", function () {
			goodsinfoLeftBox.scrollLeft = -x1
		})
		next.addEventListener("click", function () {
			goodsinfoLeftBox.scrollLeft = x1
		})
		//给li添加点击事件
		for (let i = 0; i < goodsinfoLeftImgs.length; i++) {
			goodsinfoLeftImgs[i].addEventListener("click", function () {
				//遍历所有的li清空样式
				for (let j = 0; j < goodsinfoLeftImgs.length; j++) {
					goodsinfoLeftImgs[j].className = ""
				}
				//给当前li添加样式
				goodsinfoLeftImgs[i].className = "goodsli"
				//替换上面打大图为当前的li的图片
				var imgsrc = goodsinfoLeftImgs[i].firstElementChild.getAttribute("src")
				goodsinfoLeftImg.firstElementChild.setAttribute("src", imgsrc)
			})
		}
		//放大镜效果
		//获取盒子宽
		var w1 = goodsinfoLeftImg.offsetWidth
		//创建div
		var newDiv = document.createElement("div")
		var newDivMax = document.createElement("div")
		var newDivMax2 = document.createElement("div")
		var newImg = document.createElement("img")
		//设置样式
		setCss(newDiv, {
			width: w1 / 2 + "px",
			height: w1 / 2 + "px",
			backgroundColor: "rgba(255,255,255,0.2)",
			border: "1px solid #ccc",
			position: "absolute",
			top: "0px",
			left: "0px",
			display: "none"
		})
		setCss(newDivMax, {
			width: w1 + "px",
			height: w1 + "px",
			border: "1px solid #ccc",
			position: "absolute",
			top: "0px",
			left: "500px",
			zIndex: "500",
			overflow: "hidden",
			display: "none"
		})
		setCss(newDivMax2, {
			width: w1 + "px",
			height: w1 + "px",
			backgroundColor: "#fff"
		})
		setCss(newImg, {
			width: w1 * 2 + "px",
			height: w1 * 2 + "px",
			position: "absolute",
			top: "0px",
			left: "0px"
		})
		newDivMax.appendChild(newDivMax2)
		newDivMax2.appendChild(newImg)
		//追加到大图盒子中
		goodsinfoLeftImg.appendChild(newDiv)
		goodsinfoLeftImg.appendChild(newDivMax)
		//获取大盒子的图片的src属性
		var isrc = goodsinfoLeftImg.firstElementChild.getAttribute("src")
		//添加到img中
		newImg.setAttribute("src", isrc)
		//鼠标移入事件
		goodsinfoLeftImg.addEventListener("mouseover", function () {
			newDiv.style.display = "block"
			newDivMax.style.display = "block"
		})
		//鼠标移出事件
		goodsinfoLeftImg.addEventListener("mouseout", function () {
			newDiv.style.display = "none"
			newDivMax.style.display = "none"
		})
		//鼠标移动事件
		goodsinfoLeftImg.addEventListener("mousemove", function (e) {
			var e = e || window.event
			//放大镜移动函数
			fangdajing(e, newDiv, goodsinfoLeftImg, newDivMax)
		})
		//获取右侧盒子对象
		const goodsinfoRight = goodsinfo.querySelector(".goodsinfo-right")
		const goodsinfoRightClass = goodsinfoRight.querySelector(".goodsinfo-right-class")
		//获取选择颜色对象
		const goodsinfoRightColor = goodsinfoRightClass.children[0]
		//获取选择版本对象
		const goodsinfoRightBan = goodsinfoRightClass.children[1]
		//选择商品属性效果
		var colorXuan = goodsinfoRightColor.children[1].innerText;//颜色属性获得者
		if (goodsinfoRightBan.children.length > 0) {
			var banXuan = goodsinfoRightBan.children[1].innerText;//版本属性获得者
		}
		//渲染综合商品属性
		if (goodsinfoRightBan.children.length > 0) {//判断是否有版本属性这个选项
			goodsinfoRightClass.children[5].children[1].innerHTML = `${colorXuan}/${banXuan}/官方标配`
		} else {
			goodsinfoRightClass.children[5].children[1].innerHTML = `${colorXuan}/官方标配`
		}
		//存储商品信息对象
		let obj = {
			intnum: 1,//商品数量
			options: goodsinfoRightClass.children[5].children[1].innerHTML,
			...dt
		}
		//遍历所有选中颜色对象
		for (let i = 1; i < goodsinfoRightColor.children.length; i++) {
			goodsinfoRightColor.children[i].addEventListener("click", function () {
				//遍历所有对象取消边框样式
				for (let j = 1; j < goodsinfoRightColor.children.length; j++) {
					goodsinfoRightColor.children[j].className = ""
				}
				//给当前点击的对象添加样式
				goodsinfoRightColor.children[i].className = "goodsinfo-right-class-borshow"
				colorXuan = goodsinfoRightColor.children[i].innerText
				if (goodsinfoRightBan.children.length > 0) {
					goodsinfoRightClass.children[5].children[1].innerHTML = `${colorXuan}/${banXuan}/官方标配`
				} else {
					goodsinfoRightClass.children[5].children[1].innerHTML = `${colorXuan}/官方标配`
				}
				//存储商品数量对象
				obj = {
					intnum: 1,//商品数量
					options: goodsinfoRightClass.children[5].children[1].innerHTML,
					...dt
				}
			})
		}

		//遍历所有的版本选中对象
		for (let i = 1; i < goodsinfoRightBan.children.length; i++) {
			goodsinfoRightBan.children[i].addEventListener("click", function () {
				//遍历所有对象取消边框样式
				for (let j = 1; j < goodsinfoRightBan.children.length; j++) {
					goodsinfoRightBan.children[j].className = ""
				}
				//给当前点击的对象添加样式
				goodsinfoRightBan.children[i].className = "goodsinfo-right-class-borshow"
				banXuan = goodsinfoRightBan.children[i].innerText
				goodsinfoRightClass.children[5].children[1].innerHTML = `${colorXuan}/${banXuan}/官方标配`
				//存储商品数量对象
				obj = {
					intnum: 1,//商品数量
					options: goodsinfoRightClass.children[5].children[1].innerHTML,
					...dt
				}
			})
		}

		//获取加入购物车提示对象
		const addCart = document.querySelector(".add-cart")
		//加入购物车功能
		//添加事件监听
		goodsinfoRightClass.children[6].addEventListener("click", function (e) {
			var e = e || window.event
			var target = e.target || e.srcElement
			//加数量
			if (target.name == "jia") {
				// 获取数量
				let val = parseInt(target.previousElementSibling.innerHTML)
				//判断是否小于库存
				if (val < parseInt(dt.num)) {
					val++
					//存储的商品数量也加加
					obj.intnum++
				}
				//重新赋值
				target.previousElementSibling.innerHTML = val
			}
			// 减数量
			if (target.name == "jian") {
				let val = parseInt(target.previousElementSibling.previousElementSibling.innerHTML)
				//判断当前数量是否大于1
				if (val > 1) {
					val--
					//存储的商品数量也减减
					obj.intnum--
				}
				//重新赋值
				target.previousElementSibling.previousElementSibling.innerHTML = val
			}
			//到货提醒
			if (target.innerHTML == "到货提示") {
				alert("已开启到货提醒，到货第一时间提醒你哦~")
			}
			//加入购物车
			if (target.innerHTML == "加入购物车") {
				//判断是否登录
				if (usernum == "undefined") {
					//跳转到登录页并传入本网页地址
					window.location.href = "./login.html?url1=" + window.location.href
				} else {
					//创建一个数组存储信息
					let arr = []
					//购物车商品列表信息
					usernumList = localStorage.getItem(usernum)
					//判断商品信息是否存在
					if (!usernumList) {
						//将商品信息添加到数组中
						arr.push(obj)
						//设置localStorage
						localStorage.setItem(usernum, JSON.stringify(arr))
					} else {
						//判断是否有相同的商品
						let falg = true
						//将购物车商品信息从json字符串转成数组
						usernumList = JSON.parse(usernumList)
						//遍历
						usernumList.forEach(itme => {
							//判断是否有相同的商品
							if (itme.id == obj.id) {
								//判断选择的商品信息是否相同
								if (itme.options == obj.options) {
									itme.intnum += obj.intnum
									falg = false
									//商品数量同步到左侧数量框
									target.parentNode.previousElementSibling.children[0].innerHTML = itme.intnum
								}
							}
						})
						//没有相同商品则把商品对象追加到数组中
						if (falg) {
							usernumList.push(obj)
						}
						//设置localStorage
						localStorage.setItem(usernum, JSON.stringify(usernumList))
					}
					addCart.firstElementChild.children[1].firstElementChild.innerHTML = obj.title
					addCart.style.display = "block"
				}
			}
		})
		//加入购物车跳转购物车页
		//添加事件监听
		addCart.addEventListener("click", function (e) {
			var e = e || window.event
			var target = e.target || e.srcElement
			//点击关闭按钮
			if (target.innerHTML == "X") {
				target.parentNode.parentNode.style.display = "none"
			}
			//点击在逛逛
			if (target.name == "zaigg") {
				target.parentNode.parentNode.parentNode.style.display = "none"
			}
			//点击去结算
			if (target.innerHTML == "去结算") {
				console.log(111)
				//跳转到购物车页并传入账号
				window.location.href = "./shopcart.html?user=" + usernum
			}
		})
	})()
} else {
	alert("非法进入请退出!!!")
	location.href = "./index.html"
}