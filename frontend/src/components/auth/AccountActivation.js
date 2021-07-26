import React, {Component} from "react";
import {propTypes, reduxForm} from "redux-form";
import {activateUserAccount, getUserProfile} from "../../actions/authActions";
import {renderError} from "../../utils/renderUtils";
import store from "store";

class AccountActivation extends Component {

    static propTypes = {
        ...propTypes
    };

    render() {
        const { handleSubmit, error } = this.props;

        return (
            <div className="content">
                <div className="row justify-content-center text-md-center">
                    <form
                        className="col col-sm-4 card mt-5 p-2"
                        onSubmit={handleSubmit}
                    >
                        <h4>아래버튼을 눌러 이메일 인증을 완료하세요</h4>
                        <hr/>

                        <fieldset className="form-group">
                            {renderError(error)}
                            <button action="submit" className="btn btn-lg btn-info">인증하기</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: "user_account_activation",
    onSubmit: activateUserAccount,
    onSubmitSuccess: ()=>{
        store.dispatch(getUserProfile())
    }
})(AccountActivation);
