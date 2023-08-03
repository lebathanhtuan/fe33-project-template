import { useEffect, useMemo } from "react";
import {
  Card,
  Row,
  Col,
  Checkbox,
  Select,
  Button,
  Segmented,
  Space,
  Breadcrumb,
  Rate,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, generatePath, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  BarsOutlined,
  HomeOutlined,
  HeartOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import qs from "qs";

import T from "components/Typography";
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
      const averageRate = item.reviews.length
        ? (
            item.reviews.reduce((total, item) => total + item.rate, 0) /
            item.reviews.length
          ).toFixed(1)
        : 0;
      return (
        <Col key={item.id} lg={6} md={6} sm={8} xs={12}>
          <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}>
            <Card
              hoverable
              size="small"
              bordered={false}
              cover={
                <img
                  alt="example"
                  src="https://dummyimage.com/800x1000/5f9ea0/fff"
                />
              }
              actions={[
                <Space>
                  <HeartOutlined key="favorite" />
                  <span>{item.favorites.length}</span>
                </Space>,
                <Space>
                  <CommentOutlined key="review" />
                  <span>{item.reviews.length}</span>
                </Space>,
              ]}
            >
              <T.Text size="xs">{item.category.name}</T.Text>
              <T.Title size="lg" truncateMultiLine={2} style={{ height: 54 }}>
                {item.name}
              </T.Title>
              <Rate
                value={averageRate}
                allowHalf
                disabled
                style={{ fontSize: 12 }}
              />
              <T.Text size="lg" style={{ color: "#006363" }}>
                {item.price.toLocaleString()} ₫
              </T.Text>
            </Card>
          </Link>
        </Col>
      );
    });
  }, [productList.data]);

  return (
    <S.ProductListWrapper>
      <Breadcrumb
        items={[
          {
            title: (
              <Link to={ROUTES.USER.HOME}>
                <Space>
                  <HomeOutlined />
                  <span>Trang chủ</span>
                </Space>
              </Link>
            ),
          },
          {
            title: "Danh sách sản phẩm",
          },
        ]}
      />
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
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
          <Card size="small" bordered={false}>
            <Row gutter={[16, 16]}>
              <Col md={16} xs={24}>
                <T.Text style={{ marginTop: 6 }}>
                  {`Hiển thị 1 - ${productList.data.length} của ${productList.meta.total} sản phẩm`}
                </T.Text>
              </Col>
              <Col md={8} xs={24} style={{ textAlign: "right" }}>
                <Space>
                  <Select
                    onChange={(value) => handleFilter("sort", value)}
                    value={filterParams.sort}
                    placeholder="Sắp xếp theo"
                    bordered={false}
                    style={{ width: 130 }}
                  >
                    <Select.Option value="name.asc">Tên A-Z</Select.Option>
                    <Select.Option value="name.desc">Tên Z-A</Select.Option>
                    <Select.Option value="price.asc">
                      Giá tăng dần
                    </Select.Option>
                    <Select.Option value="price.desc">
                      Giá giảm dần
                    </Select.Option>
                  </Select>
                  <Segmented
                    options={[
                      {
                        value: "card",
                        icon: <AppstoreOutlined />,
                      },
                      {
                        value: "list",
                        icon: <BarsOutlined />,
                      },
                    ]}
                  />
                </Space>
              </Col>
            </Row>
          </Card>
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            {renderProductList}
          </Row>
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
