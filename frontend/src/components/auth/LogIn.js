import React from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Post from "../hooks/Post"

export default function LogIn() {
    // const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log("Received values of form: ", values);
        Post("/login", values).then((data) => {
            console.log(data);
        });
    }

    return (
        <>
            <Form
                layout="vertical"
                // form={form}
                name="login"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your E-mail!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <MailOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button block="true" type="primary" htmlType="submit">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
