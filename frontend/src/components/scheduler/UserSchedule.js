import React,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import CallApi from '../hooks/CallApi';
import { Modal, Button } from 'antd';
import TimeslotModal from './TimeslotModal';

function renderEventContent(eventInfo) {
  return (
    <i>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </i>
  )
}

function UserSchedule(props) {
    const [visible,setVisible] = useState(false);
    const [fetchedTimeslots,setFetchedTimeslot] = useState([]);
    const [timeslotDisplay,setTimeslotDisplay] = useState([]);

    useEffect(() => {
        const fetchInterval = setInterval(async()=>{
            const timeslotRes = await fetch(`/api/timeslot/byOwnerId/${props.data._id}`);
            const timeslotList = await timeslotRes.json();
            setFetchedTimeslot(timeslotList);
        },4000)
        return () => clearInterval(fetchInterval);

    },[])

    useEffect(() => {
        const temp = [];
        for ( const timeslot of fetchedTimeslots){
            console.log(timeslot);
            temp.push({
                title:"Game title here",
                start: timeslot.timeStart,
                end: timeslot.timeEnd
            })
        }

        console.log(temp);
        setTimeslotDisplay(temp);
    }, [fetchedTimeslots])
    
    const showModal = (arg) => {
        
        setVisible(true);
    }
    
    return (
        <div className="calendar-container">
            <FullCalendar
                plugins={[ timeGridPlugin,interactionPlugin ]}
                timeZone= 'UTC'
                initialView= 'timeGridWeek'
                headerToolbar= {{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay'
                }}
                eventClick={showModal}
                events={timeslotDisplay}
            />
            <TimeslotModal visible={visible} setVisible={setVisible}/>
        </div>
    )
}

export default UserSchedule;

