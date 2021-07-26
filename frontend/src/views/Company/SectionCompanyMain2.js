import React, {useState} from "react";
import {Col, Container, Row} from "reactstrap";
// import img from '../../assets/img/resume.png'

const chaegongText = {
    fontSize : "4rem",
    webkitTextEmphasis: "dot white"
}

const SectionMain = () => {
    const [loginModal, setLoginModal] = useState(false);
    const toggleModalLogin = () => setLoginModal(!loginModal);


    return (
        <div className="section section2">
            <Container className="text-center">
                <Row>
                    <Col className="ml-auto mr-auto download-area" md="6">
                    {/*<img src={img} />*/}
                    </Col>
                    <Col className="ml-auto mr-auto text-right" md="6">
                        <p className="section-title">
                            <span style={chaegongText}>채</span>용도&nbsp;
                            <span style={chaegongText}>공</span>식이다!<br/>
                            양질의 이력서, 선별된 이력서!
                        </p>
                        <p className="section-descrip">
                            각 HR회사들의 이력서를 한곳에서 확인하세요<br/>
                        </p>
                        {/* <ul>
                            <li>플랫폼을 통한 지원 => 자체 HR전문가가 이력서 선별 </li>
                            <li>HR전문회사를 통한 지원  </li>
                        </ul> */}
                    </Col>
                </Row>

            </Container>
        </div>
    );
}

export default SectionMain;
