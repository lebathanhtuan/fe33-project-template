import { useEffect, useMemo } from "react";
import { Link, generatePath } from "react-router-dom";
import { Card, Row, Col, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { ROUTES } from "constants/routes";
import { getFavoriteListRequest } from "redux/slicers/favorite.slice";

function FavoriteProducts() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { favoriteList } = useSelector((state) => state.favorite);

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(
        getFavoriteListRequest({
          userId: userInfo.data.id,
        })
      );
    }
  }, [userInfo.data.id]);

  const renderProductList = useMemo(() => {
    return favoriteList.data.map((item) => {
      return (
        <Col key={item.id} xs={12} xl={8}>
          <Link
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
              id: item.product.id,
            })}
          >
            <Card title={item.product.name} size="small">
              <p>{item.product.price.toLocaleString()} VND</p>
            </Card>
          </Link>
        </Col>
      );
    });
  }, [favoriteList.data]);

  return (
    <Spin spinning={favoriteList.loading}>
      <Row gutter={[16, 16]}>{renderProductList}</Row>
    </Spin>
  );
}

export default FavoriteProducts;
