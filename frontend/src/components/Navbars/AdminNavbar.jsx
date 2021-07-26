import React from "react";
import classnames from "classnames";
import {Button, Collapse, Container, Nav, Navbar, NavbarBrand, NavItem} from "reactstrap";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Badge} from 'rsuite'

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "navbar-transparent",
      noti: []
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
    this.setState({
      ...this.state,
    })
  }
  componentDidUpdate(e) {
    if (
        window.outerWidth < 993 &&
        e.history.location.pathname !== e.location.pathname &&
        document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white"
      });
    } else {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
  };
  // this function opens and closes the collapse on small devices
  // it also adds navbar-transparent class to the navbar when closed
  // ad bg-white when opened
  toggleCollapse = () => {
    let newState = {
      collapseOpen: !this.state.collapseOpen
    };
    if (!this.state.collapseOpen) {
      newState["color"] = "bg-white";
    } else {
      newState["color"] = "navbar-transparent";
    }
    this.setState(newState);
  };
  render() {

    // console.log('noti:', this.state.noti)
    return (
        <>
          <Navbar
              className={classnames("navbar-absolute fixed-top", this.state.color)}
              expand="lg"
          >
            <Container fluid>
              <div className="navbar-wrapper">
                <div className="navbar-minimize">
                  <Button
                      className="btn-icon btn-round"
                      color="info"
                      id="minimizeSidebar"
                      onClick={this.props.handleMiniClick}
                  >
                    <i className="nc-icon nc-minimal-right text-center visible-on-sidebar-mini" style={{color:'#ffffff'}}/>
                    <i className="nc-icon nc-minimal-left text-center visible-on-sidebar-regular" style={{color:'#ffffff'}}/>
                  </Button>
                </div>
                <div
                    className={classnames("navbar-toggle", {
                      toggled: this.state.sidebarOpen
                    })}
                >
                  <button
                      className="navbar-toggler"
                      type="button"
                      onClick={this.toggleSidebar}
                  >
                    <span className="navbar-toggler-bar bar1" />
                    <span className="navbar-toggler-bar bar2" />
                    <span className="navbar-toggler-bar bar3" />
                  </button>
                </div>
                <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                <span className="d-none d-md-block">
                  {/*Paper Dashboard PRO React*/}
                </span>
                  <span className="d-block d-md-none"></span>
                </NavbarBrand>
              </div>

              <Link to='/Hr'>
                메인홈으로
              </Link>

              <button
                  aria-controls="navigation-index"
                  aria-expanded={this.state.collapseOpen}
                  aria-label="Toggle navigation"
                  className="navbar-toggler"
                  // data-target="#navigation"
                  data-toggle="collapse"
                  type="button"
                  onClick={this.toggleCollapse}
              >
                <span className="navbar-toggler-bar navbar-kebab" />
                <span className="navbar-toggler-bar navbar-kebab" />
                <span className="navbar-toggler-bar navbar-kebab" />
              </button>
              <Collapse
                  className="justify-content-end"
                  navbar
                  isOpen={this.state.collapseOpen}
              >
                {/*<Form>*/}
                {/*  <InputGroup className="no-border">*/}
                {/*    <Input defaultValue="" placeholder="Search..." type="text" />*/}
                {/*    <InputGroupAddon addonType="append">*/}
                {/*      <InputGroupText>*/}
                {/*        <i className="nc-icon nc-zoom-split" />*/}
                {/*      </InputGroupText>*/}
                {/*    </InputGroupAddon>*/}
                {/*  </InputGroup>*/}
                {/*</Form>*/}
                <Nav navbar>
                  <NavItem>
                    {this.props.hr && (
                        <Link className="" to="/Mng/Notifications/">
                          <Badge content={this.props.alarm != null &&  this.props.alarm.filter(v=> v.is_read === false).length}>
                            <i className="fa fa-bell-o" style={{fontSize:'20px'}}/>
                          </Badge>

                        </Link>
                    )}
                  </NavItem>
                  {/*<NavItem>*/}
                  {/*  <NavLink*/}
                  {/*    className="btn-magnify"*/}
                  {/*    href="#pablo"*/}
                  {/*    onClick={e => e.preventDefault()}*/}
                  {/*  >*/}
                  {/*    <i className="nc-icon nc-layout-11" />*/}
                  {/*    <p>*/}
                  {/*      <span className="d-lg-none d-md-block">Stats</span>*/}
                  {/*    </p>*/}
                  {/*  </NavLink>*/}
                  {/*</NavItem>*/}
                  {/*<UncontrolledDropdown className="btn-rotate" nav>*/}
                  {/*  <DropdownToggle*/}
                  {/*      aria-haspopup={true}*/}
                  {/*      caret*/}
                  {/*      color="default"*/}
                  {/*      data-toggle="dropdown"*/}
                  {/*      id="navbarDropdownMenuLink"*/}
                  {/*      nav*/}
                  {/*  >*/}
                  {/*    <i className="nc-icon nc-bell-55" />*/}
                  {/*    /!*<span className="label label-warning">2</span>*!/*/}
                  {/*    <p>*/}
                  {/*      <span className="d-lg-none d-md-block">Some Actions</span>*/}
                  {/*    </p>*/}
                  {/*  </DropdownToggle>*/}
                  {/*<DropdownMenu aria-labelledby="navbarDropdownMenuLink" right>*/}
                  {/*  /!*공지사항*!/*/}
                  {/*  {this.state.noti && this.state.noti.map( (v,index) => {*/}
                  {/*    return (*/}
                  {/*        <DropdownItem*/}
                  {/*            key={index}*/}
                  {/*            href="#pablo"*/}
                  {/*            onClick={e => e.preventDefault()}*/}
                  {/*        >*/}
                  {/*          {v.noti_event}*/}
                  {/*        </DropdownItem>*/}
                  {/*    )})*/}
                  {/*  }*/}
                  {/*  <Link to={{*/}
                  {/*    pathname: '/Mng/Notifications/',*/}
                  {/*    state: {*/}
                  {/*      noti: this.state.noti*/}
                  {/*    }*/}
                  {/*  }}>*/}
                  {/*    <DropdownItem*/}
                  {/*        // href="/Mng/Notifications/"*/}
                  {/*        // onClick={e => e.preventDefault()}*/}
                  {/*    >*/}
                  {/*      전체보기*/}
                  {/*    </DropdownItem>*/}
                  {/*  </Link>*/}
                  {/*</DropdownMenu>*/}
                  {/*</UncontrolledDropdown>*/}
                  {/*<NavItem>*/}
                  {/*  <NavLink*/}
                  {/*    className="btn-rotate"*/}
                  {/*    href="#pablo"*/}
                  {/*    onClick={e => e.preventDefault()}*/}
                  {/*  >*/}
                  {/*    <i className="nc-icon nc-settings-gear-65" />*/}
                  {/*    <p>*/}
                  {/*      <span className="d-lg-none d-md-block">Account</span>*/}
                  {/*    </p>*/}
                  {/*  </NavLink>*/}
                  {/*</NavItem>*/}
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
        </>
    );
  }
}

// export default AdminNavbar;
function mapStateToProps(state) {
  return {
    alarm: state.alarm.alarm
  }
}

export default connect(mapStateToProps)(AdminNavbar);
