import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {renderSelectField} from "utils/renderUtils";
import validate from "./Validate_SignForm";
import {Card, CardBody, CardTitle, Col} from "reactstrap";


const SignFormStep3 = props => {
    const {handleSubmit, previousPage, error} = props;
    const {comCode} = props;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Card className="card card-plain">
                    <CardTitle>Step-3</CardTitle>
                    <CardBody>
                        <div>
                            <fieldset className="form-group">
                                <Field name="address" label="현재 거주하고 계신 지역이 어디신가요?(채용 매칭에 활용됩니다.)" component={renderSelectField}
                                       type="text"
                                       code_topidx="BE"
                                       code_topcd={null}
                                       options={comCode}
                                       disableOption="거주지역을 선택해주세요."
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <Field name="education_level" label="최종 학력이 어떻게 되시나요?" component={renderSelectField}
                                       type="text"
                                       code_topidx="BX"
                                       code_topcd={null}
                                       options={comCode}
                                       disableOption="학력을 선택해주세요."
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
})(SignFormStep3)