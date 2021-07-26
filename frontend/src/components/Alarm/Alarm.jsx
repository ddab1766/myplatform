import React from "react";
// reactstrap components
import {connect} from "react-redux";
import {Col, Row} from "reactstrap";
import {readAlarm} from "../../actions/alarmActions";

const Alarm = (props) => {
    const {alarms} = props;
    return (
        <>
            {alarms.length > 0 ? (
                <Row>
                    <Col md={12}>
                        {/*<Card>*/}
                        {/*    <CardContent>*/}
                                {
                                    alarms.map( (v)=>{
                                        return (
                                            <div className="box box-alarm" key={v.id} >
                                                <a href={v.link_url} target="_blank" onClick={e => !v.is_read && props.readAlarm(v.id)}>
                                                    {!v.is_read && (
                                                        <span className="badge-danger"
                                                           style={{"vertical-align": "top", display: "inline-block", width: "6px", height: "6px", "border-radius": "50%"}}/>)}
                                                   <b>{v.title}</b>
                                                    <hr/>
                                                    <pre>{v.contents}</pre>
                                                    <pre className="text-right">{v.created_time}</pre>
                                                </a>
                                            </div>
                                        )
                                    })
                                }
                            {/*</CardContent>*/}
                        {/*</Card>*/}
                    </Col>
                </Row>
            ):(<>알림이 없습니다.</>)}
        </>
    )
};

export default connect(null, {readAlarm})(Alarm);