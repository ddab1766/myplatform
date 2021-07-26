// import React, {useEffect} from 'react';
// import JobApEditForm from './JobApEditForm';
// import axios from 'axios';
// import {apiUrls, AuthUrls} from "../../../constants/urls";
// import history from "../../../utils/historyUtils";
// import {useDispatch} from "react-redux";
// import {Card, CardBody, CardHeader, CardTitle, Container} from "reactstrap"
// import store from "../../../store";
//
// const JobApEdit = (props) => {
//     //const [jobad, setJobAd] = useState(null);
//     const id = props.match.params.id;
//     const jobApUrl = AuthUrls.JOBAP;
//     const dispatch = useDispatch();
//     console.log(props.location.state.jobap);
//     useEffect(() => {
//         // setApiData(props.location.state.jobap).then(function(result){
//         //      dispatch(result);
//         // });
//         //setJobAd(props.location.state.jobad);
//     }, []);
//     const submitForm = (formData) => {
//         axios.patch(apiUrls.JOB_APPLICANT + id + "/",
//             formData, {
//                 headers: {
//                     authorization: 'Token ' + store.getState().auth.token
//                 },
//             }
//         ).then(res => {
//             window.notify.onChange('정상적으로 처리되었습니다.');
//             history.goBack();
//         })
//     };
//
//     return (
//         <Container className="col-sm-12 col-md-6 offset-md-3">
//             <Card>
//             <CardHeader className="text-center"><CardTitle tag="h4">지원자정보</CardTitle></CardHeader><hr/>
//                 <CardBody>
//                     <JobApEditForm history={props} onSubmit={submitForm} initialValues={props.location.state.jobap}/>
//                 </CardBody>
//             </Card>
//         </Container>
//     )
// }
//
// export default JobApEdit;
