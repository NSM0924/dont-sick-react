(this.webpackJsonpdont_sick_test=this.webpackJsonpdont_sick_test||[]).push([[0],{35:function(t,e,c){},36:function(t,e,c){},40:function(t,e,c){"use strict";c.r(e);var n=c(16),o=c.n(n),s=c(28),r=c.n(s),i=(c(35),c(13)),a=(c(36),c(20)),l=c(25),u=c(0),b=c.n(u),d=c(1),f=(c(27),c(29)),p=function(){var t=Object(d.a)(b.a.mark((function t(){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,navigator.serviceWorker.register("/dont-sick-react/firebase-messaging-sw.js");case 3:console.log("a"),t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),console.error(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(){return t.apply(this,arguments)}}(),h=Object(f.a)({apiKey:"AIzaSyDugiSdAbhcAv4kjvZIczRILR0cWnyoLE4",authDomain:"don-t-sick.firebaseapp.com",projectId:"don-t-sick",storageBucket:"don-t-sick.appspot.com",messagingSenderId:"713607862724",appId:"1:713607862724:web:5ada0cc3cdaa6370662c91"}),g=c(14);var j=function(){var t=Object(a.b)(h),e=Object(l.a)(),c=Object(n.useState)(""),o=Object(i.a)(c,2),s=o[0],r=o[1],u=Object(n.useState)(""),b=Object(i.a)(u,2),d=b[0],f=b[1],j=Object(n.useState)(""),y=Object(i.a)(j,2),A=y[0],O=y[1];return Object(n.useEffect)((function(){Object(a.c)(t,(function(c){if(c){console.log(c);var n=c.email;if(!n.includes("@sdh.hs.kr"))return alert("\ud559\uad50\uacc4\uc815\uc73c\ub85c\ub9cc \ub85c\uadf8\uc778 \uac00\ub2a5\ud569\ub2c8\ub2e4."),void Object(a.e)(t);n.includes("sdh19")?r("3".concat(n.substr(5,4))):n.includes("sdh20")?r("2".concat(n.substr(7,4))):n.includes("sdh21")&&r("1".concat(n.substr(5,4))),f(c.displayName),p(),console.log(e),Object(l.b)(e,{vapidKey:"BLnmZ7MoMERjyVHv4b791C7j1_-xqcVi9aCrVWDDFovZSGDgK9FROae3J8Q7AWqTJwbQDc2Dk4LrU0zAEUVqfVQ"}).then((function(t){t?(console.log(t),O(t)):(console.log("No registration token available. Request permission to generate one."),alert("\uc54c\ub9bc \uad8c\ud55c\uc744 \ud5c8\uc6a9\ud574\uc8fc\uc138\uc694."))})).catch((function(t){console.log("An error occurred while retrieving token. ",t),alert("\uc54c\ub9bc \uad8c\ud55c\uc744 \ud5c8\uc6a9\ud574\uc8fc\uc138\uc694.")}))}else{var o=new a.a;o.setCustomParameters({login_hint:"sdh@sdh.hs.kr"}),Object(a.d)(t,o)}}))}),[t]),Object(l.c)(e,(function(t){console.log(t),alert("".concat(t.notification.title,"\n").concat(t.notification.body))})),Object(g.jsx)("div",{className:"App",children:Object(g.jsxs)("header",{className:"App-header",children:[Object(g.jsxs)("p",{children:[s," ",d]}),Object(g.jsx)("p",{className:"App-link",onClick:function(){Object(a.e)(t)},children:"logout"}),Object(g.jsx)("p",{onClick:function(){return function(t,e){fetch("https://iid.googleapis.com/iid/v1/".concat(t,"/rel/topics/").concat(e),{method:"POST",headers:new Headers({Authorization:"key=AAAApiZX2cQ:APA91bGE4My7SUbJhjgtK66X8eADgEsxnBlebWlqIjfUw2YSxn43g3kZjH5mSIcHLdyH1Wfg0cwCWw8rv66tR_D2y3IyH3MCQf-9nfN4zH_SqyvqF-yOeVApflNV6bY_4SbwmgFzLKjp"})}).then((function(t){if(t.status<200||t.status>=400)throw new Error("Error Subscribing to topic: ".concat(t.status," - ").concat(t.text()));console.log('Subscribed to "'.concat(e,'"'))})).catch((function(t){console.error(t)}))}(A,"test")},children:"\uc54c\ub9bc \ubc1b\uae30"}),Object(g.jsx)("p",{onClick:function(){return function(t,e){var c={to:"/topics/".concat(e),registration_tokens:[t]};fetch("https://iid.googleapis.com/iid/v1:batchRemove",{method:"POST",headers:new Headers({Authorization:"key=AAAApiZX2cQ:APA91bGE4My7SUbJhjgtK66X8eADgEsxnBlebWlqIjfUw2YSxn43g3kZjH5mSIcHLdyH1Wfg0cwCWw8rv66tR_D2y3IyH3MCQf-9nfN4zH_SqyvqF-yOeVApflNV6bY_4SbwmgFzLKjp","Content-Type":"application/json"}),body:JSON.stringify(c)}).then((function(t){if(t.status<200||t.status>=400)throw new Error("Error Unsubscribing to topic: ".concat(t.status," - ").concat(t.text()));console.log('Unsubscribed to "'.concat(e,'"'))})).catch((function(t){console.error(t)}))}(A,"test")},children:"\uc54c\ub9bc \uc548\ubc1b\uae30"}),Object(g.jsx)("p",{onClick:function(){return t={message:"test"},"/topics/".concat(e="notice"),void fetch("https://fcm.googleapis.com/fcm/send",{method:"POST",headers:new Headers({Authorization:"key=AAAApiZX2cQ:APA91bGE4My7SUbJhjgtK66X8eADgEsxnBlebWlqIjfUw2YSxn43g3kZjH5mSIcHLdyH1Wfg0cwCWw8rv66tR_D2y3IyH3MCQf-9nfN4zH_SqyvqF-yOeVApflNV6bY_4SbwmgFzLKjp","Content-Type":"application/json"}),body:JSON.stringify({data:t,to:"/topics/".concat(e)})}).then((function(t){if(t.status<200||t.status>=400)throw new Error("Error ".concat(t.status," - ").concat(t.text()));console.log("Success")})).catch((function(t){console.error(t)}));var t,e},children:"\uc54c\ub9bc \ubcf4\ub0b4\uae30"})]})})},y=function(t){t&&t instanceof Function&&c.e(3).then(c.bind(null,41)).then((function(e){var c=e.getCLS,n=e.getFID,o=e.getFCP,s=e.getLCP,r=e.getTTFB;c(t),n(t),o(t),s(t),r(t)}))};r.a.render(Object(g.jsx)(o.a.StrictMode,{children:Object(g.jsx)(j,{})}),document.getElementById("root")),y()}},[[40,1,2]]]);
//# sourceMappingURL=main.bcd0ea00.chunk.js.map