import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, Card, CardBody, Col, Row, Spinner} from "reactstrap";
import {renderError, renderField, renderMonthPicker, renderTextAreaField} from "../../utils/renderUtils";
import {connect} from "react-redux";
import {updateUserCareer} from "../../actions/userActions";

function Career(props) {
    const {handleSubmit, submitting, error} = props;

    // console.log('career props:', props);
    return (
        <>
            <form
                className="mx-3"
                onSubmit={handleSubmit}
                // newId={id}
            >
                <Card>
                    <CardBody>
                        <Row className="">
                            <Col md="2">
                                <fieldset className="form-group">
                                    <Field name="career_start" label="재직기간" component={renderMonthPicker}
                                           type="text"
                                    />
                                </fieldset>
                            </Col>
                            <Col sm="2">
                                <fieldset className="form-group">
                                    <Field name="career_end" label={"　"} component={renderMonthPicker}
                                           type="text"
                                    />
                                </fieldset>
                            </Col>
                            <Col sm="6">
                                <fieldset className="form-group">
                                    <Field name="career_company" label="회사명" component={renderField}
                                           type="text" //validate={[required({message: "필수 입력사항입니다."})]}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <Field name="career_dpt_name" label="근무부서" component={renderField}
                                           type="text" //validate={[required({message: "필수 입력사항입니다."})]}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <Field name="career_work_role" label="담당업무" component={renderTextAreaField}
                                           type="text" //validate={[required({message: "필수 입력사항입니다."})]}
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
                                <Button
                                    className="btn-neutral"
                                    color="default"
                                    data-placement="left"
                                    //id="tooltip848814788"
                                    title="삭제하기"
                                    type="button"
                                    onClick={ () => props.deleteBtn(props.info, 'career')}
                                >
                                    <i className="nc-icon nc-simple-remove"/>
                                </Button>
                            </fieldset>
                            {props.removeAlert}
                            {/*<UncontrolledTooltip
                                delay={1}
                                placement="left"
                                target="tooltip848814788"
                            >
                                삭제하기
                            </UncontrolledTooltip>*/}
                        </Row>
                    </CardBody>
                </Card>
            </form>
        </>
    )
}

// export default Career;

function mapStateToProps(state, props) {
    return {
        initialValues: props.info
        // user: state.auth.user
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: "update_user_career",
    onSubmit: updateUserCareer,
})(Career));