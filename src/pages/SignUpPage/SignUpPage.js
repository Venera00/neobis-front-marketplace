import React from "react";
import mainLoginImg from "../../assets/mainLoginImage.png";
import goBackIcon from "../../assets/goBackIcon.svg";
import "./SignUpPage.css";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className="flex space-between">
      <div className="img-wrapper">
        <img src={mainLoginImg} className="login-img" />
      </div>

      <div className="signup-content">
        <div className="signup-text__wrapper flex">
          <div className="signup-text flex">
            <Link to="/" className="flex">
              <img src={goBackIcon} />
              <p>Назад</p>
            </Link>
            <p className="signup-title">Регистрация</p>
          </div>
        </div>

        <form className="signup-form">
          <input
            type="text"
            name="login"
            placeholder="Имя пользователя"
            className="form-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Почта"
            className="form-input"
          />

          <button className="signup-btn">Далее</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
