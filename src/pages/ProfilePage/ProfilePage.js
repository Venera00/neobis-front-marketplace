import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setImage } from "../../redux/reducers/reducers";
import ProfileNavbar from "../../components/ProfileNavbar/ProfileNavbar";
import { addUserInfo } from "../../api/index";
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
  const userImage = useSelector((state) => state.profile.image);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

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

  const handleClick = async (values) => {
    // const userInfo = () => {
    //   image: values.image;
    //   first_name: firstName,
    //   last_name: values.last_name,
    //   date_of_birth: toString(values.date_of_birth),
    // } need to request with formdata

    const formData = new FormData();

    formData.append("image", image);
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("date_of_birth", values.last_name);

    try {
      const response = await addUserInfo(formData);

      console.log(response);
      // Add toastify
    } catch (error) {
      console.log(error);
    }
  };

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
            <input
              type="file"
              name="image"
              onChange={handleImage}
              id="img-input"
            />
            <label htmlFor="img-input">Выберите фотографию</label>
          </div>
          <input
            type="text"
            name="first_name"
            placeholder="Имя"
            onChange={(e) => e.target.value}
          />
          <input type="text" name="last_name" placeholder="Фамилия" />
          <input type="date" name="date_of_birth" placeholder="Дата рождения" />
          <div className="add-mobile" onClick={toggleModal}>
            Добавить номер
          </div>
          {modal && <AddPhoneModal toggleModal={toggleModal} />}

          {/* <input type="email" placeholder="Email" /> */}
          <p className="user-email">{email}</p>
          <button className="profile-btn" onSubmit={handleClick}>
            Coхранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
