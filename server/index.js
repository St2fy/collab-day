const express = require("express");
const app = express();
const cors = require('cors');
const { MongoClient } = require("mongodb");
const logger = require('./middleware/logger');
const generateYear = require("./middleware/generateCalendar");
const uri = "mongodb+srv://admin:calendarpassword@cluster0.euuqtjc.mongodb.net/?retryWrites=true&w=majority";

const PORT = 5000;
const client = new MongoClient("mongodb+srv://admin:calendarpassword@cluster0.euuqtjc.mongodb.net/?retryWrites=true&w=majority");
app.use(cors());
//app.use(require('./routes/record'));
app.use(logger);
app.use(express.urlencoded({ extended: true}));
app.use(express.json());




const dbUserName = "admin";
const dbPassword = "calendarpassword"

let database;

async function connect() {
    try {
        await client.connect(uri);
        console.log("connected to MongoDB");
        database = client.db("CalendarApp");
    }
    catch (error) {
        console.error(error);
    }
}
//get route for a calendar
app.get('/api/calendar/', async (req, res) => {
    const calendar = await database.collection("Calendars").findOne({});
    res.json(calendar);
});
//get route for a single calendar by year
app.get('/api/calendar/:year', async (req, res) => {
    const cal = await database.collection("Calendars").findOne({year : req.params.year});
    //console.log(cal);
    if (cal != undefined) {
        res.json(cal);
    }
    else  {
        res.status(400).json({ msg: `Calendar of ${req.params.year} not found`})
    }
});
//get route for the holidays of a single country
app.get('/api/holidays/:country', async (req, res) => {
    const holiday = await database.collection("Holidays").findOne({country: req.params.country});
    if (holiday != undefined) {
        res.json(holiday);
    }
    else {
        res.status(400).json({ msg: `Holidays for year ${req.params.country} not found`});
    }
});
//post route for calendar
app.post('/api/calendar/', (req, res) => {
    console.log("posting calendar", req.body.year);
    database.collection("Calendars").replaceOne(
        {year: req.body.year},
        {months: req.body.months, year: req.body.year}
    );
    res.send({ msg: "calendar received!", calendar: req.body});
});

connect();
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}.`);
    client.close();
});