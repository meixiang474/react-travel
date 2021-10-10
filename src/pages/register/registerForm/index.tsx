import React from "react";
import styles from "./index.module.scss";
import { Form, Input, Checkbox, Button, message } from "antd";
import { registerAPI } from "api";
import { useHistory } from "react-router";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export function RegisterForm() {
  const history = useHistory();

  const onFinish = async (values: any) => {
    try {
      await registerAPI({
        email: values.username,
        password: values.password,
        confirmPassword: values.confirm,
      });
      history.push("/signIn");
    } catch (e) {
      message.error("注册失败");
    }
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

      <Form.Item
        label="Confirm Password"
        name="confirm"
        hasFeedback
        rules={[
          { required: true, message: "Please input your confirm password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("密码确认不一致！");
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
