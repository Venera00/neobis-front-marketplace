import * as Yup from "yup";

const AddProductValidationSchema = Yup.object({
  price: Yup.number().required("Введите цену"),
  name: Yup.string().required("Введите название продукта"),
  short_description: Yup.string().required("Напишите краткое описание"),
  description: Yup.string().required("Напишите полное описание"),
  available: Yup.boolean().required("Пожалуйста укажите доступен ли товар"),
});

export default AddProductValidationSchema;
