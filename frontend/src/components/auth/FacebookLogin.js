import React from 'react';
import FacebookLogin from 'react-facebook-login';
import {loginFacebookUser} from "../../actions/authActions";
import styled from "styled-components";

const BtnFacebook = styled.button`
    width: 165px;
    height:35px;  
    border-radius: 4px;
    background: #3b5998;
    color:white;
    border:0px transparent;  
    text-align: center;
    margin:5px;
    display: inline-block;

    &:hover{
        background: #3b5998;
        opacity: 0.6;
    }
`;

class MyfacebookLogin extends React.Component {
    responseFacebook(response) {
        console.log('responseFacebook', response);
    }

    render() {
        return (
            <Container>
                <FacebookLogin
                    render={renderProps => (
                       <button onClick={renderProps.onClick}>This is my custom FB button</button>
                    )}
                    appId="505698013479165"
                    autoLoad={false}
                    fields="name,email,picture"
                    //cssClass={BtnFacebook}
                    //scope="public_profile,user_friends,user_actions.books"
                    scope="public_profile"
                    callback={loginFacebookUser}
                    cssClass="rs-btn rs-btn-default btn-block rs-btn-blue rs-btn-lg"
                    icon="rs-icon rs-icon-facebook-official"
                    textButton=" 페이스북으로 시작하기"

                />
            </Container>
        )
    }
}

const Container = styled.div`
    display: flex;
    flex-flow: column wrap;
    margin-top: 10px;
`

export default MyfacebookLogin;