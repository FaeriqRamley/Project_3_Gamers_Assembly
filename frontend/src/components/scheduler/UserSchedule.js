import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function UserSchedule() {

    const handleDateClick = (arg) => {
        alert(arg.dateStr)
    }

    return (
        <div style={{width:"1000px",height:"600px"}}>
            <FullCalendar
                plugins={[ timeGridPlugin,interactionPlugin ]}
                timeZone= 'UTC'
                initialView= 'timeGridWeek'
                headerToolbar= {{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay'
                }}
                dateClick={handleDateClick}
                events={[
                    {
                      title: 'Event Title1',
                      start: '2021-09-27T13:13:55.008',
                      end: '2015-09-27T15:13:55.008'
                    },
                    {
                      title: 'Event Title2',
                      start: '2015-03-17T13:13:55-0400',
                      end: '2015-03-19T13:13:55-0400'
                    }
                  ]}
            />
        </div>
    )
}

export default UserSchedule;

