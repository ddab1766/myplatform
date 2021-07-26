import React from 'react';
import NaverLogin from "react-naver-login";
import {AuthUrls} from "constants/urls";
import {loginNaverUser} from "../../actions/authActions";


class MyNaverLogin extends React.Component {
    responseNaver(response) {
        console.log(response);
    }

    initLoginButton(props) {
        console.log(props);
    }

    /*componentDidMount() {
        if (process.browser) {
            const script = document.createElement('script');
            script.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js";
            script.async = true;
            this.ref.appendChild(script);
            const initLoop = setInterval(() => {
                if (window.naver) {
                    this.initLoginButton(this.props);
                    clearInterval(initLoop);
                }
            }, 300);
        }
    }*/
    static buttonStyle = {
        backgroundColor: '#20c997',
        width: '140px',
        height: '32px',
        padding: '16px',
        margin: '100px auto',
        fontSize: '24px',
        fontWeight: 600,
        color: 'white',
        textAlign: 'center',
        cursor: 'pointer',
        border: '1px solid #dee2e6',
        borderRadius: '4px',
      }

    render() {
        return (
            <NaverLogin
                clientId="NxPnJMCH0CF3w1SlJcrB"
                callbackUrl={AuthUrls.NAVER_LOGIN}
                // callbackUrl={loginNaverUser}
                render={(props) => <div style={MyNaverLogin.buttonStyle} onClick={props.onClick}>Naver Login</div>}
                // onSuccess={(naverUser) => console.log('naverUser:',naverUser)}
                onSuccess={(naverUser) => loginNaverUser(naverUser)}
                onFailure={(err) => console.error(err)}
            />
        )
    }
}

export default MyNaverLogin;