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
});

/**
 * Usage: 
 * <span class="tapable-phone" data-phone="+79000000000">+7 (900) 000-00-00</span>
 */
$(function(){var a=$(".tapable-phone");a.each(function(){var a=$(this).attr("data-phone");a||(a=this.innerText.replace(/[^\d]+/g,"")),$(this).data("href","tel:"+a),$(this).data("originalMarkup",this.innerHTML)}),$(window).on("custombreakpoint",function(t,i){a.each(function(){var a=$(this);"xs"==i||"sm"==i?this.innerHTML='<a href="'+a.data("href")+'">'+a.data("originalMarkup")+"</a>":this.innerHTML=a.data("originalMarkup")})})});

/**
 * Bootstrap breakponts event trigger
 */
!function(){var n=[{width:1449,breakpoint:"xxl"},{width:1200,breakpoint:"xl"},{width:991,breakpoint:"lg"},{width:767,breakpoint:"md"},{width:575,breakpoint:"sm"},{width:0,breakpoint:"xs"}];$(window).on("resize",function(){for(var i=0;i<n.length;i++)if(window.innerWidth>n[i].width){n[i].breakpoint!=$.currentBreakpoint&&($.currentBreakpoint=n[i].breakpoint,$(window).trigger("custombreakpoint",$.currentBreakpoint));break}}),$(function(){$(window).resize()})}();

$(document).on("click","a.scroll-to[href*='#']",function(t){var o=$($(this).attr("href")),e=$(this).closest(".scroll-offset").outerHeight()||1;o.length&&$("html, body").stop().animate({scrollTop:o.offset().top-(e-1)},1e3),t.preventDefault()});

!function(){var e=function(e){var s="";for(var a in e)s+=e[a]+"<br>";return s};$(document).on("submit","form.ajax",function(s){s.preventDefault();var a,o=$(this),n={squery:escape(window.location.search),sreferer:escape(document.referrer)};if(window.FormData){a=new FormData(o.get(0));for(var i in n)a.append(i,n[i])}else{a=o.serialize();for(var i in n)a+="&"+i+"="+n[i]}!function(s){$.ajax({url:"/ajax.json",type:"POST",data:a,dataType:"json",processData:!1,contentType:window.FormData?!1:"application/x-www-form-urlencoded; charset=UTF-8",beforeSend:function(){return s.hasClass("processing")?!1:void s.addClass("processing")},complete:function(a,o){var n=$(".modal#response");if(s.find(".notice").remove(),s.removeClass("processing"),"success"==o){var i=a.responseJSON;if("fail"==i.response){s.trigger("failed-submit",i);var t="";if(i.fields){var r=0;for(var d in i.fields)if("hidden"!=s[0][d].type){var l=$("<div/>").html(e(i.fields[d])).wrap("<div/>").parent().addClass("notice").hide();!function(e,s){$(e[d]).addClass("error").on("focus click change input",function(){$(this).closest(".form-group").find('[name="'+this.name+'"]').removeClass("error"),s.stop().fadeOut(100,function(){$(this).remove()})}).closest(".form-group").append(s),window.innerWidth<544||s.parent().hasClass("horz")?(s.addClass("from-top"),s.css("margin-top",-(s.outerHeight()+8))):s.children("div").css("position","relative").css("top",-(.5*s.outerHeight())),s.css("transition-delay",.001*r+"s").show().addClass("animated")}(s[0],l),r+=100}else t+="<div>"+i.fields[d]+" ("+d+")</div>"}i.messages&&i.messages.length&&(t+=i.messages.join("<br>")),""!=t&&(n.find(".modal-body > .response").html(t),n.modal())}else"success"==i.response&&(s.trigger("success-submit",i),s.get(0).reset(),s.closest(".modal").modal("hide"),n.find(".modal-body > .response").html(i.messages.join("<br>")),n.modal())}}})}(o)}),$(".modal").on("hidden.bs.modal",function(){if("response"!=this.id&&$(".modal#response").is(":visible")){var e=$('<div class="modal-scrollbar-measure"/>').appendTo(document.body).get(0),s=e.offsetWidth-e.clientWidth;$(e).remove(),$(document.body).addClass("modal-open").css("padding-right",s)}else $(document.body).removeClass("modal-open").css("padding-right",0)}),$(".modal").on("show.bs.modal",function(e){var s=$(e.relatedTarget),a=$(this);if(s.length){var o=s.data();for(var n in o)if(o.hasOwnProperty(n)&&/^set[A-Z]+/.test(n)){var i=o[n],t=n.match(/^set(.*)/)[1].replace(/^[A-Z]/,function(e){return(e||"").toLowerCase()});a.find('[name="'+t+'"]').val(i),a.find('[data-get="'+t+'"]').each(function(){"IMG"==this.tagName?$(this).prop("src",i):"INPUT"==this.tagName||"TEXTAREA"==this.tagName?$(this).val(i):this.innerHTML=i})}}}),$(function(){if(""!=window.location.hash&&window.location.hash.match(/^#[a-z\d_]+$/)){var e=$(".modal"+window.location.hash);e.length&&e.modal("show")}})}();

/**
 * set form attr data-goal="<scope>:<goal>"
 */
var yandexReachGoal=function(a){if(window.Ya)for(var e=(window.Ya.Metrika||window.Ya.Metrika2).counters(),n=0;n<e.length;n++){var t="yaCounter"+e[n].id;window[t]&&window[t].reachGoal(a)}},reachGoal=function(a){var e="";(matches=a.match(/^(.+?):(.+?)$/))&&(e=matches[1],a=matches[2]),yandexReachGoal(a),e&&(yandexReachGoal(e),"undefined"!=typeof gtag?gtag("event",a,{event_category:e}):"undefined"!=typeof GoogleAnalyticsObject&&window[GoogleAnalyticsObject]("send","event",e,a))};$.fn.reachGoal=function(){return this.filter("[data-goal]").each(function(){reachGoal($(this).data("goal"))})},$(document).on("success-submit","[data-goal]",function(){$(this).reachGoal()});

$.fn.runOnScroll=function(n){this.each(function(o,i){var l=function(){i=$(i);var o=$(this),t=o.scrollTop(),c=i.offset().top,h=i.height()+c;t>c-o.height()&&h>t&&(o.unbind("scroll",l),n(i))};$(window).scroll(l).load(function(){$(this).scroll()})})};

$.cookie=function(e,i,o){if("undefined"==typeof i){var n=null;if(document.cookie&&""!=document.cookie)for(var r=document.cookie.split(";"),t=0;t<r.length;t++){var p=$.trim(r[t]);if(p.substring(0,e.length+1)==e+"="){n=decodeURIComponent(p.substring(e.length+1));break}}return n}o=o||{},null===i&&(i="",o.expires=-1);var u="";if(o.expires&&("number"==typeof o.expires||o.expires.toUTCString)){var s;"number"==typeof o.expires?(s=new Date,s.setTime(s.getTime()+24*o.expires*60*60*1e3)):s=o.expires,u="; expires="+s.toUTCString()}var a=o.path?"; path="+o.path:"",c=o.domain?"; domain="+o.domain:"",m=o.secure?"; secure":"";document.cookie=[e,"=",encodeURIComponent(i),u,a,c,m].join("")};
