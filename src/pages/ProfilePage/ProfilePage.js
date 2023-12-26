import React from "react";
import ProfileNavbar from "../../components/ProfileNavbar/ProfileNavbar";
import "./ProfilePage.css";
import profileAvatar from "../../assets/profileAvatar.svg";

const ProfilePage = ({ username, email }) => {
  return (
    <div className="profile-wrapper">
      <ProfileNavbar />
      <div className="user-info"></div>
    </div>
  );
};

export default ProfilePage;
