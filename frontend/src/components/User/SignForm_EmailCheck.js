import React, {useState} from 'react'
import {Field, initialize, reduxForm} from 'redux-form'
import {renderError, renderField,} from "../../utils/renderUtils";
import axios from "axios";
import {AuthUrls} from "../../constants/urls";
import {loginUser} from "../../actions/authActions";
import AddOnSignup from "../auth/AddOnSignup";
import {Card, CardBody, CardTitle, Col, FormText, Spinner} from "reactstrap";
import LoaderSpinner from "../Etc/LoaderSpinner";

const SignFormEmailCheck = props => {
    const {handleSubmit, previousPage, error, submitting} = props;
    const [auth, setAuth] = useState(false);
    const [existEmail, setExistEmail] = useState('');
    const [passwordInput, setPasswordInput] = useState(false);
    const [loading, setLoading] = useState(false);

    const emailCheck = (values) => {
        setTimeout(() => {
            setLoading(true);
            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values)) {
                axios
                    .get(AuthUrls.SIGNUP_CHECK, {
                        params: {
                            email_address: values
                        }
                    })
                    .then((response) => {

                        if (response.status == '200' && response.data.email == values) {
                            setPasswordInput(true);
                            setAuth(true);
                            setExistEmail(values);
                        }else if ( response.status == '404'){
                            setPasswordInput(false);
                            setAuth(true);
                        }
                        setLoading(false)
                    })
                    .catch((error) => {
                        setPasswordInput(false);
                        setAuth(true);
                        setLoading(false)
                        // const processedError = processServerError(error.response.data);
                        //  throw new SubmissionError(error);
                    });
            } else {
                //return '올바른 이메일 주소를 입력해주세요.'
            }
        }, 500)
    };

    return (
        <>
            <form onSubmit={handleSubmit}
            >
                <Card className="card card-plain">
                    <CardTitle>채용정보를 받으실 이메일 주소를 입력해주세요.(아이디로도 사용됩니다)</CardTitle>
                    <CardBody>
                        <fieldset className="form-group">
                            <Field name="email" label="이메일＊" component={renderField}
                                   type="text"
                                   value={existEmail}
                                   onChange={(e) => {
                                       emailCheck(e.target.value)
                                   }}
                            />
                        </fieldset>
                        {loading ? (<LoaderSpinner/>) : (
                            <>
                                {/* 이미 가입한 경우*/}
                                {passwordInput &&
                                <>
                                    <FormText>이미 등록된 이메일이 있었네요! 비밀번호를 입력해주세요.</FormText>
                                    {/*<AddOnLogin/>*/}
                                    <fieldset className="form-group">
                                        <Field name="password" label="패스워드" component={renderField}
                                               type="password"
                                        />
                                    </fieldset>
                                    {renderError(error)}
                                    <Col className="text-center" md="12">
                                        <button type="button" className="btn btn-outline-primary" onClick={previousPage}>
                                            <span className="btn-label">
                                                <i className="nc-icon nc-minimal-left" />
                                            </span>
                                            이전
                                        </button>

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
                                </>
                                }
                            </>
                        )}

                    </CardBody>
                </Card>
            </form>
            {/* 새로 가입하는 경우*/}
            {!passwordInput && auth &&
            <AddOnSignup/>
            }
        </>
    )
};


const afterSubmit = (result, dispatch) => {
    dispatch(initialize('signup_wizard', {}));

};

// Sync field level validation for password match
const validate = values => {
    const errors = {};
    const {password1, password2} = values;
    if (password1 !== password2) {
        errors.password2 = "비밀번호가 같지 않습니다."
    }
    return errors;
};

// function mapStateToProps(state, props) {
//     console.log('mapStateToProps:', props)
//     return {
//     }
// }
// export default connect(mapStateToProps)(reduxForm({
//     form: 'signup_wizard',
//     destroyOnUnmount: false,
//     forceUnregisterOnUnmount: true,
//     onSubmit: loginUser,
//     onSubmitSuccess: afterSubmit,
// })(SignFormEmailCheck))

export default reduxForm({
    form: 'signup_wizard',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: loginUser,
    onSubmitSuccess: afterSubmit,
})(SignFormEmailCheck)