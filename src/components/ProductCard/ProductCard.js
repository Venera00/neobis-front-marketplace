import React from "react";
import bmw from "../../assets/bmw.svg";
import "./ProductCard.css";

const ProductCard = ({ id, imgSrc, title, price }) => {
  return (
    <div key={id} className="card-wrapper">
      <img src={imgSrc} alt={`Image ${id}`} />
      <p className="card-title">{title}</p>
      <p className="price">${price}</p>
    </div>
  );
};

export default ProductCard;
