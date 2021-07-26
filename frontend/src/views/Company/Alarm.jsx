import React, {useEffect, useState} from "react";
// reactstrap components
import {connect} from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Col, Container, Row} from "reactstrap";
import LoaderSpinner from "../../components/Etc/LoaderSpinner";
import {getAlarm} from "../../actions/alarmActions";
import Alarm from "../../components/Alarm/Alarm";
import {getChat} from "../../actions/ChatActions";
import Nothing from "../../components/Common/Nothing";
import Pagination from "../../components/Common/Pagination";

const AlarmView = (props) => {
    const {alarm} = props;
    const [loading, settLoading] = useState(false);

    useEffect(()=>{
        props.getAlarm()
    },[]);

    return (
        <div className="content">
            <Container>
                <div className="title">
                    <h3>알림{' '}
                        <small>
                            <i className="fa fa-refresh" style={{cursor:"pointer"}}
                               onClick={() => {
                                   props.getAlarm()
                               }}
                            />
                        </small>
                    </h3>
                </div>

                {alarm ? (
                    <>
                        {alarm.length > 0 ? (
                            <Row>
                                <Col md={12}>
                                    <Card>
                                        <CardContent>
                                            <Alarm alarms={alarm}/>

                                            {/*{
                                                alarm.map( (v)=>{
                                                    return (
                                                        <div className="box box-alarm" key={v.id}>
                                                            <a href={v.link_url} target="_blank">
                                                                <b>{v.title}</b><hr/>
                                                                <pre>{v.contents}</pre>
                                                                <pre className="text-right">{v.created_time}</pre>
                                                            </a>
                                                        </div>
                                                    )
                                                })
                                            }*/}
                                        </CardContent>
                                    </Card>
                                </Col>
                            </Row>
                        ):(<Nothing text={'알림'}/>)}
                    </>
                ):( <LoaderSpinner/>)}

                {/*<Pagination />*/}


            </Container>
        </div>
    )
};


function mapStateToProps(state) {
    return {
        alarm: state.alarm.alarm
    }
}

export default connect(mapStateToProps, {getAlarm})(AlarmView);