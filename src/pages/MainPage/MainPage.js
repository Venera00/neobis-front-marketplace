import React, { useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductCardData from "../../components/ProductCard/ProductCardData";
import AddProductModal from "../../components/AddProductModal/AddProductModal";
import mobiMarketIcon from "../../assets/mobiMarcetIcon.svg";
import profileAvatar from "../../assets/profileAvatar.svg";
import "./MainPage.css";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <div className="main-nav flex space-between">
        <div className="logo-wrapper flex">
          <img src={mobiMarketIcon} alt="Mobimarket icon" />
          <p className="icon-title">MOBI MARKET</p>
        </div>
        <div className="nav-user__info flex">
          <div>
            <button onClick={toggleModal} className="nav-btn">
              Подать обьявление
            </button>
            {modal && <AddProductModal toggleModal={toggleModal} />}
          </div>
          <Link to="/profile" className="username-wrapper flex">
            <p className="username-title">Venera</p>
            <img src={profileAvatar} alt="Profile avatar" />
          </Link>
        </div>
      </div>
      <div className="cards-container">
        {ProductCardData.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            imgSrc={product.imgSrc}
            title={product.title}
            price={product.price}
            Heart={product.Heart}
            heartTitle={product.heartTitle}
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
