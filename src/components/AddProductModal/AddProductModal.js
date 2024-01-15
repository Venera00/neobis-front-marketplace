import { useState } from "react";
import AddProductValidationSchema from "../../Schemas/AddProductValidationSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addProduct } from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import addImg from "../../assets/addImg.svg";
import "./AddProductModal.css";

const AddProductModal = ({ toggleModal }) => {
  const [files, setFiles] = useState(null);
  const [image, setImage] = useState(null);
  // const [isFormFilled, setIsFormFilled] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    image: null,
    price: null,
    name: "",
    short_description: "",
    description: "",
    available: false,
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setFiles(file);
    }
  };

  const handleSubmit = async (values, actions) => {
    const formData = new FormData();

    formData.append("photos", image);
    formData.append("price", values.price);
    formData.append("name", values.name);
    formData.append("short_description", values.short_description);
    formData.append("description", values.description);
    formData.append("available", values.available);
    try {
      const response = await addProduct(formData);
      console.log(response);

      toast.success("Товар добавлен", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      navigate.push("/profile"); //The path should be changed
    } catch (error) {
      console.log(error);

      toast.error("Не удалось добавить товар", {
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
    toggleModal();
  };

  return (
    <div className="modal flex">
      <div className="modal-overlay flex" onClick={toggleModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span
            className="close-modal"
            onClick={(e) => {
              e.stopPropagation();
              toggleModal();
            }}
          >
            &times;
          </span>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={AddProductValidationSchema}
          >
            {({ values, handleChange, handleBlur, isSubmitting, isValid }) => (
              <Form className="form ">
                <div className="add-img flex">
                  <input
                    id="input-img"
                    type="file"
                    name="image"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                  <label htmlFor="input-img" className="img-input__label">
                    <img src={addImg} alt="Add photo" />
                  </label>

                  {image && (
                    <div className="flex">
                      <img
                        src={image}
                        alt="Uploaded file"
                        className="uploaded-img"
                      />
                    </div>
                  )}
                </div>

                <Field
                  type="number"
                  name="price"
                  placeholder="Цена"
                  className="product-input"
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="error-msg"
                />

                <Field
                  type="text"
                  name="name"
                  placeholder="Название"
                  className="product-input"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-msg"
                />

                <Field
                  type="text"
                  name="short_description"
                  placeholder="Краткое описание"
                  className="product-input"
                />
                <ErrorMessage
                  name="short_description"
                  component="div"
                  className="error-msg"
                />

                <Field
                  type="text"
                  name="description"
                  placeholder="Полное описание"
                  className="product-input"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error-msg"
                />

                <label className="available-checkbox flex">
                  <p className="available-title">В наличии: </p>
                  <div>
                    <Field type="checkbox" name="available" />
                  </div>
                </label>

                <button
                  type="submit"
                  className={`form-btn ${isValid ? "filled" : "unfilled"}`}
                  disabled={isSubmitting}
                >
                  Добавить
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
