// import React, {Component} from "react";
// // import PropTypes from "prop-types";
// import {Field, propTypes, reduxForm} from "redux-form";
// import {Link} from "react-router-dom";
// import {required} from "redux-form-validators"
//
// import {renderError, renderField} from "../../utils/renderUtils";
// import {loginUser} from "../../actions/authActions";
// import MyfacebookLogin from "./FacebookLogin";
// import {Container, Row, Spinner} from "reactstrap";
// import MygoogleLogin from "./GoogleLogin";
//
// // import GoogleLogin from "react-google-login";
//
// class Login extends Component {
//
//     static propTypes = {
//         ...propTypes
//     };
//
//     render() {
//         const {handleSubmit, error, submitting} = this.props;
//         console.log(this.props)
//
//         return (
//             <Container>
//                 <Row className="row justify-content-center">
//                     <form
//                         className="col col-sm-4 card mt-5"
//                         onSubmit={handleSubmit}
//                     >
//                         <h4 className="text-md-center">로그인</h4>
//                         <hr/>
//
//                         <fieldset className="form-group">
//                             <Field name="email" label="Email" component={renderField}
//                                    type="text" validate={[required({message: "필수 입력사항입니다."})]}
//                             />
//                         </fieldset>
//
//                         <fieldset className="form-group">
//                             <Field name="password" label="Password" component={renderField}
//                                    type="password" validate={[required({message: "필수 입력사항입니다."})]}
//                             />
//                         </fieldset>
//                         {renderError(error)}
//
//                         <button type="submit" className="btn btn-primary" disabled={submitting}>
//                             {submitting === true && (
//                                 <Spinner
//                                     as="span"
//                                     animation="border"
//                                     size="sm"
//                                     role="status"
//                                     aria-hidden="true"
//                                 />)
//                             }
//                             로그인
//                         </button>
//                         <hr/>
//
//                         {/*SNS 로그인*/}
//                         <p className="text-center">Or</p>
//                             {/*<MyKakaoLogin/>*/}
//                             <MygoogleLogin/>
//                             <MyfacebookLogin/>
//                             {/*<MyNaverLogin/>*/}
//                         <hr/>
//                         <p>아직 회원이 아니세요? <Link to="/User/signup">회원가입</Link></p>
//                         <Link to="/User/reset_password">비밀번호 찾기</Link>
//                     </form>
//                 </Row>
//             </Container>
//         )
//     }
// }
//
// export default reduxForm({
//     form: "login",
//     onSubmit: loginUser,
// })(Login);
