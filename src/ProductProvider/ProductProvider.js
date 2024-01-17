import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [userProducts, setUserProducts] = useState([]);

  const addProduct = (product) => {
    setUserProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <ProductContext.Provider value={{ userProducts, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
