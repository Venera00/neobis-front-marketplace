import * as Yup from "yup";

const AddProductValidationSchema = Yup.object({
  price: Yup.number().required("Введите цену"),
  productName: Yup.string().required("Введите название продукта"),
  briefDescription: Yup.string().required("Напишите краткое описание"),
  fullDescription: Yup.string().required("Напишите полное описание"),
});

export default AddProductValidationSchema;
