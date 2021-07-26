import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {renderField,} from "utils/renderUtils";
import validate from "./Validate_SignForm";
import {Card, CardBody, CardTitle, Col} from "reactstrap";


const SignFormStep6 = props => {
    const {handleSubmit, previousPage, error} = props;

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
                    <button type="submit" className="btn btn-primary">
                        다음
                        <span className="btn-label">
                          <i className="nc-icon nc-minimal-right" />
                        </span>
                    </button>
                </Col>
            </form>
        </>
    )
}

export default reduxForm({
    form: 'signup_wizard',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
})(SignFormStep6)