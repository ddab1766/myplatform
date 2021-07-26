import React, {Component} from "react";
// import PropTypes from "prop-types";
import {Field, propTypes, reduxForm} from "redux-form";
import {required} from "redux-form-validators"
import {changePassword} from "../../actions/authActions";
import {renderError, renderField} from "../../utils/renderUtils";
import {connect} from "react-redux";
import {Spinner} from "reactstrap";
import history from "utils/historyUtils";

class PasswordChange extends Component {

    static propTypes = {
        ...propTypes
    };

    render() {
        const { handleSubmit, error, submitting } = this.props;

        return (
            <div className="content">
                <div className="row justify-content-center">
                    <form
                        className="col col-sm-4 card mt-5 p-2"
                        onSubmit={handleSubmit}
                    >
                        <h4 className="text-md-center">비밀번호 변경</h4>
                        <hr/>

                        <fieldset className="form-group">
                            <Field name="password" label="기존 비밀번호" component={renderField}
                                   type="password" validate={[required({message: "필수 입력사항입니다."})]}
                            />
                        </fieldset>

                        <fieldset className="form-group">
                            <Field name="new_password1" label="새로운 비밀번호" component={renderField}
                                   type="password" validate={[required({message: "필수 입력사항입니다."})]}
                            />
                        </fieldset>

                        <fieldset className="form-group">
                            <Field name="new_password2" label="새로운 비밀번호 확인" component={renderField}
                                   type="password" validate={[required({message: "필수 입력사항입니다."})]}
                            />
                        </fieldset>

                        <div className="text-md-center">
                            {renderError(error)}
                            <button action="submit" className="btn btn-lg btn-info" disabled={submitting}>
                                {submitting === true && (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />)
                                }
                                변경완료
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

// Sync field level validation for password match
const validateForm = values => {
    const errors = {};
    const { password, new_password1, new_password2 } = values;
    if (!new_password1) {
        errors.new_password1 = '필수 입력 사항입니다.'
    }else{
        if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/.test(new_password1)){
            errors.new_password1 = "영문, 숫자, 특수문자 조합 6자 이상"
        }
    }
    if (password === new_password1) {
        errors.new_password1 = '기존 비밀번호와 같은 비밀번호를 사용할 수 없습니다.'
    }
    if (new_password1 !== new_password2) {
        errors.new_password2 = "비밀번호가 일치하지 않습니다."
    }
    return errors;
};

function mapStateToProps(state) {
    return {
        initialValues: {
            email: state.auth.user.email
        }
    }
}

export default connect(mapStateToProps, {})(reduxForm({
    form: "change_password",
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: changePassword,
    onSubmitSuccess: () => {
        history.push('My');
    },
    validate: validateForm
})(PasswordChange));
