import { useEffect, useMemo } from "react";
import { Card, Row, Col, Checkbox, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, generatePath, useNavigate } from "react-router-dom";
import qs from "qs";

import { PRODUCT_LIMIT } from "constants/paging";
import { getProductListRequest } from "redux/slicers/product.slice";
import { setFilterParams, clearFilterParams } from "redux/slicers/common.slice";

import * as S from "./styles";
import { ROUTES } from "constants/routes";

function ProductListPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);
  const { filterParams } = useSelector((state) => state.common);

  useEffect(() => {
    dispatch(
      getProductListRequest({
        ...filterParams,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );

    return () => dispatch(clearFilterParams());
  }, []);

  const handleFilter = (key, value) => {
    const newFilterParams = {
      ...filterParams,
      [key]: value,
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
  };

  const handleShowMore = () => {
    dispatch(
      getProductListRequest({
        ...filterParams,
        page: productList.meta.page + 1,
        limit: PRODUCT_LIMIT,
        more: true,
      })
    );
  };

  const renderCategoryList = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <Col key={item.id} span={24}>
          <Checkbox value={item.id}>{item.name}</Checkbox>
        </Col>
      );
    });
  }, [categoryList.data]);

  const renderProductList = useMemo(() => {
    return productList.data.map((item) => {
      return (
        <Col key={item.id} xs={12} xl={8}>
          <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}>
            <Card title={item.name} size="small" bordered={false}>
              <p>{item.reviews.length} đánh giá</p>
              <p>{item.price.toLocaleString()} VND</p>
            </Card>
          </Link>
        </Col>
      );
    });
  }, [productList.data]);

  return (
    <S.ProductListWrapper>
      <Row gutter={[16, 16]}>
        <Col lg={6} xs={24}>
          <Card title="Filter" size="small" bordered={false}>
            <Checkbox.Group
              onChange={(values) => handleFilter("categoryId", values)}
              value={filterParams.categoryId}
            >
              <Row>{renderCategoryList}</Row>
            </Checkbox.Group>
          </Card>
        </Col>
        <Col lg={18} xs={24}>
          <Row align="middle" gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col md={16} xs={24}>
              <p>Tìm thấy: {productList.meta.total} kết quả</p>
            </Col>
            <Col md={8} xs={24}>
              <Row align="middle">
                <p>Sắp xếp theo:</p>
                <Select
                  onChange={(value) => handleFilter("sort", value)}
                  value={filterParams.sort}
                  placeholder="Sắp xếp"
                  style={{ marginLeft: 8, flex: 1 }}
                >
                  <Select.Option value="name.asc">A-Z</Select.Option>
                  <Select.Option value="name.desc">Z-A</Select.Option>
                  <Select.Option value="price.asc">Giá tăng dần</Select.Option>
                  <Select.Option value="price.desc">Giá giảm dần</Select.Option>
                </Select>
              </Row>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>{renderProductList}</Row>
          {productList.data.length !== productList.meta.total && (
            <Row justify="center" style={{ marginTop: 16 }}>
              <Button onClick={() => handleShowMore()}>Hiểu thị thêm</Button>
            </Row>
          )}
        </Col>
      </Row>
    </S.ProductListWrapper>
  );
}

export default ProductListPage;
