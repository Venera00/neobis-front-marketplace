import * as Yup from "yup";

const userValidationSchema = Yup.object().shape({
  login: Yup.string().required("Имя пользователя обязательно"),
  email: Yup.string().email("Неверный формат почты").required("Введите почту"),
  password: Yup.string()
    .required("Пароль обязателен")
    .min(8, "От 8 до 15 символов")
    .max(15, "От 8 до 15 символов")
    .matches(
      /^(?=.*[a-zа-я])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-ZА-Яa-zа-я\d@$!%*?&]+$/,
      "Пароль должен содержать как минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ"
    ),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Пароли должны совпадать")
    .required("Подтвердите пароль"),
});

export default userValidationSchema;
