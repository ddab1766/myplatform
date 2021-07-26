import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {getCompanyProfile, getUserProfile} from "../../actions/authActions";
import {AuthUrls} from "../../constants/urls";
import store from "../../store";
import {actions as notifActions} from "redux-notifications";

const {notifSend} = notifActions;

const CancelPay = (props) => {
    const { user, history } = props;
    console.log('history', history)
    console.log('user', user)
    const cancelPay = (history) => {
        axios.post(AuthUrls.PAYMENT, {
            user: user.id,
            imp_uid: history.imp_uid,
            merchant_uid: "mid_" + new Date().getTime(), // 주문번호
            cancel_request_amount: 1000, // 환불금액
            reason: "테스트 결제 환불", // 환불사유
            refund_holder: "홍길동", // [가상계좌 환불시 필수입력] 환불 수령계좌 예금주
            refund_bank: "88", // [가상계좌 환불시 필수입력] 환불 수령계좌 은행코드(ex. KG이니시스의 경우 신한은행은 88번)
            refund_account: "56211105948400" // [가상계좌 환불시 필수입력] 환불 수령계좌 번호
        }).then(res=>{
            console.log('cancel res', res)
            store.dispatch(notifSend({
                message: "환불 처리되었습니다.",
                kind: "info",
                dismissAfter: 3000
            }));
            // props.getCompanyProfile();
            props.getUserProfile();
        }).catch(err=>{
            alert('환불 실패' + err)
        })
    }
    return <button onClick={()=>cancelPay(history)}>환불하기</button>;
}


function mapStateToProps(state) {
    return {
        user: state.auth.user,
        company: state.auth.company
    }
}

export default connect(mapStateToProps, {getUserProfile, getCompanyProfile})(CancelPay);