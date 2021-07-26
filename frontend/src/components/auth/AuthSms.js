import React, {useState} from "react";
import {change, Field, formValueSelector} from "redux-form";
import {connect} from "react-redux";
import {FormText} from "reactstrap";
import {certifyAuthSms, sendAuthSms} from "../../actions/userActions";
import store from "../../store";
// import {required} from "redux-form-validators";

const validate = value => {
    return value ? undefined : '인증필요';
}

const renderAuthSmsField = ({ input, disabled, label, type, placeholder, sendCompleteInput, onClick, meta: { touched, error, warning } }) => {
    return (
        <>
            <label>{label}</label>
            <div className="input-group">
                <input className="form-control" {...input} placeholder={placeholder} type={type} disabled={disabled}/>
                <div className="button-wrapper input-group-append">
                    <button className="btn"
                            type="button"
                            disabled={disabled}
                            onClick={onClick}
                    > {sendCompleteInput ? '재전송' : '전송'}</button>
                    {/* 재전송 구현 必 */}
                </div>
            </div>
            {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
        </>
    )
}

let AuthSms = (props) => {

    const {phoneValue, authNumberValue} = props;
    const [sendCompleteInput, setSendCompleteInput] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [authSuccess, setAuthSuccess] = useState(false);
    const [sendCount, setSendCount] = useState(0);

    const onSendSms = (e) => {
        e.preventDefault();
        sendAuthSms(phoneValue)
            .then((response)=>{
                console.log('response:', response)
                if(response.status===200) {
                    setSendCompleteInput(true)
                    setSendCount(sendCount + 1)
                }else{
                    alert('인증SMS 전송 오류입니다.')
                }
            })
    }
    const onCertify = (e) => {
        e.preventDefault();
        certifyAuthSms(phoneValue, authNumberValue)
            .then((response)=>{
                console.log('certifyAuthSms response:', response)
                if(response.status===200 && response.data['result'] === true){
                    setAuthSuccess(true);
                    setAuthError(false);
                    // props.change('authSuccess', true)
                    store.dispatch(change(props.formName, 'authSuccess', true));
                }else{
                    setAuthError('잘못된 인증번호입니다.');
                }

            })
    };
    return (
        <>
            <fieldset className="form-group">
                {/*<label>휴대폰 번호 인증＊</label><br/>*/}
                {/*<div className="input-group">*/}
                <Field name="phone" type="text" placeholder="예) 010-1234-6789"
                       label={'휴대폰 번호 인증　'}
                       sendCompleteInput={sendCompleteInput}
                    // validate={validate}
                    // component="input"
                       component={renderAuthSmsField}
                       onClick={(e)=>onSendSms(e)}
                       className="form-control" maxLength="13" disabled={authSuccess}
                />

                {/* <div className="button-wrapper input-group-append">
                        <button className="btn"
                                type="button"
                                disabled={authSuccess}
                                onClick={(e)=>onSendSms(e)}
                        > {authCompleteInput ? '재전송' : '전송'}</button>
                         재전송 구현 必
                    </div>*/}
                {/*</div>*/}
            </fieldset>
            { sendCompleteInput && (
                <>
                    {!authSuccess && (
                        <><FormText color="info" tag="span">
                            <b>인증번호를 전송하였습니다.({sendCount})</b>
                        </FormText><br/></>
                    )}
                    <div className="input-group">
                        <Field name="auth_number" type="text" placeholder="SMS 인증번호를 입력해주세요."
                               className="form-control" maxLength="4"
                               label={'인증번호*　'}
                               component="input"
                            // component={renderAuthSmsField}
                               disabled={authSuccess}
                            // validate={validate}
                        />
                        <div className="button-wrapper input-group-append">
                            <button className="btn"
                                    onClick={(e)=>onCertify(e)}
                                    disabled={authSuccess ? true : false}> {authSuccess ? '인증완료': '인증하기'}</button>
                        </div>
                    </div>
                    {authSuccess && (
                        <><FormText color="info" tag="span">
                            <b>인증이 완료되었습니다.</b>
                        </FormText><br/></>
                    )}
                    {authError && (<div className="alert alert-danger p-1"><small>{authError}</small></div>) }
                </>
            )}
        </>
    );
}


AuthSms = connect(
    (state, ownProps) => {
        const selector = formValueSelector(ownProps['formName']);
        const phoneValue = selector(state, 'phone');
        const authNumberValue = selector(state, 'auth_number');
        return {
            phoneValue,
            authNumberValue,
        }
    }
)(AuthSms);

export default AuthSms;
