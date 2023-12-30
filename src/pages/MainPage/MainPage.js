import React from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import mobiMarketIcon from "../../assets/mobiMarcetIcon.svg";
import profileAvatar from "../../assets/profileAvatar.svg";
import "./MainPage.css";

const MainPage = (username) => {
  return (
    <div>
      <div className="main-nav flex space-between">
        <div className="logo-wrapper flex">
          <img src={mobiMarketIcon} alt="Mobimarket icon" />
          <p className="icon-title">MOBI MARKET</p>
        </div>
        <div className="nav-user__info flex">
          <button className="nav-btn">Подать обьявление</button>
          <div className="username-wrapper flex">
            <p className="username-title">Venera</p>
            <img src={profileAvatar} alt="Profile avatar" />
          </div>
        </div>
      </div>
      <div className="cards-container">
        <ProductCard />
      </div>
    </div>
  );
};

export default MainPage;
