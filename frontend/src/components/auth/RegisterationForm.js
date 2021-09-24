import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Button,
} from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import Post from "../hooks/Post";

export default function RegistrationForm() {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log("Received values of form: ", values);
        Post("/signup", values).then(data => {
            console.log(data);
        })
    };

    return (
        <div className="form-container">
            <Card title="Sign up" style={{ width: 400 }}>
                <Form
                    layout="vertical"
                    // wrapperCol={
                    //     { xs: { span: 24 }, sm: { span: 4, offset: 10 } }
                    // }
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your username!",
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"/>
                    </Form.Item>
                    <Form.Item
                        name="email"
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
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
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
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
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
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password"/>
                    </Form.Item>
                    <Form.Item
                        // wrapperCol={{ 
                        //     xs: { span: 24, offset: 0 },
                        //     sm: { span: 4, offset: 10 } 
                        // }}
                    >
                        <Button block="true" type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form> 
            </Card>
        </div>
    );
};
