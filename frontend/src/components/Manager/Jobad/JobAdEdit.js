// import React from 'react';
// import JobAdEditForm from './JobAdEditForm';
// import history from "../../../utils/historyUtils";
// import {useDispatch} from "react-redux";
// import {Card, CardBody, CardHeader, CardTitle, Container} from "reactstrap"
// import defaultClient from "../../../utils/defaultClient";
// import store from "../../../store";
//
// const JobAdEdit = (props) => {
//     //const [jobad, setJobAd] = useState(null);
//     const id = props.match.params.id;
//     const dispatch = useDispatch();
//     // useEffect(() => {
//     //     setApiData(props.location.state.jobad).then(function(result){
//     //          dispatch(result);
//     //     });
//     //     //setJobAd(props.location.state.jobad);
//     // }, []);
//     const submitForm = (formData) => {
//         formData.job_manager = formData.job_manager.value;
//         return defaultClient.patch(apiUrls.JOB_ADVERTISE + id + "/",
//             formData, {
//             headers: {
//                 authorization: 'Token ' + store.getState().auth.token
//             }
//         }
//         ).then(res => {
//             console.log(res);
//             window.notify.onChange('정상적으로 처리되었습니다.');
//             history.push("/Mng/jobad");
//         }).catch(error => {
//             alert("실패했습니다.");
//             console.log(error.response.data);
//         });
//     };
//
//     return (
//         <Container className="col-sm-12 col-md-6 offset-md-3">
//             <Card>
//                 <CardHeader className="text-center"><CardTitle tag="h4">채용공고</CardTitle></CardHeader><hr/>
//                 <CardBody>
//                     <JobAdEditForm history={props} onSubmit={submitForm} initialValues={props.location.state.jobad}/>
//                 </CardBody>
//             </Card>
//         </Container>
//
//     )
// }
//
// export default JobAdEdit;
