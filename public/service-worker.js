if(!self.define){let e,s={};const n=(n,c)=>(n=new URL(n+".js",c).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let t={};const r=e=>n(e,a),o={module:{uri:a},exports:t,require:r};s[a]=Promise.all(c.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"51b1de94a52d278e953a39a64ab35d9f"},{url:"/_next/static/chunks/326-6ffb264d389397e7.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/39209d7c-46ecddb4023f9a3e.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/472-8ab4975514a450b2.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/4f9d9cd8-0aad67fa7fab22ba.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/661-9976b79bbc580bfe.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/app/(AfterLogin)/calendar/page-aa18f43798115b98.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/app/(AfterLogin)/graph/page-e96364e915b2c987.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/app/(AfterLogin)/home/layout-1a5d4078adaf9b6e.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/app/(AfterLogin)/home/page-b9601fd63dc806e8.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/app/(AfterLogin)/home/today/page-9e2332eca2f8786e.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/app/(AfterLogin)/layout-eb4b20fda0ed6de0.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/app/(AfterLogin)/mind/page-3b806a4c8dc90f7d.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/app/(AfterLogin)/setting/page-75de4aa53d035cc5.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/app/(BeforeLogin)/page-aa7aeecfdf1d4027.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/app/_not-found-42c4d719bdd57564.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/app/layout-49347f3edfa781b3.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/ec3863c0-2d6f093618394070.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/fd9d1056-8aef1845bba99dc3.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/main-821a961eae928f12.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/main-app-f331dd5c7b0da3e7.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/pages/_app-ee276fea40a4b191.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/pages/_error-deeb844d2074b9d8.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-c8be27cdd150617a.js",revision:"hUNZV6cnOl-ZPlR4PvbJg"},{url:"/_next/static/css/59e2e235ffbfbde7.css",revision:"59e2e235ffbfbde7"},{url:"/_next/static/hUNZV6cnOl-ZPlR4PvbJg/_buildManifest.js",revision:"39c04c408085e9912adc25c833c9fca1"},{url:"/_next/static/hUNZV6cnOl-ZPlR4PvbJg/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/favicon.b6cf8fd7.ico",revision:"21c650efb6151772ed471682f9cd189b"},{url:"/_next/static/sounds/sounds/levelUp.mp3",revision:"288e276b82c348ec49e955145403ba43"},{url:"/icons/android-chrome-192x192.png",revision:"5773935b6056951c1726ddf36339ac45"},{url:"/icons/android-chrome-512x512.png",revision:"0275fdf68c1caceae6e233da512604d6"},{url:"/icons/apple-touch-icon.png",revision:"f6cc8d327d6650e4b0948cf3170e307c"},{url:"/icons/browserconfig.xml",revision:"a493ba0aa0b8ec8068d786d7248bb92c"},{url:"/icons/favicon.ico",revision:"21c650efb6151772ed471682f9cd189b"},{url:"/icons/mstile-150x150.png",revision:"f7411ee2681a57aca1486644a4d3f26c"},{url:"/icons/safari-pinned-tab.svg",revision:"2650ef8f59192684ea15fcc1ff1fdf1c"},{url:"/manifest.json",revision:"6487b60b49aa10b9efbbaef9c832456a"},{url:"/sounds/levelUp.mp3",revision:"288e276b82c348ec49e955145403ba43"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
