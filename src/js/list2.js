//获取传递的search值
var se = window.location.search
var s = se.split("=")[1].toString().split("&")[0]
//获取账号
var usernum = se.split("=")[2]
//判断是否登录
if (usernum != "undefined") {
	//获取cookie值
	var cook = getCookie(usernum)
	//获取注册登录文本盒子
	var text1 = document.querySelector(".nav-right").firstElementChild.children[0]
	//渲染内容
	text1.innerHTML = `<li><a href="javascript:;" style="color:#fff">欢迎&nbsp;${cook}</a></li>`
}
//获取操作对象
var list = document.querySelector('.lists')
var listTop = list.querySelector('.lists-top')
var listBottom = list.querySelector('.lists-bottom')
//路径导航
var routenav = document.querySelector('.routenav')
//分页器对象
var pag = document.querySelector('.pagination')
//判断s值是否为空,为空则让它回到首页
if (s) {
	//判断是否为数字
	if (isNaN(s)) {
		//解码
		s = decodeURI(s);
		//通过ajax得到数据
		(async function(){
			let datas = await promiseAjax({
				url:"../php/list3.php",
				data:"val="+s,
				datatype:"json"
			})
			//渲染页面
			xuanlan(datas,s)
		})()
	} else {
		//通过ajax得到数据
		(async function(){
			let datas = await promiseAjax({
				url:"../php/list2.php",
				data:"val="+s,
				datatype:"json"
			})
			//渲染页面
			xuanlan(datas,s)
		})()
	}
} else {
	alert("非法进入！！！")
	window.location.href = "./index.html"
}
//登录注册
logZhu()

function xuanlan(dt,ss){
	if(dt.length <= 0){
		// 清空分页器
		pag.innerHTML = ""
		let str = `
			<div class="isnot">
				<h2>找不到您想要的商品，换一个试试吧！</h2>
			</div>
		`
		listBottom.firstElementChild.innerHTML = str
	}
	// dt.forEach(itme => {
		//渲染路径导航
		let routenavStr = ""
		if(isNaN(ss)){
			routenavStr =`
			<ol class="breadcrumb clearfix">
				<li><a href="./index.html?user=${usernum}">首页</a><i class="iconfont icon-you"></i></li>
				<li><a href="javascript:;">${dt[0].keymain}</a><i class="iconfont icon-you"></i></li>
				<li><a href="javascript:;">${ss}</a></li>
			</ol>
			`
		}else{
			routenavStr =`
			<ol class="breadcrumb clearfix">
				<li><a href="./index.html?user=${usernum}">首页</a><i class="iconfont icon-you"></i></li>
				<li><a href="javascript:;">${dt[0].keymain}</a></li>
			</ol>
			`
		}
		routenav.innerHTML = routenavStr
		//渲染选择框
		let listTopStr =
			`
			<ol>
				<li>
					<span>分类:</span>
					<u>${dt[0].keymain}</u>
				</li>
				<li>
					<span>选择类型:</span>
					<a href="javascript:;"><label for="give"><input type="checkbox" name="give" id="give">赠送积分</label></a>
					<a href="javascript:;"><label for="renew"><input type="checkbox" name="renew" id="renew">一站式换新</label></a>
					<a href="javascript:;"><label for="fenqi"><input type="checkbox" name="fenqi" id="fenqi">分期免息</label></a>
				</li>
				<li>
					<span>好评率:</span>
					<a href="javascript:;"><label for="top99"><input type="checkbox" name="top99" id="top99">99%以上</label></a>
					<a href="javascript:;"><label for="down98"><input type="checkbox" name="down98" id="down98">98%及以下</label></a>
				</li>
				<li class="clearfix">
					<span>排序:</span>
					<div id="prices">
						<a href="javascript:;" name="priceAsc" class="iconfont">价格&#xe69f;</a>
						<a href="javascript:;" name="priceDesc" class="iconfont">价格&#xe602;</a>
					</div>
					<form action="" method="" class="clearfix">
						<div>
							<div>￥:<input type="text" name="priceMin" id="priceMin" /></div>
							<div>￥:<input type="text" name="priceMax" id="priceMax" /></div>
						</div>
						<div>
							<button type="reset">清空</button>
							<button type="button" id="isyes">确定</button>
						</div>
					</form>
				</li>
			</ol>
			`
		//头部选择列表渲染
		listTop.innerHTML = listTopStr
		//渲染列表页
		listRenderer(pag, dt, listBottom.firstElementChild)
		//获取所有多选框
		const ipts = listTop.querySelectorAll("[type='checkbox']")
		//给选择框对象添加点击事件
		for (let i = 0; i < ipts.length; i++) {
			ipts[i].addEventListener('click', function() {
				//判断99%以上和98%一下两个不能同时选中
				if (i == 3) {
					ipts[4].checked = false
					ipts[4].style.display = "none"
					ipts[4].parentElement.parentElement.style.color = "#333"
				}
				if (i == 4) {
					ipts[3].checked = false
					ipts[3].style.display = "none"
					ipts[3].parentElement.parentElement.style.color = "#333"
				}
				//判断是否选中改变样式
				if (this.checked) {
					this.style.display = "inline-block"
					this.parentElement.parentElement.style.color = "blue"
				} else {
					this.style.display = "none"
					this.parentElement.parentElement.style.color = "#333"
				}
				//判断是否选中来筛选数据
				let data = screenBasic(ipts, dt)
				//渲染
				listRenderer(pag, data, listBottom.firstElementChild)
			})
		}
		//获取确定选项
		const isyes = document.getElementById("isyes")
		isyes.addEventListener('click', function() {
			//获取输入框对象
			const priceMin = document.getElementById('priceMin')
			const priceMax = document.getElementById('priceMax')
			//获取相应输入框的值
			let priceMinVal = priceMin.value
			let priceMaxVal = priceMax.value
			//判断两个输入框是否都有值
			if (priceMaxVal.length > 0 && priceMinVal.length > 0) {
				//判断输入的值的大小，小的在前大的在后重新赋值给输入框
				if (parseFloat(priceMinVal) > parseFloat(priceMaxVal)) {
					priceMax.value = priceMinVal
					priceMin.value = priceMaxVal
				}
			}
			//接受经过选中框筛选过后的数据
			let data = screenBasic(ipts, dt)
			//再次进行筛选
			data = screenP(priceMinVal, priceMaxVal, data)
			//渲染数据
			listRenderer(pag, data, listBottom.firstElementChild)
		})
		// 价格升序降序对象
		var priceAsc = document.getElementsByName('priceAsc')[0]
		var priceDesc = document.getElementsByName('priceDesc')[0]
		// 给价格升序添加点击事件
		priceAsc.addEventListener('click', function() {
			// 点击之后显示降序
			priceAsc.style.display = "none"
			priceDesc.style.display = "block"
			//接受经过选中框筛选过后的数据
			let data = screenBasic(ipts, dt)
			//将数据进行排序
			data = screenPrice(true, data)
			// 渲染数据
			listRenderer(pag, data, listBottom.firstElementChild)
		})
		//给价格降序添加点击事件
		priceDesc.addEventListener('click', function() {
			// 点击之后显示升序
			priceAsc.style.display = "block"
			priceDesc.style.display = "none"
			//接受经过选中框筛选过后的数据
			let data = screenBasic(ipts, dt)
			//将数据进行排序
			data = screenPrice(false, data)
			// 渲染数据
			listRenderer(pag, data, listBottom.firstElementChild)
		})
	// })
}