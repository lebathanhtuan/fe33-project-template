import { useEffect, useMemo } from "react";
import { Link, generatePath } from "react-router-dom";
import { Card, Row, Col, Spin, Space, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

import T from "components/Typography";
import { ROUTES } from "constants/routes";
import { FAVORITE_LIMIT } from "constants/paging";
import {
  getFavoriteListRequest,
  unFavoriteProductRequest,
} from "redux/slicers/favorite.slice";

function FavoriteProducts() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { favoriteList } = useSelector((state) => state.favorite);

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(
        getFavoriteListRequest({
          userId: userInfo.data.id,
          page: 1,
          limit: FAVORITE_LIMIT,
        })
      );
    }
  }, [userInfo.data.id]);

  const handleUnFavoriteProduct = (id) => {
    dispatch(
      unFavoriteProductRequest({
        id: id,
        userId: userInfo.data.id,
      })
    );
  };

  const handleChangePage = (page) => {
    dispatch(
      getFavoriteListRequest({
        userId: userInfo.data.id,
        page: page,
        limit: FAVORITE_LIMIT,
      })
    );
  };

  const renderFavoriteList = useMemo(() => {
    return favoriteList.data.map((item) => {
      return (
        <Col key={item.id} lg={6} md={6} sm={8} xs={12}>
          <Card
            size="small"
            cover={
              <img
                alt="example"
                src="https://dummyimage.com/800x600/5f9ea0/fff"
              />
            }
            actions={[
              <Space onClick={() => handleUnFavoriteProduct(item.id)}>
                <DeleteOutlined />
                <span>Xóa</span>
              </Space>,
            ]}
          >
            <Link
              to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                id: item.product.id,
              })}
            >
              <T.Title size="lg" truncateMultiLine={2} style={{ height: 48 }}>
                {item.product.name}
              </T.Title>
            </Link>
            <T.Text size="lg" style={{ color: "#006363" }}>
              {item.product.price.toLocaleString()} ₫
            </T.Text>
          </Card>
        </Col>
      );
    });
  }, [favoriteList.data]);

  return (
    <Spin spinning={favoriteList.loading}>
      <Row gutter={[16, 16]}>{renderFavoriteList}</Row>
      <Row justify="center" style={{ marginTop: 16 }}>
        <Pagination
          total={favoriteList.meta.total}
          pageSize={FAVORITE_LIMIT}
          current={favoriteList.meta.page}
          onChange={(page) => handleChangePage(page)}
        />
      </Row>
    </Spin>
  );
}

export default FavoriteProducts;
