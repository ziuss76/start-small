if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,t)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let c={};const r=e=>n(e,a),o={module:{uri:a},exports:c,require:r};s[a]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"e67d36dcfbe5de3cd54cc49a06d6f11e"},{url:"/_next/static/_w7K7Z5U3C-Ri-He-bA68/_buildManifest.js",revision:"39c04c408085e9912adc25c833c9fca1"},{url:"/_next/static/_w7K7Z5U3C-Ri-He-bA68/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/326-09f38fdd688d0c7b.js",revision:"_w7K7Z5U3C-Ri-He-bA68"},{url:"/_next/static/chunks/472-f215380d4b41b523.js",revision:"_w7K7Z5U3C-Ri-He-bA68"},{url:"/_next/static/chunks/app/(AfterLogin)/calendar/page-7504a1a0e56dcd53.js",revision:"_w7K7Z5U3C-Ri-He-bA68"},{url:"/_next/static/chunks/app/(AfterLogin)/graph/page-0c8867f28ebe8484.js",revision:"_w7K7Z5U3C-Ri-He-bA68"},{url:"/_next/static/chunks/app/(AfterLogin)/home/page-f2b0e63e8b092fed.js",revision:"_w7K7Z5U3C-Ri-He-bA68"},{url:"/_next/static/chunks/app/(AfterLogin)/layout-9f08aa5f01283a22.js",revision:"_w7K7Z5U3C-Ri-He-bA68"},{url:"/_next/static/chunks/app/(AfterLogin)/mind/page-213df1b9810e06da.js",revision:"_w7K7Z5U3C-Ri-He-bA68"},{url:"/_next/static/chunks/app/(AfterLogin)/setting/page-e3e3886a16c0f451.js",revision:"_w7K7Z5U3C-Ri-He-bA68"},{url:"/_next/static/chunks/app/(BeforeLogin)/page-bfed4eaf042cbb6b.js",revision:"_w7K7Z5U3C-Ri-He-bA68"},{url:"/_next/static/chunks/app/_not-found-f29c372dd14da0fe.js",revision:"_w7K7Z5U3C-Ri-He-bA68"},{url:"/_next/static/chunks/app/layout-459845e3095d565a.js",revision:"_w7K7Z5U3C-Ri-He-bA68"},{url:"/_next/static/chunks/fd9d1056-4b2c3529c0a2f3c1.js",revision:"_w7K7Z5U3C-Ri-He-bA68"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"_w7K7Z5U3C-Ri-He-bA68"},{url:"/_next/static/chunks/main-app-f331dd5c7b0da3e7.js",revision:"_w7K7Z5U3C-Ri-He-bA68"},{url:"/_next/static/chunks/main-f087d0840995817b.js",revision:"_w7K7Z5U3C-Ri-He-bA68"},{url:"/_next/static/chunks/pages/_app-ee276fea40a4b191.js",revision:"_w7K7Z5U3C-Ri-He-bA68"},{url:"/_next/static/chunks/pages/_error-deeb844d2074b9d8.js",revision:"_w7K7Z5U3C-Ri-He-bA68"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-8dc4b8553bbb24e4.js",revision:"_w7K7Z5U3C-Ri-He-bA68"},{url:"/_next/static/css/f0fb40b315423d0e.css",revision:"f0fb40b315423d0e"},{url:"/icons/android-chrome-192x192.png",revision:"7c30d5a961835fd22c48cdc8e547cd70"},{url:"/icons/android-chrome-512x512.png",revision:"5c14dcf20f26cbe679f233408f3255a6"},{url:"/icons/apple-touch-icon.png",revision:"1509dc63f63e635450f7376a69ce2635"},{url:"/icons/browserconfig.xml",revision:"a493ba0aa0b8ec8068d786d7248bb92c"},{url:"/icons/favicon.ico",revision:"e63ddc694687e4ffb24312e2ec410e61"},{url:"/icons/mstile-150x150.png",revision:"fa5d7536f24885c89c89becb3b4fc5c4"},{url:"/manifest.json",revision:"6487b60b49aa10b9efbbaef9c832456a"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
