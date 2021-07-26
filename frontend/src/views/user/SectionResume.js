/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState} from "react";
// reactstrap components
import {Button, Col, Container, Modal, Row} from "reactstrap";
import PopupLogin from "../../components/auth/PopupLogin";
import styled from "styled-components";

const Title = styled.p`
    font-weight:bold;
    font-size:40px;
`;

const SectionResume = () => {
  const [loginModal, setLoginModal] = useState(false);
  const toggleModalLogin = () => setLoginModal(!loginModal);

  return (
      <>
        <div className="section"
             //style={{ backgroundImage: "url(" + require("assets/img/bg/markus-spiske-187777.jpg") + ")" }}
        >
          <Container className="text-center">
            <Row>
              <Col className="ml-auto mr-auto text-left" md="8">
                <Title>
                  전문분야별 10가지 질문에 답하다<br/>
                </Title>
                <p className="description">
                  지금 채공과 커리어 여정을 시작하세요.
                </p>
              </Col>
              <Col className="ml-auto mr-auto download-area" md="4">
                  <Button
                      className="btn-round btn-outline-primary"
                      color="danger"
                      onClick={toggleModalLogin}
                  >
                    지금 시작하기
                  </Button>
              </Col>
            </Row>
            <Modal isOpen={loginModal} toggle={toggleModalLogin}>
                <PopupLogin loginSubmit={toggleModalLogin}/>
            </Modal>
          </Container>
        </div>
          </>
  );
}

export default SectionResume;
