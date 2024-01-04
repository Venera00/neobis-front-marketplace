import React from "react";
import LogoutModalImg from "../../assets/logoutModalImg.svg";
import "./LogoutModal.css";

const LogoutModal = ({ toggleModal }) => {
  return (
    <div className="modal">
      <div className="modal-overlay">
        <div
          className="modal-content flex"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={LogoutModalImg} />
          <p className="logout-title">
            Вы действительно хотите выйти с приложения?
          </p>
          <button className="btn-modal btn-logout">Выйти</button>
          <button className="btn-modal btn-cancel">Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
