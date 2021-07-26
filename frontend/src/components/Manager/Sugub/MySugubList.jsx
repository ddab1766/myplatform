import React, {useCallback, useEffect, useState} from "react";
import {Col, Row} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {deleteInterestSugub, postInterestSugub} from "../../../actions/userActions"
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import history from "../../../utils/historyUtils";
import Tooltip from "@material-ui/core/Tooltip";
import {Link} from "react-router-dom";
import {Icon, Tag, TagGroup,Divider, Whisper } from 'rsuite'
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import * as common from "../../../function/common";
import {makeStyles} from "@material-ui/core";
import {connect} from "react-redux";
import ApplicantTable from "../Jobap/ApplicantTable";
import ApplicantTable_Mobile from "../Jobap/ApplicantTable_Mobile";
import { useObserver } from 'mobx-react';
import useStore from './useStore';
import {appliedStatusFilter} from "../../../function/common";
import Nothing from "../../Common/Nothing";
import {isMobile} from "react-device-detect"
import {thousands} from "../../../function/common";
// const theme = createMuiTheme({
//     overrides: {
//         MuiTooltip: {
//             tooltip: {
//                 fontWeight: "none",
//                 boxShadow: "0 6px 10px -4px rgb(0 0 0 / 15%)",
//                 fontFamily: "Noto Sans KR",
//                 border: "1px solid rgba(0, 0, 0, 0.12)",
//                 fontSize: "1em",
//                 color: "black",
//                 backgroundColor: "white"
//             }
//         }
//     }
// });

