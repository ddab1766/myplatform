// import React, {useCallback, useEffect, useRef, useState} from "react";
// import {Button, Label, Modal, Spinner} from "reactstrap";
// import axios from "axios";
// import {apiUrls, AuthUrls} from "../../../constants/urls";
// import store from "../../../store";
// import {getUserToken} from "../../../utils/authUtils";
// import history from "../../../utils/historyUtils";
// import {Uploader} from "rsuite"
// import {checkApply} from "../../../actions/userActions";
// import moment from "moment";
//
// const reducePromises = (array, callback) => (
//     array.reduce((prevPrms, currElem, index) => (
//         prevPrms.then(async prevRes => {
//             const currRes = await callback(currElem, index);
//             return [...prevRes, currRes];
//         })
//     ), Promise.resolve([]))
// )
// const minValue = min => value =>
//     value && value < min ? `Must be at least ${min}` : undefined
// const minValue11 = minValue(11)
// const styles = {
//     lineHeight: '200px'
// };
//
// const Resume = (props) => {
//     const {sugub,modal,toggleModal,toggleReload} = props;
//     const [resumeFile, setResumeFile] = useState([]);
//     const [fileList, setFileList] = useState([]);
//     const [username, setUsername] = useState([]);
//     const [phone, setPhone] = useState([]);
//     const [birth, setBirth] = useState([]);
//     // const [modal, setModal] = useState(false);
//     const [submitting, setSubmitting] = useState(false);
//     const [failData, setFailData] = useState([]);
//     const [person, setPerson] = useState([]);
//     const [cnt, setCnt] = useState(false);
//     const [dup, setDup] = useState([]);
//     useEffect(() => {
//         setResumeFile([]);
//         setFileList([]);
//         setFailData([]);
//         setDup([]);
//     },[modal])
//     function renderFilename(data){
//         var hr = store.getState().auth.hr.custname;
//         var position = sugub.work_position;
//         var username = data.name;
//         var format = data.file.name.split('.')[1];
//         var date = moment(new Date()).format('YYYYMMDD')
//
//         return hr+'_'+position+'_'+username+'_'+date+'.'+format;
//     }
//     const dateDiff = (_date1,_date2) => {
//         var diffDate_1 = _date1 instanceof Date ? _date1 :new Date(_date1);
//         var diffDate_2 = _date2 instanceof Date ? _date2 :new Date(_date2);
//
//         diffDate_1 =new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
//         diffDate_2 =new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());
//
//         var diff = diffDate_2.getTime() - diffDate_1.getTime();
//         diff = Math.ceil(diff / (1000 * 3600 * 24));
//
//         return diff > 0;
//
//     }
//     // const toggleModal = () => {
//     //     setModal(!modal);
//     //     setResumeFile([]);
//     //     setFileList([]);
//     //     setFailData([]);
//     // }
//     const fileInput = useRef();
//     const handleClick = () => {
//         fileInput.current.click();
//     }
//
//     //이력서 접수 실패시 , 임시 아이디 롤백
//     const deleteUserAccount = async (id) => {
//         try{
//             console.log('delete')
//             await axios.delete(AuthUrls.CREATE_TEMPREGISTER,{params:id}).then(console.log('secfce')).catch(error => console.log(error));
//         } catch(e){
//             console.log(e);
//         }
//     }
//     console.log(person)
//     const postData = useCallback(() => {
//         const token = getUserToken(store.getState());
//         const jobAds = sugub.jobadvertise[0];
//         setSubmitting(true);
//         let faildata = [];
//         reducePromises(person, (user,i) => {
//             console.log(user,i)
//             return axios.post(AuthUrls.CREATE_TEMPREGISTER,{
//                 birth:user.birth,
//                 username:user.name,
//                 phone:user.phone,
//                 // hrprofile:store.getState().auth.hr.id,
//                 jikjong_top:sugub.sugub_jikjong_top.code_id,
//                 jikjong_mid:sugub.sugub_jikjong_mid.code_id
//             }, {
//                 headers: {
//                     authorization: 'Token ' + store.getState().auth.token
//                 },
//             }).then((res) => {
//                 console.log(res);
//                 let formValues = new FormData();
//                 formValues.append('jobadvertise', jobAds.id);
//                 console.log('sssssssssssssssss',res.data.resume_id)
//                 formValues.append(`resume_pdf`, user.file.blobFile, renderFilename(user));
//
//                 formValues.append('resume_filename', user.file.name);
//                 formValues.append('applied_status', 'BW0100000');
//                 formValues.append('applied_username', user.name);
//                 formValues.append('applied_phone', user.phone);
//                 formValues.append('applied_birth', user.birth);
//                 formValues.append('user', res.data.user_id);
//                 formValues.append('resume', res.data.resume_id);
//
//                 return axios.post(apiUrls.JOB_APPLICANT, formValues, {
//                     headers: {
//                         'content-type': 'multipart/form-data',
//                         authorization: 'Token ' + token
//                     },
//                 })
//                     .then((data) => {
//                         toggleReload(data)
//                         console.log('success1',data)
//                     })
//                     .catch(function (error) {
//                         deleteUserAccount(res.data.user_id);
//                         console.log(error);
//                         faildata.push(username[i]);
//                     });
//             }).catch(function(error){
//                 setSubmitting(false);
//                 console.log(error.response);
//                 faildata.push(username[i]+' : '+error.response);
//                 // alert('업로드를 실패했습니다.');
//             })
//         })
//             .then(results => {
//                 console.log('success3')
//                 if(faildata.length > 0){
//                     alert('결과 : 실패 ' +  faildata.length + '건\n' + '[' + faildata + ']');
//                     toggleModal();
//                     setSubmitting(false);
//                 } else{
//                     window.notify.onChange('이력서를 접수하였습니다.');
//                     toggleModal();
//                     setSubmitting(false);
//
//
//                 }
//             })
//     })
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if(dup.length > 0){
//             if(window.confirm("다른 채용건에 접수중인 지원자가 있습니다. 그래도 진행하시겠습니까?")){
//             }else{
//                 return false;
//             }
//         }
//         postData();
//     };
//     async function showMessages(files) {
//         var p = [];
//         var array = [];
//         const messages = await Promise.all(
//             files.map(value=>{
//                 var file=value;
//                 var userinfo = file.name.split('_');
//                 var birth = userinfo[0]
//                 var name = userinfo[1]
//                 var phone = userinfo[2].split('.')[0]
//                 p.push({
//                     file:file,
//                     name:name,
//                     phone:phone,
//                     birth:birth});
//
//                 return checkApply(name, phone, birth).then((data) => {
//                     console.log(data[0].is_applied)
//                     if(data[0].is_applied){
//                         array.push(file.name)
//                     }
//                     console.log(array)
//
//                 })
//             })
//
//     );
//         setDup(array)
//         setPerson(p)
//     }
//     const handleUploadChange = (files) => {
//         setResumeFile([...resumeFile, files])
//         showMessages(files);
//
//
//     };
//     console.log(dup)
//     return (
//         <>
//
//             {
//                 <Modal size='lg' isOpen={modal} toggle={toggleModal} backdrop={true}>
//                 <div className="modal-header">
//                     <button
//                         aria-hidden={true}
//                         data-dismiss="modal"
//                         className="close"
//                         type="button"
//                         onClick={toggleModal}
//                     >
//                         <i className="nc-icon nc-simple-remove" />
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
//                         파일명은 반드시 양식을 따라주시기 바랍니다.(예:생년월일8자리_이름_전화번호11자리) *정확한 정보 필수!
//
//                         <hr/>
//                         <div>다른 채용건에 진행중인 지원자</div>
//                         {dup.map(v=> <div style={{color:'red'}}>{v + "\n"}</div> )}
//                         <hr/>
//
//                         <div>
//                             <Label>파일 업로드</Label>
//                             <Uploader autoUpload={false} onChange={handleUploadChange} draggable multiple
//                                       onRemove={(file) => {
//                                           if(dup.includes(file.name)){
//                                               setDup(dup.filter(v=>v !== file.name));
//                                           }
//                                       }}
//                             >
//                                 <div style={styles}>클릭하거나 파일을 드래그해주세요.</div>
//                             </Uploader>
//                         </div>
//                     </div>
//                     <div className="modal-footer">
//                         <Button type="submit" className="btn btn-primary m-3" disabled={submitting || person.length < 1}>
//                             {submitting === true && (
//                                 <Spinner
//                                     as="span"
//                                     animation="border"
//                                     size="sm"
//                                     role="status"
//                                     aria-hidden="true"
//                                 />)
//                             }
//                             이력서 제출
//                         </Button>
//                     </div>
//                 </form>
//             </Modal>
//             }
//
//         </>
//     )
// }
//
// export default Resume;
