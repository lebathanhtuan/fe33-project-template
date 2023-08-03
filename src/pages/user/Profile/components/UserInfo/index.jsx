import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, DatePicker } from "antd";

import { changePasswordRequest } from "redux/slicers/auth.slice";

function UserInfo() {
  const [updateUserInfoForm] = Form.useForm();

  const { userInfo, changePasswordData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (changePasswordData.error) {
      updateUserInfoForm.setFields([
        {
          name: "password",
          errors: ["Password is incorrect!"],
        },
      ]);
    }
  }, [changePasswordData.error]);

  const handleUpdateUserInfo = (values) => {
    dispatch(
      changePasswordRequest({
        id: userInfo.data.id,
        data: {
          email: userInfo.data.email,
          password: values.password,
          newPassword: values.newPassword,
        },
        callback: () => updateUserInfoForm.resetFields(),
      })
    );
  };

  return (
    <Form
      form={updateUserInfoForm}
      name="updateUserInfoForm"
      layout="vertical"
      onFinish={(values) => handleUpdateUserInfo(values)}
      autoComplete="off"
    >
      <Form.Item
        label="Họ và tên"
        name="fullName"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Số điện thoại"
        name="phoneNumber"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Ngày sinh"
        name="birthday"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        block
        loading={changePasswordData.load}
      >
        Submit
      </Button>
    </Form>
  );
}

export default UserInfo;
