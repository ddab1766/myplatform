import React, {useState} from "react";
import {Col, Container, Row} from "reactstrap";
// import img from '../../assets/img/checklist.png'

const chaegongText = {
    fontSize : "4rem",
    webkitTextEmphasis: "dot black"
}

const SectionMain2 = () => {
    const [loginModal, setLoginModal] = useState(false);

    return (
        <div className="section">
            <Container className="text-center">
                <Row>
                    <Col className="ml-auto mr-auto text-left" md="7">
                        <p className="section-title">
                            <span style={chaegongText}>영</span>업&nbsp;
                            <span style={chaegongText}>공</span>들이지 마세요!<br/>
                        </p>
                        <p className="section-descrip">
                        기존에는 전화 / 이메일로 영업을 하였다면<br/>
                            플랫폼에서 간단하게 확인하세요.
                        </p>
                        {/* <h3>
                            기존에는 전화 / 이메일로 작성하였다면<br/>
                            플랫폼에서 간단하게 작성하세요.
                        </h3> */}
                        <p className="description">
                            기업 인사담당자가 올린 수급의뢰서를 확인하세요.<br/>
                            맞춤인재 이력서를 업로드만 하면 끝<br/>
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

export default SectionMain2;
