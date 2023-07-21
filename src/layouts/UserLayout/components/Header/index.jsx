import { Link } from "react-router-dom";
import { Space, Button, Dropdown, Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";

import { ROUTES } from "constants/routes";
import { setTheme } from "redux/slicers/common.slice";
import { logoutRequest } from "redux/slicers/auth.slice";

import * as S from "./styles";

function AdminHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { cartList } = useSelector((state) => state.cart);

  return (
    <S.HeaderWrapper>
      <h3>Logo</h3>
      <S.NavLinkContainer>
        <S.NavLinkItem onClick={() => navigate(ROUTES.USER.PRODUCT_LIST)}>
          <h4>Product</h4>
        </S.NavLinkItem>
      </S.NavLinkContainer>
      <Space size={16}>
        <Badge count={cartList.length}>
          <Link to={ROUTES.USER.CART}>
            <Button type="text" icon={<ShoppingCartOutlined />}></Button>
          </Link>
        </Badge>
        <Button onClick={() => dispatch(setTheme({ theme: "light" }))}>
          Light
        </Button>
        <Button onClick={() => dispatch(setTheme({ theme: "dark" }))}>
          Dark
        </Button>
        {userInfo.data.id ? (
          <Dropdown
            menu={{
              items: [
                {
                  key: 1,
                  label: "Thông tin cá nhân",
                },
                {
                  key: 2,
                  label: "Đăng xuất",
                  onClick: () => dispatch(logoutRequest()),
                },
              ],
            }}
          >
            <div>
              <h3>{userInfo.data.fullName}</h3>
            </div>
          </Dropdown>
        ) : (
          <Button type="primary" onClick={() => navigate(ROUTES.LOGIN)}>
            Login
          </Button>
        )}
      </Space>
    </S.HeaderWrapper>
  );
}

export default AdminHeader;
