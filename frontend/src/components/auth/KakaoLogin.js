import React from 'react';
import KakaoLogin from 'react-kakao-login';
import {loginKakaoUser} from "../../actions/authActions";


class MyKakaoLogin extends React.Component {
    onSuccess(response) {
        console.log(response);
    }
    onFailure(response) {
        console.log(response);
    }

    render() {
      // const jskey = "3e3627c56abdc96d040334b86f0c1fc3";
      const jskey = "0d2738d4d7e8c9b3711594111194591d";
      return (
        <KakaoLogin
            jsKey={jskey}
            onSuccess={loginKakaoUser}
            onFailure={this.onFailure}
            //useDefaultStyle
            className="btn nav-link"
        >
            카카오톡으로 시작하기
        </KakaoLogin>
      )
    }
}
export default MyKakaoLogin;