var B=Object.defineProperty;var O=(t,n,e)=>n in t?B(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e;var f=(t,n,e)=>(O(t,typeof n!="symbol"?n+"":n,e),e);function q(){}function G(t,n){for(const e in n)t[e]=n[e];return t}function R(t){return t()}function et(){return Object.create(null)}function z(t){t.forEach(R)}function it(t){return typeof t=="function"}function lt(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function ct(t){return Object.keys(t).length===0}function F(t,...n){if(t==null){for(const i of n)i(void 0);return q}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function rt(t,n,e){t.$$.on_destroy.push(F(n,e))}function st(t,n,e,i){if(t){const l=H(t,n,e,i);return t[0](l)}}function H(t,n,e,i){return t[1]&&i?G(e.ctx.slice(),t[1](i(n))):e.ctx}function ot(t,n,e,i){if(t[2]&&i){const l=t[2](i(e));if(n.dirty===void 0)return l;if(typeof l=="object"){const s=[],c=Math.max(n.dirty.length,l.length);for(let o=0;o<c;o+=1)s[o]=n.dirty[o]|l[o];return s}return n.dirty|l}return n.dirty}function ut(t,n,e,i,l,s){if(l){const c=H(n,e,i,s);t.p(c,l)}}function at(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function ft(t,n,e){return t.set(e),n}let p=!1;function _t(){p=!0}function dt(){p=!1}function I(t,n,e,i){for(;t<n;){const l=t+(n-t>>1);e(l)<=i?t=l+1:n=l}return t}function U(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const r=[];for(let u=0;u<n.length;u++){const a=n[u];a.claim_order!==void 0&&r.push(a)}n=r}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let l=0;for(let r=0;r<n.length;r++){const u=n[r].claim_order,a=(l>0&&n[e[l]].claim_order<=u?l+1:I(1,l,C=>n[e[C]].claim_order,u))-1;i[r]=e[a]+1;const w=a+1;e[w]=r,l=Math.max(w,l)}const s=[],c=[];let o=n.length-1;for(let r=e[l]+1;r!=0;r=i[r-1]){for(s.push(n[r-1]);o>=r;o--)c.push(n[o]);o--}for(;o>=0;o--)c.push(n[o]);s.reverse(),c.sort((r,u)=>r.claim_order-u.claim_order);for(let r=0,u=0;r<c.length;r++){for(;u<s.length&&c[r].claim_order>=s[u].claim_order;)u++;const a=u<s.length?s[u]:null;t.insertBefore(c[r],a)}}function W(t,n){if(p){for(U(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function J(t,n,e){t.insertBefore(n,e||null)}function K(t,n,e){p&&!e?W(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function x(t){t.parentNode&&t.parentNode.removeChild(t)}function ht(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function M(t){return document.createElement(t)}function L(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function T(t){return document.createTextNode(t)}function mt(){return T(" ")}function pt(){return T("")}function yt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function bt(t){return function(n){return n.preventDefault(),t.call(this,n)}}function gt(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function xt(t){return t.dataset.svelteH}function Et(t){return t===""?null:+t}function vt(t){return Array.from(t.childNodes)}function S(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function j(t,n,e,i,l=!1){S(t);const s=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const o=t[c];if(n(o)){const r=e(o);return r===void 0?t.splice(c,1):t[c]=r,l||(t.claim_info.last_index=c),o}}for(let c=t.claim_info.last_index-1;c>=0;c--){const o=t[c];if(n(o)){const r=e(o);return r===void 0?t.splice(c,1):t[c]=r,l?r===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,o}}return i()})();return s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,s}function D(t,n,e,i){return j(t,l=>l.nodeName===n,l=>{const s=[];for(let c=0;c<l.attributes.length;c++){const o=l.attributes[c];e[o.name]||s.push(o.name)}s.forEach(c=>l.removeAttribute(c))},()=>i(n))}function Tt(t,n,e){return D(t,n,e,M)}function Nt(t,n,e){return D(t,n,e,L)}function Q(t,n){return j(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>T(n),!0)}function wt(t){return Q(t," ")}function A(t,n,e){for(let i=e;i<t.length;i+=1){const l=t[i];if(l.nodeType===8&&l.textContent.trim()===n)return i}return-1}function At(t,n){const e=A(t,"HTML_TAG_START",0),i=A(t,"HTML_TAG_END",e+1);if(e===-1||i===-1)return new y(n);S(t);const l=t.splice(e,i-e+1);x(l[0]),x(l[l.length-1]);const s=l.slice(1,l.length-1);if(s.length===0)return new y(n);for(const c of s)c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new y(n,s)}function kt(t,n){n=""+n,t.data!==n&&(t.data=n)}function Ht(t,n){t.value=n??""}function Mt(t,n,e,i){e==null?t.style.removeProperty(n):t.style.setProperty(n,e,"")}function V(t,n,{bubbles:e=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:n,bubbles:e,cancelable:i})}function Lt(t,n){const e=[];let i=0;for(const l of n.childNodes)if(l.nodeType===8){const s=l.textContent.trim();s===`HEAD_${t}_END`?(i-=1,e.push(l)):s===`HEAD_${t}_START`&&(i+=1,e.push(l))}else i>0&&e.push(l);return e}class X{constructor(n=!1){f(this,"is_svg",!1);f(this,"e");f(this,"n");f(this,"t");f(this,"a");this.is_svg=n,this.e=this.n=null}c(n){this.h(n)}m(n,e,i=null){this.e||(this.is_svg?this.e=L(e.nodeName):this.e=M(e.nodeType===11?"TEMPLATE":e.nodeName),this.t=e.tagName!=="TEMPLATE"?e:e.content,this.c(n)),this.i(i)}h(n){this.e.innerHTML=n,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(n){for(let e=0;e<this.n.length;e+=1)J(this.t,this.n[e],n)}p(n){this.d(),this.h(n),this.i(this.a)}d(){this.n.forEach(x)}}class y extends X{constructor(e=!1,i){super(e);f(this,"l");this.e=this.n=null,this.l=i}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let i=0;i<this.n.length;i+=1)K(this.t,this.n[i],e)}}function St(t,n){return new t(n)}let m;function b(t){m=t}function N(){if(!m)throw new Error("Function called outside component initialization");return m}function jt(t){N().$$.on_mount.push(t)}function Dt(t){N().$$.after_update.push(t)}function Pt(){const t=N();return(n,e,{cancelable:i=!1}={})=>{const l=t.$$.callbacks[n];if(l){const s=V(n,e,{cancelable:i});return l.slice().forEach(c=>{c.call(t,s)}),!s.defaultPrevented}return!0}}const h=[],k=[];let d=[];const E=[],P=Promise.resolve();let v=!1;function Y(){v||(v=!0,P.then($))}function Ct(){return Y(),P}function Z(t){d.push(t)}function Bt(t){E.push(t)}const g=new Set;let _=0;function $(){if(_!==0)return;const t=m;do{try{for(;_<h.length;){const n=h[_];_++,b(n),tt(n.$$)}}catch(n){throw h.length=0,_=0,n}for(b(null),h.length=0,_=0;k.length;)k.pop()();for(let n=0;n<d.length;n+=1){const e=d[n];g.has(e)||(g.add(e),e())}d.length=0}while(h.length);for(;E.length;)E.pop()();v=!1,g.clear(),b(t)}function tt(t){if(t.fragment!==null){t.update(),z(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(Z)}}function Ot(t){const n=[],e=[];d.forEach(i=>t.indexOf(i)===-1?n.push(i):e.push(i)),e.forEach(i=>i()),d=n}export{_t as $,rt as A,Ht as B,yt as C,ht as D,z as E,Et as F,Bt as G,Pt as H,L as I,Nt as J,xt as K,ft as L,bt as M,y as N,At as O,F as P,it as Q,et as R,$ as S,ct as T,Z as U,Ot as V,m as W,b as X,R as Y,h as Z,Y as _,mt as a,dt as a0,Dt as b,wt as c,x as d,pt as e,M as f,Tt as g,vt as h,K as i,gt as j,Mt as k,T as l,Q as m,kt as n,jt as o,k as p,St as q,Lt as r,lt as s,Ct as t,W as u,q as v,st as w,ut as x,at as y,ot as z};
