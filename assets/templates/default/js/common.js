var slickDefaults = {
    prevArrow: '<a href="#" class="ctrl prev"><i class="icon-left-arrow"></i></a>',
    nextArrow: '<a href="#" class="ctrl next"><i class="icon-right-arrow"></i></a>',
    swipeToSlide: true,
    customPaging: function() {
        return '<span></span>';
    }
};

var slickCustoms = {
    'selector': {
        // options
    }
};

$.fn.customSlick = function() {
    return this.each(function() {
        var $slick  = $(this);
        var options = $.extend({}, slickDefaults);

        for (var selector in slickCustoms) {
            if ($slick.is(selector)) {
                options = $.extend(options, slickCustoms[selector]);
                break;
            }
        }

        $slick.slick(options);
    });
};

$(function() {
    if ($.mask) {
        $('input.mask-phone').mask('+7 (999) 999-99-99');
    }

    $('.slick').customSlick();

    $('.user-content iframe').each(function() {
        $(this).addClass('embed-responsive-item').wrap('<div class="embed-responsive embed-responsive-16by9"/>');
    });

    $('.toggle-menu, .toggle-search, .toggle-filters').click(function(e) {
        e.preventDefault();
        var match = this.getAttribute('class').match(/toggle-([a-z]+)/);
        if (match) {
            $(document.body).toggleClass(match[1] + '-opened');
        }
    });
});

$(document).on('success-submit', 'form', function(e, response) {
    if (window.Comagic && typeof Comagic.addOfflineRequest == 'function') {
        var data = {},
            fields = ['name', 'phone', 'email'];

        for (var i = 0; i < fields.length; i++) {
            var f = fields[i];

            if (this.elements[f] && this.elements[f].value != '') {
                data[f] = this.elements[f].value;
            }
        }

        Comagic.addOfflineRequest(data);
    }

    if (window.VK && typeof VK.Goal == 'function') {
        VK.Goal('purchase');
    }

    if (window.fbq && typeof fbq == 'function') {
        fbq('track', 'Lead');
    }
});

$(document).on('click', 'a[data-goal], span[data-goal]', function() {
    $(this).reachGoal();
});

var showLoadingIndicator=function(){var o=$(document.body).children(".loading-indicator");o.length||(o=$('<div class="loading-indicator"/>').appendTo(document.body)),setTimeout(function(){o.addClass("visible")})},hideLoadingIndicator=function(){$(document.body).children(".loading-indicator").removeClass("visible")},showModal=function(o,a){var d=$(o);d.length||(showLoadingIndicator(),!function(a){$.ajax({url:"/modal.php",type:"POST",data:{id:o.replace("#","")},dataType:"json",complete:function(o,d){if(hideLoadingIndicator(),"success"==d){var n=o.responseJSON;if(n.markup){var i=$(n.markup).appendTo(document.body);i.modal("show",a)}}}})}(a))};$(document).on("click",'[data-toggle="modal"]',function(){showModal(this.dataset.target,$(this))});

/**
 * Usage:
 * <span class="tapable-phone" data-phone="+79000000000">+7 (900) 000-00-00</span>
 */
$(function(){var a=$(".tapable-phone");a.each(function(){var a=$(this).attr("data-phone");a||(a=this.innerText.replace(/[^\d]+/g,"")),$(this).data("href","tel:"+a),$(this).data("originalMarkup",this.innerHTML)}),$(window).on("custombreakpoint",function(t,i){a.each(function(){var a=$(this);"xs"==i||"sm"==i?this.innerHTML='<a href="'+a.data("href")+'">'+a.data("originalMarkup")+"</a>":this.innerHTML=a.data("originalMarkup")})})});

/**
 * Bootstrap breakponts event trigger
 */
