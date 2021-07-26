import React, {useEffect} from "react";
import UserProfile from "components/auth/UserProfile"
// reactstrap components
import {Col, Container, Row,} from "reactstrap";
import {connect} from "react-redux";
import UserSpecial from "../../components/User/UserSpecial";
import {getUserProfile} from "../../actions/authActions";
import LoaderSpinner from "../../components/Etc/LoaderSpinner";
import SectionProfile from "./SectionProfile";

const UserProfileView = (props) => {
    const user = props.user;
    const authenticated = props.authenticated;
    //IE
    useEffect(()=>{
        console.log('useEffect userprofile view..!')
        if(user) return;
        props.getUserProfile();
    },[user]);


    return  authenticated ? (
        <div className="content">
            { user ? (
                <Container>
                    <div className="title">
                        <h5>내 프로필<br/>
                            <small>
                                Profile이란? 취업 활동 경쟁력을 높일 수 있도록, 나의 이력 및 역량을 등록/관리 하는 서비스입니다.<br/>
                                등록된 나의 Profile을 이력서뿐만 아니라, 자사양식 채용/블라인드 채용 입사지원서에서 불러와 간편하게 작성해보세요.<br/>
                            </small>
                        </h5>
                    </div>

                    <hr/>
                    <Row>
                        <Col md="4">
                            <UserProfile/>
                        </Col>
                        <Col md="8">
                            <UserSpecial/>
                        </Col>
                    </Row>
                </Container>) :(<LoaderSpinner/>) }
        </div>
    ) : <SectionProfile/>;
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        user: state.auth.user,
        rehydrated: state._persist.rehydrated
    }
}

export default connect(mapStateToProps, {getUserProfile})(UserProfileView);

