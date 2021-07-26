import React from "react";
// import PropTypes from "prop-types";
import {Field, initialize, reduxForm} from "redux-form";
import {required} from "redux-form-validators"
import {renderAsyncCreatableSelectField, renderCheckboxField, renderError, renderField} from "../../utils/renderUtils";
import {getRecUser, getUserProfile, hrSignupSpecialFormSubmit} from "../../actions/authActions";
import {connect} from "react-redux";
import {Spinner} from "reactstrap";
import PrivacyModal from "../../views/Common/PrivacyModal";
import FormText from "reactstrap/es/FormText";

const AddOnHrSignup = (props) => {

    const {handleSubmit, error, submitting} = props;

    return (
        <form
            onSubmit={handleSubmit}
        >
            {/*<p>AddOnCompanySignUp</p>*/}
            {/*<fieldset className="form-group">
                        <Field name="email" label="이메일＊" component={renderField}
                               type="text" validate={[required({message: "필수입력값입니다."})]}/>
                    </fieldset>*/}
            <fieldset className="form-group">
                <Field name="nickname" label="본인의 이름(실명)을 입력해주세요" component={renderField}
                       type="text"
                       required={true}
                />
            </fieldset>

            <fieldset className="form-group">
                <Field name="password1" label="비밀번호" component={renderField}
                       type="password"
                       required={true}
                />
                <FormText>영문, 숫자, 특수문자 조합 6자 이상</FormText>
            </fieldset>

            <fieldset className="form-group">
                <Field name="password2" label="비밀번호 확인" component={renderField}
                       type="password"
                       required={true}
                />
            </fieldset>

            {/*<Field name="custname" label="회사이름＊" component={renderAsyncSelectField}
                       promiseOptions={promiseOptions}
                       type="text"
                       // disabled={props.location ? true : false}
                />*/}

            {/*<fieldset className="form-group">*/}
            {/*    <Field name="custname" label="회사이름*" component={renderField}*/}
            {/*           type="text"*/}
            {/*           validate={[required({message: "필수 입력사항입니다."})]}*/}
            {/*    />*/}
            {/*</fieldset>*/}

            <fieldset className="form-group">
                <Field name="custname" label="회사명" component={renderAsyncCreatableSelectField}
                       validate={[required({message: "필수 입력사항입니다."})]}
                       type="text"
                       required={true}
                    // disabled={props.location.state.company.custid ? true : false}
                />
            </fieldset>

            <fieldset className="form-group">
                <Field name="phone" component={renderField}
                       label="담당자 연락처"
                       required={true}
                       type="text"
                       validate={[required({message: "필수 입력사항입니다."})]}
                />
            </fieldset>

            {/*<fieldset className="form-group">
                <Field name="is_agree" component={renderCheckboxField}
                       label={'개인정보 처리방침 및 이용약관에 동의합니다'}
                       type="checkbox"
                       require={true}
                       // validate={[required({message: "미동의시 가입이 제한됩니다."})]}
                />

            </fieldset>*/}
            <p>회원가입 시 <a href="/HelpCenter/privacy" target="_blank">개인정보 처리방침</a>과 <a href="/HelpCenter/terms" target="_blank">이용약관</a>을 확인하였으며, 동의합니다.</p>
            <PrivacyModal/>
            { renderError(error) }
            <hr/>
            <button action="submit"
                    className="btn btn-lg btn-primary" disabled={submitting}>
                {submitting === true && (
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />)
                }
                등록하기
            </button>
        </form>
    );
}

// Sync field level validation for password match
const validateForm = values => {
    const errors = {};
    const {password1, password2, is_agree} = values;
    if(password1){
        if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/.test(password1)){
            errors.password1 = "영문, 숫자, 특수문자 조합 6자 이상"
        }
    }
    if (password1 !== password2) {
        errors.password2 = "비밀번호가 같지 않습니다."
    }
    if (!is_agree) {
        errors.is_agree = "미동의시 가입이 제한됩니다."
    }
    return errors;
};

function mapStateToProps(state) {
    return {
        initialValues: {
            ...state.form.hr_profile_wizard.values,
            recuser: state.auth.recUser,
        },
    }
}

const afterSubmit = (result, dispatch) => {
    dispatch(initialize('hr_profile_wizard', {}));
    // store.dispatch(reset('sugub_wizard'));
    // history.push("/Hr/Profile");
}

export default connect(mapStateToProps, {getUserProfile, getRecUser})(reduxForm({
    form: "hr_profile_wizard",
    destroyOnUnmount: false,
    validate: validateForm,
    onSubmitSuccess: afterSubmit,
    onSubmit: hrSignupSpecialFormSubmit
})(AddOnHrSignup));

