import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../api/index";
import mainLoginImg from "../../assets/mainLoginImage.png";
import goBackIcon from "../../assets/goBackIcon.svg";
import eye from "../../assets/eye.svg";
import eyeDisable from "../../assets/eyeDisable.svg";
import "./SignUpPage.css";

const SignUpPage = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNextClick = () => {
    if (login.trim() !== "" && email.trim() !== "") {
      setShowPasswordInput(true);
    } else {
      console.log("Enter login and email");
    }
  };

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userInput = {
        login: login,
        email: email,
        password: password,
      };

      const response = await signup(userInput);
      navigate("/"); // It's for now, should be modified
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    console.log("Login:", login);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex space-between main-container">
      <div className="img-wrapper">
        <img src={mainLoginImg} className="login-img" />
      </div>

      <div className="signup-content">
        <div className="signup-text__wrapper">
          <div className="signup-text flex">
            <Link to="/" className="flex signup-back__link">
              <img src={goBackIcon} />
              <p className="back-link__text">Назад</p>
            </Link>
            <p className="signup-title">Регистрация</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          {!showPasswordInput && (
            <div className="form-inputs">
              <label>
                <input
                  type="text"
                  name="login"
                  placeholder="Имя пользователя"
                  className="form-input"
                  value={login}
                  onChange={handleLoginChange}
                />
              </label>

              <label>
                <input
                  type="email"
                  name="email"
                  placeholder="Почта"
                  className="form-input"
                  value={email}
                  onChange={handleEmailChange}
                />
              </label>
            </div>
          )}

          {showPasswordInput && (
            <div className="password-inputs">
              <div className="password-input__wrapper flex space-between">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Пароль"
                  className="password-input"
                />
                <span onClick={handleToggle} className="eye">
                  <img
                    src={showPassword ? eye : eyeDisable}
                    alt="Eye Icon"
                    className="eye-icon"
                  />
                </span>
              </div>

              <div className="password-input__wrapper flex space-between">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="Потдтвердите пароль"
                  className="password-input"
                />
                <span onClick={handleToggleConfirmPassword} className="eye">
                  <img
                    src={showConfirmPassword ? eye : eyeDisable}
                    alt="Eye Icon"
                    className="eye-icon"
                  />
                </span>
              </div>
            </div>
          )}

          {!showPasswordInput && (
            <button onClick={handleNextClick} className="signup-next-btn">
              Далее
            </button>
          )}

          {showPasswordInput && (
            <button type="submit" className="signup-btn">
              Далее
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
