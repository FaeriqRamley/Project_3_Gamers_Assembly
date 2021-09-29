import { Modal, Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import CallApi from "../hooks/CallApi";
const TimeslotModal = (props) => {
  const auth = useSelector((state) => state.auth);
  const daysArr = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const handleCancel = () => {
    console.log("Clicked cancel button");
    props.setVisible(false);
  };

  const success = (body) => {
    Modal.success({
      content: body,
      onOk() {
        console.log("close success modal");
      },
    });
  };

  const warning = (body) => {
    Modal.warning({
      title: body,
    });
  };

  const error = () => {
    Modal.error({
      title: "Error",
      content: "Something went wrong :(",
    });
  };

  const onClickSendInvite = async () => {
    const userIsAttending = props.data.extendedProps.attendees.find(
      (attendee) => attendee._id === auth.loggedUser.user._id
    );
    if (!userIsAttending) {
      try {
        await CallApi("/api/schedule/createInvite", "POST", {
          inviteType: "Timeslot Invite",
          senderId: auth.loggedUser.user._id,
          receiverId: props.data.extendedProps.attendees[0]._id,
          timeslotId: props.data.extendedProps.timeslotId,
        });
        success("Invite sent!");
      } catch (err) {
        error();
      }
    } else {
      warning("You're already attending :)");
    }
  };

  const onClickDeleteTimeslot = async () => {
    if(auth.loggedUser.user._id !== props.data.extendedProps.attendees[0]._id){
      warning("Only the owner can delete the timeslot")
    } else {
      try {
        await CallApi("/api/timeslot/v2","DELETE",{
          timeslotId: props.data.extendedProps.timeslotId
        })
        success("Successfully deleted timeslot!");
      } catch (err) {
        error();
      }
    }
  }


  return (
    <>
      <Modal
        title={props.data ? props.data.title : "Loading..."}
        visible={props.visible}
        onCancel={handleCancel}
        footer={[
          <Button
            onClick={onClickDeleteTimeslot}
            key={2}
            type="primary"
            style={{backgroundColor:"#BF616A"}}
          >
            Delete
          </Button>,
          <Button
            onClick={onClickSendInvite}
            key={2}
            type="primary"
            shape="round"
          >
            Invite
          </Button>,
        ]}
      >
        {props.data ? (
          <>
            <h5 style={{marginBottom:"2px"}}>Date</h5>
            <h6 style={{color:"#D08770"}}>
              {daysArr[props.data.extendedProps.actualStart.getDay()]} {props.data.extendedProps.actualStart.getDate()}/
              {props.data.extendedProps.actualStart.getMonth()+1}/
              {props.data.extendedProps.actualStart.getFullYear()}
            </h6>
            <h5 style={{marginBottom:"2px"}}>Time</h5>
            <h6 style={{color:"#D08770"}}>{props.data.extendedProps.actualStart.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})} - {props.data.extendedProps.actualEnd.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</h6>
            <h5 style={{marginBottom:"2px"}}>Timeslot Owner</h5>
            <h6 style={{color:"#D08770"}}>{props.data.extendedProps.attendees[0].userName}</h6>
            <h5 style={{marginBottom:"2px"}}>Attendees</h5>
            {props.data.extendedProps.attendees.map((data, index) => {
              return <h6 style={{color:"#D08770"}} key={index}>{data.userName}</h6>;
            })}
          </>
        ) : (
          <p>Loading info...</p>
        )}
      </Modal>
    </>
  );
};

export default TimeslotModal;
