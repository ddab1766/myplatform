import React, {useState} from "react";
import {Col, Container, Modal, Row} from "reactstrap";
import PopupLogin from "../../components/auth/PopupLogin";
// import img from '../../assets/img/hexa.jpg'

const SectionMain = () => {
  const [loginModal, setLoginModal] = useState(false);
  const toggleModalLogin = () => setLoginModal(!loginModal);


  return (
        <div className="section section4" style={{"background-color": "#175a94"}}>
          <Container className="text-center">
            <Row>
            <Col className="ml-auto mr-auto download-area" md="5">
            {/*<img src={img} />*/}
                  {/* <br/><br/>
                  <Button
                      className="btn-round btn-neutral"
                      onClick={toggleModalLogin}
                  >
                    채공 시작하기
                  </Button>
                  <br/><br/> */}
              </Col>
              <Col className="ml-auto mr-auto text-right" md="5">
                  <br/>
                <p className="section-title">
                  당신의 미래를<br/>
                  응원합니다, 채공
                </p>
                  <br/>
                <p className="section-descrip">
                  지금 채공과 함께하세요.
                </p>
              </Col>
              
            </Row>
            <Modal isOpen={loginModal} toggle={toggleModalLogin}>
                <PopupLogin loginSubmit={toggleModalLogin}/>
            </Modal>
          </Container>
        </div>
  );
}

export default SectionMain;
