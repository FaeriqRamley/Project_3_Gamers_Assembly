import "antd/dist/antd.css";
import {
    Form,
    Input,
    Button,
} from "antd";
import Post from "../hooks/Post";

export default function RegistrationForm() {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log("Received values of form: ", values);
        Post("http://localhost:5000/signup", values).then(data => {
            console.log(data);
        })
    };

    return (
        <Form
            labelCol={
                { xs: { span: 24 }, sm: { span: 8, } }
            }
            wrapperCol={
                { xs: { span: 24 }, sm: { span: 16, } }
            }
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: "email",
                        message: "The input is not valid E-mail!",
                    },
                    {
                        required: true,
                        message: "Please input your E-mail!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                    {
                        min: 6,
                        message: "minimum 6 characters required",
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(
                                new Error(
                                    "Passwords do not match!"
                                )
                            );
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="Username"
                label="Username"
                tooltip="nickname"
                rules={[
                    {
                        required: true,
                        message: "Please input your nickname!",
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                wrapperCol={
                    { xs: { span: 24, offset: 0 } },
                    { sm: { span: 16, offset: 8 } }
                }
            >
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};
