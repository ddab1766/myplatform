// import React, {useEffect} from "react";
// // reactstrap components
// import {Card, CardBody,} from "reactstrap";
// import RequestPay from "../Etc/RequestPay";
// import {connect} from "react-redux";
// import {getCompanyProfile} from "../../actions/authActions";
// import LoaderSpinner from "../Etc/LoaderSpinner";
// import TicketPurchaseHistory from "./TicketPurchaseHistory";
//
// const TicketPurchase = ( props ) => {
//     const {user, company} = props;
//
//     useEffect(()=>{
//         if(company) return;
//         props.getCompanyProfile()
//     },[company]);
//
//     return company ? (
//         <>
//             <Card>
//                 <CardBody>
//                     보유 티켓 :  {company.ticket} 장 {' '}
//                 </CardBody>
//             </Card>
//             <ul>
//                 <li>1장 <RequestPay payinfo={{'amount':1000, 'ticket': 1}}/></li>
//                 <li>5장 <RequestPay payinfo={{'amount':5000, 'ticket': 5}}/></li>
//                 <li>10장 <RequestPay payinfo={{'amount':10000, 'ticket': 10}}/></li>
//                 <li>50장 <RequestPay payinfo={{'amount':50000, 'ticket': 50}}/></li>
//             </ul>
//             <div className="">
//                 <p className="description">
//                     채공 티켓 이용안내<br/>
//                     · 모든 상품은 부가세(VAT)포함 가격입니다.<br/>
//                     {/*· 채공 티켓은 현금과 동일한 1:1 비율이며, 숨고 서비스 사용을 위해 자유롭게 사용하실 수 있습니다.*/}
//                     {/*· 채공 티켓은 충전하시면 상품에 따라 일정량의 보너스 캐시가 지급됩니다.*/}
//                     {/*· 채공 티켓은 세금계산서 발행 대상이 아닙니다. 구매 후 신용카드 전표/휴대폰 결제 영수증은 개인 소득공제용으로만 사용하실 수 있습니다.*/}
//                     · 환불 가능 기간은 충전일로부터 5년까지이며, 환불 시 보너스 티켓은 자동으로 차감됩니다.
//                     {/*· 마이페이지 > 충전/사용내역 > 환불받고자 하는 충전 건 선택 > 환불하기로 실시간 가능합니다.*/}
//                 </p>
//             </div>
//             <TicketPurchaseHistory/>
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
// export default connect(mapStateToProps, {getCompanyProfile})(TicketPurchase);
