// vmall华为商城函数

//列表页页面渲染(分页器对象，数据)
function listRenderer(pag, dt, obj) {
	//判断数据条数是否大于20，大于则创建分页器
	if (dt.length > 20) {
		// 清空分页器
		pag.innerHTML = ""
		//渲染列表页面并添加分页器
		new Pagination(pag, {
			pageInfo: {
				pagenum: 1,
				pagesize: 20,
				totalsize: dt.length,
				totalpage: Math.ceil(dt.length / 20)
			},
			textInfo: {
				first: '<',
				prev: "←",
				next: "→",
				last: ">"
			}, cb(m) {
				//获取当前页需要显示的数据
				let arr = dt.slice((m - 1) * 20, m * 20)
				//创建拼接所有数据的字符串
				let str = ''
				arr.forEach(val => {
					//判断是否有货
					if (val.num > 0) {
						//判断keyone字段有没有数据
						if (val.keyone) {
							//判断keytwo字段有没有数据
							if (val.keytwo) {
								str += `
									<li><a href="./details.html?id=${val.id}&user=${usernum}" target="_blank">
										<div><em>${val.descr}</em></div>
										<div><img src="${val.imglink}" ></div>
										<h2>${val.title}</h2>
										<h3>￥${val.price}<span>${val.keyone}</span></h3>
										<div><i>${val.keytwo}</i></div>
										<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
									</a></li>
								`
							} else {
								str += `
									<li><a href="./details.html?id=${val.id}&user=${usernum}" target="_blank">
										<div><em>${val.descr}</em></div>
										<div><img src="${val.imglink}" ></div>
										<h2>${val.title}</h2>
										<h3>￥${val.price}<span>${val.keyone}</span></h3>
										<div></div>
										<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
									</a></li>
								`
							}
						} else {
							if (val.keytwo) {
								str += `
									<li><a href="./details.html?id=${val.id}&user=${usernum}" target="_blank">
										<div><em>${val.descr}</em></div>
										<div><img src="${val.imglink}" ></div>
										<h2>${val.title}</h2>
										<h3>￥${val.price}</h3>
										<div><i>${val.keytwo}</i></div>
										<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
									</a></li>
								`
							} else {
								str += `
									<li><a href="./details.html?id=${val.id}&user=${usernum}" target="_blank">
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
					} else {
						if (val.keyone) {
							if (val.keytwo) {
								str += `
									<li><a href="./details.html?id=${val.id}&user=${usernum}" target="_blank">
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
							} else {
								str += `
									<li><a href="./details.html?id=${val.id}&user=${usernum}" target="_blank">
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
						} else {
							if (val.keytwo) {
								str += `
									<li><a href="./details.html?id=${val.id}&user=${usernum}" target="_blank">
										<div><em>${val.descr}</em></div>
										<div class="noshop">
											<img src="${val.imglink}" >
											<div>暂时无货</div>
										</div>
										<h2>${val.title}</h2>
										<h3>￥${val.price}</h3>
										<div><i>${val.keytwo}</i></div>
										<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
									</a></li>
								`
							} else {
								str += `
									<li><a href="./details.html?id=${val.id}&user=${usernum}" target="_blank">
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
					}
					obj.innerHTML = str
				})
			}
		})
	} else if (dt.length > 0) {
		// 清空分页器
		pag.innerHTML = ""
		//创建拼接所有数据的字符串
		let str = ''
		dt.forEach(val => {
			//判断是否有货
			if (val.num > 0) {
				if (val.keyone) {
					if (val.keytwo) {
						str += `
							<li><a href="./details.html?id=${val.id}&user=${usernum}" target="_blank">
								<div><em>${val.descr}</em></div>
								<div><img src="${val.imglink}" ></div>
								<h2>${val.title}</h2>
								<h3>￥${val.price}<span>${val.keyone}</span></h3>
								<div><i>${val.keytwo}</i></div>
								<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
							</a></li>
						`
					} else {
						str += `
							<li><a href="./details.html?id=${val.id}&user=${usernum}" target="_blank">
								<div><em>${val.descr}</em></div>
								<div><img src="${val.imglink}" ></div>
								<h2>${val.title}</h2>
								<h3>￥${val.price}<span>${val.keyone}</span></h3>
								<div></div>
								<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
							</a></li>
						`
					}
				} else {
					if (val.keytwo) {
						str += `
							<li><a href="./details.html?id=${val.id}&user=${usernum}" target="_blank">
								<div><em>${val.descr}</em></div>
								<div><img src="${val.imglink}" ></div>
								<h2>${val.title}</h2>
								<h3>￥${val.price}</h3>
								<div><i>${val.keytwo}</i></div>
								<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
							</a></li>
						`
					} else {
						str += `
							<li><a href="./details.html?id=${val.id}&user=${usernum}" target="_blank">
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
			} else {
				if (val.keyone) {
					if (val.keytwo) {
						str += `
							<li><a href="./details.html?id=${val.id}&user=${usernum}" target="_blank">
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
					} else {
						str += `
							<li><a href="./details.html?id=${val.id}&user=${usernum}" target="_blank">
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
				} else {
					if (val.keytwo) {
						str += `
							<li><a href="./details.html?id=${val.id}&user=${usernum}" target="_blank">
								<div><em>${val.descr}</em></div>
								<div class="noshop">
									<img src="${val.imglink}" >
									<div>暂时无货</div>
								</div>
								<h2>${val.title}</h2>
								<h3>￥${val.price}</h3>
								<div><i>${val.keytwo}</i></div>
								<div><u>${val.pinglun}</u><u>${val.haoping}</u></div>
							</a></li>
						`
					} else {
						str += `
							<li><a href="./details.html?id=${val.id}&user=${usernum}" target="_blank">
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
			}
		})
		obj.innerHTML = str
	} else {
		// 清空分页器
		pag.innerHTML = ""
		let str = `
			<div class="isnot">
				<h2>找不到您想要的商品，换一个试试吧！</h2>
			</div>
		`
		obj.innerHTML = str
	}
}

//首页数据渲染(渲染的内容,数据)
function indexRenderer(dt) {
	let str = ''
	/* let arr = []
	//拼接字符串
	for(let i = 0;i < dt.length;i++){
		//判断需要渲染的数据
		dt[i][0].keymain == s
		arr = dt[i]
		break
	} */
	dt.forEach(itme => {
		//判断itme.lable是否有值
		if (itme.lable) {
			str += `
				<li><a href="./details.html?id=${itme.id}&user=${usernum}" target="_blank">
					<div>
						<i>${itme.lable}</i>
					</div>
					<img src="${itme.imglink}">
					<h3>${itme.title}</h3>
					<h4>${itme.descr}</h4>
					<p>￥<span>${itme.price}</span></p>
				</a></li>
			`
		} else {
			str += `
				<li><a href="./details.html?id=${itme.id}&user=${usernum}" target="_blank">
					<div></div>
					<img src="${itme.imglink}">
					<h3>${itme.title}</h3>
					<h4>${itme.descr}</h4>
					<p>￥<span>${itme.price}</span></p>
				</a></li>
			`
		}
	})
	return str
}

//详情页数据渲染
function detailsRenderer(dt) {
	let str = ''
	if (dt.keymain == "手机" || dt.keymain == "精品平板" || dt.keymain == "笔记本") {
		str = `
			<div class="goodsinfo-left">
				<div class="goodsinfo-left-maximg">
					<img src="${dt.imglink}" >
				</div>
				<div class="goodsinfo-left-minimg-a">
					<div class="goodsinfo-left-minimg clearfix">
						<div class="goodsinfo-left-minimg-left">
							&lt;
						</div>
						<div class="goodsinfo-left-minimg-right">
							&gt;
						</div>
						<div class="goodsinfo-left-minimg-box clearfix">
							<ul class="clearfix">
								<li class="goodsli"><img src="${dt.imglink}"></li>
								<li><img src="${dt.imglink}"></li>
								<li><img src="${dt.imglink}"></li>
								<li><img src="${dt.imglink}"></li>
								<li><img src="${dt.imglink}"></li>
								<li><img src="${dt.imglink}"></li>
								<li><img src="${dt.imglink}"></li>
								<li><img src="${dt.imglink}"></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="goodsinfo-right">
				<h2>${dt.title}</h2>
				<h3><span>【${dt.lable}】</span>${dt.title}</h3>
				<div class="goodsinfo-right-price">
					<div>
						<span>价格</span>
						<em>￥${dt.price}</em>
					</div>
					<div>
						<span>促销</span>
						<u>赠送积分</u>
						<i>购买即赠商城积分，积分可抵现~</i>
					</div>
				</div>
				<div class="goodsinfo-right-fuwu">
					<div>
						<span>服务说明</span>
						<i>预计2021-03-15前发货</i>
						<strong>?
							<div>订单按照支付顺序发货，预计发货时间在支付全部完成前可能变更;预计发货时间根据商品库存信息计算得出，受诸多因素影响可能会产生偏差，我们会为您积极备货。</div>
						</strong>
					</div>
					<div>
						<span>&nbsp;</span>
						<i class="iconfont">&#xe6cf;&nbsp;已满48元已免运费</i>
						<i class="iconfont">&#xe6cf;&nbsp;由华为商城负责发货，并提供售后服务</i>
					</div>
					<div>
						<span>商品编码</span>
						<i>${dt.comcode}</i>
					</div>
				</div>
				<div class="goodsinfo-right-class">
					<div class="clearfix">
						<span>选择颜色</span>
						<i class="goodsinfo-right-class-borshow"><img src="${dt.imglink}" >${dt.typeone}</i>
						<i><img src="${dt.imglink}" >${dt.typetwo}</i>
						<i><img src="${dt.imglink}" >${dt.typethree}</i>
					</div>
					<div class="clearfix">
						<span>选择版本</span>
						<i class="goodsinfo-right-class-borshow">5G全网通6GB+128GB</i>
						<i>5G全网通8GB+128GB</i>
					</div>
					<div class="clearfix">
						<span>选择套餐</span>
						<i class="goodsinfo-right-class-borshow">官方标配</i>
					</div>
					<div class="clearfix">
						<span>保障服务</span>
						<i>碎屏服务宝1年￥229
						<div class="clearfix">
							<div>
								<input type="checkbox" name="" id="" />碎屏服务宝1年&nbsp;￥229&nbsp;&nbsp;<u>详情></u>
							</div>
							<div></div>
						</div>
						</i>
						<i>延长服务宝1年￥128
						<div class="clearfix">
							<div>
								<input type="checkbox" name="" id="" />延长服务宝1年&nbsp;￥128&nbsp;&nbsp;<u>详情></u>
							</div>
							<div>
								<input type="checkbox" name="" id="" />延长服务宝半年&nbsp;￥68&nbsp;&nbsp;<u>详情></u>
							</div>
						</div>
						</i>
					</div>
					<div class="clearfix">
						<span>推荐</span>
						<i><a href="./details.html?id=${dt.tuijianoneid}&user=${usernum}">${dt.tuijianone}</a></i>
						<i><a href="./details.html?id=${dt.tuijiantwoid}&user=${usernum}">${dt.tuijiantwo}</a></i>
						<i><a href="./details.html?id=${dt.tuijianthreeid}&user=${usernum}">${dt.tuijianthree}</a></i>
					</div>
					<div>
						<span>已选择商品:</span>
						<u> 幻夜黑/4G全网通8GB+128GB/官方标配</u>
					</div>
					<div class="clearfix">
						<div>
							<a href="javascript:;">1</a>
							<a href="javascript:;" name="jia" class="iconfont">&#xe609;</a>
							<a href="javascript:;" name="jian" class="iconfont">&#xe617;</a>
						</div>
		`
		if (dt.num > 0) {
			str += `
				<div><a href="javascript:;">加入购物车</a></div>
						</div>
					</div>
				</div>
			`
		} else {
			str += `
				<div><a href="javascript:;">到货提示</a></div>
						</div>
					</div>
				</div>
			`
		}
		return str
	} else {
		str = `
			<div class="goodsinfo-left">
				<div class="goodsinfo-left-maximg">
					<img src="${dt.imglink}" >
				</div>
				<div class="goodsinfo-left-minimg-a">
					<div class="goodsinfo-left-minimg clearfix">
						<div class="goodsinfo-left-minimg-left">
							&lt;
						</div>
						<div class="goodsinfo-left-minimg-right">
							&gt;
						</div>
						<div class="goodsinfo-left-minimg-box clearfix">
							<ul class="clearfix">
								<li class="goodsli"><img src="${dt.imglink}"></li>
								<li><img src="${dt.imglink}"></li>
								<li><img src="${dt.imglink}"></li>
								<li><img src="${dt.imglink}"></li>
								<li><img src="${dt.imglink}"></li>
								<li><img src="${dt.imglink}"></li>
								<li><img src="${dt.imglink}"></li>
								<li><img src="${dt.imglink}"></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="goodsinfo-right">
				<h2>${dt.title}</h2>
				<h3><span>【${dt.lable}】</span>${dt.title}</h3>
				<div class="goodsinfo-right-price">
					<div>
						<span>价格</span>
						<em>￥${dt.price}</em>
					</div>
					<div>
						<span>促销</span>
						<u>赠送积分</u>
						<i>购买即赠商城积分，积分可抵现~</i>
					</div>
				</div>
				<div class="goodsinfo-right-fuwu">
					<div>
						<span>服务说明</span>
						<i>预计2021-03-15前发货</i>
						<strong>?
							<div>订单按照支付顺序发货，预计发货时间在支付全部完成前可能变更;预计发货时间根据商品库存信息计算得出，受诸多因素影响可能会产生偏差，我们会为您积极备货。</div>
						</strong>
					</div>
					<div>
						<span>&nbsp;</span>
						<i class="iconfont">&#xe6cf;&nbsp;已满48元已免运费</i>
						<i class="iconfont">&#xe6cf;&nbsp;由华为商城负责发货，并提供售后服务</i>
					</div>
					<div>
						<span>商品编码</span>
						<i>2601010252104</i>
					</div>
				</div>
				<div class="goodsinfo-right-class">
					<div class="clearfix">
						<span>选择颜色</span>
						<i class="goodsinfo-right-class-borshow"><img src="${dt.imglink}" >${dt.typeone}</i>
						<i><img src="${dt.imglink}" >${dt.typetwo}</i>
						<i><img src="${dt.imglink}" >${dt.typethree}</i>
					</div>
					<div class="clearfix">
						
					</div>
					<div class="clearfix">
						<span>选择套餐</span>
						<i class="goodsinfo-right-class-borshow">官方标配</i>
					</div>
					<div class="clearfix">
						<span>保障服务</span>
						<i>碎屏服务宝1年￥229
						<div class="clearfix">
							<div>
								<input type="checkbox" name="" id="" />碎屏服务宝1年&nbsp;￥229&nbsp;&nbsp;<u>详情></u>
							</div>
							<div></div>
						</div>
						</i>
						<i>延长服务宝1年￥128
						<div class="clearfix">
							<div>
								<input type="checkbox" name="" id="" />延长服务宝1年&nbsp;￥128&nbsp;&nbsp;<u>详情></u>
							</div>
							<div>
								<input type="checkbox" name="" id="" />延长服务宝半年&nbsp;￥68&nbsp;&nbsp;<u>详情></u>
							</div>
						</div>
						</i>
					</div>
					<div class="clearfix">
						<span>推荐</span>
						<i><a href="./details.html?id=${dt.tuijianoneid}&user=${usernum}">${dt.tuijianone}</a></i>
						<i><a href="./details.html?id=${dt.tuijiantwoid}&user=${usernum}">${dt.tuijiantwo}</a></i>
						<i><a href="./details.html?id=${dt.tuijianthreeid}&user=${usernum}">${dt.tuijianthree}</a></i>
					</div>
					<div>
						<span>已选择商品:</span>
						<u> 幻夜黑/4G全网通8GB+128GB/官方标配</u>
					</div>
					<div class="clearfix">
						<div>
							<a href="javascript:;">1</a>
							<a href="javascript:;" name="jia" class="iconfont">&#xe609;</a>
							<a href="javascript:;" name="jian" class="iconfont">&#xe617;</a>
						</div>			
		`
		if (dt.num > 0) {
			str += `
				<div><a href="javascript:;">加入购物车</a></div>
						</div>
					</div>
				</div>
			`
		} else {
			str += `
				<div><a href="javascript:;">到货提示</a></div>
						</div>
					</div>
				</div>
			`
		}
		return str
	}
}

//条件筛选函数价格区域筛选(值1,值2)
function screenP(val1, val2, dt) {
	let arr = []
	//第一个第二个输入框都有值
	if (val1.length > 0 && val2.length > 0) {
		/* for(let i = 0;i < itme.length;i++){
			if(itme[i].price > Number(priceMinVal) && itme[i].price < Number(priceMaxVal)){
				console.log(itme[i].price)
			}
		} */
		if (val1 < val2) {
			arr = dt.filter(im => {
				return im.price > parseFloat(val1) && im.price < parseFloat(val2)
			})
		} else {
			arr = dt.filter(im => {
				return im.price > parseFloat(val2) && im.price < parseFloat(val1)
			})
		}
	} else if (val1.length > 0 && val2.length == 0) {
		arr = dt.filter(im => {
			return im.price > parseFloat(val1)
		})
	} else if (val1.length == 0 && val2.length > 0) {
		arr = dt.filter(im => {
			return im.price < parseFloat(val2)
		})
	} else {
		arr = arr
	}
	return arr
}

//条件筛选函数升序降序筛选(flase or true,值2)
function screenPrice(bool, dt) {
	let arr = dt
	//为true则是升序
	if (bool) {
		//遍历数据排序
		for (let i = 0; i < arr.length - 1; i++) {
			for (let j = 0; j < arr.length - 1 - i; j++) {
				if (parseFloat(arr[j].price) > parseFloat(arr[j + 1].price)) {
					let aa = arr[j]
					arr[j] = arr[j + 1]
					arr[j + 1] = aa
				}
			}
		}
	} else {
		//遍历数据排序
		for (let i = 0; i < arr.length - 1; i++) {
			for (let j = 0; j < arr.length - 1 - i; j++) {
				if (parseFloat(arr[j].price) < parseFloat(arr[j + 1].price)) {
					let aa = arr[j]
					arr[j] = arr[j + 1]
					arr[j + 1] = aa
				}
			}
		}
	}
	return arr
}

function screenAll(str, dt) {
	let arr = []
	if (str == "赠送积分" || str == "一站式换新" || str == "分期免息") {
		arr = dt.filter(itme => {
			return itme.keytwo == str
		})
		return arr
	} else if (str == "99%以上" || str == "98%及以下") {
		if (str == "99%以上") {
			//遍历数据符合条件的返回
			arr = dt.filter(itme => {
				return itme.haoping.split("%")[0] >= str.split("%")[0]
			})
		} else {
			// 遍历数据符合条件的返回
			arr = dt.filter(itme => {
				return itme.haoping.split("%")[0] <= str.split("%")[0]
			})
		}
		return arr
	}
}

//基础数据筛选
function screenBasic(ipts, dt) {
	let data = dt
	//判断是否选中来筛选数据
	if (ipts[0].checked) {
		data = screenAll(ipts[0].parentElement.innerText.trim(), data)
	}
	if (ipts[1].checked) {
		data = screenAll(ipts[1].parentElement.innerText.trim(), data)
	}
	if (ipts[2].checked) {
		data = screenAll(ipts[2].parentElement.innerText.trim(), data)
	}
	if (ipts[3].checked) {
		data = screenAll(ipts[3].parentElement.innerText.trim(), data)
	}
	if (ipts[4].checked) {
		data = screenAll(ipts[4].parentElement.innerText.trim(), data)
	}
	return data
}

//切换运动函数
function move(j, bool) {
	var dsq;
	//获取当前起始滚动距离
	let start = j.scrollLeft
	//设置当前结束的滚动距离
	let end;
	if (bool) {
		end = start + 1200
	} else {
		end = start - 1200
	}
	var speed = (end - start) / 20
	var startSpeed = 0 //起始步数
	var endSpeed = 20 //结束步数
	clearInterval(dsq)
	dsq = setInterval(function () {
		startSpeed++
		if (startSpeed >= endSpeed) {
			clearInterval(dsq)
			//当条件满足时，代表至少走了20步，因此直接走到终点
			j.scrollLeft = end
		} else {
			start += speed
			j.scrollLeft = start
		}
	}, 50)
}

//给该对象设置对应的样式
function setCss(ele, options) {
	//遍历所有需要设置的样式
	for (let attr in options) {
		ele.style[attr] = options[attr]
	}
}

//放大镜函数
function fangdajing(e, zcc, datu, fdj) {
	//获取鼠标移动的距离
	let zccX = e.pageX - datu.offsetLeft - parseInt(zcc.offsetWidth / 2)
	let zccY = e.pageY - datu.offsetTop - parseInt(zcc.offsetHeight / 2)
	let fdjX //放大镜图片移动的距离
	let fdjY

	//水平方向判断边界条件
	if (zccX < 0) {
		zcc.style.left = '0px'
		fdjX = 0
	} else if (zccX > (datu.offsetWidth - zcc.offsetWidth)) {
		zcc.style.left = (datu.offsetWidth - zcc.offsetWidth) + 'px'
		fdjX = (datu.offsetWidth - zcc.offsetWidth)
	} else {
		zcc.style.left = zccX + 'px'
		fdjX = zccX
	}
	//垂直方向判断边界条件
	if (zccY < 0) {
		zcc.style.top = '0px'
		fdjY = 0
	} else if (zccY > (datu.offsetHeight - zcc.offsetHeight)) {
		zcc.style.top = (datu.offsetHeight - zcc.offsetHeight) + 'px'
		fdjY = (datu.offsetHeight - zcc.offsetHeight)
	} else {
		zcc.style.top = zccY + 'px'
		fdjY = zccY
	}
	//放大镜里的图片位移的距离
	// fdj.firstElementChild.firstElementChild.style.position = 'absolute'
	fdj.firstElementChild.firstElementChild.style.top = -fdjY * 2 + 'px'
	fdj.firstElementChild.firstElementChild.style.left = -fdjX * 2 + 'px'
}

//购车页渲染
function cartlistRendere(dt,us) {
	//判断购物车是否有内容
	if (!dt || dt.length <= 0) {
		//显示购物车没有内容
		let str = `
			<div class="cartlist-kong">
				<img src="../images/cart.png">
				<h3>您的购物车里什么也没有哦~</h3>
				<h2><a href="./index.html?user=${us}">去逛逛</a></h2>
			</div>
		`
		return str
	} else {
		//创建字符串拼接内容
		//头部导航信息
		let str = `
			<div class="cartlist-top">
				<ul class="clearfix">
					<li>
						<label for="quanxuan">
							<input type="checkbox" name="quanx" id="quanxuan" />全选
						</label>
					</li>
					<li>商品</li>
					<li>单价</li>
					<li>数量</li>
					<li>小计</li>
					<li>操作</li>
				</ul>
			</div>
		`
		//遍历对应账号的localstorage内容
		dt.forEach(itme => {
			//拼接商品详情
			str += `
				<div class="cartlist-center">
					<ul class="clearfix">
						<li>
							<label for="danxuan">
								<input type="checkbox" name="danxuan" id="danxuan" data-id="${itme.id}" data-name="${itme.options}" />
							</label>
						</li>
						<li class="clearfix">
							<div>
								<img src="${itme.imglink}">
							</div>
							<div>
								<h3>${itme.title}</h3>
								<h4>${itme.options}</h4>
								${itme.keytwo ? `<p>${itme.keytwo}</p>` : ""}
							</div>
						</li>
						<li>
							￥<span>${itme.price}</span>
						</li>
						<li>
							<input type="button" name="jian" data-id="${itme.id}" data-name="${itme.options}" value="-" ></input>
							<input type="text" name="num" data-id="${itme.id}" data-name="${itme.options}" value="${itme.intnum}" />
							<input type="button" name="jia" data-id="${itme.id}" data-name="${itme.options}" value="+"></input>
						</li>
						<li class="summin">
							￥<span>2999.00</span>
						</li>
						<li>
							<a href="javascript:;" name="del" data-id="${itme.id}" data-name="${itme.options}">删除</a>
						</li>
					</ul>
				</div>
			`
		})

		//拼接底部结算
		str += `
			<div class="cartlist-bottom clearfix">
				<div>
					<label>
						<input type="checkbox" name="quanx" id="quanx" />全选
					</label>
					<a href="javascript:;" name="dels">删除</a>
				</div>
				<div><a href="javascript:;">立即结算</a></div>
				<div>
					<h3>总计:<i>￥<span>7298.00</span></i></h3>
					<p>已选择<i>2</i>件商品，优惠：￥<span>0.00</span></p>
				</div>
			</div>
		`
		//拼接滚动底部结算显示
		str += `
			<div class="cartlist-bottom-box">
				<div class="cartlist-bottom clearfix">
					<div>
						<label>
							<input type="checkbox" name="quanx" id="quanx" />全选
						</label>
						<a href="javascript:;" name="dels">删除</a>
					</div>
					<div><a href="javascript:;">立即结算</a></div>
					<div>
						<h3>总计:<i>￥<span>7298.00</span></i></h3>
						<p>已选择<i>2</i>件商品，优惠：￥<span>0.00</span></p>
					</div>
				</div>
			</div>
		`
		return str
	}
}

//点击结算渲染
function jiesuanRendere(dt){
	//创建字符串拼接
	let str = `
			<div class="suborder">
				<div class="suborder-top">
					<h2>收货地址</h2>
					<div class="iconfont newadd">&#xe609;新增收货地址</div>
				</div>
				<div class="suborder-center">
					<div class="suborder-center-box clearfix">
						<div class="suborder-left">
							<ul>
								
	`
	//遍历
	dt.forEach(itme=>{
		str += `
			<li class="clearfix">
				<div><img src="${itme.imglink}"></div>
				<div>${itme.title}</div>
				<div>×${itme.intnum}</div>
				<div>￥<span>${(itme.price*itme.intnum).toFixed(2)}</span></div>
			</li>
		`
	})
	str += `
		</ul>
							<div>
								<div class="clearfix">
									<h2>发票信息</h2>
									<div>
										<p>注:如果商品由第三方卖家销售，发票内容由其卖家决定，发票由卖家开具并寄出</p>
										<h4>电子普通发票&nbsp;&nbsp;&nbsp;个人</h4>
									</div>
								</div>
								<div class="clearfix">
									<h2>优惠与抵用</h2>
									<div>
										<h5>使用优惠券</h5>
										<h4>共0积分</h4>
									</div>
								</div>
							</div>
						</div>
						<div class="suborder-right">
							<div>
								<h2>商品由<span>华为商城</span>选择合作快递</h2>
								<h3>标准配送</h3>
								<p>3月15日起开始发货</p>
							</div>
							<div class="clearfix">
								<div>
									<ol>
										<li>商品总金额:</li>
										<li>运费:</li>
										<li>优惠金额:</li>
										<li>结算金额:</li>
									</ol>
								</div>
								<div>
									<ol>
										<li class="jine">￥7516.00</li>
										<li>￥0.00</li>
										<li>-￥0.00</li>
										<li class="jine">￥7516.00</li>
									</ol>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="suborder-bottom clearfix">
					<h1>应付总额:<em class="jine">￥7893.00</em></h1>
					<h2>可获得积分:<span class="jifen">4444</span></h2>
					<div class="notaddress">无提交地址不可下单，<u>点此提交</u></div>
					<h3 class="submitorder">提交订单</h3>
				</div>
			</div>
	`
	return str
}