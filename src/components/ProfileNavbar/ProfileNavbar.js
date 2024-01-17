import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LogoutModal from "../LogoutModal/LogoutModal";
import profileAvatar from "../../assets/profileAvatar.svg";
import favorites from "../../assets/favorites.svg";
import myGoods from "../../assets/myGoods.svg";
import logout from "../../assets/logout.svg";
import profileArrow from "../../assets/profileArrow.svg";
import "./ProfileNavbar.css";

const ProfileNavbar = ({ userProducts }) => {
  const [modal, setModal] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // const { state } = useLocation();
  // const username = state && state.username;
  // const email = state && state.email;

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
    if (location.state && location.state.username && location.state.email) {
      setUsername(location.state.username);
      setEmail(location.state.email);
    }
  }, [location.state]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleCancelClick = () => {
    setModal(false);
  };

  return (
    <div className="profile-menu">
      <div className="username-info flex">
        <Link to="/profile">
          <img src={profileAvatar} alt="User avatar" />
          <div className="username-wrappers">
            <h4 className="username">{username}</h4>
            <p className="email">{email}</p>
          </div>
        </Link>
      </div>

      <Link className="profile-link">
        <div className="profile-item flex">
          <div className="item-info flex">
            <img src={favorites} alt="Favorites" />
            <p className="item-title">Понравившиеся</p>
          </div>
          <img src={profileArrow} alt="An arrow" />
        </div>
      </Link>

      <Link
        to={{ pathname: "/profile/my-goods", state: { userProducts } }}
        className="profile-link"
      >
        <div className="profile-item">
          <div className="item-info flex">
            <img src={myGoods} alt="My goods" />
            <p className="item-title">Мои товары</p>
          </div>
          <img src={profileArrow} alt="An arrow" />
        </div>
      </Link>

      <div className="profile-item logout" onClick={toggleModal}>
        <div className="item-info flex">
          <img src={logout} alt="Logout" />
          <p className="item-title">Выйти</p>
        </div>
        <img src={profileArrow} alt="" An arrow />
      </div>

      {modal && (
        <LogoutModal
          onLogout={navigate("/")} //Should be edited
          onCancel={handleCancelClick}
          toggleModal={toggleModal}
        >
          <p className="logout-title">
            Вы действительно хотите выйти с приложения?
          </p>
        </LogoutModal>
      )}
    </div>
  );
};

export default ProfileNavbar;
