import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import {Route, Switch} from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Footer from "components/Footers/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import routes from "routes.js";
import {connect} from "react-redux";
import {getCompanyProfile, getHrUserProfile, getUserProfile} from "actions/authActions";
import RequireAuth from "../components/auth/RequireAuth.js";
import "assets/css/paper-dashboard_mng.css"
import "perfect-scrollbar/css/perfect-scrollbar.css";
import LoaderSpinner from "../components/Etc/LoaderSpinnerContainer"
import history from "../utils/historyUtils";
import ScrollToTop from "../components/Etc/ScrollToTop";

var ps;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
      sidebarMini: false,
      route:this.props.user && this.props.user.is_admin ? (routes.admin) : (routes.hr),
    };
    if(!localStorage.getItem("token")) this.props.history.push("/auth/login");
    //로그인 상태 체크
    if (!localStorage.getItem("token")) {
      this.props.history.push("/auth/login");
    }
    else if(!this.props.user){
      alert('다시 로그인 해주세요.');
      history.push('/auth/login')
    }
    //관리자
    else if(this.props.user.is_admin){

    }
    //파견사업주 체크
    else if(!this.props.hr) {
      alert('해당 페이지는 파견사업주 전용 페이지입니다. 메인으로 이동합니다.');
      history.push('/');
    }
    //승인된 업체인지 체크
    else if(this.props.hr && this.props.hr.status_cd.code_id !== 'CB0200000'){
      // alert('승인된 업체만 이용가능합니다.\n신속하게 검토중이오니 잠시만 기다려 주시기 바랍니다.');
      // history.push('/Hr')
    }

    console.log(this.props.location.pathname)
    if(this.props.location.pathname === '/mng' || this.props.location.pathname === '/mng/' ||
        this.props.location.pathname === '/Mng' || this.props.location.pathname === '/Mng/') this.props.history.push("/Mng/sugub");
  }


  componentDidMount() {

    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      // ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    //로그인 상태 체크
    if (!localStorage.getItem("token")) {
      this.props.history.push("/auth/login");
    }
    else if(!this.props.user){
      alert('다시 로그인 해주세요.');
      history.push('/auth/login')
    }
    //관리자
    else if(this.props.user.is_admin){

    }
    //파견사업주 체크
    else if(!this.props.hr) {
      alert('해당 페이지는 파견사업주 전용 페이지입니다. 메인으로 이동합니다.');
      history.push('/');
    }
    //승인된 업체인지 체크
    else if(this.props.hr && this.props.hr.status_cd.code_id !== 'CB0200000'){
      // alert('승인된 업체만 이용가능합니다.\n신속하게 검토중이오니 잠시만 기다려 주시기 바랍니다.');
      // history.push('/Hr')
    }

  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      // ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }

  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH" || e.history.action === "POP") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }

  }
  getRoutes = routes => {
    if(routes) {
      return routes.map((prop, key) => {
        if (prop.collapse) {
          return this.getRoutes(prop.views);
        }

        if (prop.layout === "/Mng" && prop.exact) {
          return (
              <Route onChange={()=>console.log('chaenger')}
                     exact path={prop.layout + prop.path}
                     component={prop.component}
                     key={key}
              />
          );
        } else if (prop.layout === "/Mng") {
          return (
              <Route onChange={()=>console.log('chaenger')}
                     path={prop.layout + prop.path}
                     component={RequireAuth(prop.component)}
                     key={key}
              />
          );
        } else {
          return null;
        }
      });
    }
  };
  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  handleMiniClick = () => {
    if (document.body.classList.contains("sidebar-mini")) {
      this.setState({ sidebarMini: false });
    } else {
      this.setState({ sidebarMini: true });
    }
    document.body.classList.toggle("sidebar-mini");
  };

  render() {
    return (
        <div className="wrapper">
          {/*<ProgressContainer/>*/}
          <LoaderSpinner />
          {/*<Notifications />*/}
          <Sidebar
              {...this.props}
              routes={this.state.route}
              bgColor={this.state.backgroundColor}
              activeColor={this.state.activeColor}
          />
          <div className="main-panel" ref="mainPanel">
            <AdminNavbar {...this.props} handleMiniClick={this.handleMiniClick} />
            <div className="content">
              <ScrollToTop>
                <Switch>{this.getRoutes(this.state.route)}</Switch>
              </ScrollToTop>
            </div>
            {// we don't want the Footer to be rendered on full screen maps page
              this.props.location.pathname.indexOf("full-screen-map") !==
              -1 ? null : (
                  <Footer fluid />
              )}
          </div>
          {/*<FixedPlugin
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
          sidebarMini={this.state.sidebarMini}
          handleActiveClick={this.handleActiveClick}
          handleBgClick={this.handleBgClick}
          handleMiniClick={this.handleMiniClick}
        />*/}
        </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    user: state.auth.user,
    company: state.auth.company,
    hr: state.auth.hr,
    // alarm: state.alarm.alarm
  }
}

export default connect(mapStateToProps, { getUserProfile, getCompanyProfile, getHrUserProfile } )(Admin);

// export default Admin;
