// import React, {useEffect, useState} from "react";
// import {Col, Container, Nav, NavItem, NavLink, TabContent, Table, TabPane} from "reactstrap";
// import SugubApplicant from "components/Company/Sugub/SugubApplicant";
// import ChaeCard from "../../components/User/ChaeCard";
// import defaultClient from "../../utils/defaultClient";
// import SugubApplicantHR from "../../components/Company/Sugub/SugubApplicantHR";
// import LoaderSpinner from "../../components/Etc/LoaderSpinner";
// import {connect} from "react-redux";
// import {getUserProfile} from "../../actions/authActions";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
//
// // 수급진행상황
// function SugubStatus(props) {
//     const {authenticated, user, company} = props;
//     // 수급정보 받아오기
//     const {sugub} = props.location.state;
//     const [applicants, setApplicants] = useState(null);
//     const [jobAds, setJobAds] = useState([]);
//     const [horizontalTabs, setHorizontalTabs] = useState('chaegong');
//
//     useEffect(()=>{
//         if(!user) props.getUserProfile()
//     },[]);
//
//     useEffect(() => {
//         if (sugub) {
//             // 지원자 정보 받아오기
//             defaultClient
//                 .get(vUrls.JOB_APPLICANT, {
//                     params: {
//                         sugub_id: sugub.id,
//                     }
//                 })
//                 .then(({data}) => {
//                     setApplicants(data);
//                 })
//             // 관련 공고 받아오기
//             defaultClient
//                 .get(apiUrls.JOB_ADVERTISE, {
//                     params: {
//                         sugub: sugub.id
//                     }
//                 })
//                 .then(({data}) => {
//                     setJobAds(data);
//                 })
//         }
//     }, [sugub]);
//
//
//     return (
//         <div className="content">
//             <Container>
//                 <div className="title">
//                     <h3 className="text-md-left">진행상황<br/>
//                         <small>
//                             요청한 수급의 진행상황을 확인하는 화면입니다.<br/>
//                         </small>
//                     </h3>
//                 </div>
//                 <Card variant='outlined'>
//                     <CardContent>
//                         <h5>요청정보</h5>
//                         <Table>
//                             <thead>
//                             <tr>
//                                 <th>등록일</th>
//                                 <th>마감일</th>
//                                 <th>고용형태</th>
//                                 <th>경력사항</th>
//                                 <th>학력사항</th>
//                                 <th>포지션</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             <td>{sugub.created_at}<br/></td>
//                             <td>~{sugub.sugub_end_dt}<br/></td>
//                             <td>{sugub.chae_cd.code_name}<br/></td>
//                             <td>{sugub.sugub_career_gb.code_name}<br/></td>
//                             <td>{sugub.education_cd_code_name}<br/></td>
//                             <td>{sugub.work_position}<br/></td>
//                             </tbody>
//                         </Table>
//                         담당업무:<br/>{sugub.work_role && sugub.work_role.split('\n').map(line=>{
//                             return ( <>{line}<br/></> )
//                     })}
//                         {/*</small>*/}
//                     </CardContent>
//                 </Card>
//                 <hr/>
//                 <Card variant='outlined'>
//                     <CardContent>
//                     <h5>수급담당자</h5>
//                     {sugub.manager}
//                     </CardContent>
//                 </Card>
//                 <div>
//                     <div className="title">
//                         <h5>
//                             지원자목록<br/>
//                         </h5>
//                         <div>지원자의 상태 변경 및 리뷰 작성 등은 관리자 페이지에서 제공됩니다.</div>
//                         <button className='btn btn-sm' onClick={(e)=>window.open(`/Mng/SugubDetailStatus/${sugub.id}`, "_blank")}>
//                             관리 페이지로 이동{' '}
//                             <i className="nc-icon nc-share-66"/>
//                         </button>
//                     </div>
//                     <Card>
//                         <CardContent>
//                             <div className="nav-tabs-navigation">
//                                 <div className="nav-tabs-wrapper">
//                                     <Nav id="tabs" role="tablist" tabs>
//                                         <NavItem>
//                                             <NavLink
//                                                 aria-expanded={horizontalTabs === "chaegong"}
//                                                 data-toggle="tab"
//                                                 href="#"
//                                                 role="tab"
//                                                 className={
//                                                     horizontalTabs === "chaegong"
//                                                         ? "active"
//                                                         : ""
//                                                 }
//                                                 onClick={() =>
//                                                     setHorizontalTabs("chaegong" )
//                                                 }
//                                             >
//                                                 채공 이력서 {applicants && (
//                                                 /* 플랫폼으로 직접 지원 && 접수대기 상태 x */
//                                                 <>({applicants.filter(v => v.companyprofile === 151 && v.applied_status !== 'BW0100000').length})</> )
//                                             }
//                                             </NavLink>
//                                         </NavItem>
//                                         <NavItem>
//                                             <NavLink
//                                                 aria-expanded={
//                                                     horizontalTabs === "hr"
//                                                 }
//                                                 data-toggle="tab"
//                                                 href="#"
//                                                 role="tab"
//                                                 className={
//                                                     horizontalTabs === "hr"
//                                                         ? "active"
//                                                         : ""
//                                                 }
//                                                 onClick={() =>
//                                                     setHorizontalTabs("hr")
//                                                 }
//                                             >
//                                                 HR회사 이력서 {applicants && (
//                                                 <>({applicants.filter(v => v.companyprofile !== 151).length})</> )
//                                             }
//                                             </NavLink>
//                                         </NavItem>
//                                     </Nav>
//                                 </div>
//                             </div>
//                             <TabContent
//                                 className="text-center"
//                                 id="my-tab-content"
//                                 activeTab={horizontalTabs}
//                             >
//                                 <TabPane tabId="chaegong" role="tabpanel">
//                                     {sugub && applicants ? (
//                                         <SugubApplicant sugub={sugub} applicants={applicants} />
//                                     ):( <LoaderSpinner/>)}
//                                 </TabPane>
//                                 <TabPane tabId="hr" role="tabpanel">
//                                     {sugub && applicants ? (
//                                         <SugubApplicantHR sugub={sugub} applicants={applicants} />
//                                     ):( <LoaderSpinner/>)}
//                                 </TabPane>
//                             </TabContent>
//                         </CardContent>
//                     </Card>
//
//                 </div>
//                 {/*<div>
//                     <Card>
//                         <CardHeader>
//                             <h5>추천인재</h5>
//                             <hr/>
//                         </CardHeader>
//                         <CardBody>
//                             //todo 추천인재가 없습니다.
//                         </CardBody>
//                     </Card>
//                 </div>*/}
//                 <div>
//                     <hr/>
//                     <div className="title">
//                         <h5>해당 채용공고</h5>
//                     </div>
//                     <hr/>
//                     {jobAds.map((jobAd, index) => (
//                         <Col md="3">
//                             <ChaeCard key={index} chaeList={jobAd}/>
//                         </Col>
//                     ))}
//
//                 </div>
//             </Container>
//         </div>
//     )
// }
//
// function mapStateToProps(state) {
//     return {
//         authenticated: state.auth.authenticated,
//         user: state.auth.user,
//         company: state.auth.company
//     }
// }
//
// export default connect(mapStateToProps, {getUserProfile})(SugubStatus);
// // export default SugubStatus;
