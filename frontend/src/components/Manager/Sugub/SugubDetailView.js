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
                        <CardTitle tag="h3">채용의뢰서</CardTitle><hr/>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                        <RightMenu_M>
                            <Dropdown title="더보기.." placement="bottomEnd" className="RightMenu_M" onSelect={handleSelectMenu}>
                                {/*<Dropdown.Item eventKey={0} >가견적 제안</Dropdown.Item>*/}
                                <Dropdown.Item eventKey={1}><Icon icon="file" />이력서 접수</Dropdown.Item>
                                <Dropdown.Item eventKey={2}><Icon icon="comment" />채팅문의</Dropdown.Item>
                                <Dropdown.Item eventKey={3}><Icon icon="group" />나의 접수현황</Dropdown.Item>
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
                                    <small style={{color:'#9ca0a5',fontSize:'12px'}}>접수마감일</small><br/><small>{sugub.sugub_end_dt}</small>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-auto col-6">
                                    <small>{sugub.sugub_jikjong_top.code_name} {sugub.sugub_jikjong_mid.code_name}</small>
                                </Col>
                                <Col className="col-auto col-6 text-right">
                                    <small>{common.getCountTotalJobApplicant(counter.number)} 지원중</small>
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
                                    <small>나의 접수자 : {common.getCountMyJobApplicant(counter.number,props.hr.id)}명</small>
                                </Col>
                            </Row>
                        </div>

                        <br/>
                        <br/>
                        {/*  본문 시작   */}
                        <div className="">
                            <h5>요구스펙등 자격조건 </h5>
                            <hr />
                            <dl>
                                <dt>직종</dt>
                                <dd>{sugub.sugub_jikjong_top.code_name}  {sugub.sugub_jikjong_mid.code_name}</dd>
                            </dl>
                            <dl>
                                <dt>포지션명</dt>
                                <dd>{sugub.work_position}</dd>
                            </dl>
                            <Row>
                                <Col className="col-auto col-md-3">
                                    <dl>
                                        <dt>근무부서</dt>
                                        <dd>{sugub.work_dept}</dd>
                                    </dl>
                                    <dl>
                                        <dt>학력</dt>
                                        <dd>{sugub.education_cd.code_name}</dd>
                                    </dl>
                                </Col>
                                <Col className="col-auto col-md-3">
                                    <dl>
                                        <dt>경력</dt>
                                        <dd>{sugub.sugub_career_gb.code_name} {sugub.sugub_career_gb.code_id=== "AB0200000" && `(${sugub.career_start}년~${sugub.career_end}년)`}</dd>
                                    </dl>
                                    <dl>
                                        <dt>성별</dt>
                                        <dd>{sugub.sugub_gender && sugub.sugub_gender.code_name}</dd>
                                    </dl>
                                </Col>
                                <Col className="col-auto col-md-3">
                                    <dl>
                                        <dt>나이</dt>
                                        <dd>{sugub.age_start}세 ~ {sugub.age_end}세</dd>
                                    </dl>
                                    {/*<dl>*/}
                                    {/*    <dt>병역사항</dt>*/}
                                    {/*    <dd><strong>필</strong></dd>*/}
                                    {/*</dl>*/}
                                </Col>
                                <Col className="col-auto col-md-3">

                                </Col>
                            </Row>
                            <br/>
                            <dl>
                                <dt>필수요청 /<br/> 우대사항</dt>
                                <dd>{sugub.spec && sugub.spec.split('\n').map(line=>{
                                    return ( <>{line}<br/></> )
                                })}</dd>
                            </dl>
                            <br/>
                            {/*<dl>*/}
                            {/*    <dt>근무조건</dt>*/}
                            {/*    <dd>{sugub.wrk_condition}</dd>*/}
                            {/*</dl>*/}
                            <br/>
                            <br/>
                            <h5>업무내용 및 근무환경</h5>
                            <hr />
                            <Row>
                                <Col className="col-auto col-md-6">
                                    <dl>
                                        <dt>담당업무</dt>
                                        <dd>{sugub.work_role && sugub.work_role.split('\n').map(line=>{
                                            return ( <>{line}<br/></> )
                                        })}</dd>
                                    </dl>
                                </Col>
                                <Col className="col-auto col-md-6">
                                    <dl>
                                        <dt>포지션 장점</dt>
                                        <dd>
                                            - {/*해당업무 경력을 쌓을 수 있음*/}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>복리후생</dt>
                                        <dd>{sugub.bokri}</dd>
                                    </dl>
                                </Col>
                            </Row>
                            <br/>
                            <h5>근무조건</h5>
                            <hr />
                            <Row>
                                <Col className="col-auto col-md-3">
                                    <dl>
                                        <dt>급여(만원)</dt>
                                        <dd>{sugub.salary_start} ~ {sugub.salary_end}</dd>
                                    </dl>
                                    <dl>
                                        <dt>계약기간</dt>
                                        <dd>{sugub.chae_gigan} {sugub.chae_gigan_type && sugub.chae_gigan_type.code_name}</dd>
                                    </dl>
                                </Col>
                                <Col className="col-auto col-md-3">
                                    <dl>
                                        <dt>근무시간</dt>
                                        <dd>{sugub.work_time_start} ~ {sugub.work_time_end} </dd>
                                    </dl>
                                    <dl>
                                        <dt>실근무지</dt>
                                        <dd><a href={`https://map.naver.com/v5/search/${sugub.work_load_addr}${sugub.work_load_addr_detail}`} target="_blank">({sugub.work_load_addr_code}){sugub.work_load_addr}{sugub.work_load_addr_detail}</a></dd>
                                    </dl>
                                </Col>
                                <Col className="col-auto col-md-3">
                                    <dl>
                                        <dt>전환여부</dt>
                                        <dd>{sugub.cont_chg_gb && sugub.cont_chg_gb.code_name}</dd>
                                    </dl>
                                </Col>
                            </Row>

                            <br/>
                            <h5>기업정보</h5>
                            <hr />
                            <Row>
                                <Col className="col-md-6">
                                    <dl>
                                        <dt>기업명</dt>
                                        <dd>{sugub.companyprofile.custname}</dd>
                                    </dl>
                                    <dl>
                                        <dt>본사주소</dt>
                                        <dd>({sugub.companyprofile.post_addr_code}){sugub.companyprofile.post_addr} {sugub.companyprofile.post_addr_detail}</dd>
                                    </dl>
                                </Col>
                                <Col className="col-md-6">
                                    <dl>
                                        <dt>사원수</dt>
                                        <dd>{sugub.companyprofile.emp_count}</dd>
                                    </dl>
                                    <dl>
                                        <dt>홈페이지</dt>
                                        <dd><a href={sugub.companyprofile && sugub.companyprofile.homepage !== null && sugub.companyprofile.homepage.indexOf('http') === -1 ?
                                            `https://${sugub.companyprofile.homepage}` : `${sugub.companyprofile.homepage}`} target="_blank">{sugub.companyprofile.homepage}</a></dd>
                                    </dl>
                                </Col>
                            </Row>
                            <br/>
                            <br/>
                            <h5>인사담당자 요청사항</h5>
                            <hr />
                            <Row>
                                <Col className="col-md-6">
                                    <dl>
                                        <dt>기업명</dt>
                                        <dd>
                                            {sugub.jobadvertise[0].company_name_yn ? ('공개 가능'): ('비공개')}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>주요업무</dt>
                                        <dd>
                                            {sugub.jobadvertise[0].main_work_yn ? ('공개 가능'): ('비공개')}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>부서명</dt>
                                        <dd>
                                            {sugub.jobadvertise[0].dpt_name_yn ? ('공개 가능'): ('비공개')}
                                        </dd>
                                    </dl>

                                </Col>
                                <Col className="col-md-6">
                                    <dl>
                                        <dt>급여</dt>
                                        <dd>
                                            {sugub.jobadvertise[0].salary_yn ? ('공개 가능'): ('비공개')}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>자격요건</dt>
                                        <dd>
                                            {sugub.jobadvertise[0].condition_yn ? ('공개 가능'): ('비공개')}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>우대조건</dt>
                                        <dd>
                                            {sugub.jobadvertise[0].special_condition_yn ? ('공개 가능'): ('비공개')}
                                        </dd>
                                    </dl>
                                    {/*<dl>
                                        <dt>혜택 및 복지</dt>
                                        <dd>
                                            {sugub.jobadvertise[0].welfare_yn ? ('공개 가능'): ('비공개')}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>회사 위치</dt>
                                        <dd>
                                            {sugub.jobadvertise[0].location_yn ? ('공개 가능'): ('비공개')}
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
     : ( <Loader backdrop content="로딩중..." vertical /> ) )
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
