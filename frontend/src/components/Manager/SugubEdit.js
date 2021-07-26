// import React, {useEffect, useState} from 'react';
// import SugubEditForm from './Sugub/SugubEditForm';
// import history from "../../utils/historyUtils";
// import defaultClient from "../../utils/defaultClient";
// import {CardTitle, Container} from "reactstrap"
// import Modal from "./modal.js"
// import {getUserToken} from "../../utils/authUtils";
// import store from "../../store";
//
// const SugubEdit = (props) => {
//     const [sugub, setSugub] = useState(null);
//     const id = props.match.params.id;
//     const token = getUserToken(store.getState());
//     useEffect(() => {
//         //case not undefined : 수정
//         if(props.location.state != undefined) {
//             setSugub(props.location.state.sugub);
//         }
//     }, []);
//     const submitForm = (formData) => {
//
//         // formData.sugub_status = sugub.sugub_status;
//         // formData.user = formData.user.value;
//         // formData.companyprofile = formData.companyprofile.value;
//         if(formData.sugub_jikjong_low != undefined){
//             formData.sugub_jikjong_low.map((value, index) => {
//                 if(formData.sugub_jikjong_low[index].value){
//                     formData.sugub_jikjong_low[index] = formData.sugub_jikjong_low[index].value;
//                 }
//             });
//         }
//         if(sugub != undefined){
//             formData.id = sugub.id;
//             defaultClient.patch(apiUrls.SUGUB + sugub.id + "/",formData,{
//                 headers:{
//                     authorization: 'Token ' + token
//                 },
//             }).then(res => {
//                 window.notify.onChange('정상적으로 처리되었습니다.');
//                 history.push('/Mng/SugubListDetail/CC0100000');
//             });
//         } else{
//             // formData.id = null;
//             formData.user = store.getState().auth.user.id;
//             formData.sugub_status = 'CC0100000';
//             formData.companyprofile = store.getState().auth.company.id;
//             formData.jobadvertise = null;
//             formData.created_at = null;
//             formData.created_time = null;
//             formData.modified_time = null;
//             defaultClient.post(apiUrls.SUGUB , formData,{
//                 headers:{
//                     authorization: 'Token ' + token
//                 },
//             }).then(res => {
//                 window.notify.onChange('정상적으로 처리되었습니다.');
//                 history.push('/Mng/SugubListDetail/CC0100000');
//             }).catch((error) => {
//                 console.log(error.response.data);
//                 alert('실패했습니다.');
//                 history.push('Mng/SugubListDetail/CC0100000');
//             });
//         }
//     };
//
//
//     return(
//            <Container>
//                 <CardTitle tag="h3">수급의뢰서</CardTitle>
//                 <hr/>
//                 <Modal buttonLabel={"이전수급불러오기"} />
//                 <SugubEditForm history={props} onSubmit={submitForm} initialValues={sugub} />
//             </Container>
//        )
// }
//
// export default SugubEdit;
