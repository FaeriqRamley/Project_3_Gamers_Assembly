import { Modal, Button } from 'antd';
import React,{useState} from 'react';
import {useSelector} from 'react-redux';
import CallApi from '../hooks/CallApi';
const TimeslotModal = (props) => {
  const auth = useSelector(state => state.auth);

  const handleCancel = () => {
    console.log('Clicked cancel button');
    props.setVisible(false);
  };

  const success = () => {
    Modal.success({
        content: 'Invite sent!',
        onOk() {
            console.log('close success modal')
        }
    });
  }

  const warning = () => {
    Modal.warning({
      title: "You're already attending :)",
    });
  }

  const error = () => {
    Modal.error({
      title: "Invitation Error",
      content: "Something went wrong with send your invite"
    });
  }

  const onClickSendInvite = async () => {
    const userIsAttending = props.data.extendedProps.attendees.find(attendee => attendee._id === auth.loggedUser.user._id);
    if (!userIsAttending){
      try {
        await CallApi("/api/schedule/createInvite","POST",{
          inviteType: "Timeslot Invite",
          senderId: auth.loggedUser.user._id,
          receiverId: props.data.extendedProps.attendees[0]._id,
          timeslotId: props.data.extendedProps.timeslotId
        })
        success();
      } catch (err) {
          console.log(err)
      }
    } else {
      warning();
    }
    

  }
  return (
    <>
        <Modal
            title={props.data ? props.data.title:"Loading..."}
            visible={props.visible}
            onCancel={handleCancel}
            footer={[
              <Button onClick={onClickSendInvite} key={2} type="primary" shape="round">Invite</Button>
            ]}
        >
          {props.data ? <>
            <h5>Date:</h5>
            <h6>{props.data.extendedProps.actualStart.getDay()}/{props.data.extendedProps.actualStart.getMonth()}/{props.data.extendedProps.actualStart.getYear()}</h6>
            <h5>Timeslot Owner</h5>
            <h6>{props.data.extendedProps.attendees[0].userName}</h6>
            <h5>Attendees</h5>
            {props.data.extendedProps.attendees.map((data,index)=>{
              return <h6 key={index}>{data.userName}</h6>
            })}
          </>: <p>Loading info...</p>}
        </Modal>
    </>
  );
};

export default TimeslotModal;