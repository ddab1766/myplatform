import React, {useEffect} from "react";

import {Breadcrumb, BreadcrumbItem, Container} from "reactstrap";
import {connect} from "react-redux";
import ApplyList from "components/User/ApplyList";
import {getUserProfile} from "../../actions/authActions";
import {Link, Route} from "react-router-dom";
import LoaderSpinner from "../../components/Etc/LoaderSpinner";

// 지원현황
const StatusView = (props) => {
    const {match} = props;
    const user = props.user;

    useEffect(() => {
        if(user) return;
        props.getUserProfile();
    }, [user]);

    const menuList = () => {
        return (
            <div>
                <Breadcrumb tag="nav" listTag="div">
                    {/*<BreadcrumbItem tag="a">
                        <Link to={`${match.url}/pre`}>선지원 공고</Link>
                    </BreadcrumbItem>*/}
                    <BreadcrumbItem tag="a">
                        <Link to={`${match.url}/ing`}>지원한 공고</Link>
                    </BreadcrumbItem>
                    {/*<BreadcrumbItem tag="a">*/}
                    {/*    <Link to={`${match.url}/interest`}>관심 채용공고</Link>*/}
                    {/*</BreadcrumbItem>*/}
                    <BreadcrumbItem tag="a">
                        <Link to={`${match.url}/closed`}>마감된 공고</Link>
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
        );
    };

    return user ? (
            <div className="content">
                <Container>
                    <div className="title">
                        <h5>지원현황<br/>
                            <small>지원회사 목록 (한명당 하나의 공고에 지원가능)</small><br/>
                            <small>* 이력서상태가 미등록일 경우 마감일전에 이력서를 꼭 등록해주세요.</small><br/>
                        </h5>
                    </div>
                    {menuList()}
                <Route path={`${match.url}/:type`} component={ApplyList}/>
                </Container>
            </div>
        ) :
        (
            <LoaderSpinner/>
            /*<div classname="content">
                {/!*<div className="section">*!/}
                <Container>
                    <div className="title">
                        <h3>지원현황</h3>
                    </div>
                    <Row>
                        <Col md="3">

                        </Col>
                        <Col md="9">
                            지원 이력이 없습니다.
                        </Col>
                    </Row>
                </Container>
            </div>*/
        )
}

// export default StatusView;
function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, {getUserProfile})(StatusView);