import { useState, useEffect, useMemo } from "react";
import { Card, Row, Col, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { PRODUCT_LIMIT } from "constants/paging";
import { getProductListRequest } from "redux/slicers/product.slice";
import { getCategoryListRequest } from "redux/slicers/category.slice";

import * as S from "./styles";

function ProductListPage() {
  const [categoryId, setCategoryId] = useState([]);
  console.log(
    "🚀 ~ file: index.jsx:13 ~ ProductListPage ~ categoryId:",
    categoryId
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

  const handleFilterCategory = (values) => {
    setCategoryId(values);
    dispatch(
      getProductListRequest({
        page: 1,
        limit: PRODUCT_LIMIT,
        categoryId: values,
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
          <Card title={item.name} size="small">
            <p>{item.price.toLocaleString()} VND</p>
          </Card>
        </Col>
      );
    });
  }, [productList.data]);

  return (
    <S.ProductListWrapper>
      <Row gutter={[16, 16]}>
        <Col lg={6} xs={24}>
          <Card title="Filter" size="small">
            <Checkbox.Group onChange={(values) => handleFilterCategory(values)}>
              <Row>{renderCategoryList}</Row>
            </Checkbox.Group>
          </Card>
        </Col>
        <Col lg={18} xs={24}>
          <Row gutter={[16, 16]}>{renderProductList}</Row>
        </Col>
      </Row>
    </S.ProductListWrapper>
  );
}

export default ProductListPage;
