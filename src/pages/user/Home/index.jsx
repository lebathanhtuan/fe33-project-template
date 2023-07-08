import { Navigate } from "react-router-dom";
import { Input } from "antd";

import { ROUTES } from "constants/routes";

import * as S from "./styles";

function HomePage() {
  const role = "admin";

  // if (role === "admin") return <Navigate to={ROUTES.USER.PRODUCT_LIST} />;
  return (
    <S.HomeWrapper>
      Home Page
      <S.HomeButton>Go to products</S.HomeButton>
      <S.HomeButton width={200} active>
        Go to login
      </S.HomeButton>
      {role === "admin" && <p>Admin</p>}
      <S.AhihiButton>Ahihi</S.AhihiButton>
      <S.CustomButton type="primary">Antd Custom Button</S.CustomButton>
      <Input />
    </S.HomeWrapper>
  );
}

export default HomePage;
