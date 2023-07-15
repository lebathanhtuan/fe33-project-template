import { useState, useEffect, useMemo } from "react";
import { Card, Row, Col, Checkbox, Input, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, generatePath } from "react-router-dom";

import { PRODUCT_LIMIT } from "constants/paging";
import { getProductListRequest } from "redux/slicers/product.slice";
import { getCategoryListRequest } from "redux/slicers/category.slice";

import * as S from "./styles";
import { ROUTES } from "constants/routes";

function ProductListPage() {
  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    keyword: "",
    order: "",
  });
  console.log(
    "🚀 ~ file: index.jsx:18 ~ ProductListPage ~ filterParams:",
    filterParams
  );
  const dispatch = useDispatch();

  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(
      getProductListRequest({
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
    dispatch(getCategoryListRequest());
  }, []);

  const handleFilter = (key, values) => {
    setFilterParams({
      ...filterParams,
      [key]: values,
    });
    dispatch(
      getProductListRequest({
        ...filterParams,
        [key]: values,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
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
            <Card title={item.name} size="small">
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
          <Card title="Filter" size="small">
            <Checkbox.Group
              onChange={(values) => handleFilter("categoryId", values)}
            >
              <Row>{renderCategoryList}</Row>
            </Checkbox.Group>
          </Card>
        </Col>
        <Col lg={18} xs={24}>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col md={16} xs={24}>
              <Input
                onChange={(e) => handleFilter("keyword", e.target.value)}
              />
            </Col>
            <Col md={8} xs={24}>
              <Select
                onChange={(value) => handleFilter("sort", value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="name.asc">A-Z</Select.Option>
                <Select.Option value="name.desc">Z-A</Select.Option>
                <Select.Option value="price.asc">Giá tăng dần</Select.Option>
                <Select.Option value="price.desc">Giá giảm dần</Select.Option>
              </Select>
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
