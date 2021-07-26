import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, Card, CardBody, Col, Row, Spinner} from "reactstrap";
import {renderError, renderSelectField,} from "../../utils/renderUtils";
import {connect} from "react-redux";
import {getUserProfile} from "../../actions/authActions";
import {updateUserLanguage} from "../../actions/userActions";

const Language = (props) => {
    const {handleSubmit, submitting, error} = props;
    const LANGUAGE = [
        {code_topidx: 'AV', code_id: 'AV0100000', code_name: '영어'},
        {code_topidx: 'AV', code_id: 'AV0200000', code_name: '일본어'},
        {code_topidx: 'AV', code_id: 'AV0300000', code_name: '중국어'},
        {code_topidx: 'AV', code_id: 'AV0400000', code_name: '독일어'},
        {code_topidx: 'AV', code_id: 'AV0500000', code_name: '불어'},
        {code_topidx: 'AV', code_id: 'AV0600000', code_name: '스페인어'},
        {code_topidx: 'AV', code_id: 'AV0700000', code_name: '러시아어'},
    ];
    const LANGUAGE_LEVEL = [
        {label: '유창함', value:'유창함'},
        {label: '비즈니스회화', value:'비즈니스회화'},
        {label: '일상회화', value:'일상회화'},
    ]

    return (
        <>
            <form
                className="mx-3"
                onSubmit={handleSubmit}
            >
                <Card>
                    <CardBody>
                        <Row>
                            <Col sm="5">
                                <fieldset className="form-group">
                                    <Field name="language" label="직군(중분류)" component={renderSelectField}
                                           code_topidx="AV"
                                           code_topcd={props.code_id}
                                           type="text"
                                           options={LANGUAGE}
                                           // onChange={(e)=>onChangeMid(e.target.value)}
                                           // disableOption="중분류"
                                    />
                                </fieldset>
                                {/*<fieldset className="form-group">*/}
                                {/*    <Field name="language" label="외국어" component={renderField}*/}
                                {/*           type="text" validate={[required({message: "This field is required."})]}*/}
                                {/*    />*/}
                                {/*</fieldset>*/}
                                <fieldset className="form-group">
                                    <Field name="language_level" label="수준" component={renderSelectField}
                                           type="text"
                                           options={LANGUAGE_LEVEL}
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
                                    onClick={ () => props.deleteBtn(props.info, 'language')}
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
    form: "update_user_language",
    onSubmit: updateUserLanguage,
})(Language));