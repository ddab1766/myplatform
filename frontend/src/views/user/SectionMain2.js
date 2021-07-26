import React, {useState} from "react";
import {Col, Container, Row} from "reactstrap";
// import img from '../../assets/img/reward.png'

const SectionMain = () => {
    const [loginModal, setLoginModal] = useState(false);
    const toggleModalLogin = () => setLoginModal(!loginModal);


    return (
        <div className="section section2" style={{"background-color": "#175a94"}}>
            <Container className="text-center">
                <Row>
                    <Col className="ml-auto mr-auto download-area" md="3">
                    {/*<img src={img} />*/}
                        {/* <div className={"section"} style={{ backgroundImage: "url(" + require("assets/img/logo.png") + ")" }} >
                            <br/><br/><br/><br/><br/><br/><br/><br/>
                        </div> */}
                    </Col>
                    <Col className="ml-auto mr-auto text-right" md="6">
                        <p className="section-title">
                            보상금제도란?<br/>
                        </p>
                        <p className="section-descrip-lg">
                            지인 추천 및 홍보로 보상금 획득!<br/>
                            채용보상금 / 광고보상금 / 소개보상금<br/>
                            누구나 부수입을 창출할 수 있습니다.<br/>
                        </p>
                        <br/>
                        {/* <List >
                            <li>채용보상금 => </li>
                            <li>광고보상금 => </li>
                            <li>채용보상금 => </li>
                        </List> */}
                        <button className="btn btn-neutral btn-round ">알아보러가기</button>
                    </Col>
                    
                </Row>

            </Container>
        </div>
    );
}

export default SectionMain;
