import React from "react";
import { Link } from "react-router-dom";
import "../css/menu.css";
import "../css/SettingPage.css";

function SettingPage() {
  return (
    <div className="container">
      <div className="box">
        <h2>계정정보</h2>
        <p style={{ textAlign: "left" }}>이름: 홍길동</p>
        <p style={{ textAlign: "left", marginBottom: "70px" }}>
          이메일: sdh00000000@sdh.hs.kr
        </p>

        <h2>알림 허용버튼</h2>
        <label className="switch-button" style={{ marginBottom: "50px" }}>
          <input type="checkbox" id="on_off_btn" />
          <span className="onoff-switch"></span>
        </label>

        <h2>로그아웃하기</h2>

        <button className="logout_btn">로그아웃하기</button>
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

export default SettingPage;
