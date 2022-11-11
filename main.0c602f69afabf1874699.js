(()=>{"use strict";var e,t=function(e,t,n,r){return new(n||(n=Promise))((function(a,s){function o(e){try{c(r.next(e))}catch(e){s(e)}}function i(e){try{c(r.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,i)}c((r=r.apply(e,t||[])).next())}))},n=function(e,t){var n,r,a,s,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function i(s){return function(i){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(a=2&s[0]?r.return:s[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,s[1])).done)return a;switch(r=0,a&&(s=[2&s[0],a.value]),s[0]){case 0:case 1:a=s;break;case 4:return o.label++,{value:s[1],done:!1};case 5:o.label++,r=s[1],s=[0];continue;case 7:s=o.ops.pop(),o.trys.pop();continue;default:if(!((a=(a=o.trys).length>0&&a[a.length-1])||6!==s[0]&&2!==s[0])){o=0;continue}if(3===s[0]&&(!a||s[1]>a[0]&&s[1]<a[3])){o.label=s[1];break}if(6===s[0]&&o.label<a[1]){o.label=a[1],a=s;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(s);break}a[2]&&o.ops.pop(),o.trys.pop();continue}s=t.call(e,o)}catch(e){s=[6,e],r=0}finally{n=a=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,i])}}},r=4,a=0,s=[],o=document.querySelector(".wrapper"),i=document.querySelector(".spinner_V8m1"),c=document.querySelector(".btn-start"),d=document.querySelector(".result"),l=document.querySelector(".controls-container"),u=document.querySelector(".draggable-objects"),v=document.querySelector(".drop-points"),m=document.querySelector(".form-range"),f=document.querySelector(".count-flags"),h=document.querySelector(".btn-game"),L=document.querySelector(".input-wrapper"),p=document.querySelector(".container-div"),g=document.querySelector(".title"),y=document.querySelector(".btn-again"),b=document.querySelector(".btn-game-over");function E(e,r){return t(this,void 0,void 0,(function(){return n(this,(function(t){return e.innerHTML='<img src="'.concat(r.flagUrl,'" id="').concat(r.code,'" data-url="').concat(r.flagUrl,'">'),[2]}))}))}var S=0,q=0,w={},x=!1,T=function(){try{return document.createEvent("TouchEvent"),!0}catch(e){return!1}},C=function(){w={},l.classList.add("hide"),c.classList.add("hide"),L.classList.remove("hide"),g.textContent="Перетащи флаг на страну",y.classList.add("hide"),p.classList.remove("container-div-win"),p.classList.add("hide"),u.classList.remove("hide")},M=function(){w={},p.classList.add("hide"),l.classList.remove("hide"),c.classList.remove("hide"),b.classList.add("hide"),u.classList.remove("hide"),g.textContent="Перетащи флаг на страну",y.classList.add("hide"),d.textContent=""};function k(e){T()?(S=e.touches[0].clientX,q=e.touches[0].clientY,x=!0,w=e.target):e.dataTransfer.setData("text",e.target.id)}function H(e){e.preventDefault(),e.target.classList.add("over")}var A=function(e){e.preventDefault(),e.target.classList.remove("over")},D=function(e){if(x){e.preventDefault();var t=e.touches[0].clientX,n=e.touches[0].clientY,r=document.getElementById(e.target.id);r.parentElement.style.top=r.parentElement.offsetTop-(q-n)+"px",r.parentElement.style.left=r.parentElement.offsetLeft-(S-t)+"px",S=t,q=n}},j=function(e){var t=e.target;if(e.preventDefault(),T()){x=!1;var n=document.querySelector("div[data-id='".concat(t.id,"']")),s=n.getBoundingClientRect();S>=s.left&&S<=s.right&&q>=s.top&&q<=s.bottom&&(n.classList.add("dropped"),w.classList.add("hide"),n.innerHTML="",n.insertAdjacentHTML("afterbegin",'<img src= "'.concat(w.id,'.png">')),a+=1)}else{var o=e.dataTransfer.getData("text"),i=t.getAttribute("data-id"),c=document.createElement("div");if(c.classList.add("name-country"),c.textContent=t.dataset.name,o===i){var l=document.getElementById(o);t.closest(".flag-div").appendChild(c),t.classList.add("dropped"),l.classList.add("hide");var v=l.closest(".draggable-image");v.setAttribute("draggable","false"),v.style.cursor="default",t.innerHTML="",t.insertAdjacentHTML("afterbegin",'<img src="'.concat(l.dataset.url,'">')),t.classList.remove("over"),t.removeEventListener("dragover",H),a+=1}else t.classList.remove("over"),t.classList.add("error"),setTimeout((function(){t.classList.remove("error")}),300)}a==r&&(d.innerText="Вы победили!",u.classList.add("hide"),p.classList.add("container-div-win"),g.textContent="Вы победили!",r=4,y.classList.remove("hide"),y.addEventListener("click",C))},B=function(){u.innerHTML="",v.innerHTML="";for(var e=[],t=[],n=1;n<=r;n++){var a=Math.floor(Math.random()*s.length);e.includes(a)?n-=1:(e.push(a),t.push(s[a]))}console.log(t);for(var o=0,c=t;o<c.length;o++){n=c[o];var d=document.createElement("div");d.classList.add("draggable-image"),d.setAttribute("draggable","true"),i.classList.remove("hide"),T()&&(d.style.position="absolute"),E(d,n),u.appendChild(d)}for(var l=0,m=t=t.sort((function(){return.5-Math.random()}));l<m.length;l++){n=m[l];var f=document.createElement("div");f.classList.add("flag-div"),f.innerHTML="<div class='countries' data-id='".concat(n.code,"' data-name='").concat(n.nameCountry,"'>\n    ").concat(n.nameCountry,"\n    </div>\n    "),v.appendChild(f)}};function U(){return t(this,void 0,void 0,(function(){var e,t;return n(this,(function(n){switch(n.label){case 0:return L.classList.add("hide"),o.classList.add("wrapper100vh"),i.classList.remove("hide"),[4,fetch("https://restcountries.com/v3.1/all")];case 1:return[4,n.sent().json()];case 2:for(e=n.sent(),t=0;t<e.length;t++)"Непал"!==e[t].translations.rus.common&&"Центральноафриканская Республика"!==e[t].translations.rus.common&&"Шпицберген и Ян-Майен"!==e[t].translations.rus.common&&"Острова Святой Елены, Вознесения и Тристан-да-Кунья"!==e[t].translations.rus.common&&"Сен-Мартен"!==e[t].translations.rus.common&&"Остров Буве"!==e[t].translations.rus.common&&s.push({nameCountry:e[t].translations.rus.common,flagUrl:e[t].flags.png,code:e[t].cca2});return[4,B()];case 3:return n.sent(),o.classList.remove("wrapper100vh"),i.classList.add("hide"),b.classList.remove("hide"),b.addEventListener("click",M),p.classList.remove("hide"),[2]}}))}))}c.addEventListener("click",(function(){return t(void 0,void 0,void 0,(function(){return n(this,(function(e){return w={},l.classList.add("hide"),c.classList.add("hide"),L.classList.remove("hide"),[2]}))}))})),m.addEventListener("input",(function(e){f.textContent=e.target.value,r=e.target.value})),h.addEventListener("click",(function(){return t(void 0,void 0,void 0,(function(){return n(this,(function(t){switch(t.label){case 0:return[4,U()];case 1:return t.sent(),a=0,e=document.querySelectorAll(".countries"),document.querySelectorAll(".draggable-image").forEach((function(e){e.addEventListener("dragstart",k),e.addEventListener("touchstart",k),e.addEventListener("touchend",j),e.addEventListener("touchmove",D)})),e.forEach((function(e){e.addEventListener("dragover",H),e.addEventListener("dragleave",A),e.addEventListener("drop",j)})),[2]}}))}))}))})();