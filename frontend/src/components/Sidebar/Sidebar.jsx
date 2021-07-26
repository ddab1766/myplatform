import React from "react";
import {NavLink} from "react-router-dom";
import {Collapse, Nav} from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// import logo from "assets/img/react-logo.png";
import {connect} from "react-redux";
import {AuthUrls} from "../../constants/urls";
import {logoutUser} from "../../actions/authActions";
import avatar from "assets/img/default-avatar.png";
import logo from "assets/img/react-logo.png";
var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getCollapseStates(props.routes);
  }
  // this creates the intial state of this component based on the collapse routes
  // that it gets through this.props.routes
  getCollapseStates = routes => {
    let initialState = {};
    if(routes) {
      routes.map((prop, key) => {
        if (prop.collapse) {
          initialState = {
            [prop.state]: this.getCollapseInitialState(prop.views),
            ...this.getCollapseStates(prop.views),
            ...initialState
          };
        }
        return null;
      });
    }
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
  getCollapseInitialState(routes) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.pathname.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  }
  // this function creates the links and collapses that appear in the sidebar (left menu)
  createLinks = routes => {
    let permiss;

    //hr기업
    if(typeof this.props.hr !== 'undefined' && this.props.hr !== null){
      permiss = 3;
    }//인담
    else if(typeof this.props.company !== 'undefined'  && this.props.company !== null){
      permiss = 2;
    }
      if(routes){
    return routes.map((prop, key) => {
      //메뉴별 권한 부여
      if(typeof prop.permission !== 'undefined' && prop.permission.indexOf('2') === -1 && permiss === 2){
        return null;
      } else if(typeof prop.permission !== 'undefined' && prop.permission.indexOf('3') === -1 && permiss === 3){
        return null;
      }
      // else if(typeof prop.permission === 'undefined'){
      //   return null;
      // }

      if (!prop.isVisible){
        return null;
      }
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !this.state[prop.state];
        return (
            <li
                className={this.getCollapseInitialState(prop.views) ? "active" : ""}
                key={key}
            >
              <a
                  href="#pablo"
                  data-toggle="collapse"
                  aria-expanded={this.state[prop.state]}
                  onClick={e => {
                    e.preventDefault();
                    this.setState(st);
                  }}
              >
                {prop.icon !== undefined ? (
                    <>
                      <i className={prop.icon} />
                      <p>
                        {prop.name}
                        <b className="caret" />
                      </p>
                    </>
                ) : (
                    <>
                      <span className="sidebar-mini-icon">{prop.mini}</span>
                      <span className="sidebar-normal">
                    {prop.name}
                        <b className="caret" />
                  </span>
                    </>
                )}
              </a>
              <Collapse isOpen={this.state[prop.state]}>
                <ul className="nav">{this.createLinks(prop.views)}</ul>
              </Collapse>
            </li>
        );
      }
      return (
          <li className={this.activeRoute(prop.layout + prop.path)} key={key}>
            <NavLink to={prop.layout + prop.path} activeClassName="">
              {prop.icon !== undefined ? (
                  <>
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </>
              ) : (
                  <>
                    <span className="sidebar-mini-icon">{prop.mini}</span>
                    <span className="sidebar-normal">{prop.name}</span>
                  </>
              )}
            </NavLink>
          </li>
      );
    });
    }
  };
  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  componentDidMount() {
    // if you are using a Windows Machine, the scrollbars will have a Mac look
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    // we need to destroy the false scrollbar when we navigate
    // to a page that doesn't have this component rendered
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  handleLogout = () => {
     this.props.logoutUser();
  }
  render() {
    return (
        <div
            className="sidebar"
            data-color={this.props.bgColor}
            data-active-color={this.props.activeColor}
        >
          <div className="logo">
            <a
                href={AuthUrls.MANAGER_HOME + ''}
                className="simple-text logo-mini"
            >
              <div className="logo-img">
                {/*{logo}*/}
              </div>
            </a>
            <a
                // href="http://localhost:3000/Mng/dashboard"
                href={AuthUrls.MANAGER_HOME + ''}
                className="simple-text logo-normal"
            >
              {this.props.user && this.props.user.is_admin ? ('관리자') : ('파트너스 관리자')}
            </a>
          </div>

          <div className="sidebar-wrapper" ref="sidebar">
            <div className="user">
              <div className="photo">
                {/*<img src={avatar} alt="Avatar" />*/}
                <img src={(this.props.hr && this.props.user && this.props.hr.company_logo === null || this.props.user && this.props.user.is_admin) ?
                    avatar : this.props.hr && this.props.hr.company_logo} alt="react-logo" />
              </div>
              <div className="info" style={{cursor:"pointer",color:"white"}}>
                <a
                    // href="#"
                    data-toggle="collapse"
                    aria-expanded={this.state.openAvatar}
                    onClick={() =>
                        this.setState({ openAvatar: !this.state.openAvatar })
                    }
                >
                <span>
                  {this.props.company && this.props.company.custname }
                  {this.props.hr && this.props.hr.custname }
                  {this.props.user &&  this.props.user.is_admin && this.props.user.email }
                  <b className="caret" />
                </span>
                </a>
                <Collapse isOpen={this.state.openAvatar}>
                  <ul className="nav">
                    <li>
                      <NavLink to="/Mng/profile" activeClassName="">
                        <span className="sidebar-mini-icon">P</span>
                        <span className="sidebar-normal">기업정보</span>
                      </NavLink>
                    </li>
                    {/*<li>
                    <NavLink to="/Mng/user-profile" activeClassName="">
                      <span className="sidebar-mini-icon">EP</span>
                      <span className="sidebar-normal">Edit Profile</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/Mng/user-profile" activeClassName="">
                      <span className="sidebar-mini-icon">S</span>
                      <span className="sidebar-normal">Settings</span>
                    </NavLink>
                  </li>*/}
                   <li>
                    <NavLink to="/auth/login" activeClassName="" onClick={this.handleLogout}>
                      <span className="sidebar-mini-icon">L</span>
                      <span className="sidebar-normal">로그아웃</span>
                    </NavLink>
                  </li>
                  </ul>
                </Collapse>

              </div>
            </div>
            <Nav>{this.createLinks(this.props.routes)}</Nav>
            {/*<ul className="nav">
              <li>
                <NavLink to="/Company" activeClassName="">
                  <span className="sidebar-mini-icon">CP</span>
                  <span className="sidebar-normal">플랫폼 홈으로</span>
                </NavLink>
              </li>
            </ul>*/}
          </div>
        </div>
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

export default connect(mapStateToProps,{logoutUser})(Sidebar);

// export default Sidebar;


