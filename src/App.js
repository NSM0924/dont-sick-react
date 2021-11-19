import "./App.css";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "./firebase";
import { useCallback, useEffect, useState } from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import "./css/menu.css";
import "./css/SettingPage.css";
import "./css/HomePage.css";

function App() {
  const auth = getAuth(app);
  const messaging = getMessaging();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    // 로그인한 사용자 가져오기
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        let email = user.email;
        setEmail(email);
        setName(user.displayName);
        // 학교 계정이 아니면 다시 로그인
        if (!email.includes("@sdh.hs.kr")) {
          alert("학교계정으로만 로그인 가능합니다.");
          signOut(auth);
          return;
        }

        // 알림 토큰 저장
        if (navigator.serviceWorker) {
          navigator.serviceWorker
            .register("/dont-sick-react/firebase-messaging-sw.js")
            .then(function (reg) {
              console.log("서비스워커 등록성공 :", reg);
              getToken(messaging, {
                serviceWorkerRegistration: reg,
                vapidKey:
                  "BLnmZ7MoMERjyVHv4b791C7j1_-xqcVi9aCrVWDDFovZSGDgK9FROae3J8Q7AWqTJwbQDc2Dk4LrU0zAEUVqfVQ",
              })
                .then((currentToken) => {
                  if (currentToken) {
                    console.log(currentToken);
                    setToken(currentToken);
                  } else {
                    console.log(
                      "No registration token available. Request permission to generate one."
                    );
                    alert("알림 권한을 허용해주세요.");
                  }
                })
                .catch((err) => {
                  console.log(
                    "An error occurred while retrieving token. ",
                    err
                  );
                  alert("알림 권한을 허용해주세요.");
                });
            })
            .catch(function (error) {
              console.log("서비스워커 등록실패 :", error);
            });
        }
      }
      // 로그인이 안되어있으면 로그인 페이지로 이동
      else {
        const provider = new GoogleAuthProvider();

        provider.setCustomParameters({
          login_hint: "sdh@sdh.hs.kr",
        });

        signInWithRedirect(auth, provider);
      }
    });
  }, [auth]);

  // 포그라운드일 때 알림이 오면
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    if (Notification.permission !== "granted") {
      alert("notification is disabled");
    } else {
      var notification = new Notification("아프지말고", {
        icon: "./images/logo.png",
        body: payload.data.message,
      });

      // notification.onclick = function () {
      //     window.open('http://google.com');
      // };
    }
  });

  // 알림 받기 등록
  const subscribeTokenToTopic = (token, topic) => {
    fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`, {
      method: "POST",
      headers: new Headers({
        Authorization:
          "key=AAAApiZX2cQ:APA91bGE4My7SUbJhjgtK66X8eADgEsxnBlebWlqIjfUw2YSxn43g3kZjH5mSIcHLdyH1Wfg0cwCWw8rv66tR_D2y3IyH3MCQf-9nfN4zH_SqyvqF-yOeVApflNV6bY_4SbwmgFzLKjp",
      }),
    })
      .then((response) => {
        if (response.status < 200 || response.status >= 400) {
          throw new Error(
            `Error Subscribing to topic: ${
              response.status
            } - ${response.text()}`
          );
        }
        console.log(`Subscribed to "${topic}"`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 알림 받기 등록 취소
  const unsubscribeTokenToTopic = (token, topic) => {
    let body = {
      to: `/topics/${topic}`,
      registration_tokens: [token],
    };
    fetch(`https://iid.googleapis.com/iid/v1:batchRemove`, {
      method: "POST",
      headers: new Headers({
        Authorization:
          "key=AAAApiZX2cQ:APA91bGE4My7SUbJhjgtK66X8eADgEsxnBlebWlqIjfUw2YSxn43g3kZjH5mSIcHLdyH1Wfg0cwCWw8rv66tR_D2y3IyH3MCQf-9nfN4zH_SqyvqF-yOeVApflNV6bY_4SbwmgFzLKjp",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status < 200 || response.status >= 400) {
          throw new Error(
            `Error Unsubscribing to topic: ${
              response.status
            } - ${response.text()}`
          );
        }
        console.log(`Unsubscribed to "${topic}"`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 알림 받기에 등록한 사람들에게 알림 보내기
  const sendToTopic = (msg, topic) => {
    let body = {
      to: `/topics/${topic}`,
      data: msg,
    };
    fetch(`https://fcm.googleapis.com/fcm/send`, {
      method: "POST",
      headers: new Headers({
        Authorization:
          "key=AAAApiZX2cQ:APA91bGE4My7SUbJhjgtK66X8eADgEsxnBlebWlqIjfUw2YSxn43g3kZjH5mSIcHLdyH1Wfg0cwCWw8rv66tR_D2y3IyH3MCQf-9nfN4zH_SqyvqF-yOeVApflNV6bY_4SbwmgFzLKjp",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        data: msg,
        to: `/topics/${topic}`,
      }),
    })
      .then((response) => {
        if (response.status < 200 || response.status >= 400) {
          throw new Error(`Error ${response.status} - ${response.text()}`);
        }
        console.log("Success");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const database = getDatabase();
  let on_off_db = ref(database, "on_off");
  const [on_off_data, set_on_off_data] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const on_off_db_data = useCallback(() => {
    onValue(on_off_db, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      set_on_off_data(data);
      setIsChecked(data == "ON");
    });
  }, []);
  useEffect(() => {
    on_off_db_data();
  }, [on_off_db_data]);

  const checkedHandler = () => {
    setIsChecked(!isChecked);
    set(on_off_db, !isChecked ? "ON" : "OFF");
    if (!isChecked) {
      sendToTopic({ message: "보건실 ON🟢" }, "notice");
    } else {
      sendToTopic({ message: "보건실 OFF🔴" }, "notice");
    }
  };

  function HomePage() {
    return (
      <div>
        <nav className="menu">
          <ul>
            <li>
              <Link to="/dont-sick-react/checkPaper">보건증</Link>
            </li>
            <li>
              <Link to="/dont-sick-react/">홈</Link>
            </li>
            <li>
              <Link to="/dont-sick-react/setting">설정</Link>
            </li>
          </ul>
        </nav>
        <div className="container">
          <div className="box">
            <img src="images/logo.png" alt="logo" />
            <hr style={{ width: "100%", marginBottom: "50px" }} />
            <div className={`curcle ${on_off_data}`}></div>
            <h2 id="text" style={{ marginBottom: "70px" }}>
              보건실 현재 {on_off_data}
            </h2>
            <label className="switch-button" style={{ marginBottom: "50px" }}>
              <input
                checked={isChecked}
                onChange={checkedHandler}
                type="checkbox"
                id="on_off_btn"
              />
              <span className="onoff-switch"></span>
            </label>
            <p>
              코로나 의심증상: 발열, 권태감, 기침, 호흡곤란 및 폐렴 등 나타남.
              <br />그 외 가래, 인후통, 두통, 객혈과 오심, 설사 등도 나타남.
            </p>
            <h2 style={{ marginBottom: "50px" }}>질병관리청 콜센터 1399</h2>
          </div>
        </div>
      </div>
    );
  }

  let userId = email.includes("sdh20")
    ? email.substr(0, 11)
    : email.substr(0, 9);
  let notice_db = ref(database, `user/${userId}/notice`);
  const [notice_data, set_notice_data] = useState("");
  const [isChecked2, setIsChecked2] = useState(false);
  const notice_db_data = useCallback(() => {
    onValue(notice_db, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      set_notice_data(data);
      setIsChecked2(data == "true");
    });
  }, []);
  useEffect(() => {
    notice_db_data();
  }, [notice_db_data]);

  const checkedHandler2 = () => {
    setIsChecked2(!isChecked2);
    set(notice_db, !isChecked2 ? "true" : "false");
    if (!isChecked2) {
      subscribeTokenToTopic(token, "notice");
    } else {
      unsubscribeTokenToTopic(token, "notice");
    }
  };

  function SettingPage() {
    const logout = () => {
      signOut(auth);
    };
    return (
      <div className="container">
        <div className="box">
          <h2>계정정보</h2>
          <p style={{ textAlign: "left" }}>이름: {name}</p>
          <p style={{ textAlign: "left", marginBottom: "70px" }}>
            이메일: {email}
          </p>

          <h2>알림 허용버튼</h2>
          <label className="switch-button" style={{ marginBottom: "50px" }}>
            <input
              checked={isChecked2}
              onChange={checkedHandler2}
              type="checkbox"
              id="on_off_btn"
            />
            <span className="onoff-switch"></span>
          </label>

          <h2>로그아웃하기</h2>

          <button className="logout_btn" onClick={logout}>
            로그아웃하기
          </button>
          <nav className="menu">
            <ul>
              <li>
                <Link to="/dont-sick-react/checkPaper">보건증</Link>
              </li>
              <li>
                <Link to="/dont-sick-react/">홈</Link>
              </li>
              <li>
                <Link to="/dont-sick-react/setting">설정</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }

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
      <Route path="/dont-sick-react/setting" component={SettingPage} />
    </div>
  );
}

export default App;
