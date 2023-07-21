import { useMemo } from "react";
import { Button, Table, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { updateCartRequest, deleteCartRequest } from "redux/slicers/cart.slice";

import * as S from "./styles";

function CartPage() {
  const dispatch = useDispatch();

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
    <div>
      <h2>Cart Page</h2>
      <Table columns={tableColumn} dataSource={cartList} pagination={false} />
      <h4>Tổng tiền: {`${totalPrice.toLocaleString()} VNĐ`}</h4>
    </div>
  );
}

export default CartPage;
