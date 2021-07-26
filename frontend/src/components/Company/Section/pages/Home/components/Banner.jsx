import React, {useState} from 'react';
import styled from 'styled-components';
import {Button} from '../../../components';
import {useScrollFadeIn} from '../../../hooks';
import {heroBackground1} from '../../../assets';
import {connect} from "react-redux";
import PopupLogin from "../../../../../auth/PopupLogin";
import {Modal} from "reactstrap";
import {Link} from "react-router-dom";
import SugubDrawer from "../../../../Sugub/SugubDrawer";
import CompanyMainSearch from "../../../../CompanyMainSearch";
import {Drawer} from "rsuite";

const S = {
    Wrapper: styled.section`
    width: 100%;
    padding: 120px 0;
    background-color: ${props => props.theme.palette.background};
    background: no-repeat center/cover url(${heroBackground1});
    display: flex;
    flex-direction: column;
    height: 780px;
    align-items: center;
    color:white;
    @media screen and (max-width: 760px){
    height: 46vh;
    }
  `,
    Label: styled.p`
    display: inline-block;
    ${props => props.theme.typography.label};
    color: ${props => props.theme.palette.primary};
    margin-bottom: 1rem;
    // color:white;
  `,
    Descrip: styled.p`
    color:white;
    text-align-last: center;
    font-size:1rem;
  `,
    Title: styled.h2`
    ${props => props.theme.typography.subtitle};
    color: ${props => props.theme.palette.black};
    margin-bottom: 2rem;
    text-align: center;
    color:white;
  `,
};

const Banner = (props) => {
    const [loginModal, setLoginModal] = React.useState(false);
    const toggleModalLogin = () => setLoginModal(!loginModal)
    const animatedItem = {
        0: useScrollFadeIn('up', 1),
        1: useScrollFadeIn('up', 1, 0.2),
        2: useScrollFadeIn('up', 1, 0.3),
    };

    const [show, setShow] = useState(false);
    const [placement, setPlacement] = useState('top');
    const close = () => setShow(false)
    const toggleDrawer = (placement) => {
        setPlacement(placement)
        setShow(true)
    }


    /*const renderButton = () => {
        if(!props.authenticated) {
            return (
                <SugubDrawer btnSize={'btn-sm'}/>
                /!*<Button fill="solid"
                        style={{marginBottom: '2rem'}}
                        onClick={toggleModalLogin}
                >지금 시작하기</Button>*!/
            )
        }else{
            return (
                <Link to="/Company/Profile">
                    <Button fill="solid"
                            style={{marginBottom: '2rem'}}
                    >지금 시작하기</Button>
                </Link>
            )
        }
    }*/

    return (
        <S.Wrapper>
            <S.Label {...animatedItem[0]}>시작하기</S.Label>
            <S.Title {...animatedItem[1]}>
                B2B 채용 맞춤 서비스
                <br />
            </S.Title>
            <S.Descrip>
                간단하게 의뢰서를 작성하여<br/>
                채용을 성사시켜 보세요.<br/>
            </S.Descrip>
            <div {...animatedItem[2]}>
                <br/>
                {/*{renderButton()}*/}
                <Button fill="solid"
                        style={{marginBottom: '2rem'}}
                        onClick={()=>toggleDrawer('top')}
                >지금 시작하기</Button>
                {/*<Modal isOpen={loginModal} style={{width: '395px'}} toggle={toggleModalLogin}>
                    <PopupLogin loginSubmit={toggleModalLogin} toogle={toggleModalLogin}/>
                </Modal>*/}
                <Drawer placement={placement} show={show} onHide={close}>
                    <CompanyMainSearch/>
                </Drawer>
            </div>
        </S.Wrapper>
    );
};

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        company: state.auth.company,
    }
}

export default connect(mapStateToProps)(Banner);

// export default Banner;
