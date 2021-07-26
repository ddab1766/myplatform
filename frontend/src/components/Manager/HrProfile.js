import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getUserProfile} from "../../actions/authActions";
import {Card, CardBody, CardFooter, Col, Row} from "reactstrap";

const HrProfile = (props) => {
    const {user, company, hr} = props;

    return (
        <>
            <Card className="card-user">
                <div className="image">
                    <img
                        alt="..."
                        src={require("assets/img/bg/office-1209640_1280.jpg")}
                    />
                </div>
                <CardBody>
                    <div className="author">
                        {/*<img className="company-logo" src={company.company_logo} alt="..."
                             width={30} height={30}/>*/}
                        {/*{company.company_logo ? (
                            <img className="company-logo" src={company.company_logo} width={30} height={30}/>
                        ) : (<PictureUpload/>)}*/}
                        {/*<small>{company.custid !== undefined ? (<>{company.custid}</>) : (<>사업자번호를 넣어주세요</>)}</small>*/}
                        {hr.hr_logo ? (
                            <img alt="" className="avatar border-gray" src={hr.company_logo} style={{backgroundColor: '#FFFFFF'}} />
                        ) : <img alt="" className="avatar border-gray"
                                 src={require("assets/img/default-avatar.png")} />}

                        <a href="#pablo" onClick={e => e.preventDefault()}>
                            <h5>{hr.custname}</h5>
                        </a>
                    </div>
                    <Row>
                        <Col>
                            <dl>
                                <dt>사업자번호</dt>
                                <dd><strong>{hr.custid}</strong></dd>
                            </dl>
                            <dl>
                                <dt>담당자 이메일</dt>
                                <dd><strong>{hr.manager_email}</strong></dd>
                            </dl>
                            <dl>
                                <dt>담당자 연락처</dt>
                                <dd><strong>{hr.manager_phone}</strong></dd>
                            </dl>

                            <dl>
                                <dt>승인상태</dt>
                                <dd><strong>{hr.status_cd.code_name}</strong></dd>
                            </dl>
                            <dl>
                                <dt>담당매니저</dt>
                                <dd>
                                    <strong>
                                        { hr.cmp_manager
                                            ? (
                                                <> {hr.cmp_manager.nickname} ( {hr.cmp_manager.phone} )<br/>
                                                    {hr.cmp_manager.email}<br/>
                                                </>
                                            )
                                            :('배정중')}
                                    </strong>
                                </dd>
                            </dl>
                        </Col>
                    </Row>

                </CardBody>
                <hr/>
               {/* <CardFooter className="centered">
                    <Link className="btn btn-info m-2"
                          to={{
                              pathname: `/Mng/Profile_edit`,
                              state: {
                                  company: hr,
                                  user: user
                              }
                          }}
                    >정보 수정
                    </Link>
                </CardFooter>*/}
            </Card>
            <hr/>
        </>
    )
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        company: state.auth.company,
        hr: state.auth.hr
    }
}

// export default CompanyProfile;


export default connect(mapStateToProps, { getUserProfile } )(HrProfile);
