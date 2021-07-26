import React, {Component} from "react";
import {Field, propTypes, reduxForm} from "redux-form";
import {required} from "redux-form-validators"

import {renderError, renderField} from "../../utils/renderUtils";
import {resetPassword} from "../../actions/authActions";
import {Spinner} from "reactstrap";

class PasswordReset extends Component {

    static propTypes = {
        ...propTypes
    };

    render() {
        const { handleSubmit, error, submitting } = this.props;

        return (
            <div className="content">

                <form
                    className="col col-sm-3 card mt-5 p-2 ml-auto mr-auto"
                    onSubmit={handleSubmit}
                >
                    <h3 className="text-md-center">비밀번호 찾기</h3>
                    <hr/>

                    <fieldset className="form-group">
                        <Field name="email" label="가입한 이메일 주소를 입력해주세요" component={renderField}
                               type="text" validate={[required({message: "필수 입력사항입니다."})]}
                        />
                    </fieldset>
                    <div>
                        <small>
                        가입하신 이메일 주소를 입력해주시면<br/>
                        새로운 비밀번호를 설정 가능한 링크를 보내드립니다.
                        </small>
                    </div>

                    <fieldset className="form-group" >
                        { renderError(error) }
                        <button action="submit" className="btn btn-lg btn-info" style={{width: '100%'}} disabled={submitting}>
                            {submitting === true && (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />)
                            }
                            이메일 전송하기
                        </button>
                        {/*<button action="submit" className="btn btn-primary">Submit</button>*/}
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: "password_reset",
    onSubmit: resetPassword
})(PasswordReset);
