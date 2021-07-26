import React, {useState} from "react";
import {Col, Container, Modal, Row} from "reactstrap";
import PopupLogin from "../../components/auth/PopupLogin";
// import img from '../../assets/img/limp.jpg'

const SectionMain = () => {
    const [loginModal, setLoginModal] = useState(false);
    const toggleModalLogin = () => setLoginModal(!loginModal);


    return (
        <div className="section section3 section-dark">
            <Container className="text-center">
                <Row>
                    <Col className="ml-auto mr-auto text-left" md="6">
                        <p className="section-title">
                            채용과정을 투명하게!<br/>
                        </p>
                        <p className="section-descrip-lg">
                        채용 공고부터 최종 합격까지 모든<br/> 채용 과정의 투명한 운영.
                        </p>
                        <p className="section-descrip">
                        채용과정에 대한 실시간 리뷰<br/>
                        정규직 전환의 기회 ↑
                        {/* <ul>
                            <li>채용과정에 대한 실시간 리뷰</li>
                            <li>정규직 전환의 기회 ↑</li>
                        </ul> */}
                        </p>
                    </Col>
                    
                    <Col className="ml-auto mr-auto download-area" md="6">
                    {/*<img src={img} />*/}
                    {/* <br/><br/>
                        <Button
                            className="btn-round btn-primary"
                            onClick={toggleModalLogin}
                        >
                            채공 시작하기
                        </Button> */}
                    </Col>
                    <br/><br/>
                </Row>
                <Modal isOpen={loginModal} toggle={toggleModalLogin}>
                    <PopupLogin loginSubmit={toggleModalLogin}/>
                </Modal>
            </Container>
        </div>
    );
}

export default SectionMain;
