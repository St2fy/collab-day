import { createContext, useState, useEffect } from "react";
import axios from "axios";

const CalendarContext = createContext();

export function CalendarProvider({children}) {
    const [calendar, setCalendar] = useState({});
    const [loading, setLoading] = useState(false);
    const [countryFilter, setCountryFilter] = useState([]);
    const [holidayList, setHolidayList] = useState([]);
    
    useEffect(() => {
        setLoading(true)
        getCalendar();
        setLoading(false)
    }, [setCalendar]);

    useEffect(() => {
        getHolidays();
    }, [setCountryFilter])

    //get the calendar from the api
    const getCalendar = () => {
        axios.get("http://localhost:5000/api/calendar/")
        .then((res) => {
            setCalendar(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    async function postCalendar() {
        axios.post(`http://localhost:5000/api/calendar/`, {...calendar}, { headers: {'Content-Type' : 'application/json'}})
        .then((res) => {
            //console.log(res.data.calendar);
            setCalendar(res.data.calendar);
        })
        .catch((err) => {
            console.log(err);
        })
        
    }
    //adds an event object to a date in the calendar
    function addEvent(date, title, body) {
        const month = date.getMonth();
        const foundDate = calendar.months[month].days.find((d) => new Date(d.date).getTime() === new Date(date).getTime());
        if (foundDate !== undefined) {
            let newEvent = {
                date: date,
                title: title,
                body: body,
            }
            const updated = calendar.months[month].days.map((d) => {
                if (foundDate.key === d.key) {
                    const events = d.events;
                    return {...d, events: [...events, newEvent]}
                }
                return d;
            });
            let cal = [...calendar.months]
            cal[month].days = updated;
            setCalendar({...calendar, months: cal});
            postCalendar();
        }
        else {
            alert("Date Not Found!");
        }
    }
    function getHolidays() {
        setHolidayList([]);
        countryFilter.map(async(c, idx) => {
            await axios.get(`http://localhost:5000/api/holidays/${countryFilter[idx]}`)
            .then((res) => {
                setHolidayList([...holidayList, res.data]);
            })
            .catch((err) => {
                console.log(err);
            })
        })
    }
    // function matchHolidays(day, holidayList) {
    //     //console.log(holidayList);
    //     let matches = []
    //     //console.log('matching');
    //     for (let i = 0; i < holidayList.length; i++) {
    //         for (let j = 0; j < holidayList[i].holidays.length; j++) {
    //             console.log(i, j)
    //             const calendarDate = new Date(day.date).getDate();
    //             const holidayDate = new Date(holidayList[i].holidays[j].date.iso).getDate();
    //             console.log('c', calendarDate);
    //             console.log('h', holidayDate)
    //             if (new Date(day.date).getTime() == new Date(holidayList[i].holidays[j].date.iso).getTime()){
    //                 console.log('match');
    //                 matches.push(holidayList[i].holidays[j]);
    //             }
    //         }
    //     }
    //     return matches;
    // }
    // function updateHolidays() {
    //     let holidayList = []
    //     countryFilter.map(async(c, idx) => {
    //         console.log(idx);
    //         await axios.get(`http://localhost:5000/api/holidays/${countryFilter[idx]}`)
    //         .then((res) => {
    //             holidayList.push(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    //     })
    //     console.log(holidayList);
    //     const updated = calendar.months.map(month => {
    //         console.log(month.name);
    //         const updatedMonth = month.days.map(day => {
    //             return {...day, holidays : matchHolidays(day, holidayList)};
    //         })
    //         //console.log("UM", updatedMonth)
    //         return {...month, days: updatedMonth};
    //     })
    //     console.log(updated);
    //     //setCalendar(updated);
    // }

    return (
        <CalendarContext.Provider value={{calendar, loading, addEvent, countryFilter, setCountryFilter, holidayList}}>
            {children}
        </CalendarContext.Provider>
    )
}

export default CalendarContext;