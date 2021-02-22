//获取search值
var se = window.location.search
//获取账号
var usernum = se.split("=")[1].split("&")[0]
//获取传入的结算数组
var arrShops = se.split("=")[2]
//判断是否登录
if (se) {
    //获取cookie值
    var cook = getCookie(usernum)
    //获取注册登录文本盒子
    var text1 = document.querySelector(".nav-right").firstElementChild.children[0]
    //渲染内容
    text1.innerHTML = `<li><a href="javascript:;" style="color:#333">欢迎&nbsp;${cook}</a></li>`
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
//获取locastrog值
var usernumList = localStorage.getItem(usernum)
//转成数组格式
var usernumList = JSON.parse(usernumList)
//渲染购物车页 
$(".cartlist").html(cartlistRendere(usernumList,usernum))
//计算小计
subtotal()
//计算总计
total()
//添加点击事件
$(".cartlist").click(function (e) {
    var target = e.target
    //加法
    if (target.name == "jia") {
        let $num = $(target).prev().val()
        $num++
        $(target).prev().val($num)
        //获取商品id
        let id = $(target).attr("data-id")
        //获取选择的商品属性
        let xinxi = $(target).attr("data-name")
        //重新赋值localstorage
        localChage(id, xinxi, $num)
        //计算小计
        subtotal()
        //计算总计
        total()
    }
    //减法
    if (target.name == "jian") {
        let $num = $(target).next().val()
        $num = parseInt($num > 1 ? --$num : $num)
        $(target).next().val($num)
        //获取商品id
        let id = $(target).attr("data-id")
        //获取选择的商品属性
        let xinxi = $(target).attr("data-name")
        //重新赋值localstorage
        localChage(id, xinxi, $num)
        //计算小计
        subtotal()
        //计算总计
        total()
    }
    //全选
    if (target.name == "quanx") {
        //当前全选框选中
        if ($(target).prop("checked")) {
            //遍历所有选中框选中
            for (let i = 0; i < $("[name='danxuan']").length; i++) {
                $("[name='danxuan']")[i].checked = true
            }
            //所有全选选中
            $("[name='quanx']").each(function (i) {
                $("[name='quanx']")[i].checked = true
            })
        } else {
            //遍历所有选中框取消选中
            for (let i = 0; i < $("[name='danxuan']").length; i++) {
                $("[name='danxuan']")[i].checked = false
            }
            //所有全选框取消选中
            $("[name='quanx']").each(function (i) {
                $("[name='quanx']")[i].checked = false
            })
        }
        //计算总计
        total()
    }
    //删除单个商品
    if (target.name == "del") {
        //获取对应商品的id
        let id = $(target).attr("data-id")
        //获取对应商品的选择信息
        let xinxi = $(target).attr("data-name")
        //遍历筛选
        usernumList = usernumList.filter(itme => {
            return ((itme.id != id) && (itme.options != xinxi))
        })
        //重新设置localstorage
        localStorage.setItem(usernum, JSON.stringify(usernumList))
        //重新渲染
        $(".cartlist").html(cartlistRendere(usernumList,usernum))
        //总计
        total()
    }
    //删除选中商品
    if (target.name == "dels") {
        //遍历所有选中框选中
        for (let i = $("[name='danxuan']").length - 1; i >= 0; i--) {
            //判断是否选中
            if ($("[name='danxuan']")[i].checked) {
                //获取对应商品的id
                let id = $($("[name='danxuan']")[i]).attr("data-id")
                //获取对应商品的选择信息
                let xinxi = $($("[name='danxuan']")[i]).attr("data-name")
                //遍历筛选
                usernumList = usernumList.filter(itme => {
                    return ((itme.id != id) && (itme.options != xinxi))
                })
                // 重新设置localstorage
                localStorage.setItem(usernum, JSON.stringify(usernumList))
                // 重新渲染
                $(".cartlist").html(cartlistRendere(usernumList,usernum))
            }
        }
        //总计
        total()
    }
    //单选框选择
    if (target.name == "danxuan") {
        //是否全选开关
        let flag = true
        //遍历所有选中框
        for (let i = 0; i < $("[name='danxuan']").length; i++) {
            //判断是否有选择框未被选中
            if (!$("[name='danxuan']")[i].checked) {
                flag = false
                //退出循环
                break
            }
        }
        //给全选框赋值
        $("[name='quanx']").each(function (i) {
            $("[name='quanx']")[i].checked = flag
        })
        //计算总计
        total()
    }
	//点击去结算
	if(target.innerHTML == "立即结算"){
		let a = 0 //选中商品数量
		let arr = [] //存储选中商品
		//遍历所有商品
		$("[name='danxuan']").each(function(i){
			//判断是否选中
			if($("[name='danxuan']")[i].checked){
				//获取该商品的id
				let sid = $($("[name='danxuan']")[i]).attr("data-id")
				//获取商品的属性
				let sname = $($("[name='danxuan']")[i]).attr("data-name")
				//遍历找出该商品对应的值
				usernumList.forEach(im=>{
					//判断id是否相等
					if(im.id === sid){
						//判断商品属性是否相等
						if(im.options === sname){
							//添加到数组中
							arr.push(im)
						}
					}
				})
				//选中商品数量++
				a++
			}
		})
		//判断是否选择了商品
		if(a === 0){
			$(".go-jiesuan").css("display","block")
			//给提示没有选中商品对象添加点击事件
			$(".go-jiesuan").click(function(e){
				var target = e.target || e.srcElement
				//点击取消
				if(target.innerHTML == "取消"){
					$(".go-jiesuan").css("display","none")
				}
				//点击在逛逛
				if(target.innerHTML == "再逛逛"){
					$(".go-jiesuan").css("display","none")
				}
				//点击X
				if(target.innerHTML == "X"){
					$(".go-jiesuan").css("display","none")
				}
			})
		}else{
			//将选择的商品信息添加到localstorage中
			localStorage.setItem(usernum+"js",JSON.stringify(arr))
			//跳转到结算页面
			window.location.href = "./settlement.html?user="+usernum
		}
	}
})

//输入框失去焦点
for (let j = 0; j < $("[name='num']").length; j++) {
    $($("[name='num']")[j]).on("blur", function () {
        //获取输入框的值再重新赋值
        $($("[name='num']")[j]).val($($("[name='num']")[j]).val())
        //获取商品id
        let id = $($("[name='num']")[j]).attr("data-id")
        //获取选择的商品属性
        let xinxi = $($("[name='num']")[j]).attr("data-name")
        //重新赋值localstorage
        localChage(id, xinxi, $($("[name='num']")[j]).val())
        //计算小计
        subtotal()
        //计算总计
        total()
    })
}
//右侧导航栏功能
//购物车图标商品数量
if (usernumList) {
    $(".rightnav").find("li").eq(0).find("div").html(usernumList.length)
} else {
    $(".rightnav").find("li").eq(0).find("div").html(0)
}

//热销推荐左右切换
//点击向右
$(".sale-right").find("i").click(function () {
    $(".sale-center").scrollLeft(1320)
})
//点击向左
$(".sale-left").find("i").click(function () {
    $(".sale-center").scrollLeft(0)
})
//渲染热销推荐
$.get("../php/index3.php", function (dt) {
    //拼接字符串
    let str = ''
    //遍历
    dt[12].forEach(itme => {
        str += `
        <li><a href="./details.html?id=${itme.id}&user=${usernum}">
            <div>
                <img src="${itme.imglink}">
            </div>
            <h3>${itme.title}</h3>
            <p>￥<span>${itme.price}</span></p>
        </a></li>
        `
    })
    //渲染
    $(".sale-center").find("ul").html(str)
}, "json")

//小计
function subtotal() {
    //遍历
    for (let i = 0; i < $(".summin").length; i++) {
        $($(".summin")[i]).find("span").html(($($(".summin")[i]).prev().prev().find("span").html() * $($(".summin")[i]).prev().find("input")[1].value).toFixed(2))
    }
}
//总计
function total() {
    //计算总计
    let sum = 0
    //选中商品数量
    let n = 0
    //遍历所有选中框
    for (let i = 0; i < $("[name='danxuan']").length; i++) {
        if ($($("[name='danxuan']")[i]).prop("checked")) {
            sum += parseFloat($($("[name='danxuan']")[i]).parent().parent().parent().children().eq(4).find("span").html())
            n++
        }
    }
    //赋值给总计
    $(".cartlist-bottom").children().eq(2).find("i").find("span").html(sum.toFixed(2))
    // $(".cartlist-bottom-box").children().eq(2).find("i").find("span").html(sum.toFixed(2))
    //计算选中商品数量
    $(".cartlist-bottom").children().eq(2).find("p").find("i").html(n)
    // $(".cartlist-bottom-box").children().eq(2).find("p").find("i").html(n)
}
//改变localstorage
function localChage(id, dt, n) {
    //遍历
    usernumList.forEach(itme => {
        //判断是否是需要修改数量的商品的id
        if (itme.id === id) {
            //判断商品选中属性是否相等
            if (itme.options === dt) {
                //将数量赋值
                itme.intnum = n
            }
        }
    })
    //重新设置localstorage
    localStorage.setItem(usernum, JSON.stringify(usernumList))
}