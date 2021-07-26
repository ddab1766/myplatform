import React from 'react';
import styled from 'styled-components';
import {Button} from '../../../components';
import {useScrollFadeIn} from '../../../hooks';
import {heroBackground1} from '../../../assets';
import PopupLogin from "../../../../../auth/PopupLogin";
import {Modal} from "reactstrap";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

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

    const renderButton = () => {
        if(!props.authenticated) {
            return (
                <Button fill="solid"
                        style={{marginBottom: '2rem'}}
                        onClick={toggleModalLogin}
                >지금 시작하기</Button>
            )
        }else if(props.hr === null) {
            return (
                <Link to="/Hr/HrSignup">
                    <Button fill="solid"
                            style={{marginBottom: '2rem'}}
                    >지금 시작하기</Button>
                </Link>
            )
        }else if(props.hr !== null) {
            return (
                <Link to="/Hr/SugubList">
                    <Button fill="solid"
                            style={{marginBottom: '2rem'}}
                    >지금 시작하기</Button>
                </Link>
            )
        }
    }

    return (
        <S.Wrapper>
            <S.Label {...animatedItem[0]}>시작하기</S.Label>
            <S.Title {...animatedItem[1]}>
                B2B 채용 맞춤 서비스
                <br />
            </S.Title>
            <S.Descrip>
                인사담당자가 작성한 채용의뢰서를 확인하세요.<br/>
                맞춤인재 이력서를 업로드만 하면 접수완료.<br/>
                <br/><br/>
            </S.Descrip>
            <div {...animatedItem[2]} className="centered">
                {renderButton()}
                {/*<Button fill="solid" type="button"
                        onClick={toggleModalLogin}
                >
                    지금 시작하기
                </Button>*/}
            </div>
            <Modal isOpen={loginModal} style={{width: '368px'}} toggle={toggleModalLogin}>
                <PopupLogin loginSubmit={toggleModalLogin} toogle={toggleModalLogin} url={'Hr'}/>
            </Modal>
        </S.Wrapper>
    );
};


function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        hr: state.auth.hr,
    }
}

export default connect(mapStateToProps)(Banner);
