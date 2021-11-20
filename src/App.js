import "./App.css";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, onValue, ref, set } from "firebase/database";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "./firebase";
import { useCallback, useEffect, useState } from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import "./css/menu.css";
import "./css/SettingPage.css";
import "./css/HomePage.css";
import "./css/CheckPaperPage.css";
import "./css/modal.css";

function App() {
  const auth = getAuth(app);
  const messaging = getMessaging();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    // 로그인한 사용자 가져오기
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        let email = user.email;
        setEmail(email);
        setName(user.displayName);
        setUserId(
          email.includes("sdh20") ? email.substr(0, 11) : email.substr(0, 9)
        );
        // 학교 계정이 아니면 다시 로그인
        if (!email.includes("@sdh.hs.kr")) {
          alert("학교계정으로만 로그인 가능합니다.");
          signOut(auth);
          return;
        }
        if (email == "sdh20200405@sdh.hs.kr" || email == "shinem@sdh.hs.kr") {
          setAdmin(true);
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
  }, [auth, messaging]);

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
  let notice_db = ref(database, `user/${userId}/notice`);
  const [isChecked2, setIsChecked2] = useState(false);
  const notice_db_data = useCallback(() => {
    onValue(notice_db, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (!data) {
        set(notice_db, "true");
      } else {
        setIsChecked2(data == "true");
        if (data == "true") {
          subscribeTokenToTopic(token, "notice");
        } else {
          unsubscribeTokenToTopic(token, "notice");
        }
      }
    });
  }, [notice_db]);
  useEffect(() => {
    if (!userId == "") {
      notice_db_data();
    }
  }, [notice_db_data]);

  function HomePage() {
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
    }, [on_off_db]);
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
            {admin ? (
              <label className="switch-button" style={{ marginBottom: "50px" }}>
                <input
                  checked={isChecked}
                  onChange={checkedHandler}
                  type="checkbox"
                  id="on_off_btn"
                />
                <span className="onoff-switch"></span>
              </label>
            ) : (
              <div></div>
            )}
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

  function SettingPage() {
    const checkedHandler2 = () => {
      setIsChecked2(!isChecked2);
      set(notice_db, !isChecked2 ? "true" : "false");
      // if (!isChecked2) {
      //   subscribeTokenToTopic(token, "notice");
      // } else {
      //   unsubscribeTokenToTopic(token, "notice");
      // }
    };

    const logout = async () => {
      await unsubscribeTokenToTopic(token, "notice");
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

  const checkPaper_db = getFirestore();
  function CheckPaperPage() {
    const [checkPaper_data, setCheckPaper_data] = useState([]);
    const checkPaper_db_data = useCallback(async () => {
      let postData = [];
      try {
        const querySnapshot = await getDocs(collection(checkPaper_db, userId));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          postData.push({ post: doc.data(), id: doc.id });
        });
        setCheckPaper_data((prevPosts) => prevPosts.concat(postData));
      } catch {}
    }, [checkPaper_db]);
    useEffect(() => {
      checkPaper_db_data();
    }, [checkPaper_db_data]);

    function modal(grade, classResult, nameResult, time, symptom, date) {
      document.querySelector(".modal_wrap").style.display = "flex";
      document.querySelector(".black_bg").style.display = "block";
      document.getElementById(
        "modal_text"
      ).innerHTML = `<p>${grade}학년 ${classResult}반 ${nameResult}</p>
      <p>위 학생은 보건실에 ${time} ${symptom} 증상으로 다녀감을 확인 합니다.</p>
      <p>${date}</p><p>보건교사 문서현</p>`;
      function offClick() {
        document.querySelector(".modal_wrap").style.display = "none";
        document.querySelector(".black_bg").style.display = "none";
      }
      document
        .querySelector(".modal_close")
        .addEventListener("click", offClick);
    }

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
            <img src="./images/logo.png" alt="" />
            <hr style={{ width: "100%", marginBottom: "50px" }} />
            <h2 style={{ marginBottom: "30px" }}>보건실입실확인증</h2>
            <ul className="mylist">
              {checkPaper_data.map((post) => (
                <li
                  key={post.id}
                  onClick={() => {
                    modal(
                      post.post.grade,
                      post.post.classResult,
                      post.post.name,
                      post.post.time,
                      post.post.symptom,
                      post.post.date
                    );
                  }}
                >
                  {post.id}
                </li>
              ))}
            </ul>
            <div className="black_bg"></div>
            <div className="modal_wrap">
              <div className="modal_close"></div>
              <div id="modal_text"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function AdminCheckPaperPage() {
    const [idInput, setIdInput] = useState("");
    const [gradeInput, setGradeInput] = useState("");
    const [classInput, setClassInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [timeInput, setTimeInput] = useState("");
    const [symptomInput, setSymptomInput] = useState("");
    async function postCheckPaper() {
      if (
        idInput == "" ||
        gradeInput == "" ||
        classInput == "" ||
        nameInput == "" ||
        timeInput == "" ||
        symptomInput == ""
      ) {
        alert("빈탄을 모두 채워주세요.");
      } else {
        let date = new Date();
        let year = date.getFullYear();
        let month = ("0" + (1 + date.getMonth())).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        let hour = date.getHours();

        let fullDate = year + "-" + month + "-" + day + "-" + hour;
        await setDoc(doc(checkPaper_db, idInput, fullDate), {
          id: idInput,
          grade: gradeInput,
          classResult: classInput,
          name: nameInput,
          time: timeInput,
          symptom: symptomInput,
          date: fullDate,
        }).then(async () => {
          await setDoc(
            doc(
              checkPaper_db,
              "check_paper",
              fullDate + `_${gradeInput}-${classInput}_${nameInput}`
            ),
            {
              id: idInput,
              title: fullDate,
            }
          ).then(() => {
            setIdInput("");
            setGradeInput("");
            setClassInput("");
            setNameInput("");
            setTimeInput("");
            setSymptomInput("");
            console.log("성공");
          });
        });
      }
    }
    // const [checkPaper_data, setCheckPaper_data] = useState([]);
    // const checkPaper_db = getFirestore();
    // const checkPaper_db_data = useCallback(async () => {
    //   let postData = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(checkPaper_db, userId));
    //     querySnapshot.forEach((doc) => {
    //       console.log(`${doc.id} => ${doc.data()}`);
    //       postData.push({ post: doc.data(), id: doc.id });
    //     });
    //     setCheckPaper_data((prevPosts) => prevPosts.concat(postData));
    //   } catch {}
    // }, [checkPaper_db]);
    // useEffect(() => {
    //   checkPaper_db_data();
    // }, [checkPaper_db_data]);

    // function modal(grade, classResult, nameResult, time, symptom, date) {
    //   document.querySelector(".modal_wrap").style.display = "flex";
    //   document.querySelector(".black_bg").style.display = "block";
    //   document.getElementById(
    //     "modal_text"
    //   ).innerHTML = `<p>${grade}학년 ${classResult}반 ${nameResult}</p>
    //   <p>위 학생은 보건실에 ${time} ${symptom} 증상으로 다녀감을 확인 합니다.</p>
    //   <p>${date}</p><p>보건교사 문서현</p>`;
    //   function offClick() {
    //     document.querySelector(".modal_wrap").style.display = "none";
    //     document.querySelector(".black_bg").style.display = "none";
    //   }
    //   document
    //     .querySelector(".modal_close")
    //     .addEventListener("click", offClick);
    // }

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
            <img src="./images/logo.png" alt="" />
            <hr style={{ width: "100%", marginBottom: "50px" }} />
            <h2 style={{ marginBottom: "30px" }}>보건실입실확인증</h2>
            <div>
              학생ID{" "}
              <input
                value={idInput}
                onChange={(e) => {
                  setIdInput(e.target.value);
                }}
                type="text"
                placeholder="ex) sdh20200405"
              />
            </div>
            <div>
              학년{" "}
              <input
                onChange={(e) => {
                  setGradeInput(e.target.value);
                }}
                value={gradeInput}
                type="number"
                min="1"
                max="3"
              />
            </div>
            <div>
              반{" "}
              <input
                onChange={(e) => {
                  setClassInput(e.target.value);
                }}
                value={classInput}
                type="number"
                min="1"
                max="4"
              />
            </div>
            <div>
              이름{" "}
              <input
                onChange={(e) => {
                  setNameInput(e.target.value);
                }}
                value={nameInput}
                type="text"
              />
            </div>
            <div>
              시간{" "}
              <input
                onChange={(e) => {
                  setTimeInput(e.target.value);
                }}
                value={timeInput}
                type="text"
                placeholder="ex) 1교시 / 9시30분"
              />
            </div>
            <div>
              증상{" "}
              <input
                onChange={(e) => {
                  setSymptomInput(e.target.value);
                }}
                value={symptomInput}
                type="text"
              />
            </div>
            <button
              style={{ margin: "10px 0" }}
              onClick={postCheckPaper}
              className="submitBtn"
            >
              작성
            </button>
            <Link to="/dont-sick-react/delete">
              <button className="submitBtn">삭제</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  function DeleteCheckPaperPage() {
    const [checkPaper_data, setCheckPaper_data] = useState([]);
    const checkPaper_db_data = useCallback(async () => {
      let postData = [];
      try {
        const querySnapshot = await getDocs(
          collection(checkPaper_db, "check_paper")
        );
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          postData.push({
            title: doc.data().title,
            id: doc.data().id,
            dataId: doc.id,
          });
        });
        setCheckPaper_data((prevPosts) => prevPosts.concat(postData));
      } catch {}
    }, [checkPaper_db]);
    useEffect(() => {
      checkPaper_db_data();
    }, [checkPaper_db_data]);

    async function modal(id, title, dataId) {
      document.querySelector(".modal_wrap").style.display = "flex";
      document.querySelector(".black_bg").style.display = "block";
      const modalSnapshot = await getDoc(doc(checkPaper_db, id, title));
      try {
        document.getElementById("modal_text").innerHTML = `<p>${
          modalSnapshot.data().grade
        }학년 ${modalSnapshot.data().classResult}반 ${
          modalSnapshot.data().name
        }</p>
          <p>위 학생은 보건실에 ${modalSnapshot.data().time} ${
          modalSnapshot.data().symptom
        } 증상으로 다녀감을 확인 합니다.</p>
          <p>${modalSnapshot.data().date}</p><p>보건교사 문서현</p>`;
      } catch (e) {
        if (e instanceof TypeError) {
          alert("학생ID 오류");
        }
      }
      function offClick() {
        document.querySelector(".modal_wrap").style.display = "none";
        document.querySelector(".black_bg").style.display = "none";
      }
      async function deleteData(id, title, dataId) {
        try {
          await deleteDoc(doc(checkPaper_db, id, title));
          await deleteDoc(doc(checkPaper_db, "check_paper", dataId)).then(
            () => {
              window.location.reload();
            }
          );
        } catch {
          console.log("실패");
        }
      }
      document
        .querySelector(".modal_close")
        .addEventListener("click", offClick);
      document.getElementById("deleteBtn").addEventListener("clcik", () => {
        deleteData(id, title, dataId);
      });
    }

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
            <img src="./images/logo.png" alt="" />
            <hr style={{ width: "100%", marginBottom: "50px" }} />
            <h2 style={{ marginBottom: "30px" }}>보건실입실확인증</h2>
            <ul className="mylist">
              {checkPaper_data.map((post) => (
                <li
                  key={post.dataId}
                  onClick={() => {
                    modal(post.id, post.title, post.dataId);
                  }}
                >
                  {post.dataId}
                </li>
              ))}
            </ul>
            <div className="black_bg"></div>
            <div className="modal_wrap">
              <div className="modal_close"></div>
              <div id="modal_text"></div>
              <div
                id="deleteBtn"
                style={{
                  position: "absolute",
                  right: "10px",
                  bottom: "10px",
                  cursor: "pointer",
                }}
              >
                삭제
              </div>
            </div>
          </div>
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
      <Route
        path="/dont-sick-react/checkpaper"
        component={admin ? AdminCheckPaperPage : CheckPaperPage}
      />
      {admin ? (
        <Route
          path="/dont-sick-react/delete"
          component={DeleteCheckPaperPage}
        />
      ) : (
        () => {
          window.location.href = "/dont-sick-react/";
        }
      )}
    </div>
  );
}

export default App;
