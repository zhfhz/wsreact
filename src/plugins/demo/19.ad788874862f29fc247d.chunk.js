(window.webpackJsonpdemo=window.webpackJsonpdemo||[]).push([[19],{791:function(e,t,r){"use strict";r.r(t);r(90),r(91),r(51),r(92),r(93),r(69),r(96),r(219),r(52);var n=r(28),s=r.n(n),o=r(25),a=r.n(o),c=(r(127),r(7)),i=r(45),u=r(74),p=r(29),l=function(e){return Object(u.c)("api/link-service/v1/service/oauth/gettoken",{visitorId:encodeURI(Object(p.c)(e.username)),visitorType:"USER",flag:"WEB",pwd:encodeURI(Object(p.c)(e.password)),type:"1"}).then((function(e){var t=e.ok,r=e.data;return t?{ok:t,data:JSON.parse(r.result.data)}:{ok:t,data:r.result.msg}}))};function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){a()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}t.default={namespace:"signIn",state:{username:"",password:"",showErr:!1},effects:{login:s.a.mark((function e(t,r){var n,o,a,u,p,b,O;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.call,o=r.put,a=r.select,e.next=3,a((function(e){return f({},e.signIn)}));case 3:return u=e.sent,e.next=6,n(l,f({},u));case 6:if(p=e.sent,b=p.data,!p.ok){e.next=20;break}return O=b.token,null!=b.serverUrl&&null!=b.serverUrl.wsUrl&&sessionStorage.setItem(c.c.SOCKET_URL,b.serverUrl.wsUrl),sessionStorage.setItem(c.c.USER_NAME,u.username),sessionStorage.setItem(c.c.TENANT_ID,O[c.c.TENANT_ID]),sessionStorage.setItem(c.c.TOKEN,O.accessToken),i.b.isFirstPage?i.b.replace("/"):i.b.go(-1),e.next=18,o({type:"global/initWebSocket"});case 18:e.next=22;break;case 20:return e.next=22,o({type:"save",payload:{showErr:!0}});case 22:case"end":return e.stop()}}),e)}))},reducers:{save:function(e,t){var r=t.payload;return f(f({},e),r)}},subscriptions:{}}}}]);
//# sourceMappingURL=19.ad788874862f29fc247d.chunk.js.map