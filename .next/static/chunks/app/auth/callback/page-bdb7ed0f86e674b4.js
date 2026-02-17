(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[453],{7725:function(e,t,r){Promise.resolve().then(r.bind(r,3045))},3045:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return l},dynamic:function(){return s},fetchCache:function(){return u}});var n=r(7437),i=r(2265),c=r(6463),a=r(6881),o=r(3274);let s="force-dynamic",u="force-no-store";function l(){let e=(0,c.useRouter)(),t=(0,c.useSearchParams)(),[r,s]=(0,i.useState)(null);return((0,i.useEffect)(()=>{(async()=>{let r=t.get("code"),n=t.get("next");if(!r){s("No verification code provided.");return}try{let{error:t}=await a.O.auth.exchangeCodeForSession(r);if(t){s("Verification link is invalid or expired.");return}n?e.replace(n):e.replace("/auth/login")}catch(e){s("Verification failed. Please try again.")}})()},[e,t]),r)?(0,n.jsxs)("div",{className:"flex flex-col items-center justify-center min-h-screen text-center p-6",children:[(0,n.jsx)("h1",{className:"text-2xl font-bold text-red-500 mb-4",children:"Verification Error"}),(0,n.jsx)("p",{className:"text-softwhite/80 mb-6",children:r}),(0,n.jsx)("button",{onClick:()=>e.replace("/auth/login"),className:"px-6 py-3 bg-primary text-white rounded-lg",children:"Go to Login"})]}):(0,n.jsxs)("div",{className:"flex flex-col items-center justify-center min-h-screen text-center p-6",children:[(0,n.jsx)(o.Z,{className:"w-10 h-10 animate-spin text-primary mb-4"}),(0,n.jsx)("h1",{className:"text-xl font-semibold text-softwhite mb-2",children:"Verifying your account…"}),(0,n.jsx)("p",{className:"text-softwhite/70",children:"Please wait while we complete your verification."})]})}},6881:function(e,t,r){"use strict";r.d(t,{O:function(){return o}});var n=r(7327),i=r(357);let c=i.env.NEXT_PUBLIC_SUPABASE_URL,a=i.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,o=(0,n.eI)(c,a)},8030:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});var n=r(2265);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),c=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter((e,t,r)=>!!e&&r.indexOf(e)===t).join(" ")};/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=(0,n.forwardRef)((e,t)=>{let{color:r="currentColor",size:i=24,strokeWidth:o=2,absoluteStrokeWidth:s,className:u="",children:l,iconNode:f,...d}=e;return(0,n.createElement)("svg",{ref:t,...a,width:i,height:i,stroke:r,strokeWidth:s?24*Number(o)/Number(i):o,className:c("lucide",u),...d},[...f.map(e=>{let[t,r]=e;return(0,n.createElement)(t,r)}),...Array.isArray(l)?l:[l]])}),s=(e,t)=>{let r=(0,n.forwardRef)((r,a)=>{let{className:s,...u}=r;return(0,n.createElement)(o,{ref:a,iconNode:t,className:c("lucide-".concat(i(e)),s),...u})});return r.displayName="".concat(e),r}},3274:function(e,t,r){"use strict";r.d(t,{Z:function(){return n}});/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,r(8030).Z)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},6463:function(e,t,r){"use strict";var n=r(1169);r.o(n,"useRouter")&&r.d(t,{useRouter:function(){return n.useRouter}}),r.o(n,"useSearchParams")&&r.d(t,{useSearchParams:function(){return n.useSearchParams}})}},function(e){e.O(0,[149,971,23,744],function(){return e(e.s=7725)}),_N_E=e.O()}]);