import React from "react";
import LogoutModalImg from "../../assets/logoutModalImg.svg";
import "./LogoutModal.css";

const LogoutModal = ({ children, onLogout, onCancel }) => {
  return (
    <div className="modal-container flex">
      <div className="modal-wrapper">
        <div
          className="modal-content flex"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={LogoutModalImg} alt="Logout" />
          <p className="logout-title">{children}</p>
          <button onClick={() => onLogout()} className="btn-modal btn-logout">
            Выйти
          </button>
          <button onClick={() => onCancel()} className="btn-modal btn-cancel">
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
