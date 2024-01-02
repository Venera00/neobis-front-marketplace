import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import addImg from "../../assets/addImg.svg";
import "./AddProductModal.css";

const AddProductModal = ({ toggleModal }) => {
  const [files, setFiles] = useState(null);

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
        setFiles(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values) => {
    // there will be requests
    toggleModal();
  };

  return (
    <div className="modal flex">
      <div className="modal-overlay flex" onClick={toggleModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close-modal" onClick={toggleModal}>
            &times;
          </span>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ setFieldValue }) => (
              <Form className="form ">
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

                <Field type="number" name="price" placeholder="Цена" />
                <Field type="text" name="productName" placeholder="Название" />
                <Field
                  type="text"
                  name="productName"
                  placeholder="Краткое описание"
                />
                <Field
                  type="text"
                  name="productName"
                  placeholder="Полное описание"
                />

                <button type="submit">Добавить</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
