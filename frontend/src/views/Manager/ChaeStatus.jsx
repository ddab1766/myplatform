// import React, {useEffect, useState} from "react";
// import {Button, Col, FormGroup, Input, Label, Modal, Row} from "reactstrap";
// import axios from "axios";
// import history from "../../utils/historyUtils";
// import ChaeCard from "../../components/User/ChaeCard";
// import defaultClient from "../../utils/defaultClient";
// import MUIDataTable from "mui-datatables";
// import {connect} from "react-redux";
//
// function ChaeStatus(props) {
//     const [applicants, setApplicants] = useState([]);
//     const [resumeFile, setResumeFile] = useState(null);
//     const [fileList, setFileList] = useState([]);
//     const [username, setUsername] = useState([]);
//     const [phone, setPhone] = useState([]);
//     const [birth, setBirth] = useState([]);
//     const [modal, setModal] = useState(false);
//
//     const companyProfile = props.company;
//     // 채용정보 받아오기
//     const {jobAds} = props.location.state;
//
//     // 본인이 속한 회사의 이력서만 받아오기
//     useEffect(() => {
//         if(companyProfile && jobAds) {
//             defaultClient
//                 .get(apiUrls.JOB_APPLICANT, {
//                     params: {
//                         jobadvertise: jobAds.id,
//                         companyprofile: companyProfile.id
//                     }
//                 })
//                 .then(({data}) => {
//                     setApplicants(data);
//                 })
//         }
//     }, [companyProfile]);
//
//     const toggleModal = () => setModal(!modal);
//
//     // 이력서 제출
//     const handleSubmit = (e) => {
//         e.preventDefault();
//
//         for (let i = 0; i < resumeFile.length; i++) {
//             let formValues = new FormData();
//             // let companyprofile = props.company;
//             formValues.append('jobadvertise', jobAds.id);
//             formValues.append(`resume_pdf`, resumeFile[i], resumeFile[i].name);
//             formValues.append('resume_filename', resumeFile[i].name);
//             formValues.append('non_username', username[i]);
//             formValues.append('non_phone', phone[i].replaceAll('-', ''));
//             formValues.append('non_birth', birth[i].replaceAll('-', ''));
//             formValues.append('companyprofile', companyProfile.id);
//             formValues.append('applied_status', 'BW0200000'); // 인사전형진행중
//             formValues.append('user', ''); // todo test
//             console.log('formValues', JSON.stringify(formValues))
//             console.log('companyProfile:', companyProfile)
//             // todo post 한번에 하도록
//             axios
//                 .post(apiUrls.JOB_APPLICANT, formValues, {
//                     headers: {
//                         'content-type': 'multipart/form-data'
//                     }
//                 })
//                 .then(({data}) => {
//                     // 수정 必 data값?
//                     //setApplicants(applicants.concat(data))
//                     console.log('handleSubmit data', data)
//
//
//                 })
//                 .catch(err => console.log(err));
//         }
//         history.go(0)
//     };
//
//     const handleUploadChange = (e) => {
//         setResumeFile(e.target.files)
//         console.log('resumeFile', resumeFile)
//         let listRender = []
//         for(let i = 0; i < e.target.files.length; i++){
//             let file = e.target.files[i]
//             listRender = listRender.concat(
//                 <div>
//                     <Row>
//                         <Label sm="4">{file.name}</Label>
//                         <Col sm="8">
//                             <Row>
//                                 <Col md="4">
//                                     <FormGroup>
//                                         <Input name='non_username'
//                                                type={'text'}
//                                                placeholder={'이름'}
//                                                onChange={(e)=> {
//                                                    let newArr = username;
//                                                    newArr[i] = e.target.value;
//                                                    return setUsername(newArr)
//                                                }}
//                                         />
//                                     </FormGroup>
//                                 </Col>
//                                 <Col md="4">
//                                     <FormGroup>
//                                         <Input name='non_phone'
//                                                type={'text'}
//                                                placeholder={'연락처'}
//                                                onChange={(e)=> {
//                                                    let newArr = phone;
//                                                    newArr[i] = e.target.value;
//                                                    return setPhone(newArr)
//                                                }}
//                                         />
//                                     </FormGroup>
//                                 </Col>
//                                 <Col md="4">
//                                     <FormGroup>
//                                         <Input name='non_birth'
//                                                type={'text'}
//                                                placeholder={'생년월일'}
//                                                onChange={(e)=> {
//                                                    let newArr = birth;
//                                                    newArr[i] = e.target.value;
//                                                    return setBirth(newArr)
//                                                }}
//                                         />
//                                     </FormGroup>
//                                 </Col>
//                             </Row>
//                         </Col>
//                     </Row>
//                 </div>
//             )
//
//         }
//         setFileList(listRender)
//     };
//
//
//     const columns = [
//         {
//             name: "id",
//             label: "No"
//         },
//         {
//             name: "non_username",
//             label: "이름",
//             // options: {
//             //     customBodyRender: (value, tableMeta, updateValue) => {
//             //         return (
//             //             <FormControlLabel
//             //                 value={value}
//             //                 control={<TextField value={value} />}
//             //                 // onChange={event => updateValue(event.target.value)}
//             //             />
//             //         );
//             //     }
//             // }
//         },
//         {
//             name: "non_phone",
//             label: "연락처"
//         },
//         {
//             name: "non_birth",
//             label: "생년월일"
//         },
//         {
//             name: "resume_filename",
//             label: "파일명",
//         },
//         {
//             name: "resume_pdf",
//             label: "이력서",
//             options: {
//                 customBodyRender: (value, tableMeta, updateValue) => {
//                     return (
//                         <a className="nav-link" href={value} target='_blank'>보기</a>
//                     );
//                 }
//             }
//         },
//         {
//             name: "companyprofile",
//             label: "회사명"
//         }
//     ];
//
//     const options = {
//         selectableRows: false,
//         filterType: 'checkbox',
//         // onRowClick: (rowData, rowState) => {
//         //     if(jobAds) {
//         //         let _id = rowData[0]
//         //         props.history.push({
//         //             pathname: `/Mng/chae/${_id}`,
//         //             state: {jobAds: jobAds.filter(value => value.id === _id)[0]}
//         //         })
//         //     }
//         // },
//         setTableProps: () => (
//             {
//                 style: {
//                     // backgroundColor: 'red'
//                 },
//                 size:'small'
//             }
//         )
//     };
//
//     const renderModal = () => {
//         return (
//             <Modal size='lg' isOpen={modal} toggle={toggleModal}>
//                 {/*<form className="mx-3" onSubmit={handleSubmit} user={props.user}>*/}
//                 <div className="modal-header">
//                     <button
//                         aria-label="Close"
//                         className="close"
//                         type="button"
//                         onClick={toggleModal}
//                     >
//                         <span aria-hidden={true}>×</span>
//                     </button>
//                     <h5
//                         className="modal-title text-center"
//                         id="applyModal"
//                     >
//                         지원하기
//                     </h5>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <div className="modal-body">
//                         * 기업명 | <b>{jobAds.company_name}</b><br/><br/>
//                         * 포지션 | <b>{jobAds.jobadvertise_title}</b><br/><br/>
//                         <hr/>
//                         {/*<label>이력서</label>*/}
//                         <div>
//                             <Label>* 첨부파일 <small>(Ctrl / Shift 키를 활용하여 멀티 업로드도 가능합니다)</small></Label>
//                             {fileList.length > 0 && (<p><small>필요티켓:{fileList.length * jobAds.request_ticket}장</small></p>)}
//                             <>{fileList}</>
//                             <Input type="file"
//                                    id="resume_file"
//                                    multiple
//                                 // accept="image/png, image/jpeg"
//                                    onChange={handleUploadChange}
//                                    required/>
//                         </div>
//                     </div>
//                     <div className="modal-footer">
//                         <Button type="submit" >
//                             {/*{submitting === true && (
//                                 <Spinner
//                                     as="span"
//                                     animation="border"
//                                     size="sm"
//                                     role="status"
//                                     aria-hidden="true"
//                                 />)
//                             }*/}
//                             제출
//                         </Button>
//                     </div>
//                 </form>
//             </Modal>
//         )
//     };
//
//     console.log('jobAds', jobAds)
//
//     return (
//         <div className="content">
//             {/*<Container>*/}
//             <div className="title">
//                 <h3 className="text-md-left">진행상황<br/>
//                     <small>
//                         이력서 접수 페이지.<br/>
//                     </small>
//                 </h3>
//             </div>
//             <div>
//                 <div className="title">
//                     <h5>채용간략소개</h5>
//                 </div>
//                 <hr/>
//                 마감일:{jobAds.jobadvertise_end_dt}<br/>
//                 근무지:{jobAds.location}<br/>
//                 급여:{jobAds.salary}<br/><br/>
//                 <p>* 보상</p>
//                 {/*{jobAds.job_reward_type_nm}<br/>*/}
//                 {jobAds.job_reward_way_nm}<br/>
//                 지원자 {jobAds.job_reward_amt1}원 / 추천인 {jobAds.job_reward_amt2}원<br/><br/>
//                 <p>* 필요 티켓</p>
//                 {jobAds.request_ticket} 장
//             </div>
//             <div>
//                 <div className="title">
//                     <h5>수급담당자</h5>
//                 </div>
//                 <hr/>
//                 {jobAds.sugub.manager}<br/>
//             </div>
//             <div>
//                 <div className="title">
//                     <h5>지원자 이력서</h5>
//                 </div>
//                 <Button
//                     className="btn-round"
//                     // color="primary"
//                     //outline
//                     type="button"
//                     onClick={() => {
//                         toggleModal()
//                     }}
//                 >
//                     이력서 업로드
//                 </Button>
//                 <hr/>
//                 <MUIDataTable
//                     title={"지원자"}
//                     data={applicants}
//                     columns={columns}
//                     options={options}
//                 />
//             </div>
//             <div>
//                 <hr/>
//                 <div className="title">
//                     <h5>해당 채용공고</h5>
//                 </div><hr/>
//                 <Col md="3">
//                     <ChaeCard chaeList={jobAds}/>
//                 </Col>
//                 {/*))}*/}
//
//             </div>
//
//             {renderModal()}
//             {/*</Container>*/}
//         </div>
//     )
// }
//
// function mapStateToProps(state) {
//     return {
//         company: state.auth.company
//     }
// }
//
// export default connect(mapStateToProps)(ChaeStatus);
