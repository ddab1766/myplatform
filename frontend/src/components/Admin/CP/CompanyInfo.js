import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {ChaegongUrls} from "../../constants/urls";
import history from "../../utils/historyUtils";
import '../../index.css';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router";

import {Card, CardBody, CardHeader, CardTitle, Col, Container, Row, Table,} from "reactstrap";

const CompanyInfo = (props) => {
    const [company, setCompany] = useState(null);
    const cpUrl = ChaegongUrls.COMPANYPROFILE;
    const id = props.match.params.id;
    const dispatch = useDispatch();
    useEffect(() => {
        // getApiData(cpUrl, id).then(function (result) {
        //     dispatch(result);
        //     setCompany(result.payload);
        // });
        console.log(props);
        setCompany(props.location.state.comp);
        
    }, []);
    
    if (!company) return null;
    return (
        <div>
            <Container>
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">기업정보</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row className="mx-5">
                            <Col xs="6">
                                <Table>
                                    <colgroup>
                                        <col style={{ width: '30%' }} />
                                    </colgroup>
                                    <tbody>
                                        <tr><th>회사명</th><td>{company.custname}</td></tr>
                                    <tr><th>승인상태</th><td>{company.status_cd_nm}</td></tr>
                                    <tr><th>사업자번호</th><td>{company.custid}</td></tr>
                                    <tr><th>매출액</th><td>{company.gross_total}</td></tr>
                                    <tr><th>홈페이지</th><td>{company.homepage}</td></tr>
                                    <tr><th>간단소개글</th><td>{company.introduce}</td></tr>
                                    <tr><th>담당매니저</th><td>{company.cmp_manager_id}</td></tr>
                                    <tr><th>업종</th><td>{company.upjong}</td></tr>
                                    <tr><th>상장구분</th><td>{company.stock_gubun}</td></tr>
                                    <tr><th>그룹사</th><td>{company.group_company}</td></tr>
                                    <tr><th>주소(도로명코드)</th><td>{company.load_addr_code}</td></tr>
                                    <tr><th>주소(도로명주소)</th><td>{company.load_addr}</td></tr>
                                    <tr><th>주소 상세</th><td>{company.load_addr_detail}</td></tr>
                                </tbody>
                            </Table>
                        </Col>
                            <Col xs="6">
                                <Table>
                                    <colgroup>
                                        <col style={{ width: '30%' }} />
                                    </colgroup>
                                    <tbody>
                                        <tr><th>주소(우편번호)</th><td>{company.post_addr_code}</td></tr>
                                        <tr><th>주소(지번주소)</th><td>{company.post_addr}</td></tr>
                                        <tr><th>주소 상세</th><td>{company.post_addr_detail}</td></tr>
                                    <tr><th>국가</th><td>{company.nation}</td></tr>
                                    <tr><th>임직원수</th><td>{company.emp_count}</td></tr>
                                    <tr><th>인담이메일</th><td>{company.manager_email}</td></tr>
                                    <tr><th>인담연락처</th><td>{company.manager_phone}</td></tr>
                                    <tr><th>추천인</th><td>{company.company_recuser_id}</td></tr>
                                    {/*<tr><th>기업형태</th><td>{company.company_form_nm}</td></tr>*/}
                                    <tr><th>티켓</th><td>{company.ticket}</td></tr>
                                    <tr><th>회사대표이미지</th><td>{company.company_image}</td></tr>
                                    <tr><th>회사로고</th><td>{company.company_logo}</td></tr>
                                </tbody>
                            </Table>
                        </Col>
                        </Row>
                        <Col xs="6">
                            <Link to={{pathname : props.match.url + "/edit",
                                        state: {
                                                comp: company
                                            }}}>
                                <button className="btn btn-primary">수정하기</button>
                            </Link>
                            {/* <button className="btn btn-primary" onClick={handleDelete}>삭제하기</button> */}
                        </Col>
                    </CardBody>
                </Card>
            </Container>
            <button className="btn btn-primary" onClick={() => history.push('../companyprofile')}>뒤로가기</button>

        </div>
    );
}
export default withRouter(CompanyInfo); 