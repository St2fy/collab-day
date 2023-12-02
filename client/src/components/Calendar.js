import Month from "./Month.js";
import AddEventMenu from "./AddEventMenu.js";
import ChangeCountry from "./ChangeCountry.js";
import { useState } from "react";
import { Button, Spinner, Stack } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import CalendarContext from "../calendarContext.js";
import { useContext } from "react";

function Calendar() {
  const {calendar} = useContext(CalendarContext);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(calendar.id);
  
  //move to the previous month
  function previousMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    }
    else {
      setCurrentMonth(currentMonth - 1);
    }
  }
  //move to the next month
  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    }
    else {
      setCurrentMonth(currentMonth + 1);
    }
  }

  if (calendar.months === undefined) {
    return(<Spinner animation="border" role="status"></Spinner>)
  }
  else {
    return (
    <div className="wrapper">
        <br/>
        <Stack className="stack" direction="horizontal" gap={3}>
          <Button onClick={previousMonth}>
          prev
          </Button>
          <h3>{calendar.months[currentMonth].name}</h3>
          <Button onClick={nextMonth}>
          next
          </Button>
          <AddEventMenu />
          <ChangeCountry /> 
        </Stack>
        <h2>{calendar.id}</h2>
        <br/>
        <Month 
          currentMonth={currentMonth}
        />
        <br/>
    </div> 
    );
  }
}
export default Calendar;