import React,{useState,useEffect} from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import TimeslotModal from './TimeslotModal';
import AddTimeslotModal from './AddTimeslotModal';

function renderEventContent(eventInfo) {
  return (
    <i>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </i>
  )
}

function UserSchedule(props) {
    const [visibleAdd,setVisibleAdd] = useState(false);
    const [visibleDetails,setVisibleDetails] = useState(false);
    const [fetchedTimeslots,setFetchedTimeslot] = useState([]);
    const [timeslotDisplay,setTimeslotDisplay] = useState([]);
    const [timeslotDetails,setTimeslotDetails] = useState([]);
    const [rightSide,setRightSide] = useState("myCustomButton timeGridWeek")

    useEffect(() => {
        const fetchInterval = setInterval(async()=>{
            // const timeslotRes = await fetch(`/api/timeslot/byOwnerId/${props.data._id}`);
            console.log(props.data._id);
            const timeslotRes = await fetch(`/api/schedule/populateForUser/timeslots/${props.data._id}`);
            const timeslotList = await timeslotRes.json();
            setFetchedTimeslot(timeslotList.userSchedule.timeslots);
        },2000)
        return () => clearInterval(fetchInterval);
    },[])

    useEffect(() => {
        const temp = [];
        for ( const timeslot of fetchedTimeslots){
            const newObj = {
                title:"Game title here",
                start: timeslot.timeStart,
                end: timeslot.timeEnd,
                borderColor: "rgba(0,0,0,0)",
            }
            if(timeslot.isOpen){
                newObj["backgroundColor"] = "#8FBCBB"
            } else {
                newObj["backgroundColor"] = "#2E3440"
            }
            temp.push(newObj)
        }

        setTimeslotDisplay(temp);
    }, [fetchedTimeslots])
    
    const onClickShowTimeslotDetails = async (arg) => {
        console.log(arg.event);
        setTimeslotDetails(arg.event);
        const timer = setTimeout(()=>{
            setVisibleDetails(true);
        },500);
        
    }

    const onClickShowAddTimeslot = () => {
        setVisibleAdd(true);
    }
    
    useEffect(()=>{
        if(props.data._id === props.user._id){
            setRightSide("myCustomButton timeGridWeek")
        } else{
            setRightSide("timeGridWeek")
        }
    },[props.data._id,props.user._id])

    return (
        <div className="calendar-container">
            <FullCalendar
                plugins={[ timeGridPlugin,interactionPlugin ]}
                timeZone= 'local'
                initialView= 'timeGridWeek'
                headerToolbar= {{
                    left: 'prev,next today',
                    center: 'title',
                    right: rightSide
                }}
                eventClick={onClickShowTimeslotDetails}
                events={timeslotDisplay}
                customButtons={{
                    myCustomButton: {
                        text: 'Add Timeslot',
                        click: onClickShowAddTimeslot
                    },
                }}
            />
            <TimeslotModal data={timeslotDetails} visible={visibleDetails} setVisible={setVisibleDetails}/>
            <AddTimeslotModal
                visible={visibleAdd}
                setVisible={setVisibleAdd}
                userData={props.data}
            />
        </div>
    )
}

export default UserSchedule;

