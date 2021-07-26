// ##############################
// // // data for populating the calendar in Calendar view
// #############################

var today = new Date();
var y = today.getFullYear();
var m = today.getMonth();
var d = today.getDate();

const events = [
  {
    title: "All Day Event",
    allDay: true,
    start: new Date(y, m, 1),
    end: new Date(y, m, 1)
  },
  {
    title: "Meeting",
    start: new Date(y, m, d - 1, 10, 30),
    end: new Date(y, m, d - 1, 11, 30),
    allDay: false,
    color: "green"
  },
  {
    title: "Lunch",
    start: new Date(y, m, d + 7, 12, 0),
    end: new Date(y, m, d + 7, 14, 0),
    allDay: false,
    color: "red"
  },
  {
    title: "PD-PRO-REACT Launch",
    start: new Date(y, m, d - 2),
    end: new Date(y, m, d - 2),
    allDay: true,
    color: "azure"
  },
  {
    title: "Birthday Party",
    start: new Date(y, m, d + 1, 19, 0),
    end: new Date(y, m, d + 1, 22, 30),
    allDay: false,
    color: "azure"
  },
  {
    title: "Click for Creative Tim",
    start: new Date(y, m, 21),
    end: new Date(y, m, 22),
    color: "orange"
  },
  {
    title: "Click for Google",
    start: new Date(y, m, 21),
    end: new Date(y, m, 22),
    color: "orange"
  }
];

// ##############################
// // // for vector map row in Dashboard view
// #############################

const us_flag = require("../assets/img/flags/US.png");
const de_flag = require("../assets/img/flags/DE.png");
const au_flag = require("../assets/img/flags/AU.png");
const gb_flag = require("../assets/img/flags/GB.png");
const ro_flag = require("../assets/img/flags/RO.png");
const br_flag = require("../assets/img/flags/BR.png");

const table_data = [
  { flag: us_flag, country: "USA", count: "2.920", percentage: "53.23%" },
  { flag: de_flag, country: "Germany", count: "1.300", percentage: "20.43%" },
  { flag: au_flag, country: "Australia", count: "760", percentage: "10.35%" },
  {
    flag: gb_flag,
    country: "United Kingdom",
    count: "690",
    percentage: "7.87%"
  },
  { flag: ro_flag, country: "Romania", count: "600", percentage: "5.94%" },
  { flag: br_flag, country: "Brasil", count: "550", percentage: "4.34%" }
];

export { events, table_data };
