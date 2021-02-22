//轮播图类
/*
		<div class="swiper">
			<div class="swiper-wrapper">
				<div class="swiper-slide">
					<img src="./img/1.jpg">
					<img src="./img/2.jpg">
					<img src="./img/3.jpg">
					<img src="./img/4.jpg">
					<img src="./img/5.jpg">
				</div>
			</div>
			<div class="swiper-pagination"></div>
			<div class="swiper-prev"></div>
			<div class="swiper-next"></div>
		</div>
		
		new SwiperStep(".swiper",{
			delay:3000,
			pagination:".swiper-pagination",
			prev:".swiper-prev",
			next:".swiper-next"
		})
*/
//步长法
class SwiperStep{
	constructor(ele,options){
		this.ele = ele
		//获取操作对象
		this.box = document.querySelector(this.ele)
		this.swiperWrap = this.box.querySelector('.swiper-wrapper')
		this.swiperSlide = this.swiperWrap.querySelector('.swiper-slide')
		this.imgs = this.swiperSlide.querySelectorAll('img')
		//获取图片宽高
		this.imgsHeight=this.imgs[0].offsetHeight
		this.imgsWidth = this.imgs[0].offsetWidth
		//默认值
		this.imgIndex = 1
		this.pagIndex = 0
		//定时器
		this.timer1 = null
		this.timer2 = null
		//获取传入参数
		this.options = options || {}
		//默认参数
		this.defaults = {
			timer:3000,
			pagination: "",
			prev:"",
			next:""
		}
		//入口函数
		this.into()
	}
	//入口函数
	into(){
		this.updateDefault()
		this.swiperStyle()
		this.onSwitch()
		this.onPag()
		this.swiperRun()
	}
	//替换默认参数
	updateDefault(){
	    if(this.options){
	        //替换数据信息
	        for(let attr in this.options){
	            //使用传入的数据替换默认值
	            this.defaults[attr]=this.options[attr]     
	        }
	    }
	}
	//设置样式
	swiperStyle(){
		//this.swiperWrap
		setCss(this.swiperWrap,{
			width:this.imgsWidth+"px",
			height:this.imgsHeight+"px",
			overflow:"hidden"
		})
		// console.log(this.imgsWidth)
		//this.swiperSlide
		setCss(this.swiperSlide,{
			width:this.imgsWidth*(this.imgs.length+2)+"px",
			height:this.imgsHeight+"px"
		})
		//this.imgs
		for(let i = 0;i < this.imgs.length;i++){
			setCss(this.imgs[i],{
				width:this.imgsWidth+"px",
				height:this.imgsHeight+"px",
				float:"left"
			})
		}
		//克隆第一张图片
		let cloneImgFir = this.swiperSlide.children[0].cloneNode()
		//克隆最后一张图片
		let cloneImgLas = this.swiperSlide.children[this.swiperSlide.children.length-1].cloneNode()
		//在第一张图片前追加最后一张图片
		this.swiperSlide.insertBefore(cloneImgLas,this.swiperSlide.children[0])
		//在最后一张图片追加第一张图片
		this.swiperSlide.appendChild(cloneImgFir)
		//打开是显示的是第一张图片
		this.swiperWrap.scrollLeft = this.imgIndex*this.imgsWidth
		//添加分页器
		if(this.defaults["pagination"]){
			let pag = this.box.querySelector(".swiper-pagination")
			// 创建一个ul
			let ul = document.createElement('ul')
			//循环图片初始长度
			for(let i = 0;i < this.imgs.length;i++){
				//创建li
				var li = document.createElement('li')
				//给每个li设置样式
				setCss(li,{
					width:"10px",
					height:"10px",
					borderRadius:"50%",
					backgroundColor:"#fff",
					float:"left",
					listStyle:"none",
					margin:"0 10px",
					cursor:"pointer"
				})
				//把li添加到ul中
				ul.appendChild(li)
			}
			//获取li的宽高
			let liWidth = parseInt(ul.firstElementChild.style.width)
			let liHeight = parseInt(ul.firstElementChild.style.height)
			let liMarleft = parseInt(ul.firstElementChild.style.marginLeft)*this.imgs.length*2
			//给ul设置样式
			setCss(ul,{
				height:liHeight+"px",
				width:(liWidth*this.imgsLen+liMarleft)+"px"
			})
			//把ul添加到swiper中
			pag.appendChild(ul)
			//设置分页器容器样式
			setCss(pag,{
				position:"absolute",
				bottom:"5%",
				left:parseInt((this.imgsWidth-(liWidth*this.imgs.length+liMarleft))/2)+"px"
			})
			//默认第一个指示点为蓝色
			ul.children[0].style.backgroundColor = "#0000ff"
		}
		if(this.defaults["prev"]){
			let prev = this.box.querySelector('.swiper-prev')
			setCss(prev,{
				fontSize:"24px",
				textAlign:"center",
				width:this.imgsWidth*0.1+'px',
				height:(this.imgsHeight*0.2-this.imgsHeight*0.06)+'px',
				position:"absolute",
				left:"5px",
				top:(this.imgsHeight-this.imgsHeight*0.2)/2+'px',
				borderRadius:"5px",
				paddingTop:this.imgsHeight*0.06+"px",
				display:"none",
				cursor:"pointer",
				backgroundColor:"#cccccc99"
			})
			prev.innerText = '<'
		}
		if(this.defaults["next"]){
			let next = this.box.querySelector('.swiper-next')
			setCss(next,{
				fontSize:"24px",
				textAlign:"center",
				width:this.imgsWidth*0.1+'px',
				height:(this.imgsHeight*0.2-this.imgsHeight*0.06)+'px',
				position:"absolute",
				right:"5px",
				top:(this.imgsHeight-this.imgsHeight*0.2)/2+'px',
				borderRadius:"5px",
				paddingTop:this.imgsHeight*0.06+"px",
				display:"none",
				cursor:"pointer",
				backgroundColor:"#cccccc99"
			})
			next.innerText = '>'
		}
	}
	//图片轮播,传入一个参数多少秒轮播一次
	swiperRun(){
		//清空定时器
		clearInterval(this.timer1)
		//创建定时器
		this.timer1 = setInterval(()=>{
			//图片名字累加
			this.imgIndex++
			//判断当前图片长度是否大于所有图片长度
			if(this.imgIndex >= this.imgs.length){
				//大于则回到第二张
				this.imgIndex = 2
				//并且让他回到第二张图片位移的位置
				this.swiperWrap.scrollLeft = (this.imgIndex - 1)*this.imgsWidth
			}
			if(this.defaults["pagination"]){
				//获取分页器容器
				let pag = this.box.querySelector(".swiper-pagination")
				let lis = pag.querySelectorAll('.swiper-pagination li')
				//指示点还原为原来的颜色
				lis[this.pagIndex].style.backgroundColor = "#fff"
				//指示点加加
				this.pagIndex++
				//判断当前点位是否大于指示点长度
				if(this.pagIndex >= lis.length){
					//重置为0
					this.pagIndex = 0
				}
				//给当前指示点设置颜色
				lis[this.pagIndex].style.backgroundColor = "#0000ff"
			}
			this.autoMove()
		},this.defaults["timer"])
	}
	//点击切换
	onSwitch(){
		let lis = this.swiperSlide.children
		if(this.defaults["prev"]){
			let prev = this.box.querySelector('.swiper-prev')
			this.box.addEventListener("mouseover",()=>{
				clearInterval(this.timer1)
				prev.style.display = "block"
			})
			//当鼠标移出大盒子时，启动定时器
			this.box.addEventListener("mouseout",()=>{
				this.swiperRun()
				prev.style.display = "none"
			})
			//给左边按钮绑定点击事件
			prev.addEventListener('click',()=>{
				//判断图片盒子偏移量是否是图片宽度的整数
				if(this.swiperWrap.scrollLeft%this.imgsWidth != 0){
					// 不是直接跳出此次点击事件
					return
				}else{
					//图片名字累减
					this.imgIndex--
					//判断当前图片是否小于0
					if (this.imgIndex < 0) {
						//接下来要显示的图片名称
						this.imgIndex = lis.length - 3
						//当前起始位置应该回退到倒数第二张
						this.swiperWrap.scrollLeft = (lis.length - 2) * this.imgsWidth
					}
					this.autoMove()
					if(this.defaults["pagination"]){
						let pags = this.box.querySelectorAll('.swiper-pagination li')
						for(let i = 0;i < pags.length;i++){
							pags[i].style.backgroundColor = "#fff"
						}
						//修改按钮下标
						this.pagIndex--
						if (this.pagIndex-- < 0) {
							this.pagIndex = pags.length - 1
						}
						//给当前要显示的按钮设置背景色
						pags[this.pagIndex].style.backgroundColor = "#0000FF"
					}
				}
			})
		}
		if(this.defaults["next"]){
			let next = this.box.querySelector('.swiper-next')
			this.box.addEventListener("mouseover",()=>{
				clearInterval(this.timer1)
				next.style.display = "block"
			})
			//当鼠标移出大盒子时，启动定时器
			this.box.addEventListener("mouseout",()=>{
				this.swiperRun()
				next.style.display = "none"
			})
			//给右边的按钮设置点击事件
			next.addEventListener('click',()=>{
				//判断图片盒子偏移量是否是图片宽度的整数
				if(this.swiperWrap.scrollLeft%this.imgsWidth != 0){
					// 不是直接跳出此次点击事件
					return
				}else{
					//图片名字累加
					this.imgIndex++
					//判断当前图片是否大于等于所有图片的长度
					if (this.imgIndex >= lis.length) {
						this.imgIndex = 2
						//当前起始位置应该回退到第一张图片上，也就是第二个位置上
						this.swiperWrap.scrollLeft = (this.imgIndex - 1) * this.imgsWidth
					}
					this.autoMove()
					if(this.defaults["pagination"]){
						let pags = this.box.querySelectorAll('.swiper-pagination li')
						for(let i = 0;i < pags.length;i++){
							pags[i].style.backgroundColor = "#fff"
						}
						//修改按钮下标
						this.pagIndex++
						if (this.pagIndex >= pags.length) {
							this.pagIndex = 0
						}
						//给当前要显示的按钮设置class属性值
						pags[this.pagIndex].style.backgroundColor = "#0000FF"
					}
				}
			})
		}
	}
	//点击分页器指示点切换图片
	onPag(){
		//获取分页器容器
		let pag = this.box.querySelector(".swiper-pagination")
		let lis = pag.querySelectorAll('.swiper-pagination li')
		//遍历所有的点
		for(let i = 0;i < lis.length;i++){
			lis[i].addEventListener('click',()=>{
				for(let j = 0;j < lis.length;j++){
					lis[j].style.backgroundColor = "#fff"
				}
				this.pagIndex = i
				lis[i].style.backgroundColor = "#0000ff"
				this.imgIndex = i + 1
				this.autoMove()
			})
		}
	}
	//图片运动方法
	autoMove(){
		//获取图片起始位置
		let start = this.swiperWrap.scrollLeft
		//获取图片结束位置
		let end = this.imgIndex*this.imgsWidth
		// console.log(this.imgIndex)
		// console.log(this.pagIndex)
		//步长
		let speed = (end - start)/20
		//起始步数
		let startSpeed = 0
		//结束步数
		let endSpeed = 20
		//清除定时器
		clearInterval(this.timer2)
		//创建定时器
		this.timer2 = setInterval(()=>{
			//步数加加
			startSpeed++
			//判断初始步数是否大于结束步数
			if(startSpeed >= endSpeed){
				//清空定时器
				clearInterval(this.timer2)
				//滚动距离直接等于图片结束位置
				this.swiperWrap.scrollLeft = end
			}else{
				//初始距离加布长
				start += speed
				this.swiperWrap.scrollLeft = start
			}
		},30)
	}
}



