import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import * as S from "./styles";

function UserLayout() {
  return (
    <S.UserLayoutWrapper>
      <Header />
      <S.MainWrapper>
        <Outlet />
      </S.MainWrapper>
      <Footer />
    </S.UserLayoutWrapper>
  );
}

export default UserLayout;
