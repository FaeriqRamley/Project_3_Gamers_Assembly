import { Card, Form, Input, Button, Modal } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { changePassword } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom"

function ChangePasswordForm(props) {
    const history = useHistory();

    const success = () => {
        Modal.success({
            content: 'Password change success!',
            onOk() {
                history.push('/dashboard')
            }
        });
    }

    const [form] = Form.useForm();

    const onFinish = (values) => {
        props.changePassword(values)
            .then(() => {
                if (!authError) {
                    console.log('success');
                    return success();
                }
            })

    };

    const { authError } = props.auth;

    return (
        <div className="form-container">
            <Card title="Change Password" style={{ width: 400 }}>
                <Form
                    layout="vertical"
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: "Input your new password.",
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
                        name="confirmNewPasword"
                        dependencies={["newPassword"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your new password.",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("newPassword") === value
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
                            Change Password
                        </Button>
                    </Form.Item>
                    {authError ? (
                        <div className="error-message">{authError}</div>
                    ) : null}
                </Form>
            </Card>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (creds) => dispatch(changePassword(creds)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);
