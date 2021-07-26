import React, {useCallback, useEffect, useState} from "react";
import {Field, initialize, reduxForm} from "redux-form";
import {connect, useDispatch, useSelector} from 'react-redux'
import {renderError, renderField,} from "../../utils/renderUtils";
import {deleteHrAccountInfo, postHrAccountInfo} from "../../actions/authActions";
import {Card, CardBody, CardFooter, CardTitle, Container, Row, Spinner} from "reactstrap"
import history from "utils/historyUtils";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List";
import Col from "reactstrap/lib/Col";
import {deleteHrSpecial} from "../../actions/userActions";
import Nothing from "../Common/Nothing";

const AccountForm = (props) => {
    const {handleSubmit, error, submitting} = props;

    const {hr} = useSelector(state => ({
            hr: state.auth.hr,
        }),
    );
    const dispatch = useDispatch();
    const onDeleteHrAccountInfo = useCallback(id => dispatch(deleteHrAccountInfo(id)), [dispatch]);

    console.log('hr.hraccountinfo', hr.hraccountinfo);
    return (
        <div className="content">
            <div className="title">
                <h5>세금계산서 담당자<br/>
                    {/*<small>추천인/후보자들에게 좋은 일자리를 제공하기 위해, 다음 정보를 입력하면 매칭 확률이 올라갑니다.</small>*/}
                </h5>
            </div>
            <hr/>
            <Container>
                <Card>
                    <List>
                        {hr.hraccountinfo && hr.hraccountinfo.length === 0 ? (<Nothing text={'담당자'}/>) : (
                            <>
                                {
                                    hr.hraccountinfo.map((item, index) => (
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar/>
                                            </ListItemAvatar>
                                            <ListItemText primary={item.account_name + '(' + item.account_email + ')'} secondary={item.account_phone}/>
                                            <button onClick={()=>onDeleteHrAccountInfo(item.id)}>삭제</button>
                                        </ListItem>))
                                }
                            </>
                        )}

                    </List>
                </Card>
                <form
                    onSubmit={handleSubmit}
                >
                    <Card>
                        <CardBody>
                            <h5>담당자 추가</h5>
                            <hr/>
                            <Row>
                                <Col md={4}>
                                    <fieldset className="form-group">
                                        <Field name="account_name" label="이름" component={renderField}
                                               type="text"
                                               required={true}
                                        />
                                    </fieldset>
                                </Col>
                                <Col md={4}>
                                    <fieldset className="form-group">
                                        <Field name="account_email" label="이메일" component={renderField}
                                               type="text" placeholder={""}
                                               required={true}
                                        />
                                    </fieldset>
                                </Col>
                                <Col md={4}>
                                    <fieldset className="form-group">
                                        <Field name="account_phone" label="연락처" component={renderField}
                                               type="text" placeholder={"(예) 010-0000-0000"}
                                               required={true}
                                        />
                                    </fieldset>
                                </Col>
                            </Row>
                            {renderError(error)}
                        </CardBody>
                        <CardFooter>
                            <div className="centered">
                                {/*<button className="btn btn-lg btn-outline-info "
                                        onClick={()=>history.push(`/Mng/Profile`)}
                                    // variant="outlined"
                                        disabled={submitting}
                                >뒤로가기
                                </button>*/}
                                <button className="btn btn-lg btn-info"
                                        type="submit"
                                    // action="submit"
                                        disabled={submitting}
                                >
                                    {submitting === true && (
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />)
                                    }추가
                                </button>
                            </div>
                        </CardFooter>
                    </Card>

                </form>
            </Container>
        </div>
    )
}

const validate = values => {
    const errors = {};
    if (!values.nickname) {
        errors.nickname = '필수입력 항목입니다.'
    }
    if (!values.phone) {
        errors.phone = '필수입력 항목입니다.'
    }else if(values.phone.length > 13 ){
        errors.phone = '13자리 이하로 입력해주세요.'
    }

    return errors
};

// function mapStateToProps(state, props) {
//     return {
//         initialValues: state.auth.hr.hraccountinfo,
//         hr: state.auth.hr
//     }
// }

export default connect(null, {})(reduxForm({
    form: "post_account_info",
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    // validate,
    onSubmit: postHrAccountInfo,
})(AccountForm));

// export default connect(mapStateToProps)(reduxForm({
//     form: "update_user_profile",
//     enableReinitialize: true,
//     destroyOnUnmount: false,
//     // forceUnregisterOnUnmount: true,
//     validate,
//     onSubmit: updateUserProfile,
//     onSubmitSuccess: (result, dispatch) => {
//         dispatch(initialize('update_user_profile', {}));
//         history.goBack();
//     },
// })(ProfileEdit));
