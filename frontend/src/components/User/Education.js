import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, Card, CardBody, Col, Row, Spinner} from "reactstrap";
import {renderError, renderField, renderMonthPicker, renderTextAreaField} from "../../utils/renderUtils";
import {required} from "redux-form-validators";
import {connect} from "react-redux";
import {getUserProfile} from "../../actions/authActions";
import {updateUserEducation} from "../../actions/userActions";

const Education = (props) => {
    const {handleSubmit, submitting, error} = props;
    // console.log('edu props:', props)
    return (
        <>
            <form
                className="mx-3"
                onSubmit={handleSubmit}
            >
                <Card>
                    <CardBody>
                        <Row>
                            <Col md="2">
                                <fieldset className="form-group">
                                    <Field name="education_start" label="학력기간" component={renderMonthPicker}
                                           type="text"
                                    />
                                </fieldset>
                            </Col>
                            <Col sm="2">
                                <fieldset className="form-group">
                                    <Field name="education_end" label={"　"} component={renderMonthPicker}
                                           type="text"
                                    />
                                </fieldset>
                            </Col>
                            <Col sm="5">
                                <fieldset className="form-group">
                                    <Field name="school_code" label="학교명" component={renderField}
                                           type="text" validate={[required({message: "필수 입력사항입니다."})]}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <Field name="major_detail" label="이수과목 또는 연구내용" component={renderTextAreaField}
                                           type="text"
                                    />
                                </fieldset>
                            </Col>
                            <fieldset className="col-md-2 ml-auto">
                                {renderError(error)}
                                <button type="submit" className="btn btn-primary" disabled={submitting}>
                                        {submitting === true && (
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />)
                                        }
                                        저장
                                    </button>
                                {/*<button action="submit" className="btn btn-primary">저장</button>*/}
                                <Button
                                    className="btn-neutral"
                                    color="default"
                                    data-placement="left"
                                    title="삭제하기"
                                    onClick={ () => props.deleteBtn(props.info, 'education')}
                                    type="button"
                                >
                                    <i className="nc-icon nc-simple-remove"/>
                                </Button>
                            </fieldset>
                            {props.removeAlert}
                        </Row>
                    </CardBody>
                </Card>
            </form>

        </>
    )
}

// export default Education;

function mapStateToProps(state, props) {
    return {
        initialValues: props.info
    }
}

export default connect(mapStateToProps, {getUserProfile})(reduxForm({
    form: "update_user_education",
    onSubmit: updateUserEducation,
})(Education));