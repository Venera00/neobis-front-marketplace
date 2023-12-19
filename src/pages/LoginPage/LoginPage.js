import { useState } from "react";
import mainLoginImage from "../../assets/mainLoginImage.png";
import eyeDisable from "../../assets/eyeDisable.svg";
import eye from "../../assets/eye.svg";
import "./LoginPage.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex space-between">
      <div className="img-wrapper">
        <img className="login-img" src={mainLoginImage} alt="Mobi market" />
      </div>

      <div className="login-form__wrapper">
        <form className="login-form">
          <input
            type="text"
            placeholder="Имя пользователя"
            className="form-input"
          />
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
        </form>
        <div className="login-link__wrapper">
          <Link to="/signup" className="login__link">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
