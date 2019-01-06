var TINY={};

function T$(i){return document.getElementById(i)}

TINY.box=function(){
    /**
	 * p 弹出层
	 * m 遮罩层
	 * b 内容层
	 * f 初始化值为0，弹出后f=1
	 * ic,iu,iw,ih,ia
     */
	var p,m,b,fn,ic,iu,iw,ih,ia,f=0;
	return{
        /**
		 * 显示弹出层
         * @param c 显示的内容
         * @param u 是否远程内容
         * @param w number 宽
         * @param h number 高
         * @param a 指定宽和高
         * @param t number 指定几秒后关闭
         */
		show:function(c,u,w,h,a,t){
			if(!f){
				p=document.createElement('div'); p.id='tinybox';
				m=document.createElement('div'); m.id='tinymask';
				b=document.createElement('div'); b.id='tinycontent';
				document.body.appendChild(m); document.body.appendChild(p); p.appendChild(b);
				m.onclick=TINY.box.hide; window.onresize=TINY.box.resize; f=1
			}
			if(!a&&!u){
				p.style.width=w?w+'px':'auto'; p.style.height=h?h+'px':'auto';
				p.style.backgroundImage='none'; b.innerHTML=c
			}else{
                // tinycontent默认宽高100px
				b.style.display='none'; p.style.width=p.style.height='100px'
			}
            //设置遮罩层宽和高
			this.mask();
			ic=c; iu=u; iw=w; ih=h; ia=a; this.alpha(m,1,80,3);
			if(t){setTimeout(function(){TINY.box.hide()},1000*t)}
		},
		fill:function(c,u,w,h,a){
			if(u){
				p.style.backgroundImage='';
				var x=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
				x.onreadystatechange=function(){
					if(x.readyState==4&&x.status==200){TINY.box.psh(x.responseText,w,h,a)}
				};
				x.open('GET',c,1); x.send(null)
			}else{
				this.psh(c,w,h,a)
			}
		},
		psh:function(c,w,h,a){
			if(a){
				if(!w||!h){
					var x=p.style.width, y=p.style.height; b.innerHTML=c;
					p.style.width=w?w+'px':''; p.style.height=h?h+'px':'';
					b.style.display='';
					w=parseInt(b.offsetWidth); h=parseInt(b.offsetHeight);
					b.style.display='none'; p.style.width=x; p.style.height=y;
				}else{
					b.innerHTML=c
				}
				this.size(p,w,h,4)
			}else{
				p.style.backgroundImage='none'
			}
		},
		// 关闭弹出层
		hide:function(){
			TINY.box.alpha(p,-1,0,5)
		},
		resize:function(){
			TINY.box.pos(); TINY.box.mask()
		},
		//设置遮罩层宽和高
		mask:function(){
			m.style.height=TINY.page.theight()+'px';
			m.style.width=''; m.style.width=TINY.page.twidth()+'px'
		},
		//设置弹出层的位置
		pos:function(){
			var t=(TINY.page.height()/2)-(p.offsetHeight/2); t=t<10?10:t;
			p.style.top=(t+TINY.page.top())+'px';
			p.style.left=(TINY.page.width()/2)-(p.offsetWidth/2)+'px'
		},
        /**
		 *
         * @param e 遮罩层
         * @param d
         * @param a 透明度
         * @param s
         */
		alpha:function(e,d,a,s){
			clearInterval(e.ai);
			if(d==1){
				e.style.opacity=0; e.style.filter='alpha(opacity=0)';
				e.style.display='block';
				this.pos()
			}
			e.ai=setInterval(function(){TINY.box.twalpha(e,a,d,s)},20)
		},
        /**
		 *
         * @param e
         * @param a 透明度
         * @param d
         * @param s
         */
		twalpha:function(e,a,d,s){
			var o=Math.round(e.style.opacity*100);
			if(o==a){
				clearInterval(e.ai);
				if(d==-1){
					e.style.display='none';
					e==p?TINY.box.alpha(m,-1,0,3):b.innerHTML=p.style.backgroundImage=''
				}else{
					e==m?this.alpha(p,1,100,5):TINY.box.fill(ic,iu,iw,ih,ia)
				}
			}else{
				var n=o+Math.ceil(Math.abs(a-o)/s)*d;
				e.style.opacity=n/100; e.style.filter='alpha(opacity='+n+')'
			}
		},
		size:function(e,w,h,s){
			e=typeof e=='object'?e:T$(e); clearInterval(e.si);
			var ow=e.offsetWidth, oh=e.offsetHeight,
			wo=ow-parseInt(e.style.width), ho=oh-parseInt(e.style.height);
			var wd=ow-wo>w?-1:1, hd=(oh-ho>h)?-1:1;
			e.si=setInterval(function(){TINY.box.twsize(e,w,wo,wd,h,ho,hd,s)},20)
		},
		twsize:function(e,w,wo,wd,h,ho,hd,s){
			var ow=e.offsetWidth-wo, oh=e.offsetHeight-ho;
			if(ow==w&&oh==h){
				clearInterval(e.si); p.style.backgroundImage='none'; b.style.display='block'
			}else{
				if(ow!=w){e.style.width=ow+(Math.ceil(Math.abs(w-ow)/s)*wd)+'px'}
				if(oh!=h){e.style.height=oh+(Math.ceil(Math.abs(h-oh)/s)*hd)+'px'}
				this.pos()
			}
		}
	}
}();

TINY.page=function(){
	// 获取页面信息，宽度高度，滚动宽度和高度
	return{
		top:function(){return document.body.scrollTop||document.documentElement.scrollTop},
		width:function(){return self.innerWidth||document.documentElement.clientWidth},
		height:function(){return self.innerHeight||document.documentElement.clientHeight},
		theight:function(){
			var d=document, b=d.body, e=d.documentElement;
			return Math.max(Math.max(b.scrollHeight,e.scrollHeight),Math.max(b.clientHeight,e.clientHeight))
		},
		twidth:function(){
			var d=document, b=d.body, e=d.documentElement;
			return Math.max(Math.max(b.scrollWidth,e.scrollWidth),Math.max(b.clientWidth,e.clientWidth))
		}
	}
}();