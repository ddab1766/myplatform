// import React, {useEffect, useState} from 'react'
// import {Field, reduxForm} from 'redux-form'
// import history from "../../../utils/historyUtils";
// import {renderField, renderSelectField, renderTextAreaField, SelectField} from "../../../utils/renderUtils_mng";
// import axios from 'axios';
// import {AuthUrls, vUrls} from "../../../constants/urls";
// import {connect} from "react-redux";
// import {Form} from "reactstrap";
// import store from "../../../store";
//
// const JobApEditForm = (props) => {
//     const { handleSubmit } = props
//     const [ comCode, setComcode ] = useState([]);
//     const [ jobads, setJobads ] = useState([]);
//     const [ users, setUsers ] = useState([]);
//     const [ companys, setCompanys ] = useState([]);
//     useEffect(()=>{
//         setComcode(store.getState().comcode.comcode);
//     },[]);
//     useEffect(()=>{
//         // 공고리스트 셀렉 옵션
//         axios.get(vUrls.JOB_ADVERTISE, {})
//             .then( ({data}) => {
//                 console.log(data);
//                 setJobads(data);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//         // 사용자 셀렉 옵션
//         axios.get(AuthUrls.USER, '')
//             .then( ({data}) => {
//                 setUsers(data);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//         //기업명 셀렉 옵션
//         axios.get(vUrls.CUSTOM_COMPANY_PROFILE, '')
//             .then( ({data}) => {
//                 setCompanys(data);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     },[]);
//
//     return (
//         <>
//         {comCode && comCode.length > 0 && (
//                 <Form onSubmit={handleSubmit} >
//                     <Field
//                         name="jobadvertise"
//                         label="채용공고"
//                         options={jobads}
//                         component={SelectField}
//                         selectLabel="jobadvertise_title"
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <Field
//                         name="user"
//                         label="사용자"
//                         options={users}
//                         component={SelectField}
//                         selectLabel="email"
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <Field
//                         name="resume"
//                         label="이력서"
//                         component={renderField}
//                         type="text"
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <Field
//                         name="urlkey"
//                         label="유입URL"
//                         component={renderField}
//                         type="text"
//                         disabled={true}
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <Field
//                         name="applied_at"
//                         label="지원시간"
//                         component={renderField}
//                         type="text"
//                         disabled={true}
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <Field
//                         name="applied_status"
//                         label="지원자 상태"
//                         component={renderSelectField}
//                         code_topidx="BW"
//                         code_topcd={null}
//                         options={comCode}
//                         disableOption="--"
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     {/* <Field
//                         name="resume_pdf"
//                         component={renderField}
//                         label="이력서PDF"
//                         type="text"
//                     /> */}
//                     <Field
//                         name="resume_filename"
//                         component={renderField}
//                         label="파일명"
//                         type="text"
//                         disabled={true}
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <Field
//                         name="companyprofile"
//                         label="지원경로"
//                         options={companys}
//                         component={SelectField}
//                         selectLabel="custname"
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <Field
//                         name="non_username"
//                         component={renderField}
//                         label="비회원 이름"
//                         type="text"
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <Field
//                         name="non_phone"
//                         component={renderField}
//                         label="비회원 연락처"
//                         type="text"
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <Field
//                         name="non_birth"
//                         component={renderField}
//                         label="비회원 생년월일"
//                         type="text"
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <Field
//                         name="job_answers_json"
//                         component={renderTextAreaField}
//                         label="구직자 답변"
//                         type="text"
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <Field
//                         name="applied_comment"
//                         component={renderTextAreaField}
//                         label="지원자 코멘트"
//                         type="text"
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <Field
//                         name="url_recuser"
//                         label="URL추천인"
//                         options={users}
//                         component={SelectField}
//                         selectLabel="email"
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <fieldset className="form-group">
//                         <button action="submit" className="btn btn-primary">등록</button>
//                         <button type="button" className="btn btn-primary" onClick={() => history.back()}>뒤로가기</button>
//                     </fieldset>
//                 </Form>
//         )}
//         </>
//     )
// }
// function mapStateToProps(state, props) {
//     return {
//         // initialValues: state.common.data
//     }
// }
// export default connect(mapStateToProps)(reduxForm({
//     form: 'JobApEditForm',
//     enableReinitialize: true,
// })(JobApEditForm))
// // export default reduxForm({
// //     form: 'JobAdEditForm', // a unique identifier for this form
// //     enableReinitialize: true,
// // })(JobAdEditForm)