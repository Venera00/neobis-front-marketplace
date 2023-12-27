import React from "react";
import { Link } from "react-router-dom";
import ProfileNavbar from "../../components/ProfileNavbar/ProfileNavbar";
import goBackIcon from "../../assets/goBackIcon.svg";
import "./ProfilePage.css";
import profileAvatar from "../../assets/profileAvatar.svg";

const ProfilePage = ({ username, email }) => {
  return (
    <div className="profile-wrapper">
      <ProfileNavbar />
      <div className="user-wrapper">
        <div className="signup-text flex">
          <Link to="/" className="flex signup-back__link">
            <img src={goBackIcon} />
            <p className="back-link__text">Назад</p>
          </Link>
          <p className="signup-title">Профиль</p>
        </div>

        <Link className="choose-photo flex">
          <img src={profileAvatar} />
          <p>Выбрать фотографию</p>
        </Link>

        <form className="profile-form flex">
          <input
            type="text"
            placeholder="Имя"
            onChange={(e) => e.target.value}
          />
          <input type="text" placeholder="Фамилия" />
          <input type="date" placeholder="Дата рождения" />
          <div className="add-mobile ">Добавить номер</div>
        </form>

        <p>{email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
