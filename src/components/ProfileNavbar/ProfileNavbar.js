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
      <div>
        <img src={profileAvatar} />
        <div className="username-wrappers">
          <h4 className="username">{username}</h4>
          <p className="email">{email}</p>
        </div>
      </div>

      <Link className="profile-link">
        <div className="profile-item">
          <div className="item-info">
            <img src={favorites} />
            <p>Понравившиеся</p>
          </div>
          <img src={profileArrow} />
        </div>
      </Link>
      <Link className="profile-link">
        <div className="profile-item">
          <div className="item-info">
            <img src={myGoods} />
            <p>Мои товары</p>
          </div>
          <img src={profileArrow} />
        </div>
      </Link>
      <Link className="profile-link">
        <div className="profile-item">
          <div className="item-info">
            <img src={logout} />
            <p>Выйти</p>
          </div>
          <img src={profileArrow} />
        </div>
      </Link>
    </div>
  );
};

export default profileNavbar;
