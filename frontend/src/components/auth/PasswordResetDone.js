import React, {Component} from "react";
import {Container} from "reactstrap";
import {Field} from "redux-form";
import {renderField} from "../../utils/renderUtils";
import {required} from "redux-form-validators";

export default class PasswordResetDone extends Component {
    render() {
        return (
            <div className="content">
                <form
                    className="col col-sm-3 card mt-5 p-2 ml-auto mr-auto"
                >
                    <h3 className="text-md-center">비밀번호 찾기</h3>
                    <hr/>
                    <div className="text-md-center">
                        <div className="centered">
                            <img
                                alt="..."
                                className="border-gray centered"
                                width={"150px"}
                                src={require("assets/img/undraw_well_done_i2wr.svg")}
                            />
                        </div>
                        <br/>
                        <h3>
                            <small>
                                입력하신 이메일로 패스워드 초기화 메일을 보냈습니다.<br/>
                                이메일을 확인해주세요.
                            </small>
                        </h3>
                    </div>
                </form>

            </div>
        )
    }
}
