$(function() {
	if ($.mask) {
		$('input.mask-phone').mask('+7 (999) 999-99-99');
	}

	$('.slick').slick({
		prevArrow: '<a href="#" class="ctrl prev"><i class="icon-left-arrow"></i></a>', 
		nextArrow: '<a href="#" class="ctrl next"><i class="icon-right-arrow"></i></a>',
		swipeToSlide: true,
		customPaging: function() {
			return '<span></span>';
		}
	});

	(function() {
		var $tapablePhones = $('.tapable-phone');

		$tapablePhones.each(function() {
			var href = $(this).attr('data-phone');

			if (!href) {
				href = this.innerText.replace(/[^\d]+/g, '');
			}

			$(this).data('href', 'tel:' + href);
			$(this).data('originalMarkup', this.innerHTML);
		});

		$(window).on('breakpoint', function(e, breakpoint) {
			$tapablePhones.each(function() {
				var $self = $(this);

				if (breakpoint == 'xs' || breakpoint == 'sm') {
					this.innerHTML = '<a href="' + $self.data('href') + '">' + $self.data('originalMarkup') + '</a>';
				} else {
					this.innerHTML = $self.data('originalMarkup');
				}
			});
		});
	})();
});

!function(){var i,n=[{width:1449,breakpoint:"xxl"},{width:1200,breakpoint:"xl"},{width:991,breakpoint:"lg"},{width:767,breakpoint:"md"},{width:575,breakpoint:"sm"},{width:0,breakpoint:"xs"}];$(window).on("resize",function(){for(var t=0;t<n.length;t++)if(window.innerWidth>n[t].width){n[t].breakpoint!=i&&(i=n[t].breakpoint,$(window).trigger("custombreakpoint",i));break}}),$(function(){$(window).resize()})}();

$(document).on("click","a.scroll-to[href*='#']",function(t){var o=$($(this).attr("href")),e=$(this).closest(".scroll-offset").outerHeight()||1;o.length&&$("html, body").stop().animate({scrollTop:o.offset().top-(e-1)},1e3),t.preventDefault()});

!function(){var e=function(e){var s="";for(var a in e)s+=e[a]+"<br>";return s};$(document).on("submit","form.ajax",function(s){s.preventDefault();var a,o=$(this),r={squery:escape(window.location.search),sreferer:escape(document.referrer)};if(window.FormData){a=new FormData(o.get(0));for(var i in r)a.append(i,r[i])}else{a=o.serialize();for(var i in r)a+="&"+i+"="+r[i]}!function(s){$.ajax({url:"/ajax.json",type:"POST",data:a,dataType:"json",processData:!1,contentType:window.FormData?!1:"application/x-www-form-urlencoded; charset=UTF-8",beforeSend:function(){return s.hasClass("processing")?!1:void s.addClass("processing")},complete:function(a,o){var r=$(".modal#response");if(s.find(".notice").remove(),s.removeClass("processing"),"success"==o){var i=a.responseJSON;if("fail"==i.response){s.trigger("failed-submit",i);var n="";if(i.fields){var t=0;for(var d in i.fields)if("hidden"!=s[0][d].type){var l=$("<div/>").html(e(i.fields[d])).wrap("<div/>").parent().addClass("notice").hide();!function(e,s){$(e[d]).addClass("error").on("focus click change input",function(){$(this).closest(".form-group").find('[name="'+this.name+'"]').removeClass("error"),s.stop().fadeOut(100,function(){$(this).remove()})}).closest(".form-group").append(s),window.innerWidth<544||s.parent().hasClass("horz")?(s.addClass("from-top"),s.css("margin-top",-(s.outerHeight()+8))):s.children("div").css("position","relative").css("top",-(.5*s.outerHeight())),s.css("transition-delay",.001*t+"s").show().addClass("animated")}(s[0],l),t+=100}else n+="<div>"+i.fields[d]+" ("+d+")</div>"}i.messages&&i.messages.length&&(n+=i.messages.join("<br>")),""!=n&&(r.find(".modal-body > .response").html(n),r.modal())}else"success"==i.response&&(s.trigger("success-submit",i),s.reachGoal(),s.get(0).reset(),s.closest(".modal").modal("hide"),r.find(".modal-body > .response").html(i.messages.join("<br>")),r.modal())}}})}(o)}),$(".modal").on("hidden.bs.modal",function(){if("response"!=this.id&&$(".modal#response").is(":visible")){var e=$('<div class="modal-scrollbar-measure"/>').appendTo(document.body).get(0),s=e.offsetWidth-e.clientWidth;$(e).remove(),$(document.body).addClass("modal-open").css("padding-right",s)}else $(document.body).removeClass("modal-open").css("padding-right",0)}),$(".modal").on("show.bs.modal",function(e){var s=$(e.relatedTarget),a=$(this);if(s.length){var o=s.data();for(var r in o)if(o.hasOwnProperty(r)&&/^set[A-Z]+/.test(r)){var i=o[r],n=r.match(/^set(.*)/)[1].replace(/^[A-Z]/,function(e){return(e||"").toLowerCase()});a.find('[name="'+n+'"]').val(i),a.find('[data-get="'+n+'"]').each(function(){"IMG"==this.tagName?$(this).prop("src",i):"INPUT"==this.tagName||"TEXTAREA"==this.tagName?$(this).val(i):this.innerHTML=i})}}})}();

