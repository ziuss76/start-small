if(!self.define){let e,n={};const s=(s,i)=>(s=new URL(s+".js",i).href,n[s]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=n,document.head.appendChild(e)}else e=s,importScripts(s),n()})).then((()=>{let e=n[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(n[t])return;let c={};const r=e=>s(e,t),o={module:{uri:t},exports:c,require:r};n[t]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"764786cff8b49b6a559ceaf7335c0390"},{url:"/_next/static/X45xniJGxrNzhxny2B85g/_buildManifest.js",revision:"39c04c408085e9912adc25c833c9fca1"},{url:"/_next/static/X45xniJGxrNzhxny2B85g/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/122-ab0f1e42e2356a97.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/472-8ab4975514a450b2.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/4f9d9cd8-0aad67fa7fab22ba.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/749-f2c61f4afb1ca46b.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/app/(AfterLogin)/calendar/page-7504a1a0e56dcd53.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/app/(AfterLogin)/graph/page-0c8867f28ebe8484.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/app/(AfterLogin)/home/layout-6633b923306e582f.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/app/(AfterLogin)/home/page-3a353cae019f80c3.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/app/(AfterLogin)/home/today/page-494514970fbf2445.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/app/(AfterLogin)/layout-de47d54aa68f8abc.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/app/(AfterLogin)/mind/page-ed56b3d3a853ae6a.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/app/(AfterLogin)/setting/page-73912b4d542abc9f.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/app/(BeforeLogin)/page-5a18c6985f0d9ead.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/app/_not-found-42c4d719bdd57564.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/app/layout-8232f6baaa305901.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/ec3863c0-2d6f093618394070.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/fd9d1056-8aef1845bba99dc3.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/main-821a961eae928f12.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/main-app-dc4b0e7bfefc2897.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/pages/_app-ee276fea40a4b191.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/pages/_error-deeb844d2074b9d8.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-048395478cb1402b.js",revision:"X45xniJGxrNzhxny2B85g"},{url:"/_next/static/css/d571205ef4608baf.css",revision:"d571205ef4608baf"},{url:"/_next/static/sounds/sounds/levelUp.mp3",revision:"288e276b82c348ec49e955145403ba43"},{url:"/icons/android-chrome-192x192.png",revision:"7c30d5a961835fd22c48cdc8e547cd70"},{url:"/icons/android-chrome-512x512.png",revision:"5c14dcf20f26cbe679f233408f3255a6"},{url:"/icons/apple-touch-icon.png",revision:"1509dc63f63e635450f7376a69ce2635"},{url:"/icons/browserconfig.xml",revision:"68c9044fa4a08749efb85bb2a4edaede"},{url:"/icons/favicon.ico",revision:"e63ddc694687e4ffb24312e2ec410e61"},{url:"/icons/mstile-150x150.png",revision:"fa5d7536f24885c89c89becb3b4fc5c4"},{url:"/manifest.json",revision:"df3dcbdf57959cd31f856044f10a9ddd"},{url:"/sounds/levelUp.mp3",revision:"288e276b82c348ec49e955145403ba43"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:n,event:s,state:i})=>n&&"opaqueredirect"===n.type?new Response(n.body,{status:200,statusText:"OK",headers:n.headers}):n}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const n=e.pathname;return!n.startsWith("/api/auth/")&&!!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
