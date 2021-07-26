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

const SectionRecommend = () => {
  const [loginModal, setLoginModal] = useState(false);
  const toggleModalLogin = () => setLoginModal(!loginModal);

  return (
      <div>
        <div className="section">
          <Container className="text-center">
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <Title>더 쉬운 추천, 강력한 보상</Title>
                <p className="description">
                  지인의 추천은 늘 힘이 됩니다.<br/>
                  추천해 둔 지인이 언제든 이직하면 합격자와 추천인 각각 50만원의 보상금을 드려요.
                </p>
              </Col>
              <Col className="ml-auto mr-auto download-area" md="5">
                {/*<Link to={'/User/Recommend/advUrl'}>*/}
                  <Button
                      className="btn-round btn-outline-primary"
                      color="danger"
                      onClick={toggleModalLogin}
                  >
                    추천 시작하기
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

export default SectionRecommend;
