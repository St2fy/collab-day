import { useContext, useState } from "react";
import { Button, InputGroup, Form, Offcanvas } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import CalendarContext from "../calendarContext";

function AddEventMenu(props) {
    const { addEvent } = useContext(CalendarContext);
    //console.log("menu props", props)
    // const testDate = new Date(2023, 0, 1);
    // const testInfo = "test";
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [show, setShow] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        addEvent(startDate, title, body)
    }
    function handleDateChange(e) {
        setStartDate(new Date(`${e.target.value}T00:00`));
    }
    function handleTitleChange(e) {
        setTitle(e.target.value);
    }
    function handleBodyChange(e) {
        setBody(e.target.value);
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Add an Event
        </Button>
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Add an Event</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form onSubmit={handleSubmit}> 
                <input className="btn-primary"
                    type="date"
                    onChange={handleDateChange}
                />
                <br/>
                <InputGroup>
                    <InputGroup.Text>Event Name</InputGroup.Text>
                    <Form.Control
                        value={title.toString()}
                        onChange={handleTitleChange}
                    />
                </InputGroup>
                <br/>
                <InputGroup>
                    <InputGroup.Text>Description</InputGroup.Text>
                    <Form.Control
                        value={body.toString()}
                        onChange={handleBodyChange}
                    />
                </InputGroup>
                <br/>
                <Button type="submit">Confirm</Button>
            </Form>
            </Offcanvas.Body>
        </Offcanvas>
        
        </>
    );
}

export default AddEventMenu;