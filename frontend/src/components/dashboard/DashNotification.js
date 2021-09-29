import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";
import NotificationCardReceived from "./NotificationCardReceived";
import NotificationCardResponded from "./NotificationCardResponded";

function NotificationFeed() {
  const auth = useSelector((state) => state.auth);
  const userInfo = auth.loggedUser.user;
  const [fetchedInvites, setFetchedInvites] = useState([]);
  const [invites, setInvites] = useState([]);
  const [notificationInfo, setNotificationInfo] = useState([]);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("AUTH:", userInfo);
    if (
      userInfo.schedule.receivedNotifications &&
      userInfo.schedule.sentNotifications
    ) {
      const allNotifs = [];
      const receivedNotifs = userInfo.schedule.receivedNotifications;
      const sentNotifs = userInfo.schedule.sentNotifications;
      console.log(receivedNotifs);
      console.log(sentNotifs);
      for (const notif of receivedNotifs) {
        allNotifs.push({ type: "received", item: notif });
      }
      for (const notif of sentNotifs) {
        if (notif.status !== "Pending") {
          allNotifs.push({ type: "responded", item: notif });
        }
      }
      console.log("AllNotifications:", allNotifs);
      setFetchedInvites(allNotifs);
    }
  }, [userInfo]);

  useEffect(() => {
    // if(fetchedInvites.length !== invites.length){
    //     console.log(fetchedInvites.length);
    //     console.log(invites.length);
    //     setInvites(fetchedInvites);
    // }
    setInvites(fetchedInvites);
  }, [fetchedInvites]);

  useEffect(() => {
    if (isMounted) {
      const tempArray = [];
      for (const notif of invites) {
        const { item } = notif;

        const newObj = {
          inviteId: item._id,
          inviteType: item.inviteType,
          notifType: notif.type,
          status: item.status,
          senderName: item.senderId.userName,
          senderId: item.senderId._id,
          receiverName: item.receiverId.userName,
        };

        if (item.inviteType === "Timeslot Invite") {
          newObj["timeslotInfo"] = item.timeslotId;
        }

        tempArray.push(newObj);
      }
      console.log("TempArr", tempArray);
      setNotificationInfo(tempArray);
    } else {
      setMounted(true);
    }
  }, [invites, isMounted]);

  return (
    <Row style={{ padding: "10px" }}>
      <Col span={24}>
        <h5 style={{ color: "#D8DEE9" }}>Notifications</h5>
      </Col>
      <Col span={24}>
        <Row justify="center" gutter={[0, 16]}>
          {notificationInfo.map((data, index) => {
            if (data.notifType === "received") {
              return <NotificationCardReceived key={index} data={data} />;
            } else {
              return <NotificationCardResponded key={index} data={data} />;
            }
          })}
        </Row>
      </Col>
    </Row>
  );
}

export default NotificationFeed;
