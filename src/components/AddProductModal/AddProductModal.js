import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import addImg from "../../assets/addImg.svg";
import "./AddProductModal.css";

const AddProductModal = ({ closeModal }) => {
  const initialValues = {
    image: null,
    price: null,
    productName: "",
    briefDescription: "",
    fullDescription: "",
  };

  const handleImage = (event, setFieldValue) => {
    const selectedImage = event.currentTarget.files[0];
    setFieldValue("image", selectedImage);
  };

  const handleSubmit = async (values) => {
    // there will be requests
    closeModal();
  };
  return (
    <div className="modal flex">
      <div className="modal-overlay flex" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close-modal" onClick={closeModal}>
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
                    onChange={(e) => handleImage(e, setFieldValue)}
                    required
                  />
                  <label htmlFor="input-img" className="img-input__label">
                    <img src={addImg} alt="Add image" />
                  </label>
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
