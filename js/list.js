//获取传递的search值
var s = window.location.search.split("=")[1]
//获取操作对象
var list = document.querySelector('.lists')
var listTop = list.querySelector('.lists-top')
var listBottom = list.querySelector('.lists-bottom')
//路径导航
var routenav = document.querySelector('.routenav')
//分页器对象
var pag = document.querySelector('.pagination')
//判断s值是否为空,为空则让它回到首页
if(s){
	//通过ajax得到数据
	(async function(){
		var dt = await promiseAjax({
			url:"../php/list.php",
			datatype:"json"
		})
		dt.forEach(itme=>{
			//判断是否keys传入的search值与数组元素的keys值相等
			if(itme[0].keys == s){
				//渲染路径导航
				let routenavStr = `
					<ol class="breadcrumb clearfix">
					  <li><a href="./index.html">首页</a><i class="iconfont icon-you"></i></li>
					  <li><a href="javascript:;">${itme[0].keymain}</a></li>
					</ol>
				`
				routenav.innerHTML = routenavStr
				//渲染选择框
				let listTopStr = `
					<ol>
						<li>
							<span>分类:</span>
							<u>${itme[0].keymain}</u>
						</li>
						<li>
							<span>选择类型:</span>
							<a href="javascript:;">赠送积分</a>
							<a href="javascript:;">一站式换新</a>
							<a href="javascript:;">分期免息</a>
						</li>
						<li>
							<span>好评率:</span>
							<a href="javascript:;">99%以上</a>
							<a href="javascript:;">98%及以下</a>
						</li>
						<li class="clearfix">
							<span>排序:</span>
							<div id="prices">
								<a href="javascript:;" id="priceAsc">价格<i class="iconfont icon-shang"></i></a>
								<a href="javascript:;" id="priceDesc">价格<i class="iconfont icon-arrow-down"></i></a>
							</div>
							<form action="" method="" class="clearfix">
								<div>
									<div>￥:<input type="text" name="priceMin" id="priceMin" /></div>
									<div>￥:<input type="text" name="priceMax" id="priceMax" /></div>
								</div>
								<div>
									<button type="reset">清空</button>
									<button type="button">确定</button>
								</div>
							</form>
						</li>
					</ol>
				`
				listTop.innerHTML = listTopStr
				//判断数据条数是否大于等于20，大于则创建分页器
				if(itme.length >= 20){
					//渲染列表页面并添加分页器
					new Pagination(pag,{
						pageInfo:{
						    pagenum:1,
						    pagesize:20,
						    totalsize:itme.length,
						    totalpage:Math.ceil(itme.length/20)
						},
						textInfo:{
						    first:'<',
						    prev:"←",
						    next:"→",
						    last:">"
						},cb(m){
							//获取当前页需要显示的数据
							let arr = itme.slice((m-1)*20,m*20)
							//创建拼接所有数据的字符串
							let str=''
							arr.forEach(val=>{
								//判断是否有货
								if(val.num > 0){
									if(val.keyone){
										if(val.keytwo){
											str += `
												<li><a href="./details.html?id=${val.id}">
													<div><em>${val.descr}</em></div>
													<div><img src="${val.imglink}" ></div>
													<h2>${val.title}</h2>
													<h3>￥${val.price}<span>${val.keyone}</span></h3>
													<div><i>${val.keytwo}</i></div>
													<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
												</a></li>
											`
										}else{
											str += `
												<li><a href="./details.html?id=${val.id}">
													<div><em>${val.descr}</em></div>
													<div><img src="${val.imglink}" ></div>
													<h2>${val.title}</h2>
													<h3>￥${val.price}<span>${val.keyone}</span></h3>
													<div></div>
													<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
												</a></li>
											`
										}
									}else{
										if(val.keytwo){
											str += `
												<li><a href="./details.html?id=${val.id}">
													<div><em>${val.descr}</em></div>
													<div><img src="${val.imglink}" ></div>
													<h2>${val.title}</h2>
													<h3>￥${val.price}</h3>
													<div><i>${val.keytwo}</i></div>
													<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
												</a></li>
											`
										}else{
											str += `
												<li><a href="./details.html?id=${val.id}">
													<div><em>${val.descr}</em></div>
													<div><img src="${val.imglink}" ></div>
													<h2>${val.title}</h2>
													<h3>￥${val.price}</h3>
													<div></div>
													<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
												</a></li>
											`
										}
									}
								}else{
									if(val.keyone){
										if(val.keytwo){
											str += `
												<li><a href="./details.html?id=${val.id}">
													<div><em>${val.descr}</em></div>
													<div class="noshop">
														<img src="${val.imglink}" >
														<div>暂时无货</div>
													</div>
													<h2>${val.title}</h2>
													<h3>￥${val.price}<span>${val.keyone}</span></h3>
													<div><i>${val.keytwo}</i></div>
													<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
												</a></li>
											`
										}else{
											str += `
												<li><a href="./details.html?id=${val.id}">
													<div><em>${val.descr}</em></div>
													<div class="noshop">
														<img src="${val.imglink}" >
														<div>暂时无货</div>
													</div>
													<h2>${val.title}</h2>
													<h3>￥${val.price}<span>${val.keyone}</span></h3>
													<div></div>
													<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
												</a></li>
											`
										}
									}else{
										str += `
											<li><a href="./details.html?id=${val.id}">
												<div><em>${val.descr}</em></div>
												<div class="noshop">
													<img src="${val.imglink}" >
													<div>暂时无货</div>
												</div>
												<h2>${val.title}</h2>
												<h3>￥${val.price}</h3>
												<div></div>
												<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
											</a></li>
										`
									}
								}
							})
							listBottom.firstElementChild.innerHTML = str
						}
					})
				}else{
					//创建拼接所有数据的字符串
					let str=''
					itme.forEach(val=>{
						//判断是否有货
						if(val.num > 0){
							if(val.keyone){
								if(val.keytwo){
									str += `
										<li><a href="./details.html?id=${val.id}">
											<div><em>${val.descr}</em></div>
											<div><img src="${val.imglink}" ></div>
											<h2>${val.title}</h2>
											<h3>￥${val.price}<span>${val.keyone}</span></h3>
											<div><i>${val.keytwo}</i></div>
											<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
										</a></li>
									`
								}else{
									str += `
										<li><a href="./details.html?id=${val.id}">
											<div><em>${val.descr}</em></div>
											<div><img src="${val.imglink}" ></div>
											<h2>${val.title}</h2>
											<h3>￥${val.price}<span>${val.keyone}</span></h3>
											<div></div>
											<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
										</a></li>
									`
								}
							}else{
								if(val.keytwo){
									str += `
										<li><a href="./details.html?id=${val.id}">
											<div><em>${val.descr}</em></div>
											<div><img src="${val.imglink}" ></div>
											<h2>${val.title}</h2>
											<h3>￥${val.price}</h3>
											<div><i>${val.keytwo}</i></div>
											<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
										</a></li>
									`
								}else{
									str += `
										<li><a href="./details.html?id=${val.id}">
											<div><em>${val.descr}</em></div>
											<div><img src="${val.imglink}" ></div>
											<h2>${val.title}</h2>
											<h3>￥${val.price}</h3>
											<div></div>
											<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
										</a></li>
									`
								}
							}
						}else{
							if(val.keyone){
								if(val.keytwo){
									str += `
										<li><a href="./details.html?id=${val.id}">
											<div><em>${val.descr}</em></div>
											<div class="noshop">
												<img src="${val.imglink}" >
												<div>暂时无货</div>
											</div>
											<h2>${val.title}</h2>
											<h3>￥${val.price}<span>${val.keyone}</span></h3>
											<div><i>${val.keytwo}</i></div>
											<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
										</a></li>
									`
								}else{
									str += `
										<li><a href="./details.html?id=${val.id}">
											<div><em>${val.descr}</em></div>
											<div class="noshop">
												<img src="${val.imglink}" >
												<div>暂时无货</div>
											</div>
											<h2>${val.title}</h2>
											<h3>￥${val.price}<span>${val.keyone}</span></h3>
											<div></div>
											<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
										</a></li>
									`
								}
							}else{
								str += `
									<li><a href="./details.html?id=${val.id}">
										<div><em>${val.descr}</em></div>
										<div class="noshop">
											<img src="${val.imglink}" >
											<div>暂时无货</div>
										</div>
										<h2>${val.title}</h2>
										<h3>￥${val.price}</h3>
										<div></div>
										<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
									</a></li>
								`
							}
						}
					})
					listBottom.firstElementChild.innerHTML = str
				}
				//给选择框对象添加点击事件
				listTop.addEventListener("click",function(e){
					var e = e || window.event
					var target = e.target || e.srcElement
					//判断是否点击的是赠送积分
					if(target.innerHTML == "赠送积分"){
						// 遍历获取的keytwo值等于赠送积分
						let ar1 = itme.filter(zsjf=>{
							return zsjf.keytwo == target.innerHTML
						})
						//判断ar1是大于20，大于20代表所选需要分页器来显示渲染结果
						if(ar1.length > 20){
							// 清空分页器
							pag.innerHTML = ""
							//渲染列表页面并添加分页器
							new Pagination(pag,{
								pageInfo:{
								    pagenum:1,
								    pagesize:20,
								    totalsize:ar1.length,
								    totalpage:Math.ceil(ar1.length/20)
								},
								textInfo:{
								    first:'<',
								    prev:"←",
								    next:"→",
								    last:">"
								},cb(m){
									let str1 = ''
									//获取当前页需要显示的数据
									let arrs = ar1.slice((m-1)*20,m*20)
									arrs.forEach(zs=>{
										//判断是否有货
										if(zs.num > 0){
											str1 += `
												<li><a href="./details.html?id=${zs.id}">
													<div><em>${zs.descr}</em></div>
													<div><img src="${zs.imglink}" ></div>
													<h2>${zs.title}</h2>
													<h3>￥${zs.price}<span>${zs.keyone}</span></h3>
													<div><i>${zs.keytwo}</i></div>
													<div><u>${zs.pinglun}</u><u>${zs.haoping}</u></div>
												</a></li>
											`
										}else{
											str1 += `
												<li><a href="./details.html?id=${zs.id}">
													<div><em>${zs.descr}</em></div>
													<div class="noshop">
														<img src="${zs.imglink}" >
														<div>暂时无货</div>
													</div>
													<h2>${zs.title}</h2>
													<h3>￥${zs.price}<span>${zs.keyone}</span></h3>
													<div><i>${zs.keytwo}</i></div>
													<div><u>${zs.pinglun}</u><u>${zs.haoping}</u></div>
												</a></li>
											`
										}
									})
									listBottom.firstElementChild.innerHTML = str1
								}
							})
						}else if(ar1.length > 0){
							//清空分页器
							pag.innerHTML = ''
							let str1 = ''
							ar1.forEach(zs=>{
								//判断是否有货
								if(zs.num > 0){
									str1 += `
										<li><a href="./details.html?id=${zs.id}">
											<div><em>${zs.descr}</em></div>
											<div><img src="${zs.imglink}" ></div>
											<h2>${zs.title}</h2>
											<h3>￥${zs.price}<span>${zs.keyone}</span></h3>
											<div><i>${zs.keytwo}</i></div>
											<div><u>${zs.pinglun}</u><u>${zs.haoping}</u></div>
										</a></li>
									`
								}else{
									str1 += `
										<li><a href="./details.html?id=${zs.id}">
											<div><em>${zs.descr}</em></div>
											<div class="noshop">
												<img src="${zs.imglink}" >
												<div>暂时无货</div>
											</div>
											<h2>${zs.title}</h2>
											<h3>￥${zs.price}<span>${zs.keyone}</span></h3>
											<div><i>${zs.keytwo}</i></div>
											<div><u>${zs.pinglun}</u><u>${zs.haoping}</u></div>
										</a></li>
									`
								}
							})
							listBottom.firstElementChild.innerHTML = str1
						}else{
							//清空分页器
							pag.innerHTML = ''
							listBottom.firstElementChild.innerHTML = `
								<div class="isnot">
									<h2>找不到您想要的商品，换一个试试吧！</h2>
								</div>
							`
						}
					}
					//判断是否点击的是一站式换新
					if(target.innerHTML == "一站式换新"){
						// 遍历获取的keytwo值等于一站式换新
						let ar2 = itme.filter(yzshx=>{
							return yzshx.keytwo == target.innerHTML
						})
						//判断数据长度是否大于20
						if(ar2.length > 20){
							// 清空分页器
							pag.innerHTML = ""
							//渲染列表页面并添加分页器
							new Pagination(pag,{
								pageInfo:{
								    pagenum:1,
								    pagesize:20,
								    totalsize:ar2.length,
								    totalpage:Math.ceil(ar2.length/20)
								},
								textInfo:{
								    first:'<',
								    prev:"←",
								    next:"→",
								    last:">"
								},cb(m){
									let str2 = ''
									//获取当前页需要显示的数据
									let arrs = ar2.slice((m-1)*20,m*20)
									arrs.forEach(yz=>{
										if(yz.num > 0){
											str2 += `
												<li><a href="./details.html?id=${yz.id}">
													<div><em>${yz.descr}</em></div>
													<div><img src="${yz.imglink}" ></div>
													<h2>${yz.title}</h2>
													<h3>￥${yz.price}<span>${yz.keyone}</span></h3>
													<div><i>${yz.keytwo}</i></div>
													<div><u>${yz.pinglun}</u><u>${yz.haoping}</u></div>
												</a></li>
											`
										}else{
											str2 += `
												<li><a href="./details.html?id=${yz.id}">
													<div><em>${yz.descr}</em></div>
													<div class="noshop">
														<img src="${yz.imglink}" >
														<div>暂时无货</div>
													</div>
													<h2>${yz.title}</h2>
													<h3>￥${yz.price}<span>${yz.keyone}</span></h3>
													<div><i>${yz.keytwo}</i></div>
													<div><u>${yz.pinglun}</u><u>${yz.haoping}</u></div>
												</a></li>
											`
										}
									})
									listBottom.firstElementChild.innerHTML = str2
								}
							})
						}else if(ar2.length > 0){
							//清空分页器
							pag.innerHTML = ''
							let str2 = ''
							ar2.forEach(yz=>{
								if(yz.num > 0){
									str2 += `
										<li><a href="./details.html?id=${yz.id}">
											<div><em>${yz.descr}</em></div>
											<div><img src="${yz.imglink}" ></div>
											<h2>${yz.title}</h2>
											<h3>￥${yz.price}<span>${yz.keyone}</span></h3>
											<div><i>${yz.keytwo}</i></div>
											<div><u>${yz.pinglun}</u><u>${yz.haoping}</u></div>
										</a></li>
									`
								}else{
									str2 += `
										<li><a href="./details.html?id=${yz.id}">
											<div><em>${yz.descr}</em></div>
											<div class="noshop">
												<img src="${yz.imglink}" >
												<div>暂时无货</div>
											</div>
											<h2>${yz.title}</h2>
											<h3>￥${yz.price}<span>${yz.keyone}</span></h3>
											<div><i>${yz.keytwo}</i></div>
											<div><u>${yz.pinglun}</u><u>${yz.haoping}</u></div>
										</a></li>
									`
								}
							})
							listBottom.firstElementChild.innerHTML = str2
						}else{
							//清空分页器
							pag.innerHTML = ''
							listBottom.firstElementChild.innerHTML = `
								<div class="isnot">
									<h2>找不到您想要的商品，换一个试试吧！</h2>
								</div>
							`
						}
					}
					//判断是否点击的是分期免息
					if(target.innerHTML == "分期免息"){
						// 遍历获取的keytwo值等于分期免息
						let ar3 = itme.filter(fqmx=>{
							return fqmx.keytwo == target.innerHTML
						})
						if(ar3.length > 20){
							// 清空分页器
							pag.innerHTML = ""
							//渲染列表页面并添加分页器
							new Pagination(pag,{
								pageInfo:{
								    pagenum:1,
								    pagesize:20,
								    totalsize:ar3.length,
								    totalpage:Math.ceil(ar3.length/20)
								},
								textInfo:{
								    first:'<',
								    prev:"←",
								    next:"→",
								    last:">"
								},cb(m){
									let str3 = ''
									//获取当前页需要显示的数据
									let arrs = ar3.slice((m-1)*20,m*20)
									arrs.forEach(fq=>{
										if(fq.num > 0){
											str3 += `
												<li><a href="./details.html?id=${fq.id}">
													<div><em>${fq.descr}</em></div>
													<div><img src="${fq.imglink}" ></div>
													<h2>${fq.title}</h2>
													<h3>￥${fq.price}<span>${fq.keyone}</span></h3>
													<div><i>${fq.keytwo}</i></div>
													<div><u>${fq.pinglun}</u><u>${fq.haoping}</u></div>
												</a></li>
											`
										}else{
											str3 += `
												<li><a href="./details.html?id=${fq.id}">
													<div><em>${fq.descr}</em></div>
													<div class="noshop">
														<img src="${fq.imglink}" >
														<div>暂时无货</div>
													</div>
													<h2>${fq.title}</h2>
													<h3>￥${fq.price}<span>${fq.keyone}</span></h3>
													<div><i>${fq.keytwo}</i></div>
													<div><u>${fq.pinglun}</u><u>${fq.haoping}</u></div>
												</a></li>
											`
										}
									})
									listBottom.firstElementChild.innerHTML = str3
								}
							})
						}else if(ar3.length > 0){
							//清空分页器
							pag.innerHTML = ''
							let str3 = ''
							ar3.forEach(fq=>{
								if(fq.num > 0){
									str3 += `
										<li><a href="./details.html?id=${fq.id}">
											<div><em>${fq.descr}</em></div>
											<div><img src="${fq.imglink}" ></div>
											<h2>${fq.title}</h2>
											<h3>￥${fq.price}<span>${fq.keyone}</span></h3>
											<div><i>${fq.keytwo}</i></div>
											<div><u>${fq.pinglun}</u><u>${fq.haoping}</u></div>
										</a></li>
									`
								}else{
									str3 += `
										<li><a href="./details.html?id=${fq.id}">
											<div><em>${fq.descr}</em></div>
											<div class="noshop">
												<img src="${fq.imglink}" >
												<div>暂时无货</div>
											</div>
											<h2>${fq.title}</h2>
											<h3>￥${fq.price}<span>${fq.keyone}</span></h3>
											<div><i>${fq.keytwo}</i></div>
											<div><u>${fq.pinglun}</u><u>${fq.haoping}</u></div>
										</a></li>
									`
								}
							})
							listBottom.firstElementChild.innerHTML = str3
						}else{
							//清空分页器
							pag.innerHTML = ''
							listBottom.firstElementChild.innerHTML = `
								<div class="isnot">
									<h2>找不到您想要的商品，换一个试试吧！</h2>
								</div>
							`
						}
					}
					//判断是否点击的是99%以上
					if(target.innerHTML == "99%以上"){
						// 遍历获取的keytwo值等于99%以上
						let ar4 = itme.filter(a=>{
							return a.haoping.split("%")[0] >= target.innerHTML.split("%")[0]
						})
						if(ar4.length > 20){
							// 清空分页器
							pag.innerHTML = ""
							//渲染列表页面并添加分页器
							new Pagination(pag,{
								pageInfo:{
								    pagenum:1,
								    pagesize:20,
								    totalsize:ar4.length,
								    totalpage:Math.ceil(ar4.length/20)
								},
								textInfo:{
								    first:'<',
								    prev:"←",
								    next:"→",
								    last:">"
								},cb(m){
									let str4 = ''
									//获取当前页需要显示的数据
									let arrs = ar4.slice((m-1)*20,m*20)
									arrs.forEach(aa=>{
										if(aa.num > 0){
											str4 += `
												<li><a href="./details.html?id=${aa.id}">
													<div><em>${aa.descr}</em></div>
													<div><img src="${aa.imglink}" ></div>
													<h2>${aa.title}</h2>
													<h3>￥${aa.price}<span>${aa.keyone}</span></h3>
													<div><i>${aa.keytwo}</i></div>
													<div><u>${aa.pinglun}</u><u>${aa.haoping}</u></div>
												</a></li>
											`
										}else{
											str4 += `
												<li><a href="./details.html?id=${aa.id}">
													<div><em>${aa.descr}</em></div>
													<div class="noshop">
														<img src="${aa.imglink}" >
														<div>暂时无货</div>
													</div>
													<h2>${aa.title}</h2>
													<h3>￥${aa.price}<span>${aa.keyone}</span></h3>
													<div><i>${aa.keytwo}</i></div>
													<div><u>${aa.pinglun}</u><u>${aa.haoping}</u></div>
												</a></li>
											`
										}
									})
									listBottom.firstElementChild.innerHTML = str4
								}
							})
						}else if(ar4.length > 0){
							// 清空分页器
							pag.innerHTML = ""
							let str4 = ''
							ar4.forEach(aa=>{
								if(aa.num > 0){
									str4 += `
										<li><a href="./details.html?id=${aa.id}">
											<div><em>${aa.descr}</em></div>
											<div><img src="${aa.imglink}" ></div>
											<h2>${aa.title}</h2>
											<h3>￥${aa.price}<span>${aa.keyone}</span></h3>
											<div><i>${aa.keytwo}</i></div>
											<div><u>${aa.pinglun}</u><u>${aa.haoping}</u></div>
										</a></li>
									`
								}else{
									str4 += `
										<li><a href="./details.html?id=${aa.id}">
											<div><em>${aa.descr}</em></div>
											<div class="noshop">
												<img src="${aa.imglink}" >
												<div>暂时无货</div>
											</div>
											<h2>${aa.title}</h2>
											<h3>￥${aa.price}<span>${aa.keyone}</span></h3>
											<div><i>${aa.keytwo}</i></div>
											<div><u>${aa.pinglun}</u><u>${aa.haoping}</u></div>
										</a></li>
									`
								}
							})
							listBottom.firstElementChild.innerHTML = str4
						}else{
							// 清空分页器
							pag.innerHTML = ""
							listBottom.firstElementChild.innerHTML = `
								<div class="isnot">
									<h2>找不到您想要的商品，换一个试试吧！</h2>
								</div>
							`
						}
					}
					//判断是否点击的是98%以下
					if(target.innerHTML == "98%及以下"){
						// 遍历获取的keytwo值等于98%以下
						let ar5 = itme.filter(b=>{
							return b.haoping.split("%")[0] <= target.innerHTML.split("%")[0]
						})
						if(ar5.length > 20){
							// 清空分页器
							pag.innerHTML = ""
							//渲染列表页面并添加分页器
							new Pagination(pag,{
								pageInfo:{
								    pagenum:1,
								    pagesize:20,
								    totalsize:ar5.length,
								    totalpage:Math.ceil(ar5.length/20)
								},
								textInfo:{
								    first:'<',
								    prev:"←",
								    next:"→",
								    last:">"
								},cb(m){
									let str5 = ''
									//获取当前页需要显示的数据
									let arrs = ar5.slice((m-1)*20,m*20)
									arrs.forEach(bb=>{
										if(bb.num > 0){
											str5 += `
												<li><a href="./details.html?id=${bb.id}">
													<div><em>${bb.descr}</em></div>
													<div><img src="${bb.imglink}" ></div>
													<h2>${bb.title}</h2>
													<h3>￥${bb.price}<span>${bb.keyone}</span></h3>
													<div><i>${bb.keytwo}</i></div>
													<div><u>${bb.pinglun}</u><u>${bb.haoping}</u></div>
												</a></li>
											`
										}else{
											str5 += `
												<li><a href="./details.html?id=${bb.id}">
													<div><em>${bb.descr}</em></div>
													<div class="noshop">
														<img src="${bb.imglink}" >
														<div>暂时无货</div>
													</div>
													<h2>${bb.title}</h2>
													<h3>￥${bb.price}<span>${bb.keyone}</span></h3>
													<div><i>${bb.keytwo}</i></div>
													<div><u>${bb.pinglun}</u><u>${bb.haoping}</u></div>
												</a></li>
											`
										}
									})
									listBottom.firstElementChild.innerHTML = str5
								}
							})
						}else if(ar5.length > 0){
							//清空分页器
							pag.innerHTML = ''
							let str5 = ''
							ar5.forEach(bb=>{
								if(bb.num > 0){
									str5 += `
										<li><a href="./details.html?id=${bb.id}">
											<div><em>${bb.descr}</em></div>
											<div><img src="${bb.imglink}" ></div>
											<h2>${bb.title}</h2>
											<h3>￥${bb.price}<span>${bb.keyone}</span></h3>
											<div><i>${bb.keytwo}</i></div>
											<div><u>${bb.pinglun}</u><u>${bb.haoping}</u></div>
										</a></li>
									`
								}else{
									str5 += `
										<li><a href="./details.html?id=${bb.id}">
											<div><em>${bb.descr}</em></div>
											<div class="noshop">
												<img src="${bb.imglink}" >
												<div>暂时无货</div>
											</div>
											<h2>${bb.title}</h2>
											<h3>￥${bb.price}<span>${bb.keyone}</span></h3>
											<div><i>${bb.keytwo}</i></div>
											<div><u>${bb.pinglun}</u><u>${bb.haoping}</u></div>
										</a></li>
									`
								}
							})
							listBottom.firstElementChild.innerHTML = str5
						}else{
							//清空分页器
							pag.innerHTML = ''
							listBottom.firstElementChild.innerHTML = `
								<div class="isnot">
									<h2>找不到您想要的商品，换一个试试吧！</h2>
								</div>
							`
						}
					}
					//判断是否点击的价格
					if(target.innerHTML == "确定"){
						//获取输入框对象
						const priceMin = document.getElementById('priceMin')
						const priceMax = document.getElementById('priceMax')
						//获取相应输入框的值
						let priceMinVal = priceMin.value
						let priceMaxVal = priceMax.value
						//判断两个输入框是否都有值
						if(priceMaxVal.length > 0 && priceMinVal.length > 0){
							//判断输入的值的大小，小的在前大的在后重新赋值给输入框
							if(priceMinVal > priceMaxVal){
								priceMax.value = priceMinVal
								priceMin.value = priceMaxVal
							}
						}
						//存储符合条件的值
						let ar6;
						//第一个第二个输入框都有值
						if(priceMaxVal.length > 0 && priceMinVal.length > 0){
							/* for(let i = 0;i < itme.length;i++){
								if(itme[i].price > Number(priceMinVal) && itme[i].price < Number(priceMaxVal)){
									console.log(itme[i].price)
								}
							} */
							if(priceMinVal < priceMaxVal){
								ar6 = itme.filter(im=>{
									return im.price > parseFloat(priceMinVal) && im.price < parseFloat(priceMaxVal)
								})
							}else{
								ar6 = itme.filter(im=>{
									return im.price > parseFloat(priceMaxVal) && im.price < parseFloat(priceMinVal)
								})
							}
						}else if(priceMinVal.length > 0 && priceMaxVal.length == 0){
							ar6 = itme.filter(im=>{
								return im.price > parseFloat(priceMinVal)
							})
						}else if(priceMinVal.length == 0 && priceMaxVal.length > 0){
							ar6 = itme.filter(im=>{
								return im.price < parseFloat(priceMaxVal)
							})
						}else{
							alert("您还未输入!!!")
							return
						}
						// console.log(ar6)
						// 渲染数据
						if(ar6.length > 20){
							// 清空分页器
							pag.innerHTML = ""
							//渲染列表页面并添加分页器
							new Pagination(pag,{
								pageInfo:{
								    pagenum:1,
								    pagesize:20,
								    totalsize:ar6.length,
								    totalpage:Math.ceil(ar6.length/20)
								},
								textInfo:{
								    first:'<',
								    prev:"←",
								    next:"→",
								    last:">"
								},cb(m){
									let str6 = ''
									//获取当前页需要显示的数据
									let arrs = ar6.slice((m-1)*20,m*20)
									arrs.forEach(bb=>{
										if(bb.num > 0){
											str6 += `
												<li><a href="./details.html?id=${bb.id}">
													<div><em>${bb.descr}</em></div>
													<div><img src="${bb.imglink}" ></div>
													<h2>${bb.title}</h2>
													<h3>￥${bb.price}<span>${bb.keyone}</span></h3>
													<div><i>${bb.keytwo}</i></div>
													<div><u>${bb.pinglun}</u><u>${bb.haoping}</u></div>
												</a></li>
											`
										}else{
											str6 += `
												<li><a href="./details.html?id=${bb.id}">
													<div><em>${bb.descr}</em></div>
													<div class="noshop">
														<img src="${bb.imglink}" >
														<div>暂时无货</div>
													</div>
													<h2>${bb.title}</h2>
													<h3>￥${bb.price}<span>${bb.keyone}</span></h3>
													<div><i>${bb.keytwo}</i></div>
													<div><u>${bb.pinglun}</u><u>${bb.haoping}</u></div>
												</a></li>
											`
										}
									})
									listBottom.firstElementChild.innerHTML = str6
								}
							})
						}else if(ar6.length > 0){
							//清空分页器
							pag.innerHTML = ''
							let str6 = ''
							ar6.forEach(bb=>{
								if(bb.num > 0){
									str6 += `
										<li><a href="./details.html?id=${bb.id}">
											<div><em>${bb.descr}</em></div>
											<div><img src="${bb.imglink}" ></div>
											<h2>${bb.title}</h2>
											<h3>￥${bb.price}<span>${bb.keyone}</span></h3>
											<div><i>${bb.keytwo}</i></div>
											<div><u>${bb.pinglun}</u><u>${bb.haoping}</u></div>
										</a></li>
									`
								}else{
									str6 += `
										<li><a href="./details.html?id=${bb.id}">
											<div><em>${bb.descr}</em></div>
											<div class="noshop">
												<img src="${bb.imglink}" >
												<div>暂时无货</div>
											</div>
											<h2>${bb.title}</h2>
											<h3>￥${bb.price}<span>${bb.keyone}</span></h3>
											<div><i>${bb.keytwo}</i></div>
											<div><u>${bb.pinglun}</u><u>${bb.haoping}</u></div>
										</a></li>
									`
								}
							})
							listBottom.firstElementChild.innerHTML = str6
						}else{
							//清空分页器
							pag.innerHTML = ''
							listBottom.firstElementChild.innerHTML = `
								<div class="isnot">
									<h2>找不到您想要的商品，换一个试试吧！</h2>
								</div>
							`
						}
					}
				})
				//价格升序降序对象
				var priceAsc = document.getElementById('priceAsc')
				var priceDesc = document.getElementById('priceDesc')
				// 给价格升序添加点击事件
				priceAsc.addEventListener('click',function(){
					// 点击之后显示降序
					priceAsc.style.display = "none"
					priceDesc.style.display = "block"
					//将数据复制给ar7进行排序
					let ar7 = itme
					//遍历数据排序
					for(let i = 0;i < ar7.length - 1;i++){
						for(let j = 0;j < ar7.length - 1 - i;j++){
							if(parseFloat(ar7[j].price) > parseFloat(ar7[j+1].price)){
								let aa = ar7[j]
								ar7[j] = ar7[j+1]
								ar7[j+1] = aa
							}
						}
					}
					// 渲染数据
					if(ar7.length > 20){
						// 清空分页器
						pag.innerHTML = ""
						//渲染列表页面并添加分页器
						new Pagination(pag,{
							pageInfo:{
							    pagenum:1,
							    pagesize:20,
							    totalsize:ar7.length,
							    totalpage:Math.ceil(ar7.length/20)
							},
							textInfo:{
							    first:'<',
							    prev:"←",
							    next:"→",
							    last:">"
							},cb(m){
								let str7 = ''
								//获取当前页需要显示的数据
								let arrs = ar7.slice((m-1)*20,m*20)
								arrs.forEach(bb=>{
									if(bb.num > 0){
										str7 += `
											<li><a href="./details.html?id=${bb.id}">
												<div><em>${bb.descr}</em></div>
												<div><img src="${bb.imglink}" ></div>
												<h2>${bb.title}</h2>
												<h3>￥${bb.price}<span>${bb.keyone}</span></h3>
												<div><i>${bb.keytwo}</i></div>
												<div><u>${bb.pinglun}</u><u>${bb.haoping}</u></div>
											</a></li>
										`
									}else{
										str7 += `
											<li><a href="./details.html?id=${bb.id}">
												<div><em>${bb.descr}</em></div>
												<div class="noshop">
													<img src="${bb.imglink}" >
													<div>暂时无货</div>
												</div>
												<h2>${bb.title}</h2>
												<h3>￥${bb.price}<span>${bb.keyone}</span></h3>
												<div><i>${bb.keytwo}</i></div>
												<div><u>${bb.pinglun}</u><u>${bb.haoping}</u></div>
											</a></li>
										`
									}
								})
								listBottom.firstElementChild.innerHTML = str7
							}
						})
					}else if(ar7.length > 0){
						//清空分页器
						pag.innerHTML = ''
						let str7 = ''
						ar7.forEach(bb=>{
							if(bb.num > 0){
								str7 += `
									<li><a href="./details.html?id=${bb.id}">
										<div><em>${bb.descr}</em></div>
										<div><img src="${bb.imglink}" ></div>
										<h2>${bb.title}</h2>
										<h3>￥${bb.price}<span>${bb.keyone}</span></h3>
										<div><i>${bb.keytwo}</i></div>
										<div><u>${bb.pinglun}</u><u>${bb.haoping}</u></div>
									</a></li>
								`
							}else{
								str7 += `
									<li><a href="./details.html?id=${bb.id}">
										<div><em>${bb.descr}</em></div>
										<div class="noshop">
											<img src="${bb.imglink}" >
											<div>暂时无货</div>
										</div>
										<h2>${bb.title}</h2>
										<h3>￥${bb.price}<span>${bb.keyone}</span></h3>
										<div><i>${bb.keytwo}</i></div>
										<div><u>${bb.pinglun}</u><u>${bb.haoping}</u></div>
									</a></li>
								`
							}
						})
						listBottom.firstElementChild.innerHTML = str7
					}else{
						//清空分页器
						pag.innerHTML = ''
						listBottom.firstElementChild.innerHTML = `
							<div class="isnot">
								<h2>找不到您想要的商品，换一个试试吧！</h2>
							</div>
						`
					}
				})
				//给价格降序添加点击事件
				priceDesc.addEventListener('click',function(){
					// 点击之后显示升序
					priceAsc.style.display = "block"
					priceDesc.style.display = "none"
					//将数据复制给ar8进行排序
					let ar8 = itme
					//遍历数据排序
					for(let i = 0;i < ar8.length - 1;i++){
						for(let j = 0;j < ar8.length - 1 - i;j++){
							if(parseFloat(ar8[j].price) < parseFloat(ar8[j+1].price)){
								let aa = ar8[j]
								ar8[j] = ar8[j+1]
								ar8[j+1] = aa
							}
						}
					}
					// 渲染数据
					if(ar8.length > 20){
						// 清空分页器
						pag.innerHTML = ""
						//渲染列表页面并添加分页器
						new Pagination(pag,{
							pageInfo:{
							    pagenum:1,
							    pagesize:20,
							    totalsize:ar8.length,
							    totalpage:Math.ceil(ar8.length/20)
							},
							textInfo:{
							    first:'<',
							    prev:"←",
							    next:"→",
							    last:">"
							},cb(m){
								let str8 = ''
								//获取当前页需要显示的数据
								let arrs = ar8.slice((m-1)*20,m*20)
								arrs.forEach(bb=>{
									if(bb.num > 0){
										str8 += `
											<li><a href="./details.html?id=${bb.id}">
												<div><em>${bb.descr}</em></div>
												<div><img src="${bb.imglink}" ></div>
												<h2>${bb.title}</h2>
												<h3>￥${bb.price}<span>${bb.keyone}</span></h3>
												<div><i>${bb.keytwo}</i></div>
												<div><u>${bb.pinglun}</u><u>${bb.haoping}</u></div>
											</a></li>
										`
									}else{
										str8 += `
											<li><a href="./details.html?id=${bb.id}">
												<div><em>${bb.descr}</em></div>
												<div class="noshop">
													<img src="${bb.imglink}" >
													<div>暂时无货</div>
												</div>
												<h2>${bb.title}</h2>
												<h3>￥${bb.price}<span>${bb.keyone}</span></h3>
												<div><i>${bb.keytwo}</i></div>
												<div><u>${bb.pinglun}</u><u>${bb.haoping}</u></div>
											</a></li>
										`
									}
								})
								listBottom.firstElementChild.innerHTML = str8
							}
						})
					}else if(ar8.length > 0){
						//清空分页器
						pag.innerHTML = ''
						let str8 = ''
						ar8.forEach(bb=>{
							if(bb.num > 0){
								str8 += `
									<li><a href="./details.html?id=${bb.id}">
										<div><em>${bb.descr}</em></div>
										<div><img src="${bb.imglink}" ></div>
										<h2>${bb.title}</h2>
										<h3>￥${bb.price}<span>${bb.keyone}</span></h3>
										<div><i>${bb.keytwo}</i></div>
										<div><u>${bb.pinglun}</u><u>${bb.haoping}</u></div>
									</a></li>
								`
							}else{
								str8 += `
									<li><a href="./details.html?id=${bb.id}">
										<div><em>${bb.descr}</em></div>
										<div class="noshop">
											<img src="${bb.imglink}" >
											<div>暂时无货</div>
										</div>
										<h2>${bb.title}</h2>
										<h3>￥${bb.price}<span>${bb.keyone}</span></h3>
										<div><i>${bb.keytwo}</i></div>
										<div><u>${bb.pinglun}</u><u>${bb.haoping}</u></div>
									</a></li>
								`
							}
						})
						listBottom.firstElementChild.innerHTML = str8
					}else{
						//清空分页器
						pag.innerHTML = ''
						listBottom.firstElementChild.innerHTML = `
							<div class="isnot">
								<h2>找不到您想要的商品，换一个试试吧！</h2>
							</div>
						`
					}
				})
			}
		})
	})()
}else{
	alert("非法进入！！！")
	window.location.href = "./index.html"
}
