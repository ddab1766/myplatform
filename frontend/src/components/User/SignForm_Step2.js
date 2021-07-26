import React, {useState} from 'react'
import {Field, reduxForm} from 'redux-form'
import {renderField,} from "utils/renderUtils";
import validate from "./Validate_SignForm";
import {Card, CardBody, CardTitle, Col} from "reactstrap";


const SignFormStep2 = props => {
    const {handleSubmit, previousPage, error} = props;
    const [salaryRange, setSalaryRange] = useState([3000,4000]);

    const handleSalaryChange = (event, newValue) => {
        props.change('salary_start', newValue[0])
        props.change('salary_end', newValue[1])
        setSalaryRange(newValue);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className="card card-plain">
                <CardTitle>Step-2</CardTitle>
                <CardBody>
                    <div>
                        {/*<label>연봉은 어느정도로 책정할까요?(만원)*</label>
                        <div className="input-group">
                            <Row>
                                <Col md="3">
                                    <fieldset className="form-group">
                                        <Field name="salary_start" component={renderField}
                                               type="number" disabled={true}
                                        />
                                    </fieldset>
                                </Col>
                                <Col md="6">
                                    <Slider
                                        value={salaryRange}
                                        max={10000}
                                        min={2000}
                                        step={100}
                                        onChange={handleSalaryChange}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="range-slider"
                                        // getAriaValueText={valuetext}
                                    />
                                </Col>
                                <Col md="3">
                                    <fieldset className="form-group">
                                        <Field name="salary_end" component={renderField}
                                               type="number" disabled={true}
                                        />
                                    </fieldset>
                                </Col>
                            </Row>
                        </div>*/}

                        <fieldset className="form-group">
                            <Field name="hope_salary" label="희망하는 연봉이 얼마이신가요?(만원)" component={renderField}
                                   type="number"
                                // validate={[required({message: "필수 입력사항입니다."})]}
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
    )
}

export default reduxForm({
    form: 'signup_wizard',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
})(SignFormStep2)