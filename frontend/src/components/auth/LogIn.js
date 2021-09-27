import { useState } from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { logIn } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function LogIn(props) {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoading(true);
        props.logIn(values).then(() => {
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        });
    };

    const { user, authError } = props.auth;
    if (user) return <Redirect to="/dashboard" />;

    return (
        <>
            <Form
                layout="vertical"
                form={form}
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
                    <Button 
                        block="true" 
                        type="primary" 
                        htmlType="submit"
                        loading={loading}
                    >
                        Log in
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
        logIn: (creds) => dispatch(logIn(creds)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
