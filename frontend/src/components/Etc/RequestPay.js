import React from "react";
import axios from "axios";
import {AuthUrls} from "../../constants/urls";
import {actions as notifActions} from 'redux-notifications';
import store from "../../store";
import {connect} from "react-redux";
import {getCompanyProfile, getUserProfile} from "../../actions/authActions";

const {notifSend} = notifActions;

const IMP = window.IMP; // 생략해도 괜찮습니다.
IMP.init("iamport"); // "imp00000000" 대신 발급받은 "가맹점 식별코드"를 사용합니다.

const RequestPay = (props) => {
    const { user, company, payinfo } = props;

    const requestPay = (payinfo) => {
        console.log('payinfo: ',payinfo);
        // IMP.request_pay(param, callback) 호출
        IMP.request_pay({ // param
            pg : 'inicis', // version 1.1.0부터 지원.
            pay_method : 'card',
            merchant_uid : 'merchant_' + new Date().getTime(),
            name : '티켓 ' + payinfo.ticket + '장',
            amount : payinfo.amount,
            buyer_email : 'iamport@siot.do',
            buyer_name : '구매자이름',
            buyer_tel : '010-1234-5678',
            buyer_addr : '서울특별시 강남구 삼성동',
            buyer_postcode : '123-456',
            // m_redirect_url : 'https://chaegong.co.kr/Mng/Ticket'
            m_redirect_url : 'https://chaema.co.kr/Mng/Ticket'
        }, rsp => { // callback
            if (rsp.success) {
                // 결제 성공 시 로직,
                let msg = '결제가 완료되었습니다.';
                msg += '고유ID : ' + rsp.imp_uid;
                msg += '상점 거래ID : ' + rsp.merchant_uid;
                msg += '결제 금액 : ' + rsp.paid_amount;
                msg += '카드 승인번호 : ' + rsp.apply_num;

                axios.post(AuthUrls.PAYMENT, {
                    user: user.id,
                    paid_amount: payinfo.amount,
                    apply_num: rsp.apply_num,
                    imp_uid: rsp.imp_uid,
                    merchant_uid: rsp.merchant_uid
                }).then((data)=>{
                    store.dispatch(notifSend({
                        message: "결제가 완료되었습니다.",
                        kind: "info",
                        dismissAfter: 3000
                    }));
                    // props.getCompanyProfile();
                    props.getUserProfile();
                })
            } else {
                // 결제 실패 시 로직,
                let msg = '결제에 실패하였습니다.';
                msg += '에러내용 : ' + rsp.error_msg;
                alert(msg)
            }
        });
    };

    return (
        <button className="btn btn-sm btn-outline-danger" onClick={()=>requestPay(payinfo)}>{payinfo.amount}원</button>
    );
}


function mapStateToProps(state) {
    return {
        user: state.auth.user,
        company: state.auth.company
    }
}

export default connect(mapStateToProps, {getUserProfile, getCompanyProfile})(RequestPay);

