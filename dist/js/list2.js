var cook,text1,se=window.location.search,s=se.split("=")[1].toString().split("&")[0],usernum=se.split("=")[2];"undefined"!=usernum&&(cook=getCookie(usernum),(text1=document.querySelector(".nav-right").firstElementChild.children[0]).innerHTML=`<li><a href="javascript:;" style="color:#fff">欢迎&nbsp;${cook}</a></li>`);var list=document.querySelector(".lists"),listTop=list.querySelector(".lists-top"),listBottom=list.querySelector(".lists-bottom"),routenav=document.querySelector(".routenav"),pag=document.querySelector(".pagination");function xuanlan(s){s.length<=0&&(pag.innerHTML="",listBottom.firstElementChild.innerHTML=`
			<div class="isnot">
				<h2>找不到您想要的商品，换一个试试吧！</h2>
			</div>
		`),s.forEach(e=>{var t=`
			<ol class="breadcrumb clearfix">
				<li><a href="./index.html">首页</a><i class="iconfont icon-you"></i></li>
				<li><a href="javascript:;">${e.keymain}</a></li>
			</ol>
			`;routenav.innerHTML=t;e=`
			<ol>
				<li>
					<span>分类:</span>
					<u>${e.keymain}</u>
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
			`;listTop.innerHTML=e,listRenderer(pag,s,listBottom.firstElementChild);const a=listTop.querySelectorAll("[type='checkbox']");for(let t=0;t<a.length;t++)a[t].addEventListener("click",function(){3==t&&(a[4].checked=!1,a[4].style.display="none",a[4].parentElement.parentElement.style.color="#333"),4==t&&(a[3].checked=!1,a[3].style.display="none",a[3].parentElement.parentElement.style.color="#333"),this.checked?(this.style.display="inline-block",this.parentElement.parentElement.style.color="blue"):(this.style.display="none",this.parentElement.parentElement.style.color="#333");var e=screenBasic(a,s);listRenderer(pag,e,listBottom.firstElementChild)});const i=document.getElementById("isyes");i.addEventListener("click",function(){const e=document.getElementById("priceMin"),t=document.getElementById("priceMax");var i=e.value,n=t.value;0<n.length&&0<i.length&&parseFloat(i)>parseFloat(n)&&(t.value=i,e.value=n);var l=screenBasic(a,s),l=screenP(i,n,l);listRenderer(pag,l,listBottom.firstElementChild)});var n=document.getElementsByName("priceAsc")[0],l=document.getElementsByName("priceDesc")[0];n.addEventListener("click",function(){n.style.display="none",l.style.display="block";var e=screenBasic(a,s),e=screenPrice(!0,e);listRenderer(pag,e,listBottom.firstElementChild)}),l.addEventListener("click",function(){n.style.display="block",l.style.display="none";var e=screenBasic(a,s),e=screenPrice(!1,e);listRenderer(pag,e,listBottom.firstElementChild)})})}s?isNaN(s)?(s=decodeURI(s),async function(){var e=await promiseAjax({url:"../php/list3.php",data:"val="+s,datatype:"json"});console.log(e),xuanlan(e)}()):async function(){xuanlan(await promiseAjax({url:"../php/list2.php",data:"val="+s,datatype:"json"}))}():(alert("非法进入！！！"),window.location.href="./index.html");