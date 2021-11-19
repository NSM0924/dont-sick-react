import React from "react";
import "../css/LoginPage.css";

function LoginPage() {
  return (
    <div className="content">
      <img src="images/logo.png" alt="logo" />
      <button type="submit" className="submitBtn">
        구글 로그인
      </button>
    </div>
  );
}

export default LoginPage;
