import React, {useEffect} from "react";
// reactstrap components
import {Col, Container, Row,} from "reactstrap";
import {connect} from "react-redux";
import {getUserProfile} from "../../actions/authActions";
import LoaderSpinner from "../../components/Etc/LoaderSpinner";
import Profile from "../../components/Common/Profile";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card/Card";
import Nothing from "../../components/Common/Nothing";
import InterestSugub from "../../components/Hr/InterestSugub";
import InfoBox from "../../components/Common/InfoBox";

const ProfileView = (props) => {
    const {user, company, authenticated, hr} = props;
    //IE
    useEffect(() => {
        if (user) return;
        props.getUserProfile();
    }, [user]);

    const renderCard = () => {
        if(props.location.pathname.match('/Company')){
            return (
                <></>
            )
        }else if(props.location.pathname.match('/Hr')){
            return (
                <Card className="card pl-3 pr-3">
                    <CardContent>
                        <h5>관심 의뢰서</h5>
                        {
                            user.interestsugub_user && user.interestsugub_user.length > 0 ?
                                (
                                    <InterestSugub/>
                                ) : (<Nothing/>)
                        }
                    </CardContent>
                </Card>
            )
        }
    }


    return  (
        <div className="content">
            { user ? (
                <Container>
                    { company === null && hr === null && props.location.pathname.match('/Company') &&
                    ( <InfoBox url={'/Company/Profile'} text={'인사담당자 이신가요? 기업 정보를 등록해주세요.'}/> )
                    }
                    { company === null && hr === null && props.location.pathname.match('/Hr') &&
                    ( <InfoBox url={'/Hr/profileForm'} text={'파견사업주 담당자 이신가요? 기업 정보를 등록해주세요.'}/> )
                    }
                    <div className="title">
                        <h5>내 정보<br/>
                            {/*<small>*/}
                            {/*    Profile이란? 취업 활동 경쟁력을 높일 수 있도록, 나의 이력 및 역량을 등록/관리 하는 서비스입니다.<br/>*/}
                            {/*    등록된 나의 Profile을 이력서뿐만 아니라, 자사양식 채용/블라인드 채용 입사지원서에서 불러와 간편하게 작성해보세요.<br/>*/}
                            {/*</small>*/}
                        </h5>
                    </div>

                    <hr/>

                    <Row>
                        <Col md="4">
                            <Profile {...props}/>
                        </Col>
                        <Col md={"8"}>
                            <Card variant="outlined">
                                <CardContent className="text-center">
                                    <div className="title">
                                        <h4>환영합니다! {user.nickname}님
                                            <small></small>
                                            <br/>
                                            <div className="centered">
                                                <img
                                                    alt="..."
                                                    className="avatar border-gray centered"
                                                    width={"200px"}
                                                    src={require("assets/img/undraw_split_testing_l1uw.svg")}
                                                />
                                            </div>
                                        </h4>
                                    </div>
                                </CardContent>
                                <CardContent>
                                    {/*<SugubGuide/>*/}
                                </CardContent>
                            </Card>
                            <hr/>
                            {renderCard()}
                        </Col>
                    </Row>
                </Container>) :(<LoaderSpinner/>) }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        user: state.auth.user,
        company: state.auth.company,
        hr: state.auth.hr
    }
}

export default connect(mapStateToProps, {getUserProfile})(ProfileView);

