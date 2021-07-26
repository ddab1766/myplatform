import React, {useEffect} from "react";
// reactstrap components
import {Col, Container, Row} from "reactstrap";
import {connect, shallowEqual, useSelector} from "react-redux";
import {getUserProfile} from "../../actions/authActions";
import HrProfile from "../../components/Manager/HrProfile";
import HrProfileEdit from "../../components/Manager/HrProfileEdit";
import HrProfileDetail from "../../components/Hr/HrProfileDetail";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Link} from "react-router-dom";
import HrSpecialDrawer from "../../components/Hr/HrSpecialDrawer";
import HrCoworker from "../../components/Hr/HrCoworker";
import HrAccountInfo from "../../components/Manager/HrAccountInfo";

const HrProfileView = (props) => {
    const {authenticated, hr} = useSelector(state => ({
            authenticated: state.auth.authenticated,
            hr: state.auth.hr
        }),
        shallowEqual
    );

    const pathname = () => {
        if(window.location.pathname.match('/Hr')){
            return 'Hr'
        }else if(window.location.pathname.match('/Mng')){
            return 'Mng'
        }
    }

    useEffect(()=>{
        if(authenticated) return;
        props.getUserProfile()
    },[authenticated]);

    return (
        <>
            {hr ? (
                <div className="content">
                    <Container>
                        <div className="title">
                            <h5>파트너 기업정보<br/>
                            </h5>
                        </div>
                        <hr/>
                        <Row>
                            {/* 기업프로필 */}
                            <Col md={hr && hr.custname ? 4 : 12}>
                                <HrProfile/>
                                <HrAccountInfo/>
                                {/*<HrCoworker/>*/}
                            </Col>
                            {/* 기업프로필 상세 */}
                            <Col md={hr && hr.custname ? 8: null}>


                                {/*<Card variant="outlined">
                                    <CardContent className="text-center">
                                        <div className="title">
                                            <h5>안녕하세요 {hr.custname} 담당자님
                                                <br/>
                                                <small>파트너님께 알맞은 채용의뢰서를 진행하세요.</small>
                                                <div className="centered">
                                                    <img
                                                        alt="..."
                                                        className="avatar border-gray centered"
                                                        width={"300px"}
                                                        src={require("assets/img/undraw_split_testing_l1uw.svg")}
                                                    />
                                                </div>
                                            </h5>
                                        </div>
                                    </CardContent>
                                    <CardContent className="centered">
                                        <Row >
                                            <HrSpecialDrawer btnSize={'sm'}/>
                                             <Button color="primary" variant="outlined"
                                                onClick={toggleModal}>
                                            전문직종 등록
                                        </Button>
                                            {' '}
                                            <Link to={"/Mng/sugub"}>
                                                <button className="btn btn-info">
                                                    우리 회사에 적합한 채용의뢰서 찾기
                                                </button>
                                            </Link>
                                        </Row>
                                    </CardContent>
                                </Card>
                                <hr/>*/}
                                <HrProfileDetail hr={hr}/>

                            </Col>
                            {/*{hr && hr.custname &&*/}
                            {/*<Col md={8}>*/}
                            {/*    <Coworker/>*/}
                            {/*</Col>*/}
                            {/*}*/}

                        </Row>

                    </Container>
                </div>
            ) : (
                <HrProfileEdit/>
                // <div></div>
            )}

        </>
    )
    // }
};

function mapStateToProps(state) {
    return {
        company: state.auth.company,
        user: state.auth.user,
        hr: state.auth.hr
    }
}

export default connect(mapStateToProps, {getUserProfile})(HrProfileView);

