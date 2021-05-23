import React,{useState} from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";



const ScheduleCalendar = () => {

    const [newDate, setNewDate] = useState();
    const localizer = momentLocalizer(moment);

    const DnDCalendar = withDragAndDrop(Calendar);

    const myEventsList = [
        { start: new Date(), end: new Date(), title: "special event" }
    ];

    const onEventResize = (data) => {
        const { start, end } = data;
        setNewDate((state) => {
        state.events[0].start = start;
        state.events[0].end = end;
        return { events: state.events };
        });
    };

    const onEventDrop = (data) => {
        console.log(data);
    };



    return (
        <div className="container">
             <DnDCalendar
                defaultDate={moment().toDate()}
                defaultView="month"
                localizer={localizer}
                events={myEventsList}
                onEventDrop={onEventDrop}
                onEventResize={onEventResize}
                resizable
                style={{ height: "90vh" }}
            />
        </div>
    );
};

export default ScheduleCalendar;