import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";

import UserLayout from "layouts/UserLayout";

import HomePage from "pages/user/Home";
import ProductListPage from "pages/user/ProductList";

import { ROUTES } from "constants/routes";
import { light, dark } from "themes";

function App() {
  const { theme } = useSelector((state) => state.common);
  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER.HOME} element={<HomePage />} />
          <Route
            path={ROUTES.USER.PRODUCT_LIST}
            element={<ProductListPage />}
          />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