!function(){var n=[{width:1449,breakpoint:"xxl"},{width:1200,breakpoint:"xl"},{width:991,breakpoint:"lg"},{width:767,breakpoint:"md"},{width:575,breakpoint:"sm"},{width:0,breakpoint:"xs"}];$(window).on("resize",function(){for(var i=0;i<n.length;i++)if(window.innerWidth>n[i].width){n[i].breakpoint!=$.currentBreakpoint&&($.currentBreakpoint=n[i].breakpoint,$(window).trigger("custombreakpoint",$.currentBreakpoint));break}}),$(function(){$(window).resize()})}();

$(document).on("click","a.scroll-to[href*='#']",function(t){var o=$($(this).attr("href")),e=$(this).closest(".scroll-offset").outerHeight()||1;o.length&&$(document.body).removeClass('menu-opened')&&$("html,body").stop().animate({scrollTop:o.offset().top-(e-1)},1e3),t.preventDefault()});


!function(){var e=function(e){var s="";for(var a in e)s+=e[a]+"<br>";return s};$(document).on("submit","form.ajax",function(s){s.preventDefault();var a,o,t=$(this),i={squery:escape(window.location.search),sreferer:escape(document.referrer)};if(window.FormData){a=new FormData(t.get(0));for(o in i)a.append(o,i[o])}else{a=t.serialize();for(o in i)a+="&"+o+"="+i[o]}!function(s){$.ajax({url:"/ajax.json",type:"POST",data:a,dataType:"json",processData:!1,contentType:window.FormData?!1:"application/x-www-form-urlencoded; charset=UTF-8",beforeSend:function(){return s.hasClass("processing")?!1:void s.addClass("processing")},complete:function(a,o){var t,i=$(".modal#response");if(s.find(".notice").remove(),s.removeClass("processing"),"success"==o){var n=a.responseJSON;if("fail"==n.response){if(s.trigger("failed-submit",n),t="",n.fields){var r=0;for(var d in n.fields)if(s[0][d]&&"hidden"!=s[0][d].type){var l=$("<div/>").html(e(n.fields[d])).wrap("<div/>").parent().addClass("notice").hide();!function(e,s){$(e[d]).addClass("error").on("focus click change input",function(){$(this).closest(".form-group").find('[name="'+this.name+'"]').removeClass("error"),s.stop().fadeOut(100,function(){$(this).remove()})}).closest(".form-group").append(s),window.innerWidth<544||s.parent().hasClass("horz")?(s.addClass("from-top"),s.css("margin-top",-(s.outerHeight()+8))):s.children("div").css("position","relative").css("top",-(.5*s.outerHeight())),s.css("transition-delay",.001*r+"s").show().addClass("animated")}(s[0],l),r+=100}else t+="<div>"+n.fields[d]+" ("+d+")</div>"}n.messages&&n.messages.length&&(t+=n.messages.join("<br>")),""!=t&&(i.find(".modal-body > .response").html(t),i.modal())}else"success"==n.response&&(s.trigger("success-submit",n),s.get(0).reset(),s.closest(".modal").modal("hide"),n.messages&&n.messages.length&&(t=n.messages.join("<br>"),""!=t&&(i.find(".modal-body > .response").html(t),i.modal())),n.redirect&&(location=n.redirect))}}})}(t)}),$(".modal").on("hidden.bs.modal",function(){if("response"!=this.id&&$(".modal#response").is(":visible")){var e=$('<div class="modal-scrollbar-measure"/>').appendTo(document.body).get(0),s=e.offsetWidth-e.clientWidth;$(e).remove(),$(document.body).addClass("modal-open").css("padding-right",s)}else $(document.body).removeClass("modal-open").css("padding-right",0)}),$(".modal").on("show.bs.modal",function(e){var s=$(e.relatedTarget),a=$(this),o=a.find("form"),t=o.data("goal");if(o&&o.attr("data-goal",t),s.length){var i=s.data();for(var n in i)if(i.hasOwnProperty(n)&&/^set[A-Z]+/.test(n)){o&&"setGoal"==n&&o.attr("data-goal",i[n]);var r=i[n],d=n.match(/^set(.*)/)[1].replace(/^[A-Z]/,function(e){return(e||"").toLowerCase()});a.find('[name="'+d+'"]').val(r),a.find('[data-get="'+d+'"]').each(function(){"IMG"==this.tagName?$(this).prop("src",r):"INPUT"==this.tagName||"TEXTAREA"==this.tagName?$(this).val(r):this.innerHTML=r})}}}),$(function(){if(""!=window.location.hash&&window.location.hash.match(/^#[a-z\d_]+$/)){var e=$(".modal"+window.location.hash);e.length&&e.modal("show")}})}();

/**
 * yandex maps mobile overlay
 */
!function(){function e(){$("div > ymaps").each(function(){var t,e,n=$(this).children(".touch-overlay");n.length||(n=$('<div class="touch-overlay">Для взаимодействия с картой нажмите сюда</div>').appendTo(this),(e=(t=n).get(0)).addEventListener("touchstart",function(){t.addClass("touched")},!1),e.addEventListener("touchend",function(){t.removeClass("touched")},!1),t.on("click dragstart",function(){t.remove()}))})}var n=setInterval(function(){e()},200);$(window).load(function(){var t=window.ymaps||window.ymaps_ctor__ru_RU____;"object"==typeof t&&t.ready(e),clearInterval(n)}),$(function(){$(document.body).append("<style>.touch-overlay{position:absolute;left:0;top:0;right:0;bottom:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(80,80,80,0.7);color:#fff;font-size:1rem;cursor:pointer;z-index:1;opacity:0;transition:all 0.3s ease;padding:2rem;text-align:center;}@media(min-width: 576px){.touch-overlay {display:none!important;}}.touch-overlay.touched{opacity:1;}</style>")})}();

/**
 * set form attr data-goal="<scope>:<goal>"
 */
var yandexReachGoal=function(a){if(window.Ya)for(var e=(window.Ya.Metrika||window.Ya.Metrika2).counters(),o=0;o<e.length;o++){var n="yaCounter"+e[o].id;window[n]&&window[n].reachGoal(a)}},googleReachGoal=function(a,e){"function"==typeof gtag?gtag("event",e,{event_category:a}):"undefined"!=typeof GoogleAnalyticsObject?window[GoogleAnalyticsObject]("send","event",a,e):"undefined"!=typeof _gaq&&"function"==typeof _gaq.push&&_gaq.push(["_trackEvent",e,e])},reachGoal=function(a){var e,o="";(e=a.match(/^(.+?):(.+?)$/))&&(o=e[1],a=e[2]),yandexReachGoal(a),o&&(yandexReachGoal(o),googleReachGoal(o,a))};$.fn.reachGoal=function(){return this.filter("[data-goal]").each(function(){reachGoal($(this).attr("data-goal"))})},$(document).on("success-submit","[data-goal]",function(){$(this).reachGoal()});

$.fn.runOnScroll=function(n){this.each(function(o,i){var l=function(){i=$(i);var o=$(this),t=o.scrollTop(),c=i.offset().top,h=i.height()+c;t>c-o.height()&&h>t&&(o.unbind("scroll",l),n(i))};$(window).scroll(l).load(function(){$(this).scroll()})})};

$.cookie=function(e,i,o){if("undefined"==typeof i){var n=null;if(document.cookie&&""!=document.cookie)for(var r=document.cookie.split(";"),t=0;t<r.length;t++){var p=$.trim(r[t]);if(p.substring(0,e.length+1)==e+"="){n=decodeURIComponent(p.substring(e.length+1));break}}return n}o=o||{},null===i&&(i="",o.expires=-1);var u="";if(o.expires&&("number"==typeof o.expires||o.expires.toUTCString)){var s;"number"==typeof o.expires?(s=new Date,s.setTime(s.getTime()+24*o.expires*60*60*1e3)):s=o.expires,u="; expires="+s.toUTCString()}var a=o.path?"; path="+o.path:"",c=o.domain?"; domain="+o.domain:"",m=o.secure?"; secure":"";document.cookie=[e,"=",encodeURIComponent(i),u,a,c,m].join("")};
