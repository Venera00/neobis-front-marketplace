import { useState } from "react";
import { login } from "../../api";
import { useDispatch } from "react-redux";
import { setEmail } from "../../redux/reducers/reducers";
import mainLoginImage from "../../assets/mainLoginImage.png";
import eyeDisable from "../../assets/eyeDisable.svg";
import eye from "../../assets/eye.svg";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");

  const navigate = useNavigate();

  // const dispatch = useDispatch();

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ username, password });
      console.log("Login success", response);

      navigate("/main");

      // const userEmail = response.data.email;
      // dispatch(setEmail(userEmail));
    } catch (error) {
      console.log("Login failed", error);

      toast.error("Неверный логин или пароль!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="flex space-between">
      <div className="img-wrapper">
        <img className="login-img" src={mainLoginImage} alt="Mobi market" />
      </div>

      <div className="login-form__wrapper">
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            placeholder="Имя пользователя"
            className="form-input"
            onChange={(e) => setUsername(e.target.value)}
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
          <button type="submit" className="login-btn">
            Войти
          </button>
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
