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
            const timeslotRes = await fetch(`/api/timeslot/byOwnerId/${props.data._id}`);
            const timeslotList = await timeslotRes.json();
            setFetchedTimeslot(timeslotList);
        },1000)
        return () => clearInterval(fetchInterval);
    },[])

    useEffect(() => {
        const temp = [];
        for ( const timeslot of fetchedTimeslots){
            // console.log(timeslot);
            if(timeslot.isOpen){
                temp.push({
                    title:"Game title here",
                    start: timeslot.timeStart,
                    end: timeslot.timeEnd,
                    borderColor: "rgba(0,0,0,0)",
                    backgroundColor: "#8FBCBB"
                })
            } else {
                temp.push({
                    title:"Game title here",
                    start: timeslot.timeStart,
                    end: timeslot.timeEnd,
                    border: "none",
                    borderColor: "rgba(0,0,0,0)",
                    backgroundColor:"#2E3440"
                })
            }
        }

        // console.log(temp);
        setTimeslotDisplay(temp);
    }, [fetchedTimeslots])
    
    const onClickShowTimeslotDetails = async (arg) => {
        console.log(arg.event._def);
        setVisibleDetails(true);
    }

    const onClickShowAddTimeslot = () => {
        setVisibleAdd(true);
    }

    
    useEffect(()=>{
        console.log("checking guys")
        if(props.data._id == props.user._id){
            setRightSide("myCustomButton timeGridWeek")
        } else{
            setRightSide("timeGridWeek")
        }
    },[props])
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

