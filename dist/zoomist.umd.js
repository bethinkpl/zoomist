(function(S,_){typeof exports=="object"&&typeof module<"u"?module.exports=_():typeof define=="function"&&define.amd?define(_):(S=typeof globalThis<"u"?globalThis:S||self,S.Zoomist=_())})(this,function(){var G,Ct,P,Mt,F,It,q,xt,K,$t,J,Nt,Q,Bt,tt,Zt,et,Wt,st,kt,nt,Ht,it,Vt,ot,Ut,at,jt;"use strict";var Te=Object.defineProperty;var ve=(S,_,v)=>_ in S?Te(S,_,{enumerable:!0,configurable:!0,writable:!0,value:v}):S[_]=v;var Y=(S,_,v)=>(ve(S,typeof _!="symbol"?_+"":_,v),v),De=(S,_,v)=>{if(!_.has(S))throw TypeError("Cannot "+v)};var O=(S,_,v)=>{if(_.has(S))throw TypeError("Cannot add the same private member more than once");_ instanceof WeakSet?_.add(S):_.set(S,v)};var T=(S,_,v)=>(De(S,_,"access private method"),v);const S="",_=n=>document.contains(W(n)),v=n=>{if(!n)return!1;try{const{constructor:t}=n,{prototype:e}=t,{hasOwnProperty:s}=Object.prototype;return t&&e&&s.call(e,"isPrototypeOf")}catch{return!1}},bt=n=>typeof n=="function",Z=n=>!isNaN(Number(n)),ht=n=>n==null,W=n=>n instanceof HTMLElement?n:document.querySelector(n),dt=(n,t)=>t?n.closest(`.${t}`):null,w=n=>{const t="touches"in n?n.touches[0]:n;return{clientX:t.clientX,clientY:t.clientY}},k=n=>({clientX:[...n].map(t=>t.clientX).reduce((t,e)=>t+e)/n.length,clientY:[...n].map(t=>t.clientY).reduce((t,e)=>t+e)/n.length}),z=n=>{const{width:t,height:e,top:s,left:o,bottom:r}=n.getBoundingClientRect();return{width:t,height:e,top:s,left:o,bottom:r}},Ot=n=>n.length>=2?Math.hypot(n[0].clientX-n[1].clientX,n[0].clientY-n[1].clientY):0,M=(n,t)=>{for(const[e,s]of Object.entries(t))typeof s=="string"&&n.style.setProperty(e,s)},I=(n,t)=>{for(const[e,s]of Object.entries(t))n.setAttribute(e,s)},D=(n,t)=>{for(const[e,s]of Object.entries(t))n[e]=s},L=(n,t,e)=>Math.min(Math.max(n,t),e),R=n=>{const t=+(Math.round(+(n+"e+2"))+"e-2");return isNaN(t)?0:t},Tt=n=>{throw new Error(n)},ut=n=>console.warn(n),x=(n="div",t,e,s)=>{const o=document.createElement(n);return t&&o.classList.add(...t.split(" ")),e&&I(o,e),s&&(o.innerHTML=s),o},E="zoomist",Gt=`${E}-container`,vt=`${E}-wrapper`,mt=`${E}-image`,Pt=`${E}-not-draggable`,Ft=`${E}-not-wheelable`,$=`${E}-slider`,qt=`${E}-slider-wrapper`,Kt=`${E}-slider-bar`,Jt=`${E}-slider-button`,H=`${E}-zoomer`,Qt=`${E}-zoomer-button`,ft=`${E}-zoomer-icon`,gt=`${E}-zoomer-in`,_t=`${E}-zoomer-out`,pt=`${E}-zoomer-reset`,te=`${E}-zoomer-disabled`,ee={tabindex:"0",role:"slider","aria-label":"slider for zoomist","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":"0","aria-disabled":"false"},Et={tabindex:"0",role:"button",type:"button","aria-disabled":"false"},se={...Et,"aria-label":"button for zoom in zoomist"},ne={...Et,"aria-label":"button for zoom out zoomist"},ie={...Et,"aria-label":"button for reset zoomist scale"},y=typeof window<"u"&&typeof window.document<"u"&&"ontouchstart"in window,oe=y?"touchstart":"mousedown",V=y?"touchmove":"mousemove",U=y?"touchend":"mouseup",ae="wheel",re=["left","right","center"],le=["top","bottom","center"],Dt="--scale",wt="--translate-x",Rt="--translate-y",ce="--value",Yt={clickable:!1,dblClickable:!1,draggable:!0,wheelable:!0,pinchable:!0,bounds:!0,zoomRatio:.1,dblClickZoomRatio:1,maxScale:10,minScale:1,initScale:null,dragReleaseOnBounds:!1,wheelReleaseOnMinMax:!1,disableDraggingClass:Pt,disableWheelingClass:Ft},he={el:null,direction:"horizontal"},de={el:`.${$}`},ue={el:null,inEl:null,outEl:null,resetEl:null,disabledClass:te},me={el:`.${H}`,inEl:`.${gt}`,outEl:`.${_t}`,resetEl:`.${pt}`},fe={ready:null,reset:null,resize:null,beforeDestroy:null,destroy:null,dblClick:null,beforeUpdate:null,update:null,zoom:null,wheel:null,dragStart:null,drag:null,dragEnd:null,pinchStart:null,pinch:null,pinchEnd:null,slideStart:null,slide:null,slideEnd:null},ge={slider:null,zoomer:null},_e=`
<svg viewBox="0 0 12 12" class="${ft}">
  <polygon points="12,5.5 6.5,5.5 6.5,0 5.5,0 5.5,5.5 0,5.5 0,6.5 5.5,6.5 5.5,12 6.5,12 6.5,6.5 12,6.5 "/>
</svg>
`,pe=`
<svg viewBox="0 0 12 12" class="${ft}">
  <rect y="5.5" width="12" height="1"/>
</svg>
`,Ee=`
<svg viewBox="0 0 12 12" class="${ft}">
  <path d="m7.45,1.27l.35-.22c.26-.17.34-.52.17-.78-.17-.27-.52-.34-.78-.17l-1.54.99-.19.13-.11.46,1.12,1.75c.11.17.29.26.48.26.1,0,.21-.03.31-.09.26-.17.34-.52.17-.78l-.29-.46c1.85.5,3.22,2.17,3.22,4.18,0,2.39-1.95,4.34-4.34,4.34S1.66,8.92,1.66,6.52c0-1.15.44-2.23,1.25-3.05.22-.22.22-.58,0-.8-.22-.22-.58-.22-.8,0-1.02,1.03-1.58,2.4-1.58,3.85,0,3.02,2.46,5.48,5.48,5.48s5.48-2.46,5.48-5.48c0-2.51-1.71-4.62-4.02-5.26Z"/>
</svg>
`,Se={on(n,t){if(!t||!bt(t))return this;const{__events__:e}=this;return n.split(" ").forEach(s=>{const o=s;e[o]||(e[o]=[]),e[o].push(t)}),this},emit(n,...t){const{__events__:e}=this;return e[n]?(e[n].forEach(s=>{bt(s)&&s.apply(this,t)}),this):this},zoom(n,t){const{scale:e}=this.transform,s=this.useFixedRatio(R(e*(n+1)));return e===s?this:(this.zoomTo(s,t),this)},zoomTo(n,t=!0){const{image:e,transform:{scale:s,translateX:o,translateY:r},options:{bounds:a}}=this;if(n=this.useFixedRatio(n),n===s)return this;if(this.transform.scale=n,!t)return this.emit("zoom",this,this.transform.scale),this;t=typeof t=="boolean"?this.getContainerCenterClient():t;const{clientX:l,clientY:c}=t,{top:d,left:i,width:m,height:h}=z(e),{width:u,height:g}=this.getImageDiff(),b=n/s-1,A=(m/2-l+i)*b+o,p=(h/2-c+d)*b+r,f=a?L(A,u,-u):A,X=a?L(p,g,-g):p;return D(this.transform,{translateX:f,translateY:X}),this.emit("zoom",this,this.transform.scale),this},move(n){const{options:{bounds:t},transform:{translateX:e,translateY:s}}=this,{x:o,y:r}=n,{width:a,height:l}=this.getImageDiff();if(Z(o)){const c=e+o,d=t?L(c,a,-a):c;this.transform.translateX=d}if(Z(r)){const c=s+r,d=t?L(c,l,-l):c;this.transform.translateY=d}return this},moveTo(n){const{options:{bounds:t}}=this,{x:e,y:s}=n,{width:o,height:r}=this.getImageDiff();if(Z(e)){const a=Number(e),l=t?L(a,o,-o):a;this.transform.translateX=l}if(re.some(a=>a===e)){const l={left:-o,right:o,center:0}[e];this.transform.translateX=l}if(Z(s)){const a=Number(s),l=t?L(a,r,-r):a;this.transform.translateY=l}if(le.some(a=>a===s)){const l={top:-r,bottom:r,center:0}[s];this.transform.translateY=l}return this},slideTo(n){const{options:{minScale:t,maxScale:e}}=this,s=(e-t)*n/100+t;return this.zoomTo(s),this},reset(){const{options:{initScale:n}}=this;return D(this.transform,{scale:n,translateX:0,translateY:0}),this.emit("reset",this),this},destroy(n=!1){const{element:t,image:e,controller:s}=this;return this.mounted&&(this.emit("beforeDestroy",this),s.abort(),this.destroyModules(),n&&e&&(this.reset(),e.removeAttribute("style")),t[E]=null,this.mounted=!1,this.emit("destroy",this)),null},update(n){const{element:t,controller:e}=this;return this.emit("beforeUpdate",this),t[E]=null,this.mounted=!1,e.abort(),this.destroyModules(),n&&(this.options=Object.assign({},Yt,v(n)&&n)),this.init(),this.emit("update",this),this},getImageData(){return{...this.data.imageData}},getContainerData(){return{...this.data.containerData}},getSliderValue(){const{__modules__:{slider:n}}=this;return n&&n.value!==void 0?n.value:null},isOnBoundTop(){const{options:{bounds:n}}=this;if(!n)return!1;const{transform:{translateY:t}}=this,{height:e}=this.getImageDiff();return t*-1===R(e)},isOnBoundBottom(){const{options:{bounds:n}}=this;if(!n)return!1;const{transform:{translateY:t}}=this,{height:e}=this.getImageDiff();return t===R(e)},isOnBoundLeft(){const{options:{bounds:n}}=this;if(!n)return!1;const{transform:{translateX:t}}=this,{width:e}=this.getImageDiff();return t*-1===R(e)},isOnBoundRight(){const{options:{bounds:n}}=this;if(!n)return!1;const{transform:{translateX:t}}=this,{width:e}=this.getImageDiff();return t===R(e)},isOnBoundX(){const{options:{bounds:n}}=this;if(!n)return!1;const{transform:{translateX:t}}=this,{width:e}=this.getImageDiff();return Math.abs(t)===Math.abs(R(e))},isOnBoundY(){const{options:{bounds:n}}=this;if(!n)return!1;const{transform:{translateY:t}}=this,{height:e}=this.getImageDiff();return Math.abs(t)===Math.abs(R(e))},isOnMinScale(){const{options:{minScale:n}}=this,{transform:{scale:t}}=this;return t===n},isOnMaxScale(){const{options:{maxScale:n}}=this,{transform:{scale:t}}=this;return t===n},getImageDiff(){const{width:n,height:t}=this.getContainerData(),{width:e,height:s}=this.getImageData();return{width:(n-e)/2,height:(t-s)/2}},getContainerCenterClient(){const{element:n}=this,{top:t,left:e,width:s,height:o}=z(n);return{clientX:e+s/2,clientY:t+o/2}},getScaleRatio(){const{transform:{scale:n},options:{minScale:t,maxScale:e}}=this;return(n-t)/(e-t)},useFixedRatio(n){const{options:{minScale:t,maxScale:e}}=this;return L(n,t,e)}},{defineProperty:j}=Object;class Xt{constructor(t,e){O(this,G);O(this,P);O(this,F);O(this,q);O(this,K);O(this,J);O(this,Q);O(this,tt);O(this,et);O(this,st);O(this,nt);O(this,it);O(this,ot);O(this,at);Y(this,"element");Y(this,"options");Y(this,"wrapper");Y(this,"image");Y(this,"mounted");Y(this,"data");Y(this,"transform");Y(this,"states");Y(this,"controller");Y(this,"__events__");Y(this,"__modules__");t||Tt("The first argument is required."),_(t)||Tt(`Element ${t} is not exist.`),this.element=W(t),this.options=Object.assign({},Yt,v(e)&&e),this.init()}init(){const{element:t}=this,{options:{bounds:e,minScale:s,maxScale:o,initScale:r}}=this;if(t[E])return;t[E]=this;const a=t.querySelector(`.${vt}`),l=t.querySelector(`.${mt}`);if(!a)return ut(`${E} needs a ".${vt}" element.`);if(!l)return ut(`${E} needs a ".${mt}" element.`);this.options.minScale=e&&s<1?1:s,this.options.maxScale=Math.max(o,s),this.options.initScale=L(r||s,s,o),this.wrapper=a,this.image=l,T(this,G,Ct).call(this)}destroyModules(){const{slider:t,zoomer:e}=this.__modules__;t&&this.destroySlider(),e&&this.destroyZoomer()}destroySlider(){var r,a;const{__modules__:{slider:t}}=this;if(!t||!t.mounted)return;const{options:{el:e},controller:s}=t;e===`.${$}`?(r=t.sliderEl)==null||r.remove():(a=t.sliderTrack)==null||a.remove(),s==null||s.abort(),t.mounted=!1}destroyZoomer(){const{__modules__:{zoomer:t}}=this;if(!t||!t.mounted)return;const{options:{el:e,inEl:s,outEl:o,resetEl:r},controller:a,zoomerEl:l,zoomerInEl:c,zoomerOutEl:d,zoomerResetEl:i}=t,m=(h,u,g)=>{h===`.${u}`&&(g==null||g.remove())};[{target:e,className:H,el:l},{target:s,className:gt,el:c},{target:o,className:_t,el:d},{target:r,className:pt,el:i}].forEach(h=>m(h.target,h.className,h.el)),a==null||a.abort(),t.mounted=!1}}return G=new WeakSet,Ct=function(){const{wrapper:t,image:e,options:s}=this,{draggable:o,pinchable:r}=s,{offsetWidth:a,offsetHeight:l}=t,{offsetWidth:c,offsetHeight:d}=e,{width:i,height:m}=z(e);if(!c||!d)return ut(`The width or height of ${mt} should not be 0.`);if(this.transform={scale:0,translateX:0,translateY:0},this.data={imageData:{originWidth:c,originHeight:d,width:i,height:m},containerData:{width:a,height:l},dblTouchData:{lastTouchTime:0}},y&&(o||r)&&(this.data.touchData={hypot:0,startX:0,startY:0,prevX:0,prevY:0,imageTop:0,imageLeft:0,widthDiff:0,heightDiff:0}),!y&&o&&(this.data.dragData={startX:0,startY:0}),this.__events__={...fe},s.on)for(const[h,u]of Object.entries(s.on))this.__events__[h]=[u];if(this.__modules__={...ge},s.slider){const h=s.slider===!0?de:s.slider;this.__modules__.slider={options:Object.assign({},he,h)}}if(s.zoomer){const h=s.zoomer===!0?me:s.zoomer;this.__modules__.zoomer={options:Object.assign({},ue,h)}}this.controller=new AbortController,T(this,P,Mt).call(this)},P=new WeakSet,Mt=function(){if(this.mounted)return;const{element:t,image:e,options:{minScale:s,maxScale:o,initScale:r},__modules__:{slider:a,zoomer:l}}=this,c=this;M(e,{transform:`
        translateX(var(${wt}, 0px))
        translateY(var(${Rt}, 0px))
        scale(var(${Dt}, 0))`}),j(this.transform,"scale",{get(){return c.transform.__scale__},set(d){const i=c.useFixedRatio(d);if(!(ht(i)||c.transform.__scale__===i)){if(c.transform.__scale__=i,M(e,{[Dt]:i.toString()}),D(c.data.imageData,{width:z(e).width,height:z(e).height}),a){const m=Math.round(c.getScaleRatio()*100);a.value=m}if(l&&l.options.disabledClass){const{zoomerInEl:m,zoomerOutEl:h,zoomerResetEl:u,options:{disabledClass:g}}=l;m&&(m.classList[i===o?"add":"remove"](g),I(m,{"aria-disabled":i===o?"true":"false"})),h&&(h.classList[i===s?"add":"remove"](g),I(h,{"aria-disabled":i===s?"true":"false"})),u&&(u.classList[i===r?"add":"remove"](g),I(u,{"aria-disabled":i===r?"true":"false"}))}}}}),j(this.transform,"translateX",{get(){return c.transform.__translateX__},set(d){const i=R(d);ht(i)||c.transform.__translateX__===i||(c.transform.__translateX__=i,M(e,{[wt]:`${i}px`}))}}),j(this.transform,"translateY",{get(){return c.transform.__translateY__},set(d){const i=R(d);ht(i)||c.transform.__translateY__===i||(c.transform.__translateY__=i,M(e,{[Rt]:`${i}px`}))}}),T(this,F,It).call(this),T(this,st,kt).call(this),D(this.transform,{scale:r,translateX:0,translateY:0}),t.classList.add(Gt),this.mounted=!0,this.emit("ready",this)},F=new WeakSet,It=function(){const{element:t,image:e,wrapper:s,options:o,controller:{signal:r}}=this,{draggable:a,pinchable:l,wheelable:c,dblClickable:d}=o;if(this.states={},c){this.states.wheeling=!1;const i=m=>T(this,q,xt).call(this,m);s.addEventListener(ae,i,{signal:r,passive:!1})}if(y&&(a||l)){a&&(this.states.dragging=!1),l&&(this.states.pinching=!1);const i=m=>T(this,tt,Zt).call(this,m);t.addEventListener("touchstart",i,{signal:r})}if(!y&&a){this.states.dragging=!1;const i=m=>T(this,Q,Bt).call(this,m);t.addEventListener("mousedown",i,{signal:r})}if(y&&d&&e){const i=m=>T(this,J,Nt).call(this,m);e.addEventListener("touchstart",i,{signal:r})}if(!y&&d&&e){const i=m=>T(this,K,$t).call(this,m);e.addEventListener("dblclick",i,{signal:r})}T(this,et,Wt).call(this)},q=new WeakSet,xt=function(t){const{options:{zoomRatio:e,wheelReleaseOnMinMax:s,disableWheelingClass:o}}=this,r=(t.deltaY||t.detail)>0?-1:1;if(s){const a=this.isOnMinScale(),l=this.isOnMaxScale();a&&r===-1||l&&r===1||t.preventDefault()}else t.preventDefault();this.states.wheeling||dt(t.target,o)||(this.states.wheeling=!0,setTimeout(()=>{this.states.wheeling=!1},15),this.zoom(r*e,w(t)),this.emit("wheel",this,this.transform.scale,t))},K=new WeakSet,$t=function(t){t.preventDefault();const{options:{dblClickZoomRatio:e}}=this;this.isOnMinScale()?this.zoom(e,w(t)):this.zoom(-1),this.emit("dblClick",this,this.transform.scale,t)},J=new WeakSet,Nt=function(t){if(t.touches.length===1)if(Date.now()-this.data.dblTouchData.lastTouchTime<300){t.preventDefault();const{options:{dblClickZoomRatio:e}}=this;this.isOnMinScale()?this.zoom(e,w(t)):this.zoom(-1),this.data.dblTouchData.lastTouchTime=0,this.emit("dblClick",this,this.transform.scale,t)}else this.data.dblTouchData.lastTouchTime=Date.now()},Q=new WeakSet,Bt=function(t){const{data:e,transform:s,options:{disableDraggingClass:o}}=this,{dragData:r,imageData:a}=e;if(!r||!a)return;const l=i=>{i&&i.button!==0||this.options.draggable&&(i.preventDefault(),!dt(i.target,o)&&(D(r,{startX:w(i).clientX,startY:w(i).clientY}),this.states.dragging=!0,this.emit("dragStart",this,{x:s.translateX,y:s.translateY},i),document.addEventListener(V,c),document.addEventListener(U,d)))},c=i=>{if(i.touches||!this.states.dragging)return;i.preventDefault();const m=w(i).clientX,h=w(i).clientY,u=m-r.startX+s.translateX,g=h-r.startY+s.translateY;this.moveTo({x:u,y:g}),D(r,{startX:w(i).clientX,startY:w(i).clientY}),this.emit("drag",this,{x:u,y:g},i)},d=i=>{i.touches||(this.states.dragging=!1,this.emit("dragEnd",this,{x:s.translateX,y:s.translateY},i),document.removeEventListener(V,c),document.removeEventListener(U,d))};l(t)},tt=new WeakSet,Zt=function(t){const{data:e,transform:s,options:{maxScale:o,minScale:r,draggable:a,pinchable:l,bounds:c,dragReleaseOnBounds:d,disableDraggingClass:i,clickable:m}}=this,{touchData:h,imageData:u}=e;if(!h||!u)return;const g=p=>{const f=p.touches;if(!f||!this.options.draggable)return;if(c&&d){const rt=this.isOnBoundX(),lt=this.isOnBoundY();f.length===1&&(rt||lt)||p.preventDefault()}else m||p.preventDefault();if(dt(p.target,i)&&f.length<=1)return;const{top:X,left:C}=z(this.image),{width:N,height:B}=this.getImageDiff();D(h,{hypot:Ot(f),startX:k(f).clientX,startY:k(f).clientY,prevX:0,prevY:0,imageTop:X,imageLeft:C,widthDiff:N,heightDiff:B}),a&&(this.states.dragging=!0,this.emit("dragStart",this,{x:s.translateX,y:s.translateY},p)),l&&f.length===2&&(this.states.pinching=!0,this.emit("pinchStart",this,s.scale,p)),document.addEventListener("touchmove",b),document.addEventListener("touchend",A)},b=p=>{const f=p.touches;if(!f)return;const{states:{dragging:X,pinching:C}}=this,{top:N,left:B}=z(this.image),{width:rt,height:lt}=this.getImageDiff(),ct=Ot(f),zt=ct?ct/h.hypot:1,St=this.useFixedRatio(zt*s.scale),Lt=k(f).clientX+h.prevX,yt=k(f).clientY+h.prevY;if(C&&f.length===2&&this.zoomTo(St,!1),X){const At=St!==o&&St!==r&&l?zt:1,be=R(Lt-h.imageLeft-(rt-h.widthDiff)-(h.startX-h.imageLeft)*At+s.translateX),Oe=R(yt-h.imageTop-(lt-h.heightDiff)-(h.startY-h.imageTop)*At+s.translateY);this.moveTo({x:be,y:Oe})}D(h,{hypot:ct,startX:Lt,startY:yt,imageTop:N,imageLeft:B,widthDiff:rt,heightDiff:lt}),C&&f.length===2&&this.emit("pinch",this,s.scale,p),X&&this.emit("drag",this,{x:s.translateX,y:s.translateY},p)},A=p=>{const f=p.touches;if(!f)return;const{states:{dragging:X,pinching:C}}=this;if(X&&!f.length&&(this.states.dragging=!1,this.emit("dragEnd",this,{x:s.translateX,y:s.translateY},p)),C&&f.length<2&&(this.states.pinching=!1,this.emit("pinchEnd",this,s.scale,p)),X&&f.length===1){const N=w(p).clientX,B=w(p).clientY;D(h,{prevX:h.startX-N,prevY:h.startY-B})}f.length||(document.removeEventListener("touchmove",b),document.removeEventListener("touchend",A))};g(t)},et=new WeakSet,Wt=function(){const{wrapper:t,image:e,transform:s}=this;new ResizeObserver(()=>{const{offsetWidth:r,offsetHeight:a}=t,{width:l,height:c}=this.getContainerData();if(r===l&&a===c)return;const d=s.translateX,i=s.translateY;if(d){const b=r/l*d;this.transform.translateX=b}if(i){const b=a/c*i;this.transform.translateY=b}const{offsetWidth:m,offsetHeight:h}=e,{width:u,height:g}=z(e);D(this.data.containerData,{width:r,height:a}),D(this.data.imageData,{originWidth:m,originHeight:h,width:u,height:g}),this.emit("resize",this)}).observe(t)},st=new WeakSet,kt=function(){const{slider:t,zoomer:e}=this.__modules__;t&&T(this,nt,Ht).call(this),e&&T(this,ot,Ut).call(this)},nt=new WeakSet,Ht=function(){const{element:t,__modules__:{slider:e}}=this;if(!e||e.mounted)return;const{options:{el:s,direction:o}}=e,r=s===`.${$}`;if(!s||!r&&!_(s))return;const a=r?x("div",$):W(s),l=x("div",qt),c=x("span",Kt),d=x("span",Jt,{...ee,"aria-orientation":o});a.classList.add(`${$}-${o}`),j(e,"value",{get(){return e.__value__},set(i){e.__value__!==i&&(e.__value__=i,M(a,{[ce]:i.toString()}),I(d,{"aria-valuenow":i.toString()}))}}),D(e,{value:this.getScaleRatio()*100,controller:new AbortController,sliding:!1,sliderEl:a,sliderTrack:l,sliderButton:d}),T(this,it,Vt).call(this),l.append(c,d),a.append(l),r&&t.append(a),e.mounted=!0},it=new WeakSet,Vt=function(){const{options:{minScale:t,maxScale:e},__modules__:{slider:s}}=this;if(!s)return;const{options:{direction:o},controller:r,sliderEl:a,sliderTrack:l}=s;if(!a||!l)return;const c=o==="vertical",d=u=>{const g=z(l),b=g[c?"height":"width"],A=g[c?"bottom":"left"],p=w(u)[c?"clientY":"clientX"],f=R(L((p-A)*(c?-1:1)/b,0,1));return(e-t)*f+t},i=u=>{if(u instanceof MouseEvent&&u.button!==0)return;s.sliding=!0;const g=d(u);this.zoomTo(g),this.emit("slideStart",this,this.getSliderValue(),u),document.addEventListener(V,m),document.addEventListener(U,h)},m=u=>{if(!s.sliding)return;const g=d(u);this.zoomTo(g),this.emit("slide",this,this.getSliderValue(),u)},h=u=>{this.emit("slideEnd",this,this.getSliderValue(),u),s.sliding=!1,document.removeEventListener(V,m),document.removeEventListener(U,h)};a.addEventListener(oe,i,{signal:r==null?void 0:r.signal})},ot=new WeakSet,Ut=function(){const{element:t,__modules__:{zoomer:e}}=this;if(!e||e.mounted)return;const{options:{el:s,inEl:o,outEl:r,resetEl:a}}=e,l=[o,r,a],c=(u,g,b,A,p)=>{const f=u===`.${b}`;return!u||!f&&!_(u)?null:(b=l.includes(u)?`${b} ${Qt}`:b,f?x(g,b,A,p):W(u))},d=c(s,"div",H),i=c(o,"button",gt,se,_e),m=c(r,"button",_t,ne,pe),h=c(a,"button",pt,ie,Ee);D(e,{controller:new AbortController,zoomerEl:d,zoomerInEl:i,zoomerOutEl:m,zoomerResetEl:h}),d&&(i&&d.append(i),m&&d.append(m),h&&d.append(h),s===`.${H}`&&t.append(d)),T(this,at,jt).call(this),e.mounted=!0},at=new WeakSet,jt=function(){const{options:{zoomRatio:t},__modules__:{zoomer:e}}=this,s=this;if(!e)return;const{controller:o,zoomerInEl:r,zoomerOutEl:a,zoomerResetEl:l}=e;r&&r.addEventListener("click",()=>{s.zoom(t)},{signal:o==null?void 0:o.signal}),a&&a.addEventListener("click",()=>{s.zoom(-t)},{signal:o==null?void 0:o.signal}),l&&l.addEventListener("click",()=>{s.reset()},{signal:o==null?void 0:o.signal})},Object.assign(Xt.prototype,Se),Xt});
