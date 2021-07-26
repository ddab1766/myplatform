// import React, {useEffect} from "react";
// // reactstrap components
// import {Container,} from "reactstrap";
// import {connect} from "react-redux";
// import SugubList from "../../components/Company/Sugub/SugubList";
// import {getUserProfile} from "../../actions/authActions";
// import Tooltip from '@material-ui/core/Tooltip';
// import LoaderSpinner from "../../components/Etc/LoaderSpinner";
// import SectionSugub from "./SectionSugub";
// import ButtonGroup from "@material-ui/core/ButtonGroup";
// import Button from "@material-ui/core/Button";
// import history from "../../utils/historyUtils";
//
// const longText1 = `내부 HR 담당자가 수급을 검토중인 상태입니다. 신청내역을 변경 가능합니다.`;
//
// const longText2 = `수급이 진행중이며, 수급 변경이 불가능합니다.`;
//
// const longText3 = `재진행 및 추가진행이 가능합니다.`;
//
// const SugubListView = (props) => {
//     const {match, user, company} = props;
//
//     useEffect(() => {
//         if (!user) {
//             props.getUserProfile();
//             console.log('useeffect user');
//         }
//     }, [user]);
//
//     // console.log('SugubListView props user', user);
//     console.log('SugubListView props company', company);
//     const menuList = () => {
//         return (
//             <div>
//                 <div className="MuiPaper-elevation1">
//                     <ButtonGroup aria-label="contained button group" fullWidth={true} disableElevation={true} >
//                         <Button className="border-top-0 border-left-0"
//                             onClick={() => { history.push(`${match.url}`)}}>
//                             전체({company && company.company_sugub.length})</Button>
//                         <Button className="border-top-0 border-right-0"
//                             style={history.location.pathname.indexOf('CC0100000') != -1 ? {color:"#2b90d9"} : {color:"#686a6d"}}
//                                  onClick={() => { history.push(`${match.url}/CC0100000`)}}>
//                             제출완료({company && company.company_sugub.filter(v=> v.sugub_status.code_id === 'CC0100000').length})
//                             <Tooltip title={longText1}
//                                  placement="top"
//                         ><i className="fa fa-info-circle"/></Tooltip>
//                         </Button>
//
//                         <Button className="border-top-0"
//                             style={history.location.pathname.indexOf('CC0200000') != -1 ? {color:"#2b90d9"} : {color:"#686a6d"}}
//                             onClick={() => { history.push(`${match.url}/CC0200000`)}}>
//                             진행중({company && company.company_sugub.filter(v=> v.sugub_status.code_id === 'CC0200000').length})
//                             <Tooltip title={longText2}
//                                  placement="top"
//                         ><i className="fa fa-info-circle"/></Tooltip>
//                         </Button>
//                         <Button className="border-top-0 border-right-0"
//                             style={history.location.pathname.indexOf('CC0300000') != -1 ? {color:"#2b90d9"} : {color:"#686a6d"}}
//                             onClick={() => { history.push(`${match.url}/CC0300000`)}}>
//                             종료된 수급({company && company.company_sugub.filter(v=> v.sugub_status.code_id === 'CC0300000').length})
//                             <Tooltip title={longText3}
//                                  placement="top"
//                         ><i className="fa fa-info-circle"/></Tooltip>
//                         </Button>
//                     </ButtonGroup>
//                 </div>
//
//             </div>
//         );
//     };
//
//     return props.authenticated ? (
//         <div className="content">
//             {
//                 user && company ?
//                     (
//                         <>
//                             {company ? (
//                                 <>
//                                     <Container>
//                                         {company.company_sugub.length > 0 ? (
//                                             <>
//                                                 <div className="title">
//                                                     <h3>나의요청<br/>
//                                                         <small>
//                                                             수급요청(사용사업주) -> 수급 진행여부 판단(플랫폼) -> 공고요청(사용사업주) -> 채용공고 등록(플랫폼)
//                                                         </small>
//                                                     </h3>
//
//                                                 </div>
//                                                 {/*<div className="description">*/}
//                                                 {/*    Process : 제출완료(검토중)<i className="fa fa-info-circle"/> -> 진행중 -> 수급종료*/}
//                                                 {/*</div>*/}
//                                                 {menuList()}
//                                                 {/*<Switch>*/}
//                                                 {/*    <Route path={`${match.url}/:type`} component={SugubList}/>*/}
//                                                 {/*    <Route path={`${match.url}`} component={SugubList}/>*/}
//                                                 {/*</Switch>*/}
//                                                 <SugubList />
//                                             </>
//                                         ) : <SectionSugub/>}
//
//                                     </Container>
//                                     < hr/>
//                                 </>
//                             ):(<SectionSugub/>)}
//                         </>
//                     ) : (<LoaderSpinner/>)
//             }
//         </div>
//     ) : ( <SectionSugub/>)
// }
//
//
// function mapStateToProps(state) {
//     return {
//         authenticated: state.auth.authenticated,
//         user: state.auth.user,
//         company: state.auth.company
//     }
// }
//
// export default connect(mapStateToProps, {getUserProfile})(SugubListView);