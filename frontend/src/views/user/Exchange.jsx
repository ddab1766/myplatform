import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Card, CardBody, Col, Container, Form, FormGroup, FormText, Label, Row, Spinner} from "reactstrap";
import {Field, reduxForm} from "redux-form";
import {renderField, renderSelectField} from "../../utils/renderUtils";
import {getUserProfile} from "../../actions/authActions";

const ExchangeView = ( props ) => {
    const {handleSubmit, submitting} = props;
    const user = props.user;
    console.log('user', user)
    //IE
    useEffect(()=>{
        if(user) return;
        props.getUserProfile();
    },[user]);

    return (
        <div className="content">
            <div className="section text-center"
                 style={{
                     color: '#FFFFFF',
                     backgroundImage: "url(" + require("../../assets/img/ilya-yakover.jpg") + ")"
                 }}
            >
                <h3> 보상금 인출<br/></h3>
                <h5> <br/></h5>
            </div>
            <Container>
                <div className="title">
                    <h5>인출 신청<br/>
                        <small>얼마 이상부터 인출 가능합니다.</small>
                    </h5>
                </div>
                <form className="mx-3" onSubmit={handleSubmit}>
                    <Card className=''>
                        {/*<CardHeader>
                            <CardTitle tag="h4">환전신청</CardTitle>
                        </CardHeader>*/}
                        <CardBody>
                            <Form action="/" className="form-horizontal" method="get">
                                <Row>
                                    <Label sm="2">인출 가능금액</Label>
                                    <Col sm="10">
                                        <FormGroup>
                                            <p className="form-control-static">
                                                {/*{user && user.balance.toLocaleString(navigator.language, {minimumFractionDigits:0})} 원*/}
                                                1,500,000 원
                                            </p>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Label sm="2">인출 신청금액</Label>
                                    <Col sm="4">
                                        <FormGroup>
                                            <Field name="amt" type="number" component={renderField} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Label sm="2">예금주</Label>
                                    <Col sm="4">
                                        <FormGroup>
                                            <Field name="bankName" type="text" component={renderField}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Label sm="2">계좌번호</Label>
                                    <Col sm="10">
                                        <Row>
                                            <Col sm="2">
                                                <FormGroup>
                                                    <Field name="bank" type="text"
                                                           disableOption='은행'
                                                           options={[{'value': 'AA0100000', 'label': '우리은행'}]}
                                                           component={renderSelectField}/>
                                                </FormGroup>
                                            </Col>
                                            <Col sm="6">
                                                <FormGroup>
                                                    <Field type="text" component={renderField}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Label sm="2">주민번호</Label>
                                    <Col sm="10">
                                        <Row>
                                            <Col md="2">
                                                <FormGroup>
                                                    <Field name="jumin1" type="text" placeholder={'앞 6자리'} component={renderField}/>
                                                </FormGroup>
                                            </Col>
                                            <Col md="2">
                                                <FormGroup>
                                                    <Field name="jumin2" type="text" placeholder={'뒤 7자리'} component={renderField}/>
                                                </FormGroup>
                                            </Col>

                                        </Row>
                                        <FormText color="default" tag="span">
                                            ※ 세금 신고를 위해 개인정보를 입력받고 있습니다.
                                        </FormText>
                                        {/*<FormGroup>
                                            <Input type="text" />
                                            <FormText color="default" tag="span">
                                                ※ 세금 신고를 위해 개인정보를 입력받고 있습니다.
                                            </FormText>
                                        </FormGroup>*/}
                                    </Col>
                                </Row>

                            </Form>
                        </CardBody>
                    </Card>
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
                                인출 신청
                            </button>
                        </Col>
                    </Row>
                </form>
            </Container>
        </div>
    )
}


function mapStateToProps(state) {
    return {
        user: state.auth.user,
        initialValues:{
            user: state.auth.user
        }
    }
}

export default connect(mapStateToProps, {getUserProfile})(reduxForm({
    form: "exchange",
    // onSubmit: updateJobAnswer,
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
})(ExchangeView));
