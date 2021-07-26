import React, {useState} from "react";
import {Col, Container, Row} from "reactstrap";

const chaegongText = {
    fontSize : "4rem",
    webkitTextEmphasis: "dot black"
}

const SectionMain1 = () => {
    const [loginModal, setLoginModal] = useState(false);

    return (
        <div className="section section1"  style={{
            color: '#FFFFFF',
            backgroundImage: "url(" + require("../../assets/img/sec-bg.jpg") + ")",
            backgroundSize: 'cover',
            height: '700px',
            backgroundPositionY: '-200px',
            top: '-50px',
        }}>
            <Container className="text-center">
                <Row>
                    <Col className="ml-auto mr-auto center" md="12">
                        <p className="section-title">
                            헤드헌팅 기업 맞춤 서비스
                        </p>
                        <p className="section-descrip">
                            기업 인사담당자가 작성한 수급의뢰서를 확인하세요.<br/>
                            맞춤인재 이력서를 업로드만 하면 접수완료.<br/>
                        </p>
                        <button className="btn btn-danger btn-round">지금 이용하기</button>
                    </Col>

                </Row>
            </Container>
        </div>
    );
}

export default SectionMain1;
