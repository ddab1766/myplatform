import React, {useState} from 'react'
import {Field, initialize, reduxForm} from 'redux-form'
import {required} from "redux-form-validators"
import {renderAsyncCreatableSelectField, renderField,} from "../../utils/renderUtils";
import axios from "axios";
import {AuthUrls} from "../../constants/urls";
import {Card, CardBody, CardTitle, Spinner} from "reactstrap";
import {hrSpecialFormSubmit} from "../../actions/authActions";
import LoaderSpinner from "../Etc/LoaderSpinner";
import AddOnHrSignup from "../auth/AddOnHrSignup";

const HrProfileFormEmailCheck = props => {
    const {handleSubmit, previousPage, error, submitting, nextPage} = props;
    const [auth, setAuth] = useState(false);
    const [existEmail, setExistEmail] = useState('');
    const [existCompanyProfile, setExistCompanyProfile] = useState(false);
    const [passwordInput, setPasswordInput] = useState(false);
    const [loading, setLoading] = useState(false);

    const emailCheck = (values) => {
        // values 값이 바뀔때만 되도록..
        setTimeout(() => {
            setLoading(true);
            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values)) {
                axios
                    .get(AuthUrls.SIGNUP_CHECK, {
                        params: {
                            email_address: values,
                            check_profile: 'hr'
                        }
                    })
                    .then((response) => {
                        console.log('response data:', response.data);
                        if (response.status == '200' && response.data.email == values) {
                            setPasswordInput(true);
                            setAuth(true);
                            setExistEmail(values);
                            if (response.data.hr) {
                                props.change('id', response.data.hr.id);
                                setExistCompanyProfile(true);
                            } else {
                                setExistCompanyProfile(false);
                            }
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
                    });
            } else {
                //return '올바른 이메일 주소를 입력해주세요.'
            }
        }, 1000)
    };

    return (
        <>
            <Card className="card card-sugub">
                <CardTitle>
                    수급정보를 받으실 이메일 주소를 입력해주세요.<br/>
                    (아이디로도 사용됩니다)
                </CardTitle>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <fieldset className="form-group">
                            <Field name="email" label="이메일을 입력해주세요" component={renderField}
                                   type="text"
                                   required={true}
                                   value={existEmail}
                                   onChange={(e) => {
                                       emailCheck(e.target.value)
                                   }}
                            />
                        </fieldset>

                        <div>
                            {loading ? (<LoaderSpinner/>) : (<>
                                {/* 이미 가입했고 회사 정보 등록 완료*/}
                                {passwordInput && existCompanyProfile === true &&
                                <>
                                    <p>이미 등록된 이메일이 있었네요! 비밀번호를 입력해주세요.</p>
                                    {/*<AddOnLogin/>*/}
                                    <fieldset className="form-group">
                                        <Field name="password" label="패스워드" component={renderField}
                                               type="password"
                                               validate={[required({message: "필수 입력사항입니다."})]}
                                        />
                                    </fieldset>
                                    {/*<button type="button" className="btn btn-primary" onClick={previousPage}>*/}
                                    {/*    이전*/}
                                    {/*</button>*/}
                                    {/*{renderError(error)}*/}
                                    {/*<button action="submit" className="btn btn-primary" disabled={submitting}>*/}
                                    {/*    {submitting === true && (*/}
                                    {/*        <Spinner*/}
                                    {/*            as="span"*/}
                                    {/*            animation="border"*/}
                                    {/*            size="sm"*/}
                                    {/*            role="status"*/}
                                    {/*            aria-hidden="true"*/}
                                    {/*        />)*/}
                                    {/*    }*/}
                                    {/*    <span className="btn-label">*/}
                                    {/*  <i className="nc-icon nc-check-2" />*/}
                                    {/*</span>등록하기*/}
                                    {/*</button>*/}
                                </>
                                }
                                {/* 이미 가입했지만 회사 정보 등록 안함*/}
                                {passwordInput && existCompanyProfile === false &&
                                <>
                                    <p>이미 등록된 이메일이 있었네요! 비밀번호를 입력해주세요.</p>
                                    <fieldset className="form-group">
                                        <Field name="password" label="패스워드" component={renderField}
                                               type="password"
                                               validate={[required({message: "필수 입력사항입니다."})]}
                                        />
                                    </fieldset>
                                    <hr/>
                                    <p>아래 정보를 추가로 입력해주시면 빠르게 수급을 추천 받아보실 수 있습니다.</p>
                                    <fieldset className="form-group">
                                        <Field name="custname" label="회사명" component={renderAsyncCreatableSelectField}
                                               type="text"
                                               required={true}
                                               validate={[required({message: "필수 입력사항입니다."})]}
                                        />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <Field name="manager_phone" component={renderField}
                                               label="담당자 연락처"
                                               type="text"
                                               required={true}
                                               validate={[required({message: "필수 입력사항입니다."})]}
                                        />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <Field name="custid" label="사업자번호" component={renderField}
                                               type="text"
                                        />
                                    </fieldset>

                                    {/*{renderError(error)}*/}

                                    {/*<button type="button" className="btn btn-primary" onClick={previousPage}>*/}
                                    {/*    이전*/}
                                    {/*</button>*/}

                                    {/*<button action="submit" className="btn btn-primary" disabled={submitting}>*/}
                                    {/*    {submitting === true && (*/}
                                    {/*        <Spinner*/}
                                    {/*            as="span"*/}
                                    {/*            animation="border"*/}
                                    {/*            size="sm"*/}
                                    {/*            role="status"*/}
                                    {/*            aria-hidden="true"*/}
                                    {/*        />)*/}
                                    {/*    }*/}
                                    {/*    로그인+등록하기*/}
                                    {/*</button>*/}
                                </>
                                }
                            </>)}

                        </div>

                        <hr/>
                        {passwordInput &&
                        <>
                            <button type="button"
                                    className="btn btn-lg btn-outline-primary" onClick={previousPage}>
                                이전
                            </button>
                            < button action="submit"
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
                        </>
                        }
                    </form>
                    {/* 새로 가입하는 경우*/}
                    {!passwordInput && auth &&
                    <AddOnHrSignup nextPage={nextPage}/>
                    }
                </CardBody>
            </Card>
        </>
    )
};

const afterSubmit = (result, dispatch) => {
    // console.log('SugubFormEmailCheck result', result)
    // dispatch(initialize('sugub_wizard', {}))
    // dispatch(initialize('sugub_create_wizard', {}))
    dispatch(initialize('hr_profile_wizard', {}))
    // history.push("/Hr/Profile");
}


export default reduxForm({
    form: 'hr_profile_wizard',
    // enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    // onSubmit: loginUser,
    onSubmit: hrSpecialFormSubmit,
    onSubmitSuccess: afterSubmit
})(HrProfileFormEmailCheck)