import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { Form, Input, Checkbox, Button, message } from "antd";
import { useHistory, useLocation } from "react-router";
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
  const { state } = useLocation<{ from?: string } | undefined>();
  const dispatch = useDispatch<Dispatch>();
  const { loading, error, token } = useSelector((state) => state.user);

  useEffect(() => {
    if (token != null) {
      history.push(state?.from || "/");
    }
  }, [token, history, state?.from]);

  useEffect(() => {
    if (error != null) {
      message.error("登录失败");
    }
  }, [error]);

  const onFinish = async (values: any) => {
    // const { error } = (await dispatch(
    //   signIn({ email: values.username, password: values.password })
    // )) as any;
    // if (error == null) {
    //   history.push(state?.from || "/");
    //   return;
    // }
    // message.error("登录失败");

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
