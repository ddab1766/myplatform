// import React, {useState} from 'react'
// import {suspendJobAd} from "../../actions/sugubActions";
// import {Col, Container, Spinner} from "reactstrap";
// import history from "utils/historyUtils";
//
//
// const AdvertiseSuspend = props => {
//     const [submitting, setSubmitting] = useState(false);
//     console.log('AdvertiseSuspend props', props)
//     const {jobAdid} = props.match.params;
//     const onHandleSubmit = (jobAdid) => {
//         setSubmitting(true);
//         suspendJobAd(jobAdid).then((res)=>{
//             history.goBack()
//         })
//     }
//
//     return (
//
//         <Container>
//             <div className="content">
//                 <h3 className="title">게시 중지 요청<br/>
//                     <small>
//                         게시 중지 시 파견사업주가 해당 수급의뢰서의 내용을 확인할 수 없게 됩니다.<br/>
//                     </small>
//                 </h3>
//                 <hr/>
//                 <form onSubmit={()=>onHandleSubmit(jobAdid)}>
//                     <Col className="ml-auto">
//                         <fieldset className="form-group">
//                             <button type="button" className="btn btn-lg btn-outline-default"
//                                     onClick={(e)=>history.goBack()}>
//                                 이전
//                             </button>
//                             <button action="submit" className="btn btn-lg btn-primary" disabled={submitting}>
//                                 {submitting === true && (
//                                     <Spinner
//                                         as="span"
//                                         animation="border"
//                                         size="sm"
//                                         role="status"
//                                         aria-hidden="true"
//                                     />)
//                                 }요청
//                             </button>
//                         </fieldset>
//                     </Col>
//                 </form>
//             </div>
//         </Container>
//     )
// }
//
//
// export default AdvertiseSuspend;
