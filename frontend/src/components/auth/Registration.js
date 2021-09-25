import { Form, Input, Button } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { signUp } from "../../store/actions/authActions";
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

function Registration(props) {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        props.signUp(values);
    };
    
    const { auth } = props
    if (auth.user) return <Redirect to="/" />
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
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your username!",
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
                    <Button block="true" type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
      auth: state.auth
    }
  }
  
  const mapDispatchToProps = (dispatch)=> {
    return {
      signUp: (creds) => dispatch(signUp(creds))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Registration);