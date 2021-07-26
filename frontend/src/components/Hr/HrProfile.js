import React, {useCallback} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {getUserProfile} from "../../actions/authActions";
import {Card, CardBody, CardFooter, Col, Row} from "reactstrap";
import {deleteHrSpecial} from "../../actions/userActions";

const HrProfile = (props) => {
    const {user, hr} = useSelector(state => ({
            user: state.auth.user,
            hr: state.auth.hr
        }),
        // shallowEqual
    );

    function getPermission(user, company, hr) {
        if(hr && hr.hr_coworker){
            return hr.hr_coworker.filter(v => v.user == user.email)[0].hrprofile_auth['code_id']
        }else if(company && company.company_coworker){
            return company.company_coworker.filter(v => v.user == user.email)[0].companyprofile_auth['code_id']
        }
    }

    // console.log('getPermission', getPermission(user, null, hr));

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
                        {hr.company_logo ? (
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
                            {/*<dl>*/}
                            {/*    <dt>담당자 이메일</dt>*/}
                            {/*    <dd><strong>{hr.manager_email}</strong></dd>*/}
                            {/*</dl>*/}
                            {/*<dl>*/}
                            {/*    <dt>담당자 연락처</dt>*/}
                            {/*    <dd><strong>{hr.manager_phone}</strong></dd>*/}
                            {/*</dl>*/}

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
                {getPermission(user, null, hr) === 'CG0200000' && ( // 관리자권한
                    <CardFooter className="centered">
                        <Link className="btn btn-info m-2"
                              to={{
                                  pathname: `/Hr/Profile_edit`,
                                  state: {
                                      // company: hr,
                                      hr: hr,
                                      // user: user
                                  }
                              }}
                        >정보 수정
                        </Link>
                    </CardFooter>
                )}
            </Card>
            {" "}
            <hr/>
        </>
    )
}

// function mapStateToProps(state) {
//     return {
//         user: state.auth.user,
//         company: state.auth.company,
//         hr: state.auth.hr
//     }
// }
export default HrProfile;

// export default connect(mapStateToProps, { getUserProfile } )(HrProfile);
