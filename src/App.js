import "./App.css";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "./firebase";
import { useEffect, useState } from "react";
import { Route } from "react-router";
import LoginPage from "./page/LoginPage";
import HomePage from "./page/HomePage";
import SettingPage from "./page/SettingPage";

function App() {
  // const auth = getAuth(app);
  // const messaging = getMessaging();
  // const [name, setName] = useState("");
  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   // 로그인한 사용자 가져오기
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log(user);
  //       let email = user.email;
  //       // 학교 계정이 아니면 다시 로그인
  //       if (!email.includes("@sdh.hs.kr")) {
  //         alert("학교계정으로만 로그인 가능합니다.");
  //         signOut(auth);
  //         return;
  //       }
  //       setName(user.displayName);

  //       // 알림 토큰 저장
  //       if (navigator.serviceWorker) {
  //         navigator.serviceWorker
  //           .register("/dont-sick-react/firebase-messaging-sw.js")
  //           .then(function (reg) {
  //             console.log("서비스워커 등록성공 :", reg);
  //             getToken(messaging, {
  //               serviceWorkerRegistration: reg,
  //               vapidKey:
  //                 "BLnmZ7MoMERjyVHv4b791C7j1_-xqcVi9aCrVWDDFovZSGDgK9FROae3J8Q7AWqTJwbQDc2Dk4LrU0zAEUVqfVQ",
  //             })
  //               .then((currentToken) => {
  //                 if (currentToken) {
  //                   console.log(currentToken);
  //                   setToken(currentToken);
  //                 } else {
  //                   console.log(
  //                     "No registration token available. Request permission to generate one."
  //                   );
  //                   alert("알림 권한을 허용해주세요.");
  //                 }
  //               })
  //               .catch((err) => {
  //                 console.log(
  //                   "An error occurred while retrieving token. ",
  //                   err
  //                 );
  //                 alert("알림 권한을 허용해주세요.");
  //               });
  //           })
  //           .catch(function (error) {
  //             console.log("서비스워커 등록실패 :", error);
  //           });
  //       }
  //     }
  //     // 로그인이 안되어있으면 로그인 페이지로 이동
  //     else {
  //       const provider = new GoogleAuthProvider();

  //       provider.setCustomParameters({
  //         login_hint: "sdh@sdh.hs.kr",
  //       });

  //       signInWithRedirect(auth, provider);
  //     }
  //   });
  // }, [auth]);

  // const logout = () => {
  //   signOut(auth);
  // };

  // // 포그라운드일 때 알림이 오면
  // onMessage(messaging, (payload) => {
  //   console.log("Message received. ", payload);
  //   if (Notification.permission !== "granted") {
  //     alert("notification is disabled");
  //   } else {
  //     var notification = new Notification("아프지말고", {
  //       icon: "./images/logo.png",
  //       body: payload.data.message,
  //     });

  //     // notification.onclick = function () {
  //     //     window.open('http://google.com');
  //     // };
  //   }
  // });

  // // 알림 받기 등록
  // const subscribeTokenToTopic = (token, topic) => {
  //   fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`, {
  //     method: "POST",
  //     headers: new Headers({
  //       Authorization:
  //         "key=AAAApiZX2cQ:APA91bGE4My7SUbJhjgtK66X8eADgEsxnBlebWlqIjfUw2YSxn43g3kZjH5mSIcHLdyH1Wfg0cwCWw8rv66tR_D2y3IyH3MCQf-9nfN4zH_SqyvqF-yOeVApflNV6bY_4SbwmgFzLKjp",
  //     }),
  //   })
  //     .then((response) => {
  //       if (response.status < 200 || response.status >= 400) {
  //         throw new Error(
  //           `Error Subscribing to topic: ${
  //             response.status
  //           } - ${response.text()}`
  //         );
  //       }
  //       console.log(`Subscribed to "${topic}"`);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // // 알림 받기 등록 취소
  // const unsubscribeTokenToTopic = (token, topic) => {
  //   let body = {
  //     to: `/topics/${topic}`,
  //     registration_tokens: [token],
  //   };
  //   fetch(`https://iid.googleapis.com/iid/v1:batchRemove`, {
  //     method: "POST",
  //     headers: new Headers({
  //       Authorization:
  //         "key=AAAApiZX2cQ:APA91bGE4My7SUbJhjgtK66X8eADgEsxnBlebWlqIjfUw2YSxn43g3kZjH5mSIcHLdyH1Wfg0cwCWw8rv66tR_D2y3IyH3MCQf-9nfN4zH_SqyvqF-yOeVApflNV6bY_4SbwmgFzLKjp",
  //       "Content-Type": "application/json",
  //     }),
  //     body: JSON.stringify(body),
  //   })
  //     .then((response) => {
  //       if (response.status < 200 || response.status >= 400) {
  //         throw new Error(
  //           `Error Unsubscribing to topic: ${
  //             response.status
  //           } - ${response.text()}`
  //         );
  //       }
  //       console.log(`Unsubscribed to "${topic}"`);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // // 알림 받기에 등록한 사람들에게 알림 보내기
  // const sendToTopic = (msg, topic) => {
  //   let body = {
  //     to: `/topics/${topic}`,
  //     data: msg,
  //   };
  //   fetch(`https://fcm.googleapis.com/fcm/send`, {
  //     method: "POST",
  //     headers: new Headers({
  //       Authorization:
  //         "key=AAAApiZX2cQ:APA91bGE4My7SUbJhjgtK66X8eADgEsxnBlebWlqIjfUw2YSxn43g3kZjH5mSIcHLdyH1Wfg0cwCWw8rv66tR_D2y3IyH3MCQf-9nfN4zH_SqyvqF-yOeVApflNV6bY_4SbwmgFzLKjp",
  //       "Content-Type": "application/json",
  //     }),
  //     body: JSON.stringify({
  //       data: msg,
  //       to: `/topics/${topic}`,
  //     }),
  //   })
  //     .then((response) => {
  //       if (response.status < 200 || response.status >= 400) {
  //         throw new Error(`Error ${response.status} - ${response.text()}`);
  //       }
  //       console.log("Success");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Route path="/dont-sick-react/" exact component={HomePage} />
      <Route path="/dont-sick-react/login" exact component={LoginPage} />
      <Route path="/dont-sick-react/setting" exact component={SettingPage} />
    </div>
  );
}

export default App;
