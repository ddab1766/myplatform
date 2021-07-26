// import React from "react";
// // reactstrap components
// import {Route, Switch} from "react-router-dom";
// import {connect} from "react-redux";
// import SugubDetailList from "../../components/Manager/SugubDetailList";
// import ButtonGroup from "@material-ui/core/ButtonGroup";
// import Button from "@material-ui/core/Button";
// import history from "../../utils/historyUtils";
//
// const SugubDetailListView = (props) => {
//     const { match } = props;
//
//     const menuList = () => {
//         return (
//             <div>
//                 <div style={{borderBottom: "1px solid rgba(224, 224, 224, 1)",marginBottom: "10px"}} className="MuiPaper-elevation1">
//                     <ButtonGroup variant="contained" aria-label="contained button group" fullWidth="true" disableElevation={true}>
//                         <Button style={{color:'#007bff',backgroundColor:'white'}} onClick={() => { history.push(`${match.url}/CC0100000`)}}>제출완료(검토중)</Button>
//                         <Button style={{color:'#007bff',backgroundColor:'white'}} onClick={() => { history.push(`${match.url}/CC0200000`)}}>진행중</Button>
//                         <Button style={{color:'#007bff',backgroundColor:'white'}} onClick={() => { history.push(`${match.url}/CC0300000`)}}>종료된 수급</Button>
//                     </ButtonGroup>
//                 </div>
//                 {/*<Breadcrumb tag="nav" listTag="div">*/}
//                 {/*    <BreadcrumbItem>*/}
//                 {/*        <Link to={`${match.url}/CC0100000`}>제출완료(검토중)</Link>*/}
//                 {/*    </BreadcrumbItem>*/}
//                 {/*    <BreadcrumbItem>*/}
//                 {/*        <Link to={`${match.url}/CC0200000`}>진행중</Link>*/}
//                 {/*    </BreadcrumbItem>*/}
//                 {/*    <BreadcrumbItem>*/}
//                 {/*        <Link to={`${match.url}/CC0300000`}>종료된 수급</Link>*/}
//                 {/*    </BreadcrumbItem>*/}
//                 {/*    <span style={{marginLeft:'auto'}}>*/}
//                 {/*        /!*<button className="btn btn-primary btn-sm">*!/*/}
//                 {/*            <Link to={`/Mng/SugubEdit/`}>수급등록</Link>*/}
//                 {/*        /!*<Link to={{pathname:`/Mng/SugubEdit/${list.id}`,*!/*/}
//                 {/*        /!*                            state:{sugub:list}*!/*/}
//                 {/*        /!*                        }}>수급등록</Link>*!/*/}
//                 {/*        /!*</button>*!/*/}
//                 {/*    </span>*/}
//                 {/*</Breadcrumb>*/}
//
//             </div>
//         );
//     };
//     return (
//         <div className="content">
//             <div className="title">
//                 <h3>나의 수급의뢰서<br/>
//                     <small>
//                         수급요청 -> 공고요청 -> 채용공고 등록<br/>
//                     </small>
//                 </h3>
//             </div>
//             { menuList() }
//             <Switch>
//                 <Route path={`${match.url}/:type`} component={SugubDetailList}/>
//             </Switch>
//             <hr/>
//         </div>
//     )
// };
//
//
// function mapStateToProps(state) {
//     return {
//         // user: state.auth.user,
//         // company: state.auth.company
//     }
// }
//
// export default connect(mapStateToProps)(SugubDetailListView);