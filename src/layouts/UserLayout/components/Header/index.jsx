import { Link } from "react-router-dom";
import { Space, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ROUTES } from "constants/routes";
import { setTheme } from "redux/slicers/common.slice";

import * as S from "./styles";

function AdminHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <S.HeaderWrapper>
      <h3>Logo</h3>
      <S.NavLinkContainer>
        <S.NavLinkItem onClick={() => navigate(ROUTES.USER.PRODUCT_LIST)}>
          <h4>Product</h4>
        </S.NavLinkItem>
      </S.NavLinkContainer>
      <Space>
        <Button onClick={() => dispatch(setTheme({ theme: "light" }))}>
          Light
        </Button>
        <Button onClick={() => dispatch(setTheme({ theme: "dark" }))}>
          Dark
        </Button>
        <Button type="primary">Login</Button>
      </Space>
    </S.HeaderWrapper>
  );
}

export default AdminHeader;
