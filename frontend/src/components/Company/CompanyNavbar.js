import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import classnames from "classnames";
// reactstrap components
import {
    Button,
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Modal,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem
} from "reactstrap";
import {Badge, Icon} from "rsuite"
import PopupLogin from "../auth/PopupLogin";

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {makeStyles} from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import history from "../../utils/historyUtils";

const useStyles = makeStyles((theme) =>({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    nested: {
        paddingLeft: theme.spacing(4),
        color:'#4a4a4a'
    },
}));
function CompanyNavbar(props) {
    // const userUrl = AuthUrls.USER_HOME;
    // const managerUrl = AuthUrls.MANAGER_HOME;
    const [loginModal, setLoginModal] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const {authenticated, company} = props;
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const toggleModalLogin = () => {
        setLoginModal(!loginModal);
    };

    function onMouseEnter() {
        setDropdownOpen(true);
    }

    function onMouseLeave() {
        setDropdownOpen(false);
    }


    const renderBrand = () => {
        if(authenticated){
            if(company){
                return (
                    <>
                        <Link to={'/Company'}>
                            <NavbarBrand
                                data-placement="bottom"
                                title="* For Company"
                            >{company.custname}
                            </NavbarBrand>
                        </Link>
                    </>
                )
            }else{
                return (
                    <Link to={'/Company'}>
                        <NavbarBrand
                            data-placement="bottom"
                            title="* For Company"
                        >??????????????? ???
                        </NavbarBrand>
                    </Link>
                )
            }
        }else{
            return (
                <Link to={'/Company'}>
                    <NavbarBrand
                        data-placement="bottom"
                        title="* For Company"
                    >??????????????? ???
                    </NavbarBrand>
                </Link>
            )
        }
    }

    const renderLinks = (anchor) => {
        return !anchor ? (
            <>
                <NavItem>
                    <Link className="nav-link" to="/Company/Sugub">????????????</Link>
                </NavItem>
                <NavItem>
                    <Link className="nav-link" to="/Company/Partners">????????????</Link>
                </NavItem>
                {props.authenticated &&
                (
                    <NavItem>
                        <Link className="nav-link" to="/Company/Chat">??????</Link>
                    </NavItem>
                )}
            </>
        ) : (
            <>
                <div
                    className={clsx({
                        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
                    })}
                    role="presentation"
                    onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}
                >

                    <ListItem>
                        <ListItemText primary={
                            <Link className="nav-link" to="/Company/Sugub">????????????</Link>
                        } />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                        <ListItemText primary={
                            <Link className="nav-link" to="/Company/Partners">????????????</Link>
                        } />
                    </ListItem>
                    <Divider component="li" />
                    {props.authenticated &&
                    (
                        <>
                            <ListItem>
                                <ListItemText primary={
                                    <Link className="nav-link" to="/Company/Chat">??????</Link>
                                } />
                            </ListItem>
                            <Divider component="li" />
                        </>
                    )}

                </div>
            </>
        )
    }


    const [navbarColor, setNavbarColor] = React.useState();
    const [navbarCollapse, setNavbarCollapse] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const toggleModal = () => {
        setModal(!modal);
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
                setNavbarColor("#274c5e");
            }
        };

        window.addEventListener("scroll", updateNavbarColor);

        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };
    });

    return (
        <>
            <style jsx>{`
            #root > div > div > nav > div > div.justify-content-end.collapse.navbar-collapse > ul > li > a,
            #root > div > div > nav > div > div > a > a
            { color: white; }
            .navbar { background: #212631; }
            .btn-nav-c, .btn-nav-c:hover
            {background : #6bd098 !important;}
            .MuiDrawer-paper{
            background:#ffffff
            }
            .MuiListItem-root a, .MuiListItem-root li a{
            color:#4a4a4a;
            }
            .navbar-toggler-bar{
                background-color:white !important;
            }
            `}</style>
            <Navbar className={classnames("fixed-top", navbarColor)} expand="lg" >
                <Container>
                    <div className="ml-2">
                        {renderBrand()}
                    </div>
                    <React.Fragment key='right'>
                        <button
                            aria-expanded={navbarCollapse}
                            className={classnames("navbar-toggler navbar-toggler mr-2", {
                                toggled: navbarCollapse
                            })}
                            // onClick={toggleNavbarCollapse}
                            onClick={toggleDrawer('right', true)}
                        >
                            <span className="navbar-toggler-bar bar1"/>
                            <span className="navbar-toggler-bar bar2"/>
                            <span className="navbar-toggler-bar bar3"/>
                        </button>
                        <Drawer anchor='right' open={state['right']} onClose={toggleDrawer('right', false)} className={(classes.drawer)}>
                            <List style={{width:280}} onClick={toggleDrawer('right', false)}>
                                <ListItem>
                                    <ListItemText primary={<CloseIcon />} />
                                    <ListItemText style={{textAlign:'right'}} primary={
                                        <Link className="nav-link" to="/Company/Alarm"
                                              onClick={toggleDrawer('right', false)}
                                              onKeyDown={toggleDrawer('right', false)}>
                                            <Badge
                                                content={props.alarm != null && props.alarm.filter(v => v.is_read === false).length}>
                                                <i className="fa fa-bell-o" style={{fontSize: '20px'}}/>
                                            </Badge>
                                        </Link>
                                    } />
                                </ListItem>
                                {
                                    renderLinks('right')
                                }

                                {
                                    props.authenticated ? (
                                        <>
                                            <ListItem>
                                                <ListItemText primary={
                                                    <Link to="/Company/My" className="nav-link"
                                                          onClick={toggleDrawer('right', false)}
                                                          onKeyDown={toggleDrawer('right', false)}>??? ??????</Link>
                                                }/>
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem>
                                                <ListItemText primary={
                                                    <Link to="/Company/Alarm_edit" className="nav-link"
                                                          onClick={toggleDrawer('right', false)}
                                                          onKeyDown={toggleDrawer('right', false)}>?????? ??????</Link>
                                                }/>
                                            </ListItem>
                                            <Divider component="li" />

                                            {props.hr === undefined || props.hr === null &&
                                            <>
                                                <ListItem>
                                                    <ListItemText primary={
                                                        <Link to="/Company/Profile" className="nav-link"
                                                              onClick={toggleDrawer('right', false)}
                                                              onKeyDown={toggleDrawer('right', false)}>??????
                                                            ??????</Link>
                                                    }/>
                                                </ListItem>
                                                <Divider component="li" />
                                            </>
                                            }

                                            {props.company &&
                                            <>
                                                <ListItem>
                                                    <ListItemText primary={
                                                        <Link to="/Company/Employee" className="nav-link" onClick={toggleDrawer('right', false)}
                                                              onKeyDown={toggleDrawer('right', false)}>????????? ??????</Link>
                                                    }/>
                                                </ListItem>
                                                <Divider component="li" />
                                                <ListItem>
                                                    <ListItemText primary={
                                                        <Link to="/Company/Account" className="nav-link" onClick={toggleDrawer('right', false)}
                                                              onKeyDown={toggleDrawer('right', false)}>?????? ??????</Link>
                                                    }/>
                                                </ListItem>
                                                <Divider component="li" />
                                            </>
                                            }
                                            <ListItem >
                                                <ListItemText primary={
                                                    <Button
                                                        className="btn-block m-0"
                                                        color="primary"
                                                        onClick={()=>history.push('/Company/logout')}
                                                    >
                                                        ????????????
                                                    </Button>
                                                } />
                                            </ListItem>
                                        </>
                                    ) : (
                                        <>
                                            <ListItem>
                                                <NavItem>
                                                    {/*<Link className="nav-link" to="#"
                                                          onKeyDown={toggleDrawer('right', false)}
                                                          onClick={[toggleDrawer('right', false),toggleModalLogin]}
                                                        // onClick={toggleDrawer('right', false)}
                                                    >?????????</Link>*/}
                                                    <Link className="nav-link" to="#"
                                                          onClick={(e) => e.preventDefault(toggleModalLogin())}>?????????</Link>
                                                </NavItem>
                                            </ListItem>
                                            <ListItem>
                                                <NavItem>
                                                    <Link className="nav-link" to="/Company/signup" onKeyDown={toggleDrawer('right', false)}
                                                          onClick={toggleDrawer('right', false)}>????????????</Link>
                                                </NavItem>
                                            </ListItem>
                                        </>
                                    )
                                }
                                <ListItem>
                                    <ListItemText primary={
                                        <Button
                                            className="btn-block m-0"
                                            color="primary"
                                            onClick={()=>history.push('/Hr')}
                                        >
                                            ????????? ?????????
                                        </Button>
                                    } />
                                </ListItem>
                            </List>
                        </Drawer>
                    </React.Fragment>
                    <div
                        className="justify-content-end collapse navbar-collapse"
                        navbar
                        // isOpen={navbarCollapse}
                    >
                        <Nav className="ml-3 mr-auto" navbar>
                            {renderLinks()}
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            {
                                props.authenticated ? (
                                    <>
                                        <NavItem>
                                            <Link className="nav-link" to="/Company/Alarm">
                                                <Badge content={props.alarm != null && props.alarm.filter(v=> v.is_read === false).length}>
                                                    {/*<Badge content={props.user.alarm_count}>*/}
                                                    <i className="fa fa-bell-o" style={{fontSize:'20px'}}/>
                                                </Badge>
                                                {/*    <i className="fa fa-bell-o"/>*/}
                                                {/*    <span className="badge badge-danger" style={{"vertical-align": "top"}}>*/}
                                                {/*    {props.alarm && props.alarm.filter(v=> v.is_read === false).length}*/}
                                                {/*</span>*/}
                                            </Link>
                                        </NavItem>
                                        <Dropdown isOpen={dropdownOpen} toggle={toggle} nav inNavbar>
                                            <DropdownToggle caret nav style={{textTransform:'none', "display": "-webkit-inline-box"}}>
                                                {/*{props.user && props.user.email.split('@')[0]}*/}

                                                <Avatar alt={props.user && props.user.nickname}
                                                        src={props.user && props.user.profile_image}
                                                        style={{"width": "30px", "height": "30px"}}
                                                />
                                                {/*{props.user && props.user.nickname}*/}

                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <Link to="/Company/My"><DropdownItem>??? ??????</DropdownItem></Link>
                                                <Link to="/Company/Alarm_edit"><DropdownItem>?????? ??????</DropdownItem></Link>
                                                {props.hr === null && (
                                                    props.company === null ?
                                                        (<Link to="/Company/Profile"><DropdownItem>?????? ??????</DropdownItem></Link>)
                                                        :
                                                        (<Link to="/Company/Profile"><DropdownItem>?????? ??????</DropdownItem></Link>)
                                                )}
                                                {props.company && (
                                                    <>
                                                        <Link to="/Company/Employee"><DropdownItem>????????? ??????</DropdownItem></Link>
                                                        <Link to="/Company/Account"><DropdownItem>?????? ??????</DropdownItem></Link>
                                                    </>
                                                )}

                                                <Link to="/Company/logout"><DropdownItem>????????????</DropdownItem></Link>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </>
                                ) : (
                                    <>
                                        <NavItem>
                                            <Link className="nav-link" to="#"
                                                  onClick={(e) => e.preventDefault(toggleModalLogin())}>?????????</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link className="nav-link" to="/Company/signup">????????????</Link>
                                        </NavItem>
                                    </>
                                )
                            }
                            <NavItem>
                                <Link className="nav-link" to="/Hr" target="_blank">????????? ?????????</Link>
                            </NavItem>
                            {/*<NavItem>

                                <Link to={'/'}>
                                    <Button
                                        className="btn-round m-0 btn-nav-c"
                                        color="info"
                                    >
                                        ????????? ?????????
                                    </Button>

                                </Link>
                            </NavItem>*/}
                        </Nav>

                    </div>
                    <Modal isOpen={loginModal} toggle={toggleModalLogin}>
                        <PopupLogin loginSubmit={toggleModalLogin} toggle={toggleModalLogin}/>
                    </Modal>
                </Container>
            </Navbar>
        </>
    );
}



function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        company: state.auth.company,
        user: state.auth.user,
        alarm: state.alarm.alarm,
        hr: state.auth.hr
    }
}

export default connect(mapStateToProps)(CompanyNavbar);
