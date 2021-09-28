import { Modal,DatePicker,TimePicker,Form,Input} from 'antd';
import React,{useState} from 'react';
import moment from 'moment';
import CallApi from '../hooks/CallApi';
import convertTime from '../hooks/ConvertTime';

const AddTimeslotModal = (props) => {
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');
    const [form] = Form.useForm();
    const today = moment(Date.now());

    const onCreate = async (values) => {
        try{
            const {timeStart,timeEnd,duration} = convertTime(values)
            const input = {
                ownerId: props.userData._id,
                eventTitle: values.eventTitle,
                timeStart,
                timeEnd,
                duration
            }
            const res = await CallApi('/api/timeslot/',"POST",input);
            console.log(res);
        } catch(err){
            console.error(err.message);
        }
        props.setVisible(false);
    };

    return (
        <>
            <Modal
                visible={props.visible}
                title="Create a new collection"
                okText="Create"
                cancelText="Cancel"
                onCancel={()=>props.setVisible(false)}
                onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                    form.resetFields();
                    onCreate(values);
                    })
                    .catch((info) => {
                    console.log('Validate Failed:', info);
                    });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        timeStart: today
                    }}
                >
                    <Form.Item
                        name="eventTitle"
                        label="Timeslot Name"
                        rules={[
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="dateStart" label="Select Date">
                    <DatePicker/>
                    </Form.Item>
                    <Form.Item name="duration" label="Select Time">
                        <TimePicker.RangePicker showSecond={false}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
  );
};

export default AddTimeslotModal;