import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getUserProfile} from "../../actions/authActions";
import {Card, CardBody, CardFooter, Col, Row} from "reactstrap";

class UserProfile extends Component {

    static propTypes = {
        getUserProfile: PropTypes.func.isRequired,
        user: PropTypes.object
    };

    // componentDidMount() {
    //     if(this.props.user) return;
    //     this.props.getUserProfile();
    // }

    renderUser() {
        let {user} = this.props;
        if (user) {
            return (
                <>
                    <Card className="card-user">
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
                                        src={require("assets/img/default-avatar.png")}
                                    />
                                </a>
                                <h5 className="title">{user.username}</h5>
                            </div>
                            <p className="description text-center">
                                {user.email}<small>{user.emailaddress ? ' [인증완료] ' : ' [인증미완료] '}</small><br/>
                                {user.phone}<br/>
                                {user.date_of_birth}<br/>
                                {user.gender === 'M' && '남자'}<br/>
                                {user.gender === 'F' && '여자'}<br/>
                                {/*{user.website}<br/>*/}
                                {user.about}<br/>
                            </p>
                            <center>
                                <Link className="btn mr-2"
                                      to={{
                                            pathname: `/User/profile_edit`,
                                            state: {
                                                user
                                            }
                                        }}
                                      >기본정보 수정</Link>
                            </center>
                        </CardBody>
                        <CardFooter>
                            <hr/>
                            <div className="button-container">
                                <Row>
                                    <Col className="ml-auto" lg="7" md="6" xs="6">
                                        <h5>
                                            {/*<br/>*/}
                                            <small>나의 포인트</small>
                                        </h5>
                                    </Col>
                                    {/*<Col className="ml-auto mr-auto" lg="4" md="6" xs="6">*/}
                                    {/*    <h5>*/}
                                    {/*        24,6$ <br/>*/}
                                    {/*        <small>추천기업</small>*/}
                                    {/*    </h5>*/}
                                    {/*</Col>*/}
                                    <Col className="mr-auto" lg="4">
                                        <Link to={'/User/Point'}>{user.balance ? user.balance.toLocaleString(navigator.language, {minimumFractionDigits:0}) : 0}</Link>
                                            {/*<small>Point</small>*/}
                                    </Col>

                                </Row>
                            </div>

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
                {" "}

                {/*<Link className="btn btn-primary" to="/User/change_password">비밀번호 변경</Link>*/}
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        // user_special: state.auth.user_special
    }
}

export default connect(mapStateToProps, {getUserProfile })(UserProfile);