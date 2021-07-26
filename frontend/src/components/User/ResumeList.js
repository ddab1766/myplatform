// import React, {useEffect, useState} from "react";
// // reactstrap components
// import {Col, Container, Progress, Row, Table} from "reactstrap";
// import {Link} from "react-router-dom";
// import axios from "axios";
// import Switch from "react-bootstrap-switch";
// import {AuthUrls, vUrls} from "../../constants/urls";
// import ReactBSAlert from "react-bootstrap-sweetalert";
// import Button from "@material-ui/core/Button";
// import LoaderSpinner from "../Etc/LoaderSpinner";
// import {updateUserResume} from "../../actions/userActions";
//
// // 이력서 리스트
// function ResumeList(props) {
//     const [resumeList, setResumeList] = useState(null);
//     const [resumeFile, setResumeFile] = useState(null);
//     const [removeAlert, setRemoveAlert] = useState(null);
//     const user = props.user;
//
//     useEffect(()=>{
//         setResumeList(user.userspecial.resume)
//         // if(!user) props.getUserProfile()
//     },[user]);
//
//     useEffect(() => {
//         setResumeList(null);
//         axios
//             .get(vUrls.RESUME, {
//                 params: {
//                     userspecial: props.match.params.specialid
//                 }
//             })
//             .then(({data}) => {
//                 setResumeList(data);
//             })
//     }, [props]);
//     // 채공이력서생성
//     const onAddResume = () => {
//         let formValues = {};
//         formValues['userspecial'] = props.match.params.specialid;
//         formValues['resume_username'] = props.user.username;
//         formValues['resume_phone'] = props.user.phone;
//         formValues['resume_birth'] = props.user.date_of_birth;
//         console.log('onAddResume formValues..', formValues);
//         updateUserResume(formValues)
//             .then((data)=>{
//                 setResumeList(resumeList.concat(data))
//             })
//     };
//     // 파일업로드(기타이력서)
//     useEffect(()=>{
//         if(resumeFile) {
//             let formValues = new FormData();
//             formValues.append('resume_file', resumeFile, resumeFile.name);
//             formValues.append('resume_filename', resumeFile.name);
//             formValues.append('userspecial', props.match.params.specialid);
//             formValues.append('resume_username', props.user.username);
//             formValues.append('resume_phone', props.user.phone);
//             formValues.append('resume_birth', props.user.date_of_birth);
//             axios
//                 .post(AuthUrls.RESUME, formValues, {
//                     headers: {
//                         'content-type': 'multipart/form-data'
//                     }
//                 })
//                 .then(({data}) => {
//                     setResumeList(resumeList.concat(data))
//                 })
//                 .catch(err => console.log(err));
//         }
//     }, [resumeFile]);
//
//     const warningWithConfirmMessage = (list) => {
//         setRemoveAlert(
//             (
//                 <ReactBSAlert
//                     warning
//                     style={{display: "block", marginTop: "100px"}}
//                     title="해당 이력서를 삭제하시겠습니까?"
//                     onConfirm={() => successDelete(list)}
//                     onCancel={() => hideAlert()}
//                     confirmBtnBsStyle="info"
//                     cancelBtnBsStyle="danger"
//                     confirmBtnText="삭제"
//                     cancelBtnText="취소"
//                     showCancel
//                 >
//                     삭제시 복구할 수 없습니다.
//                 </ReactBSAlert>
//             )
//         );
//     };
//
//     const hideAlert = () => setRemoveAlert(null);
//
//     const successDelete = (list) => {
//         axios
//             .delete(AuthUrls.RESUME + list.id + '/')
//             .then(({data}) => {
//                 setResumeList(resumeList.filter(value => value !== list));
//                 setRemoveAlert(
//                     (
//                         <ReactBSAlert
//                             success
//                             style={{display: "block", marginTop: "100px"}}
//                             title="삭제되었습니다!"
//                             onConfirm={() => hideAlert()}
//                             onCancel={() => hideAlert()}
//                             confirmBtnBsStyle="info"
//                         >
//                             {/*Your imaginary file has been deleted.*/}
//                         </ReactBSAlert>
//                     )
//                 );
//             });
//     };
//     return (
//         <div>
//             <Container>
//
//                 <Table className="table-shopping">
//                     <thead>
//                     <th colSpan={3}>이력서 목록</th>
//                     </thead>
//                     {resumeList ? (
//                         <>
//                             {resumeList.length > 0 ? (
//                                 <tbody>
//                                 {resumeList.map((list, index) => list.resume_file == null ? (
//                                         <tr>
//                                             <td className="td-name">
//                                                 <Link className="nav-link"
//                                                     //to={`/User/Resume_edit/${list.id}`}
//                                                       to={{
//                                                           pathname: `/User/Resume_edit/${list.id}`,
//                                                           state: {
//                                                               resume: list
//                                                           }
//                                                       }}
//                                                 >{list.resume_title}
//                                                 </Link>
//                                                 <small> 수정 {list.modify_date} </small>
//                                             </td>
//                                             <td>
//                                                 <div className="progress-container">
//                                                     <span className="progress-badge"><h6><small>완성도</small></h6></span>
//                                                     {/* 수정必*/}
//                                                     <Progress max="50" value="30" barClassName="progress-bar-success">
//                                                         <span className="progress-value"></span>
//                                                     </Progress>
//                                                 </div>
//                                             </td>
//                                             <td className="td-number">
//                                                 {/*<Col md="4">*/}
//                                                 <p className="category">{""}</p>
//                                                 {/*<Switch onColor="default" offColor="default" />{" "}*/}
//                                                 <Switch
//                                                     defaultValue={list.open_yn}
//                                                     onText="공개"
//                                                     offText="Off"
//                                                     onColor="default"
//                                                     offColor="default"
//                                                 />
//                                                 {/*</Col>*/}
//                                                 <Button
//                                                     className="btn-neutral"
//                                                     color="default"
//                                                     data-placement="left"
//                                                     id="tooltip848814788"
//                                                     onClick={() => warningWithConfirmMessage(list)}
//                                                     title=""
//                                                     type="button"
//                                                 >
//                                                     <i className="nc-icon nc-simple-remove"/>
//                                                 </Button>
//                                             </td>
//                                         </tr>
//                                     ) :
//                                     (
//                                         <tr>
//                                             <td className="td-name">
//                                                 <a className="nav-link"
//                                                    href={list.resume_file}
//                                                 >{list.resume_filename}
//                                                 </a>
//                                                 <br/>
//                                                 <small> 수정 {list.modify_date} </small>
//                                             </td>
//                                             <td>
//                                                 <div className="progress-container">
//                                                     <span className="progress-badge"><h6><small>완성도</small></h6></span>
//                                                     {/* 수정必*/}
//                                                     <Progress max="50" value="50" barClassName="progress-bar-success">
//                                                         <span className="progress-value"></span>
//                                                     </Progress>
//                                                 </div>
//                                             </td>
//                                             <td className="td-number">
//                                                 {/*<Col md="4">*/}
//                                                 <p className="category">{""}</p>
//                                                 {/*<Switch onColor="default" offColor="default" />{" "}*/}
//                                                 <Switch
//                                                     defaultValue={list.open_yn}
//                                                     onText="공개"
//                                                     offText="Off"
//                                                     onColor="default"
//                                                     offColor="default"
//                                                 />
//                                                 {/*</Col>*/}
//                                                 <Button
//                                                     className="btn-neutral"
//                                                     color="default"
//                                                     data-placement="left"
//                                                     onClick={() => warningWithConfirmMessage(list)}
//                                                     id="tooltip848814788"
//                                                     title=""
//                                                     type="button"
//                                                 >
//                                                     <i className="nc-icon nc-simple-remove"/>
//                                                 </Button>
//                                             </td>
//                                         </tr>
//                                     )
//                                 )}
//                                 </tbody>
//                             ):(<td>등록된 이력서가 없습니다.</td>)}
//                         </>
//                     ):(
//                         <LoaderSpinner/>
//                     )}
//                 </Table>
//                 {/* 이력서 삭제 Modal */}
//                 {removeAlert}
//                 <Row>
//                     <Col className="col-md-4">
//                         <label>
//                             <Button color="primary"
//                                     variant="outlined"
//                                     component="span"
//                                     onClick={onAddResume}>
//                                 새이력서 작성
//                             </Button>
//                         </label>
//                         {/* 이력서 업로드 */}
//                         <input
//                             // accept="image/*"
//                             // className={classes.input}
//                             style={{ display: 'none' }}
//                             id="resume_file"
//                             type="file"
//                             onChange={(e)=>setResumeFile(e.target.files[0])}
//                         />
//                         <label htmlFor="resume_file">
//                             <Button color="primary"
//                                     variant="outlined"
//                                     component="span"
//                                     type="submit"
//                                 // className={classes.button}
//                             >
//                                 업로드
//                             </Button>
//                         </label>
//                     </Col>
//
//                     {/*<Col className="col-md-2 ml-auto">*/}
//
//                     {/*</Col>*/}
//                     {/*<form onSubmit={handleSubmit}>
//                         <Input type="file"
//                                id="resume_file"
//                                accept="image/png, image/jpeg, file"
//                                onChange={handleUploadChange} required/>
//                         <Input type="submit"/>
//                     </form>*/}
//                 </Row>
//                 {/*<PictureUpload/>*/}
//
//             </Container>
//         </div>
//     )
// }
//
// export default ResumeList;
//
//
// // function mapStateToProps(state) {
// //     return {
// //         user: state.auth.user
// //     }
// // }
// //
// // export default connect(mapStateToProps, {getUserProfile})(ResumeList);
//
//
