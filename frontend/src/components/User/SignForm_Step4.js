import React, {useState} from 'react'
import {Field, reduxForm} from 'redux-form'
import {renderRadioField,} from "utils/renderUtils";
import validate from "./Validate_SignForm";
import {Card, CardBody, CardTitle, Col} from "reactstrap";


const SignFormStep4 = props => {
    const {handleSubmit, previousPage, error} = props;
    const [comCode, setComcode] = useState([]);


    return (
        <>
            <form onSubmit={handleSubmit}>
                <Card className="card card-plain">
                    <CardTitle>Step-4</CardTitle>
                    <CardBody>
                        <div>
                            <label>성별이 무엇인가요?</label>
                            <fieldset className="form-group">
                                <label>
                                    <Field name="gender" component={renderRadioField}
                                           type="radio" value="M" label={'남자'}
                                    />
                                </label>
                                <label>
                                    <Field name="gender" component={renderRadioField}
                                           type="radio" value="F" label={'여자'}
                                    />
                                </label>
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
})(SignFormStep4)