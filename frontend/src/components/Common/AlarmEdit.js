import React, {useCallback, useEffect, useState} from "react";
import {Field, initialize, reduxForm} from "redux-form";
import {connect, useDispatch, useSelector} from 'react-redux'
import {renderError, renderField,} from "../../utils/renderUtils";
import {getUserProfile, updateAlarmSetting, updateUserProfile} from "../../actions/authActions";
import {Card, CardBody, CardFooter, Col, Container, Row, Spinner} from "reactstrap"
import ImageUpload from "../CustomUpload/ImageUpload";
import history from "utils/historyUtils";
import axios from "axios";
import {AuthUrls} from "../../constants/urls";
import {getUserToken} from "../../utils/authUtils";
import store from "../../store";
import Switch from "react-bootstrap-switch";
import {Toggle} from "rsuite";
import CardContent from "@material-ui/core/CardContent";
import {AuthTypes} from "../../constants/actionTypes";
import {getCoworker} from "../../actions/coworkerActions";

const AlarmEdit = (props) => {
    const {handleSubmit, error, submitting} = props;
    const {comcode, user} = useSelector(state => ({
        comcode: state.comcode.comcode,
        user: state.auth.user
    }));
    const dispatch = useDispatch();
    const onUpdateAlarmSetting = (id, value, gubun) => dispatch(updateAlarmSetting(id, value, gubun));

    useEffect(()=>{
        store.dispatch(getUserProfile())
    },[]);

    const renderComponent = (settings) => {
        // let temp = comcode.filter( v => v.code_topidx === 'ZH')
        return settings.map( (item, index) => {
            return (
                <div key={index}>
                    <br/><br/>
                    <h5>
                        {item.alarm_code.code_name}<br/>
                        {item.alarm_code.code_id === 'ZH0100000' && ( <small>각종 이벤트 알림메시지를 받아보세요</small>)}
                        {item.alarm_code.code_id === 'ZH0200000' && ( <small>채용진행에 대한 알림메시지를 받아보세요</small>)}
                        {item.alarm_code.code_id === 'ZH0300000' && ( <small>새로운 채팅에 대한 알림메시지를 받아보세요</small>)}
                    </h5>
                    <hr/>
                    <Row>
                        <Col md={6}>
                            <>SMS</>
                        </Col>
                        <Col md={6} className="text-right">
                            <Toggle checked={item.allow_sms}
                                        size="lg"
                                        onChange={(value)=> onUpdateAlarmSetting(item.id, value, 'SMS')}
                                />

                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <>앱 푸시</>
                        </Col>
                        <Col md={6} className="text-right">
                            <Toggle size="lg" disabled
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <>이메일</>
                        </Col>
                        <Col md={6} className="text-right">
                            <Toggle size="lg" disabled/>
                        </Col>
                    </Row>
                </div>
            )
        })
    }

    return (
        <div className="content">
            <Container>
                <div className="title">
                    <h3>알람 설정<br/>
                    </h3>
                </div>
                <Card>
                    <CardContent>
                        <form
                            className="col-md-6 ml-auto mr-auto"
                            style={{"max-width": "630px"}}
                            onSubmit={handleSubmit}
                        >

                            <br/>
                            {/*<hr/>*/}
                            {renderComponent(user.alarm_settings)}


                            {renderError(error)}
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}

export default AlarmEdit;

// function mapStateToProps(state) {
//     return {
//         initialValues: state.auth.user,
//     }
// }
//
// export default connect(mapStateToProps)(reduxForm({
//     form: "update_alarm",
//     enableReinitialize: true,
//     destroyOnUnmount: false,
//     forceUnregisterOnUnmount: true,
//     onSubmit: updateUserProfile,
//     onSubmitSuccess: (result, dispatch) => {
//         dispatch(initialize('update_alarm', {}));
//     },
// })(AlarmEdit));
