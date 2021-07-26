// import React, {useEffect, useState} from "react";
// import {
//     Button,
//     Card,
//     CardBody,
//     CardFooter,
//     CardHeader,
//     CardText,
//     CardTitle,
//     Col,
//     Container,
//     Input,
//     Label,
//     Modal,
//     Row
// } from "reactstrap";
// import axios from "axios";
// import {getRecUser, getUrlKey, getUserProfile} from "../../actions/authActions";
// import {connect} from "react-redux";
// import {applyAdvertise, getJobAdvertise, interestAdv} from "../../actions/userActions";
// import {AuthUrls} from "../../constants/urls";
// import Fab from "@material-ui/core/Fab";
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import {generatePDFDocument} from "../Etc/PdfToBlob";
// import ReactBSAlert from "react-bootstrap-sweetalert";
// import PopupLoginForm from "../auth/PopupLoginForm";
// import KaKaoMap from "../Etc/KaKaoMap";
// import {CopyToClipboard} from 'react-copy-to-clipboard'
// import Tooltip from "@material-ui/core/Tooltip/Tooltip";
//
// const ChaeInfo = (props) => {
//     const moment = require('moment')
//     const {user, recUser} = props;
//     const [modal, setModal] = useState(false);
//     const [modal2, setModal2] = useState(false);
//     const [myResumes, setMyResumes] = useState([]);
//     const [myAppliedHistory, setMyAppliedHistory] = useState(false);
//     const [selectResume, setSelectResume] = useState([]);
//     const [urlkey, setUrlkey] = useState([]);
//     const [jobInfo, setJobInfo] = useState(['']);
//     const upid = props.match.params.upid;
//     // const recUser = props.recUser;
//     const [confirmAlert, setConfirmAlert] = useState(null);
//
//     const currentDate = moment().format('YYYY-MM-DD');
//
//     // 지원하기 Modal
//     const toggleModal = () => {
//         if (props.user) {
//             setModal(!modal);
//         } else {
//             setModal(!modal);
//             // return (alert('로그인이 필요한 서비스입니다.'))
//         }
//     };
//     // 공유하기 Modal
//     const toggleModal2 = () => {
//         if (props.user) {
//             createUrlkey();
//             setModal2(!modal2);
//         } else {
//             return (alert('로그인이 필요한 서비스입니다.'))
//         }
//     };
//
//     const createUrlkey = () => {
//         axios
//             .get(AuthUrls.CREATE_URLKEY, {
//                 params: {
//                     upid: upid,
//                     user: props.user.id
//                 }
//             })
//             .then(({data}) => {
//                 // console.log(data)
//                 setUrlkey(data.result);
//             })
//             .catch((err) => console.log(err))
//     };
//
//     useEffect(() => {
//         props.getRecUser(props.match.params.recuser);
//         props.getUrlKey(props.match.url);
//         // if(!user) props.getUserProfile();
//         props.getUserProfile();
//         // 채용공고 정보 불러오기
//         let params = {};
//         params.jobid = upid;
//         getJobAdvertise(params).then((data)=>setJobInfo(data))
//     }, [])
//
//
//     useEffect(() => {
//         // 내 이력서 불러오기
//         if (props.user) {
//             axios
//                 .get(AuthUrls.RESUME, {
//                     params: {
//                         "user_id": props.user.id
//                     }
//                 })
//                 .then(({data}) => {
//                     setMyResumes(data)
//                 })
//                 .catch((err) => console.log('err'))
//         }
//
//     }, [props.user]);
//
//     useEffect(()=>{
//         console.log('jobInfoasdfasdfadsF??', jobInfo)
//         console.log('adsfadsf user', user)
//         // 지원 이력 확인
//         if(user && jobInfo[0]){
//             console.log('user1', user)
//             if(user.applicants.length > 0 ) {
//                 let temp = user.applicants.filter(v => !jobInfo[0].jobapplicants.includes(v));
//                 console.log('temp', temp)
//                 if (temp.length === 0) setMyAppliedHistory(true)
//             }
//         }
//     },[user]);
//
//     // 이력서 없이 先지원
//     const onPreApplyAdvertise = (jobInfoId, user) => {
//         setConfirmAlert(
//             (
//                 <ReactBSAlert
//                     warning
//                     style={{display: "block", marginTop: "100px", fontFamily: ""}}
//                     // title="이력서가 선택되지 않았습니다. 먼저 지원 후 이력서를 등록하시겠습니까?"
//                     onConfirm={() => successApply(jobInfoId, user)}
//                     onCancel={() => hideAlert()}
//                     confirmBtnBsStyle="info"
//                     cancelBtnBsStyle="danger"
//                     confirmBtnText="예"
//                     cancelBtnText="아니오"
//                     showCancel
//                 >
//                     이력서가 선택되지 않았습니다.<br/>
//                     먼저 지원 후 이력서를 등록하시겠습니까?
//                     {/*삭제시 복구할 수 없습니다.*/}
//                 </ReactBSAlert>
//             )
//         );
//     };
//
//     const hideAlert = () => setConfirmAlert(null);
//
//     const successApply = (jobInfoId, user) => {
//         // let formValues = new FormData();
//         let formValues = {};
//         formValues['jobadvertise'] = jobInfoId;
//         formValues['applied_username'] = user.username;
//         formValues['applied_phone'] = user.phone;
//         formValues['applied_birth'] = user.date_of_birth;
//         formValues['applied_status'] = 'BW1000000';
//         formValues['urlkey'] = props.urlkey;
//         formValues['url_recuser'] = recUser === undefined ? 1 : recUser;
//         // formValues['hrprofile'] = 1;
//         // formValues.append('jobadvertise', jobInfoId);
//         // formValues.append('user', user.id);
//         // formValues.append('applied_username', user.username);
//         // formValues.append('applied_phone', user.phone);
//         // formValues.append('applied_birth', user.date_of_birth);
//         // formValues.append('applied_status', 'BW1000000'); // 이력서미등록
//         // formValues.append('urlkey', props.urlkey);      // 유입URL
//         // formValues.append('url_recuser', recUser === undefined ? 1 : recUser);      // URL추천인
//         // formValues.append('companyprofile', 1); // 기본값 겟스로우
//         console.log('successApply formValue:', JSON.stringify(formValues))
//         // 지원하기
//         applyAdvertise(formValues).then((res)=>{
//             console.log('applyAdvertise res', res)
//             if (res.status === 200 || res.status === 201 ){
//                 setConfirmAlert(
//                     (
//                         <ReactBSAlert
//                             success
//                             style={{display: "block", marginTop: "100px"}}
//                             // title="선지원되었습니다!"
//                             onConfirm={() => {
//                                 hideAlert();
//                                 // history.go(0)
//                             }}
//                             onCancel={() => hideAlert()}
//                             confirmBtnBsStyle="info"
//                         >
//                             선지원되었습니다!<br/>
//                             이력서 페이지에서 이력서를 작성 또는 등록해주세요.
//                         </ReactBSAlert>
//                     )
//                 );
//             }
//
//         })
//     };
//
//     const onApplyAdvertise = (jobInfoId, user, selectResume) => {
//         let formValues = new FormData();
//         let resume = myResumes.filter(value => value.id === Number(selectResume))[0];
//         // console.log('resume:', resume)
//         if (!resume.resume_filename && (!resume.resume_username || !resume.resume_phone)) {
//             alert('선택한 이력서에 이름 또는 연락처가 없습니다.');
//             return false;
//         }
//         // 파일로 지원시
//         if (resume.resume_filename) {
//             formValues.append('jobadvertise', jobInfoId);
//             formValues.append('user', user.id);
//             formValues.append('applied_username', user.username);
//             formValues.append('applied_phone', user.phone);
//             formValues.append('applied_birth', user.date_of_birth);
//             formValues.append('resume', selectResume);
//             formValues.append('urlkey', props.urlkey);      // 유입URL
//             formValues.append('url_recuser', recUser === undefined ? 1 : recUser);      // URL추천인
//             applyAdvertise(formValues).then(()=>{
//                 alert('지원 완료 되었습니다.');
//                 setModal(false)
//             });
//
//             // 채공이력서 지원시 PDF 변환
//         } else {
//             generatePDFDocument(resume)
//                 .then((blob) => {
//                     const file = new File([blob], resume.resume_username + '_' + resume.resume_phone + '.pdf')
//                     formValues.append('jobadvertise', jobInfoId);
//                     formValues.append('user', user.id);
//                     formValues.append('applied_username', user.username);
//                     formValues.append('applied_phone', user.phone);
//                     formValues.append('applied_birth', user.date_of_birth);
//                     formValues.append('resume', selectResume);
//                     formValues.append('resume_pdf', file, file.name);
//                     formValues.append('resume_filename', file.name);
//                     formValues.append('urlkey', props.urlkey);      // 유입URL
//                     formValues.append('url_recuser', recUser === undefined ? 1 : recUser);      // URL추천인
//                     // console.log('props.urlkey', props.urlkey);
//                     // console.log('props.match.params.recuser', props.match.params.recuser);
//                     return formValues
//                 })
//                 .then((formValues) => {
//
//                     applyAdvertise(formValues).then(()=>{
//                         alert('지원 완료 되었습니다.');
//                         // 수정 必 새로고침..
//                         setModal(false)
//                     });
//                 })
//                 .catch((err) => console.log(err))
//         }
//     }
//
//     function getArray(json){
//         if (typeof json === 'object' && json.length > 0){
//             const array = json.map((list) => {
//                 return list
//             });
//             return array
//         }else{
//             return []
//         }
//     }
//     // console.log('jobinfo', jobInfo)
//     // console.log('user', user)
//
//     return jobInfo ? (
//         <div>
//             <div className="section text-center"
//                  style={{
//                      color: '#FFFFFF',
//                      backgroundImage: "url(" + require("../../assets/img/sample1.jpg") + ")"
//                  }}>
//                 <h3>{jobInfo[0].jobadvertise_title}</h3>
//                 <div className="text-center">
//                     공고마감일 : {jobInfo[0].jobadvertise_end_dt} {' '}
//                     <Fab aria-label="like" size="small">
//                         <FavoriteIcon
//                             onClick={() => {
//                                 interestAdv(user.id, jobInfo[0].id)
//                             }}
//                         />
//                     </Fab>
//                 </div>
//             </div>
//             <Container>
//                 <Row>
//                     <Col md="8">
//                         <div>
//                             <div className="title">
//                                 <h4>
//                                     회사소개 <br/>
//                                     <hr/>
//                                 </h4>
//                             </div>
//                             {jobInfo[0].company_introduce && jobInfo[0].company_introduce.split('\n').map(line => {
//                                 return (<>{line}<br/></>)
//                             })}
//                         </div>
//                         <div>
//                             <div className="title">
//                                 <h4>
//                                     모집상세요강 <br/>
//                                     <hr/>
//                                 </h4>
//                             </div>
//                             <div>
//                                 {jobInfo[0].main_work_yn && jobInfo[0].main_work && (
//                                     <>
//                                         <p>{"< 주요업무 >"}</p>
//                                         { jobInfo[0].main_work.split('\n').map(line => {
//                                             return (<>{line}<br/></>)
//                                         })} <br/><br/>
//                                     </>
//                                 )}
//                                 {jobInfo[0].condition_yn && jobInfo[0].condition && (
//                                     <>
//                                         <p>{"< 자격요건 >"}</p>
//                                         {jobInfo[0].condition.split('\n').map(line => {
//                                             return (<>{line}<br/></>)
//                                         })}
//                                         <br/><br/>
//                                     </>
//                                 )}
//                                 {jobInfo[0].special_condition_yn && jobInfo[0].special_condition && (
//                                     <>
//                                         <p>{"< 우대사항 >"}</p>
//                                         { jobInfo[0].special_condition.split('\n').map(line => {
//                                             return (<>{line}<br/></>)
//                                         })} <br/><br/>
//                                     </>
//                                 )}
//                                 {jobInfo[0].salary_yn && (
//                                     <>
//                                         <p>{"< 근무조건 >"}</p>
//                                         <>- 급여 : {jobInfo[0].salary}</>
//                                         <br/><br/>
//                                     </>
//                                 )}
//                             </div>
//                         </div>
//                         <div>
//                             <div className="title">
//                                 <h4>
//                                     복지 및 혜택 <br/>
//                                     <hr/>
//                                 </h4>
//                             </div>
//                             {jobInfo[0].welfare && jobInfo[0].welfare.split('\n').map(line => {
//                                 return (<>{line}<br/></>)
//                             })}<br/>
//                         </div>
//                         <div className="description">
//                             <p>*상기 급여 및 복리후생 등의 채용조건은 회사사유에 의해 변경될 수 있습니다.</p>
//                             <p>*제출한 채용관련 서류는 채용 여부가 확정된 이후 14일 안에 요청시 반환 또는 폐기해드립니다.</p>
//                         </div>
//                         <div>
//                             <div className="title">
//                                 <h4>
//                                     담당자 (문의처)<br/>
//                                     <hr/>
//                                 </h4>
//                             </div>
//                             <div className="col-md-6">
//                                 <Card className="card card-user">
//                                     <CardHeader>
//                                         {/*<h3 className="card-category">{chaeList.sugub.custid}</h3>*/}
//                                         <h3 className="card-category">{}</h3>
//                                     </CardHeader>
//                                     <CardBody>
//                                         <div className="">
//                                             <center>
//                                                 <img
//                                                     alt="..."
//                                                     className="avatar border-gray"
//                                                     src={require("assets/img/default-avatar.png")}
//                                                 />
//                                             </center>
//                                             {/*<i className="nc-icon nc-spaceship"/>*/}
//                                         </div>
//                                     </CardBody>
//                                     <CardFooter className="text-center">
//                                         {jobInfo[0].job_manager && (
//                                             <>
//                                                 <p>{jobInfo[0].job_manager.team}</p>
//                                                 <p>{jobInfo[0].job_manager.email}</p>
//                                                 <p>{jobInfo[0].job_manager.phonenumber}</p>
//                                                 <p>{jobInfo[0].job_manager.nickname}</p>
//                                             </>
//                                         )}
//                                     </CardFooter>
//                                 </Card>
//                             </div>
//                         </div>
//                         <div className="map">
//                             <div className="title">
//                                 <h4>
//                                     근무지역 <br/>
//                                     <hr/>
//                                 </h4>
//                                 <>{jobInfo[0].location}</>
//                                 <KaKaoMap address={jobInfo[0].location}/>
//                             </div>
//
//                         </div>
//                         {/*<div className="">
//                             <div className="title">
//                                 <h4>
//                                     관련직군 채용공고 <br/>
//                                     <hr/>
//                                 </h4>
//                                 <small>
//                                     {""}
//                                 </small>
//                             </div>
//                         </div>*/}
//
//                     </Col>
//                     <Col md="4">
//                         <br/>
//                         <Card className="card card-subcategories">
//                             <CardHeader>
//                                 <CardTitle className="text-left" tag="h5">
//                                     {jobInfo[0].company_name_yn ? jobInfo[0].company_name : '비공개'}<br/>
//                                     <small>{jobInfo[0].location}</small>
//                                 </CardTitle>
//                                 <br/>
//                             </CardHeader>
//                             <CardBody>
//                                 <CardText>
//                                     <b>* 보상금</b><br/>
//                                     * {jobInfo[0].job_reward_way_nm && jobInfo[0].job_reward_way_nm}<br/>
//                                     지원자: {jobInfo[0].job_reward_amt1 && jobInfo[0].job_reward_amt1}원<br/>
//                                     추천인: {jobInfo[0].job_reward_amt2 && jobInfo[0].job_reward_amt2}원<br/>
//                                     {getArray(jobInfo[0].jobtag_json).map( v => {
//                                         return ( <label className="label label-default" style={{color: "#000000"}}># {v}</label> )
//                                     })}
//                                 </CardText>
//                             </CardBody>
//                             <hr/>
//
//                             {user && myAppliedHistory ? (
//                                 <>
//                                     <Button className="btn-round"
//                                             color="primary"
//                                             type="button"
//                                             disabled={true}
//                                             onClick={() => {}}
//                                     >지원완료
//                                     </Button>
//                                 </>
//                             ):(
//                                 <>
//                                     {currentDate <= jobInfo[0].jobadvertise_end_dt ? (
//                                         <>
//                                             <Button
//                                                 className="btn-round"
//                                                 color="primary"
//                                                 type="button"
//                                                 onClick={() => {
//                                                     toggleModal()
//                                                 }}
//                                             >지원하기
//                                             </Button>
//                                         </>
//                                     ) : (
//                                         <Button
//                                             className="btn-round"
//                                             color="primary"
//                                             type="button"
//                                             disabled={true}
//                                             onClick={() => {}}
//                                         >지원마감
//                                         </Button>
//
//                                     )}
//                                 </>
//                             )}
//
//                             <br/>
//                             {/* Modal */}
//                             <Modal isOpen={modal} toggle={toggleModal}>
//                                 {props.user ?
//                                     (
//                                         <>
//                                             <div className="modal-header">
//                                                 <button
//                                                     aria-label="Close"
//                                                     className="close"
//                                                     type="button"
//                                                     onClick={toggleModal}
//                                                 >
//                                                     <span aria-hidden={true}>×</span>
//                                                 </button>
//                                                 <h5
//                                                     className="modal-title text-center"
//                                                     id="applyModal"
//                                                 >
//                                                     지원하기
//                                                 </h5>
//                                             </div>
//                                             <div className="modal-body">
//                                                 기업명 | {jobInfo[0].company_name} <br/><br/>
//                                                 포지션 | Service admin 사원급 채용 (신입가능)<br/><br/>
//                                                 <hr/>
//                                                 * {jobInfo[0].job_reward_type_nm}<br/>
//                                                 {/*{jobInfo[0].job_reward_}*/}
//                                                 지원자: {jobInfo[0].job_reward_amt1}원 ( {jobInfo[0].job_reward_way_nm} )<br/>
//                                                 추천인: {jobInfo[0].job_reward_amt2}원 ( {jobInfo[0].job_reward_way_nm} )<br/>
//                                                 <hr/>
//                                                 {/*<label>이력서</label>*/}
//
//
//                                                 {myResumes.length > 0 ? (
//                                                     <div>
//                                                         <Label>첨부파일</Label>
//                                                         <Input type="select" name="resume_id"
//                                                                value={selectResume}
//                                                                onChange={e => {
//                                                                    setSelectResume(e.currentTarget.value)
//                                                                }}
//                                                             // multiple
//                                                         >
//                                                             <option>이력서를 선택해주세요</option>
//                                                             {myResumes.map((resume, index) => {
//                                                                 if (!resume.resume_filename) { // 채공이력서
//                                                                     return <option
//                                                                         value={resume.id}>| {resume.resume_title}</option>
//                                                                 } else { //
//                                                                     return <option
//                                                                         value={resume.id}>| {resume.resume_filename}</option>
//                                                                 }
//                                                             })}
//                                                         </Input>
//                                                     </div>
//                                                 ) : (
//                                                     <p className="description">
//                                                         등록된 이력서가 없습니다.
//                                                         <Tooltip title="이력서 없이 지원 후 나중에 이력서를 등록하시려면 지원하기 버튼을 눌러주세요."
//                                                                  placement="top">
//                                                             <i className="fa fa-info-circle"/>
//                                                         </Tooltip>
//                                                     </p>
//                                                 )}
//
//                                             </div>
//                                             <div className="modal-footer">
//                                                 <div className="left-side">
//                                                     <Button
//                                                         className="btn-link"
//                                                         color="default"
//                                                         type="button"
//                                                         onClick={toggleModal}
//                                                     >
//                                                         취소하기
//                                                     </Button>
//                                                 </div>
//                                                 <div className="divider"/>
//                                                 <div className="right-side">
//                                                     <Button
//                                                         className="btn-link"
//                                                         color="danger"
//                                                         type="button"
//                                                         // type="submit"
//                                                         // onClick={applyAdvertise(jobInfo[0].id, props.user, selectResume)}
//                                                         onClick={() => {
//                                                             selectResume.length > 0 ?
//                                                                 onApplyAdvertise(jobInfo[0].id, props.user, selectResume) : onPreApplyAdvertise(jobInfo[0].id, props.user, selectResume)
//                                                         }}
//                                                         // onClick={() => onApplyAdvertise(jobInfo[0], props.user, selectResume)}
//                                                     >
//                                                         지원하기
//                                                     </Button>
//                                                 </div>
//                                                 {confirmAlert}
//                                             </div>
//                                         </>
//                                     ) : (<PopupLoginForm jobInfo={jobInfo}/>)
//                                 }
//                             </Modal>
//                             {currentDate <= jobInfo[0].jobadvertise_end_dt && (
//                                 <Button
//                                     className="btn-round"
//                                     color="primary"
//                                     onClick={toggleModal2}
//                                 >
//                                     공유하기
//                                 </Button>
//                             )}
//                             {/* Modal */}
//                             <Modal isOpen={modal2} toggle={toggleModal2}>
//                                 <div className="modal-header">
//                                     <button
//                                         aria-label="Close"
//                                         className="close"
//                                         type="button"
//                                         onClick={toggleModal2}
//                                     >
//                                         <span aria-hidden={true}>×</span>
//                                     </button>
//                                     <h5
//                                         className="modal-title text-center"
//                                         id="shareModal"
//                                     >
//                                         공유하기
//                                     </h5>
//                                 </div>
//
//                                 <div className="modal-body">
//                                     기업명 | {jobInfo[0].company_name} <br/><br/>
//                                     {/*부서명 | {jobInfo[0].dpt_name}<br/><br/>*/}
//                                     Title | {jobInfo[0].jobadvertise_title}<br/><br/>
//                                     공유URL | {urlkey.url}
//                                     <CopyToClipboard text={urlkey && urlkey.url} onCopy={()=>{
//                                         alert('URL 복사되었습니다!')
//                                     }}>
//                                         <button><i className="fa fa-clipboard"/></button>
//                                     </CopyToClipboard>
//                                     <hr/>
//                                     *광고보상금: URL유입 시 {jobInfo[0].job_reward_amt2 / 2 }원 <br/>
//                                     *채용보상금: 합격자 {jobInfo[0].job_reward_amt1}원 / 추천자 {jobInfo[0].job_reward_amt2}원
//                                 </div>
//                                 <div className="modal-footer">
//                                     <div className="left-side">
//                                         <Button
//                                             className="btn-link"
//                                             color="default"
//                                             type="button"
//                                             onClick={toggleModal2}
//                                         >
//                                             취소하기
//                                         </Button>
//                                     </div>
//                                     <div className="divider"/>
//                                     <div className="right-side">
//                                         <Button className="btn-link" color="danger" type="button"
//                                                 onClick={toggleModal2}>
//                                             확인
//                                         </Button>
//                                     </div>
//                                 </div>
//                             </Modal>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     ) : null
// }
//
// // util functions
// function processServerError(error) {
//     return Object.keys(error).reduce(function (newDict, key) {
//         if (key === "non_field_errors") {
//             newDict["_error"].push(error[key]);
//         } else if (key === "user") {
//             newDict["_error"].push(error[key]);
//         } else if (key === "token") {
//             // token sent with request is invalid
//             newDict["_error"].push("The link is not valid any more.");
//         } else {
//             newDict[key] = error[key];
//         }
//
//         return newDict
//     }, {"_error": []});
// }
//
// function mapStateToProps(state, props) {
//     return {
//         initialValues: {
//             jobadvertise: props.match.params.upid,
//         },
//         user: state.auth.user,
//         urlkey: state.auth.urlkey,
//         recUser: state.auth.recUser
//     }
// }
//
// export default connect(mapStateToProps, {getUserProfile, getRecUser, getUrlKey})(ChaeInfo)
