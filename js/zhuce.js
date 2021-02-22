// 获取表单对象
const fr = document.querySelector("form")
//获取用户名输入框
const username = fr.querySelector("[name=username]")
var isName = false//注册开关
var isNum = false
var isPass = false
var isIspass = false
var isId = false
//用户名输入框值
var valName = ""
//添加输入框失去焦点事件
username.addEventListener('blur',function(){
	//用户名规则 中文英文数字字母下划线
	let reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
	//获取输入框的值
	valName = username.value
	//判断是否正确
	if(reg.test(valName)){
		username.nextElementSibling.innerHTML = "用户名正确"
		username.nextElementSibling.style.color = "blue"
		isName = true
	}else{
		username.nextElementSibling.innerHTML = "用户名不能包含非法字符"
		username.nextElementSibling.style.color = "red"
		username.focus()
	}
	//判断是否所有字段输入正确
	if(valName && valNum && valPass && valisPass && valId){
		yes.style.cursor = "pointer"
		yes.style.backgroundColor = "blue"
	}
})
//获取账号框对象
const usernum = fr.querySelector('[name=userword]')
//获取账号框值
var valNum = ""
//添加失去焦点事件
usernum.addEventListener('blur',function(){
	//账号规则 字母加数字6-12位
	let reg = /^[A-Za-z0-9]{6,12}$/
	//获取账号输入框的值
	valNum = usernum.value
	//判断是否正确
	if(reg.test(valNum)){
		usernum.nextElementSibling.innerHTML = "账号正确"
		usernum.nextElementSibling.style.color = "blue"
		isNum = true
	}else{
		usernum.nextElementSibling.innerHTML = "账号错误"
		usernum.nextElementSibling.style.color = "red"
		usernum.focus()
	}
	//判断是否所有字段输入正确
	if(valName && valNum && valPass && valisPass && valId){
		yes.style.cursor = "pointer"
		yes.style.backgroundColor = "blue"
	}
})
//获取密码框对象
const userpass = fr.querySelector('[name=pass]')
//获取密码框值
var valPass = ""
//添加失去焦点事件
userpass.addEventListener('blur',function(){
	//密码规则 必须有大小写字母加数字8-16位
	let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
	//获取密码输入框的值
	valPass = userpass.value
	//判断是否正确
	if(reg.test(valPass)){
		userpass.nextElementSibling.innerHTML = "密码正确"
		userpass.nextElementSibling.style.color = "blue"
		isPass = true
	}else{
		userpass.nextElementSibling.innerHTML = "密码须包含大小写字母"
		userpass.nextElementSibling.style.color = "red"
		userpass.focus()
	}
	//判断是否所有字段输入正确
	if(valName && valNum && valPass && valisPass && valId){
		yes.style.cursor = "pointer"
		yes.style.backgroundColor = "blue"
	}
})
//获取确认密码框对象
const userispass = fr.querySelector('[name=ispass]')
//获取确认密码框值
var valisPass = ""
//添加失去焦点事件
userispass.addEventListener('blur',function(){
	//获取确认密码输入框的值
	valisPass = userispass.value
	//判断是否正确
	if(!valPass){
		userispass.nextElementSibling.innerHTML = "请输入密码"
		userispass.nextElementSibling.style.color = "red"
		userpass.focus()
	}else if(valisPass == valPass){
		userispass.nextElementSibling.innerHTML = "确认密码正确"
		userispass.nextElementSibling.style.color = "blue"
		isIspass = true
	}else{
		userispass.nextElementSibling.innerHTML = "两次密码不一致"
		userispass.nextElementSibling.style.color = "red"
		userispass.focus()
	}
	//判断是否所有字段输入正确
	if(valName && valNum && valPass && valisPass && valId){
		yes.style.cursor = "pointer"
		yes.style.backgroundColor = "blue"
	}
})
//获取身份证框对象
const userid = fr.querySelector('[name=idnum]')
//获取出生日期
const brith = fr.querySelector("[name=brith]")
//获取身份证框值
var valId = ""
var brithnum ;
//添加失去焦点事件
userid.addEventListener('blur',function(){
	//身份证
	let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
	//获取身份证框的值
	valId = userid.value
	brithnum = valId.substr(6,4) + "-" + valId.substr(10,2) + "-" + valId.substr(12,2)
	//判断是否正确
	if(valisPass == valPass){
		userid.nextElementSibling.innerHTML = "身份证正确"
		userid.nextElementSibling.style.color = "blue"
		isId = true
		brith.value = brithnum
	}else{
		userid.nextElementSibling.innerHTML = "身份证输入有误"
		userid.nextElementSibling.style.color = "red"
		userid.focus()
	}
	//判断是否所有字段输入正确
	if(valName && valNum && valPass && valisPass && valId){
		yes.style.cursor = "pointer"
		yes.style.backgroundColor = "blue"
	}
})
//获取点击查看密码的对象
const have = document.querySelectorAll(".have")
const nothave = document.querySelectorAll(".nothave")
//添加点击事件
for(let i= 0;i < have.length;i++){
	have[i].addEventListener('click',function(){
		this.style.display = "none"
		nothave[i].style.display = "inline-block"
		//将对应的input框改成text类型
		have[i].previousElementSibling.previousElementSibling.setAttribute("type","text")
	})
}
for(let j= 0;j < have.length;j++){
	nothave[j].addEventListener('click',function(){
		this.style.display = "none"
		have[j].style.display = "inline-block"
		nothave[j].previousElementSibling.previousElementSibling.previousElementSibling.setAttribute("type","password")
	})
}
//获取注册按钮
const yes = fr.querySelector('[name=yes]')
//设置注册按钮初始样式
yes.style.cursor = "not-allowed"
yes.style.backgroundColor = "#F0F0F0"
//添加点击事件
yes.addEventListener('click',function(e){
	if(valName && valNum && valPass && valisPass && valId){
		yes.style.cursor = "pointer"
		yes.style.backgroundColor = "#0000ff";
		(async function(){
			var dt = await promiseAjax({
				url:"../php/zhuce.php",
				data:`valname=${valName}&valnum=${valNum}&valpass=${valPass}&valid=${valId}&valbrith=${brithnum}`,
				type:"post"
			})
			//判断返回的是不是0.是0则说明账号已被注册
			if(dt == 0){
				usernum.nextElementSibling.innerHTML = "这个账号已经被注册过啦，换一个试试吧"
				usernum.nextElementSibling.style.color = "red"
			}else{
				alert("注册成功!")
				window.location.href = "./login.html?valnum="+valNum+"&valpass="+valPass
			}
		})()
	}else{
		yes.style.cursor = "not-allowed"
		yes.style.backgroundColor = "#F0F0F0"
		return
	}
})