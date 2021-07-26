import React from 'react'
import {Field, initialize, reduxForm} from 'redux-form'
import {renderField,} from "utils/renderUtils";
import validateSignForm from "./Validate_SignForm";
import {updateUserProfile} from "../../actions/authActions";
import {Card, CardBody, CardTitle, Col, Spinner} from "reactstrap";
import history from "../../utils/historyUtils";


const SignFormStep6Finish = props => {
    const {handleSubmit, previousPage, error, submitting} = props;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Card className="card card-plain">
                    <CardTitle>Step-6</CardTitle>
                    <CardBody>
                        <div>
                            <fieldset className="form-group">
                                <Field name="username" label="본인의 이름(실명)을 알려주세요" component={renderField}
                                       type="text"
                                />
                            </fieldset>
                        </div>
                    </CardBody>
                </Card>
                <Col className="text-center" md="12">
                    <button type="button" className="btn btn-primary" onClick={previousPage}>
                        <span className="btn-label">
                          <i className="nc-icon nc-minimal-left" />
                        </span>
                        이전
                    </button>
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
                        <span className="btn-label">
                          <i className="nc-icon nc-check-2" />
                        </span>등록
                    </button>
                </Col>
            </form>
        </>
    )
}

const afterSubmit = (result, dispatch) => {
    dispatch(initialize('signup_wizard', {}));
    history.push("/User/profile");
}

export default reduxForm({
    form: 'signup_wizard',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate: validateSignForm,
    onSubmit: updateUserProfile,
    onSubmitSuccess: afterSubmit,
})(SignFormStep6Finish)