import React from "react";
import { Link } from "react-router-dom";
import profileAvatar from "../../assets/profileAvatar.svg";
import favorites from "../../assets/favorites.svg";
import myGoods from "../../assets/myGoods.svg";
import logout from "../../assets/logout.svg";
import profileArrow from "../../assets/profileArrow.svg";
import "./ProfileNavbar.css";

const profileNavbar = ({ username, email }) => {
  return (
    <div className="profile-menu">
      <div className="username-info">
        <img src={profileAvatar} alt="User avatar" />
        <div className="username-wrappers">
          <h4 className="username">{username}</h4>
          <p className="email">{email}</p>
        </div>
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

      <Link className="profile-link">
        <div className="profile-item">
          <div className="item-info flex">
            <img src={myGoods} alt="My goods" />
            <p className="item-title">Мои товары</p>
          </div>
          <img src={profileArrow} alt="An arrow" />
        </div>
      </Link>

      <Link to="/" className="profile-link">
        <div className="profile-item logout">
          <div className="item-info flex">
            <img src={logout} alt="Logout" />
            <p className="item-title">Выйти</p>
          </div>
          <img src={profileArrow} alt="" An arrow />
        </div>
      </Link>
    </div>
  );
};

export default profileNavbar;