const tooltip = (
    <Tooltip>
        펼치기
    </Tooltip>
);
const MySugubList = (props) => {
    const {user, hr, company} = props
    const { sugub } = useStore();
    // const onDeleteInterestSugub = useCallback(id => dispatch(deleteInterestSugub(id)), [dispatch]);
    // const onPostInterestSugub = sugub_id => dispatch(postInterestSugub(sugub_id));
    const onDeleteInterestSugub = (sugub_id) => {
        sugub.takeInterest(sugub_id);
    }
    const onPostInterestSugub = (sugub_id) => {
        sugub.putInterest(sugub_id);
    }
    useEffect(() => {

    },[]);
    const heightToggle = (v) => {
        console.log(v.currentTarget)
        document.querySelector('.card-'+v).classList.toggle("active");
        if(document.querySelector('.icon-'+v).classList.contains(('rs-icon-angle-up'))){
            document.querySelector('.icon-'+v).className =
                document.querySelector('.icon-'+v).className.replace('up','down')
            // document.getElementsByClassName('main-panel')[0].scrollTop +=
            //     document.querySelector('.card-'+v).getBoundingClientRect().top
        } else{
            document.querySelector('.icon-'+v).className =
                document.querySelector('.icon-'+v).className.replace('down','up')
        }
    }
    const handleSetSugub = (sugubs) => {
        return sugubs.filter(v => appliedStatusFilter(v.jobadvertise[0].jobapplicants,sugub.step).length > 0).
        map((data,index) => {
            const interest_sugub = sugub.interest.filter(v => v.sugub.id === data.id)[0]

            return (
                <>
                    <style jsx>{`
            .card:hover{ 
                background-color:#fafafa;
             }
            .row-content{
                display: block; /* Fallback for non-webkit */ 
                display: -webkit-box; 
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3; 
                line-height: 1em; 
                overflow: auto; 
                text-overflow: ellipsis;
                max-height: 145px;
            }
            .active > .row-content {
                max-height: 1000px;
                transition: max-height 1s ease-in-out; 
            }
            `}</style>
                    <Card className={`card card-${data.id}`} key={index} variant="outlined" style={{overflow:'visible'}}>
                        <div className="card-header" style={{paddingBottom: '16px'}}>
                            <Row>
                                <Col className="col-10">
                                    <TagGroup>
                                        <Tag color="blue" style={{fontSize:'12px'}}>{data.sugub_status.code_name}</Tag>
                                        <Tag color="green" style={{fontSize:'12px'}}>{data.chae_cd.code_name}</Tag>
                                        {data.chae_cd.code_id === "AC0100000" &&
                                        <Tag color="cyan" style={{fontSize:'12px'}}>{data.chae_gigan}{data.chae_gigan_type && data.chae_gigan_type.code_name}</Tag>}
                                    </TagGroup>
                                </Col>
                                <Col className="text-right">
                                    {
                                        sugub.interest.filter(v => v.sugub.id === data.id).length > 0 ? (
                                                <Icon size='lg' icon={'star'}
                                                      onClick={(e) => onDeleteInterestSugub(interest_sugub.id)}
                                                      style={{cursor: 'pointer', color: '#ffc107'}}/>
                                            ) :
                                            (<Icon size='lg' icon={'star-o'}
                                                   onClick={(e) => !sugub.loading && onPostInterestSugub(data.id)}
                                                   style={{cursor: 'pointer', color: '#ffc107'}}/>)
                                    }
                                </Col>
                            </Row>
                            <div style={{fontSize:'1.2em'}}  >
                                <Row>
                                    {/* 타이틀 */}
                                    <Col className="col col-6 col-auto mt-2 mb-2">
                                        {hr === null ? (
                                            <>{data.sugub_title}</>
                                        ) : (window.location.pathname.indexOf('Mng') !== -1 ?
                                                <Link to={window.location.pathname + '/' + data.id}>{data.sugub_title}</Link>
                                                :
                                                <Link to='#' onClick={()=>{
                                                    if(window.confirm("관리자페이지에서 접수가능합니다.이동하시겠습니까?")){
                                                        history.push(`/Mng/sugub/${data.id}`);
                                                    }else{
                                                        return false;
                                                    }
                                                }}>
                                                    {data.sugub_title}
                                                </Link>
                                        )}
                                    </Col>
                                    <Col className="text-right col col-6 col-auto mt-2 mb-2" >
                                        <small style={{color:'#9ca0a5',fontSize:'12px'}}>접수마감일</small><br/><small>{data.sugub_end_dt}</small>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="col-auto col-6">
                                        <small>
                                            {data.sugub_jikjong_top.code_name} {data.sugub_jikjong_mid.code_name}
                                        </small>

                                        {!isMobile && <small><TagGroup>
                                            {data.sugub_jikjong_low.map(v=><Tag>{v.code_name}</Tag>)}
                                        </TagGroup>
                                        </small>}

                                    </Col>

                                    <Col className="text-right">
                                        <small><Icon icon="user-circle-o" />
                                            {data.jobadvertise[0] && data.jobadvertise[0].applicants_count}명 지원중</small><br/>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <small>
                                            예상수익금{' '}
                                            <Icon icon="krw" />
                                            {thousands(data.estimated_earnings)}원
                                            {data.chae_cd.code_id === 'AC0300000' ?
                                                <Tooltip title="채용대행 수수료 15%로 산정 시 값입니다" placement="right-start">
                                                    <i className="nc-icon nc-alert-circle-i"></i>
                                                </Tooltip>
                                                :
                                                <Tooltip title="파견 수수료 7%로 산정 시 값입니다" placement="right-start">
                                                    <i className="nc-icon nc-alert-circle-i"></i>
                                                </Tooltip>
                                            }

                                        </small>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <Divider style={{margin:'14px 0'}}>
                            {/*<Whisper placement="top" trigger="hover" speaker={tooltip}>*/}
                                <div style={{textDecoration: 'underline',cursor:'pointer'}} onClick={()=>heightToggle(data.id)}>
                                    해당 채용 접수리스트 <Icon className={`icon-${data.id}`} icon="angle-down" size="lg" />
                                </div>
                            {/*</Whisper>*/}
                        </Divider>
                        <CardContent className={`pb-2 row-content`} >
                            {isMobile ? <ApplicantTable_Mobile jobap={appliedStatusFilter(data.jobadvertise[0].jobapplicants,sugub.step)}  />
                                 : <ApplicantTable jobap={appliedStatusFilter(data.jobadvertise[0].jobapplicants,sugub.step)}  />}
                            <br/>
                        </CardContent>
                        {/*<div style={{alignSelf: 'center',cursor:'pointer',padding: '7px 0 7px 0'}} onClick={heightToggle}>*/}
                        {/*    더보기 <Icon icon="chevron-circle-down" size="lg" />*/}
                        {/*</div>*/}
                    </Card>
                </>
            )
        })
    }

    return  useObserver(()=>  (
        handleSetSugub(sugub.sugubs).length > 0 ? handleSetSugub(sugub.sugubs) : <Nothing text={'해당'}/>
    ))
};

function mapStateToProps(state) {
    return {
        company: state.auth.company,
        user: state.auth.user,
        hr: state.auth.hr
    }
}

export default connect(mapStateToProps)(MySugubList);
// export default connect(mapStateToProps, {getUserProfile, getCompanyProfile})(CompanyProfileView);
// export default connect(mapStateToProps, {getUserProfile})(SugubList);

