import React from "react";
import {Col, Container, Row} from "reactstrap";
import HrReview from "./HrReview";
import HrSpecial from "./HrSpecial";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Nothing from "../Common/Nothing";
import {brText} from "../../function/common";
import {Tag, TagGroup} from "rsuite";
import {useSelector} from "react-redux";

const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px'
};

const slimText = {
    fontSize: '0.666em',
    color: '#97969B',
    fontWeight: 'lighter',
    paddingBottom: 5
};

const titleStyle = {
    paddingBottom: 5,
    whiteSpace: 'nowrap',
    fontWeight: 500
};

const dataStyle = {
    fontSize: '1.2em',
    fontWeight: 500
};


const HrProfileDetail = (props) => {
    // const {hr} = useSelector((state)=> ({
    //     hr: state.auth.hr
    // }));
    const {hr, user} = props;

    return hr && (
        <>
            <Container>
                <Card className="card pl-3 pr-3">
                    <CardContent>
                        <div>
                            <h5>기업정보</h5>
                            <hr />
                            <Row>
                                <Col className="col-md-6">
                                    <dl>
                                        <dt>기업명</dt>
                                        <dd><strong>{hr.custname}</strong></dd>
                                    </dl>
                                    <dl>
                                        <dt>본사주소</dt>
                                        <dd><strong>{hr.load_addr}</strong></dd>
                                    </dl>
                                </Col>
                                <Col className="col-md-6">
                                    <dl>
                                        <dt>사원수</dt>
                                        <dd><strong>{hr.emp_count} 명</strong></dd>
                                    </dl>
                                    <dl>
                                        <dt>홈페이지</dt>
                                        <dd><strong>{hr.homepage}</strong></dd>
                                    </dl>
                                </Col>
                            </Row>
                            <dl>
                                <dt>회사소개</dt>
                                <dd><strong>
                                    {brText(hr.introduce)}
                                </strong></dd>
                            </dl>
                            <dl>
                                <dt>복리후생</dt>
                                <dd><strong>
                                    {hr.hr_bokri ? brText(hr.hr_bokri) : '-'}
                                </strong></dd>
                            </dl>
                            <br/>
                            <br/>
                            <h5>제공 서비스</h5>
                            <hr />
                            <TagGroup>
                            {hr.services.length > 0 ? hr.services.map(data=>{
                                return (
                                    <Tag color="blue" style={{fontSize:'12px'}}>{data.code_name}</Tag>
                                )
                            }) : <br/>}
                            </TagGroup>

                            <br/><br/>

                            <h5>서비스가능 지역</h5>
                            <hr />
                            <TagGroup>
                            {hr.service_address.length > 0 ? hr.service_address.map(data=>{
                                return (
                                    <Tag color="gray" style={{fontSize:'12px'}}>{data.code_name}</Tag>
                                )
                            }) : <br/>}
                            </TagGroup>

                            <br/>
                            <br/>
                            <h5>리뷰</h5>
                            <hr/>
                            <HrReview hrprofile={hr}/>
                        </div>
                        <br/>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
};

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        company: state.auth.company,
        hr: state.auth.hr
    }
}

export default HrProfileDetail;

// export default connect(mapStateToProps, {deleteHrSpecial})(HrProfileDetail);