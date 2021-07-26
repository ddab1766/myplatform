import React from "react";
import {Field, formValueSelector, initialize, reduxForm} from "redux-form";
import {renderField} from "../../utils/renderUtils";
import {signupUser} from "../../actions/authActions";
import {connect} from "react-redux";
import {Col, Spinner} from "reactstrap";
import AuthSms from "./AuthSms";
import FormText from "reactstrap/es/FormText";


let AddOnSignup = (props) => {
    const { handleSubmit, error, submitting, phoneValue, authNumberValue, touched } = props;

    return (
        <>
            <form
                onSubmit={handleSubmit}
            >
                {/*<Card className="card card-plain">*/}
                {/*    <CardBody>*/}
                <fieldset className="form-group">
                    <Field name="password1" label="비밀번호" component={renderField}
                           required={true}
                           type="password"
                    />
                </fieldset>

                <fieldset className="form-group">
                    <Field name="password2" label="비밀번호 확인" component={renderField}
                           required={true}
                           type="password"
                    />
                    <FormText>영문, 숫자, 특수문자 조합 6자 이상</FormText>
                </fieldset>

                <fieldset className="form-group">
                    <Field name="date_of_birth" label="생년월일*" component={renderField}
                           type="text" placeholder={"ex) 1989-09-06 "}
                    />
                </fieldset>
                <AuthSms formName={'signup_wizard'}/>
                {/*</CardBody>*/}
                {/*</Card>*/}

                <hr/>
                <p>이용약관 및 개인정보취급방침에 동의합니다. (필수)</p>
                <hr/>
                <Col className="text-center" md="12">
                    <button action="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting === true && (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />)
                        }
                        <span className="btn-label">
                          <i className="nc-icon nc-check-2" />
                        </span>등록하기
                    </button>
                </Col>
            </form>
        </>
    );
}

// Sync field level validation for password match
const validateForm = values => {
    const errors = {};
    const { password1, password2 } = values;

    if(!password1){
        errors.password1 = '필수 입력사항입니다.'
    }
    if (password1 !== password2) {
        errors.password2 = "비밀번호가 같지 않습니다."
    }
    if(!values.date_of_birth){
        errors.date_of_birth = '필수 입력사항입니다.'
    }else if(values.date_of_birth.length > 10){
        errors.date_of_birth = '10자리 이하로 입력해주세요.'
    }
    if(!values.phone){
        errors.phone = '필수 입력사항입니다.'
    }else if(values.phone.length > 13){
        errors.phone = '13자리 이하로 입력해주세요.'
    }else if(!values.authSuccess){
        errors.phone = '인증이 완료되지 않았습니다.';
    }
    return errors;
};

const afterSubmit = (result, dispatch) => {
    dispatch(initialize('signup_wizard', {}));
    console.log('AddOnSignup afterSubmit result', result)
    // history.push("/User/profile")

    // Todo user_special state 체크 후 로딩바
    // console.log('result:', result);
    // console.log('dispatch:', dispatch);
}

AddOnSignup = reduxForm({
    form: 'signup_wizard',
    destroyOnUnmount: false,
    validate: validateForm,
    onSubmitSuccess: afterSubmit,
    onSubmit: signupUser
})(AddOnSignup);

const selector = formValueSelector('signup_wizard')
AddOnSignup = connect(
    state => {
        const phoneValue = selector(state, 'phone')
        const authNumberValue = selector(state, 'auth_number')
        return {
            phoneValue,
            authNumberValue,
        }
    }
)(AddOnSignup);

export default AddOnSignup;

// export default connect(mapStateToProps, {getUserProfile, getRecUser})(reduxForm({
//     form: "signup_wizard",
//     destroyOnUnmount: false,
//     // form: "AddOnSignup",
//     validate: validateForm,
//     onSubmitSuccess: afterSubmit,
//     onSubmit: signupUser
// })(AddOnSignup));

