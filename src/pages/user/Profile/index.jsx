import { Link, useNavigate } from "react-router-dom";
import { Button, Tabs, Card } from "antd";

import OrderHistories from "./components/OrderHistories";
import FavoriteProducts from "./components/FavoriteProducts";
import ChangePassword from "./components/ChangePassword";
import { ROUTES } from "../../../constants/routes";

import * as S from "./styles";

function Profile() {
  const navigate = useNavigate();

  return (
    <S.ProfileWrapper>
      <Card bordered={false} size="small">
        <Tabs
          tabPosition="left"
          items={[
            {
              label: "Thông tin cá nhân",
              key: 1,
              children: null,
            },
            {
              label: "Lịch sử mua hàng",
              key: 2,
              children: <OrderHistories />,
            },
            {
              label: "Sản phẩm yêu thích",
              key: 3,
              children: <FavoriteProducts />,
            },
            {
              label: "Đổi mật khẩu",
              key: 4,
              children: <ChangePassword />,
            },
          ]}
        />
      </Card>
    </S.ProfileWrapper>
  );
}

export default Profile;
