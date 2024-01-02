import { useState } from "react";
import AddProductValidationSchema from "../../Schemas/AddProductValidationSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import addImg from "../../assets/addImg.svg";
import "./AddProductModal.css";

const AddProductModal = ({ toggleModal }) => {
  const [files, setFiles] = useState(null);
  const [isFormFilled, setIsFormFilled] = useState(false);

  const initialValues = {
    image: null,
    price: null,
    productName: "",
    briefDescription: "",
    fullDescription: "",
  };
  // validationSchema: AddProductValidationSchema;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFiles(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (values) => {
    const isAllFieldsFilled = Object.values(values).every(
      (val) => val !== null && val !== ""
    );
    setIsFormFilled(isAllFieldsFilled);
  };

  const handleSubmit = async (values) => {
    // there will be requests
    // toggleModal();
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
            className="formik"
          >
            {({ values }) => (
              <Form className="form " onChange={() => handleInputChange}>
                <div className="add-img flex">
                  <input
                    id="input-img"
                    type="file"
                    name="image"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    required
                  />
                  <label htmlFor="input-img" className="img-input__label">
                    <img src={addImg} alt="Add photo" />
                  </label>

                  {files && (
                    <div className="flex">
                      <img
                        src={files}
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
                  required
                />

                <Field
                  type="text"
                  name="productName"
                  placeholder="Название"
                  className="form-input"
                />
                <Field
                  type="text"
                  name="briefDescription"
                  placeholder="Краткое описание"
                  className="form-input"
                />
                <Field
                  type="text"
                  name="fullDescription"
                  placeholder="Полное описание"
                  className="form-input"
                />

                <button
                  type="submit"
                  className={`form-btn ${isFormFilled ? "filled" : "unfilled"}`}
                  disabled={!isFormFilled}
                  handleSubmit
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
