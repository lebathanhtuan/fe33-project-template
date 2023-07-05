import { Navigate } from "react-router-dom";

import { ROUTES } from "constants/routes";

import * as S from "./styles";

function HomePage() {
  // const role = "admin";

  // if (role === "admin") return <Navigate to={ROUTES.USER.PRODUCT_LIST} />;
  return <S.HomeWrapper>Home Page</S.HomeWrapper>;
}

export default HomePage;
