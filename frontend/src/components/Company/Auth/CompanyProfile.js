import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getUserProfile} from "../../../actions/authActions";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
import history from "../../../utils/historyUtils";
import {Card, CardBody, CardFooter, Col, Row} from "reactstrap";

const CompanyProfile = (props) => {
    const company = props.company;
    const user = props.user;

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
                        {company.company_logo ? (
                            <img alt="" className="avatar border-gray" src={company.company_logo} style={{backgroundColor: '#FFFFFF'}} />
                        ) : <img alt="" className="avatar border-gray"
                                 src={require("assets/img/default-avatar.png")} />}

                        <a href="#pablo" onClick={e => e.preventDefault()}>
                            <h5>{company.custname}</h5>
                        </a>
                    </div>
                    <Row>
                        <Col>
                            <dl>
                                <dt>사업자번호</dt>
                                <dd><strong>{company.custid}</strong></dd>
                            </dl>
                            {/*<dl>*/}
                            {/*    <dt>담당자 이메일</dt>*/}
                            {/*    <dd><strong>{company.manager_email}</strong></dd>*/}
                            {/*</dl>*/}
                            {/*<dl>*/}
                            {/*    <dt>담당자 연락처</dt>*/}
                            {/*    <dd><strong>{company.manager_phone}</strong></dd>*/}
                            {/*</dl>*/}

                            <dl>
                                <dt>승인상태</dt>
                                <dd><strong>{company.status_cd.code_name}</strong></dd>
                            </dl>
                            <dl>
                                <dt>담당매니저</dt>
                                <dd>
                                    <strong>
                                        { company.cmp_manager
                                            ? (
                                                <> {company.cmp_manager.nickname} ( {company.cmp_manager.phone} )<br/>
                                                    {company.cmp_manager.email}<br/>
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
                <CardFooter className="centered">
                    {/* 마스터권한인 경우에만 정보 수정 가능*/}
                    { company.company_coworker && company.company_coworker.map( (v,index) => {
                        if(user && user.email === v.user && v.companyprofile_auth.code_id === "CG0200000"){
                            if(history.location.pathname.indexOf('Company') > 0){
                                return (
                                    <Link key={index} className="btn btn-info m-2"
                                        // to="/Company/Profile_edit"
                                          to={{
                                              pathname: `/Company/Profile_edit`,
                                              // pathname: `company-profile/Profile_edit`,
                                              state: {
                                                  company: company,
                                                  user: user
                                              }
                                          }}
                                    >정보 수정
                                    </Link>
                                )
                            } else{
                                return (
                                    <Link key={index} className="btn btn-info m-2"
                                        // to="/Company/Profile_edit"
                                          to={{
                                              //   pathname: `/Company/Profile_edit`,
                                              pathname: `Profile_edit`,
                                              state: {
                                                  company: company,
                                                  user: user
                                              }
                                          }}
                                    >정보 수정
                                    </Link>
                                )
                            }

                        }
                    })}
                </CardFooter>
            </Card>
            {/*{company && company.custname ? (
                <Card className="card" variant="outlined">
                    <CardContent>
                    <div>
                        <h5>
                            {company.company_logo ? (
                                <img className="company-logo" src={company.company_logo} width={30} height={30}/>
                            ) : (<PictureUpload/>)}
                            {company.custname}<br/>
                            <small>{company.custid !== undefined ? (<>{company.custid}</>) : (<>사업자번호를 넣어주세요</>)}</small>
                        </h5>
                        <Row>
                            <Col md={12}>

                                <dl>
                                    <dt>담당자 이메일</dt>
                                    <dd><strong>{company.manager_email}</strong></dd>
                                </dl>
                                <dl>
                                    <dt>담당자 연락처</dt>
                                    <dd><strong>{company.manager_phone}</strong></dd>
                                </dl>
                                <dl>
                                    <dt>회사소개</dt>
                                    <dd><strong>{company.introduce ? company.introduce : '-'}</strong></dd>
                                </dl>
                            </Col>
                        </Row>
                        매출액/투자금액: {company.gross_total}억원<br/>
                        홈페이지: {company.homepage}<br/>
                        <hr/>
                        <dl>
                            <dt>승인상태</dt>
                            <dd><strong>{company.status_cd.code_name}</strong></dd>
                        </dl>
                        <dl>
                            <dt>담당매니저</dt>
                            <dd>
                                <strong>
                                    { company.cmp_manager
                                        ? (
                                            <> {company.cmp_manager.nickname} ( {company.cmp_manager.phone} )<br/>
                                                {company.cmp_manager.email}<br/>
                                            </>
                                        )
                                        :('배정중')}
                                </strong>
                            </dd>
                        </dl>

                    </div>
                    { company.cmp_manager_email === null ? ('배정중'):( company.cmp_manager_email)}<br/>
                    </CardContent>
                     HR회사만 보이도록 수정 必
                    <CardFooter>
                        <div className="button-container">
                            <Row>
                                <Col className="ml-auto" lg="7" md="6" xs="6">
                                    남은 티켓
                                </Col>
                                <Col className="mr-auto" lg="4">
                                    <Link to={'/Mng/Ticket'}> {company.ticket} 장</Link>
                                </Col>
                            </Row>
                        </div>
                    </CardFooter>

                     마스터권한인 경우에만 정보 수정 가능
                    { company.company_coworker && company.company_coworker.map( (v,index) => {
                        if(user && user.email === v.user && v.companyprofile_auth.code_id === "CG0200000"){
                            if(history.location.pathname.indexOf('Company') > 0){
                                return (
                                    <Link key={index} className="btn btn-primary m-2"
                                        // to="/Company/Profile_edit"
                                          to={{
                                              pathname: `/Company/Profile_edit`,
                                              // pathname: `company-profile/Profile_edit`,
                                              state: {
                                                  company: company,
                                                  user: user
                                              }
                                          }}
                                    >정보 수정
                                    </Link>
                                )
                            } else{
                                return (
                                    <Link key={index} className="btn btn-primary m-2"
                                        // to="/Company/Profile_edit"
                                          to={{
                                              //   pathname: `/Company/Profile_edit`,
                                              pathname: `Profile_edit`,
                                              state: {
                                                  company: company,
                                                  user: user
                                              }
                                          }}
                                    >정보 수정
                                    </Link>
                                )
                            }

                        }
                    })}
                </Card>
            ) : (
                // <CompanyProfileEdit />
                <></>
            )}

            {" "}*/}

        </>
    )
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        company: state.auth.company
    }
}

// export default CompanyProfile;
export default connect(mapStateToProps, { getUserProfile } )(CompanyProfile);
