import React from "react";
import {Col, Container, Row} from "reactstrap";
import {connect} from "react-redux";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

const CompanyProfileDetail = (props) => {
    const {user, company} = props

    console.log('CompanyProfileDetail company', company)
    // console.log('HrProfileDetail hrProfile', hrProfile)
    return company && (
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
                                        <dd><strong>{company.custname}</strong></dd>
                                    </dl>
                                    <dl>
                                        <dt>임직원수</dt>
                                        <dd><strong>{company.emp_count ? company.emp_count + ' 명' : '-'}</strong></dd>
                                    </dl>
                                </Col>
                                <Col className="col-md-6">
                                    <dl>
                                        <dt>매출액</dt>
                                        <dd><strong>{company.gross_total ? company.gross_total + ' 억 원' : '-'}</strong></dd>
                                    </dl>
                                    <dl>
                                        <dt>홈페이지</dt>
                                        <dd><strong>{company.homepage ? company.homepage : '-'}</strong></dd>
                                    </dl>
                                </Col>
                            </Row>
                            <dl>
                                <dt>회사소개</dt>
                                <dd><strong>
                                    {company.introduce ? company.introduce : '-'}
                                </strong></dd>
                            </dl>

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
    }
}

export default connect(mapStateToProps)(CompanyProfileDetail);