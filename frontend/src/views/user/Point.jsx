import React, {useEffect, useState} from "react";
import {Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Collapse, Container} from "reactstrap";
import {connect} from "react-redux";
import {getUserProfile} from "../../actions/authActions";
import {Link, Route} from "react-router-dom";
import PointList from "../../components/User/PointList";
import LoaderSpinner from "../../components/Etc/LoaderSpinner";

// 채공포인트 현황
const PointView = (props) => {
    const {match} = props;
    const user = props.user;

    useEffect(() => {
        props.getUserProfile();
    }, []);

    const [openedCollapses, setOpenedCollapses] = useState(['collapseOne'])
    const collapsesToggle = collapse => {
        let opened = openedCollapses;

        if (opened.includes(collapse)) {
            setOpenedCollapses(opened.filter(item => item !== collapse));
        } else {
            opened.push(collapse);
            setOpenedCollapses(opened);
        }
    };

    const menuList = () => {
        return (
            <div>
                <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem tag="a">
                        <Link to={`${match.url}/chae`}>채용보상금</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem tag="a">
                        <Link to={`${match.url}/adv`}>광고보상금</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem tag="a">
                        <Link to={`${match.url}/intro`}>소개보상금</Link>
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
        );
    };

    return user ? (
            <div className="content">
                <Container>
                    <div className="title">
                        <h5>포인트현황
                        </h5>
                    </div>
                    <div
                        aria-multiselectable={true}
                        className="card-collapse"
                        id="accordion"
                        role="tablist"
                    >
                        <Card >
                            <CardHeader role="tab">
                                <a
                                    aria-expanded={openedCollapses.includes(
                                        "collapseOne"
                                    )}
                                    href="#pablo"
                                    data-parent="#accordion"
                                    data-toggle="collapse"
                                    onClick={(e) => {collapsesToggle("collapseOne")}}
                                >▷ 채공포인트가 무엇인가요?{" "}
                                    <i className="nc-icon nc-minimal-down" />
                                </a>
                            </CardHeader>
                            <Collapse
                                role="tabpanel"
                                isOpen={openedCollapses.includes("collapseOne")}
                            >
                                <CardBody>
                                    <p className="text-muted">
                                        채용보상금/광고보상금/소개보상금<br/>
                                        - 채용보상금 : 나를 추천인으로 등록한 구직자가 취직 성공 시 받는 보상금<br/>
                                        - 광고보상금 : 내가 생성한 채용공고 URL을 통해 구직자가 지원하여 최종 합격 시 받는 보상금 ( 최초 가입자일 경우에는 50% 아닐경우 최초 추천인과 25% 씩 나눔 )<br/>
                                        - 소개보상금 : 기업회원이 가입해서 매출이 발생했을때 받는 인센티브 개념의 보상금 <br/>
                                    </p>
                                </CardBody>
                            </Collapse>
                        </Card>

                    </div>
                    <Card>
                        <CardBody>
                            {user.username}님의 포인트 : {user.balance.toLocaleString(navigator.language, {minimumFractionDigits:0})} Point {' '}
                            <Link to={'/User/Exchange'}><button type="button" className="btn btn-sm btn-outline-danger">포인트 전환신청</button></Link>
                        </CardBody>
                    </Card>
                    {menuList()}
                    <Route path={`${match.url}/:type`} component={PointList}/>
                </Container>
            </div>
        ) :
        (<LoaderSpinner/>)
}

// export default StatusView;
function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, {getUserProfile})(PointView);