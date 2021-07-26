import React, {Component} from 'react';
import {GoogleLogin} from 'react-google-login';
import styled from 'styled-components';
import {loginGoogleUser} from "../../actions/authActions";
import {Button, Icon} from 'rsuite'
import {DEV_URL} from "../../constants/urls";

const BtnGoogle = styled.button`
    margin:5px;
    width: 165px;
    height:35px;
    border-radius: 4px;
    background: #db3236;
    color:white;
    border:0px transparent;
    text-align: center;

    &:hover{
        background: #3b5998;
        opacity: 0.6;
    }
`

class MygoogleLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            provider: '',
        }
    }
    // Google Login
    responseGoogle = (res) => {
        loginGoogleUser(res)
        console.log('success res:',res)
        console.log('DEV_URL', DEV_URL)
    }

    // Login Fail
    responseFail = (err) => {
        console.error('fail err:', err);
    }

    render() {
        return (
            <Container>
                <div>
                    <GoogleLogin
                        // clientId={process.env.REACT_APP_Google}
                        style={{justifyContent:'center !important'}}
                        className="btn-block"
                        clientId='29463008123-jqf9227hnua2g4pga43sre7r4k2eblv6.apps.googleusercontent.com'
                        buttonText="Google로 시작하기"
                        render={renderProps => (
      <Button color="red"  className="btn-block rs-btn-lg" onClick={renderProps.onClick} >
          <Icon icon="google-plus-circle"  />
      &nbsp;Google로 시작하기</Button>
    )}
                        //render={renderProps => (
                        //   <BtnGoogle onClick={renderProps.onClick} >Google로 시작하기</BtnGoogle>
                        //)}
                        // redirectUri={DEV_URL}
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseFail}
                    />
                </div>
            </Container>
        );
    }
}

const Container = styled.div`
    display: flex;
    flex-flow: column wrap;
`


export default MygoogleLogin;