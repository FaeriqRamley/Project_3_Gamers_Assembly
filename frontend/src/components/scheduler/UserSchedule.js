import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import TimeslotModal from "./TimeslotModal";
import AddTimeslotModal from "./AddTimeslotModal";

// function renderEventContent(eventInfo) {
//   return (
//     <i>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </i>
//   );
// }

function UserSchedule(props) {
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [fetchedTimeslots, setFetchedTimeslot] = useState([]);
  const [timeslotDisplay, setTimeslotDisplay] = useState([]);
  const [timeslotDetails, setTimeslotDetails] = useState(null);
  const [rightSide, setRightSide] = useState("myCustomButton timeGridWeek");

  useEffect(() => {
    setFetchedTimeslot(props.data.schedule.timeslots);
  }, [props.data]);

  useEffect(() => {
    const temp = [];
    for (const timeslot of fetchedTimeslots) {
      const actualStart = new Date(timeslot.timeStart);
      const actualEnd = new Date(timeslot.timeEnd);
      const newObj = {
        title: timeslot.eventTitle,
        start: timeslot.timeStart,
        end: timeslot.timeEnd,
        borderColor: "rgba(0,0,0,0)",
        extendedProps: {
          attendees: timeslot.attendees,
          actualStart: actualStart,
          actualEnd: actualEnd,
          timeslotId: timeslot._id,
        },
      };
      if (timeslot.isOpen) {
        newObj["backgroundColor"] = "#8FBCBB";
      } else {
        newObj["backgroundColor"] = "#2E3440";
      }
      temp.push(newObj);
    }

    setTimeslotDisplay(temp);
  }, [fetchedTimeslots]);

  const onClickShowTimeslotDetails = (arg) => {
    console.log("argEvent here");
    console.log(arg.event._def);
    setTimeslotDetails(arg.event._def);
    setVisibleDetails(true);
  };

  const onClickShowAddTimeslot = () => {
    setVisibleAdd(true);
  };

  useEffect(() => {
    if (props.data._id === props.user.user._id) {
      setRightSide("myCustomButton timeGridWeek");
    } else {
      setRightSide("timeGridWeek");
    }
  }, [props]);

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        timeZone="local"
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: rightSide,
        }}
        eventClick={onClickShowTimeslotDetails}
        events={timeslotDisplay}
        customButtons={{
          myCustomButton: {
            text: "Add Timeslot",
            click: onClickShowAddTimeslot,
          },
        }}
      />
      <TimeslotModal
        data={timeslotDetails}
        visible={visibleDetails}
        setVisible={setVisibleDetails}
      />
      <AddTimeslotModal
        visible={visibleAdd}
        setVisible={setVisibleAdd}
        userData={props.data}
      />
    </div>
  );
}

export default UserSchedule;
