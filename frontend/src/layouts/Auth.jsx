/*!

=========================================================
* Paper Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import {Route, Switch} from "react-router-dom";
import Footer from "components/Footers/Footer.jsx";
import "assets/css/paper-dashboard_mng.css"
import routes from "routes.js";
import {connect} from "react-redux";
import history from "../utils/historyUtils";

var ps;

class Pages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route:routes.hr
    };
  }
  componentDidMount() {
    if(this.props.company && !this.props.hr) {
      alert('해당 페이지는 파견사업주 전용 페이지입니다. 메인으로 이동합니다.');
      history.push('/');
    }
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.fullPages);
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <>
        {/*<AuthNavbar />*/}
        <div className="wrapper wrapper-full-page" ref="fullPages">
          <div className="full-page section-image">
            <Switch>{this.getRoutes(this.state.route)}</Switch>
            <Footer fluid />
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        company: state.auth.company,
        hr: state.auth.hr

    }
}

export default connect(mapStateToProps)(Pages);