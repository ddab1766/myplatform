import React from "react";
// reactstrap components
import {connect} from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Col, Row} from "reactstrap";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Icon from "@material-ui/core/Icon";
import {Link} from "react-router-dom";

const Employee = (props) => {
    const {employee} = props;
    return (
        <>
            <Card variant="outlined">
                <CardContent>
                    파견사원
                    {
                        employee.map( (v)=>{
                            if(v.chae_cd.code_id === 'AC0100000') {
                                return (
                                    <Row>
                                        <Col md={3}>
                                            <List dense>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar/>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={v.employee.emp_name} secondary={v.employee.emp_phone}/>
                                                </ListItem>
                                            </List>
                                        </Col>
                                        <Col md={3}>
                                            <dl>
                                                <dt>계약기간</dt>
                                                <dd><strong>{v.contract_from && v.contract_from.concat(' ~ ' + v.contract_to)} </strong></dd>

                                            </dl>
                                            <dl>
                                                <dt>계약개월</dt>
                                                <dd><strong>{v.contract_gigan} </strong></dd>
                                            </dl>
                                            <dl>
                                                <dt>직접비</dt>
                                                <dd><strong>{v.direct_cost} 원</strong></dd>
                                            </dl>
                                        </Col>
                                        <Col md={3}>
                                            <dl>
                                                <dt>파견사업주</dt>
                                                <dd><strong>{v.hrprofile.custname} </strong></dd>
                                                <dd><strong>{v.hrprofile.manager_email} </strong></dd>
                                                <dd><strong>{v.hrprofile.manager_phone} </strong></dd>
                                            </dl>
                                        </Col>
                                        <Col md={3}>
                                            <dl>
                                                <dt>첨부파일</dt>
                                                {v.contract_file && v.contract_file.length > 0 && v.contract_file.map( file => {
                                                    return (
                                                        <dd>
                                                        <Link to={{
                                                            pathname: `/Viewer/${file.contract_file}`,
                                                        }} target="_blank"><Icon className="fa fa-file" /></Link>
                                                        </dd>
                                                    )
                                                })}
                                            </dl>
                                        </Col>
                                    </Row>
                                )
                            }
                        })
                    }
                </CardContent>
            </Card>

            <hr/>

            <Card variant="outlined">
                <CardContent>
                    채용대행
                    {
                        employee.map( (v)=>{
                            if (v.chae_cd.code_id === 'AC0300000'){
                                return (
                                    <Row>
                                        <Col md={3}>
                                            <List>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar/>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={v.employee.emp_name} secondary={v.employee.emp_phone}/>
                                                </ListItem>
                                            </List>
                                        </Col>
                                        <Col md={3}>
                                            <dl>
                                                <dt>연봉</dt>
                                                <dd><strong>{v.direct_cost} 원</strong></dd>
                                            </dl>
                                        </Col>
                                        <Col md={3}>
                                            <dl>
                                                <dt>파견사업주</dt>
                                                <dd><strong>{v.hrprofile.custname} </strong></dd>
                                                <dd><strong>{v.hrprofile.manager_email} </strong></dd>
                                                <dd><strong>{v.hrprofile.manager_phone} </strong></dd>
                                            </dl>
                                        </Col>
                                        <Col md={3}>
                                            <dl>
                                                <dt>첨부파일</dt>
                                                {v.contract_file && v.contract_file.length > 0 && v.contract_file.map( file => {
                                                    return (
                                                        <dd>
                                                        <Link to={{
                                                            pathname: `/Viewer/${file.contract_file}`,
                                                        }} target="_blank"><Icon className="fa fa-file" /></Link>
                                                        </dd>
                                                    )
                                                })}
                                            </dl>
                                        </Col>
                                    </Row>
                                )
                            }
                        })
                    }
                </CardContent>
            </Card>
        </>
    )
};

export default connect(null, {})(Employee);