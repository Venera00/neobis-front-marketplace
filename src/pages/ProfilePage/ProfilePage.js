import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setImage } from "../../redux/reducers/reducers";
import ProfileNavbar from "../../components/ProfileNavbar/ProfileNavbar";
import addUserInfo from "../../api/index";
import AddPhoneModal from "../../components/AddPhoneModal/AddPhoneModal";
import LogoutModal from "../../components/LogoutModal/LogoutModal";
import goBackIcon from "../../assets/goBackIcon.svg";
import "./ProfilePage.css";
import profileAvatar from "../../assets/profileAvatar.svg";

const ProfilePage = () => {
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState(profileAvatar);

  const dispatch = useDispatch();
  const email = useSelector((state) => state.profile.email);
  const userImage = useSelector((state) => state.profile.userImage);

  const handleImage = (e) => {
    const selectedImg = e.target.files[0];
    setImage(selectedImg);
    console.log(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(selectedImg));

    dispatch(setImage(URL.createObjectURL(selectedImg)));
  };

  useEffect(() => {
    const handleWindowClose = (e) => {
      if (image === "") {
        e.preventDefault();
      }
    };
  });

  function handleClick() {
    // const formData = new FormData();
    // formData.append("image", image);
    // axios.post("url", formData).then((res) => {
    //   console.log(res);
    // });
  }

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

        <form className="profile-form flex">
          <div className="choose-photo flex">
            <img
              src={previewImage}
              className="profile-img"
              alt="Profile image"
            />
            <input type="file" onChange={handleImage} id="img-input" />
            <label htmlFor="img-input">Выберите фотографию</label>
          </div>
          <input
            type="text"
            placeholder="Имя"
            onChange={(e) => e.target.value}
          />
          <input type="text" placeholder="Фамилия" />
          <input type="date" placeholder="Дата рождения" />
          <div className="add-mobile">Добавить номер</div>

          {/* <input type="email" placeholder="Email" /> */}
          <p className="user-email">{email}</p>
          <button className="profile-btn">Coхранить</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
