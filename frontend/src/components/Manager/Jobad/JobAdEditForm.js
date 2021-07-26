// import React, {useEffect, useState} from 'react'
// import {Field, reduxForm} from 'redux-form'
// import history from "../../../utils/historyUtils";
// import {
//     addrRenderField,
//     renderCheckbox,
//     renderDateField,
//     renderField,
//     renderSelectField,
//     renderTextAreaField,
//     SelectField
// } from "../../../utils/renderUtils_mng";
// import axios from 'axios';
// import {AuthUrls} from "../../../constants/urls";
// import {connect} from "react-redux";
// import {Form, FormGroup, Spinner} from "reactstrap";
// import DaumPostcode from "../../Etc/DaumPostcode_mng";
// import store from "../../../store";
//
// const required = value => {
//     if(value == undefined || value == ''){
//         return '필수값입니다.';
//     }
// }
// const JobAdEditForm = (props) => {
//     const { handleSubmit, submitting } = props
//     const [ comCode, setComcode ] = useState([]);
//     const [users, setUsers] = useState([]);
//     useEffect(()=>{
//         //담당매니저 셀렉 옵션
//         axios.get(AuthUrls.USER_LIST, {params:{is_admin:'True'}})
//             .then(({ data }) => {
//                 setUsers(data);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//         //공통코드 셀렉 옵션
//         setComcode(store.getState().comcode.comcode);
//         // axios.get(ComCodeUrls.COMMON, {
//         //     params: {
//         //         code_topidx__in: 'CA,GA,GB'
//         //     }
//         // })
//         //     .then( ({data}) => {
//         //         setComcode(data.results);
//         //     })
//         //     .catch(error => {
//         //         console.log(error);
//         //     })
//
//     },[]);
//     return (
//         <>
//             {comCode && comCode.length > 0 && (
//                 <Form onSubmit={handleSubmit}>
//                     <Field
//                         name="sugub"
//                         label="수급ID"
//                         component={renderField}
//                         type="text"
//                         disabled={true}
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <Field
//                         name="company_name"
//                         label="회사명"
//                         component={renderField}
//                         type="text"
//                         labelSize={3}
//                         colSize={9}
//                         disabled={true}
//                     />
//                     <Field
//                         name="company_name_yn"
//                         label="회사명 공개여부"
//                         component={renderCheckbox}
//                     />
//                     <Field
//                         name="jobadvertise_title"
//                         label="공고제목"
//                         component={renderField}
//                         type="text"
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <Field
//                         name="company_introduce"
//                         label="회사소개"
//                         component={renderTextAreaField}
//                         rows="3"
//                     />
//                     <Field
//                         name="main_work"
//                         label="주요업무"
//                         component={renderTextAreaField}
//                         rows="5"
//                         required={true}
//                         validate={[ required ]}
//                     />
//                     <Field
//                         name="main_work_yn"
//                         label="주요업무 공개여부"
//                         component={renderCheckbox}
//                     />
//                     <Field
//                         name="dpt_name"
//                         component={renderField}
//                         label="부서명"
//                         type="text"
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <Field
//                         name="dpt_name_yn"
//                         component={renderCheckbox}
//                         label="부서명 공개여부"
//                     />
//                     <Field
//                         name="salary"
//                         component={renderField}
//                         label="급여"
//                         type="text"
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <Field
//                         name="salary_yn"
//                         component={renderCheckbox}
//                         label="급여 공개여부"
//                     />
//                     <Field
//                         name="condition"
//                         component={renderTextAreaField}
//                         label="자격조건"
//                         type="text"
//                     />
//                     <Field
//                         name="condition_yn"
//                         component={renderCheckbox}
//                         label="자격조건 공개여부"
//                     />
//                     <Field
//                         name="special_condition"
//                         component={renderTextAreaField}
//                         label="우대조건"
//                         type="text"
//                     />
//                     <Field
//                         name="special_condition_yn"
//                         component={renderCheckbox}
//                         label="우대조건 공개여부"
//                     />
//                     <Field
//                         name="welfare"
//                         component={renderTextAreaField}
//                         label="혜택 및 복지"
//                         type="text"
//                     />
//                     <Field
//                         name="welfare_yn"
//                         component={renderCheckbox}
//                         label="혜택 및 복지 공개여부"
//                     />
//                     <Field
//                         name="location"
//                         component={renderField}
//                         label="회사위치"
//                         type="text"
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <FormGroup row>
//                         <Field
//                             name="jobadvertise_addr_code"
//                             component={addrRenderField}
//                             label="우편번호"
//                             type="text"
//                             labelSize={3}
//                             colSize={3}
//                         />
//                         <DaumPostcode formName="JobAdEditForm" filed1="jobadvertise_addr" filed2='jobadvertise_addr_code' filed3='jobadvertise_addr_detail'/>
//                     </FormGroup>
//                     <Field name="jobadvertise_addr" label="실근무지" component={renderField}
//                            type="text"
//                            labelSize={3}
//                            colSize={9}
//                     />
//                     <fieldset className="form-group">
//                         <Field name="jobadvertise_addr_detail" label="나머지주소" component={renderField}
//                                type="text"
//                                labelSize={3}
//                                colSize={9}
//                         />
//                     </fieldset>
//                     <Field
//                         name="location_yn"
//                         component={renderCheckbox}
//                         label="회사위치 공개여부"
//                     />
//
//
//                     <Field
//                         name="job_reward_type"
//                         component={renderSelectField}
//                         label="보상금종류"
//                         code_topidx="GA"
//                         code_topcd={null}
//                         options={comCode}
//                         disableOption="--"
//                         required={true}
//                         validate={[ required ]}
//                     />
//                     <Field
//                         name="job_reward_way"
//                         component={renderSelectField}
//                         label="보상지급방식"
//                         code_topidx="GB"
//                         code_topcd={null}
//                         options={comCode}
//                         disableOption="--"
//                         required={true}
//                         validate={[ required ]}
//                     />
//                     <Field
//                         name="job_reward_amt1"
//                         component={renderField}
//                         label="구직자 보상금액"
//                         type="text"
//                         labelSize={3}
//                         colSize={9}
//                         required={true}
//                         validate={[ required ]}
//                     />
//                     <Field
//                         name="job_reward_amt2"
//                         component={renderField}
//                         label="추천인 보상금액"
//                         type="text"
//                         labelSize={3}
//                         colSize={9}
//                         required={true}
//                         validate={[ required ]}
//                     />
//                     <Field
//                         name="request_ticket"
//                         component={renderField}
//                         label="필요티켓(장)"
//                         type="text"
//                         labelSize={3}
//                         colSize={9}
//                         required={true}
//                         validate={[ required ]}
//                     />
//                     <Field
//                         name="job_manager"
//                         component={SelectField}
//                         label="담당매니저"
//                         options={users}
//                         selectLabel="email"
//                         required={true}
//                         validate={[ required ]}
//                     />
//                     <Field
//                         name="jobadvertise_end_dt"
//                         component={renderDateField}
//                         label="공고마감일"
//                         labelSize={3}
//                         colSize={9}
//                         required={true}
//                         validate={[ required ]}
//                     />
//                     <Field
//                         name="jobadvertise_status"
//                         component={renderSelectField}
//                         label="공개상태코드"
//                         code_topidx="CA"
//                         code_topcd={null}
//                         options={comCode}
//                         required={true}
//                         validate={[ required ]}
//                     />
//                     <fieldset className="form-group">
//                         <button type="submit" disabled={submitting} className="btn btn-primary btn-block">
//                             {
//                                 submitting && (
//                                     <Spinner
//                                         as="span"
//                                         animation="border"
//                                         size="sm"
//                                         role="status"
//                                         aria-hidden="true"
//                                     />
//                                 )
//                             }
//                             수정</button><div></div>
//                         <button type="button" className="btn btn-primary btn-block" onClick={() => history.back()}>뒤로가기</button>
//                     </fieldset>
//                 </Form>
//             )}
//         </>
//     )
// }
// function mapStateToProps(state, props) {
//     let dpt_name, main_work, salary, special_condition, welfare, jobadvertise_addr_code, jobadvertise_addr, jobadvertise_add_detail;
//     if(typeof props.history.location.state.sugub !== 'undefined'){ //수급페이지에서 "미등록(공고등록)" 인경우만
//          let sugub = props.history.location.state.sugub;
//          dpt_name = sugub.work_dept;
//          main_work = sugub.work_position;
//          salary = sugub.salary_start + ' ~ ' + sugub.salary_end;
//          special_condition = sugub.spec;
//          welfare = sugub.bokri;
//          jobadvertise_addr_code = sugub.work_load_addr_code;
//          jobadvertise_addr = sugub.work_load_addr;
//          jobadvertise_add_detail = sugub.work_load_addr_detail;
//     }
//     return {
//         // initialValues: state.common.data,
//         // initialValues:{
//             // ...state.common.data,
//             //수급으로부터의 초기값 세팅(공고 미등록인경우만 적용)
//             // dpt_name:dpt_name,
//             // main_work:main_work,
//             // salary:salary,
//             // special_condition:special_condition,
//             // welfare:welfare,
//             // jobadvertise_addr_code:jobadvertise_addr_code,
//             // jobadvertise_addr:jobadvertise_addr,
//             // jobadvertise_add_detail:jobadvertise_add_detail
//         // }
//     }
// }
// export default connect(mapStateToProps)(reduxForm({
//     form: 'JobAdEditForm',
//     enableReinitialize: true,
//     onSubmitFail: (errors) => {
//         console.log(errors);
//         document.getElementsByClassName('main-panel')[0].scrollTop=0;
//     }
// })(JobAdEditForm))
// // export default reduxForm({
// //     form: 'JobAdEditForm', // a unique identifier for this form
// //     enableReinitialize: true,
// // })(JobAdEditForm)