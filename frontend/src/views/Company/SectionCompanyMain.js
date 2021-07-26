import React, {useState} from "react";
import {Col, Container, Row} from "reactstrap";
// import img from '../../assets/img/checklist.png'

const chaegongText = {
    fontSize : "4rem",
    webkitTextEmphasis: "dot black"
}

const SectionMain = () => {
    const [loginModal, setLoginModal] = useState(false);

    return (
        <div className="section section1">
            <Container className="text-center">
                <Row>
                    <Col className="ml-auto mr-auto text-left" md="7">
                        <p className="section-title">
                            <span style={chaegongText}>채</span>용&nbsp;
                            <span style={chaegongText}>공</span>들이지 마세요!<br/>
                        </p>
                        <p className="section-descrip">
                        기존에는 전화 / 이메일로 작성하였다면<br/>
                            플랫폼에서 간단하게 작성하세요.
                        </p>
                        {/* <h3>
                            기존에는 전화 / 이메일로 작성하였다면<br/>
                            플랫폼에서 간단하게 작성하세요.
                        </h3> */}
                        <p className="description">
                            10가지 질문에 답하여 인력요청서를 작성하세요<br/>
                            HR 전문 인력이 직접 채용공고 작성부터 인재 채용까지 관리해드립니다.<br/>
                            <strong style={{fontWeight:'600'}}>수수료 0원 !</strong>
                        </p>
                        {/* <ul>
                            <li>파견</li>
                            <li>채용대행</li>
                            <li>도급</li>
                        </ul> */}
                    </Col>
                    <Col className="ml-auto mr-auto download-area" md="4">
                    {/*<img src={img} />*/}
                        {/* <br/>
                        <Link to={'/Company'}>
                            <Button
                                className="btn-round btn-primary"
                                // onClick={toggleModalLogin}
                            >
                                지금 시작하기
                            </Button>
                        </Link> */}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SectionMain;
