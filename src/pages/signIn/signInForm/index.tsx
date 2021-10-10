import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { Form, Input, Checkbox, Button, message } from "antd";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { Dispatch } from "store";
import { useSelector } from "store/hooks";
import { signIn } from "store/user/slice";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export function SignInForm() {
  const history = useHistory();

  const dispatch = useDispatch<Dispatch>();
  const { loading, error, token } = useSelector((state) => state.user);

  useEffect(() => {
    if (token != null) {
      history.push("/");
    }
  }, [token, history]);

  useEffect(() => {
    if (error != null) {
      message.error("登录失败");
    }
  }, [error]);

  const onFinish = async (values: any) => {
    dispatch(signIn({ email: values.username, password: values.password }));
  };
  const onFinishFailed = (error: any) => {
    console.log(error);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={styles["register-form"]}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
