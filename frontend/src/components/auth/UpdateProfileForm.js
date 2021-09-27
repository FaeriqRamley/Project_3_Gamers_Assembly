import { useState } from "react";
import { Card, Form, Input, Button, Modal, Select } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { updateProfile, userAuth } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom"
import countries from "../../lib/countries";

function UpdateProfileForm(props) {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { user, authError } = props.auth;
    const { Option } = Select;
    const history = useHistory();

    const success = () => {
        Modal.success({
            content: 'Profile successfully updated!',
            onOk() {
                history.push(`/profile/${user.user._id}`)
            }
        });
    }

    const onFinish = async (values) => {
        setLoading(true);
        props.updateProfile(values).then(() => {
            setTimeout(() => {
                if (!authError) {
                    props.userAuth();
                    success();
                }
                setLoading(false)
            }, 1000);
        });
    };

    return (
        <div className="form-container">
            <Card title="Update Profile" style={{ width: 400 }}>
                <Form
                    layout="vertical"
                    form={form}
                    name="editProfile"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="userName"
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
                        name="firstName"
                    >
                        <Input
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="First name"
                        />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                    >
                        <Input
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="Last name"
                        />
                    </Form.Item>
                    <Form.Item
                        name="location"
                    >
                        <Select placeholder="Location">
                            {countries.map(el => { 
                                return ( 
                                    <>
                                        <Option value={el}>
                                            {el}
                                        </Option>
                                    </>
                                    )
                                }
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="bio"
                        rules={[
                            {
                                max: 150,
                                message: "maximum 150 characters",
                            },
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Introduce yourself!"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            block="true" 
                            type="primary" 
                            htmlType="submit"
                            loading={loading}
                        >
                            Update Profile
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (creds) => dispatch(updateProfile(creds)),
        userAuth: () => dispatch(userAuth())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileForm);