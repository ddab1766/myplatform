import React, {Component, useState} from "react";
import {Field, propTypes, reduxForm} from "redux-form";
import {required} from "redux-form-validators"
import {confirmPasswordChange} from "../../actions/authActions";
import {renderError, renderField} from "../../utils/renderUtils";
import {Container, Modal, Spinner} from "reactstrap";
import PopupLogin from "./PopupLogin";
import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";

const PasswordChangeDone = (props) => {
    const [loginModal, setLoginModal] = useState(false);
    const toggleModalLogin = () => setLoginModal(!loginModal);
    return (
        <div className="content">
            {/*<Container>
                <Card>
                    <CardContent>
                        <div className="col-md-6 ml-auto mr-auto pt-lg-4">
                            <h4>비밀번호 변경완료</h4>
                            <hr/>
                            <div>
                                새로운 비밀번호로 변경되었습니다.<br/>
                                변경된 비밀번호로 로그인 해주세요.<br/>
                            </div>
                            <button className="btn btn-lg btn-info"
                                    onClick={(e) => e.preventDefault(toggleModalLogin())}
                            >로그인</button>
                        </div>
                    </CardContent>
                </Card>
                <Modal isOpen={loginModal} style={{width: '368px'}} toggle={toggleModalLogin}>
                    <PopupLogin loginSubmit={toggleModalLogin} toggle={toggleModalLogin} redirectUrl={'/'}/>
                </Modal>
            </Container>*/}
            <div className="row justify-content-center text-md-center">
                <form
                    className="col col-sm-4 card mt-5 p-2"
                >
                    <h4>비밀번호 변경완료</h4>
                    <hr/>
                    <div>
                        새로운 비밀번호로 변경되었습니다.<br/>
                        변경된 비밀번호로 로그인 해주세요.<br/>
                    </div>
                    <button className="btn btn-lg btn-info"
                            onClick={(e) => e.preventDefault(toggleModalLogin())}
                    >로그인</button>
                    <Modal isOpen={loginModal} style={{width: '368px'}} toggle={toggleModalLogin}>
                        <PopupLogin loginSubmit={toggleModalLogin} toggle={toggleModalLogin} redirectUrl={'/'}/>
                    </Modal>
                </form>
            </div>
        </div>
    );
}

export default PasswordChangeDone;

// Sync field level validation for password match
// const validateForm = values => {
//     const errors = {};
//     const { new_password1, new_password2 } = values;
//     if (new_password1 !== new_password2) {
//         errors.new_password2 = "Password does not match."
//     }
//     return errors;
// };
//
// export default reduxForm({
//     form: "password_reset_confirm",
//     onSubmit: confirmPasswordChange,
//     validate: validateForm
// })(PasswordChangeDone);
