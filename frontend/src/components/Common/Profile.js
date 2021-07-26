import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getUserProfile} from "../../actions/authActions";
import {Card, CardBody, CardFooter} from "reactstrap";
import {Tag, TagGroup} from "rsuite";

class UserProfile extends Component {

    static propTypes = {
        getUserProfile: PropTypes.func.isRequired,
        user: PropTypes.object
    };

    renderUser() {
        let {user} = this.props;
        if (user) {
            return (
                <>
                    <Card className="card card-user">
                        <div className="image">
                            <img
                                alt="..."
                                src={require("assets/img/bg/damir-bosnjak.jpg")}
                            />
                        </div>
                        <CardBody>
                            <div className="author">
                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                    <img
                                        alt="..."
                                        className="avatar border-gray"
                                        src={user.profile_image ? user.profile_image :
                                            require("assets/img/default-avatar.png")}
                                    />
                                </a>
                                <h5 className="title">{user.nickname}</h5>
                            </div>
                            <p className="description text-center">
                                <TagGroup>
                                    {user.email}
                                    {user.emailaddress ?
                                        <Tag color="blue" style={{fontSize:'12px'}}>인증완료</Tag>
                                        :
                                        <Tag color="red" style={{fontSize:'12px'}}>미인증</Tag>}
                                </TagGroup>
                                <br/>
                            </p>
                            <hr/>

                            <dl className="ml-4">
                                <dt>연락처</dt>
                                <dd>{user.phone ? (user.phone) : '미등록'}</dd>
                            </dl>
                        </CardBody>

                        <CardFooter>
                            <br/>
                            <div className="centered">
                                <Link className="m-2"
                                      to={{
                                          pathname: `${this.props.match.url}_edit/`,
                                          state: {
                                              user
                                          }
                                      }}
                                >
                                    <button className="btn btn-signature">기본정보 수정</button>
                                </Link>
                                {this.props.match.path.indexOf('Company') !== -1 && (
                                    <Link to="/Company/change_password">
                                        <button className="btn btn-signature">비밀번호 변경</button>
                                    </Link>
                                )}
                                {this.props.match.path.indexOf('Hr') !== -1 && (
                                    <Link to="/Hr/change_password">
                                        <button className="btn btn-signature">비밀번호 변경</button>
                                    </Link>
                                )}

                            </div>
                            {/*<div className="button-container">*/}
                            {/*    <Row>*/}
                            {/*        <Col className="ml-auto" lg="7" md="6" xs="6">*/}
                            {/*            <h5>*/}
                            {/*                /!*<br/>*!/*/}
                            {/*                <small>나의 포인트</small>*/}
                            {/*            </h5>*/}
                            {/*        </Col>*/}
                            {/*        /!*<Col className="ml-auto mr-auto" lg="4" md="6" xs="6">*!/*/}
                            {/*        /!*    <h5>*!/*/}
                            {/*        /!*        24,6$ <br/>*!/*/}
                            {/*        /!*        <small>추천기업</small>*!/*/}
                            {/*        /!*    </h5>*!/*/}
                            {/*        /!*</Col>*!/*/}
                            {/*        <Col className="mr-auto" lg="4">*/}
                            {/*            <Link to={'/User/Point'}>{user.balance ? user.balance.toLocaleString(navigator.language, {minimumFractionDigits:0}) : 0}</Link>*/}
                            {/*                /!*<small>Point</small>*!/*/}
                            {/*        </Col>*/}

                            {/*    </Row>*/}
                            {/*</div>*/}

                        </CardFooter>
                    </Card>
                </>
            );
        }
        return null;
    }

    render() {
        return (
            <>
                {this.renderUser()}
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps, {getUserProfile })(UserProfile);
