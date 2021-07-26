import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Col, Container, FormText, Row, Spinner} from "reactstrap";
import {Field, reduxForm} from "redux-form";
import {renderError, renderField, renderTextAreaField} from "../../utils/renderUtils";
import {getUserProfile} from "../../actions/authActions";
import {updateQna} from "../../actions/userActions";

const RequestsView = ( props ) => {
    const {handleSubmit, submitting, error} = props;
    const user = props.user;
    console.log('user', user)
    //IE
    useEffect(()=>{
        if(user) return;
        props.getUserProfile();
    },[user]);

    return (
        <div className="content">
            <Container>
                <div className="title">
                    <h5>문의 등록</h5><br/>
                </div>
                <form  onSubmit={handleSubmit}>
                    <Row>
                        <Col md="6">
                            <fieldset>
                                <Field name="qna_email" type="text" label="이메일 주소" placeholder="가입하신 이메일 주소를 기입해주세요.(비회원은 수신 가능한 이메일)"
                                       component={renderField}
                                       required={true}
                                />
                            </fieldset>
                        </Col>
                        <Col md="6">
                            <fieldset>
                                <Field name="qna_phone" type="text" label="연락처" placeholder=""
                                       component={renderField}/>
                            </fieldset>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="12">
                            <fieldset>
                                <Field name="qna_title" type="text" label="제목" placeholder="(예) 서비스 이용 문의"
                                       required={true}
                                       component={renderField}/>
                            </fieldset>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="12">
                            <fieldset>
                                <Field name="qna_text" type="text" label="설명" placeholder="상세한 문의 사항을 기입해주세요."
                                       component={renderTextAreaField}
                                       required={true}
                                />
                            </fieldset>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="12">
                            <FormText color="default" tag="span">
                                ※ 개인정보 수집 및 이용에 대한 동의 내용 <br/>
                                (주)겟스로우는 정보통신망 이용촉진 및 정보보호 등에 관한 법률을 준수하며 고객님의 개인정보를 수집하고 소중하게 다루고 있습니다.<br/>
                                ①개인정보 수집 항목: 이름, 이메일 주소 ②수집목적: 고객식별, 문의응대, 서비스 품질 향상<br/>
                                ③보유 및 이용기간: 수집 목적이 달성되면 지체없이 모든 개인정보를 파기합니다. 단, 관계법령에서 일정 기간 정보의 보관을 규정한 경우에 한해 분리 보관 후 파기합니다.
                            </FormText>
                        </Col>
                    </Row>
                    {renderError(error)}
                    <hr/>
                    <Row>
                        <Col className="text-center" md="12">
                            <button type="button" className="btn btn-lg btn-outline-default" onClick={()=>props.history.goBack()}>
                                이전
                            </button>
                            <button type="submit" className="btn btn-lg btn-primary" disabled={submitting}>
                                {submitting === true && (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />)
                                }
                                제출
                            </button>
                        </Col>
                    </Row>
                    <br/>
                </form>
            </Container>
        </div>
    )
}


function mapStateToProps(state) {
    // return {
    //     user: state.auth.user,
    //     initialValues:{
    //         user: state.auth.user
    //     }
    // }
}

export default connect(mapStateToProps, {getUserProfile})(reduxForm({
    form: "requests",
    onSubmit: updateQna,
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
})(RequestsView));
