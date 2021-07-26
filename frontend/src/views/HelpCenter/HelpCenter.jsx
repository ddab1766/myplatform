import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
} from "reactstrap";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getFAQ, getNotification} from "../../actions/userActions";
import NotificationList from "../../components/Manager/NotificationList";
import FAQ from "../../components/HelpCenter/FAQ";

const HelpCenter = (props) => {
    const [noti, setNoti] = useState([]);
    const [faq, setFaq] = useState([]);
    const [horizontalTabs, setHorizontalTabs] = useState('company');

    // todo 새로고침 처리 방식

    // 공지사항
    useEffect(()=>{
        getNotification().then(({data})=>{
            setNoti(data)
        })
    },[]);

    // FAQ
    useEffect(()=>{
        getFAQ().then(({data})=>{
            setFaq(data)
        })
    },[]);

    return (
        <div>
            {/*<div className="section text-center"
                 style={{
                     color: '#000000',
                     backgroundImage: "url(" + require("assets/img/bg/images.jpg") + ")"
                 }}
            >

                <h3>플랫폼에 대해 궁금한 점을 검색해주세요</h3>
                <TextField size="small" label="예)보상금, 서비스 이용방법" variant="outlined"/><Button className="btn btn-primary">검색</Button>

            </div>*/}
            <div className="content">
                <Container>
                    <div className="title">
                        <h4>
                            고객센터<br/>
                            <small></small>
                        </h4>
                    </div>
                    <Row>
                        <Col md={12}>
                            <div className="pull-right">
                                <Link to={"/HelpCenter/Requests"}>
                                    <Button>문의하기</Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardHeader>
                                </CardHeader>
                                <CardBody>
                                    <div className="nav-tabs-navigation">
                                        <div className="nav-tabs-wrapper">
                                            <Nav id="tabs" role="tablist" tabs>
                                                {/*<NavItem>
                                                    <NavLink
                                                        aria-expanded={horizontalTabs === "user"}
                                                        data-toggle="tab"
                                                        href="#"
                                                        role="tab"
                                                        className={
                                                            horizontalTabs === "user"
                                                                ? "active"
                                                                : ""
                                                        }
                                                        onClick={() =>
                                                            setHorizontalTabs("user" )
                                                        }
                                                    >
                                                        개인회원 FAQ
                                                    </NavLink>
                                                </NavItem>*/}
                                                <NavItem>
                                                    <NavLink
                                                        aria-expanded={
                                                            horizontalTabs === "company"
                                                        }
                                                        data-toggle="tab"
                                                        href="#"
                                                        role="tab"
                                                        className={
                                                            horizontalTabs === "company"
                                                                ? "active"
                                                                : ""
                                                        }
                                                        onClick={() =>
                                                            setHorizontalTabs("company")
                                                        }
                                                    >
                                                        기업회원 FAQ
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        aria-expanded={
                                                            horizontalTabs === "hr"
                                                        }
                                                        data-toggle="tab"
                                                        href="#"
                                                        role="tab"
                                                        className={
                                                            horizontalTabs === "hr"
                                                                ? "active"
                                                                : ""
                                                        }
                                                        onClick={() =>
                                                            setHorizontalTabs("hr")
                                                        }
                                                    >
                                                        HR회원 FAQ
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </div>
                                    </div>
                                    <TabContent
                                        className="text-center"
                                        id="my-tab-content"
                                        activeTab={horizontalTabs}
                                    >
                                        <TabPane tabId="user" role="tabpanel">
                                            <FAQ faq={faq} gubun='ZC0100000'/>
                                        </TabPane>
                                        <TabPane tabId="company" role="tabpanel">
                                            <FAQ faq={faq} gubun='ZC0200000'/>
                                        </TabPane>
                                        <TabPane tabId="hr" role="tabpanel">
                                            <FAQ faq={faq} gubun='ZC0300000'/>
                                        </TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="title">
                                <h5>소식</h5>
                            </div>
                            <NotificationList noti={noti}/>
                            {/*<div className="content">*/}
                            {/*    <ul>*/}
                            {/*        <li>고객센터 운영시간 안내</li>*/}
                            {/*        <li>보상금제도 실시</li>*/}
                            {/*    </ul>*/}
                            {/*</div>*/}
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        company: state.auth.company,
    }
}

export default connect(mapStateToProps, {getFAQ} )(HelpCenter);

// export default Dashboard;
