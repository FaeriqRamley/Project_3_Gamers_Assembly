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
        setTimeslotDisplay([
            {
                title: 'Event Title1',
                start: '2021-09-27T13:13:55.008',
                end: '2021-09-27T15:13:55.008',
            },
            {
                title: 'Event Title2',
                start: '2015-03-17T13:13:55-0400',
                end: '2015-03-19T13:13:55-0400'
            }
        ])
    }, [])

    useEffect(() => {
        const fetchInterval = setInterval(async()=>{
            console.log("here");
            const timeslotRes = await fetch(`/api/timeslot/61513f1b1906a9aa06782d5b`);
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
                eventClick={showModal}
                events={timeslotDisplay}
            />
            <TimeslotModal visible={visible} setVisible={setVisible}/>
        </div>
    )
}

export default UserSchedule;

