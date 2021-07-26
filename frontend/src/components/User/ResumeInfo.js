// import React, {useEffect, useState} from "react";
// import {Card, CardBody, Col, Container, Progress, Row, Spinner,} from "reactstrap";
//
// import {getUserProfile} from "../../actions/authActions";
// import {connect} from "react-redux";
// import Career from "./Career";
// import {Field, reduxForm} from "redux-form";
// import {renderError, renderField, renderTextAreaField} from "../../utils/renderUtils";
// import Education from "./Education";
// import axios from "axios";
// import {getResume, updateUserResume} from "../../actions/userActions";
// import {AuthUrls} from "../../constants/urls";
// import {PDFDownloadLink} from "@react-pdf/renderer";
// import ResumeDocument from "./ResumeDocument";
// import Validate_ResumeForm from "./Validate_ResumeForm";
// import ReactBSAlert from "react-bootstrap-sweetalert";
// import Language from "./Language";
// import history from "../../utils/historyUtils";
//
//
// const ResumeInfo = (props) => {
//     const {handleSubmit, submitting, error} = props;
//     const [careers, setCareers] = useState([]);
//     const [edus, setEdus] = useState([]);
//     const [languages, setLanguages] = useState([]);
//     const [removeAlert, setRemoveAlert] = useState(null);
//
//     const {user} = props;
//     const resume = props.location.state.resume;
//     const [onClicked,setOnClicked] = useState(false);
//     const clickHandler = (key) => {
//         setOnClicked(true);
//     };
//
//     useEffect(()=>{
//         if(!user) props.getUserProfile();
//         let param = {};
//         param.id = resume.id;
//         getResume(param).then((data)=>{
//             setCareers(data[0].careers);
//             setEdus(data[0].educations);
//             setLanguages(data[0].languages)
//         })
//     },[user]);
//
//
//     /* 경력추가 */
//     const onAddCareerBtnClick = e => {
//         axios
//             .post(AuthUrls.CAREER,
//                 {
//                     resume: props.match.params.resumeid
//                 })
//             .then(({data}) => {
//                 (
//                     setCareers(careers.concat(data))
//                 )
//             })
//     };
//     /* 학력추가 */
//     const onAddEduBtnClick = e => {
//         axios
//             .post(AuthUrls.EDUCATION,
//                 {
//                     resume: props.match.params.resumeid
//                 })
//             .then(({data}) => {
//                 setEdus(edus.concat(data));
//             })
//     };
//     /* 외국어 */
//     const onAddLanguageBtnClick = e => {
//         axios
//             .post(AuthUrls.LANGUAGE,
//                 {
//                     resume: props.match.params.resumeid
//                 })
//             .then(({data}) => {
//                 setLanguages(languages.concat(data));
//             })
//     };
//
//     const warningWithConfirmMessage = (list, gubun) => {
//         if (gubun === 'career') {
//             setRemoveAlert(
//                 (
//                     <ReactBSAlert
//                         warning
//                         style={{display: "block", marginTop: "100px"}}
//                         title="해당 경력을 삭제하시겠습니까?"
//                         onConfirm={() => successDelete(list, gubun)}
//                         onCancel={() => hideAlert()}
//                         confirmBtnBsStyle="info"
//                         cancelBtnBsStyle="danger"
//                         confirmBtnText="삭제"
//                         cancelBtnText="취소"
//                         showCancel
//                     >
//                         삭제시 복구할 수 없습니다.
//                     </ReactBSAlert>
//                 )
//             );
//         } else if (gubun === 'education') {
//             setRemoveAlert(
//                 (
//                     <ReactBSAlert
//                         warning
//                         style={{display: "block", marginTop: "100px"}}
//                         title="해당 학력을 삭제하시겠습니까?"
//                         onConfirm={() => successDelete(list, gubun)}
//                         onCancel={() => hideAlert()}
//                         confirmBtnBsStyle="info"
//                         cancelBtnBsStyle="danger"
//                         confirmBtnText="삭제"
//                         cancelBtnText="취소"
//                         showCancel
//                     >
//                         삭제시 복구할 수 없습니다.
//                     </ReactBSAlert>
//                 )
//             );
//         } else if (gubun === 'language'){
//             setRemoveAlert(
//                 (
//                     <ReactBSAlert
//                         warning
//                         style={{display: "block", marginTop: "100px"}}
//                         title="해당 외국어 정보를 삭제하시겠습니까?"
//                         onConfirm={() => successDelete(list, gubun)}
//                         onCancel={() => hideAlert()}
//                         confirmBtnBsStyle="info"
//                         cancelBtnBsStyle="danger"
//                         confirmBtnText="삭제"
//                         cancelBtnText="취소"
//                         showCancel
//                     >
//                         삭제시 복구할 수 없습니다.
//                     </ReactBSAlert>
//                 )
//             );
//         }
//     };
//
//     const hideAlert = () => setRemoveAlert(null);
//
//     const successDelete = (list, gubun) => {
//         if (gubun === 'career') {
//             axios
//                 .delete(AuthUrls.CAREER + list.id + '/')
//                 .then((res) => {
//                     // setSpecial([]);
//                     setCareers(careers.filter(value => value !== list))
//                     setRemoveAlert(
//                         (
//                             <ReactBSAlert
//                                 success
//                                 style={{display: "block", marginTop: "100px"}}
//                                 title="경력이 삭제되었습니다!"
//                                 onConfirm={() => hideAlert()}
//                                 onCancel={() => hideAlert()}
//                                 confirmBtnBsStyle="info"
//                             >
//                                 {/*Your imaginary file has been deleted.*/}
//                             </ReactBSAlert>
//                         )
//                     );
//                 });
//         } else if (gubun === 'education') {
//             axios
//                 .delete(AuthUrls.EDUCATION + list.id + '/')
//                 .then((res) => {
//                     setEdus(edus.filter(value => {
//                         console.log( 'edus value:', value)
//                         console.log( 'list:', list)
//                         return value !== list
//                     }))
//                     setRemoveAlert(
//                         (
//                             <ReactBSAlert
//                                 success
//                                 style={{display: "block", marginTop: "100px"}}
//                                 title="학력이 삭제되었습니다!"
//                                 onConfirm={() => hideAlert()}
//                                 onCancel={() => hideAlert()}
//                                 confirmBtnBsStyle="info"
//                             >
//                                 {/*Your imaginary file has been deleted.*/}
//                             </ReactBSAlert>
//                         )
//                     );
//                 });
//         } else if ( gubun === 'language') {
//             axios
//                 .delete(AuthUrls.LANGUAGE + list.id + '/')
//                 .then((res) => {
//                     setLanguages(languages.filter(value => {
//                         return value !== list
//                     }))
//                     setRemoveAlert(
//                         (
//                             <ReactBSAlert
//                                 success
//                                 style={{display: "block", marginTop: "100px"}}
//                                 title="외국어가 삭제되었습니다!"
//                                 onConfirm={() => hideAlert()}
//                                 onCancel={() => hideAlert()}
//                                 confirmBtnBsStyle="info"
//                             >
//                                 {/*Your imaginary file has been deleted.*/}
//                             </ReactBSAlert>
//                         )
//                     );
//                 });
//         }
//         // props.getResume()
//     };
//
//     return (
//         <>
//             <Container>
//                 <div className="title">
//                     <h3>
//                         이력서 상세<br/>
//                         <small>추천인/후보자들에게 좋은 일자리를 제공하기 위해, 다음 정보를 입력하면 매칭 확률이 올라갑니다.<br/></small>
//                         <div className="progress-container">
//                             <span className="progress-badge"><small>완성도</small></span>
//                             <Progress max="50" value="30" barClassName="progress-bar-success">
//                                 <span className="progress-value" ></span>
//                             </Progress>
//                         </div>
//                     </h3>
//
//                     {/* 생성 후 바로 다운로드 되도록 수정 必 */}
//                     {resume && onClicked ?
//                         (
//                             <PDFDownloadLink
//                                 document={<ResumeDocument resume={resume}/>}
//                                 fileName={resume.resume_username + '_' + resume.resume_phone + '.pdf'}
//                                 style={{
//                                     textDecoration: "none",
//                                     padding: "10px",
//                                     color: "#4a4a4a",
//                                     backgroundColor: "#f2f2f2",
//                                     border: "1px solid #4a4a4a"
//                                 }}
//                             >
//                                 {({blob, url, loading, error}) =>
//                                     loading ? "PDF 생성중..." : "PDF 다운로드" + ""
//                                 }
//                             </PDFDownloadLink>
//                         ) : <button className="btn" onClick={()=>clickHandler()}>PDF생성</button>}
//                 </div>
//                 <hr/>
//                 <h5><small>기본사항</small></h5>
//                 <form className="mx-3" onSubmit={handleSubmit}>
//                     <Card className="card">
//                         <CardBody>
//                             <Row>
//                                 <Col md="10">
//                                     <fieldset className="form-group">
//                                         <Field name="resume_title" label="제목*" component={renderField}
//                                                type="text"
//                                         />
//                                     </fieldset>
//                                     <fieldset className="form-group">
//                                         <Field name="resume_username" label="이름*" component={renderField}
//                                                type="text"
//                                         />
//                                     </fieldset>
//                                     <fieldset className="form-group">
//                                         <Field name="resume_phone" label="연락처* ( ' - ' 없이 입력)" component={renderField}
//                                                type="text" placeholder={'ex) 01099999999'}
//                                         />
//                                     </fieldset>
//                                     <fieldset className="form-group">
//                                         <Field name="resume_birth" label="생년월일*" component={renderField}
//                                                type="text" placeholder={'ex) 19991205'}
//                                         />
//                                     </fieldset>
//                                     <fieldset className="form-group">
//                                         <Field name="introduce" label="간단소개글" component={renderTextAreaField}
//                                                type="text" placeholder={'ex) 웹개발 10년차입니다.'}
//                                         />
//                                     </fieldset>
//                                 </Col>
//
//                                 <fieldset className="col-md-2 ml-auto">
//                                     {renderError(error)}
//                                     <button type="submit" className="btn" disabled={submitting}>
//                                         {submitting === true && (
//                                             <Spinner
//                                                 as="span"
//                                                 animation="border"
//                                                 size="sm"
//                                                 role="status"
//                                                 aria-hidden="true"
//                                             />)
//                                         }
//                                         저장
//                                     </button>
//                                     {/*<button action="submit" className="btn btn-primary">저장</button>*/}
//                                 </fieldset>
//
//                             </Row>
//                         </CardBody>
//                     </Card>
//                 </form>
//                 <h5><small>경력</small></h5>
//                 {careers.map((career, index) => (
//                     (
//                         <>
//                             <Career key={index} form={`AddCareerForm_${index}`} info={career}
//                                     deleteBtn={warningWithConfirmMessage}
//                                     removeAlert={removeAlert}
//                             />
//                             {/*<Button onClick={onDeleteCareerBtnClick(career.id)}>삭제</Button>*/}
//                         </>
//                     )
//                 ))}
//                 {/*{careerInput}*/}
//                 <button
//                     className="btn"
//                     onClick={onAddCareerBtnClick}>추가
//                 </button>
//                 <hr/>
//                 <h5><small>학력</small></h5>
//                 {edus.map((edu, index) => (
//                     <Education key={index} form={`AddEduForm_${index}`} info={edu}
//                                deleteBtn={warningWithConfirmMessage}
//                                removeAlert={removeAlert}
//                     />
//                 ))}
//                 {/*{eduInput}*/}
//                 <button
//                     className="btn"
//                     onClick={onAddEduBtnClick}>추가
//                 </button>
//                 {/*<hr/>
//                 <h5><small>수상 및 기타</small></h5>
//                 <hr/>
//                 <h5><small>주요성과</small></h5>
//                 */}
//                 <hr/>
//                 <h5><small>외국어</small></h5>
//                 {languages.map((language, index) => (
//                     <Language key={index} form={`AddLanguageForm_${index}`} info={language}
//                               deleteBtn={warningWithConfirmMessage}
//                               removeAlert={removeAlert}
//                     />
//                 ))}
//                 <button
//                     className="btn"
//                     onClick={onAddLanguageBtnClick}>추가
//                 </button>
//                 <hr/>
//                 <div className="">
//                     <button type="button" className="btn btn-primary" onClick={() => history.goBack()}>뒤로가기</button>
//                 </div>
//             </Container>
//         </>
//     )
// }
//
// function mapStateToProps(state, props) {
//     return {
//         initialValues: {
//             resume_id: props.location.state.resume.id,
//             resume_title: props.location.state.resume.resume_title,
//             resume_username: props.location.state.resume.resume_username,
//             resume_birth: props.location.state.resume.resume_birth,
//             resume_phone: props.location.state.resume.resume_phone,
//             introduce: props.location.state.resume.introduce,
//             userspecial: props.location.state.resume.userspecial
//         },
//         user: state.auth.user
//     }
// }
//
// export default connect(mapStateToProps, {getUserProfile})(reduxForm({
//     form: "update_user_resume",
//     // fields: ["text"],
//     onSubmit: updateUserResume,
//     validate: Validate_ResumeForm
// })(ResumeInfo));
//
//
// // export default connect(mapStateToProps, { getUserProfile } )(ResumeInfo);
//
