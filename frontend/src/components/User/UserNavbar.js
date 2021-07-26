import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import {Button, Collapse, Container, Modal, Nav, Navbar, NavbarBrand, NavItem,} from "reactstrap";
import {AuthUrls} from "../../constants/urls";
import PopupLogin from "../auth/PopupLogin";


function UserNavbar(props) {
    const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
    const [navbarCollapse, setNavbarCollapse] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [loginModal, setLoginModal] = React.useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    const toggleModalLogin = () => {
        setLoginModal(!loginModal);
    };

    const toggleNavbarCollapse = () => {
        setNavbarCollapse(!navbarCollapse);
        document.documentElement.classList.toggle("nav-open");
    };

    React.useEffect(() => {
        const updateNavbarColor = () => {
            if (
                document.documentElement.scrollTop > 299 ||
                document.body.scrollTop > 299
            ) {
                setNavbarColor("");
            } else if (
                document.documentElement.scrollTop < 300 ||
                document.body.scrollTop < 300
            ) {
                // setNavbarColor("navbar-transparent");
                setNavbarColor("#ffffff");
            }
        };

        window.addEventListener("scroll", updateNavbarColor);

        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };
    });

    const companyUrl = AuthUrls.COMPANY_HOME;

    const renderBrand = () => {
        if (window.location.pathname.match('/User')) {
            return (
                <Link to={'/User'}>
                    <NavbarBrand
                        data-placement="bottom"
                        // href="/User"
                        // onClick={(<Link to={`/User`}/>)}
                        title="*For Employee"
                    >For Employee
                    </NavbarBrand>
                </Link>
            )
        } else {
            return (
                <Link to={'/User'}>
                    <NavbarBrand
                        data-placement="bottom"
                        // href="/User"
                        // target="_blank"
                        title="For Employee"
                    >For Employee
                    </NavbarBrand>
                </Link>
            )
        }
    }

    const renderLinks = () => {

        if (props.authenticated) {
            return (
                [
                    <NavItem>
                        <Link className="nav-link" to="/User/List">채용공고</Link>
                    </NavItem>,
                    <NavItem>
                        <Link className="nav-link" to="/User/Resume">이력서</Link>
                    </NavItem>,
                    <NavItem>
                        <Link className="nav-link" to="/User/Status/ing">지원현황</Link>
                    </NavItem>,
                    <NavItem>
                        <Link className="nav-link" to="/User/Recommend">추천현황</Link>
                    </NavItem>,
                    <NavItem>
                        <Link className="nav-link" to="/User/profile">내 프로필</Link>
                    </NavItem>,
                    <NavItem>
                        <Link className="nav-link" to="/User/logout">로그아웃</Link>
                    </NavItem>,
                    <NavItem>
                        {/*<Button className="btn btn-xs btn-round">*/}
                        {/*  <Link className="nav-link" to="/Company">기업메뉴</Link>*/}
                        {/*</Button>*/}
                        <Link to={'/'}>
                            <Button
                                className="btn-round"
                                color="primary"
                                //href="http://localhost:3000/Company"
                                // href={companyUrl}
                                //target="_blank"
                                // onClick={toggleModal}
                            >
                                메인페이지
                            </Button>
                        </Link>
                    </NavItem>
                ]
            );

        } else {
            return (
                [
                    <NavItem>
                        <Link className="nav-link" to="/User/List">채용공고</Link>
                    </NavItem>,
                    <NavItem>
                        <Link className="nav-link" to="/User/Resume">이력서</Link>
                    </NavItem>,
                    <NavItem>
                        <Link className="nav-link" to="/User/Recommend">추천현황</Link>
                    </NavItem>,
                    <NavItem>
                        {/*<Link className="nav-link" to="/User/login">로그인</Link>*/}
                        <Link className="nav-link" to="#" onClick={(e)=>e.preventDefault(toggleModalLogin())}>로그인</Link>
                    </NavItem>,
                    <NavItem>
                        <Link className="nav-link" to="/User/signup">회원가입</Link>
                    </NavItem>,
                    <NavItem>
                        {/*<Button className="btn btn-xs btn-round">*/}
                        {/*  <Link className="nav-link" to="/Company">기업메뉴</Link>*/}
                        {/*</Button>*/}
                        <Link to={'/'}>
                            <Button
                                className="btn-round"
                                color="primary"
                                //href="http://localhost:3000/Company"
                                // href={companyUrl}
                                //target="_blank"
                                onClick={toggleModal}
                            >
                                메인페이지
                            </Button>
                        </Link>
                    </NavItem>

                ]
            );
        }
    }



    return (

        <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
            <Container>

                <div className="navbar-translate">
                    {renderBrand()}
                    <button
                        aria-expanded={navbarCollapse}
                        className={classnames("navbar-toggler navbar-toggler", {
                            toggled: navbarCollapse
                        })}
                        onClick={toggleNavbarCollapse}
                    >
                        <span className="navbar-toggler-bar bar1"/>
                        <span className="navbar-toggler-bar bar2"/>
                        <span className="navbar-toggler-bar bar3"/>
                    </button>
                </div>
                <Collapse
                    className="justify-content-end"
                    navbar
                    isOpen={navbarCollapse}
                >
                    <Nav navbar>
                        {renderLinks()}
                    </Nav>
                </Collapse>
                <Modal isOpen={loginModal} toggle={toggleModalLogin}>
                    <PopupLogin loginSubmit={toggleModalLogin}/>
                </Modal>
            </Container>
        </Navbar>
    );
}

// export default IndexNavbar;

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
    }
}

export default connect(mapStateToProps)(UserNavbar);