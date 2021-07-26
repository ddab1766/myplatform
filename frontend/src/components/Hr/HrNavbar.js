import React, {useState} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import classnames from "classnames";
import {
    Button,
    Collapse,
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Modal,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
} from "reactstrap";
import {AuthUrls} from "../../constants/urls";
import PopupLogin from "../auth/PopupLogin";

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {makeStyles} from '@material-ui/core/styles';
import history from "../../utils/historyUtils";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import {Badge,Icon} from "rsuite";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});
function HrNavbar(props) {
    // const userUrl = AuthUrls.USER_HOME;
    // const managerUrl = AuthUrls.MANAGER_HOME;
    const classes = useStyles();
    const {authenticated, hr} = props;
    const [loginModal, setLoginModal] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [navbarColor, setNavbarColor] = React.useState();
    const [navbarCollapse, setNavbarCollapse] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const handleClickMng = () => {
        history.push('/Mng');
        // if(props.hr.status_cd.code_id === 'CB0200000'){
        //     history.push('/Mng');
        // } else{
        //     alert('승인된 업체만 이용가능합니다.\n빠르게 검토중이오니 잠시만 기다려주시기 바랍니다. \n 승인 알람이 왔다면 재로그인 후 확인해주세요!');
        // }
    }
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
            if(hr){
                return (
                    <Link to={'/Hr'}>
                        <NavbarBrand
                            data-placement="bottom"
                            title="파트너센터"
                        >{hr.custname}
                        </NavbarBrand>
                    </Link>
                )
            }else{
                return (
                    <Link to={'/Hr'}>
                        <NavbarBrand
                            data-placement="bottom"
                            title="파트너센터"
                        >파트너센터
                        </NavbarBrand>
                    </Link>
                )
            }
        }else{
            return (
                <Link to={'/Hr'}>
                    <NavbarBrand
                        data-placement="bottom"
                        title="*파트너센터"
                    >파트너센터
                    </NavbarBrand>
                </Link>
            )
        }
    }

    const renderLinks = (anchor) => {

        return !anchor ? (
            <>
                <NavItem>
                    <Link className="nav-link" to="/Hr/SugubList">의뢰리스트</Link>
                </NavItem>
                {props.authenticated &&
                (
                    <NavItem>
                        <Link className="nav-link" to="/Hr/Chat">채팅</Link>
                    </NavItem>
                )}

            </>) : (
            <>
                <div
                    className={clsx(classes.list, {
                        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
                    })}
                    role="presentation"
                    onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}
                >
                    <ListItem>
                        <NavItem>
                            <Link className="nav-link" to="/Hr/SugubList">의뢰리스트</Link>
                        </NavItem>
                    </ListItem>
                    {props.authenticated &&
                    (
                        <ListItem>
                            <NavItem>
                                <Link className="nav-link" to="/Hr/Chat">채팅</Link>
                            </NavItem>
                        </ListItem>
                    )}

                </div>
            </>
        )

    }



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
            { color: white !important; }
            .navbar { background: #1f3d4c; }
            .btn-nav-hr,.btn-nav-hr:hover,.btn-nav-hr:focus
            {background : #8bc34a  !important;}
            .MuiDrawer-paper{
            background:#ffffff
            }
            .MuiListItem-root a, .MuiListItem-root li a{
            color:#4a4a4a;
            }
            .MuiDrawer-root.MuiDrawer-modal > div.MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 > ul > div > li > li > a{
            color:#4a4a4a;
            }
            .navbar-toggler-bar{
                background-color:white !important;
            }
            `}</style>
            <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
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
                            {/*    <Icon className={classnames("navbar-toggler navbar-toggler mr-2", {*/}
                            {/*        toggled: navbarCollapse*/}
                            {/*    })}*/}
                            {/*        aria-expanded={navbarCollapse} icon="bars" size="2x" style={{color:'white'}}/>*/}
                            <span className="navbar-toggler-bar bar1"/>
                            <span className="navbar-toggler-bar bar2"/>
                            <span className="navbar-toggler-bar bar3"/>
                        </button>
                        <Drawer anchor='right' open={state['right']}
                                onClose={toggleDrawer('right', false)} className={(classes.drawer)}>
                            <List style={{width:280}} onClick={toggleDrawer('right', false)}>
                                {/*{
                                    renderLinks('right')
                                }*/}
                                <ListItem>
                                    <ListItemText primary={<CloseIcon />} />
                                    <ListItemText style={{textAlign:'right'}} primary= {props.hr && (
                                        <Link className="nav-link" to="/Hr/Alarm">
                                            <Badge content={props.alarm != null && props.alarm.filter(v=> v.is_read === false).length}>
                                                <i className="fa fa-bell-o" style={{fontSize:'20px'}}/>
                                            </Badge>

                                        </Link>
                                    )} />
                                </ListItem>
                                {
                                    props.authenticated ? (
                                        <>
                                            <ListItem>
                                                <ListItemText primary= {<Link to="/Hr/My"><DropdownItem>내 정보</DropdownItem></Link>} />
                                                {/*<Dropdown isOpen={dropdownOpen} onMouseOver={onMouseEnter} onMouseLeave={onMouseLeave} toggle={toggle} nav inNavbar>*/}
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary= {<Link to="/Hr/Alarm_edit"><DropdownItem>알람 설정</DropdownItem></Link>} />
                                                {/*<Dropdown isOpen={dropdownOpen} onMouseOver={onMouseEnter} onMouseLeave={onMouseLeave} toggle={toggle} nav inNavbar>*/}
                                            </ListItem>
                                            <Divider component="li" />
                                            {(props.company === null || props.company === undefined)&& (
                                                props.hr === null ?
                                                    (<>
                                                            <ListItem>
                                                                <ListItemText primary={
                                                                    <Link to="/Hr/profileForm"><DropdownItem>기업등록</DropdownItem></Link>
                                                                }/></ListItem>
                                                            <Divider component="li" /></>

                                                    ) :
                                                    (<><ListItem>
                                                            <ListItemText primary={
                                                                <Link to="/Hr/Profile"><DropdownItem>기업
                                                                    정보</DropdownItem></Link>
                                                            }/>
                                                        </ListItem>
                                                            <Divider component="li" /></>
                                                    ))
                                            }
                                            {props.hr && (
                                                <>
                                                    <ListItem>
                                                        <ListItemText primary={
                                                            <Link to="/Hr/Account"><DropdownItem>계정 관리</DropdownItem></Link>
                                                        }/>
                                                    </ListItem>
                                                    <Divider component="li" />
                                                </>
                                            )}

                                            <ListItem>
                                                <ListItemText primary={
                                                    <Button
                                                        className="btn-block m-0"
                                                        color="primary"
                                                        onClick={()=>history.push('/Hr/logout')}
                                                    >
                                                        로그아웃
                                                    </Button>
                                                } />
                                            </ListItem>
                                            { props.hr && (
                                                <ListItem>
                                                    <ListItemText primary={
                                                        <Button
                                                            className="btn-block m-0"
                                                            color="primary"
                                                            onClick={handleClickMng}
                                                        >
                                                            파트너 전용
                                                        </Button>
                                                    }/>
                                                </ListItem>
                                            )}

                                        </>
                                    ) : (
                                        <>
                                            <ListItem>
                                                <ListItemText primary= {<Link className="nav-link" to="#"
                                                                              onClick={(e) => e.preventDefault(toggleModalLogin())}>로그인</Link>}/>
                                                {/*<NavItem>*/}
                                                {/*    <Link className="nav-link" to="#"*/}
                                                {/*          onClick={(e) => e.preventDefault(toggleModalLogin())}>로그인</Link>*/}
                                                {/*</NavItem>*/}
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem>
                                                <ListItemText primary={<Link className="nav-link" to="/Hr/signup">회원가입</Link>}/>
                                                {/*<NavItem>*/}
                                                {/*    <Link className="nav-link" to="/Hr/signup">회원가입</Link>*/}
                                                {/*</NavItem>*/}
                                            </ListItem>
                                            <Divider component="li" />
                                        </>
                                    )
                                }
                                 <ListItem>
                                        <ListItemText primary={
                                            <Button
                                                className="btn-block m-0"
                                                color="primary"
                                                onClick={()=>history.push('/Company')}
                                            >
                                                사용사업주 홈
                                            </Button>
                                        } />
                                    </ListItem>
                            </List>
                        </Drawer>
                    </React.Fragment>
                    <Collapse
                        className="justify-content-end"
                        navbar
                        isOpen={navbarCollapse}
                    >
                        {/*<Nav className="ml-3 mr-auto" navbar>
                            {renderLinks()}
                        </Nav>*/}
                        <Nav className="ml-auto" navbar>
                            {
                                props.authenticated ? (
                                    <>
                                        <NavItem>
                                            {props.hr && (
                                                <Link className="nav-link" to="/Hr/Alarm">
                                                    <Badge content={props.alarm != null && props.alarm.filter(v=> v.is_read === false).length}>
                                                        <i className="fa fa-bell-o" style={{fontSize:'20px'}}/>
                                                    </Badge>
                                                </Link>
                                            )}
                                        </NavItem>
                                        {/*<Dropdown isOpen={dropdownOpen} onMouseOver={onMouseEnter} onMouseLeave={onMouseLeave} toggle={toggle} nav inNavbar>*/}
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
                                                <Link to="/Hr/My"><DropdownItem>내 정보</DropdownItem></Link>
                                                <Link to="/Hr/Alarm_edit"><DropdownItem>알람 설정</DropdownItem></Link>
                                                {(props.company === null || props.company === undefined)&& (
                                                    props.hr === null ?
                                                        // (<Link to="/Hr/HrSignup"><DropdownItem>기업 등록</DropdownItem></Link>) :
                                                        (<Link to="/Hr/profileForm"><DropdownItem>기업 등록</DropdownItem></Link>) :
                                                        (<Link to="/Hr/Profile"><DropdownItem>기업 정보</DropdownItem></Link>)

                                                )}
                                                {props.hr && (
                                                    <>
                                                        <Link to="/Hr/Account"><DropdownItem>계정 관리</DropdownItem></Link>
                                                    </>
                                                )}
                                                <Link to="/Hr/logout"><DropdownItem>로그아웃</DropdownItem></Link>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </>
                                ) : (
                                    <>
                                        <NavItem>
                                            <Link className="nav-link" to="#"
                                                  onClick={(e) => e.preventDefault(toggleModalLogin())}>로그인</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link className="nav-link" to="/Hr/signup">회원가입</Link>
                                        </NavItem>
                                    </>
                                )
                            }
                            {/*<NavItem>
                                <Link to={'/'}>
                                    <Button
                                        className="btn-round mt-0 mb-0 mr-1 pr-3 pl-3 btn-nav-hr"
                                        color="primary"
                                        style={{fontSize: '13px', fontWeight: '100'}}
                                    >
                                        메인페이지
                                    </Button>
                                </Link>
                            </NavItem>*/}
                            { props.hr && (
                                <NavItem>
                                    <Button
                                        className="btn-round mt-0 mb-0 btn-nav-hr  pr-3 pl-3"
                                        color="primary"
                                        // href={managerUrl}
                                        // target="_blank"
                                        onClick={handleClickMng}
                                        style={{fontSize: '13px', fontWeight: '100'}}
                                    >
                                        파트너 전용
                                    </Button>
                                </NavItem>
                            )}
                        </Nav>
                    </Collapse>
                    <Modal isOpen={loginModal}  toggle={toggleModalLogin}>
                        <PopupLogin loginSubmit={toggleModalLogin} toggle={toggleModalLogin} url={'Hr'}/>
                    </Modal>
                </Container>
            </Navbar>
        </>
    );
}

// export default IndexNavbar;

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        company: state.auth.company,
        user: state.auth.user,
        hr: state.auth.hr,
        alarm: state.alarm.alarm
    }
}

export default connect(mapStateToProps)(HrNavbar);
