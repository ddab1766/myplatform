// import React, {useEffect} from "react";
// // reactstrap components
// import {Table,} from "reactstrap";
// import {connect} from "react-redux";
// import {getUserProfile} from "../../actions/authActions";
// import LoaderSpinner from "../Etc/LoaderSpinner";
// import CancelPay from "../Etc/CancelPay";
//
// const TicketPurchaseHistory = ( props ) => {
//     const {user, company} = props;
//
//     useEffect(()=>{
//         if(user) return;
//         props.getUserProfile()
//     },[user]);
//
//     return user ? (
//         <>
//             {user.paymenthistory.length > 0 ? (
//                 <>
//                     <div className="title">
//                         결제내역
//                     </div>
//                     <div className="content">
//                         <Table className="table-shopping">
//                             <thead>
//                             <tr>
//                                 <td>결제일시</td>
//                                 <td>결제금액</td>
//                                 <td>결제코드</td>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {user.paymenthistory.map( (v, index) =>(
//                                 <tr>
//                                     <td>{v.created_time}</td>
//                                     <td>{v.paid_amount}원 {v.cancel_request_amount ? (<>환불완료</>) : (<CancelPay history={v}/>)}</td>
//                                     <td>{v.imp_uid}</td>
//                                 </tr>
//                             ))}
//                             </tbody>
//                         </Table>
//                     </div>
//                 </>
//             ) : (
//                 <>결제내역이 없습니다.</>
//             )}
//
//         </>
//     ) : (<LoaderSpinner/>)
// }
//
//
// function mapStateToProps(state) {
//     return {
//         user: state.auth.user,
//         company: state.auth.company
//     }
// }
//
// export default connect(mapStateToProps, {getUserProfile})(TicketPurchaseHistory);
