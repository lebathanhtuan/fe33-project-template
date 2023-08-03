import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

import UserLayout from "layouts/UserLayout";

import HomePage from "pages/user/Home";
import ProductListPage from "pages/user/ProductList";
import ProductDetailPage from "pages/user/ProductDetail";
import CartPage from "pages/user/Cart";
import CheckoutPage from "pages/user/Checkout";
import ProfilePage from "pages/user/Profile";
import LoginPage from "pages/Login";
import RegisterPage from "pages/Register";

import { ROUTES } from "constants/routes";
import { getUserInfoRequest } from "redux/slicers/auth.slice";
import { light, dark } from "themes";

function App() {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const { theme } = useSelector((state) => state.common);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const tokenData = jwtDecode(accessToken);
      dispatch(
        getUserInfoRequest({
          id: parseInt(tokenData.sub),
        })
      );
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER.HOME} element={<HomePage />} />
          <Route
            path={ROUTES.USER.PRODUCT_LIST}
            element={<ProductListPage />}
          />
          <Route
            path={ROUTES.USER.PRODUCT_DETAIL}
            element={<ProductDetailPage />}
          />
          <Route path={ROUTES.USER.CART} element={<CartPage />} />
          <Route path={ROUTES.USER.CHECKOUT} element={<CheckoutPage />} />
          <Route path={ROUTES.USER.PROFILE} element={<ProfilePage />} />
        </Route>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
