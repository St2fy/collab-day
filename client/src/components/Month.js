import { useContext } from "react";
import DateBox from "./Date";
import CalendarContext from "../calendarContext";
import { Container, Row, Col } from "react-bootstrap";



const Month = (props) => {
    //const weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
    const {calendar} = useContext(CalendarContext);
    //console.log(calendar.months[currentMonth])
    let weekList = [];
    let dayList = [];
    //add each day of the month to a list
    for (let i = 0; i < calendar.months[props.currentMonth].days.length; i++) {
        dayList.push(<Col sm><DateBox date={calendar.months[props.currentMonth].days[i]} /></Col>)
    }
    //show the week day headings
    weekList.push(<Row xs='auto' className="row" >
      <Col sm>SUN</Col>
      <Col sm>MON</Col>
      <Col sm>TUE</Col>
      <Col sm>WED</Col>
      <Col sm>THU</Col>
      <Col sm>FRI</Col>
      <Col sm>SAT</Col>
    </Row>)
    //distribute the days into week rows
    for (let i = 0, j = 7; j < dayList.length + 7; i += 7, j += 7) {
        weekList.push(<Row classname="row">{dayList.slice(i, j)}</Row>);
    }
    return (
        <Container fluid className="container">
            {weekList}
        </Container>
    );
}
export default Month;