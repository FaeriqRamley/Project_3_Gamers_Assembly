import React from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { logIn } from "../../store/actions/authActions";
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

function LogIn(props) {
    // const [form] = Form.useForm();

    const onFinish = async (values) => {
        props.logIn(values)
    }

    const { auth } = props
    if (auth.user) return <Redirect to="/dashboard" />

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

const mapStateToProps = (state) => {
    return {
      auth: state.auth
    }
  }
  
  const mapDispatchToProps = (dispatch)=> {
    return {
      logIn: (creds) => dispatch(logIn(creds))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(LogIn);