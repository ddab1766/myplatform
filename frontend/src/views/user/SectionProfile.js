import React, {useState} from "react";
// reactstrap components
import {Button, Col, Container, Modal, Row} from "reactstrap";
import PopupLogin from "../../components/auth/PopupLogin";
import styled from "styled-components";

// core components
const Title = styled.p`
    font-weight:bold;
    font-size:40px;
`;

const SectionProfile = () => {
  const [loginModal, setLoginModal] = useState(false);
  const toggleModalLogin = () => setLoginModal(!loginModal);

  return (
      <div>
        <div className="section">
          <Container className="text-center">
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <Title>전문분야 등록</Title>
                <p className="description">
                  전문분야 등록.<br/>
                  해당 전문분야에 맞는 이력서를 작성하면 맞춤채용이 진행됩니다.
                </p>
              </Col>
              <Col className="ml-auto mr-auto download-area" md="5">
                {/*<Link to={'/User/Recommend/advUrl'}>*/}
                  <Button
                      className="btn-round btn-outline-primary"
                      color="danger"
                      onClick={toggleModalLogin}
                  >
                    채공 시작하기
                  </Button>
                {/*</Link>*/}
              </Col>
            </Row>
            <Modal isOpen={loginModal} toggle={toggleModalLogin}>
                <PopupLogin loginSubmit={toggleModalLogin}/>
            </Modal>
          </Container>
        </div>
      </div>
  );
}
//
// function mapStateToProps(state) {
//     return {
//         user: state.auth.user
//     }
// }

// export default connect(mapStateToProps, {getUserProfile})(SectionRecommend);

export default SectionProfile;
