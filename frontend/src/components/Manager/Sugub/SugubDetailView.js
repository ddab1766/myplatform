import React, {useEffect, useState} from 'react';
import {Card, CardTitle, Col, Container, Row} from "reactstrap"
import CardContent from "@material-ui/core/CardContent";
import {getHrSugub,getSugubDetail} from "../../../actions/sugubActions";
import * as common from "../../../function/common";
import SugubMenu from "./SugubMenu"
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Dropdown, FlexboxGrid, TagGroup, Tag, Loader, Icon, Button} from "rsuite";
import { useObserver } from 'mobx-react';
import useStore from './useStore';
import {isMobile} from "react-device-detect"
import history from "../../../utils/historyUtils";
const RightMenu_M = styled.div`
    @media screen and (min-width: 1830px){
        display:none;
    }
} `;

const SugubEdit = (props) => {
    const [sugub, setSugub] = useState(null);
    const [loading, setLoading] = useState(false);
    const [eventkey, setEventkey] = useState(null);
    const [eventToggle, setEventToggle] = useState(false);
    const id = props.match.params.id;
    const { counter } = useStore();

    useEffect(() => {
        if(isMobile) document.querySelector('.navbar-wrapper').style.visibility='hidden';
        getSugubData();
    }, []);
    const getSugubData = () => {
        setLoading(true)
        getSugubDetail(id).then((data) => {
                setSugub(data);
                counter.number = data;
                setLoading(false)
            }).catch(error => {
                setLoading(false)
        });
    }
    const handleSelectMenu = (eventKey) => {
        setEventkey(eventKey);
        setEventToggle(!eventToggle);
    }
    console.log('sugub:',sugub)
    const handleBack = () => {
        history.push('/Mng/sugub');
        document.querySelector('.navbar-wrapper').style.visibility='unset';
    }
    return  useObserver(()=> !loading ? (sugub && (
        <>
            {isMobile && <Button style={{position:'absolute',top:'5px',marginLeft:'7px',zIndex: '1034'}} onClick={handleBack}>
                <Icon icon="chevron-circle-left" size="2x" />
            </Button>}
            <Container style={{marginTop:'4rem'}}>
                <FlexboxGrid justify="space-between">
                    <FlexboxGrid.Item >
                        <CardTitle tag="h3">???????????????</CardTitle><hr/>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                        <RightMenu_M>
                            <Dropdown title="?????????.." placement="bottomEnd" className="RightMenu_M" onSelect={handleSelectMenu}>
                                {/*<Dropdown.Item eventKey={0} >????????? ??????</Dropdown.Item>*/}
                                <Dropdown.Item eventKey={1}><Icon icon="file" />????????? ??????</Dropdown.Item>
                                <Dropdown.Item eventKey={2}><Icon icon="comment" />????????????</Dropdown.Item>
                                <Dropdown.Item eventKey={3}><Icon icon="group" />?????? ????????????</Dropdown.Item>
                            </Dropdown>
                        </RightMenu_M>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <Card className={!isMobile && `card pl-3 pr-3`}>
                    <CardContent>
                         <TagGroup>
                            <Tag color="blue" style={{fontSize:'14px'}}>{sugub.sugub_status.code_name}</Tag>
                            <Tag color="green" style={{fontSize:'14px'}}>{sugub.chae_cd.code_name}</Tag>
                        </TagGroup>

                        <div style={{fontSize:'1.2em',paddingTop:'7px'}}>
                            <Row>
                                <Col className="col-auto col-6">
                                    <h5>{counter.number.sugub_title}</h5>
                                </Col>
                                <Col className="col-auto  col-6 text-right">
                                    <small style={{color:'#9ca0a5',fontSize:'12px'}}>???????????????</small><br/><small>{sugub.sugub_end_dt}</small>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-auto col-6">
                                    <small>{sugub.sugub_jikjong_top.code_name} {sugub.sugub_jikjong_mid.code_name}</small>
                                </Col>
                                <Col className="col-auto col-6 text-right">
                                    <small>{common.getCountTotalJobApplicant(counter.number)} ?????????</small>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-auto col-6">
                                    <small><TagGroup>
                                        {sugub.sugub_jikjong_low.map(v=><Tag>{v.code_name}</Tag>)}
                                    </TagGroup>
                                    </small>
                                </Col>
                                <Col className="col-auto col-6 text-right">
                                    <small>?????? ????????? : {common.getCountMyJobApplicant(counter.number,props.hr.id)}???</small>
                                </Col>
                            </Row>
                        </div>

                        <br/>
                        <br/>
                        {/*  ?????? ??????   */}
                        <div className="">
                            <h5>??????????????? ???????????? </h5>
                            <hr />
                            <dl>
                                <dt>??????</dt>
                                <dd>{sugub.sugub_jikjong_top.code_name}  {sugub.sugub_jikjong_mid.code_name}</dd>
                            </dl>
                            <dl>
                                <dt>????????????</dt>
                                <dd>{sugub.work_position}</dd>
                            </dl>
                            <Row>
                                <Col className="col-auto col-md-3">
                                    <dl>
                                        <dt>????????????</dt>
                                        <dd>{sugub.work_dept}</dd>
                                    </dl>
                                    <dl>
                                        <dt>??????</dt>
                                        <dd>{sugub.education_cd.code_name}</dd>
                                    </dl>
                                </Col>
                                <Col className="col-auto col-md-3">
                                    <dl>
                                        <dt>??????</dt>
                                        <dd>{sugub.sugub_career_gb.code_name} {sugub.sugub_career_gb.code_id=== "AB0200000" && `(${sugub.career_start}???~${sugub.career_end}???)`}</dd>
                                    </dl>
                                    <dl>
                                        <dt>??????</dt>
                                        <dd>{sugub.sugub_gender && sugub.sugub_gender.code_name}</dd>
                                    </dl>
                                </Col>
                                <Col className="col-auto col-md-3">
                                    <dl>
                                        <dt>??????</dt>
                                        <dd>{sugub.age_start}??? ~ {sugub.age_end}???</dd>
                                    </dl>
                                    {/*<dl>*/}
                                    {/*    <dt>????????????</dt>*/}
                                    {/*    <dd><strong>???</strong></dd>*/}
                                    {/*</dl>*/}
                                </Col>
                                <Col className="col-auto col-md-3">

                                </Col>
                            </Row>
                            <br/>
                            <dl>
                                <dt>???????????? /<br/> ????????????</dt>
                                <dd>{sugub.spec && sugub.spec.split('\n').map(line=>{
                                    return ( <>{line}<br/></> )
                                })}</dd>
                            </dl>
                            <br/>
                            {/*<dl>*/}
                            {/*    <dt>????????????</dt>*/}
                            {/*    <dd>{sugub.wrk_condition}</dd>*/}
                            {/*</dl>*/}
                            <br/>
                            <br/>
                            <h5>???????????? ??? ????????????</h5>
                            <hr />
                            <Row>
                                <Col className="col-auto col-md-6">
                                    <dl>
                                        <dt>????????????</dt>
                                        <dd>{sugub.work_role && sugub.work_role.split('\n').map(line=>{
                                            return ( <>{line}<br/></> )
                                        })}</dd>
                                    </dl>
                                </Col>
                                <Col className="col-auto col-md-6">
                                    <dl>
                                        <dt>????????? ??????</dt>
                                        <dd>
                                            - {/*???????????? ????????? ?????? ??? ??????*/}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>????????????</dt>
                                        <dd>{sugub.bokri}</dd>
                                    </dl>
                                </Col>
                            </Row>
                            <br/>
                            <h5>????????????</h5>
                            <hr />
                            <Row>
                                <Col className="col-auto col-md-3">
                                    <dl>
                                        <dt>??????(??????)</dt>
                                        <dd>{sugub.salary_start} ~ {sugub.salary_end}</dd>
                                    </dl>
                                    <dl>
                                        <dt>????????????</dt>
                                        <dd>{sugub.chae_gigan} {sugub.chae_gigan_type && sugub.chae_gigan_type.code_name}</dd>
                                    </dl>
                                </Col>
                                <Col className="col-auto col-md-3">
                                    <dl>
                                        <dt>????????????</dt>
                                        <dd>{sugub.work_time_start} ~ {sugub.work_time_end} </dd>
                                    </dl>
                                    <dl>
                                        <dt>????????????</dt>
                                        <dd><a href={`https://map.naver.com/v5/search/${sugub.work_load_addr}${sugub.work_load_addr_detail}`} target="_blank">({sugub.work_load_addr_code}){sugub.work_load_addr}{sugub.work_load_addr_detail}</a></dd>
                                    </dl>
                                </Col>
                                <Col className="col-auto col-md-3">
                                    <dl>
                                        <dt>????????????</dt>
                                        <dd>{sugub.cont_chg_gb && sugub.cont_chg_gb.code_name}</dd>
                                    </dl>
                                </Col>
                            </Row>

                            <br/>
                            <h5>????????????</h5>
                            <hr />
                            <Row>
                                <Col className="col-md-6">
                                    <dl>
                                        <dt>?????????</dt>
                                        <dd>{sugub.companyprofile.custname}</dd>
                                    </dl>
                                    <dl>
                                        <dt>????????????</dt>
                                        <dd>({sugub.companyprofile.post_addr_code}){sugub.companyprofile.post_addr} {sugub.companyprofile.post_addr_detail}</dd>
                                    </dl>
                                </Col>
                                <Col className="col-md-6">
                                    <dl>
                                        <dt>?????????</dt>
                                        <dd>{sugub.companyprofile.emp_count}</dd>
                                    </dl>
                                    <dl>
                                        <dt>????????????</dt>
                                        <dd><a href={sugub.companyprofile && sugub.companyprofile.homepage !== null && sugub.companyprofile.homepage.indexOf('http') === -1 ?
                                            `https://${sugub.companyprofile.homepage}` : `${sugub.companyprofile.homepage}`} target="_blank">{sugub.companyprofile.homepage}</a></dd>
                                    </dl>
                                </Col>
                            </Row>
                            <br/>
                            <br/>
                            <h5>??????????????? ????????????</h5>
                            <hr />
                            <Row>
                                <Col className="col-md-6">
                                    <dl>
                                        <dt>?????????</dt>
                                        <dd>
                                            {sugub.jobadvertise[0].company_name_yn ? ('?????? ??????'): ('?????????')}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>????????????</dt>
                                        <dd>
                                            {sugub.jobadvertise[0].main_work_yn ? ('?????? ??????'): ('?????????')}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>?????????</dt>
                                        <dd>
                                            {sugub.jobadvertise[0].dpt_name_yn ? ('?????? ??????'): ('?????????')}
                                        </dd>
                                    </dl>

                                </Col>
                                <Col className="col-md-6">
                                    <dl>
                                        <dt>??????</dt>
                                        <dd>
                                            {sugub.jobadvertise[0].salary_yn ? ('?????? ??????'): ('?????????')}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>????????????</dt>
                                        <dd>
                                            {sugub.jobadvertise[0].condition_yn ? ('?????? ??????'): ('?????????')}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>????????????</dt>
                                        <dd>
                                            {sugub.jobadvertise[0].special_condition_yn ? ('?????? ??????'): ('?????????')}
                                        </dd>
                                    </dl>
                                    {/*<dl>
                                        <dt>?????? ??? ??????</dt>
                                        <dd>
                                            {sugub.jobadvertise[0].welfare_yn ? ('?????? ??????'): ('?????????')}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>?????? ??????</dt>
                                        <dd>
                                            {sugub.jobadvertise[0].location_yn ? ('?????? ??????'): ('?????????')}
                                        </dd>
                                    </dl>*/}
                                </Col>
                            </Row>
                            <br/>
                        </div>

                    </CardContent>
                </Card>
            </Container>

            <SugubMenu setSugub={setSugub} sugub={sugub} getSugubData={getSugubData} eventkey={eventkey} eventToggle={eventToggle}/>
        </>
    ))
     : ( <Loader backdrop content="?????????..." vertical /> ) )
}


function mapStateToProps(state) {
    return {
        hr: state.auth.hr,
        user: state.auth.user,
        token: state.auth.token,
        comcode:state.comcode.comcode,
    }
}

export default connect(mapStateToProps)(SugubEdit);
