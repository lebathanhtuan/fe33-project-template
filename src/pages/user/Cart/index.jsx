import { Table, Button, InputNumber, Row, Col, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "constants/routes";
import { updateCartRequest, deleteCartRequest } from "redux/slicers/cart.slice";

import * as S from "./styles";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartList } = useSelector((state) => state.cart);

  const totalPrice = cartList.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChangeQuantity = (productId, value) => {
    dispatch(
      updateCartRequest({
        productId: productId,
        value: value,
      })
    );
  };

  const handleDeleteCartItem = (productId) => {
    dispatch(deleteCartRequest({ productId: productId }));
  };

  const tableColumn = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (_, item) => {
        return `${item.price.toLocaleString()} VNĐ`;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, item) => (
        <InputNumber
          value={item.quantity}
          min={1}
          onChange={(value) => handleChangeQuantity(item.productId, value)}
        />
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (_, item) =>
        `${(item.price * item.quantity).toLocaleString()} VNĐ`,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, item) => (
        <Button danger onClick={() => handleDeleteCartItem(item.productId)}>
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <S.CartListWrapper>
      <h2 style={{ marginBottom: 24 }}>Giỏ hàng</h2>
      <Card size="small">
        <Table
          columns={tableColumn}
          dataSource={cartList}
          rowKey="id"
          pagination={false}
        />
      </Card>
      <Row justify="end" style={{ margin: "24px 0" }}>
        <Col span={8}>
          <Card size="small" title="Tổng tiền">
            {totalPrice.toLocaleString()} VND
          </Card>
        </Col>
      </Row>
      <Row justify="end">
        <Button
          type="primary"
          disabled={cartList.length === 0}
          onClick={() => navigate(ROUTES.USER.CHECKOUT)}
        >
          Tiếp theo
        </Button>
      </Row>
    </S.CartListWrapper>
  );
}

export default CartPage;
