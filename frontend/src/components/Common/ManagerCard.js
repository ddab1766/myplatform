import {Col, Row} from "reactstrap";
import Avatar from "@material-ui/core/Avatar";
import React from "react";

const ManagerCard = ({manager}) => {
    return (
        <>
            <ul className="list-unstyled team-members">
                <Col md={4}>
                    <li>
                        <Row>
                            <Col md="2" xs="2">
                                <Avatar alt="..."
                                        src={manager.profile_image}
                                        style={{"width": "30px", "height": "30px"}}
                                />
                            </Col>
                            <Col md="7" xs="7">
                                {manager.nickname} <br />
                                <span className="text-muted">
                                <i className="fa fa-phone" />{' '}{manager.phone}<br/>
                                <i className="fa fa-envelope" />{' '}{manager.email}
                            </span>
                            </Col>

                        </Row>
                    </li>
                </Col>
            </ul>
        </>
    )
}

export default ManagerCard;