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
import moment from "moment";

import { getProductDetailRequest } from "redux/slicers/product.slice";
import {
  createReviewRequest,
  getReviewListRequest,
} from "redux/slicers/review.slice";
import { ROUTES } from "constants/routes";

import * as S from "./styles";

const ProductDetailPage = () => {
  const [reviewForm] = Form.useForm();
  const { id } = useParams();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { productDetail } = useSelector((state) => state.product);
  const { reviewList } = useSelector((state) => state.review);

  const productRate =
    reviewList.data.reduce((total, item) => total + item.rate, 0) /
    reviewList.data.length;

  useEffect(() => {
    dispatch(getProductDetailRequest({ id: parseInt(id) }));
    dispatch(getReviewListRequest({ productId: parseInt(id) }));
  }, []);

  const renderReviewList = useMemo(() => {
    return reviewList.data.map((item) => {
      return (
        <div>
          <Space>
            <h3>{item.user.fullName}</h3>
            {/* <span>{moment(item.createdAt).format("DD/MM/YYYY HH:mm")}</span> */}
            <span>{moment(item.createdAt).fromNow()}</span>
          </Space>
          <div>
            <Rate value={item.rate} disabled style={{ fontSize: 12 }} />
          </div>
          <p>{item.comment}</p>
        </div>
      );
    });
  }, [reviewList.data]);

  const handleReviewProduct = (values) => {
    dispatch(
      createReviewRequest({
        data: {
          ...values,
          userId: userInfo.data.id,
          productId: productDetail.data.id,
        },
        callback: () => reviewForm.resetFields(),
      })
    );
  };

  return (
    <S.ProductDetailWrapper>
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
            <div>
              <Space align="baseline">
                <Rate value={productRate} allowHalf disabled />
                <span>{`(${productRate})`}</span>
              </Space>
            </div>
            <h3>{productDetail.data.category?.name}</h3>
            <h2>{productDetail.data.price?.toLocaleString()} VND</h2>
            <Button size="large" type="primary" icon={<ShoppingCartOutlined />}>
              Add to cart
            </Button>
          </Col>
        </Row>
      </Card>
      <Card
        size="small"
        title="Đánh giá"
        bordered={false}
        style={{ marginTop: 16 }}
      >
        {userInfo.data.id && (
          <S.ReviewFormWrapper>
            <Form
              form={reviewForm}
              name="loginForm"
              layout="vertical"
              initialValues={{
                rate: 0,
                comment: "",
              }}
              onFinish={(values) => handleReviewProduct(values)}
            >
              <Form.Item
                label="Đánh giá sao"
                name="rate"
                rules={[
                  { required: true, message: "Đánh giá sao là bắt buộc" },
                ]}
              >
                <Rate />
              </Form.Item>

              <Form.Item
                label="Nhận xét"
                name="comment"
                rules={[{ required: true, message: "Nhận xét là bắt buộc" }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                // loading={loginData.loading}
              >
                Gửi
              </Button>
            </Form>
          </S.ReviewFormWrapper>
        )}
        {renderReviewList}
      </Card>
    </S.ProductDetailWrapper>
  );
};

export default ProductDetailPage;
