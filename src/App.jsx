import { Routes, Route } from "react-router-dom";

import UserLayout from "layouts/UserLayout";

import HomePage from "pages/user/Home";
import ProductListPage from "pages/user/ProductList";

import { ROUTES } from "constants/routes";

function App() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path={ROUTES.USER.HOME} element={<HomePage />} />
        <Route path={ROUTES.USER.PRODUCT_LIST} element={<ProductListPage />} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
