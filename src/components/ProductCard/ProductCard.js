import React from "react";
import "./ProductCard.css";

const ProductCard = ({ id, imgSrc, title, price, Heart, heartTitle }) => {
  return (
    <div className="card-container">
      <div key={id} className="card-wrapper">
        <div className="card-content">
          <img src={imgSrc} alt={`Image ${id}`} className="card-img" />
          <p className="card-title">{title}</p>
          <p className="price">${price}</p>
          <div className="product-like flex">
            <img src={Heart} alt="Like" />
            <p className="heart-title">{heartTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
