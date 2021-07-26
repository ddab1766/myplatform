import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import LoaderSpinner from "../Etc/LoaderSpinner";
import {Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Nothing from "../Common/Nothing";

const HrReview = (props) => {
    const [hrProfile, setHrProfile] = useState(props.hrprofile);

    useEffect(()=>{
        if(!props.hrprofile) setHrProfile(props.hr)
    },[]);

    function getPointAverage(point) {
        let array = point.map(v=>v.point);
        const result = array.reduce(function add(sum, currValue) {
            return sum + currValue
        });
        return result / point.length;
    }
    // console.log('hrReview hrProfile', hrProfile)
    
    return hrProfile ? (
        <>
            {
                hrProfile.sugub_reviews ?
                    (
                        <>{hrProfile.sugub_reviews.length > 0 ? (
                            <>
                                {hrProfile.sugub_reviews.map( (v)=>{
                                    return (
                                        <Card>
                                            <CardContent>
                                                {/*<span style={{background:'#007bff',color: 'white',padding: '3px'}}>ㅁ</span>*/}
                                                <div style={{fontSize:'1.2em',paddingTop:'7px'}}>
                                                    <Row>
                                                        <Col>
                                                            <h6>
                                                                <Link
                                                                    to={{
                                                                        pathname: `/Mng/sugub/${v.sugub.id}`,
                                                                        state: {
                                                                            sugub: v.sugub
                                                                        }
                                                                    }}
                                                                    // target="_blank"
                                                                >{v.sugub.sugub_title}</Link>
                                                            </h6>
                                                        </Col>
                                                        {/*<Col className="text-right">*/}
                                                        {/*    <small>접수마감 : {}</small>*/}
                                                        {/*</Col>*/}
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <small>{v.sugub.sugub_jikjong_top && v.sugub.sugub_jikjong_top.code_name} | {v.sugub.sugub_jikjong_mid && v.sugub.sugub_jikjong_mid.code_name}</small>
                                                        </Col>
                                                        <Col className="text-right">
                                                            <small>0명 지원중</small>
                                                        </Col>
                                                    </Row>

                                                </div>
                                                <br/>
                                                <Row>
                                                    <Col className="col-md-6">
                                                        <dl>
                                                            <dt>포지션</dt>
                                                            <dd><strong>{v.sugub.work_position}</strong></dd>
                                                        </dl>
                                                        <dl>
                                                            <dt>합격자수</dt>
                                                            <dd><strong>X 명</strong></dd>
                                                        </dl>
                                                    </Col>
                                                    <Col className="col-md-6">
                                                        <dl>
                                                            <dt>수급마감일</dt>
                                                            <dd><strong>{v.sugub.sugub_end_dt}</strong></dd>
                                                        </dl>
                                                        <dl>
                                                            <dt>프로젝트 금액</dt>
                                                            <dd><strong>XXX,XXX 원</strong></dd>
                                                        </dl>
                                                    </Col>
                                                </Row>
                                                <br/>
                                                <hr/>
                                                ★ 평균 평점 : {getPointAverage(v.sugubreview_point)} 점<br/>
                                                {
                                                    v.sugubreview_point.map( (point)=> (
                                                        <Point {...point} />
                                                    ))
                                                }
                                                <hr/>
                                                <Row>
                                                    <Col className="col-md-6">
                                                        <dl>
                                                            <dt>클라이언트</dt>
                                                            <dd>{v.user}</dd>
                                                        </dl>
                                                    </Col>
                                                    <Col className="col-md-6">
                                                        <dl>
                                                            <dt>작성일</dt>
                                                            <dd>{v.created_time}</dd>
                                                        </dl>
                                                    </Col>
                                                </Row>
                                                <br/>
                                                <dd><strong>{v.review_comment}</strong></dd>
                                            </CardContent>
                                        </Card>
                                    )
                                })}

                            </>
                        ): (<></>)}
                        </>
                    )
                    : (<Nothing text={"리뷰"}/>)
            }
        </>
    ) : (<LoaderSpinner/>)
};

const Point = v => {
    // console.log('point props', v)
    return (
        <Row>
            <Col className="col-md-6">
                <dl>
                    <dt>{v.point_gubun.code_name}</dt>
                    <dd>{v.point}</dd>
                </dl>
            </Col>
        </Row>
    );
}



function mapStateToProps(state) {
    return {
        user: state.auth.user,
        company: state.auth.company,
        hr: state.auth.hr
    }
}

export default connect(mapStateToProps)(HrReview)