// set form attr data-goal="<scope>:<goal>"
var yandexReachGoal=function(a){if(window.Ya)for(var e=(window.Ya.Metrika||window.Ya.Metrika2).counters(),n=0;n<e.length;n++){var t="yaCounter"+e[n].id;window[t]&&window[t].reachGoal(a)}},reachGoal=function(a){var e="";(matches=a.match(/^(.+?):(.+?)$/))&&(e=matches[1],a=matches[2]),yandexReachGoal(a),e&&(yandexReachGoal(e),"undefined"!=typeof gtag?gtag("event",a,{event_category:e}):"undefined"!=typeof GoogleAnalyticsObject&&window[GoogleAnalyticsObject]("send","event",e,a))};$.fn.reachGoal=function(){return this.filter("[data-goal]").each(function(){reachGoal($(this).data("goal"))})},$(document).on("success.submit","[data-goal]",function(){$(this).reachGoal()});

$.fn.runOnScroll=function(n){this.each(function(o,i){var l=function(){i=$(i);var o=$(this),t=o.scrollTop(),c=i.offset().top,h=i.height()+c;t>c-o.height()&&h>t&&(o.unbind("scroll",l),n(i))};$(window).scroll(l).load(function(){$(this).scroll()})})};

$.cookie=function(e,i,o){if("undefined"==typeof i){var n=null;if(document.cookie&&""!=document.cookie)for(var r=document.cookie.split(";"),t=0;t<r.length;t++){var p=$.trim(r[t]);if(p.substring(0,e.length+1)==e+"="){n=decodeURIComponent(p.substring(e.length+1));break}}return n}o=o||{},null===i&&(i="",o.expires=-1);var u="";if(o.expires&&("number"==typeof o.expires||o.expires.toUTCString)){var s;"number"==typeof o.expires?(s=new Date,s.setTime(s.getTime()+24*o.expires*60*60*1e3)):s=o.expires,u="; expires="+s.toUTCString()}var a=o.path?"; path="+o.path:"",c=o.domain?"; domain="+o.domain:"",m=o.secure?"; secure":"";document.cookie=[e,"=",encodeURIComponent(i),u,a,c,m].join("")};

/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransforms-teststyles-testprop-testallprops-prefixes-domprefixes
 */
;window.Modernizr=function(a,b,c){function z(a){j.cssText=a}function A(a,b){return z(m.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.csstransforms=function(){return!!F("transform")};for(var G in q)y(q,G)&&(v=G.toLowerCase(),e[v]=q[G](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},z(""),i=k=null,e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document);

