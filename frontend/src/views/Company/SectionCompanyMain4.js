import React, {useState} from "react";
import {Col, Container, Row} from "reactstrap";
// import img from '../../assets/img/limp.jpg'

const SectionMain = () => {
    const [loginModal, setLoginModal] = useState(false);
    const toggleModalLogin = () => setLoginModal(!loginModal);


    return (
        <div className="section section4">
            <Container className="text-center">
                <Row>
                    <Col className="ml-auto mr-auto download-area" md="5">
                    {/*<img src={img} />*/}
                    </Col>
                    <Col className="ml-auto mr-auto text-right" md="7">
                        <p className="section-title">
                            지금 바로 더 스마트한<br/> 인재채용 서비스를 경험해보세요.
                        </p>
                        <p className="section-descrip">
                            인사담당자 / 헤드헌터만의 관리페이지 별도 제공<br/>
                            채용진행부터 채용합격<br/>
                            그리고 채용 후 까지의 관리를 편리하게
                        </p>
                        {/* <ul>
                            <li>채용진행 => </li>
                            <li>인사관리 => </li>
                            <li>청구관리 => </li>
                        </ul> */}
                    </Col>
                    
                </Row>

            </Container>
        </div>
    );
}

export default SectionMain;
