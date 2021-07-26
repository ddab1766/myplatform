/*eslint-disable*/
import React from "react";
import {Container, Row} from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

class Footer extends React.Component {
  render() {
    return (
        <footer className={"footer footer-default"}
                style={{"position":"static",
                  "left":"0px",
                  "bottom":"0px",
                  "height":"70px",
                  "width":"100%" }}
        >
          <Container fluid={this.props.fluid ? true : false}>

            <Row>
              <nav className="footer-nav">
                <ul>
                  <li>
                    <Link to={'/HelpCenter/privacy'}>
                      개인정보 취급방침
                    </Link>
                  </li>
                  <li>
                    <Link to={'/HelpCenter/terms'}>
                      이용약관
                    </Link>
                  </li>
                  {/*<li>
                    <Link to={'/HelpCenter'}>
                      제휴·광고 문의
                    </Link>
                  </li>*/}
                  <li>
                    <Link to={'/HelpCenter'}>
                      고객센터
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="credits ml-auto">
                <div className="copyright">
                  &copy; {1900 + new Date().getYear()}, made with{" "}
                  <i className="fa fa-heart heart" /> (주)겟스로우
                </div>
                <ul>
                  <li>Copyright ⓒ 2020 CHAEGONG Co.,Ltd. All Rights Reserved.</li>
                </ul>
              </div>

            </Row>
          </Container>
        </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
