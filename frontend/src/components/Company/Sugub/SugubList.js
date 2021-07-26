// import React, {useEffect, useState} from "react";
// import {connect} from "react-redux";
// import {Button, Card, CardBody, Table} from "reactstrap";
// import Link from "react-router-dom/Link";
// import ReactBSAlert from "react-bootstrap-sweetalert";
// import LoaderSpinner from "../../Etc/LoaderSpinner";
// import {deleteSugub, getSugub} from "../../../actions/sugubActions";
// import {getCompanyProfile} from "../../../actions/authActions";
//
// const SugubList = (props) => {
//     const {type} = props.match.params;
//     const {user, company} = props;
//     const [sugubList, setSugubList] = useState(null);
//     const [alert, setAlert] = useState([]);
//     const [permission, setPermission] = useState('CG0100000');
//
//     useEffect(() => {
//
//         if(user && company) {
//             // 권한 설정
//             // setPermission(company.company_coworker.filter( v=> v.user.id === user.id)[0].companyprofile_auth);
//             setPermission(company.company_coworker && company.company_coworker.filter( v=> v.user === user.email)[0].companyprofile_auth.code_id);
//             // 기본 권한
//             if(permission === 'CG0100000'){
//                 setSugubList(company.company_sugub.filter(v=>v.sugub_status === type && v.user === user.id))
//             }
//             // 마스터 권한
//             else{
//                 setSugubList(company.company_sugub.filter(v=>v.sugub_status === type))
//             }
//
//         }
//     }, [company]);
//
//     useEffect(()=>{
//         // if(!type) return;
//         setSugubList(null); // 수급List 초기화
//
//         let params = {};
//         // params.sugub_status = type;
//         // getSugub().then((data) => setSugubList(data))
//
//     }, [company, type]);
//
//     const warningWithConfirmMessage = (list) => {
//         setAlert(
//             (
//                 <ReactBSAlert
//                     warning
//                     style={{display: "block", marginTop: "100px"}}
//                     title="삭제하시겠습니까?"
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
//     const hideAlert = () => {
//         setAlert(null);
//     };
//
//     const successDelete = (list) => {
//         deleteSugub(list.id)
//             .then((response)=> {
//                     setSugubList(sugubList.filter(m => m.id !== list.id));
//                     setAlert(
//                         (
//                             <ReactBSAlert
//                                 success
//                                 style={{display: "block", marginTop: "100px"}}
//                                 title="삭제되었습니다!"
//                                 onConfirm={() => hideAlert()}
//                                 onCancel={() => hideAlert()}
//                                 confirmBtnBsStyle="info"
//                             >
//                                 {/*Your imaginary file has been deleted.*/}
//                             </ReactBSAlert>
//                         )
//                     );
//                     props.getCompanyProfile();
//                     // props.getSugub();
//                 }
//             )
//     };
//     return (
//         <Card>
//             <CardBody>
//                 <div className="text-center react-bootstrap-table">
//                     {sugubList ? (
//                         <Table className="text-center ">
//                             <thead>
//                             <tr>
//                                 <td>진행상태</td>
//                                 <td>의뢰일</td>
//                                 <td>접수마감일</td>
//                                 <td>직종</td>
//                                 <td>채용형태</td>
//                                 <td>포지션</td>
//                                 <td>경력구분</td>
//                                 <td>연봉</td>
//                                 <td>공고상태</td>
//                                 <td>제출취소</td>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {sugubList.length > 0 ? sugubList.map((list,index) => (
//                                     <tr key={index}>
//                                         <td>
//                                             {list.sugub_status.code_id === 'CC0100000' ?
//                                                 (
//                                                     <Link className="nav-link p-0"
//                                                           to={{
//                                                               pathname: `/Company/SugubDetailInfo/${list.id}`,
//                                                               state: {
//                                                                   sugub: list
//                                                               }
//                                                           }}
//                                                     >{list.sugub_status.code_name}<br/>
//                                                     </Link>
//                                                 ):
//                                                 (
//                                                     <Link className="nav-link"
//                                                           to={{
//                                                               pathname: `/Company/SugubInfo/${list.id}`,
//                                                               state: {
//                                                                   sugub: list
//                                                               }
//                                                           }}
//                                                     >{list.sugub_status.code_name}<br/>
//                                                     </Link>
//                                                 )}
//
//                                         </td>
//                                         <td>{list.created_at}</td>
//                                         <td>{list.sugub_end_dt}</td>
//                                         <td>{list.sugub_jikjong_top.code_name}</td>
//                                         <td>{list.chae_cd.code_name}</td>
//                                         <td>{list.work_position}</td>
//
//                                         <td>{list.sugub_career_gb.code_name}</td>
//                                         <td>{list.salary_start}-{list.salary_end}</td>
//                                         {list.jobadvertise[0] ? (
//                                             <td>요청완료
//                                                 <Link to={{
//                                                     pathname: `/Company/ReqJobAd/${list.id}`,
//                                                     state: {
//                                                         jobadvertise: list.jobadvertise[0]
//                                                     }
//                                                 }}>
//                                         <span className="btn-label">
//                                           <i className="nc-icon nc-settings-gear-65" />
//                                         </span>
//                                                 </Link></td>
//                                         ) : (
//                                             <td>
//                                                 <Link className="btn btn-sm btn-info"
//                                                       to={{
//                                                           pathname: `/Company/ReqJobAd/${list.id}`,
//                                                           // state: {
//                                                           //     sugub: list
//                                                           // }
//                                                       }}
//                                                 >접수요청
//                                                 </Link>
//                                             </td>
//                                         )
//                                         }
//
//                                         {alert}
//                                         <td>
//                                             <Button className="btn-danger"
//                                                     color="link"
//                                                 // id="tooltip476609793"
//                                                     onClick={() => warningWithConfirmMessage(list)}
//                                                     size="sm"
//                                             >취소
//                                                 {/*<i className="nc-icon nc-simple-remove" />*/}
//                                             </Button>
//                                         </td>
//                                     </tr>
//                                 )
//                                 ) :
//                                 (
//                                     <tr><td>수급이 존재하지 않습니다.</td></tr>
//                                 )
//                             }
//                             </tbody>
//                         </Table>
//                     ) : (<LoaderSpinner/>)}
//                 </div>
//             </CardBody>
//         </Card>
//     )
// };
//
// function mapStateToProps(state) {
//     return {
//         user: state.auth.user,
//         company: state.auth.company,
//     }
// }
//
// export default connect(mapStateToProps, {getSugub, getCompanyProfile})(SugubList)
