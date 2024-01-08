import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import phone from "../../assets/phone.svg";
import "./AddPhoneModal.css";

const AddPhoneModal = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [sentCode, setSentCode] = useState(false);
  const [enterCode, setEnterCode] = useState("");

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);

    setIsPhoneValid(value.length > 0);
  };

  const handleSubmit = () => {
    // there should be request
    console.log(phoneNumber);

    setSentCode(true);
  };

  const hadleCodeSubmit = () => {
    console.log(enterCode);
  };

  return (
    <div className="modal flex">
      <div className="modal-overlay flex">
        <div className="modal-content flex">
          <p className="addphone-title">
            {sentCode ? "Введите код из смс" : "Изменить номер телефона"}
          </p>
          <img src={phone} alt="Add phone number" />
          <p className="addphone-subtitle">Введите номер телефона</p>
          <p className="addphone-placeholder">
            {sentCode ? "" : "Мы отправим вам СМС с кодом подтверждения"}
          </p>
          {!sentCode ? (
            <PhoneInput
              className="phone-input"
              country={"ky"}
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="996777000000"
            />
          ) : (
            <input
              className="code-input"
              type="text"
              placeholder="Введите код"
              value={enterCode}
              onChange={(e) => setEnterCode(e.target.value)}
            />
          )}

          <button
            onSubmit={handleSubmit}
            className={`addphone-btn ${
              isPhoneValid ? ".btn-filled" : "btn-unfilled"
            }`}
          >
            Далее
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPhoneModal;
