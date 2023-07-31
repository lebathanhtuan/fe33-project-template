import { useMemo, useEffect, useState } from "react";
import { Space, Button, Dropdown, Badge, Input } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartOutlined, SearchOutlined } from "@ant-design/icons";
import qs from "qs";

import { ROUTES } from "constants/routes";
import { PRODUCT_LIMIT } from "constants/paging";
import { logoutRequest } from "redux/slicers/auth.slice";
import { getProductListRequest } from "redux/slicers/product.slice";
import { getCategoryListRequest } from "redux/slicers/category.slice";
import { setFilterParams } from "redux/slicers/common.slice";

import * as S from "./styles";

function Header() {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { categoryList } = useSelector((state) => state.category);
  const { cartList } = useSelector((state) => state.cart);
  const { filterParams } = useSelector((state) => state.common);

  useEffect(() => {
    dispatch(getCategoryListRequest());
  }, []);

  useEffect(() => {
    setKeyword(filterParams.keyword);
  }, [filterParams.keyword]);

  const handleSearchKeyword = (e) => {
    if (e.key === "Enter") {
      const newFilterParams = {
        ...filterParams,
        keyword: e.target.value,
      };
      dispatch(setFilterParams(newFilterParams));
      dispatch(
        getProductListRequest({
          ...newFilterParams,
          page: 1,
          limit: PRODUCT_LIMIT,
        })
      );
      navigate({
        pathname: ROUTES.USER.PRODUCT_LIST,
        search: qs.stringify(newFilterParams),
      });
    }
  };

  const renderNavLink = useMemo(() => {
    return categoryList.data.map((item) => {
      const newFilterParams = {
        ...filterParams,
        categoryId: [item.id],
      };
      return (
        <S.NavLinkItem
          key={item.id}
          onClick={() => {
            dispatch(setFilterParams(newFilterParams));
            navigate({
              pathname: ROUTES.USER.PRODUCT_LIST,
              search: qs.stringify(newFilterParams),
            });
          }}
        >
          <h4>{item.name}</h4>
        </S.NavLinkItem>
      );
    });
  }, [categoryList.data, filterParams]);

  return (
    <S.HeaderWrapper>
      <S.HeaderTopWrapper>
        <h3>Logo</h3>
        <S.SearchContainer>
          <Input
            size="large"
            placeholder="Tìm kiếm"
            allowClear
            prefix={<SearchOutlined />}
            onKeyDown={(e) => handleSearchKeyword(e)}
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            style={{ width: 400 }}
          />
        </S.SearchContainer>
        <Space size={24}>
          <Badge count={cartList.length}>
            <Link to={ROUTES.USER.CART}>
              <Button type="text" icon={<ShoppingCartOutlined />}></Button>
            </Link>
          </Badge>
          {userInfo.data.id ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 1,
                    label: "Thông tin cá nhân",
                    onClick: () => navigate(ROUTES.USER.PROFILE),
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
      </S.HeaderTopWrapper>
      <S.HeaderBottomWrapper>
        <S.NavLinkContainer>{renderNavLink}</S.NavLinkContainer>
      </S.HeaderBottomWrapper>
    </S.HeaderWrapper>
  );
}

export default Header;
