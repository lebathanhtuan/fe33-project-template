import { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { getOrderListRequest } from "redux/slicers/order.slice";

const OrderHistories = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { orderList } = useSelector((state) => state.order);

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(getOrderListRequest({ userId: userInfo.data.id }));
    }
  }, [userInfo.data.id]);

  const tableColumns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (orderDetails) => `${orderDetails.length} products`,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `${totalPrice.toLocaleString()} VND`,
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Địa chỉ giao hàng",
      dataIndex: "address",
      key: "address",
      render: (_, item) =>
        `${item.address}, ${item.wardName}, ${item.districtName}, ${item.cityName}`,
    },
  ];

  return (
    <Table
      columns={tableColumns}
      dataSource={orderList.data}
      rowKey="id"
      pagination={false}
      expandable={{
        expandedRowRender: (record) => (
          <ul>
            {record.orderDetails.map((item) => (
              <li key={item.id}>
                {item.name}
                {` - ${item.price}`}
                {` - ${item.quantity}`}
                {` - ${item.price * item.quantity}`}
              </li>
            ))}
          </ul>
        ),
      }}
    />
  );
};

export default OrderHistories;
