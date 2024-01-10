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
    productName: "",
    briefDescription: "",
    fullDescription: "",
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
    try {
      const response = await addProduct({
        image: image,
        price: values.price,
        productName: values.productName,
        briefDescription: values.briefDescription,
        fullDescription: values.fullDescription,
      });
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
                  className="form-input"
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="error-msg"
                />

                <Field
                  type="text"
                  name="productName"
                  placeholder="Название"
                  className="form-input"
                />
                <ErrorMessage
                  name="productName"
                  component="div"
                  className="error-msg"
                />

                <Field
                  type="text"
                  name="briefDescription"
                  placeholder="Краткое описание"
                  className="form-input"
                />
                <ErrorMessage
                  name="briefDescription"
                  component="div"
                  className="error-msg"
                />

                <Field
                  type="text"
                  name="fullDescription"
                  placeholder="Полное описание"
                  className="form-input"
                />
                <ErrorMessage
                  name="fullDescription"
                  component="div"
                  className="error-msg"
                />

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
