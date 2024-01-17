import React from "react";
import ProfileNavbar from "../../../components/ProfileNavbar/ProfileNavbar";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { useProductContext } from "../../../ProductProvider/ProductProvider";
import "./MyGoodsPage.css";

const MyGoodsPage = () => {
  const { userProducts } = useProductContext();
  return (
    <div className="container">
      <ProfileNavbar />

      <div className="mygoods-container">
        <h2 className="mygoods-title">Мои товары</h2>

        <div className="cards-container">
          {userProducts.map((product) => (
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
    </div>
  );
};

export default MyGoodsPage;