//透明度
//透明度变化轮播
/*
	使用说明
	创建对象
		new SwiperOpa('.box',{
			timer:2000,轮播时间
			pagination:".swiper-pagination",分页器
			prev:".swiper-prev",上一页
			next:".swiper-next"下一页
		})
*/
class SwiperOpa{
	constructor(ele,options) {
	    this.ele = ele
		//获取操作对象
		this.box = document.querySelector(this.ele)
		this.box.style.position = "relative"
		this.swiperWrap = this.box.querySelector('.swiper-wrapper')
		this.swiperSlide = this.swiperWrap.querySelectorAll('.swiper-slide')
		//获取图片宽高
		
		this.imgsHeight=this.swiperWrap.offsetHeight
		this.imgsWidth=this.swiperWrap.offsetWidth
		//默认值
		this.index = 0
		//定时器
		this.timer1 = null
		//获取传入参数
		this.options = options || {}
		//默认参数
		this.defaults = {
			timer:3000,
			pagination: "",
			prev:"",
			next:""
		}
		//入口函数
		this.into()
	}
	into(){
		this.updateDefault()
		this.swiperStyle()
		this.onPag()
		this.onSwith()
		this.swiperMove()
	}
	//替换默认参数
	updateDefault(){
	    if(this.options){
	        //替换数据信息
	        for(let attr in this.options){
	            //使用传入的数据替换默认值
	            this.defaults[attr]=this.options[attr]     
	        }
	    }
	}
	//设置样式
	swiperStyle(){
		setCss(this.swiperWrap,{
			width:parseInt(this.imgsWidth)+"px",
			height:parseInt(this.imgsHeight)+'px',
			overflow:"hidden",
		})
		for(let i = 0;i < this.swiperSlide.length;i++){
			setCss(this.swiperSlide[i],{
				width:this.imgsWidth+"px",
				height:this.imgsHeight+'px',
				position:"absolute",
				opacity:0,
				transition:"all 1s"
			})
			setCss(this.swiperSlide[i].firstElementChild,{
				width:this.imgsWidth+"px",
				height:this.imgsHeight+'px',
			})
			// this.swiperSlide[i].firstElementChild.setAttribute('index',i)
		}
		//设置分页器样式
		//如果传入了分页器容器对象则给他设置样式
		if(this.defaults["pagination"]){
			//获取分页器容器
			let pag = this.box.querySelector(".swiper-pagination")
			let newUl = document.createElement('ul')
			for(let j = 0;j < this.swiperSlide.length;j++){
				let newLi = document.createElement('li')
				newLi.setAttribute('idx',j)
				setCss(newLi,{
					width:"15px",
					height:"15px",
					borderRadius:"50%",
					float:"left",
					listStyle:"none",
					margin:"0 10px",
					border:"1px solid #fff"
				})
				newUl.appendChild(newLi)
			}
			//图片长度
			let num = parseInt(this.swiperSlide.length)
			let liW = parseInt(newUl.firstElementChild.style.width)
			let liH = parseInt(newUl.firstElementChild.style.height)
			//li的左右margin值
			let liM = parseInt(newUl.firstElementChild.style.marginLeft)*2
			setCss(newUl,{
				height:liH+'px',
				width:(liW*num+liM*num)+30+'px',
			})
			pag.appendChild(newUl)
			setCss(pag,{
				bottom:"20%",
				left:(this.imgsWidth-(liW*num+liM*num))/2+500+'px',
				position:"absolute"
			})
			newUl.children[this.index].style.backgroundColor = "#fff"
		}
		//设置上一张样式
		if(this.defaults["prev"]){
			let prev = this.box.querySelector('.swiper-prev')
			setCss(prev,{
				fontSize:"50px",
				textAlign:"center",
				width:this.imgsWidth*0.05+'px',
				height:this.imgsWidth*0.05+'px',
				lineHeight:this.imgsWidth*0.05+'px',
				color:"#ccc",
				position:"absolute",
				left:"400px",
				top:(this.imgsHeight-this.imgsHeight*0.2)/2+'px',
				borderRadius:"50%",
				// paddingTop:this.imgsHeight*0.06+"px",
				display:"none",
				cursor:"pointer",
				backgroundColor:"#cccccc99"
			})
			prev.innerText = '<'
		}
		//设置下一张样式
		if(this.defaults["next"]){
			let next = this.box.querySelector('.swiper-next')
			 setCss(next,{
				fontSize:"50px",
				textAlign:"center",
				width:this.imgsWidth*0.05+'px',
				height:this.imgsWidth*0.05+'px',
				lineHeight:this.imgsWidth*0.05+'px',
				color:"#ccc",
				position:"absolute",
				right:"20px",
				top:(this.imgsHeight-this.imgsHeight*0.2)/2+'px',
				borderRadius:"50%",
				// paddingTop:this.imgsHeight*0.06+"px",
				display:"none",
				cursor:"pointer",
				backgroundColor:"#cccccc99"
			 })
			 next.innerText = '>'
		}
		this.swiperSlide[this.index].style.opacity = '1'
	}
	//点击分页器
	onPag(){
		if(this.defaults["pagination"]){
			let pag = this.box.querySelector(".swiper-pagination")
			let imgs = this.swiperSlide
			let lis = pag.firstElementChild.children
			for(let i = 0;i < lis.length;i++){
				lis[i].addEventListener('click',()=>{
					this.index = i
					for(let j = 0;j < imgs.length;j++){
						imgs[j].style.opacity = "0"
						lis[j].style.backgroundColor = ""
					}
					lis[this.index].style.backgroundColor = "#fff"
					imgs[this.index].style.opacity = '1'
					this.swiperMove()
				})
			}
		}
	}
	//点击切换图片
	onSwith(){
		if(this.defaults["pagination"] && this.defaults["prev"] && this.defaults["next"]){
			let prev = this.box.querySelector('.swiper-prev')
			let next = this.box.querySelector('.swiper-next')
			let imgs = this.swiperSlide
			let pag = this.box.querySelector(".swiper-pagination")
			let lis = pag.firstElementChild.children
			this.box.addEventListener('mouseover',()=>{
				clearInterval(this.timer1)
				prev.style.display = "block"
				next.style.display = "block"
			})
			this.box.addEventListener('mousemove',()=>{
				clearInterval(this.timer1)
				prev.style.display = "block"
				next.style.display = "block"
			})
			this.box.addEventListener('mouseout',()=>{
				prev.style.display = "none"
				next.style.display = "none"
				this.swiperMove()
			})
			prev.addEventListener("click",()=>{
				this.index = this.index
				if(this.index < 0){
					this.index = imgs.length-1
				}
				for(let i = 0;i < imgs.length;i++){
					imgs[i].style.opacity = "0"
					lis[i].style.backgroundColor = ""
				}
				imgs[this.index].style.opacity = "1"
				lis[this.index].style.backgroundColor = "#fff"
			})
			next.addEventListener("click",()=>{
				this.index = this.index
				if(this.index > imgs.length-1){
					this.index = 0
				}
				for(let i = 0;i < imgs.length;i++){
					imgs[i].style.opacity = "0"
					lis[i].style.backgroundColor = ""
				}
				imgs[this.index].style.opacity = "1"
				lis[this.index].style.backgroundColor = "#fff"
			})
		}
		if(this.defaults["prev"] && this.defaults["next"]){
			let prev = this.box.querySelector('.swiper-prev')
			let next = this.box.querySelector('.swiper-next')
			let imgs = this.swiperSlide
			this.box.addEventListener('mouseover',()=>{
				clearInterval(this.timer1)
				prev.style.display = "block"
				next.style.display = "block"
			})
			this.box.addEventListener('mousemove',()=>{
				clearInterval(this.timer1)
				prev.style.display = "block"
				next.style.display = "block"
			})
			this.box.addEventListener('mouseout',()=>{
				prev.style.display = "none"
				next.style.display = "none"
				this.swiperMove()
			})
			prev.addEventListener("click",()=>{
				this.index--
				if(this.index < 0){
					this.index = imgs.length-1
				}
				for(let i = 0;i < imgs.length;i++){
					imgs[i].style.opacity = "0"
				}
				imgs[this.index].style.opacity = "1"
			})
			next.addEventListener("click",()=>{
				this.index++
				if(this.index > imgs.length-1){
					this.index = 0
				}
				for(let i = 0;i < imgs.length;i++){
					imgs[i].style.opacity = "0"
				}
				imgs[this.index].style.opacity = "1"
			})
		}
	}
	//图片轮播
	swiperMove(){
		let imgs = this.swiperSlide
		clearInterval(this.timer1)
		this.timer1 = setInterval(()=>{
			this.index++
			if(this.index >= imgs.length){
				this.index = 0
			}
			for(let i = 0;i < imgs.length;i++){
				imgs[i].style.opacity = "0"
			}
			imgs[this.index].style.opacity = "1"
			if(this.defaults["pagination"]){
				let lis = this.swiperWrap.nextElementSibling.firstElementChild.children
				for(let j = 0;j < lis.length;j++){
					lis[j].style.backgroundColor = ""
				}
				lis[this.index].style.backgroundColor = '#fff'
			}
		},this.defaults["timer"])
	}
}
//


