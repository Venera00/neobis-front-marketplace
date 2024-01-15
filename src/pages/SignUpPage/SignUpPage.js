import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../api/index";
// import { refreshToken } from "../../api/index";
import userValidationSchema from "../../Schemas/UserRegistrationInput";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { toast } from "react-toastify";
import mainLoginImg from "../../assets/mainLoginImage.png";
import goBackIcon from "../../assets/goBackIcon.svg";
import eye from "../../assets/eye.svg";
import eyeDisable from "../../assets/eyeDisable.svg";
import passwordIcon from "../../assets/passwordIcon.svg";
import "./SignUpPage.css";

const SignUpPage = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  // const [password, setPassword] = useState("");
  // const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const handleNextClick = (values) => {
    if (values.username !== "" && values.email !== "") {
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

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password_confirm: "",
    },
    validationSchema: userValidationSchema,
  });

  const handleSubmit = async (values) => {
    console.log("Form values:", values);

    try {
      const userInput = {
        username: values.username,
        email: values.email,
        password: values.password,
        password_confirm: values.password_confirm,
      };

      const response = await signup(userInput);

      console.log("Successfull registration", response);
      toast.success("Регистрация прошла успешно", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      navigate("/", {
        state: {
          username: response.username,
          email: response.email,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
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

        <Formik
          initialValues={formik.initialValues}
          validationSchema={formik.validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, errors, touched, handleBlur, handleChange, isValid }) => (
            <Form className="signup-form">
              {!showPasswordInput && (
                <div className="form-inputs">
                  <label>
                    <Field
                      type="text"
                      name="username"
                      value={values.username}
                      placeholder="Имя пользователя"
                      className="form-input"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="error-message"
                    />
                  </label>

                  <label>
                    <Field
                      type="email"
                      name="email"
                      value={values.email}
                      placeholder="Почта"
                      className="form-input"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message"
                    />
                  </label>
                </div>
              )}

              {showPasswordInput && (
                <div>
                  <img src={passwordIcon} />

                  <div className="password-requirements">
                    Минимальная длина — 8 символов. Для надежности пароль должен
                    содержать буквы, цифры и минимум 1 спец. символ.
                  </div>
                </div>
              )}
              {showPasswordInput && (
                <div className="password-inputs">
                  <div className="password-input__wrapper flex space-between">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
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
                  {errors.password && touched.password && (
                    <div className="error-message">{errors.password}</div>
                  )}

                  <div className="password-input__wrapper flex space-between">
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      name="password_confirm"
                      value={values.password_confirm}
                      onChange={handleChange}
                      placeholder="Подтвердите пароль"
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
                  {errors.password_confirm && touched.password_confirm && (
                    <div className="error-message">
                      {errors.password_confirm}
                    </div>
                  )}
                </div>
              )}
              {!showPasswordInput && (
                <button
                  onClick={handleNextClick}
                  type="button"
                  className={`signup-next-btn ${isValid ? "gray" : "purple"}`}
                  disabled={!formik.isValid}
                >
                  Далее
                </button>
              )}
              {showPasswordInput && (
                <button
                  type="submit"
                  className={`signup-btn ${isValid ? "gray" : "purple"}`}
                  disabled={!formik.isValid}
                >
                  Далее
                </button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpPage;
