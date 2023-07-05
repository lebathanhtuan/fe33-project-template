import { Link } from "react-router-dom";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "constants/routes";

import * as S from "./styles";

function AdminHeader() {
  const navigate = useNavigate();
  return (
    <S.HeaderWrapper>
      <h3>Logo</h3>
      <S.NavLinkContainer>
        <S.NavLinkItem onClick={() => navigate(ROUTES.USER.PRODUCT_LIST)}>
          <h4>Product</h4>
        </S.NavLinkItem>
      </S.NavLinkContainer>
      <div>
        <Button>Login</Button>
      </div>
    </S.HeaderWrapper>
  );
}

export default AdminHeader;
