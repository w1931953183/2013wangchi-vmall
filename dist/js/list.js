var s=window.location.search.split("=")[1],list=document.querySelector(".lists"),listTop=list.querySelector(".lists-top"),listBottom=list.querySelector(".lists-bottom"),routenav=document.querySelector(".routenav"),pag=document.querySelector(".pagination");s?async function(){(await promiseAjax({url:"../php/list.php",datatype:"json"})).forEach(h=>{if(h[0].keys==s){var i=`
					<ol class="breadcrumb clearfix">
					  <li><a href="./index.html">首页</a><i class="iconfont icon-you"></i></li>
					  <li><a href="javascript:;">${h[0].keymain}</a></li>
					</ol>
				`;routenav.innerHTML=i;i=`
					<ol>
						<li>
							<span>分类:</span>
							<u>${h[0].keymain}</u>
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
				`;if(listTop.innerHTML=i,20<=h.length)new Pagination(pag,{pageInfo:{pagenum:1,pagesize:20,totalsize:h.length,totalpage:Math.ceil(h.length/20)},textInfo:{first:"<",prev:"←",next:"→",last:">"},cb:function(i){let e=h.slice(20*(i-1),20*i),n="";e.forEach(i=>{0<i.num?i.keyone?i.keytwo?n+=`
												<li><a href="./details.html?id=${i.id}">
													<div><em>${i.descr}</em></div>
													<div><img src="${i.imglink}" ></div>
													<h2>${i.title}</h2>
													<h3>￥${i.price}<span>${i.keyone}</span></h3>
													<div><i>${i.keytwo}</i></div>
													<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
												</a></li>
											`:n+=`
												<li><a href="./details.html?id=${i.id}">
													<div><em>${i.descr}</em></div>
													<div><img src="${i.imglink}" ></div>
													<h2>${i.title}</h2>
													<h3>￥${i.price}<span>${i.keyone}</span></h3>
													<div></div>
													<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
												</a></li>
											`:i.keytwo?n+=`
												<li><a href="./details.html?id=${i.id}">
													<div><em>${i.descr}</em></div>
													<div><img src="${i.imglink}" ></div>
													<h2>${i.title}</h2>
													<h3>￥${i.price}</h3>
													<div><i>${i.keytwo}</i></div>
													<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
												</a></li>
											`:n+=`
												<li><a href="./details.html?id=${i.id}">
													<div><em>${i.descr}</em></div>
													<div><img src="${i.imglink}" ></div>
													<h2>${i.title}</h2>
													<h3>￥${i.price}</h3>
													<div></div>
													<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
												</a></li>
											`:i.keyone?i.keytwo?n+=`
												<li><a href="./details.html?id=${i.id}">
													<div><em>${i.descr}</em></div>
													<div class="noshop">
														<img src="${i.imglink}" >
														<div>暂时无货</div>
													</div>
													<h2>${i.title}</h2>
													<h3>￥${i.price}<span>${i.keyone}</span></h3>
													<div><i>${i.keytwo}</i></div>
													<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
												</a></li>
											`:n+=`
												<li><a href="./details.html?id=${i.id}">
													<div><em>${i.descr}</em></div>
													<div class="noshop">
														<img src="${i.imglink}" >
														<div>暂时无货</div>
													</div>
													<h2>${i.title}</h2>
													<h3>￥${i.price}<span>${i.keyone}</span></h3>
													<div></div>
													<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
												</a></li>
											`:n+=`
											<li><a href="./details.html?id=${i.id}">
												<div><em>${i.descr}</em></div>
												<div class="noshop">
													<img src="${i.imglink}" >
													<div>暂时无货</div>
												</div>
												<h2>${i.title}</h2>
												<h3>￥${i.price}</h3>
												<div></div>
												<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
											</a></li>
										`}),listBottom.firstElementChild.innerHTML=n}});else{let e="";h.forEach(i=>{0<i.num?i.keyone?i.keytwo?e+=`
										<li><a href="./details.html?id=${i.id}">
											<div><em>${i.descr}</em></div>
											<div><img src="${i.imglink}" ></div>
											<h2>${i.title}</h2>
											<h3>￥${i.price}<span>${i.keyone}</span></h3>
											<div><i>${i.keytwo}</i></div>
											<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
										</a></li>
									`:e+=`
										<li><a href="./details.html?id=${i.id}">
											<div><em>${i.descr}</em></div>
											<div><img src="${i.imglink}" ></div>
											<h2>${i.title}</h2>
											<h3>￥${i.price}<span>${i.keyone}</span></h3>
											<div></div>
											<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
										</a></li>
									`:i.keytwo?e+=`
										<li><a href="./details.html?id=${i.id}">
											<div><em>${i.descr}</em></div>
											<div><img src="${i.imglink}" ></div>
											<h2>${i.title}</h2>
											<h3>￥${i.price}</h3>
											<div><i>${i.keytwo}</i></div>
											<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
										</a></li>
									`:e+=`
										<li><a href="./details.html?id=${i.id}">
											<div><em>${i.descr}</em></div>
											<div><img src="${i.imglink}" ></div>
											<h2>${i.title}</h2>
											<h3>￥${i.price}</h3>
											<div></div>
											<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
										</a></li>
									`:i.keyone?i.keytwo?e+=`
										<li><a href="./details.html?id=${i.id}">
											<div><em>${i.descr}</em></div>
											<div class="noshop">
												<img src="${i.imglink}" >
												<div>暂时无货</div>
											</div>
											<h2>${i.title}</h2>
											<h3>￥${i.price}<span>${i.keyone}</span></h3>
											<div><i>${i.keytwo}</i></div>
											<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
										</a></li>
									`:e+=`
										<li><a href="./details.html?id=${i.id}">
											<div><em>${i.descr}</em></div>
											<div class="noshop">
												<img src="${i.imglink}" >
												<div>暂时无货</div>
											</div>
											<h2>${i.title}</h2>
											<h3>￥${i.price}<span>${i.keyone}</span></h3>
											<div></div>
											<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
										</a></li>
									`:e+=`
									<li><a href="./details.html?id=${i.id}">
										<div><em>${i.descr}</em></div>
										<div class="noshop">
											<img src="${i.imglink}" >
											<div>暂时无货</div>
										</div>
										<h2>${i.title}</h2>
										<h3>￥${i.price}</h3>
										<div></div>
										<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
									</a></li>
								`}),listBottom.firstElementChild.innerHTML=e}listTop.addEventListener("click",function(i){var e=(i=i||window.event).target||i.srcElement;if("赠送积分"==e.innerHTML){let d=h.filter(i=>i.keytwo==e.innerHTML);if(20<d.length)pag.innerHTML="",new Pagination(pag,{pageInfo:{pagenum:1,pagesize:20,totalsize:d.length,totalpage:Math.ceil(d.length/20)},textInfo:{first:"<",prev:"←",next:"→",last:">"},cb:function(i){let e="",n=d.slice(20*(i-1),20*i);n.forEach(i=>{0<i.num?e+=`
												<li><a href="./details.html?id=${i.id}">
													<div><em>${i.descr}</em></div>
													<div><img src="${i.imglink}" ></div>
													<h2>${i.title}</h2>
													<h3>￥${i.price}<span>${i.keyone}</span></h3>
													<div><i>${i.keytwo}</i></div>
													<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
												</a></li>
											`:e+=`
												<li><a href="./details.html?id=${i.id}">
													<div><em>${i.descr}</em></div>
													<div class="noshop">
														<img src="${i.imglink}" >
														<div>暂时无货</div>
													</div>
													<h2>${i.title}</h2>
													<h3>￥${i.price}<span>${i.keyone}</span></h3>
													<div><i>${i.keytwo}</i></div>
													<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
												</a></li>
											`}),listBottom.firstElementChild.innerHTML=e}});else if(0<d.length){let e=pag.innerHTML="";d.forEach(i=>{0<i.num?e+=`
										<li><a href="./details.html?id=${i.id}">
											<div><em>${i.descr}</em></div>
											<div><img src="${i.imglink}" ></div>
											<h2>${i.title}</h2>
											<h3>￥${i.price}<span>${i.keyone}</span></h3>
											<div><i>${i.keytwo}</i></div>
											<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
										</a></li>
									`:e+=`
										<li><a href="./details.html?id=${i.id}">
											<div><em>${i.descr}</em></div>
											<div class="noshop">
												<img src="${i.imglink}" >
												<div>暂时无货</div>
											</div>
											<h2>${i.title}</h2>
											<h3>￥${i.price}<span>${i.keyone}</span></h3>
											<div><i>${i.keytwo}</i></div>
											<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
										</a></li>
									`}),listBottom.firstElementChild.innerHTML=e}else pag.innerHTML="",listBottom.firstElementChild.innerHTML=`
								<div class="isnot">
									<h2>找不到您想要的商品，换一个试试吧！</h2>
								</div>
							`}if("一站式换新"==e.innerHTML){let d=h.filter(i=>i.keytwo==e.innerHTML);if(20<d.length)pag.innerHTML="",new Pagination(pag,{pageInfo:{pagenum:1,pagesize:20,totalsize:d.length,totalpage:Math.ceil(d.length/20)},textInfo:{first:"<",prev:"←",next:"→",last:">"},cb:function(i){let e="",n=d.slice(20*(i-1),20*i);n.forEach(i=>{0<i.num?e+=`
												<li><a href="./details.html?id=${i.id}">
													<div><em>${i.descr}</em></div>
													<div><img src="${i.imglink}" ></div>
													<h2>${i.title}</h2>
													<h3>￥${i.price}<span>${i.keyone}</span></h3>
													<div><i>${i.keytwo}</i></div>
													<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
												</a></li>
											`:e+=`
												<li><a href="./details.html?id=${i.id}">
													<div><em>${i.descr}</em></div>
													<div class="noshop">
														<img src="${i.imglink}" >
														<div>暂时无货</div>
													</div>
													<h2>${i.title}</h2>
													<h3>￥${i.price}<span>${i.keyone}</span></h3>
													<div><i>${i.keytwo}</i></div>
													<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
												</a></li>
											`}),listBottom.firstElementChild.innerHTML=e}});else if(0<d.length){let e=pag.innerHTML="";d.forEach(i=>{0<i.num?e+=`
										<li><a href="./details.html?id=${i.id}">
											<div><em>${i.descr}</em></div>
											<div><img src="${i.imglink}" ></div>
											<h2>${i.title}</h2>
											<h3>￥${i.price}<span>${i.keyone}</span></h3>
											<div><i>${i.keytwo}</i></div>
											<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
										</a></li>
									`:e+=`
										<li><a href="./details.html?id=${i.id}">
											<div><em>${i.descr}</em></div>
											<div class="noshop">
												<img src="${i.imglink}" >
												<div>暂时无货</div>
											</div>
											<h2>${i.title}</h2>
											<h3>￥${i.price}<span>${i.keyone}</span></h3>
											<div><i>${i.keytwo}</i></div>
											<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
										</a></li>
									`}),listBottom.firstElementChild.innerHTML=e}else pag.innerHTML="",listBottom.firstElementChild.innerHTML=`
								<div class="isnot">
									<h2>找不到您想要的商品，换一个试试吧！</h2>
								</div>
							`}if("分期免息"==e.innerHTML){let d=h.filter(i=>i.keytwo==e.innerHTML);if(20<d.length)pag.innerHTML="",new Pagination(pag,{pageInfo:{pagenum:1,pagesize:20,totalsize:d.length,totalpage:Math.ceil(d.length/20)},textInfo:{first:"<",prev:"←",next:"→",last:">"},cb:function(i){let e="",n=d.slice(20*(i-1),20*i);n.forEach(i=>{0<i.num?e+=`
												<li><a href="./details.html?id=${i.id}">
													<div><em>${i.descr}</em></div>
													<div><img src="${i.imglink}" ></div>
													<h2>${i.title}</h2>
													<h3>￥${i.price}<span>${i.keyone}</span></h3>
													<div><i>${i.keytwo}</i></div>
													<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
												</a></li>
											`:e+=`
												<li><a href="./details.html?id=${i.id}">
													<div><em>${i.descr}</em></div>
													<div class="noshop">
														<img src="${i.imglink}" >
														<div>暂时无货</div>
													</div>
													<h2>${i.title}</h2>
													<h3>￥${i.price}<span>${i.keyone}</span></h3>
													<div><i>${i.keytwo}</i></div>
													<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
												</a></li>
											`}),listBottom.firstElementChild.innerHTML=e}});else if(0<d.length){let e=pag.innerHTML="";d.forEach(i=>{0<i.num?e+=`
										<li><a href="./details.html?id=${i.id}">
											<div><em>${i.descr}</em></div>
											<div><img src="${i.imglink}" ></div>
											<h2>${i.title}</h2>
											<h3>￥${i.price}<span>${i.keyone}</span></h3>
											<div><i>${i.keytwo}</i></div>
											<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
										</a></li>
									`:e+=`
										<li><a href="./details.html?id=${i.id}">
											<div><em>${i.descr}</em></div>
											<div class="noshop">
												<img src="${i.imglink}" >
												<div>暂时无货</div>
											</div>
											<h2>${i.title}</h2>
											<h3>￥${i.price}<span>${i.keyone}</span></h3>
											<div><i>${i.keytwo}</i></div>
											<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
										</a></li>
									`}),listBottom.firstElementChild.innerHTML=e}else pag.innerHTML="",listBottom.firstElementChild.innerHTML=`
								<div class="isnot">
									<h2>找不到您想要的商品，换一个试试吧！</h2>
								</div>
							`}if("99%以上"==e.innerHTML){let d=h.filter(i=>i.haoping.split("%")[0]>=e.innerHTML.split("%")[0]);if(20<d.length)pag.innerHTML="",new Pagination(pag,{pageInfo:{pagenum:1,pagesize:20,totalsize:d.length,totalpage:Math.ceil(d.length/20)},textInfo:{first:"<",prev:"←",next:"→",last:">"},cb:function(i){let e="",n=d.slice(20*(i-1),20*i);n.forEach(i=>{0<i.num?e+=`
												<li><a href="./details.html?id=${i.id}">
													<div><em>${i.descr}</em></div>
													<div><img src="${i.imglink}" ></div>
													<h2>${i.title}</h2>
													<h3>￥${i.price}<span>${i.keyone}</span></h3>
													<div><i>${i.keytwo}</i></div>
													<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
												</a></li>
											`:e+=`
												<li><a href="./details.html?id=${i.id}">
													<div><em>${i.descr}</em></div>
													<div class="noshop">
														<img src="${i.imglink}" >
														<div>暂时无货</div>
													</div>
													<h2>${i.title}</h2>
													<h3>￥${i.price}<span>${i.keyone}</span></h3>
													<div><i>${i.keytwo}</i></div>
													<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
												</a></li>
											`}),listBottom.firstElementChild.innerHTML=e}});else if(0<d.length){let e=pag.innerHTML="";d.forEach(i=>{0<i.num?e+=`
										<li><a href="./details.html?id=${i.id}">
											<div><em>${i.descr}</em></div>
											<div><img src="${i.imglink}" ></div>
											<h2>${i.title}</h2>
											<h3>￥${i.price}<span>${i.keyone}</span></h3>
											<div><i>${i.keytwo}</i></div>
											<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
										</a></li>
									`:e+=`
										<li><a href="./details.html?id=${i.id}">
											<div><em>${i.descr}</em></div>
											<div class="noshop">
												<img src="${i.imglink}" >
												<div>暂时无货</div>
											</div>
											<h2>${i.title}</h2>
											<h3>￥${i.price}<span>${i.keyone}</span></h3>
											<div><i>${i.keytwo}</i></div>
											<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
										</a></li>
									`}),listBottom.firstElementChild.innerHTML=e}else pag.innerHTML="",listBottom.firstElementChild.innerHTML=`
								<div class="isnot">
									<h2>找不到您想要的商品，换一个试试吧！</h2>
								</div>
							`}if("98%及以下"==e.innerHTML){let d=h.filter(i=>i.haoping.split("%")[0]<=e.innerHTML.split("%")[0]);if(20<d.length)pag.innerHTML="",new Pagination(pag,{pageInfo:{pagenum:1,pagesize:20,totalsize:d.length,totalpage:Math.ceil(d.length/20)},textInfo:{first:"<",prev:"←",next:"→",last:">"},cb:function(i){let e="",n=d.slice(20*(i-1),20*i);n.forEach(i=>{0<i.num?e+=`
												<li><a href="./details.html?id=${i.id}">
													<div><em>${i.descr}</em></div>
													<div><img src="${i.imglink}" ></div>
													<h2>${i.title}</h2>
													<h3>￥${i.price}<span>${i.keyone}</span></h3>
													<div><i>${i.keytwo}</i></div>
													<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
												</a></li>
											`:e+=`
												<li><a href="./details.html?id=${i.id}">
													<div><em>${i.descr}</em></div>
													<div class="noshop">
														<img src="${i.imglink}" >
														<div>暂时无货</div>
													</div>
													<h2>${i.title}</h2>
													<h3>￥${i.price}<span>${i.keyone}</span></h3>
													<div><i>${i.keytwo}</i></div>
													<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
												</a></li>
											`}),listBottom.firstElementChild.innerHTML=e}});else if(0<d.length){let e=pag.innerHTML="";d.forEach(i=>{0<i.num?e+=`
										<li><a href="./details.html?id=${i.id}">
											<div><em>${i.descr}</em></div>
											<div><img src="${i.imglink}" ></div>
											<h2>${i.title}</h2>
											<h3>￥${i.price}<span>${i.keyone}</span></h3>
											<div><i>${i.keytwo}</i></div>
											<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
										</a></li>
									`:e+=`
										<li><a href="./details.html?id=${i.id}">
											<div><em>${i.descr}</em></div>
											<div class="noshop">
												<img src="${i.imglink}" >
												<div>暂时无货</div>
											</div>
											<h2>${i.title}</h2>
											<h3>￥${i.price}<span>${i.keyone}</span></h3>
											<div><i>${i.keytwo}</i></div>
											<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
										</a></li>
									`}),listBottom.firstElementChild.innerHTML=e}else pag.innerHTML="",listBottom.firstElementChild.innerHTML=`
								<div class="isnot">
									<h2>找不到您想要的商品，换一个试试吧！</h2>
								</div>
							`}if("确定"==e.innerHTML){const l=document.getElementById("priceMin"),a=document.getElementById("priceMax");var n=l.value,t=a.value;0<t.length&&0<n.length&&t<n&&(a.value=n,l.value=t);let d;if(0<t.length&&0<n.length)d=n<t?h.filter(i=>i.price>parseFloat(n)&&i.price<parseFloat(t)):h.filter(i=>i.price>parseFloat(t)&&i.price<parseFloat(n));else if(0<n.length&&0==t.length)d=h.filter(i=>i.price>parseFloat(n));else{if(!(0==n.length&&0<t.length))return void alert("您还未输入!!!");d=h.filter(i=>i.price<parseFloat(t))}if(20<d.length)pag.innerHTML="",new Pagination(pag,{pageInfo:{pagenum:1,pagesize:20,totalsize:d.length,totalpage:Math.ceil(d.length/20)},textInfo:{first:"<",prev:"←",next:"→",last:">"},cb:function(i){let e="",n=d.slice(20*(i-1),20*i);n.forEach(i=>{0<i.num?e+=`
												<li><a href="./details.html?id=${i.id}">
													<div><em>${i.descr}</em></div>
													<div><img src="${i.imglink}" ></div>
													<h2>${i.title}</h2>
													<h3>￥${i.price}<span>${i.keyone}</span></h3>
													<div><i>${i.keytwo}</i></div>
													<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
												</a></li>
											`:e+=`
												<li><a href="./details.html?id=${i.id}">
													<div><em>${i.descr}</em></div>
													<div class="noshop">
														<img src="${i.imglink}" >
														<div>暂时无货</div>
													</div>
													<h2>${i.title}</h2>
													<h3>￥${i.price}<span>${i.keyone}</span></h3>
													<div><i>${i.keytwo}</i></div>
													<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
												</a></li>
											`}),listBottom.firstElementChild.innerHTML=e}});else if(0<d.length){let e=pag.innerHTML="";d.forEach(i=>{0<i.num?e+=`
										<li><a href="./details.html?id=${i.id}">
											<div><em>${i.descr}</em></div>
											<div><img src="${i.imglink}" ></div>
											<h2>${i.title}</h2>
											<h3>￥${i.price}<span>${i.keyone}</span></h3>
											<div><i>${i.keytwo}</i></div>
											<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
										</a></li>
									`:e+=`
										<li><a href="./details.html?id=${i.id}">
											<div><em>${i.descr}</em></div>
											<div class="noshop">
												<img src="${i.imglink}" >
												<div>暂时无货</div>
											</div>
											<h2>${i.title}</h2>
											<h3>￥${i.price}<span>${i.keyone}</span></h3>
											<div><i>${i.keytwo}</i></div>
											<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
										</a></li>
									`}),listBottom.firstElementChild.innerHTML=e}else pag.innerHTML="",listBottom.firstElementChild.innerHTML=`
								<div class="isnot">
									<h2>找不到您想要的商品，换一个试试吧！</h2>
								</div>
							`}});var e=document.getElementById("priceAsc"),t=document.getElementById("priceDesc");e.addEventListener("click",function(){e.style.display="none",t.style.display="block";let d=h;for(let e=0;e<d.length-1;e++)for(let i=0;i<d.length-1-e;i++){var n;parseFloat(d[i].price)>parseFloat(d[i+1].price)&&(n=d[i],d[i]=d[i+1],d[i+1]=n)}if(20<d.length)pag.innerHTML="",new Pagination(pag,{pageInfo:{pagenum:1,pagesize:20,totalsize:d.length,totalpage:Math.ceil(d.length/20)},textInfo:{first:"<",prev:"←",next:"→",last:">"},cb:function(i){let e="",n=d.slice(20*(i-1),20*i);n.forEach(i=>{0<i.num?e+=`
											<li><a href="./details.html?id=${i.id}">
												<div><em>${i.descr}</em></div>
												<div><img src="${i.imglink}" ></div>
												<h2>${i.title}</h2>
												<h3>￥${i.price}<span>${i.keyone}</span></h3>
												<div><i>${i.keytwo}</i></div>
												<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
											</a></li>
										`:e+=`
											<li><a href="./details.html?id=${i.id}">
												<div><em>${i.descr}</em></div>
												<div class="noshop">
													<img src="${i.imglink}" >
													<div>暂时无货</div>
												</div>
												<h2>${i.title}</h2>
												<h3>￥${i.price}<span>${i.keyone}</span></h3>
												<div><i>${i.keytwo}</i></div>
												<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
											</a></li>
										`}),listBottom.firstElementChild.innerHTML=e}});else if(0<d.length){let e=pag.innerHTML="";d.forEach(i=>{0<i.num?e+=`
									<li><a href="./details.html?id=${i.id}">
										<div><em>${i.descr}</em></div>
										<div><img src="${i.imglink}" ></div>
										<h2>${i.title}</h2>
										<h3>￥${i.price}<span>${i.keyone}</span></h3>
										<div><i>${i.keytwo}</i></div>
										<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
									</a></li>
								`:e+=`
									<li><a href="./details.html?id=${i.id}">
										<div><em>${i.descr}</em></div>
										<div class="noshop">
											<img src="${i.imglink}" >
											<div>暂时无货</div>
										</div>
										<h2>${i.title}</h2>
										<h3>￥${i.price}<span>${i.keyone}</span></h3>
										<div><i>${i.keytwo}</i></div>
										<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
									</a></li>
								`}),listBottom.firstElementChild.innerHTML=e}else pag.innerHTML="",listBottom.firstElementChild.innerHTML=`
							<div class="isnot">
								<h2>找不到您想要的商品，换一个试试吧！</h2>
							</div>
						`}),t.addEventListener("click",function(){e.style.display="block",t.style.display="none";let d=h;for(let e=0;e<d.length-1;e++)for(let i=0;i<d.length-1-e;i++){var n;parseFloat(d[i].price)<parseFloat(d[i+1].price)&&(n=d[i],d[i]=d[i+1],d[i+1]=n)}if(20<d.length)pag.innerHTML="",new Pagination(pag,{pageInfo:{pagenum:1,pagesize:20,totalsize:d.length,totalpage:Math.ceil(d.length/20)},textInfo:{first:"<",prev:"←",next:"→",last:">"},cb:function(i){let e="",n=d.slice(20*(i-1),20*i);n.forEach(i=>{0<i.num?e+=`
											<li><a href="./details.html?id=${i.id}">
												<div><em>${i.descr}</em></div>
												<div><img src="${i.imglink}" ></div>
												<h2>${i.title}</h2>
												<h3>￥${i.price}<span>${i.keyone}</span></h3>
												<div><i>${i.keytwo}</i></div>
												<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
											</a></li>
										`:e+=`
											<li><a href="./details.html?id=${i.id}">
												<div><em>${i.descr}</em></div>
												<div class="noshop">
													<img src="${i.imglink}" >
													<div>暂时无货</div>
												</div>
												<h2>${i.title}</h2>
												<h3>￥${i.price}<span>${i.keyone}</span></h3>
												<div><i>${i.keytwo}</i></div>
												<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
											</a></li>
										`}),listBottom.firstElementChild.innerHTML=e}});else if(0<d.length){let e=pag.innerHTML="";d.forEach(i=>{0<i.num?e+=`
									<li><a href="./details.html?id=${i.id}">
										<div><em>${i.descr}</em></div>
										<div><img src="${i.imglink}" ></div>
										<h2>${i.title}</h2>
										<h3>￥${i.price}<span>${i.keyone}</span></h3>
										<div><i>${i.keytwo}</i></div>
										<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
									</a></li>
								`:e+=`
									<li><a href="./details.html?id=${i.id}">
										<div><em>${i.descr}</em></div>
										<div class="noshop">
											<img src="${i.imglink}" >
											<div>暂时无货</div>
										</div>
										<h2>${i.title}</h2>
										<h3>￥${i.price}<span>${i.keyone}</span></h3>
										<div><i>${i.keytwo}</i></div>
										<div><u>${i.pinglun}</u><u>${i.haoping}</u></div>
									</a></li>
								`}),listBottom.firstElementChild.innerHTML=e}else pag.innerHTML="",listBottom.firstElementChild.innerHTML=`
							<div class="isnot">
								<h2>找不到您想要的商品，换一个试试吧！</h2>
							</div>
						`})}})}():(alert("非法进入！！！"),window.location.href="./index.html");