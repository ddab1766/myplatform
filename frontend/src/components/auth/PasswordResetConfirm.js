import React, {Component} from "react";
import {Field, propTypes, reduxForm} from "redux-form";
import {required} from "redux-form-validators"
import {confirmPasswordChange} from "../../actions/authActions";
import {renderError, renderField} from "../../utils/renderUtils";
import {Spinner} from "reactstrap";

class PasswordResetConfirm extends Component {

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
                        <h4 className="text-md-center">비밀번호 재설정</h4>
                        <hr/>

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
                                비밀번호 재설정 완료
                            </button>
                    </form>
                </div>
            </div>
        );
    }
}

// Sync field level validation for password match
const validateForm = values => {
    const errors = {};
    const { new_password1, new_password2 } = values;
    if (new_password1 !== new_password2) {
        errors.new_password2 = "패스워드가 일치하지 않습니다."
    }
    return errors;
};

export default reduxForm({
    form: "password_reset_confirm",
    onSubmit: confirmPasswordChange,
    validate: validateForm
})(PasswordResetConfirm);
