const uuid = require('uuid');

const monthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function generateYear(year) {
    let newYear = {
      id: year,
      months : [
        {name: "January", days: []},
        {name: "February", days: []},
        {name: "March", days: []},
        {name: "April", days: []},
        {name: "May", days: []},
        {name: "June", days: []},
        {name: "July", days: []},
        {name: "August", days: []},
        {name: "September", days: []},
        {name: "October", days: []},
        {name: "November", days: []},
        {name: "December", days: []},
      ]
    };
    for (let i = 0; i < newYear.months.length; i++) {
      newYear.months[i].days = generateMonth(i, newYear.id);
    }
    return newYear;
  }

  function generateMonth(month, year) {
    let newMonth = [];
    for (let i = 1; i <= monthList[month]; i++) {
      let day = {
        key: uuid(),
        date: new Date(year, month, i),
        holidays : [],
        events : [],
      }
      newMonth.push(day);
    }
    return newMonth;
  }

module.exports = generateYear;