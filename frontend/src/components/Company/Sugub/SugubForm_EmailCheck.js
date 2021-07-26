import React, {useState} from 'react'
import {Field, initialize, reduxForm} from 'redux-form'
import {required} from "redux-form-validators"
import {renderAsyncCreatableSelectField, renderError, renderField,} from "../../../utils/renderUtils";
import axios from "axios";
import {AuthUrls} from "../../../constants/urls";
import {Card, CardBody, CardTitle, Spinner} from "reactstrap";
import AddOnCompanySignup from "../Auth/AddOnCompanySignup";
import LoaderSpinner from "../../Etc/LoaderSpinner";
import {sugubFormSubmit} from "../../../actions/sugubActions";
import CompanyProfileValidate from "../CompanyProfileValidate";
import {Loader} from "rsuite";
import {connect} from "react-redux";

const SugubFormEmailCheck = props => {
    const {handleSubmit, previousPage, error, submitting, nextPage} = props;
    const [auth, setAuth] = useState(false);
    const [existEmail, setExistEmail] = useState('');
    const [existCompanyProfile, setExistCompanyProfile] = useState(false);
    const [passwordInput, setPasswordInput] = useState(false);
    const [loading, setLoading] = useState(false);

    const emailCheck = (values) => {
        // values 값이 바뀔때만 되도록..
        setTimeout(() => {

            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values)) {
                axios
                    .get(AuthUrls.SIGNUP_CHECK, {
                        params: {
                            email_address: values
                        }
                    })
                    .then((response) => {
                        // console.log('response data:', response.data);
                        if (response.status == '200' && response.data.email == values) {
                            setPasswordInput(true);
                            setAuth(true);
                            setExistEmail(values);
                            if (response.data.company) {
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
                    채용진행 현황을 받으실 이메일 주소를 입력해주세요.<br/>
                    (아이디로도 사용됩니다)
                </CardTitle>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <fieldset className="form-group">
                            <Field name="email" label="이메일주소를 입력해주세요" component={renderField}
                                   type="text"
                                   required={true}
                                   value={existEmail}
                                   validate={[required({message: "필수 입력사항입니다."})]}
                                   onChange={(e) => {
                                       setLoading(true);
                                       emailCheck(e.target.value)
                                   }}
                                // validate={(values) => {
                                //     emailCheck(values)
                                //}}
                                // asyncValidate
                            />
                        </fieldset>


                        <div>
                            {loading ? (
                                    <>
                                        {/*<p>이메일을 확인중입니다...</p>*/}
                                        {/*<LoaderSpinner/>*/}
                                        <Loader content="이메일을 확인중입니다..." vertical />
                                    </>
                                ) :
                                (
                                    <>
                                        {/* 이미 가입했고 회사 정보 등록 완료*/}
                                        {passwordInput && existCompanyProfile === true &&
                                        <>
                                            <p>이미 등록된 이메일이 있었네요! 비밀번호를 입력해주세요.</p>
                                            <br/>
                                            <fieldset className="form-group">
                                                <Field name="password" label="패스워드" component={renderField}
                                                       type="password"
                                                       validate={[required({message: "필수 입력사항입니다."})]}
                                                />
                                            </fieldset>
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
                                            {/*<p>아래 정보를 추가로 입력해주시면 더 빠른 채용진행이 가능합니다.</p>*/}
                                            <fieldset className="form-group">
                                                <Field name="nickname" label="본인의 이름(실명)을 입력해주세요" component={renderField}
                                                       type="text"
                                                       required={true}
                                                />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <Field name="custname" label="회사이름" component={renderAsyncCreatableSelectField}
                                                       type="text"
                                                       required={true}
                                                       formName={'sugub_wizard'}
                                                       validate={[required({message: "필수 입력사항입니다."})]}
                                                />
                                            </fieldset>

                                            <fieldset className="form-group">
                                                <Field name="phone" component={renderField}
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
                                        </>
                                        }
                                    </>)}
                        </div>

                        {renderError(error)}

                        <hr/>
                        <div className="text-center">
                            {passwordInput &&
                            <>
                                <button type="button"
                                        className="btn btn-lg btn-outline-info" onClick={previousPage}>
                                    이전
                                </button>
                                <button action="submit"
                                        className="btn btn-lg btn-info" disabled={submitting}>
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

                            {!passwordInput && !auth && (
                                <button type="button"
                                        className="btn btn-lg btn-outline-info" onClick={previousPage}>
                                    이전
                                </button>
                            )}
                        </div>

                    </form>
                    {/* 새로 가입하는 경우*/}
                    {!passwordInput && auth &&
                    <AddOnCompanySignup nextPage={nextPage}/>
                    }
                </CardBody>
            </Card>
        </>
    )
};

const afterSubmit = (result, dispatch) => {
    // console.log('SugubFormEmailCheck result', result)
    // console.log('SugubFormEmailCheck dispatch', dispatch)
    dispatch(initialize('sugub_wizard', {}))
    dispatch(initialize('sugub_create_wizard', {}))
};


export default connect(null, {})(reduxForm({
    form: 'sugub_wizard',
    // enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate: CompanyProfileValidate,
    // onSubmit: loginUser,
    onSubmit: sugubFormSubmit,
    onSubmitSuccess: afterSubmit
})(SugubFormEmailCheck))
