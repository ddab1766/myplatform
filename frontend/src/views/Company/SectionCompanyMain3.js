import React, {useState} from "react";
import {Col, Container, Row} from "reactstrap";
// import img from '../../assets/img/review.png'

const SectionMain = () => {
    const [loginModal, setLoginModal] = useState(false);

    return (
        <div className="section section3">
            <Container className="text-center">
                <Row>
                    <Col className="ml-auto mr-auto text-left" md="5">
                        <p className="section-title">
                            채용한 인재에<br/> 대한 생생한 리뷰
                        </p>
                        <p className="section-descrip">
                            근태내역 / 인사담당자의 솔직 후기<br/>
                            {/*잡플래닛의 반대 개념 !*/}
                        </p>
                        {/* <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </ul> */}
                    </Col>
                    
                    <Col className="ml-auto mr-auto download-area" md="3">
                    {/*<img src={img} />*/}
                        {/* <Link to={'/Company'}>
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
