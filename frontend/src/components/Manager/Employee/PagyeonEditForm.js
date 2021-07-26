// import React, {useEffect, useState} from 'react'
// import {Field, reduxForm} from 'redux-form'
// import history from "../../utils/historyUtils";
// import {addrRenderField, renderField} from "../../utils/renderUtils";
// // import '../../index.css'
// import axios from 'axios';
// import {ChaegongUrls, ComCodeUrls, SelectOptionUrls} from "../../constants/urls";
// import {connect} from "react-redux";
// import {Form} from "react-bootstrap";
// import {Col, FormGroup, Row} from "reactstrap";
// import DaumPostcode from "../Etc/DaumPostcode";
//
// const PagyeonEditForm = (props) => {
//     const { handleSubmit } = props
//     const [ comCode, setComcode ] = useState([]);
//     const [ sugubs, setSugubs ] = useState([]);
//     const [ users, setUsers ] = useState([]);
//     const [ companys, setCompanys ] = useState([]);
//     useEffect(()=>{
//         axios.get(ComCodeUrls.COMMON, {
//             params: {
//                 code_topidx__in: 'BW'
//             }
//         })
//             .then( ({data}) => {
//                 setComcode(data.results);
//                 console.log(comCode);
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     },[]);
//     useEffect(()=>{
//         //수급리스트 셀렉 옵션
//         axios.get(SelectOptionUrls.CHAE_SUGUBLIST, '')
//             .then( ({data}) => {
//                 setSugubs(data.results);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//         //사용자 셀렉 옵션
//         axios.get(ChaegongUrls.USER, '')
//             .then( ({data}) => {
//                 setUsers(data.results);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//         //기업명 셀렉 옵션
//         axios.get(SelectOptionUrls.CHAE_COMPANYLIST, '')
//             .then( ({data}) => {
//                 setCompanys(data.results);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     },[]);
//
//     return (
//         <>
//             {comCode && comCode.length > 0 && (
//                 <Form onSubmit={handleSubmit}>
//                     <Field
//                         name="emp_name"
//                         label="성명"
//                         component={renderField}
//                         type="text"
//                         labelSize={3}
//                         colSize={9}
//                     />
//
//                     <Field
//                         name="birth"
//                         label="생년월일"
//                         component={renderField}
//                         type="text"
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <Field
//                         name="telno"
//                         component={renderField}
//                         label="연락처"
//                         type="text"
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <Field
//                         name="term_from_to"
//                         label="계약기간"
//                         component={renderField}
//                         type="text"
//                        labelSize={3}
//                         colSize={9}
//                     />
//                     <FormGroup row>
//                         <Field
//                             name="zipcode"
//                             component={addrRenderField}
//                             label="우편번호"
//                             type="text"
//                             labelSize={2}
//                             colSize={2}
//                         />
//                         <DaumPostcode formName="PagyeonEditForm" filed1="addr" filed2='zipcode' filed3='addr_2'/>
//                     </FormGroup>
//
//                     <Field name="addr" label="실근무지" component={renderField}
//                            type="text"
//                            labelSize={3}
//                         colSize={9}
//                     />
//                     <fieldset className="form-group">
//                         <Field name="addr_2" label="나머지주소" component={renderField}
//                                type="text"
//                                labelSize={3}
//                         colSize={9}
//                         />
//                     </fieldset>
//
//                     {/* <Field
//                         name="resume_filename"
//                         component={renderField}
//                         label="이력서"
//                         type="text"
//                     /> */}
//                     <Row>
//                         <Col md="auto" md="6">
//                             <Field
//                                 name="ip_start"
//                                 label="입사일"
//                                 component={renderField}
//                                 type="text"
//                                 labelSize={6}
//                                 colSize={6}
//                             />
//                         </Col>
//                         <Col md="auto" md="5">
//                             <Field
//                                 name="ip_end"
//                                 component={renderField}
//                                 label="퇴사일"
//                                 type="text"
//                                 labelSize={4}
//                                 colSize={6}
//                             />
//                         </Col>
//                     </Row>
//                     <Field
//                         name="mng_id"
//                         component={renderField}
//                         label="담당자"
//                         type="text"
//                         labelSize={3}
//                         colSize={9}
//                     />
//                     <fieldset className="form-group">
//                         <button type="submit" className="btn btn-primary btn-block">등록</button><div></div>
//                         <button type="button" className="btn btn-primary btn-block" onClick={() => history.back()}>뒤로가기</button>
//                     </fieldset>
//                 </Form>
//             )}
//         </>
//     )
// }
// function mapStateToProps(state, props) {
//     if (props.history.location.state != null) {
//         if (props.history.location.state.pagyeonData.resume != null) {
//             let resume = props.history.location.state.pagyeonData.resume;
//             return {
//                 initialValues: {
//                     // state.common.data
//                     emp_name: resume.resume_username,
//                     birth: resume.resume_birth,
//                     telno: resume.resume_phone,
//
//                 }
//             }
//         }
//     }
//
// }
// export default connect(mapStateToProps)(reduxForm({
//     form: 'PagyeonEditForm',
//     enableReinitialize: true,
// })(PagyeonEditForm))
// // export default reduxForm({
// //     form: 'JobAdEditForm', // a unique identifier for this form
// //     enableReinitialize: true,
// // })(JobAdEditForm)