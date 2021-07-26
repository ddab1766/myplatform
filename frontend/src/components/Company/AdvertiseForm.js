// import React, {useState} from 'react'
// import {Field, reduxForm} from 'redux-form'
// import {renderError} from "utils/renderUtils";
// import {connect} from "react-redux";
// import {getUserProfile} from "../../actions/authActions";
// import {updateJobAd} from "../../actions/sugubActions";
// import {Col, Container, Row, Spinner} from "reactstrap";
// import {renderCheckboxField} from "../../utils/renderUtils";
// import JobQuestion from "./JobQuestion";
// import history from "utils/historyUtils";
//
//
// const AdvertiseForm = props => {
//     const {handleSubmit, error, submitting} = props;
//     const [page, setPage] = useState(1);
//     const [jobQuestions, setJobQuestions] = useState([]);
//
//     /* 항목추가 */
//     const onAddQuestion = e => {
//         e.preventDefault();
//         setJobQuestions(jobQuestions.concat(<JobQuestion/>))
//     };
//
//     const onDeleteQuestion = (e, value) => {
//         console.log('onDeleteQuestion')
//         e.preventDefault();
//         console.log(e, value)
//     };
//     // console.log('AdvertiseForm props', props)
//
//     return (
//
//         <form onSubmit={handleSubmit}>
//
//             <Container>
//                 <div className="content">
//                     <form
//                         className="mx-3"
//                         onSubmit={handleSubmit}
//                     >
//                         <h3 className="title">접수요청<br/>
//                             <small>
//                                 접수요청을 하면 1차적으로 채용 전문가가 의뢰서를 검토하게 됩니다.<br/>
//                                 그 후 파트너스(써치펌)에게 의뢰서 내역이 공개되고, 이력서 접수가 시작됩니다.<br/>
//                                 요청하신 의뢰내역에 민감한 정보가 포함될 수 있으므로, 아래 정보의 공개 여부 확인 후 요청버튼을 클릭 해주세요.<br/>
//                                 해당 체크내역은 HR전문회사(써치펌)에게만 보여지게 됩니다.
//                             </small>
//                         </h3>
//                         {/*<div className="info">*/}
//                         {/*    게시요청이란?<br/>*/}
//                         {/*    게시가 되면 파견사용주에서 해당 내역을 확인할 수 있고, 이력서 접수가 시작되게 됩니다.<br/>*/}
//                         {/*    요청하신 수급에 민간한 정보가 포함될 수 있으므로, 아래 정보의 공개여부 확인 후 요청버튼을 클릭 해주시면<br/>*/}
//                         {/*    내부 담당자가 확인 후 진행하도록 하겠습니다.*/}
//                         {/*</div>*/}
//
//                         <Row>
//                             <Col className="checkbox-radios" sm="10">
//                                 <fieldset className="form-group">
//                                     <Field name="company_name_yn" label="회사명 공개" component={renderCheckboxField}
//                                            type="checkbox"
//                                            // required={true}
//                                     />
//                                 </fieldset>
//                             </Col>
//                             <Col className="checkbox-radios" sm="10">
//                                 <fieldset className="form-group">
//                                     <Field name="main_work_yn" label="메인업무 공개" component={renderCheckboxField}
//                                            type="checkbox" //defaultChecked={true}
//                                     />
//                                 </fieldset>
//                             </Col>
//                             <Col className="checkbox-radios" sm="10">
//                                 <fieldset className="form-group">
//                                     <Field name="dpt_name_yn" label="부서명 공개" component={renderCheckboxField}
//                                            type="checkbox" //defaultChecked={true}
//                                     />
//                                 </fieldset>
//                             </Col>
//                             <Col className="checkbox-radios" sm="10">
//                                 <fieldset className="form-group">
//                                     <Field name="salary_yn" label="급여 공개" component={renderCheckboxField}
//                                            type="checkbox" //defaultChecked={true}
//                                     />
//                                 </fieldset>
//                             </Col>
//                             <Col className="checkbox-radios" sm="10">
//                                 <fieldset className="form-group">
//                                     <Field name="condition_yn" label="자격조건 공개" component={renderCheckboxField}
//                                            type="checkbox" //defaultChecked={true}
//                                     />
//                                 </fieldset>
//                             </Col>
//                             <Col className="checkbox-radios" sm="10">
//                                 <fieldset className="form-group">
//                                     <Field name="special_condition_yn" label="우대조건 공개" component={renderCheckboxField}
//                                            type="checkbox" //defaultChecked={true}
//                                     />
//                                 </fieldset>
//                             </Col>
//                             <Col className="checkbox-radios" sm="10">
//                                 <fieldset className="form-group">
//                                     <Field name="welfare_yn" label="혜택 및 복지 공개" component={renderCheckboxField}
//                                            type="checkbox" //defaultChecked={true}
//                                     />
//                                 </fieldset>
//                             </Col>
//                             <Col className="checkbox-radios" sm="10">
//                                 <fieldset className="form-group">
//                                     <Field name="location_yn" label="회사위치 공개" component={renderCheckboxField}
//                                            type="checkbox" //defaultChecked={true}
//                                     />
//                                 </fieldset>
//                             </Col>
//                         </Row>
//
//                         <hr/>
//
//                         <Col className="ml-auto centered">
//                             <fieldset className="form-group">
//                                 <button type="button" className="btn btn-lg btn-outline-info"
//                                         onClick={(e)=>history.goBack()}>
//                                     이전
//                                 </button>
//                                 <button action="submit" className="btn btn-lg btn-info" disabled={submitting}>
//                                     {submitting === true && (
//                                         <Spinner
//                                             as="span"
//                                             animation="border"
//                                             size="sm"
//                                             role="status"
//                                             aria-hidden="true"
//                                         />)
//                                     }요청
//                                 </button>
//                             </fieldset>
//                         </Col>
//                         {renderError(error)}
//                     </form>
//                 </div>
//             </Container>
//         </form>
//     )
// }
//
// function mapStateToProps(state, props) {
//     // console.log('props.location.state', props.location.state)
//     if(props)
//         return {
//             initialValues: {
//                 sugub: props.match.params.sugubid
//             }
//         }
//     // if(props.location.state){
//     //     return {
//     //         initialValues: props.location.state.jobadvertise
//     //     }
//     // }else {
//     //     return {
//     //         initialValues: {
//     //             sugub: props.match.params.sugubid
//     //         }
//     //     }
//     // }
// }
//
// export default connect(mapStateToProps, {getUserProfile})(reduxForm({
//     form: "update_job_advertise",
//     enableReinitialize: true,
//     destroyOnUnmount: false,
//     forceUnregisterOnUnmount: true,
//     onSubmit: updateJobAd
// })(AdvertiseForm));
//
// // export default connect(mapStateToProps)(reduxForm({
// //     form: 'sugub_wizard',
// //     destroyOnUnmount: false,
// //     forceUnregisterOnUnmount: true,
// //     validate
// // })(AdvertiseForm))
