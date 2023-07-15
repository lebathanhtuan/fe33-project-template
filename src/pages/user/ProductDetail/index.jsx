import { useEffect, useMemo, useState } from "react";
import { useParams, Link, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Space,
  Breadcrumb,
  Card,
  Button,
  Radio,
  InputNumber,
  Form,
  Input,
  Rate,
  notification,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";

import { getProductDetailRequest } from "redux/slicers/product.slice";
import { ROUTES } from "constants/routes";

import * as S from "./styles";

const ProductDetailPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { productDetail } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductDetailRequest({ id: parseInt(id) }));
  }, []);

  return (
    <S.Wrapper>
      {/* Breadcrumb */}
      <Card size="small" bordered={false}>
        <Row gutter={[16, 16]}>
          <Col md={10} sm={24}>
            <img
              src="https://placehold.co/600x400"
              alt=""
              width="100%"
              height="auto"
            />
          </Col>
          <Col md={14} sm={24}>
            <h1>{productDetail.data.name}</h1>
            <h3>{productDetail.data.category?.name}</h3>
            <h2>{productDetail.data.price?.toLocaleString()} VND</h2>
            <Button size="large" type="primary" icon={<ShoppingCartOutlined />}>
              Add to cart
            </Button>
          </Col>
        </Row>
      </Card>
    </S.Wrapper>
  );
};

export default ProductDetailPage;
