function Doc() {
    return (
        <>
        <h1>Documentation</h1>
        
        <h2>How to use:</h2>

        <h3>Calendar</h3>
        <ul>
            <h4>Buttons</h4>
            <li>Clicking the prev button will move to the previous month</li>
            <li>Clicking the next button will advance to the next month</li>
            <dd>Currently only the 2023 calendar is available</dd>
            <h4>Events</h4>
            <li>The Add an Event button will open a form menu to add an event to the calendar</li>
            <li>Each event will have a title and a description</li>
            <li>Each date card will show the title of each event</li>
            <li>The date card can be clicked to expand and show the list of events and their decriptions</li>
            <h4>Adding, Filtering</h4>
            <li>Adding an event</li>
            <li>Filter for country holidays for the front end is incomplete</li>
            <h4>REST API</h4>
            <li>3 GET routes</li>
            <li>1 POST route</li>
        </ul>
        </>
        
    )
}
export default Doc;