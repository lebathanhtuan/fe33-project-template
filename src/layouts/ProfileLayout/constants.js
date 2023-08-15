import {
  IdcardOutlined,
  ShoppingOutlined,
  HeartOutlined,
  LockOutlined,
} from "@ant-design/icons";

export const PROFILE_MENU = [
  {
    label: "Thông tin cá nhân",
    path: "/profile/user-info",
    icon: <IdcardOutlined />,
  },
  {
    label: "Lịch sử mua hàng",
    path: "/profile/order-history",
    icon: <ShoppingOutlined />,
  },
  {
    label: "Sản phẩm yêu thích",
    path: "/profile/favorite-products",
    icon: <HeartOutlined />,
  },
  {
    label: "Đổi mật khẩu",
    path: "/profile/change-password",
    icon: <LockOutlined />,
  },
];
