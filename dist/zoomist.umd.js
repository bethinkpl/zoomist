(function(S,_){typeof exports=="object"&&typeof module<"u"?module.exports=_():typeof define=="function"&&define.amd?define(_):(S=typeof globalThis<"u"?globalThis:S||self,S.Zoomist=_())})(this,function(){var k,zt,G,yt,P,At,F,Mt,q,It,K,Ct,J,xt,Q,$t,tt,Nt,et,Bt,st,Wt,nt,Ht;"use strict";var pe=Object.defineProperty;var Ee=(S,_,O)=>_ in S?pe(S,_,{enumerable:!0,configurable:!0,writable:!0,value:O}):S[_]=O;var R=(S,_,O)=>(Ee(S,typeof _!="symbol"?_+"":_,O),O),Se=(S,_,O)=>{if(!_.has(S))throw TypeError("Cannot "+O)};var D=(S,_,O)=>{if(_.has(S))throw TypeError("Cannot add the same private member more than once");_ instanceof WeakSet?_.add(S):_.set(S,O)};var w=(S,_,O)=>(Se(S,_,"access private method"),O);const S="",_=n=>document.contains(W(n)),O=n=>{if(!n)return!1;try{const{constructor:t}=n,{prototype:e}=t,{hasOwnProperty:s}=Object.prototype;return t&&e&&s.call(e,"isPrototypeOf")}catch{return!1}},pt=n=>typeof n=="function",B=n=>!isNaN(Number(n)),at=n=>n==null,W=n=>n instanceof HTMLElement?n:document.querySelector(n),lt=(n,t)=>t?n.closest(`.${t}`):null,X=n=>{const t="touches"in n?n.touches[0]:n;return{clientX:t.clientX,clientY:t.clientY}},H=n=>({clientX:[...n].map(t=>t.clientX).reduce((t,e)=>t+e)/n.length,clientY:[...n].map(t=>t.clientY).reduce((t,e)=>t+e)/n.length}),L=n=>{const{width:t,height:e,top:s,left:i,bottom:a}=n.getBoundingClientRect();return{width:t,height:e,top:s,left:i,bottom:a}},Et=n=>n.length>=2?Math.hypot(n[0].clientX-n[1].clientX,n[0].clientY-n[1].clientY):0,M=(n,t)=>{for(const[e,s]of Object.entries(t))typeof s=="string"&&n.style.setProperty(e,s)},I=(n,t)=>{for(const[e,s]of Object.entries(t))n.setAttribute(e,s)},T=(n,t)=>{for(const[e,s]of Object.entries(t))n[e]=s},z=(n,t,e)=>Math.min(Math.max(n,t),e),Y=n=>{const t=+(Math.round(+(n+"e+2"))+"e-2");return isNaN(t)?0:t},St=n=>{throw new Error(n)},ct=n=>console.warn(n),C=(n="div",t,e,s)=>{const i=document.createElement(n);return t&&i.classList.add(...t.split(" ")),e&&I(i,e),s&&(i.innerHTML=s),i},E="zoomist",Zt=`${E}-container`,bt=`${E}-wrapper`,ht=`${E}-image`,Vt=`${E}-not-draggable`,Ut=`${E}-not-wheelable`,x=`${E}-slider`,jt=`${E}-slider-wrapper`,kt=`${E}-slider-bar`,Gt=`${E}-slider-button`,Z=`${E}-zoomer`,Pt=`${E}-zoomer-button`,dt=`${E}-zoomer-icon`,ut=`${E}-zoomer-in`,ft=`${E}-zoomer-out`,mt=`${E}-zoomer-reset`,Ft=`${E}-zoomer-disabled`,qt={tabindex:"0",role:"slider","aria-label":"slider for zoomist","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":"0","aria-disabled":"false"},gt={tabindex:"0",role:"button",type:"button","aria-disabled":"false"},Kt={...gt,"aria-label":"button for zoom in zoomist"},Jt={...gt,"aria-label":"button for zoom out zoomist"},Qt={...gt,"aria-label":"button for reset zoomist scale"},A=typeof window<"u"&&typeof window.document<"u"&&"ontouchstart"in window,te=A?"touchstart":"mousedown",V=A?"touchmove":"mousemove",U=A?"touchend":"mouseup",ee="wheel",se=["left","right","center"],ne=["top","bottom","center"],Ot="--scale",vt="--translate-x",Tt="--translate-y",ie="--value",Dt={draggable:!0,wheelable:!0,pinchable:!0,bounds:!0,zoomRatio:.1,maxScale:10,minScale:1,initScale:null,dragReleaseOnBounds:!1,wheelReleaseOnMinMax:!1,disableDraggingClass:Vt,disableWheelingClass:Ut},oe={el:null,direction:"horizontal"},re={el:`.${x}`},ae={el:null,inEl:null,outEl:null,resetEl:null,disabledClass:Ft},le={el:`.${Z}`,inEl:`.${ut}`,outEl:`.${ft}`,resetEl:`.${mt}`},ce={ready:null,reset:null,resize:null,beforeDestroy:null,destroy:null,beforeUpdate:null,update:null,zoom:null,wheel:null,dragStart:null,drag:null,dragEnd:null,pinchStart:null,pinch:null,pinchEnd:null,slideStart:null,slide:null,slideEnd:null},he={slider:null,zoomer:null},de=`
<svg viewBox="0 0 12 12" class="${dt}">
  <polygon points="12,5.5 6.5,5.5 6.5,0 5.5,0 5.5,5.5 0,5.5 0,6.5 5.5,6.5 5.5,12 6.5,12 6.5,6.5 12,6.5 "/>
</svg>
`,ue=`
<svg viewBox="0 0 12 12" class="${dt}">
  <rect y="5.5" width="12" height="1"/>
</svg>
`,fe=`
<svg viewBox="0 0 12 12" class="${dt}">
  <path d="m7.45,1.27l.35-.22c.26-.17.34-.52.17-.78-.17-.27-.52-.34-.78-.17l-1.54.99-.19.13-.11.46,1.12,1.75c.11.17.29.26.48.26.1,0,.21-.03.31-.09.26-.17.34-.52.17-.78l-.29-.46c1.85.5,3.22,2.17,3.22,4.18,0,2.39-1.95,4.34-4.34,4.34S1.66,8.92,1.66,6.52c0-1.15.44-2.23,1.25-3.05.22-.22.22-.58,0-.8-.22-.22-.58-.22-.8,0-1.02,1.03-1.58,2.4-1.58,3.85,0,3.02,2.46,5.48,5.48,5.48s5.48-2.46,5.48-5.48c0-2.51-1.71-4.62-4.02-5.26Z"/>
</svg>
`,me={on(n,t){if(!t||!pt(t))return this;const{__events__:e}=this;return n.split(" ").forEach(s=>{const i=s;e[i]||(e[i]=[]),e[i].push(t)}),this},emit(n,...t){const{__events__:e}=this;return e[n]?(e[n].forEach(s=>{pt(s)&&s.apply(this,t)}),this):this},zoom(n,t){const{scale:e}=this.transform,s=this.useFixedRatio(Y(e*(n+1)));return e===s?this:(this.zoomTo(s,t),this)},zoomTo(n,t=!0){const{image:e,transform:{scale:s,translateX:i,translateY:a},options:{bounds:r}}=this;if(n=this.useFixedRatio(n),n===s)return this;if(this.transform.scale=n,!t)return this.emit("zoom",this,this.transform.scale),this;t=typeof t=="boolean"?this.getContainerCenterClient():t;const{clientX:c,clientY:l}=t,{top:h,left:o,width:d,height:f}=L(e),{width:u,height:m}=this.getImageDiff(),b=n/s-1,p=(d/2-c+o)*b+i,g=(f/2-l+h)*b+a,v=r?z(p,u,-u):p,y=r?z(g,m,-m):g;return T(this.transform,{translateX:v,translateY:y}),this.emit("zoom",this,this.transform.scale),this},move(n){const{options:{bounds:t},transform:{translateX:e,translateY:s}}=this,{x:i,y:a}=n,{width:r,height:c}=this.getImageDiff();if(B(i)){const l=e+i,h=t?z(l,r,-r):l;this.transform.translateX=h}if(B(a)){const l=s+a,h=t?z(l,c,-c):l;this.transform.translateY=h}return this},moveTo(n){const{options:{bounds:t}}=this,{x:e,y:s}=n,{width:i,height:a}=this.getImageDiff();if(B(e)){const r=Number(e),c=t?z(r,i,-i):r;this.transform.translateX=c}if(se.some(r=>r===e)){const c={left:-i,right:i,center:0}[e];this.transform.translateX=c}if(B(s)){const r=Number(s),c=t?z(r,a,-a):r;this.transform.translateY=c}if(ne.some(r=>r===s)){const c={top:-a,bottom:a,center:0}[s];this.transform.translateY=c}return this},slideTo(n){const{options:{minScale:t,maxScale:e}}=this,s=(e-t)*n/100+t;return this.zoomTo(s),this},reset(){const{options:{initScale:n}}=this;return T(this.transform,{scale:n,translateX:0,translateY:0}),this.emit("reset",this),this},destroy(n=!1){const{element:t,image:e,controller:s}=this;return this.mounted&&(this.emit("beforeDestroy",this),s.abort(),this.destroyModules(),n&&e&&(this.reset(),e.removeAttribute("style")),t[E]=null,this.mounted=!1,this.emit("destroy",this)),null},update(n){const{element:t,controller:e}=this;return this.emit("beforeUpdate",this),t[E]=null,this.mounted=!1,e.abort(),this.destroyModules(),n&&(this.options=Object.assign({},Dt,O(n)&&n)),this.init(),this.emit("update",this),this},getImageData(){return{...this.data.imageData}},getContainerData(){return{...this.data.containerData}},getSliderValue(){const{__modules__:{slider:n}}=this;return n&&n.value!==void 0?n.value:null},isOnBoundTop(){const{options:{bounds:n}}=this;if(!n)return!1;const{transform:{translateY:t}}=this,{height:e}=this.getImageDiff();return t*-1===Y(e)},isOnBoundBottom(){const{options:{bounds:n}}=this;if(!n)return!1;const{transform:{translateY:t}}=this,{height:e}=this.getImageDiff();return t===Y(e)},isOnBoundLeft(){const{options:{bounds:n}}=this;if(!n)return!1;const{transform:{translateX:t}}=this,{width:e}=this.getImageDiff();return t*-1===Y(e)},isOnBoundRight(){const{options:{bounds:n}}=this;if(!n)return!1;const{transform:{translateX:t}}=this,{width:e}=this.getImageDiff();return t===Y(e)},isOnBoundX(){const{options:{bounds:n}}=this;if(!n)return!1;const{transform:{translateX:t}}=this,{width:e}=this.getImageDiff();return Math.abs(t)===Math.abs(Y(e))},isOnBoundY(){const{options:{bounds:n}}=this;if(!n)return!1;const{transform:{translateY:t}}=this,{height:e}=this.getImageDiff();return Math.abs(t)===Math.abs(Y(e))},isOnMinScale(){const{options:{minScale:n}}=this,{transform:{scale:t}}=this;return t===n},isOnMaxScale(){const{options:{maxScale:n}}=this,{transform:{scale:t}}=this;return t===n},getImageDiff(){const{width:n,height:t}=this.getContainerData(),{width:e,height:s}=this.getImageData();return{width:(n-e)/2,height:(t-s)/2}},getContainerCenterClient(){const{element:n}=this,{top:t,left:e,width:s,height:i}=L(n);return{clientX:e+s/2,clientY:t+i/2}},getScaleRatio(){const{transform:{scale:n},options:{minScale:t,maxScale:e}}=this;return(n-t)/(e-t)},useFixedRatio(n){const{options:{minScale:t,maxScale:e}}=this;return z(n,t,e)}},{defineProperty:j}=Object;class wt{constructor(t,e){D(this,k);D(this,G);D(this,P);D(this,F);D(this,q);D(this,K);D(this,J);D(this,Q);D(this,tt);D(this,et);D(this,st);D(this,nt);R(this,"element");R(this,"options");R(this,"wrapper");R(this,"image");R(this,"mounted");R(this,"data");R(this,"transform");R(this,"states");R(this,"controller");R(this,"__events__");R(this,"__modules__");t||St("The first argument is required."),_(t)||St(`Element ${t} is not exist.`),this.element=W(t),this.options=Object.assign({},Dt,O(e)&&e),this.init()}init(){const{element:t}=this,{options:{bounds:e,minScale:s,maxScale:i,initScale:a}}=this;if(t[E])return;t[E]=this;const r=t.querySelector(`.${bt}`),c=t.querySelector(`.${ht}`);if(!r)return ct(`${E} needs a ".${bt}" element.`);if(!c)return ct(`${E} needs a ".${ht}" element.`);this.options.minScale=e&&s<1?1:s,this.options.maxScale=Math.max(i,s),this.options.initScale=z(a||s,s,i),this.wrapper=r,this.image=c,w(this,k,zt).call(this)}destroyModules(){const{slider:t,zoomer:e}=this.__modules__;t&&this.destroySlider(),e&&this.destroyZoomer()}destroySlider(){var a,r;const{__modules__:{slider:t}}=this;if(!t||!t.mounted)return;const{options:{el:e},controller:s}=t;e===`.${x}`?(a=t.sliderEl)==null||a.remove():(r=t.sliderTrack)==null||r.remove(),s==null||s.abort(),t.mounted=!1}destroyZoomer(){const{__modules__:{zoomer:t}}=this;if(!t||!t.mounted)return;const{options:{el:e,inEl:s,outEl:i,resetEl:a},controller:r,zoomerEl:c,zoomerInEl:l,zoomerOutEl:h,zoomerResetEl:o}=t,d=(f,u,m)=>{f===`.${u}`&&(m==null||m.remove())};[{target:e,className:Z,el:c},{target:s,className:ut,el:l},{target:i,className:ft,el:h},{target:a,className:mt,el:o}].forEach(f=>d(f.target,f.className,f.el)),r==null||r.abort(),t.mounted=!1}}return k=new WeakSet,zt=function(){const{wrapper:t,image:e,options:s}=this,{draggable:i,pinchable:a}=s,{offsetWidth:r,offsetHeight:c}=t,{offsetWidth:l,offsetHeight:h}=e,{width:o,height:d}=L(e);if(!l||!h)return ct(`The width or height of ${ht} should not be 0.`);if(this.transform={scale:0,translateX:0,translateY:0},this.data={imageData:{originWidth:l,originHeight:h,width:o,height:d},containerData:{width:r,height:c}},A&&(i||a)&&(this.data.touchData={hypot:0,startX:0,startY:0,prevX:0,prevY:0,imageTop:0,imageLeft:0,widthDiff:0,heightDiff:0}),!A&&i&&(this.data.dragData={startX:0,startY:0}),this.__events__={...ce},s.on)for(const[f,u]of Object.entries(s.on))this.__events__[f]=[u];if(this.__modules__={...he},s.slider){const f=s.slider===!0?re:s.slider;this.__modules__.slider={options:Object.assign({},oe,f)}}if(s.zoomer){const f=s.zoomer===!0?le:s.zoomer;this.__modules__.zoomer={options:Object.assign({},ae,f)}}this.controller=new AbortController,w(this,G,yt).call(this)},G=new WeakSet,yt=function(){if(this.mounted)return;const{element:t,image:e,options:{minScale:s,maxScale:i,initScale:a},__modules__:{slider:r,zoomer:c}}=this,l=this;M(e,{transform:`
        translate3d(var(${vt}, 0px), var(${Tt}, 0px), 0)
        scale(var(${Ot}, 0))`}),j(this.transform,"scale",{get(){return l.transform.__scale__},set(h){const o=l.useFixedRatio(h);if(!(at(o)||l.transform.__scale__===o)){if(l.transform.__scale__=o,M(e,{[Ot]:o.toString()}),T(l.data.imageData,{width:L(e).width,height:L(e).height}),r){const d=Math.round(l.getScaleRatio()*100);r.value=d}if(c&&c.options.disabledClass){const{zoomerInEl:d,zoomerOutEl:f,zoomerResetEl:u,options:{disabledClass:m}}=c;d&&(d.classList[o===i?"add":"remove"](m),I(d,{"aria-disabled":o===i?"true":"false"})),f&&(f.classList[o===s?"add":"remove"](m),I(f,{"aria-disabled":o===s?"true":"false"})),u&&(u.classList[o===a?"add":"remove"](m),I(u,{"aria-disabled":o===a?"true":"false"}))}}}}),j(this.transform,"translateX",{get(){return l.transform.__translateX__},set(h){const o=Y(h);at(o)||l.transform.__translateX__===o||(l.transform.__translateX__=o,M(e,{[vt]:`${o}px`}))}}),j(this.transform,"translateY",{get(){return l.transform.__translateY__},set(h){const o=Y(h);at(o)||l.transform.__translateY__===o||(l.transform.__translateY__=o,M(e,{[Tt]:`${o}px`}))}}),w(this,P,At).call(this),w(this,Q,$t).call(this),T(this.transform,{scale:a,translateX:0,translateY:0}),t.classList.add(Zt),this.mounted=!0,this.emit("ready",this)},P=new WeakSet,At=function(){const{element:t,wrapper:e,options:s,controller:{signal:i}}=this,{draggable:a,pinchable:r,wheelable:c}=s;if(this.states={},c){this.states.wheeling=!1;const l=h=>w(this,F,Mt).call(this,h);e.addEventListener(ee,l,{signal:i,passive:!1})}if(A&&(a||r)){a&&(this.states.dragging=!1),r&&(this.states.pinching=!1);const l=h=>w(this,K,Ct).call(this,h);t.addEventListener("touchstart",l,{signal:i})}if(!A&&a){this.states.dragging=!1;const l=h=>w(this,q,It).call(this,h);t.addEventListener("mousedown",l,{signal:i})}w(this,J,xt).call(this)},F=new WeakSet,Mt=function(t){const{options:{zoomRatio:e,wheelReleaseOnMinMax:s,disableWheelingClass:i}}=this,a=(t.deltaY||t.detail)>0?-1:1;if(s){const r=this.isOnMinScale(),c=this.isOnMaxScale();r&&a===-1||c&&a===1||t.preventDefault()}else t.preventDefault();this.states.wheeling||lt(t.target,i)||(this.states.wheeling=!0,setTimeout(()=>{this.states.wheeling=!1},15),this.zoom(a*e,X(t)),this.emit("wheel",this,this.transform.scale,t))},q=new WeakSet,It=function(t){const{data:e,transform:s,options:{disableDraggingClass:i}}=this,{dragData:a,imageData:r}=e;if(!a||!r)return;const c=o=>{o&&o.button!==0||this.options.draggable&&(o.preventDefault(),!lt(o.target,i)&&(T(a,{startX:X(o).clientX,startY:X(o).clientY}),this.states.dragging=!0,this.emit("dragStart",this,{x:s.translateX,y:s.translateY},o),document.addEventListener(V,l),document.addEventListener(U,h)))},l=o=>{if(o.touches||!this.states.dragging)return;o.preventDefault();const d=X(o).clientX,f=X(o).clientY,u=d-a.startX+s.translateX,m=f-a.startY+s.translateY;this.moveTo({x:u,y:m}),T(a,{startX:X(o).clientX,startY:X(o).clientY}),this.emit("drag",this,{x:u,y:m},o)},h=o=>{o.touches||(this.states.dragging=!1,this.emit("dragEnd",this,{x:s.translateX,y:s.translateY},o),document.removeEventListener(V,l),document.removeEventListener(U,h))};c(t)},K=new WeakSet,Ct=function(t){const{data:e,transform:s,options:{maxScale:i,minScale:a,draggable:r,pinchable:c,bounds:l,dragReleaseOnBounds:h,disableDraggingClass:o}}=this,{touchData:d,imageData:f}=e;if(!d||!f)return;const u=p=>{const g=p.touches;if(!g||!this.options.draggable)return;if(l&&h){const it=this.isOnBoundX(),ot=this.isOnBoundY();g.length===1&&(it||ot)||p.preventDefault()}else p.preventDefault();if(lt(p.target,o)&&g.length<=1)return;const{top:v,left:y}=L(this.image),{width:$,height:N}=this.getImageDiff();T(d,{hypot:Et(g),startX:H(g).clientX,startY:H(g).clientY,prevX:0,prevY:0,imageTop:v,imageLeft:y,widthDiff:$,heightDiff:N}),r&&(this.states.dragging=!0,this.emit("dragStart",this,{x:s.translateX,y:s.translateY},p)),c&&g.length===2&&(this.states.pinching=!0,this.emit("pinchStart",this,s.scale,p)),document.addEventListener("touchmove",m),document.addEventListener("touchend",b)},m=p=>{const g=p.touches;if(!g)return;const{states:{dragging:v,pinching:y}}=this,{top:$,left:N}=L(this.image),{width:it,height:ot}=this.getImageDiff(),rt=Et(g),Yt=rt?rt/d.hypot:1,_t=this.useFixedRatio(Yt*s.scale),Rt=H(g).clientX+d.prevX,Xt=H(g).clientY+d.prevY;if(y&&g.length===2&&this.zoomTo(_t,!1),v){const Lt=_t!==i&&_t!==a&&c?Yt:1,ge=Y(Rt-d.imageLeft-(it-d.widthDiff)-(d.startX-d.imageLeft)*Lt+s.translateX),_e=Y(Xt-d.imageTop-(ot-d.heightDiff)-(d.startY-d.imageTop)*Lt+s.translateY);this.moveTo({x:ge,y:_e})}T(d,{hypot:rt,startX:Rt,startY:Xt,imageTop:$,imageLeft:N,widthDiff:it,heightDiff:ot}),y&&g.length===2&&this.emit("pinch",this,s.scale,p),v&&this.emit("drag",this,{x:s.translateX,y:s.translateY},p)},b=p=>{const g=p.touches;if(!g)return;const{states:{dragging:v,pinching:y}}=this;if(v&&!g.length&&(this.states.dragging=!1,this.emit("dragEnd",this,{x:s.translateX,y:s.translateY},p)),y&&g.length<2&&(this.states.pinching=!1,this.emit("pinchEnd",this,s.scale,p)),v&&g.length===1){const $=X(p).clientX,N=X(p).clientY;T(d,{prevX:d.startX-$,prevY:d.startY-N})}g.length||(document.removeEventListener("touchmove",m),document.removeEventListener("touchend",b))};u(t)},J=new WeakSet,xt=function(){const{wrapper:t,image:e,transform:s}=this;new ResizeObserver(()=>{const{offsetWidth:a,offsetHeight:r}=t,{width:c,height:l}=this.getContainerData();if(a===c&&r===l)return;const h=s.translateX,o=s.translateY;if(h){const b=a/c*h;this.transform.translateX=b}if(o){const b=r/l*o;this.transform.translateY=b}const{offsetWidth:d,offsetHeight:f}=e,{width:u,height:m}=L(e);T(this.data.containerData,{width:a,height:r}),T(this.data.imageData,{originWidth:d,originHeight:f,width:u,height:m}),this.emit("resize",this)}).observe(t)},Q=new WeakSet,$t=function(){const{slider:t,zoomer:e}=this.__modules__;t&&w(this,tt,Nt).call(this),e&&w(this,st,Wt).call(this)},tt=new WeakSet,Nt=function(){const{element:t,__modules__:{slider:e}}=this;if(!e||e.mounted)return;const{options:{el:s,direction:i}}=e,a=s===`.${x}`;if(!s||!a&&!_(s))return;const r=a?C("div",x):W(s),c=C("div",jt),l=C("span",kt),h=C("span",Gt,{...qt,"aria-orientation":i});r.classList.add(`${x}-${i}`),j(e,"value",{get(){return e.__value__},set(o){e.__value__!==o&&(e.__value__=o,M(r,{[ie]:o.toString()}),I(h,{"aria-valuenow":o.toString()}))}}),T(e,{value:this.getScaleRatio()*100,controller:new AbortController,sliding:!1,sliderEl:r,sliderTrack:c,sliderButton:h}),w(this,et,Bt).call(this),c.append(l,h),r.append(c),a&&t.append(r),e.mounted=!0},et=new WeakSet,Bt=function(){const{options:{minScale:t,maxScale:e},__modules__:{slider:s}}=this;if(!s)return;const{options:{direction:i},controller:a,sliderEl:r,sliderTrack:c}=s;if(!r||!c)return;const l=i==="vertical",h=u=>{const m=L(c),b=m[l?"height":"width"],p=m[l?"bottom":"left"],g=X(u)[l?"clientY":"clientX"],v=Y(z((g-p)*(l?-1:1)/b,0,1));return(e-t)*v+t},o=u=>{if(u instanceof MouseEvent&&u.button!==0)return;s.sliding=!0;const m=h(u);this.zoomTo(m),this.emit("slideStart",this,this.getSliderValue(),u),document.addEventListener(V,d),document.addEventListener(U,f)},d=u=>{if(!s.sliding)return;const m=h(u);this.zoomTo(m),this.emit("slide",this,this.getSliderValue(),u)},f=u=>{this.emit("slideEnd",this,this.getSliderValue(),u),s.sliding=!1,document.removeEventListener(V,d),document.removeEventListener(U,f)};r.addEventListener(te,o,{signal:a==null?void 0:a.signal})},st=new WeakSet,Wt=function(){const{element:t,__modules__:{zoomer:e}}=this;if(!e||e.mounted)return;const{options:{el:s,inEl:i,outEl:a,resetEl:r}}=e,c=[i,a,r],l=(u,m,b,p,g)=>{const v=u===`.${b}`;return!u||!v&&!_(u)?null:(b=c.includes(u)?`${b} ${Pt}`:b,v?C(m,b,p,g):W(u))},h=l(s,"div",Z),o=l(i,"button",ut,Kt,de),d=l(a,"button",ft,Jt,ue),f=l(r,"button",mt,Qt,fe);T(e,{controller:new AbortController,zoomerEl:h,zoomerInEl:o,zoomerOutEl:d,zoomerResetEl:f}),h&&(o&&h.append(o),d&&h.append(d),f&&h.append(f),s===`.${Z}`&&t.append(h)),w(this,nt,Ht).call(this),e.mounted=!0},nt=new WeakSet,Ht=function(){const{options:{zoomRatio:t},__modules__:{zoomer:e}}=this,s=this;if(!e)return;const{controller:i,zoomerInEl:a,zoomerOutEl:r,zoomerResetEl:c}=e;a&&a.addEventListener("click",()=>{s.zoom(t)},{signal:i==null?void 0:i.signal}),r&&r.addEventListener("click",()=>{s.zoom(-t)},{signal:i==null?void 0:i.signal}),c&&c.addEventListener("click",()=>{s.reset()},{signal:i==null?void 0:i.signal})},Object.assign(wt.prototype,me),wt});
