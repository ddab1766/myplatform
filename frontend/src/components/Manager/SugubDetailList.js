// import React, {useEffect, useState} from "react";
// import {connect} from "react-redux";
// import axios from "axios";
// import {Button, UncontrolledTooltip} from "reactstrap";
// import Link from "react-router-dom/Link";
// import ReactBSAlert from "react-bootstrap-sweetalert";
// import {getUserProfile} from "../../actions/authActions";
// import defaultClient from "../../utils/defaultClient";
// import {getUserToken} from "../../utils/authUtils";
// import store from "../../store";
// import Table from "@material-ui/core/Table";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import TableHead from "@material-ui/core/TableHead";
// import TableBody from "@material-ui/core/TableBody";
// import TableRow from "@material-ui/core/TableRow";
// import TableCell from "@material-ui/core/TableCell";
//
// const SugubDetailList = (props) => {
//     const company = props.company;
//     const {type} = props.match.params;
//     const user = props.user;
//
//     const [sugubList, setSugubList] = useState([]);
//     const [alert, setAlert] = useState([]);
//     const token = getUserToken(store.getState());
//
//     useEffect(() => {
//         if (company) {
//             defaultClient
//                 .get(vUrls.SUGUB, {
//                     headers:{
//                         authorization: 'Token ' + token
//                     },
//                     params: {
//                         user: user.id,
//                         sugub_status: type,
//                         companyprofile: company.id
//                     }
//                 })
//                 .then(({data}) => {
//                     setSugubList(data)
//                 }).catch(error => {
//                     console.log(error);
//             })
//         }
//     }, [company,type]);
//
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
//         axios
//             .delete(apiUrls.SUGUB + list.id + '/', {
//                 headers:{
//                     authorization: 'Token ' + token
//                 }
//             })
//             .then((res) => {
//                 setSugubList(sugubList.filter(m => m.id !== list.id));
//                 setAlert(
//                     (
//                         <ReactBSAlert
//                             success
//                             style={{display: "block", marginTop: "100px"}}
//                             title="삭제되었습니다!"
//                             onConfirm={() => hideAlert()}
//                             onCancel={() => hideAlert()}
//                             confirmBtnBsStyle="info"
//                         >
//                         </ReactBSAlert>
//                     )
//                 );
//             });
//     };
//
//     console.log('sugubList', sugubList)
//     return (
//         <Card>
//             <CardContent>
//                 <Table size="small" aria-label="a dense table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>접수마감일</TableCell>
//                             <TableCell>채용형태</TableCell>
//                             <TableCell>수급정보</TableCell>
//                             <TableCell>경력구분</TableCell>
//                             <TableCell>진행상태</TableCell>
//                             <TableCell>공고상태</TableCell>
//                             <TableCell></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {sugubList.length > 0 ? sugubList.map((list,index) => (
//                                 <TableRow hover key={index}>
//                                     <TableCell>{list.sugub_end_dt}</TableCell>
//                                     <TableCell>{list.chae_cd.code_name}</TableCell>
//                                     <TableCell className="td-name">
//                                         { list.sugub_status.code_id === 'CC0100000' ?
//                                             (<>
//                                                 {list.work_position}
//                                             </>) : (
//                                                 <>
//                                                     <small>{" "}{list.created_at}</small><br/>
//                                                     <Link className="nav-link"
//                                                         //to={`/User/Resume_edit/${list.id}`}
//                                                           to={{
//                                                               pathname: `/Mng/SugubDetailStatus/${list.id}`,
//                                                               state: {
//                                                                   sugub: list
//                                                               }
//                                                           }}
//                                                     >{list.work_position}<br/>
//                                                     </Link>
//                                                 </>
//                                             )
//                                         }
//
//
//                                         {/*<small>{" "}{list.work_role}</small><br/>*/}
//                                     </TableCell>
//
//                                     {/*<td>{list.education_codenm}</td>*/}
//                                     <TableCell>{list.sugub_career_gb.code_name}</TableCell>
//                                     {/*<td>{list.sugub_jikjong_mid}</td>*/}
//                                     <TableCell>{list.sugub_status.code_name}</TableCell>
//                                     {list.jobadvertise[0] ? (
//                                         <TableCell>요청완료</TableCell>
//                                     ) : (
//                                         <TableCell>
//                                             <Link className="btn btn-sm btn-primary"
//                                                   to={{
//                                                       pathname: `/Company/ReqJobAd/${list.id}`,
//                                                       // state: {
//                                                       //     sugub: list
//                                                       // }
//                                                   }}
//                                             >공고요청
//                                             </Link>
//                                         </TableCell>
//                                     )
//                                     }
//
//                                     {alert}
//                                     <TableCell className="td-actions">
//                                         {list.sugub_status.code_id === 'CC0300000' && ( // 수급종료 상태일 경우
//                                             <>
//                                                 <Link to={`/Mng/Review/${list.id}`}>
//                                                     <Button
//                                                         className="btn-icon btn-neutral"
//                                                         color="success"
//                                                         id="tooltip159182735"
//                                                         // onClick={()=>{}}
//                                                         size="sm"
//                                                         type="button"
//                                                     >
//                                                         <i className="fa fa-edit" />
//                                                     </Button>
//                                                 </Link>
//                                                 <UncontrolledTooltip
//                                                     delay={0}
//                                                     target="tooltip159182735"
//                                                 >
//                                                     리뷰남기기
//                                                 </UncontrolledTooltip>{' '}
//                                             </>
//                                         )}
//                                         {list.sugub_status.code_id === 'CC0100000' && ( // 검토중 상태일 경우
//                                             <>
//                                                 <Link to={{pathname:`/Mng/SugubEdit/${list.id}`,
//                                                     state:{sugub:list}
//                                                 }}>
//                                                     <Button
//                                                         className="btn-icon btn-neutral"
//                                                         color="danger"
//                                                         id="tooltip808966391"
//                                                         size="sm"
//                                                         type="button"
//                                                     >
//                                                         <i className="nc-icon nc-ruler-pencil"></i>
//                                                     </Button>
//                                                 </Link>
//                                                 <UncontrolledTooltip
//                                                     delay={0}
//                                                     target="tooltip808966391"
//                                                 >
//                                                     수정
//                                                 </UncontrolledTooltip>
//                                                 <Button
//                                                     className="btn-icon btn-neutral"
//                                                     color="danger"
//                                                     id="tooltip808966390"
//                                                     onClick={() => warningWithConfirmMessage(list)}
//                                                     size="sm"
//                                                     type="button"
//                                                 >
//                                                     <i className="fa fa-times" />
//                                                 </Button>
//                                                 <UncontrolledTooltip
//                                                     delay={0}
//                                                     target="tooltip808966390"
//                                                 >
//                                                     삭제
//                                                 </UncontrolledTooltip>
//
//                                             </>
//                                         )}
//                                     </TableCell>
//                                 </TableRow>
//                             )
//                             ) :
//                             (
//                                 <TableRow hover>
//                                     <TableCell colSpan={7}> 수급이 존재하지 않습니다. </TableCell>
//                                 </TableRow>
//                             )
//                         }
//                     </TableBody>
//                 </Table>
//             </CardContent>
//         </Card>
//     )
// };
//
// function mapStateToProps(state) {
//     return {
//         user: state.auth.user,
//         company: state.auth.company
//     }
// }
//
// export default connect(mapStateToProps, {getUserProfile})(SugubDetailList)