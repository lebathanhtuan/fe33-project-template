import { Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

import * as S from "./styles";

const LoginPage = () => {
  return (
    <S.LoginContainer>
      <S.LoginForm>
        <Form
          name="loginForm"
          layout="vertical"
          onFinish={(values) => console.log(values)}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <div style={{ marginBottom: 16 }}>
            Bạn chưa có tài khoản? <Link to={ROUTES.REGISTER}>Đăng ký</Link>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            block
            // loading={loginData.loading}
          >
            Đăng nhập
          </Button>
        </Form>
      </S.LoginForm>
    </S.LoginContainer>
  );
};

export default LoginPage;
