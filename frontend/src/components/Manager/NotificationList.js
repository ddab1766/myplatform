import React from "react";
import {Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
// import Link from "react-router-dom/Link";

const NotificationList = (props) => {
    const {noti} = props;
    return noti && (
        <div>
            <Row>
                <Col md={12}>
                    <Card>
                        <CardContent>
                            {/*<Table hover>*/}
                            <Table className="table-hover">
                                <thead>
                                <tr>
                                    <th>카테고리</th>
                                    <th>알림레벨</th>
                                    <th>이벤트 내용 및 작업 내용</th>
                                    <th>시간</th>
                                </tr>
                                </thead>
                                <tbody>
                                { noti.map( (v, index)=>{
                                    return (
                                        <tr>
                                            <td>{v.noti_category_nm}</td>
                                            <td>{v.noti_level_nm}</td>
                                            <td><Link to={'#'}>{v.noti_event}</Link></td>
                                            <td>{v.created_time}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </CardContent>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default NotificationList;
