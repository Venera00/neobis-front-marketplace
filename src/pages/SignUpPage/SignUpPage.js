import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../api/index";
import userValidationSchema from "../../Schemas/UserRegistrationInput";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
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

  const handleNextClick = (values) => {
    if (values.login !== "" && values.email !== "") {
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
      login: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: userValidationSchema,

    onSubmit: async (values) => {
      try {
        const userInput = {
          login: "",
          email: "",
          password: "",
          passwordConfirm: "",
        };

        const response = await signup(userInput);
        if (response && response.success) {
          navigate("/profile");
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }

      console.log("Login:", login);
      console.log("Email:", email);
      console.log("Password:", password);
    },
  });

  const { values, errors, touched, handleBlur, handleChange } = formik;

  // const handleSubmit = async (e) => {
  //   try {
  //     const userInput = {
  //       login: "",
  //       email: "",
  //       password: "",
  //       passwordConfirm: "",
  //     };

  //     const response = await signup(userInput);
  //     if (response && response.success) {
  //       navigate("/profile");
  //       console.log(response);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   console.log("Login:", login);
  //   console.log("Email:", email);
  //   console.log("Password:", password);
  // };

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
          onSubmit={formik.handleSubmit}
        >
          <Form className="signup-form">
            {!showPasswordInput && (
              <div className="form-inputs">
                <label>
                  <Field
                    type="text"
                    name="login"
                    value={values.login}
                    placeholder="Имя пользователя"
                    className="form-input"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="login"
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
                    name="passwordConfirm"
                    value={values.passwordConfirm}
                    onChange={handleChange}
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
                {errors.passwordConfirm && touched.passwordConfirm && (
                  <div className="error-message">{errors.passwordConfirm}</div>
                )}
              </div>
            )}
            {!showPasswordInput && (
              <button
                onClick={handleNextClick}
                type="button"
                className="signup-next-btn"
              >
                Далее
              </button>
            )}
            {showPasswordInput && (
              <button type="submit" className={`signup-btn`}>
                Далее
              </button>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignUpPage;
