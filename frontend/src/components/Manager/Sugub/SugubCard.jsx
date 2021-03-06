import React, {useCallback, useEffect, useState} from "react";
import {Col, Row} from "reactstrap";
import {connect, useDispatch, useSelector} from "react-redux";
import {deleteInterestSugub, postInterestSugub} from "../../../actions/userActions"
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import history from "../../../utils/historyUtils";
import Tooltip from "@material-ui/core/Tooltip";
import {Link} from "react-router-dom";
import {Icon, Tag, TagGroup} from 'rsuite'
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import * as common from "../../../function/common";
import {makeStyles} from "@material-ui/core";
import { useObserver } from 'mobx-react';
import useStore from "./useStore";
import {isMobile} from "react-device-detect"
import {thousands} from "../../../function/common";
const useStyles = makeStyles((theme) => ({
    img:{
        float: 'right',marginRight: '2rem',opacity:'0.7'
    }
}));
const defaultTheme = createMuiTheme();
const theme = createMuiTheme({
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontWeight: "none",
                boxShadow: "0 6px 10px -4px rgb(0 0 0 / 15%)",
                fontFamily: "Noto Sans KR",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                fontSize: "1em",
                color: "black",
                backgroundColor: "white"
            }
        }
    }
});

const SugubCard = (props) => {
    const {user, hr, company} = props
    const [sugubs, setSugubs] = useState(props.sugubs);
    const [show,setShow] = useState(false);
    const { sugub } = useStore();

    const dispatch = useDispatch();
    // const onDeleteInterestSugub = useCallback(id => dispatch(deleteInterestSugub(id)), [dispatch]);
    // const onPostInterestSugub = sugub_id => dispatch(postInterestSugub(sugub_id));
    const onDeleteInterestSugub = (sugub_id) => {
        sugub.takeInterest(sugub_id);
    }
    const onPostInterestSugub = (sugub_id) => {
        sugub.putInterest(sugub_id);
    }


    useEffect(() => {
        // sugub.getInterest();
    },[]);

    const handleSetSugub = (sugubs) => {

        return sugubs.map((data,index) => {
            const interest_sugub = sugub.interest.filter(v => v.sugub.id === data.id)[0]

            // console.log('interest_sugub', interest_sugub)
            return (
                <>
                    <style jsx>{`
            .card:hover{ background-color:#fafafa }
            
            .row-content{
                display: block; /* Fallback for non-webkit */ 
                display: -webkit-box; 
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2; 
                line-height: 1em; 
                overflow: hidden; 
                text-overflow: ellipsis;
            }}
            
            `}</style>
                    <Card className="card" key={index} variant="outlined" style={{maxHeight:'306px',overflow:'visible'}}>
                        <div className="card-header" style={{paddingBottom: '16px',borderBottom: '1px solid #dddddd'}}>
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
                                    {/* ????????? */}
                                    <Col className="col col-6 col-auto mt-2 mb-2">
                                        {hr === null ? (
                                            <>{data.sugub_title}</>
                                        ) : (window.location.pathname.indexOf('Mng') !== -1 ?
                                                <Link to={window.location.pathname + '/' + data.id }>{data.sugub_title}</Link>

                                                :
                                                <Link to='#' onClick={()=>{
                                                    if(window.confirm("???????????????????????? ?????????????????????.?????????????????????????")){
                                                        // history.push(`/Mng/sugub/${data.id}`);
                                                    }else{
                                                        return false;
                                                    }
                                                }}>
                                                    {data.sugub_title}
                                                </Link>

                                        )}


                                    </Col>
                                    <Col className="text-right col col-6 col-auto mt-2 mb-2" >
                                        <small style={{color:'#9ca0a5',fontSize:'12px'}}>???????????????</small><br/><small>{data.sugub_end_dt}</small>
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
                                        {data.jobadvertise[0] && data.jobadvertise[0].applicants_count}??? ?????????</small><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <small>
                                            ???????????????{' '}
                                            <Icon icon="krw" />
                                            {thousands(data.estimated_earnings)}???
                                            {data.chae_cd.code_id === 'AC0300000' ?
                                                <Tooltip title="???????????? ????????? 15%??? ?????? ??? ????????????" placement="right-start">
                                                    <i className="nc-icon nc-alert-circle-i"></i>
                                                </Tooltip>
                                                :
                                                <Tooltip title="?????? ????????? 7%??? ?????? ??? ????????????" placement="right-start">
                                                    <i className="nc-icon nc-alert-circle-i"></i>
                                                </Tooltip>
                                            }

                                        </small>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <CardContent className="pb-2 row-content" >
                            <Row>
                                {!isMobile &&
                                <Col className="col-auto">
                                    <dl>
                                        <dt>??????</dt>
                                        <dd>{data.sugub_career_gb.code_name}</dd>
                                    </dl>
                                </Col>
                                }
                                <Col className="col-auto">
                                    <dl>
                                        <dt>??????({data.salary_gubun.code_name})</dt>
                                        <dd>
                                            {data.salary_start.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                            {' '} ~ {' '}
                                            {data.salary_end.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </dd>
                                    </dl>

                                </Col>
                                {!isMobile &&
                                <>
                                    <Col className="col-auto">
                                        <dl>
                                            <dt>??????</dt>
                                            <dd>{data.education_cd && data.education_cd.code_name}</dd>
                                        </dl>

                                    </Col>
                                    <Col className="col-auto">
                                        <dl>
                                            <dt>????????????</dt>
                                            <dd>{data.sugub_gender && data.sugub_gender.code_name}</dd>
                                        </dl>
                                    </Col>
                                </>
                                }
                            </Row>
                            <Row>
                                <Col className="col-auto ">
                                    <dl>
                                        <dt>????????????</dt>
                                        <dd>{data.work_load_addr}</dd>
                                    </dl>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div  className="row-content">
                                        <dl>
                                            <dt>????????????</dt>
                                            <dd>{common.limitedText(data.work_role)}</dd>
                                        </dl>
                                        <dl>
                                            <dt>????????????</dt>
                                            <dd>{common.limitedText(data.spec)}
                                            </dd>
                                        </dl>

                                    </div>
                                </Col>
                            </Row>
                            <br/>
                        </CardContent>

                    </Card>
                </>
            )
        })
    }

    return  useObserver(()=>  (
        handleSetSugub(sugub.sugubs)
    ))
    // }
};

function mapStateToProps(state) {
    return {
        company: state.auth.company,
        user: state.auth.user,
        hr: state.auth.hr
    }
}

// export default SugubCard
export default connect(mapStateToProps)(SugubCard);
// export default connect(mapStateToProps, {getUserProfile, getCompanyProfile})(CompanyProfileView);
// export default connect(mapStateToProps, {getUserProfile})(SugubList);

