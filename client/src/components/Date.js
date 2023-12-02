import { useContext, useState } from "react";
import { Badge, Card, Offcanvas } from "react-bootstrap";
import AddEventMenu from "./AddEventMenu";
import CalendarContext from "../calendarContext";

const DateBox = (props) => {
    //console.log("day props", props.date);
    const [show, setShow] = useState(false);
    const {holidayList} = useContext(CalendarContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let eventList = [];
    if (props.date.events.length > 0) {
        props.date.events.map(d => {
            eventList.push(<><h4>{d.title}</h4><p>{d.body}</p></>);
            return d;
        });
    } 
    else {
        eventList = <p>Nothing To Show</p>
    }
    let holidayElements = [];
    holidayList.map(country => {
        return country.holidays.map(h => {
            if (new Date(h.date.iso).getTime() === new Date(props.date).getTime()) {
                holidayElements.push(<p>{h.name}{h.description}</p>)
            }
            return h;
        })
    })
    return (
        <>
        <Card className="dateBox" onClick={handleShow}>
            <Card.Title>
                <Badge>{new Date(props.date.date).getDate()}</Badge>
                {props.date.events.map((d) => {
                    return (
                        <p>{d.title}</p>
                    )
                })}
            </Card.Title>
        </Card>
        <Offcanvas show={show} onHide={handleClose} >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title><h1>Date Details</h1></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <h2>Events</h2>
                {eventList}
                <AddEventMenu/>
                {holidayList.length > 0 ? <h2>Holidays</h2> : <h2>No Holidays</h2>}
                {holidayList}
                
            </Offcanvas.Body>
        </Offcanvas>
        </>
        
    )
}
export default DateBox;