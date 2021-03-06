import { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { signUp } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function Registration(props) {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoading(true);
        props.signUp(values).then(() => {
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        });
    };

    const { loggedUser, authError } = props.auth;
    if (loggedUser) return <Redirect to="/dashboard" />;

    return (
        <>
            <Form
                layout="vertical"
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="userName"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your username!",
                        },
                        {
                            min: 3,
                            message: "minimum 3 characters required",
                        },
                        {
                            max: 15,
                            message: "maximum 15 characters",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                    />
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
                        {
                            min: 6,
                            message: "minimum 6 characters required",
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
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(
                                    new Error("Passwords do not match!")
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        placeholder="Confirm Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button 
                        block="true" 
                        type="primary" 
                        htmlType="submit"
                        loading={loading}
                    >
                        Register
                    </Button>
                </Form.Item>
                {authError ? (
                    <div className="error-message">{authError}</div>
                ) : null}
            </Form>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(signUp(creds)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);