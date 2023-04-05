(()=>{var e={518:(e,t,r)=>{const{clone:o}=r(544);e.exports=e=>{const t=new Map,r=new Map;return{await:(e,s)=>{const n=r.get(e);return new Promise(((r,a)=>{n&&n(o(s)),t.set(e,{resolve:r,reject:a})}))},suspend:(t,o)=>{if("function"!=typeof o)return e.debug.warn("async::suspend| invalid param",[t,o]);r.set(t,o)},resolve:(e,r)=>{const s=t.get(e);s&&s.resolve(o(r))},reject:(e,r)=>{const s=t.get(e);s&&s.reject(o(r))}}}},520:e=>{const t=e=>e,r="[br=debug-active]",o=!!localStorage.getItem(r);e.exports=({name:e})=>{const s=e=>localStorage.setItem(r,e?"1":"");return s.info=o?console.info.bind(window,`%c[${e}|%s]`,"font-weight:bold;color:green;"):t,s.success=o?console.info.bind(window,`%c[${e}|%s]`,"font-weight:bold;color:blue;"):t,s.danger=o?console.info.bind(window,`%c[${e}|%s]`,"font-weight:bold;color:red;"):t,s.log=o?console.log.bind(window,`%c[${e}]`,"font-weight:bold"):t,s.warn=o?console.warn.bind(window,`[${e}]`):t,s.dir=o?console.dir.bind(window):t,s.error=console.error.bind(window,`[${e}]`),s}},443:(e,t,r)=>{const{define:o,entries:s,kebabCase:n,mixinElement:a}=r(544),i=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hr","i","iframe","img","input","ins","kbd","label","legend","li","link","main","map","mark","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","small","source","span","strong","sub","summary","sup","svg","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr"];e.exports=e=>{const t={_it:new Map,set(e,t){if("function"!=typeof t)throw`'${e}' is not function`;this._it.set(e,t)},get(e){return this._it.has(e)?this._it.get(e)(r):void 0}},r=o({},{set:{get:()=>(e,r)=>t.set(e,r)},get:{get:()=>e=>t.get(e)}});return i.forEach((e=>o(r,{[e]:{get:()=>(e=>{const t=a(document.createElement(e));return(...e)=>(e.reduce(((e,r)=>("string"==typeof r?t.textContent=r:"function"==typeof r?requestAnimationFrame((e=>r(t))):Array.isArray(r)?e=r:s(r).forEach((([e,r])=>t.setAttribute(n(e),r))),e)),[]).forEach((e=>t.appendChild(e))),t)})(e)}}))),r}},539:(e,t,r)=>{const{define:o,assign:s,entries:n,snakeCase:a,kebabCase:i,mixinElement:c}=r(544);e.exports=e=>{const t=new Map,r=(e,r)=>t.set(e,r),d=e=>t.get(e),l=(e,t=document)=>c(t.querySelector(e)),u=(e,t)=>{const{body:r}=document;if(t){const o="string"==typeof t?r.querySelector(t):t;return r.insertBefore(e,o)}return r.appendChild(e)},p=e=>{const t=[...("string"==typeof e?document.querySelector(e):e).querySelectorAll("[data-vo]")],r=t.reduce(((e,t)=>{const{dataset:{vo:r}}=t;return e[r]?Array.isArray(e[r])?e[r].push(c(t)):e[r]=[e[r],c(t)]:e[r]=c(t),e}),{}),d=(e,{snake:o,kebab:n}={})=>t.reduce(((t,c)=>{const{dataset:{vo:d}}=c,l=r[d];return l?Array.isArray(l)?t:s(t,null!=o?{[a(d,o)]:l[e]}:null!=n?{[i(d,o)]:l[e]}:{[d]:l[e]}):t}),{}),l=(e,t={})=>n(t).reduce(((t,[r,o])=>{const n=t[r];return n&&s(n,{[e]:o}),t}),r),u=e=>d("value",e),p=e=>l("value",e),g=e=>d("text",e),b=e=>l("text",e),m=e=>d("html",e),f=e=>l("html",e);return o(r,{getValues:{get:()=>u},setValues:{get:()=>p},getTexts:{get:()=>g},setTexts:{get:()=>b},getHtmls:{get:()=>m},setHtmls:{get:()=>f}})};return o({},{set:{get:()=>r},get:{get:()=>d},query:{get:()=>l},insert:{get:()=>u},dataVo:{get:()=>p}})}},544:e=>{const t=Object.assign,r=Object.entries,o=(e,t)=>r(t).reduce(((e,[t,r])=>void 0===e[t]?Object.defineProperty(e,t,r):e),e),s=(e,t)=>e.replace(/([a-z0-9])([A-Z])/g,t),n=e=>/[-_]/g.test(e)?e.toLowerCase().replace(/([_-]\w)/g,(e=>e[1].toUpperCase())).replace(/_/g,""):e;e.exports={assign:t,entries:r,clone:e=>Array.isArray(e)?e.slice(0):"object"==typeof e?Object.assign({},e):e,define:o,kebabCase:(e,t=!0)=>{const r=s(e,"$1-$2").toLowerCase();return t?r.toLowerCase():r.toUpperCase()},snakeCase:(e,t=!0)=>{const r=s(e,"$1_$2");return t?r.toUpperCase():r.toLowerCase()},camelCase:e=>n(e).replace(/^[\w]/,(e=>e.toLowerCase())),pascalCase:e=>n(e).replace(/^[\w]/,(e=>e.toUpperCase())),mixinElement:e=>{if(!e)return;const t={get:()=>e.textContent,set(t){e.textContent=t}},r={get:()=>e.innerHTML,set(t){e.innerHTML=t}},s={get:()=>e._value||"",set(t){e._value=t}},n={get:()=>(t,r)=>e.addEventListener(t,r)},a={get:()=>(t,r)=>{if(r){const o="string"==typeof r?e.querySelector(r):r;return e.insertBefore(t,o)}return e.appendChild(t)}},i={get(){const{classList:t}=e,r=(e,t)=>(Array.isArray(e)?e:[e]).forEach((e=>t(e)));return{has:e=>t.contains(e),add:o=>(r(o,(e=>t.add(e))),e.clss),remove:o=>(r(o,(e=>t.remove(e))),e.clss)}}};return e.clss?e:o(e,{text:t,html:r,value:s,event:n,insert:a,clss:i})}}},147:e=>{"use strict";e.exports=JSON.parse('{"name":"front-end-004","version":"0.0.2","description":"브로민- 프론트앤드 프레임워크","main":"index.js","scripts":{"clean":"rimraf dist","build":"npm run clean & npm run build:src & npm run build:doc","build:src":"rimraf dist & webpack --mode production","build:doc":"jsdoc -c jsdoc.json","build:copy":"copy .\\\\src\\\\main.d.js .\\\\dist\\\\main.d.js","start":"webpack serve --mode development","start-back":"webpack serve --open --mode development","test":"echo \\"Error: no test specified\\" && exit 1"},"repository":{"type":"git","url":"git+https://github.com/office4sea/front-end-004.git"},"keywords":[],"author":"","license":"ISC","bugs":{"url":"https://github.com/office4sea/front-end-004/issues"},"homepage":"https://github.com/office4sea/front-end-004#readme","devDependencies":{"docdash":"^2.0.1","html-webpack-plugin":"^5.5.0","jsdoc":"^4.0.2","jsdoc-webpack-plugin":"^0.3.0","webpack":"^5.76.2","webpack-cli":"^5.0.1","webpack-dev-server":"^4.12.0"}}')}},t={};function r(o){var s=t[o];if(void 0!==s)return s.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,r),n.exports}(()=>{const{version:e}=r(147),t=r(544),o=(o,s)=>{const n=e=>e&&e(),a=r(520)(n),i=r(443)(n),c=r(539)(n),d=r(518)(n),l={get:()=>o},u={get:()=>e},p={get:()=>t},g={get:()=>a},b={get:()=>c},m={get:()=>d},f={get:()=>i};return t.define(n,{name:l,version:u,snippet:p,debug:g,html:b,async:m,el:f}),s&&s(n),n};t.define(window,{br:{get:()=>o}})})()})();
//# sourceMappingURL=brom.0.0.2.js.map