import React, {useState} from "react";
import {Col, Container, Row} from "reactstrap";
// import img from '../../assets/img/checklist.png'

const SectionMain = () => {
    const [loginModal, setLoginModal] = useState(false);

    return (
        <>
            <div className="section section1">
                <Container className="text-center">
                    <Row>
                        <Col className="ml-auto mr-auto text-left" md="8">
                            <br/><br/><br/><br/>
                            <p className="section-title">
                                문답형 이력서로 <br/>쉽고 간편하게!
                            </p>
                            <br/>
                            <p className="section-descrip">
                                이력서를 따로 작성할 필요 없이, 10가지 질문에 답하여 <br/>전문분야를 설정하고 간단하게 지원해보세요.
                            </p>
                        </Col>
                        <Col className="ml-auto mr-auto download-area" md="4" >
                            {/*<img src={img} />*/}
                            {/* <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                            <Link to={'/User'}>
                                <Button
                                    className="btn-round btn-primary"
                                    // onClick={toggleModalLogin}
                                >
                                    지금 시작하기
                                </Button>
                            </Link>
                            <br/><br/> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default SectionMain;
