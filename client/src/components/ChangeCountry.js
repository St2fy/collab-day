import { Form, Card, Offcanvas, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import CalendarContext from "../calendarContext";
function ChangeCountry() {
    const {countryFilter, setCountryFilter} = useContext(CalendarContext)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function toggleCountry(country) {
        if (countryFilter.includes(country)) {
            let updated = countryFilter.filter((c) => {
                return c !== country;
            })
            setCountryFilter(updated);
        }
        else {
            setCountryFilter(
                [...countryFilter, country]
            )
        }
        //console.log(countryFilter);
    }
    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Toggle Country Holidays
        </Button>
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Country Selection</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul>
                    {countryFilter.map(c => {
                        return (<li>{c}</li>)
                    })}
                </ul>
                <Form >
                    <Card>
                        <Card.Body>
                            <Card.Title>Canada</Card.Title>
                            <Form.Check onChange={() => toggleCountry("Canada")} type={"checkbox"} label={"Canada"} id={"Canada"}/>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Brazil</Card.Title>
                            <Form.Check onChange={() => toggleCountry("Brazil")} type={"checkbox"} label={"Brazil"} id={"Brazil"}/>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>France</Card.Title>
                            <Form.Check onChange={() => toggleCountry("France")} type={"checkbox"} label={"France"} id={"France"}/>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Japan</Card.Title>
                            <Form.Check onChange={() => toggleCountry("Japan")} type={"checkbox"} label={"Japan"} id={"Japan"}/>
                        </Card.Body>
                    </Card>
                    </Form>
            </Offcanvas.Body>
        </Offcanvas>

        
        </>
    )
}
export default ChangeCountry;