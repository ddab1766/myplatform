// import React from "react";
// // react component used to create a calendar with events on it
// import {Calendar, momentLocalizer} from "react-big-calendar";
// // dependency plugin for react-big-calendar
// import moment from "moment";
// // react component used to create alerts
// // reactstrap components
// import {Card, CardBody, Col, Row} from "reactstrap";
//
// import {events} from "variables/general.jsx";
//
// // const localizer = Calendar.momentLocalizer(moment);
// const localizer = momentLocalizer(moment);
//
// class MngCalendar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       events: events,
//       alert: null
//     };
//   }
//   selectedEvent = event => {
//     alert(event.title);
//   };
//   addNewEventAlert = slotInfo => {
//     // this.setState({
//     //   alert: (
//     //     <SweetAlert
//     //       input
//     //       showCancel
//     //       style={{ display: "block", marginTop: "-100px" }}
//     //       title="Input something"
//     //       onConfirm={e => this.addNewEvent(e, slotInfo)}
//     //       onCancel={() => this.hideAlert()}
//     //       confirmBtnBsStyle="info"
//     //       cancelBtnBsStyle="danger"
//     //     />
//     //   )
//     // });
//   };
//   addNewEvent = (e, slotInfo) => {
//     var newEvents = this.state.events;
//     newEvents.push({
//       title: e,
//       start: slotInfo.start,
//       end: slotInfo.end
//     });
//     this.setState({
//       alert: null,
//       events: newEvents
//     });
//   };
//   hideAlert = () => {
//     this.setState({
//       alert: null
//     });
//   };
//   eventColors = (event, start, end, isSelected) => {
//     var backgroundColor = "event-";
//     event.color
//       ? (backgroundColor = backgroundColor + event.color)
//       : (backgroundColor = backgroundColor + "default");
//     return {
//       className: backgroundColor
//     };
//   };
//   render() {
//     return (
//       <>
//         <div className="content">
//           {this.state.alert}
//           <Row>
//             <Col className="ml-auto mr-auto" md="12">
//               <Card className="card-calendar">
//                 <CardBody>
//                   <Calendar
//                     selectable
//                     localizer={localizer}
//                     // events={this.state.events}
//                     events={[]}
//                     defaultView="month"
//                     scrollToTime={new Date(1970, 1, 1, 6)}
//                     defaultDate={new Date()}
//                     onSelectEvent={event => this.selectedEvent(event)}
//                     onSelectSlot={slotInfo => this.addNewEventAlert(slotInfo)}
//                     eventPropGetter={this.eventColors}
//                   />
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       </>
//     );
//   }
// }
//
// export default MngCalendar;