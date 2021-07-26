import React from "react";
import CardContent from "@material-ui/core/CardContent";
import {Col, Modal, Row} from "reactstrap";
import Card from "@material-ui/core/Card/Card";
import {connect} from "react-redux";
import LoaderSpinner from "../Etc/LoaderSpinner";
import Chip from "@material-ui/core/Chip";
import {Link} from "react-router-dom";
import PopupLogin from "../auth/PopupLogin";
import Avatar from "@material-ui/core/Avatar";
import {Tag, TagGroup} from "rsuite";

const PartnersList = (props) => {
    const {partner, authenticated} = props;
    const [loginModal, setLoginModal] = React.useState(false);
    const toggleModalLogin = () => setLoginModal(!loginModal);
    // console.log('partner', partner)
    return partner ? (
        <Card className="box card"  variant='outlined'>
            <CardContent>
                <div className="" style={{fontSize:'1em'}}>
                    <Row>
                        <Col md={2} className='text-center'>
                            <div className="thumbnail img-circle">
                                <Avatar src={partner.company_logo}
                                        style={{"width": "90px", "height": "90px"}}
                                />
                            </div>
                        </Col>
                        <Col md={6}>
                            {authenticated ? (
                                <Link to={{
                                    pathname:`/Company/ProfileDetail/${partner.id}`,
                                    state:{
                                        hrprofile: partner
                                    }
                                }}>
                                    <span style={{fontSize: '1.2em'}}>{partner.custname}</span>
                                </Link>
                            ):(
                                <Link to={'#'}>
                                    <span onClick={()=>toggleModalLogin()}>{partner.custname}</span>
                                </Link>
                            )}

                            {/*<p>제공 서비스</p>*/}
                            <TagGroup>
                            {partner.services.length > 0 ? partner.services.map(data=>{
                                return (
                                    <Tag color="blue" style={{fontSize:'10px'}}>{data.code_name}</Tag>
                                )
                            }) : <br/>}
                            </TagGroup>


                            <>{partner.load_addr} {' '} {partner.load_addr_detail}</>


                            <hr/>

                            {/*서비스 가능지역 */}
                            <TagGroup>
                            {partner.service_address.length > 0 && partner.service_address.map(data=>{
                                return (
                                    <Tag color="gray" style={{fontSize:'10px'}}>{data.code_name}</Tag>
                                )
                            })}
                            </TagGroup>
                        </Col>
                        <Col md={4}>
                            <div className="partners-stats">
                                <ul>
                                    <li>
                                        <label>등록된 이력서</label>
                                        <span style={{textAlign:'right', float: 'right'}}>{partner.resume_count} 개</span>
                                    </li>
                                    <li>
                                        <label>진행건수</label>
                                        <span style={{textAlign:'right', float: 'right'}}>{partner.jobad_count} 건</span>
                                    </li>
                                    <li>
                                        <label>리뷰</label>
                                        <span style={{textAlign:'right', float: 'right'}}>{partner.hr_sugub_reviews && partner.hr_sugub_reviews.length} 건
                                            {partner.hr_sugub_reviews && partner.hr_sugub_reviews.length > 0 && (
                                                <>
                                                    (평점:
                                                    {
                                                        partner.hr_sugub_reviews.map(v=> {
                                                            return v.point_avg
                                                        }).reduce(function add(sum, cur) {
                                                            return sum + cur
                                                        })
                                                        / partner.hr_sugub_reviews.length
                                                    } 점 )
                                                </>
                                            )}</span>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {/*<p>직종별 합격률</p>*/}
                        <Col md={12}>
                            <div className='description'>
                                {partner.introduce ? partner.introduce.substr(0,350) + '...' : '등록된 회사소개가 없습니다.'}
                            </div>
                        </Col>
                    </Row>
                </div>

                <Modal isOpen={loginModal} toggle={toggleModalLogin}>
                    <PopupLogin loginSubmit={toggleModalLogin}/>
                </Modal>
            </CardContent>
        </Card>
    ) : (<LoaderSpinner/>)
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        company: state.auth.company,
        user: state.auth.user,
        hr: state.auth.hr
    }
}

export default connect(mapStateToProps)(PartnersList);


