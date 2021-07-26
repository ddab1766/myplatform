// import React from "react";
// // reactstrap components
// import {Card, CardBody, CardHeader, Container,} from "reactstrap";
// import PagyeonForm from './PagyeonForm'
//
// const PagyeonDetail = (props) => {
//     console.log(props.location.state.pagyeons);
//     const pagyeonData = props.location.state.pagyeons;
//     // 관련 공고 받아오기
//     const submitForm = (formData) => {
//         // formData['sugub'] =  sugubData.id;
//         // formData['companyprofile'] =  sugubData.companyprofile;
//         // formData['resume'] =  pagyeonData.resume.id;
//         // axios.post(pagyeonUrl,formData
//         // ).then(res => {
//         //     console.log('formData',res);
//         //     history.back();
//         // })
//     };
//
//     return (
//         <div className="content">
//             <Container>
//                 <Card>
//                     <CardHeader></CardHeader>
//                     <CardBody>
//                         <PagyeonForm history={props} onSubmit={submitForm} initialValues={pagyeonData}/>
//                     </CardBody>
//                 </Card>
//             </Container>
//         </div>
//     )
// };
//
// export default PagyeonDetail;