/////////
class SwiperOpa2{
	constructor(ele,options) {
	    this.ele = ele
		//获取操作对象
		this.box = document.querySelector(this.ele)
		this.box.style.position = "relative"
		this.swiperWrap = this.box.querySelector('.swiper-wrapper')
		this.swiperSlide = this.swiperWrap.querySelectorAll('.swiper-slide')
		//获取图片宽高
		/* this.imgsHeight= this.swiperSlide[0].firstElementChild.offsetHeight
		this.imgsWidth= this.swiperSlide[0].firstElementChild.offsetWidth */
		this.imgsHeight= 120
		this.imgsWidth = 1200
		//默认值
		this.index = 0
		//定时器
		this.timer1 = null
		//获取传入参数
		this.options = options || {}
		//默认参数
		this.defaults = {
			timer:3000,
			pagination: "",
			prev:"",
			next:""
		}
		//入口函数
		this.into()
	}
	into(){
		this.updateDefault()
		this.swiperStyle()
		this.onPag()
		this.onSwith()
		this.swiperMove()
	}
	//替换默认参数
	updateDefault(){
	    if(this.options){
	        //替换数据信息
	        for(let attr in this.options){
	            //使用传入的数据替换默认值
	            this.defaults[attr]=this.options[attr]     
	        }
	    }
	}
	//设置样式
	swiperStyle(){
		setCss(this.swiperWrap,{
			width:parseInt(this.imgsWidth)+"px",
			height:parseInt(this.imgsHeight)+'px',
			overflow:"hidden",
		})
		for(let i = 0;i < this.swiperSlide.length;i++){
			setCss(this.swiperSlide[i],{
				width:this.imgsWidth+"px",
				height:this.imgsHeight+'px',
				position:"absolute",
				opacity:0,
				transition:"all 1s"
			})
			setCss(this.swiperSlide[i].firstElementChild,{
				width:this.imgsWidth+"px",
				height:this.imgsHeight+'px',
			})
			this.swiperSlide[i].firstElementChild.setAttribute('index',i)
		}
		//设置分页器样式
		//如果传入了分页器容器对象则给他设置样式
		if(this.defaults["pagination"]){
			//获取分页器容器
			let pag = this.box.querySelector(".swiper-pagination")
			let newUl = document.createElement('ul')
			for(let j = 0;j < this.swiperSlide.length;j++){
				let newLi = document.createElement('li')
				newLi.setAttribute('idx',j)
				setCss(newLi,{
					width:"15px",
					height:"15px",
					borderRadius:"50%",
					float:"left",
					listStyle:"none",
					margin:"0 10px",
					border:"1px solid #ccc"
				})
				newUl.appendChild(newLi)
			}
			//图片长度
			let num = parseInt(this.swiperSlide.length)
			let liW = parseInt(newUl.firstElementChild.style.width)
			let liH = parseInt(newUl.firstElementChild.style.height)
			//li的左右margin值
			let liM = parseInt(newUl.firstElementChild.style.marginLeft)*2
			setCss(newUl,{
				height:liH+'px',
				width:(liW*num+liM*num)+20+'px',
			})
			pag.appendChild(newUl)
			setCss(pag,{
				bottom:"8%",
				left:(this.imgsWidth-(liW*num+liM*num))/2+500+'px',
				position:"absolute"
			})
			newUl.children[this.index].style.backgroundColor = "#fff"
		}
		//设置上一张样式
		if(this.defaults["prev"]){
			let prev = this.box.querySelector('.swiper-prev')
			setCss(prev,{
				fontSize:"24px",
				textAlign:"center",
				width:this.imgsWidth*0.1+'px',
				height:(this.imgsHeight*0.2-this.imgsHeight*0.06)+'px',
				position:"absolute",
				left:"5px",
				top:(this.imgsHeight-this.imgsHeight*0.2)/2+'px',
				borderRadius:"5px",
				paddingTop:this.imgsHeight*0.06+"px",
				display:"none",
				cursor:"pointer",
				backgroundColor:"#cccccc99"
			})
			prev.innerText = '<'
		}
		//设置下一张样式
		if(this.defaults["next"]){
			let next = this.box.querySelector('.swiper-next')
			 setCss(next,{
				content:">",
				fontSize:"24px",
				textAlign:"center",
				width:this.imgsWidth*0.1+'px',
				height:(this.imgsHeight*0.2-this.imgsHeight*0.06)+'px',
				position:"absolute",
				right:"5px",
				top:(this.imgsHeight-this.imgsHeight*0.2)/2+'px',
				borderRadius:"5px",
				paddingTop:this.imgsHeight*0.06+"px",
				display:"none",
				cursor:"pointer",
				backgroundColor:"#cccccc99"
			 })
			 next.innerText = '>'
		}
		this.swiperSlide[this.index].style.opacity = '1'
	}
	//点击分页器
	onPag(){
		if(this.defaults["pagination"]){
			let pag = this.box.querySelector(".swiper-pagination")
			let imgs = this.swiperSlide
			let lis = pag.firstElementChild.children
			for(let i = 0;i < lis.length;i++){
				lis[i].addEventListener('click',()=>{
					this.index = i
					for(let i = 0;i < imgs.length;i++){
						imgs[i].style.opacity = "0"
						lis[i].style.backgroundColor = ''
					}
					lis[this.index].style.backgroundColor = "#fff"
					imgs[this.index].style.opacity = '1'
					this.swiperMove()
				})
			}
		}
	}
	//点击切换图片
	onSwith(){
		if(this.defaults["pagination"] && this.defaults["prev"] && this.defaults["next"]){
			let prev = this.box.querySelector('.swiper-prev')
			let next = this.box.querySelector('.swiper-next')
			let imgs = this.swiperSlide
			let pag = this.box.querySelector(".swiper-pagination")
			let lis = pag.firstElementChild.children
			this.box.addEventListener('mouseover',()=>{
				clearInterval(this.timer1)
				prev.style.display = "block"
				next.style.display = "block"
			})
			this.box.addEventListener('mouseout',()=>{
				prev.style.display = "none"
				next.style.display = "none"
				this.swiperMove()
			})
			prev.addEventListener("click",()=>{
				this.index--
				if(this.index < 0){
					this.index = 4
				}
				for(let i = 0;i < imgs.length;i++){
					imgs[i].style.opacity = "0"
					lis[i].style.backgroundColor = '#fff'
				}
				imgs[this.index].style.opacity = "1"
				lis[this.index].style.backgroundColor = "#0000ff"
			})
			next.addEventListener("click",()=>{
				this.index++
				if(this.index > 4){
					this.index = 0
				}
				for(let i = 0;i < imgs.length;i++){
					imgs[i].style.opacity = "0"
					lis[i].style.backgroundColor = '#fff'
				}
				imgs[this.index].style.opacity = "1"
				lis[this.index].style.backgroundColor = "#0000ff"
			})
		}
		if(this.defaults["prev"] && this.defaults["next"]){
			let prev = this.box.querySelector('.swiper-prev')
			let next = this.box.querySelector('.swiper-next')
			let imgs = this.swiperSlide
			this.box.addEventListener('mouseover',()=>{
				clearInterval(this.timer1)
				prev.style.display = "block"
				next.style.display = "block"
			})
			this.box.addEventListener('mouseout',()=>{
				prev.style.display = "none"
				next.style.display = "none"
				this.swiperMove()
			})
			prev.addEventListener("click",()=>{
				this.index--
				if(this.index < 0){
					this.index = 4
				}
				for(let i = 0;i < imgs.length;i++){
					imgs[i].style.opacity = "0"
				}
				imgs[this.index].style.opacity = "1"
			})
			next.addEventListener("click",()=>{
				this.index++
				if(this.index > 4){
					this.index = 0
				}
				for(let i = 0;i < imgs.length;i++){
					imgs[i].style.opacity = "0"
				}
				imgs[this.index].style.opacity = "1"
			})
		}
	}
	//图片轮播
	swiperMove(){
		let imgs = this.swiperSlide
		clearInterval(this.timer1)
		this.timer1 = setInterval(()=>{
			this.index++
			if(this.index >= imgs.length){
				this.index = 0
			}
			for(let i = 0;i < imgs.length;i++){
				imgs[i].style.opacity = "0"
			}
			imgs[this.index].style.opacity = "1"
			if(this.defaults["pagination"]){
				let lis = this.swiperWrap.nextElementSibling.firstElementChild.children
				for(let j = 0;j < lis.length;j++){
					lis[j].style.backgroundColor = ""
				}
				lis[this.index].style.backgroundColor = '#fff'
			}
		},this.defaults["timer"])
	}
}

//给该对象设置对应的样式
function setCss(ele,options){
    //遍历所有需要设置的样式
    for(let attr in options){
        ele.style[attr]=options[attr]
    }
}