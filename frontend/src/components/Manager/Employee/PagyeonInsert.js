// import React from 'react';
// import PagyeonEditForm from './PagyeonEditForm';
// import {PagyeonUrls} from "../../constants/urls";
// import history from "../../utils/historyUtils";
// import {useDispatch} from "react-redux";
// import {Card, CardBody, CardHeader, CardTitle, Col, Container, Row, Table} from "reactstrap"
// import defaultClient from "../../utils/defaultClient";
//
// const PagyeonInsert = (props) => {
//     //const [jobad, setJobAd] = useState(null);
//     const id = props.match.params.id;
//     const pagyeonUrl = PagyeonUrls.PAGYEON_LIST;
//     const dispatch = useDispatch();
//     let pagyeonData;
//     let sugubData;
//     if(props.location.state != null){
//         pagyeonData = props.location.state.pagyeonData;
//         sugubData = props.location.state.sugub;
//     } else{
//         pagyeonData = ''
//         sugubData = ''
//     }
//
//     let resume_filename;
//     console.log(pagyeonData, sugubData);
//     if(pagyeonData.resume != null){
//         resume_filename = pagyeonData.resume_filename;
//     } else{
//         resume_filename = resume_filename;
//     }
//     // useEffect(() => {
//     //     setApiData(props.location.state.jobap).then(function(result){
//     //          dispatch(result);
//     //     });
//     //     //setJobAd(props.location.state.jobad);
//     // }, []);
//     const submitForm = (formData) => {
//         formData['sugub'] =  sugubData.id;
//         formData['companyprofile'] =  sugubData.companyprofile;
//         formData['resume'] =  pagyeonData.resume.id;
//         defaultClient.post(pagyeonUrl,formData
//         ).then(res => {
//             console.log('formData',res);
//             history.push('/admin');
//         }).catch(function (error) {
//             console.log(error.response.data);
//           });
//     };
//
//     return (
//         <>
//         <Container className="col-sm-12 col-md-6 offset-md-3">
//             <Card>
//             <CardHeader className="text-center"><CardTitle tag="h4">파견사원 등록</CardTitle></CardHeader>
//             <hr />
//                 <CardBody>
//                     <Row>
//                             <Col>
//                                 <Table style={{backgroundColor: "#efefef"}}>
//                                     <tbody>
//                                         <tr>
//                                             <td>수급ID</td>
//                                             <td>{sugubData.id}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>직종</td>
//                                             <td>{sugubData.sugub_jikjong_mid_nm}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>기업명</td>
//                                             <td>{sugubData.companyprofile_nm}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>이력서</td>
//                                             <td>
//                                                 <a href={'https://storage.googleapis.com/chaegong.appspot.com/media/uploads/' + resume_filename} > {resume_filename} </a>
//                                             </td>
//                                         </tr>
//                                     </tbody>
//                                 </Table>
//                             </Col>
//                     </Row>
//                     <hr/>
//                     <PagyeonEditForm history={props} onSubmit={submitForm} />
//                 </CardBody>
//             </Card>
//         </Container>
//             </>
//     )
// }
//
// export default PagyeonInsert;
