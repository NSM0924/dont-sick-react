(this.webpackJsonpdont_sick_test=this.webpackJsonpdont_sick_test||[]).push([[0],{55:function(e,t,c){},57:function(e,t,c){},58:function(e,t,c){},59:function(e,t,c){},60:function(e,t,c){},61:function(e,t,c){},62:function(e,t,c){},71:function(e,t,c){"use strict";c.r(t);var n=c(10),s=c.n(n),o=c(47),i=c.n(o),a=(c(55),c(0)),r=c.n(a),l=c(3),j=c(12),b=(c(57),c(30)),d=c(28),h=c(38),u=c(39),O=c(48),f=Object(O.a)({apiKey:"AIzaSyDugiSdAbhcAv4kjvZIczRILR0cWnyoLE4",authDomain:"don-t-sick.firebaseapp.com",projectId:"don-t-sick",storageBucket:"don-t-sick.appspot.com",messagingSenderId:"713607862724",appId:"1:713607862724:web:5ada0cc3cdaa6370662c91"}),p=c(13),g=c(25),m=(c(58),c(59),c(60),c(61),c(62),c(9));var x=function(){var e=Object(b.b)(f),t=Object(u.a)(),c=Object(n.useState)(""),s=Object(j.a)(c,2),o=s[0],i=s[1],a=Object(n.useState)(""),O=Object(j.a)(a,2),x=O[0],y=O[1],v=Object(n.useState)(""),k=Object(j.a)(v,2),S=k[0],w=k[1],A=Object(n.useState)(""),N=Object(j.a)(A,2),_=N[0],E=N[1],C=Object(n.useState)(!1),H=Object(j.a)(C,2),I=H[0],q=H[1];Object(n.useEffect)((function(){Object(b.c)(e,(function(c){if(c){console.log(c);var n=c.email;if(y(n),w(c.displayName),E(n.includes("sdh20")?n.substr(0,11):n.substr(0,9)),!n.includes("@sdh.hs.kr"))return alert("\ud559\uad50\uacc4\uc815\uc73c\ub85c\ub9cc \ub85c\uadf8\uc778 \uac00\ub2a5\ud569\ub2c8\ub2e4."),void Object(b.e)(e);"sdh2020040@sdh.hs.kr"!=n&&"shinem@sdh.hs.kr"!=n||q(!0),navigator.serviceWorker&&navigator.serviceWorker.register("/dont-sick-react/firebase-messaging-sw.js").then((function(e){console.log("\uc11c\ube44\uc2a4\uc6cc\ucee4 \ub4f1\ub85d\uc131\uacf5 :",e),Object(u.b)(t,{serviceWorkerRegistration:e,vapidKey:"BLnmZ7MoMERjyVHv4b791C7j1_-xqcVi9aCrVWDDFovZSGDgK9FROae3J8Q7AWqTJwbQDc2Dk4LrU0zAEUVqfVQ"}).then((function(e){e?(console.log(e),i(e)):(console.log("No registration token available. Request permission to generate one."),alert("\uc54c\ub9bc \uad8c\ud55c\uc744 \ud5c8\uc6a9\ud574\uc8fc\uc138\uc694."))})).catch((function(e){console.log("An error occurred while retrieving token. ",e),alert("\uc54c\ub9bc \uad8c\ud55c\uc744 \ud5c8\uc6a9\ud574\uc8fc\uc138\uc694.")}))})).catch((function(e){console.log("\uc11c\ube44\uc2a4\uc6cc\ucee4 \ub4f1\ub85d\uc2e4\ud328 :",e)}))}else{var s=new b.a;s.setCustomParameters({login_hint:"sdh@sdh.hs.kr"}),Object(b.d)(e,s)}}))}),[e,t]),Object(u.c)(t,(function(e){(console.log("Message received. ",e),"granted"!==Notification.permission)?alert("notification is disabled"):new Notification("\uc544\ud504\uc9c0\ub9d0\uace0",{icon:"./images/logo.png",body:e.data.message}).onclick=function(){window.open("http://nsm0924.github.io/dont-sick-react/")}}));var B=function(e,t){fetch("https://fcm.googleapis.com/fcm/send",{method:"POST",headers:new Headers({Authorization:"key=AAAApiZX2cQ:APA91bGE4My7SUbJhjgtK66X8eADgEsxnBlebWlqIjfUw2YSxn43g3kZjH5mSIcHLdyH1Wfg0cwCWw8rv66tR_D2y3IyH3MCQf-9nfN4zH_SqyvqF-yOeVApflNV6bY_4SbwmgFzLKjp","Content-Type":"application/json"}),body:JSON.stringify({data:e,to:"/topics/".concat(t)})}).then((function(e){if(e.status<200||e.status>=400)throw new Error("Error ".concat(e.status," - ").concat(e.text()));console.log("Success")})).catch((function(e){console.error(e)}))},F=Object(d.a)();return Object(m.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:[Object(m.jsx)(p.a,{path:"/dont-sick-react/",exact:!0,component:function(){var e=Object(d.c)(F,"on_off"),t=Object(n.useState)(""),c=Object(j.a)(t,2),s=c[0],o=c[1],i=Object(n.useState)(!1),a=Object(j.a)(i,2),r=a[0],l=a[1],b=Object(n.useCallback)((function(){Object(d.b)(e,(function(e){var t=e.val();console.log(t),o(t),l("ON"==t)}))}),[e]);return Object(n.useEffect)((function(){b()}),[b]),Object(m.jsxs)("div",{children:[Object(m.jsx)("nav",{className:"menu",children:Object(m.jsxs)("ul",{children:[Object(m.jsx)("li",{children:Object(m.jsx)(g.b,{to:"/dont-sick-react/checkPaper",children:"\ubcf4\uac74\uc99d"})}),Object(m.jsx)("li",{children:Object(m.jsx)(g.b,{to:"/dont-sick-react/",children:"\ud648"})}),Object(m.jsx)("li",{children:Object(m.jsx)(g.b,{to:"/dont-sick-react/setting",children:"\uc124\uc815"})})]})}),Object(m.jsx)("div",{className:"container",children:Object(m.jsxs)("div",{className:"box",children:[Object(m.jsx)("img",{src:"images/logo.png",alt:"logo"}),Object(m.jsx)("hr",{style:{width:"100%",marginBottom:"50px"}}),Object(m.jsx)("div",{className:"curcle ".concat(s)}),Object(m.jsxs)("h2",{id:"text",style:{marginBottom:"70px"},children:["\ubcf4\uac74\uc2e4 \ud604\uc7ac ",s]}),I?Object(m.jsxs)("label",{className:"switch-button",style:{marginBottom:"50px"},children:[Object(m.jsx)("input",{checked:r,onChange:function(){l(!r),Object(d.d)(e,r?"OFF":"ON"),B(r?{message:"\ubcf4\uac74\uc2e4 OFF\ud83d\udd34"}:{message:"\ubcf4\uac74\uc2e4 ON\ud83d\udfe2"},"notice")},type:"checkbox",id:"on_off_btn"}),Object(m.jsx)("span",{className:"onoff-switch"})]}):Object(m.jsx)("div",{}),Object(m.jsxs)("p",{children:["\ucf54\ub85c\ub098 \uc758\uc2ec\uc99d\uc0c1: \ubc1c\uc5f4, \uad8c\ud0dc\uac10, \uae30\uce68, \ud638\ud761\uace4\ub780 \ubc0f \ud3d0\ub834 \ub4f1 \ub098\ud0c0\ub0a8.",Object(m.jsx)("br",{}),"\uadf8 \uc678 \uac00\ub798, \uc778\ud6c4\ud1b5, \ub450\ud1b5, \uac1d\ud608\uacfc \uc624\uc2ec, \uc124\uc0ac \ub4f1\ub3c4 \ub098\ud0c0\ub0a8."]}),Object(m.jsx)("h2",{style:{marginBottom:"50px"},children:"\uc9c8\ubcd1\uad00\ub9ac\uccad \ucf5c\uc13c\ud130 1399"})]})})]})}}),Object(m.jsx)(p.a,{path:"/dont-sick-react/setting",component:function(){var t=Object(d.c)(F,"user/".concat(_,"/notice")),c=Object(n.useState)(!1),s=Object(j.a)(c,2),i=s[0],a=s[1],r=Object(n.useCallback)((function(){Object(d.b)(t,(function(e){var t=e.val();console.log(t),a("true"==t)}))}),[t]);return Object(n.useEffect)((function(){r()}),[r]),Object(m.jsx)("div",{className:"container",children:Object(m.jsxs)("div",{className:"box",children:[Object(m.jsx)("h2",{children:"\uacc4\uc815\uc815\ubcf4"}),Object(m.jsxs)("p",{style:{textAlign:"left"},children:["\uc774\ub984: ",S]}),Object(m.jsxs)("p",{style:{textAlign:"left",marginBottom:"70px"},children:["\uc774\uba54\uc77c: ",x]}),Object(m.jsx)("h2",{children:"\uc54c\ub9bc \ud5c8\uc6a9\ubc84\ud2bc"}),Object(m.jsxs)("label",{className:"switch-button",style:{marginBottom:"50px"},children:[Object(m.jsx)("input",{checked:i,onChange:function(){a(!i),Object(d.d)(t,i?"false":"true"),i?function(e,t){var c={to:"/topics/".concat(t),registration_tokens:[e]};fetch("https://iid.googleapis.com/iid/v1:batchRemove",{method:"POST",headers:new Headers({Authorization:"key=AAAApiZX2cQ:APA91bGE4My7SUbJhjgtK66X8eADgEsxnBlebWlqIjfUw2YSxn43g3kZjH5mSIcHLdyH1Wfg0cwCWw8rv66tR_D2y3IyH3MCQf-9nfN4zH_SqyvqF-yOeVApflNV6bY_4SbwmgFzLKjp","Content-Type":"application/json"}),body:JSON.stringify(c)}).then((function(e){if(e.status<200||e.status>=400)throw new Error("Error Unsubscribing to topic: ".concat(e.status," - ").concat(e.text()));console.log('Unsubscribed to "'.concat(t,'"'))})).catch((function(e){console.error(e)}))}(o,"notice"):function(e,t){fetch("https://iid.googleapis.com/iid/v1/".concat(e,"/rel/topics/").concat(t),{method:"POST",headers:new Headers({Authorization:"key=AAAApiZX2cQ:APA91bGE4My7SUbJhjgtK66X8eADgEsxnBlebWlqIjfUw2YSxn43g3kZjH5mSIcHLdyH1Wfg0cwCWw8rv66tR_D2y3IyH3MCQf-9nfN4zH_SqyvqF-yOeVApflNV6bY_4SbwmgFzLKjp"})}).then((function(e){if(e.status<200||e.status>=400)throw new Error("Error Subscribing to topic: ".concat(e.status," - ").concat(e.text()));console.log('Subscribed to "'.concat(t,'"'))})).catch((function(e){console.error(e)}))}(o,"notice")},type:"checkbox",id:"on_off_btn"}),Object(m.jsx)("span",{className:"onoff-switch"})]}),Object(m.jsx)("h2",{children:"\ub85c\uadf8\uc544\uc6c3\ud558\uae30"}),Object(m.jsx)("button",{className:"logout_btn",onClick:function(){Object(b.e)(e)},children:"\ub85c\uadf8\uc544\uc6c3\ud558\uae30"}),Object(m.jsx)("nav",{className:"menu",children:Object(m.jsxs)("ul",{children:[Object(m.jsx)("li",{children:Object(m.jsx)(g.b,{to:"/dont-sick-react/checkPaper",children:"\ubcf4\uac74\uc99d"})}),Object(m.jsx)("li",{children:Object(m.jsx)(g.b,{to:"/dont-sick-react/",children:"\ud648"})}),Object(m.jsx)("li",{children:Object(m.jsx)(g.b,{to:"/dont-sick-react/setting",children:"\uc124\uc815"})})]})})]})})}}),Object(m.jsx)(p.a,{path:"/dont-sick-react/checkpaper",component:function(){var e=Object(n.useState)([]),t=Object(j.a)(e,2),c=t[0],s=t[1],o=Object(h.c)(),i=Object(n.useCallback)(Object(l.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],e.prev=1,e.next=4,Object(h.b)(Object(h.a)(o,_));case 4:e.sent.forEach((function(e){console.log("".concat(e.id," => ").concat(e.data())),t.push({post:e.data(),id:e.id})})),s((function(e){return e.concat(t)})),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(1);case 11:case"end":return e.stop()}}),e,null,[[1,9]])}))),[o]);return Object(n.useEffect)((function(){i()}),[i]),Object(m.jsxs)("div",{children:[Object(m.jsx)("nav",{className:"menu",children:Object(m.jsxs)("ul",{children:[Object(m.jsx)("li",{children:Object(m.jsx)(g.b,{to:"/dont-sick-react/checkPaper",children:"\ubcf4\uac74\uc99d"})}),Object(m.jsx)("li",{children:Object(m.jsx)(g.b,{to:"/dont-sick-react/",children:"\ud648"})}),Object(m.jsx)("li",{children:Object(m.jsx)(g.b,{to:"/dont-sick-react/setting",children:"\uc124\uc815"})})]})}),Object(m.jsx)("div",{className:"container",children:Object(m.jsxs)("div",{className:"box",children:[Object(m.jsx)("img",{src:"./images/logo.png",alt:""}),Object(m.jsx)("hr",{style:{width:"100%",marginBottom:"50px"}}),Object(m.jsx)("h2",{style:{marginBottom:"30px"},children:"\ubcf4\uac74\uc2e4\uc785\uc2e4\ud655\uc778\uc99d"}),Object(m.jsx)("ul",{className:"mylist",children:c.map((function(e){return Object(m.jsx)("li",{onClick:function(){var t,c,n,s,o,i;t=e.post.grade,c=e.post.classResult,n=e.post.name,s=e.post.time,o=e.post.symptom,i=e.post.date,document.querySelector(".modal_wrap").style.display="flex",document.querySelector(".black_bg").style.display="block",document.getElementById("modal_text").innerHTML="<p>".concat(t,"\ud559\ub144 ").concat(c,"\ubc18 ").concat(n,"</p>\n      <p>\uc704 \ud559\uc0dd\uc740 \ubcf4\uac74\uc2e4\uc5d0 ").concat(s," ").concat(o," \uc99d\uc0c1\uc73c\ub85c \ub2e4\ub140\uac10\uc744 \ud655\uc778 \ud569\ub2c8\ub2e4.</p>\n      <p>").concat(i,"</p><p>\ubcf4\uac74\uad50\uc0ac \ubb38\uc11c\ud604</p>"),document.querySelector(".modal_close").addEventListener("click",(function(){document.querySelector(".modal_wrap").style.display="none",document.querySelector(".black_bg").style.display="none"}))},children:e.id},e.id)}))}),Object(m.jsx)("div",{className:"black_bg"}),Object(m.jsxs)("div",{className:"modal_wrap",children:[Object(m.jsx)("div",{className:"modal_close"}),Object(m.jsx)("div",{id:"modal_text"})]})]})})]})}})]})},y=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,72)).then((function(t){var c=t.getCLS,n=t.getFID,s=t.getFCP,o=t.getLCP,i=t.getTTFB;c(e),n(e),s(e),o(e),i(e)}))};i.a.render(Object(m.jsx)(s.a.StrictMode,{children:Object(m.jsx)(g.a,{children:Object(m.jsx)(x,{})})}),document.getElementById("root")),y()}},[[71,1,2]]]);
//# sourceMappingURL=main.b20ef698.chunk.js.map