// import React, {useEffect, useState} from 'react'
// import {change, Field, reduxForm} from 'redux-form'
// import history from "../../utils/historyUtils";
// import {
//     addrRenderField,
//     multiSelectField,
//     renderCheckbox,
//     renderErpTextAreaField,
//     renderRowSelectField,
//     rowRenderField
// } from "../../utils/renderUtils";
// import axios from 'axios';
// import {apiUrls} from "../../constants/urls";
// import {connect} from "react-redux";
// import {Col, Form, FormGroup, Input, Label, Row} from "reactstrap"
// import {makeStyles} from '@material-ui/core/styles';
// import Accordion from '@material-ui/core/Accordion';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//
// import DaumPostcode from "../Etc/DaumPostcode_mng"
// import store from "../../store";
//
// const style = {
//     width: '100%',
// }
// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//     },
//     heading: {
//         fontSize: theme.typography.pxToRem(20),
//         // fontWeight: theme.typography.fontWeightBold,
//     },
//     container:{
//         marginBottom:'10px',
//     }
// }));
// const SugubEditForm = (props) => {
//     const { handleSubmit } = props
//     const [comCode, setComcode] = useState([]);
//     const [jikComCode, setJikComcode] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [companys, setCompanys] = useState([]);
//     const [jikTopcdM, setJikTopcdM] = useState();
//     const [jikTopcdS, setJikTopcdS] = useState();
//     const classes = useStyles();
//     const JIKJONGTOP = [
//         { 'code_id': 'AA0100000', 'code_name': '경영/사무', 'code_topidx': 'AA', 'code_topcd': null, },
//         { 'code_id': 'AA0200000', 'code_name': '영업/고객상담', 'code_topidx': 'AA', 'code_topcd': null, },
//         { 'code_id': 'AA0300000', 'code_name': 'IT/인터넷', 'code_topidx': 'AA', 'code_topcd': null, },
//         { 'code_id': 'AA0400000', 'code_name': '디자인', 'code_topidx': 'AA', 'code_topcd': null, },
//         { 'code_id': 'AA0500000', 'code_name': '서비스', 'code_topidx': 'AA', 'code_topcd': null, },
//         { 'code_id': 'AA0600000', 'code_name': '전문직', 'code_topidx': 'AA', 'code_topcd': null, },
//         { 'code_id': 'AA0700000', 'code_name': '의료', 'code_topidx': 'AA', 'code_topcd': null, },
//         { 'code_id': 'AA0800000', 'code_name': '생산/제조', 'code_topidx': 'AA', 'code_topcd': null, },
//         { 'code_id': 'AA0900000', 'code_name': '건설', 'code_topidx': 'AA', 'code_topcd': null, },
//         { 'code_id': 'AA1000000', 'code_name': '유통/무역', 'code_topidx': 'AA', 'code_topcd': null, },
//         { 'code_id': 'AA1100000', 'code_name': '미디어', 'code_topidx': 'AA', 'code_topcd': null, },
//         { 'code_id': 'AA1200000', 'code_name': '교육', 'code_topidx': 'AA', 'code_topcd': null, },
//         { 'code_id': 'AA1300000', 'code_name': '특수계층/공공', 'code_topidx': 'AA', 'code_topcd': null, }
//     ];
//
//     //공통코드 셀렉 옵션
//     useEffect(() => {
//         axios.get(apiUrls.COMMON, {
//             params: {
//                 code_topidx__in: 'CC,AC,AB,AO,AQ,AY,AZ,AD,AE,AF,AG,AI,AK,AM',
//             }
//         })
//             .then(({ data }) => {
//                 setComcode(data);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//         axios.get(apiUrls.COMMON, {
//             params: {
//                 code_topidx__in: 'AA',
//             }
//         })
//             .then(({ data }) => {
//                 setJikComcode(data);
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }, []);
//     //페이지 로드시 직종코드 중, 소 의 초기값
//     useEffect(() => {
//         if(props.history.location.state){
//             setJikTopcdM(props.history.location.state.sugub.sugub_jikjong_top);
//             setJikTopcdS(props.history.location.state.sugub.sugub_jikjong_mid);
//         }
//         if(store.getState().auth.company == undefined){
//             history.push('./SugubListDetail');
//         } else{
//             store.dispatch(change('SugubEditForm', 'custid', store.getState().auth.company.custid));
//         }
//     }, [])
//     useEffect(() => {
//
//         //기업명 셀렉 옵션
//         axios.get(vUrls.CUSTOM_COMPANY_PROFILE, '')
//             .then(({ data }) => {
//                 setCompanys(data);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }, []);
//     //직종코드 (대) 변경시 이벤트
//     const handleJikCodeChangeTOP = (value) => {
//         axios.get(apiUrls.COMMON, {
//             params: {
//                 code_topidx__in: 'AA',
//                 code_topcd: value.target.value,
//             }
//         })
//             .then(({ data }) => {
//                 setJikTopcdM(value.target.value);
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//     //직종코드 (중) 변경시 이벤트
//     const handleJikCodeChangeMID = (value) => {
//         axios.get(apiUrls.COMMON, {
//             params: {
//                 code_topidx__in: 'AA',
//                 code_topcd: value.target.value,
//             }
//         })
//             .then(({ data }) => {
//                 setJikTopcdS(value.target.value);
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//     return (
//         <>
//             {comCode && comCode.length > 0 && store.getState().auth.company && (
//                 <div className={classes.root}>
//                     <Form onSubmit={handleSubmit} className="sugubForm" >
//                         <Row>
//                             <Col className="col-auto col-sm-6 col-md-6">
//                                 <Accordion className={classes.container} defaultExpanded>
//                                     <AccordionSummary
//                                         expandIcon={<ExpandMoreIcon />}
//                                         aria-controls="panel1a-content"
//                                         id="panel1a-header"
//                                     >
//                                         <Typography className={classes.heading}>업체정보</Typography>
//                                     </AccordionSummary>
//                                     <AccordionDetails>
//                                         <div style={style}>
//                                             <FormGroup row>
//                                                 <Label className="" sm="2" >기업명</Label>
//                                                 <Col sm="10">
//                                                     <Input className="form-control"  type="text"  value={store.getState().auth.company.custname} disabled/>
//                                                 </Col>
//                                             </FormGroup>
//                                             <FormGroup row>
//                                                 <Label className="" sm="2" >인사담당자</Label>
//                                                 <Col sm="10">
//                                                     <Input className="form-control"  type="text"  value={store.getState().auth.user.email} disabled/>
//                                                 </Col>
//                                             </FormGroup>
//                                             <Field
//                                                 name="custid"
//                                                 label="사업자번호"
//                                                 component={rowRenderField}
//                                                 type="text"
//                                                 labelSize={2}
//                                                 colSize={10}
//                                             />
//                                         </div>
//                                     </AccordionDetails>
//                                 </Accordion>
//
//                                 {/*2. 수급정보*/}
//                                 <Accordion className={classes.container} defaultExpanded>
//                                     <AccordionSummary
//                                         expandIcon={<ExpandMoreIcon />}
//                                         aria-controls="panel1a-content"
//                                         id="panel1a-header"
//                                     >
//                                         <Typography className={classes.heading}>수급정보</Typography>
//                                     </AccordionSummary>
//                                     <AccordionDetails>
//                                         <div style={style}>
//                                             <Field
//                                                 name="chae_cd"
//                                                 label="채용형태"
//                                                 component={renderRowSelectField}
//                                                 code_topidx="AC"
//                                                 code_topcd={null}
//                                                 options={comCode}
//                                                 disableOption="--"
//                                             />
//                                             {/*<Field*/}
//                                             {/*    name="created_at"*/}
//                                             {/*    component={rowRenderField}*/}
//                                             {/*    label="요청시간"*/}
//                                             {/*    type="text"*/}
//                                             {/*    labelSize={2}*/}
//                                             {/*    colSize={10}*/}
//                                             {/*/>*/}
//                                             <Field
//                                                 name="sugub_end_dt"
//                                                 label="채용마감일"
//                                                 component={rowRenderField}
//                                                 type="text"
//                                                 labelSize={2}
//                                                 colSize={10}
//                                             />
//
//                                             {/*<Field*/}
//                                             {/*    name="manager"*/}
//                                             {/*    component={SelectField}*/}
//                                             {/*    label="수급담당자"*/}
//                                             {/*    options={users}*/}
//                                             {/*    selectLabel="email"*/}
//                                             {/*/>*/}
//
//                                             <Field
//                                                 name="apply_gubun"
//                                                 component={renderRowSelectField}
//                                                 label="접수기간구분"
//                                                 code_topidx="AY"
//                                                 code_topcd={null}
//                                                 options={comCode}
//                                                 disableOption="--"
//                                             />
//
//                                             <Field
//                                                 name="submit_doc"
//                                                 component={renderRowSelectField}
//                                                 label="지원서양식"
//                                                 code_topidx="AZ"
//                                                 code_topcd={null}
//                                                 options={comCode}
//                                                 disableOption="--"
//                                             />
//
//                                             <Field
//                                                 name="sugub_jikjong_top"
//                                                 label="직종코드(대)"
//                                                 component={renderRowSelectField}
//                                                 code_topidx="AA"
//                                                 code_topcd={null}
//                                                 options={JIKJONGTOP}
//                                                 disableOption="--"
//                                                 onChange={handleJikCodeChangeTOP}
//                                             />
//
//                                             <Field
//                                                 name="sugub_jikjong_mid"
//                                                 label="직종코드(중)"
//                                                 component={renderRowSelectField}
//                                                 code_topidx="AA"
//                                                 code_topcd={jikTopcdM}
//                                                 options={jikComCode}
//                                                 disableOption="--"
//                                                 onChange={handleJikCodeChangeMID}
//                                             />
//
//                                             <Field
//                                                 name="sugub_jikjong_low"
//                                                 label="직종코드(소)"
//                                                 component={multiSelectField}
//                                                 code_topidx="AA"
//                                                 code_topcd={jikTopcdS}
//                                                 options={jikComCode}
//                                             />
//
//                                             <Field
//                                                 name="hire_count"
//                                                 component={rowRenderField}
//                                                 label="채용인원수"
//                                                 type="text"
//                                                 labelSize={2}
//                                                 colSize={10}
//                                             />
//
//                                             <Field
//                                                 name="hire_type"
//                                                 component={renderRowSelectField}
//                                                 label="고용형태"
//                                                 code_topidx="AD"
//                                                 code_topcd={null}
//                                                 options={comCode}
//                                                 disableOption="--"
//                                             />
//
//                                             <Field
//                                                 name="chae_gigan"
//                                                 component={rowRenderField}
//                                                 label="개월수"
//                                                 type="text"
//                                                 labelSize={2}
//                                                 colSize={10}
//                                             />
//
//                                             <Field
//                                                 name="chae_gigan_type"
//                                                 component={renderRowSelectField}
//                                                 label="계약기간구분"
//                                                 code_topidx="AE"
//                                                 code_topcd={null}
//                                                 options={comCode}
//                                                 disableOption="--"
//                                             />
//
//                                             <Field
//                                                 name="cont_chg_gb"
//                                                 component={renderRowSelectField}
//                                                 label="전환여부"
//                                                 code_topidx="AF"
//                                                 code_topcd={null}
//                                                 options={comCode}
//                                                 disableOption="--"
//                                             />
//
//                                         </div>
//                                         {/* <Field
//                         name="career_start"
//                         component={rowRenderField}
//                         label="경력시작"
//                         type="text"
//                     />
//                     <Field
//                         name="career_end"
//                         component={rowRenderField}
//                         label="경력종료"
//                         type="text"
//                     /> */}
//                                     </AccordionDetails>
//                                 </Accordion>
//                             </Col>
//                             <Col className="col-auto col-sm-6 col-md-6">
//                                 {/*3. 근무조건*/}
//                                 <Accordion className={classes.container} defaultExpanded>
//                                     <AccordionSummary
//                                         expandIcon={<ExpandMoreIcon />}
//                                         aria-controls="panel1a-content"
//                                         id="panel1a-header"
//                                     >
//                                         <Typography className={classes.heading}>근무조건</Typography>
//                                     </AccordionSummary>
//                                     <AccordionDetails>
//                                         <div style={style}>
//
//                                             <Field
//                                                 name="sugub_career_gb"
//                                                 component={renderRowSelectField}
//                                                 label="경력"
//                                                 code_topidx="AB"
//                                                 code_topcd={null}
//                                                 options={comCode}
//                                                 disableOption="--"
//                                             />
//
//                                             <Field
//                                                 name="education_cd"
//                                                 component={renderRowSelectField}
//                                                 label="학력"
//                                                 code_topidx="AO"
//                                                 code_topcd={null}
//                                                 options={comCode}
//                                                 disableOption="--"
//                                             />
//
//                                             <Field
//                                                 name="sugub_gender"
//                                                 component={renderRowSelectField}
//                                                 label="선호성별"
//                                                 code_topidx="AQ"
//                                                 code_topcd={null}
//                                                 options={comCode}
//                                                 disableOption="--"
//                                             />
//
//                                             <Field
//                                                 name="salary_gubun"
//                                                 component={renderRowSelectField}
//                                                 label="급여"
//                                                 code_topidx="AI"
//                                                 code_topcd={null}
//                                                 options={comCode}
//                                                 disableOption="--"
//                                             />
//
//                                             {/* <Col md="auto" md="2">
//                             <Field
//                                 name="salary_start"
//                                 component={rowRenderField}
//                                 label="최소급여"
//                                 type="text"
//                             />
//                         </Col>
//                         <Col md="auto" md="2">
//                             <Field
//                                 name="salary_end"
//                                 component={rowRenderField}
//                                 label="최대급여"
//                                 type="text"
//                             />
//                         </Col> */}
//
//                                             <Row>
//                                                 <Col>
//                                                     <Field
//                                                         name="spec"
//                                                         component={renderErpTextAreaField}
//                                                         label="필수/우대사항"
//                                                     />
//                                                 </Col>
//                                             </Row>
//                                             <Row>
//                                                 <Col>
//                                                     <Field
//                                                         name="wrk_condition"
//                                                         component={renderErpTextAreaField}
//                                                         label="근무조건"
//                                                     />
//                                                 </Col>
//                                             </Row>
//                                             {/* <Field
//                         name="age_start"
//                         component={rowRenderField}
//                         label="시작나이"
//                         type="text"
//                     />
//                     <Field
//                         name="age_end"
//                         component={rowRenderField}
//                         label="종료나이"
//                         type="text"
//                     /> */}
//                                             {/* <Field
//                         name="work_load_addr"
//                         component={rowRenderField}
//                         label="실근무지(도로명주소)"
//                         type="text"
//                     />
//                     <Field
//                         name="work_load_addr_detail"
//                         component={rowRenderField}
//                         label="실근무지(도로명상세)"
//                         type="text"
//                     /> */}
//                                         </div>
//                                         <hr />
//                                     </AccordionDetails>
//                                 </Accordion>
//
//                                 {/*4. 근무정보*/}
//                                 <Accordion className={classes.container} defaultExpanded>
//                                     <AccordionSummary
//                                         expandIcon={<ExpandMoreIcon />}
//                                         aria-controls="panel1a-content"
//                                         id="panel1a-header"
//                                     >
//                                         <Typography className={classes.heading}>근무정보</Typography>
//                                     </AccordionSummary>
//                                     <AccordionDetails>
//                                         <div style={style}>
//                                             <Field
//                                                 name="work_position"
//                                                 component={rowRenderField}
//                                                 label="포지션"
//                                                 type="text"
//                                                 labelSize={2}
//                                                 colSize={10}
//                                             />
//
//
//                                             <Field
//                                                 name="jikname"
//                                                 component={rowRenderField}
//                                                 label="직무"
//                                                 type="text"
//                                                 labelSize={2}
//                                                 colSize={10}
//                                             />
//                                             <Field
//                                                 name="work_role"
//                                                 component={renderErpTextAreaField}
//                                                 label="담당업무"
//                                             />
//                                             <Field
//                                                 name="bokri"
//                                                 component={renderErpTextAreaField}
//                                                 label="복리후생"
//                                             />
//
//                                             <Field
//                                                 name="work_dept"
//                                                 component={rowRenderField}
//                                                 label="근무부서"
//                                                 type="text"
//                                                 labelSize={2}
//                                                 colSize={10}
//                                             />
//                                             <Field
//                                                 name="work_type"
//                                                 component={renderRowSelectField}
//                                                 label="근무형태"
//                                                 code_topidx="AG"
//                                                 code_topcd={null}
//                                                 options={comCode}
//                                                 disableOption="--"
//                                             />
//                                             <Field
//                                                 name="work_type_comment"
//                                                 component={rowRenderField}
//                                                 label="근무요일"
//                                                 type="text"
//                                                 labelSize={2}
//                                                 colSize={10}
//                                             />
//                                             <Row>
//                                                 <Col md="auto" md="4">
//                                                     <Field
//                                                         name="work_time_start"
//                                                         component={rowRenderField}
//                                                         label="근무시작시간"
//                                                         type="text"
//                                                         labelSize={6}
//                                                         colSize={6}
//                                                     />
//                                                 </Col>
//                                                 <Col md="auto" md="4">
//                                                     <Field
//                                                         name="work_time_end"
//                                                         component={rowRenderField}
//                                                         label="근무종료시간"
//                                                         type="text"
//                                                         labelSize={6}
//                                                         colSize={6}
//                                                     />
//                                                 </Col>
//                                             </Row>
//                                             <Row>
//                                                 <Col md="auto" md="4">
//                                                     <Field
//                                                         name="work_rest_start"
//                                                         component={rowRenderField}
//                                                         label="휴게시작시간"
//                                                         type="text"
//                                                         labelSize={6}
//                                                         colSize={6}
//                                                     />
//                                                 </Col>
//                                                 <Col md="auto" md="4">
//                                                     <Field
//                                                         name="work_rest_end"
//                                                         component={rowRenderField}
//                                                         label="휴게종료시간"
//                                                         type="text"
//                                                         labelSize={6}
//                                                         colSize={6}
//                                                     />
//                                                 </Col>
//                                             </Row>
//                                             <Field
//                                                 name="work_rest_comment"
//                                                 component={renderErpTextAreaField}
//                                                 label="근무시간 기타사항"
//                                             />
//
//                                             {/* <Field
//                         name="salary_term"
//                         component={rowRenderField}
//                         label="급여범위코드"
//                         type="text"
//                     /> */}
//                                             <Field
//                                                 name="work_site_gubun"
//                                                 component={renderRowSelectField}
//                                                 label="근무지"
//                                                 code_topidx="AK"
//                                                 code_topcd={null}
//                                                 options={comCode}
//                                                 disableOption="--"
//                                             />
//                                             <FormGroup row>
//                                                 <Field
//                                                     name="work_post_addr_code"
//                                                     component={addrRenderField}
//                                                     label="우편번호"
//                                                     type="text"
//                                                     labelSize={2}
//                                                     colSize={2}
//                                                 />
//                                                 <DaumPostcode formName="SugubEditForm" filed1="work_load_addr" filed2='work_post_addr_code' filed3='work_load_addr_detail'/>
//                                             </FormGroup>
//                                             <Field name="work_load_addr" label="실근무지" component={rowRenderField}
//                                                    type="text"
//                                                    labelSize={2}
//                                                    colSize={10}
//                                             />
//                                             <fieldset className="form-group">
//                                                 <Field name="work_load_addr_detail" label="나머지주소" component={rowRenderField}
//                                                        type="text"
//                                                        labelSize={2}
//                                                        colSize={10}
//                                                 />
//                                             </fieldset>
//                                             <Field
//                                                 name="work_house_gubun"
//                                                 component={renderCheckbox}
//                                                 label="재택가능구분"
//                                             />
//                                             <Field
//                                                 name="work_near_subway"
//                                                 component={renderRowSelectField}
//                                                 label="인근지하철"
//                                                 code_topidx="AM"
//                                                 code_topcd={null}
//                                                 options={comCode}
//                                                 disableOption="--"
//                                             />
//                                             <Field
//                                                 name="work_traffic"
//                                                 component={renderErpTextAreaField}
//                                                 label="교통편상세"
//                                             />
//                                             {/*<Field*/}
//                                             {/*    name="sugub_status"*/}
//                                             {/*    component={renderRowSelectField}*/}
//                                             {/*    label="수급진행상태"*/}
//                                             {/*    code_topidx="CC"*/}
//                                             {/*    code_topcd={null}*/}
//                                             {/*    options={comCode}*/}
//                                             {/*    disabled={true}*/}
//                                             {/*/>*/}
//                                         </div>
//
//                                     </AccordionDetails>
//                                 </Accordion>
//                             </Col>
//                         </Row>
//                         <fieldset className="form-group">
//                             <button action="submit" className="btn btn-primary btn-block">등록</button><div></div>
//                             <button className="btn btn-primary btn-block" onClick={() => history.push('../SugubListDetail')}>뒤로가기</button>
//                         </fieldset>
//                     </Form>
//                 </div>
//             ) }
//         </>
//     )
// }
// function mapStateToProps(state, props) {
//     // if(state.form.SugubEditForm != undefined){
//     //     return {
//     //         initialValues: state.form.SugubEditForm.initial
//     //     }
//     // }
// }
// export default connect(mapStateToProps)(reduxForm({
//     form: 'SugubEditForm',
//     enableReinitialize: true,
// })(SugubEditForm))
// // export default reduxForm({
// //     form: 'SugubEditForm', // a unique identifier for this form
// //     enableReinitialize: true,
// // })(SugubEditForm)