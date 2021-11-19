import React from "react";
import { Link } from "react-router-dom";
import "../css/menu.css";
import "../css/HomePage.css";

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
          <div class="curcle"></div>
          <h2 id="text" style={{ marginBottom: "70px" }}>
            보건실 현재 온-오프라인
          </h2>
          <label className="switch-button" style={{ marginBottom: "50px" }}>
            <input type="checkbox" id="on_off_btn" />
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

export default HomePage;
