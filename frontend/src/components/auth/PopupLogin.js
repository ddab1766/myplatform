import React, {useEffect, useState} from "react";
// import PropTypes from "prop-types";
import history from "utils/historyUtils";
import {Field, reduxForm} from "redux-form";
import {required} from "redux-form-validators"

import {renderError, renderField} from "../../utils/renderUtils";
import {getUserProfile, loginUser} from "../../actions/authActions";
import MyfacebookLogin from "./FacebookLogin";
import {Container, Spinner} from "reactstrap";
import MygoogleLogin from "./GoogleLogin";
import {Link} from "react-router-dom";


const PopupLogin = (props) => {
    const {handleSubmit, error, submitting, toggle, url} = props;
    const [path, setPath] = useState(url);
    console.log('PopupLogin props', props)
    useEffect(()=>{
        if(!url) setPath('Company')
    },[]);

    return (
        <Container>
            <form
                // className="col col-sm-4 card mt-5 p-4 m-3"
                onSubmit={handleSubmit}
            >
                <h4 className="text-md-center">로그인</h4>
                <hr/>

                <fieldset className="form-group">
                    <Field name="email" label="이메일" component={renderField}
                           type="text" validate={[required({message: "필수 입력사항입니다."})]}
                    />
                </fieldset>

                <fieldset className="form-group">
                    <Field name="password" label="패스워드" component={renderField}
                           type="password" validate={[required({message: "필수 입력사항입니다."})]}
                    />
                </fieldset>
                <Link to={`/Company/reset_password`} onClick={toggle}>비밀번호 찾기</Link>
                {renderError(error)}
                <div className="" >
                    <button type="submit" className="btn btn-info btn-lg" disabled={submitting}
                            style={{"width":"100%", "margin-top":"10px", "padding":"10px"}}
                    >
                        {submitting === true && (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />)
                        }
                        로그인
                    </button>
                </div>
                <hr/>

                {/*SNS 로그인*/}
                {/*<p className="text-center">Or</p>*/}
                {/*<MyKakaoLogin/>*/}
                {/*<MyNaverLogin/>*/}
                <p onClick={toggle}>
                    <MygoogleLogin/>
                </p>
                <p onClick={toggle}>
                    <MyfacebookLogin/>
                </p>
                <hr/>
                아직 회원이 아니세요?
                <Link to={`/${path}/signup`} onClick={toggle}>
                    {' '}회원가입
                </Link>

            </form>
            {/*</Row>*/}
        </Container>
    )
};



export default reduxForm({
    form: "popup_login",
    onSubmit: loginUser,
    onSubmitSuccess: (result, dispatch, props)=>{
        // loginSubmit 존재시
        if(props.loginSubmit) props.loginSubmit();
        if(props.redirectUrl) history.push(props.redirectUrl);
    }
})(PopupLogin);
