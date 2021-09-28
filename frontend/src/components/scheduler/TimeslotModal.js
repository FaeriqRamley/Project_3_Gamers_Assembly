import { Modal, Button } from 'antd';
import React,{useState} from 'react';
const TimeslotModal = (props) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState(JSON.stringify(props.data));

  const handleOk = () => {
    setModalText(JSON.stringify(props.data));
    setConfirmLoading(true);
    setTimeout(() => {
      props.setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    props.setVisible(false);
  };

  return (
    <>
        <Modal
            title={props.data.title}
            visible={props.visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[
              <Button key={1}>Invite</Button>,
              <Button key={2}>Edit Slot</Button>
            ]}
        >
          {JSON.stringify(props.data)}
        </Modal>
    </>
  );
};

export default TimeslotModal;