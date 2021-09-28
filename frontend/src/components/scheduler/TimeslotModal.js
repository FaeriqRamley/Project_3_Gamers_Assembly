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
            title="Title"
            visible={props.visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <p>{modalText}</p>
        </Modal>
    </>
  );
};

export default TimeslotModal;