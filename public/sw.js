if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>n(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts("worker-5W2CqIIin_7FvZPLGgXs6.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/5W2CqIIin_7FvZPLGgXs6/_buildManifest.js",revision:"39c04c408085e9912adc25c833c9fca1"},{url:"/_next/static/5W2CqIIin_7FvZPLGgXs6/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/323-6c5c9fe31bcece9a.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/326-6ffb264d389397e7.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/39209d7c-46ecddb4023f9a3e.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/413-bfa4c060363cb572.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/472-8ab4975514a450b2.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/4f9d9cd8-0aad67fa7fab22ba.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/749-c3df86e83168ecf4.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/921-6031e553af497e01.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/app/(AfterLogin)/calendar/page-718728ef41fb7c43.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/app/(AfterLogin)/graph/%5Btraining%5D/page-3e500016ae0dadbd.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/app/(AfterLogin)/graph/layout-62aabb9c4c6e6474.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/app/(AfterLogin)/home/layout-fd7ef8168de8c824.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/app/(AfterLogin)/home/page-a74aed12e88d5d24.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/app/(AfterLogin)/home/today/page-16881f2c7da52ac3.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/app/(AfterLogin)/layout-d6d99e74fdb53d4d.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/app/(AfterLogin)/mind/page-ca82d7188e9189a9.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/app/(AfterLogin)/setting/page-d14a005865e9757e.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/app/(BeforeLogin)/page-30535c1a4b6ab779.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/app/_not-found-42c4d719bdd57564.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/app/layout-862a78686003236f.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/ca377847-276019703d64f3c4.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/ec3863c0-2d6f093618394070.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/fd9d1056-8aef1845bba99dc3.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/main-2a12a0de43ad07bf.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/main-app-6e2c97f5452129ca.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/pages/_app-ee276fea40a4b191.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/pages/_error-deeb844d2074b9d8.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-bf1dd4f9a985c145.js",revision:"5W2CqIIin_7FvZPLGgXs6"},{url:"/_next/static/css/8de387a48d8d55a2.css",revision:"8de387a48d8d55a2"},{url:"/_next/static/css/f3212f4926024458.css",revision:"f3212f4926024458"},{url:"/_next/static/media/android-chrome-192x192.be6c347b.png",revision:"5773935b6056951c1726ddf36339ac45"},{url:"/_next/static/sounds/sounds/levelUp.mp3",revision:"288e276b82c348ec49e955145403ba43"},{url:"/icons/android-chrome-192x192.png",revision:"5773935b6056951c1726ddf36339ac45"},{url:"/icons/android-chrome-512x512.png",revision:"0275fdf68c1caceae6e233da512604d6"},{url:"/icons/apple-touch-icon.png",revision:"f6cc8d327d6650e4b0948cf3170e307c"},{url:"/icons/browserconfig.xml",revision:"68c9044fa4a08749efb85bb2a4edaede"},{url:"/icons/favicon.ico",revision:"21c650efb6151772ed471682f9cd189b"},{url:"/icons/mstile-150x150.png",revision:"f7411ee2681a57aca1486644a4d3f26c"},{url:"/icons/safari-pinned-tab.svg",revision:"abcb4fd7bc7f43f1300da5cc3b161a59"},{url:"/manifest.json",revision:"df3dcbdf57959cd31f856044f10a9ddd"},{url:"/sounds/levelUp.mp3",revision:"288e276b82c348ec49e955145403ba43"},{url:"/swCustomDir/index.js",revision:"fd1d2bbe4cfa10fbaa2ca888a5f506b9"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
