import React from "react";
import {Field, reduxForm} from "redux-form";
import {required} from "redux-form-validators"
import {Button} from 'rsuite'
import {renderError, renderField} from "../../utils/renderUtils";
import {loginUser} from "../../actions/authActions";
import {Container} from "reactstrap";

// import PropTypes from "prop-types";

const Login = (props) => {
    const {handleSubmit, error, submitting} = props;

    return (
      <div className="login-page">
        <Container>
          <div className="row justify-content-center">
            <form
                //className="col col-sm-4 card mt-5"
                className="col col-sm-4 card mt-5 p-4 m-3"
                onSubmit={handleSubmit}
            >
                <h4 className="text-md-center">로그인</h4>
                <hr/>

                <fieldset className="form-group">
                    <Field name="email" label="이메일" component={renderField}
                           type="text" validate={[required({message: "필수 입력사항입니다."})]}
                    />
                </fieldset>

                <fieldset className="form-group">
                    <Field name="password" label="비밀번호" component={renderField}
                           type="password" validate={[required({message: "필수 입력사항입니다."})]}
                    />
                </fieldset>
                {renderError(error)}
                <div className="" >
                    <Button type="submit" size="lg" appearance='primary' block loading={submitting}
                            style={{marginTop:"10px"}}
                    >
                        로그인
                    </Button>
                </div>
            </form>
            {/*</Row>*/}
            </div>
        </Container>
        <div
          className="full-page-background"
          style={{
              background:'#f5f5f5'
            // backgroundImage: `url(${require("assets/img/bg/fabio-mangione.jpg")})`
          }}
        />
      </div>

    );
  }
export default reduxForm({
  form: "login",
  onSubmit: loginUser,
})(Login);
//export default Login;
