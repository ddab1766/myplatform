// import React, {Component} from "react";
// // import PropTypes from "prop-types";
// import {Field, initialize, propTypes, reduxForm} from "redux-form";
// import {required} from "redux-form-validators"
// import {renderError, renderField} from "../../utils/renderUtils";
// import {getRecUser, getUserProfile, signupUser} from "../../actions/authActions";
// import {connect} from "react-redux";
// import {Container, Spinner} from "reactstrap";
// import validateSignup from "./Validate_SignupForm";
// import AuthSms from "./AuthSms";
//
// class PopupSignup extends Component {
//     static propTypes = {
//         ...propTypes
//     };
//
//     render() {
//         const {handleSubmit, error, submitting} = this.props;
//         return (
//             <Container>
//                 <form onSubmit={handleSubmit}>
//                     <h4 className="text-md-center">간편 지원</h4>
//                     <hr/>
//
//                     <fieldset className="form-group">
//                         <Field name="email" label="이메일＊" component={renderField}
//                                type="text" validate={[required({message: "필수입력값입니다."})]}/>
//                     </fieldset>
//
//                     <fieldset className="form-group">
//                         <Field name="password1" label="비밀번호＊" component={renderField}
//                                type="password"
//                         />
//                     </fieldset>
//
//                     <fieldset className="form-group">
//                         <Field name="password2" label="비밀번호 확인＊" component={renderField}
//                                type="password"
//                         />
//                     </fieldset>
//                     <fieldset className="form-group">
//                         <Field name="username" label="이름*" component={renderField}
//                                type="text"
//                         />
//                     </fieldset>
//                     {/*<fieldset className="form-group">
//                         <Field name="phone" label="휴대폰번호＊" component={renderField}
//                                type="text" placeholder={"ex) 010-0000-0000"}
//                         />
//                     </fieldset>*/}
//                     <fieldset className="form-group">
//                         <Field name="date_of_birth" label="생년월일" component={renderField}
//                                type="text" placeholder={"ex) 1989-09-06 "}
//                         />
//                     </fieldset>
//                     <AuthSms formName={'popup_signup_wizard'}/>
//
//                     {renderError(error)}
//                     <hr/>
//                     <p>회원가입 시 <a href="/HelpCenter/privacy" target="_blank">개인정보 처리방침</a>과 <a href="/HelpCenter/terms" target="_blank">이용약관</a>을 확인하였으며, <br/>동의합니다.</p>
//                     <hr/>
//                     <button action="submit" className="btn btn-primary" disabled={submitting}>
//                         {submitting === true && (
//                             <Spinner
//                                 as="span"
//                                 animation="border"
//                                 size="sm"
//                                 role="status"
//                                 aria-hidden="true"
//                             />)
//                         }
//                         지원하기
//                     </button>
//                 </form>
//             </Container>
//         );
//     }
// }
//
// function mapStateToProps(state, props) {
//     return {
//         initialValues: {
//             jobInfo: props.jobInfo,
//             //...state.form.signup_wizard.values,
//             recuser: state.auth.recUser,
//         },
//     }
// }
//
// const afterSubmit = (result, dispatch) => {
//     dispatch(initialize('popup_signup_wizard', {}));
// }
//
// export default connect(mapStateToProps, {getUserProfile, getRecUser})(reduxForm({
//     form: "popup_signup_wizard",
//     destroyOnUnmount: false,
//     // form: "AddOnSignup",
//     validate: validateSignup,
//     onSubmitSuccess: afterSubmit,
//     onSubmit: signupUser
// })(PopupSignup));
//
