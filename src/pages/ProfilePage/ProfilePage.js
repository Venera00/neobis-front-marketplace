import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");

  const { state } = useLocation();
  const username = state && state.username;

  useEffect(() => {
    setEmail(state && state.email);
  }, [state]);

  // const dispatch = useDispatch();
  // const email = useSelector((state) => state.profile.email);
  // const userImage = useSelector((state) => state.profile.image);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);

      setImage(parsedUserData.image);
      setFirstName(parsedUserData.firstName);
      setLastName(parsedUserData.lastName);
      setDateOfBirth(parsedUserData.dateOfBirth);
    }
  }, []);

  useEffect(() => {
    const userDataStore = JSON.stringify({
      image,
      firstName,
      lastName,
      dateOfBirth,
    });

    localStorage.setItem("userData", userDataStore);
  }, [image, firstName, lastName, dateOfBirth]);

  const handleImage = (e) => {
    const selectedImg = e.target.files[0];
    setImage(selectedImg);
    console.log(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(selectedImg));

    // const reader = new FileReader();

    // reader.onloadend = () => {
    //   setImage(reader.result);
    // };
    // reader.readAsDataURL(selectedImg);

    // dispatch(setImage(URL.createObjectURL(selectedImg)));
  };

  useEffect(() => {
    const handleWindowClose = (e) => {
      if (image === "") {
        e.preventDefault();
      }
    };
  });

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("avatar", image);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("date_of_birth", dateOfBirth);

    try {
      const response = await addUserInfo(formData);

      console.log(response);
      // Add toastify
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
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

        <form onSubmit={handleClick} className="profile-form flex">
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Фамилия"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            name="date_of_birth"
            placeholder="Дата рождения 2000-10-10"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <div className="add-mobile" onClick={toggleModal}>
            Добавить номер
          </div>
          {modal && <AddPhoneModal toggleModal={toggleModal} />}

          {/* <input type="email" placeholder="Email" /> */}
          <p className="user-email">{email}</p>
          <button type="submit" className="profile-btn">
            Coхранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
