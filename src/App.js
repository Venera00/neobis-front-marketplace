import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MainPage from "./pages/MainPage/MainPage";
import MyGoodsPage from "./pages/ProfilePage/MyGoodsPage/MyGoodsPage";
import { ProductProvider } from "./ProductProvider/ProductProvider";

function App() {
  return (
    <div className="App">
      <ProductProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/my-goods" element={<MyGoodsPage />} />
            <Route path="/main" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </div>
  );
}

export default App;
