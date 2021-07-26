import React, {useEffect, useState} from 'react'
import {Field, formValueSelector, getFormMeta, reduxForm} from 'redux-form'
import {renderField,} from "utils/renderUtils";
import {Card, CardBody, Col, FormText, Row} from "reactstrap";
import {renderCheckboxField, renderNumberField, renderRadioField} from "../../../utils/renderUtils";
import Slider from "@material-ui/core/Slider";
import {connect} from "react-redux";
import SugubValidate from "./SugubValidate";

const SugubFormStep5 = props => {
    const {comCode} = props;
    const {handleSubmit, pristine, previousPage, submitting, error, formMeta} = props;
    const {sugub_salary_adjust, salary_gubun} = props
    const [ageRange, setAgeRange] = useState([20,30]);
    const [salaryRange, setSalaryRange] = useState([3000,4000]);
    const [salaryMonth, setSalaryMonth] = useState(false);
    const [salaryYear, setSalaryYear] = useState(false);
    const handleAgeChange = (event, newValue) => {
        props.change('age_start', newValue[0]);
        props.change('age_end', newValue[1]);
        setAgeRange(newValue);
    };
    const handleSalaryChange = (event, newValue) => {
        props.change('salary_start', newValue[0]);
        props.change('salary_end', newValue[1]);
        setSalaryRange(newValue);
    };

    useEffect(()=>{
        if(salary_gubun === 'AI0100000'){ // 연봉
            setSalaryMonth(false);
            setSalaryYear(true);
        } else if(salary_gubun === 'AI0200000') { // 월급
            setSalaryMonth(true);
            setSalaryYear(false);
        }
    },[salary_gubun]);

    return (
        <form onSubmit={handleSubmit}>
            <Card className="card card-sugub">
                <CardBody>
                    <label>원하시는 연령구간을 선택해주세요<small style={{color:"red"}}> 필수</small></label>
                    <div className="input-group centered">
                        <Row>
                            <Col md="3" xs={4}>
                                <fieldset className="form-group">
                                    <Field name="age_start" component={renderField}
                                           type="number"
                                           required={true}
                                           value={ageRange[0]}
                                           onChange={(e)=>{
                                               setAgeRange([e.target.value, ageRange[1] ])
                                           }}
                                        // disabled={false}
                                           inputAddon={true}
                                           inputAddonText={'세'}
                                    />
                                </fieldset>
                            </Col>
                            <Col md="6" xs={4}>
                                <Slider
                                    value={ageRange}
                                    max={60}
                                    min={20}
                                    onChange={handleAgeChange}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                />
                            </Col>
                            {/*{error && <strong>{error}</strong>}*/}
                            <Col md="3" xs={4}>
                                <fieldset className="form-group">
                                    <Field name="age_end" component={renderField}
                                           type="number"
                                           value={ageRange[1]}
                                           onChange={(e)=>{
                                               setAgeRange([ageRange[0], e.target.value])
                                           }}
                                           required={true}
                                           inputAddon={true}
                                           inputAddonText={'세'}

                                    />
                                </fieldset>
                            </Col>
                        </Row>
                    </div>
                    <label>급여 형태는 무엇인가요?<small style={{color:"red"}}> 필수</small></label>
                    <fieldset className="form-group">
                        <Row>
                            <Col md={12}>
                                <Field name="salary_gubun" component={renderRadioField}
                                       type="radio"
                                       code_topidx='AI'
                                       code_topcd={null}
                                       options={comCode}
                                       selectValue={props.salary_gubun}
                                       onChange={(e)=>{
                                           props.change('salary_start', 0);
                                           props.change('salary_end', 0);
                                       }}
                                    // placeholder={'예) 12'}
                                    // validate={[required({message: "필수 입력사항입니다."})]}
                                />
                            </Col>
                        </Row>
                    </fieldset>
                    {salaryYear && (
                        <>
                            <br/>
                            <label>연봉은 어느정도로 책정할까요?<small style={{color:"red"}}> 필수</small></label>
                            <FormText>최저시급 8,720원, 주 40시간 기준 최저연봉 약 21,869,760원</FormText>
                            <br/>
                            <div className="input-group">
                                <Col md="3">
                                    <fieldset className="form-group">
                                        <Field name="salary_start" component={renderNumberField}
                                               type="number"
                                               value={salaryRange[0]}
                                               onChange={(e)=>{
                                                   let newValue = e.target.value;
                                                   if(typeof e.target.value === 'string') newValue = Number(e.target.value.replace(/,/gi, ''));
                                                   if(typeof salaryRange[1] === 'string')
                                                       setSalaryRange([newValue, Number(salaryRange[1].replace(/,/gi, '')) ]);
                                                   else{
                                                       setSalaryRange([newValue, salaryRange[1]])
                                                   }
                                               }}
                                               required={true}
                                               inputAddonText={'만원'}
                                        />
                                    </fieldset>
                                </Col>
                                <Col md="6">
                                    <Slider
                                        value={salaryRange}
                                        max={7000}
                                        min={2000}
                                        step={100}
                                        onChange={handleSalaryChange}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="range-slider"
                                    />
                                </Col>
                                <Col md="3">
                                    <fieldset className="form-group">
                                        <Field name="salary_end" component={renderNumberField}
                                               onChange={(e)=>{
                                                   let newValue = e.target.value;
                                                   if(typeof e.target.value === 'string') newValue = Number(e.target.value.replace(/,/gi, ''));
                                                   if(typeof salaryRange[0] === 'string')
                                                       setSalaryRange([Number(salaryRange[0].replace(/,/gi, '')), newValue]);
                                                   else{
                                                       setSalaryRange([salaryRange[0], newValue ])
                                                   }

                                               }}
                                               type="text"
                                               inputAddonText={'만원'}
                                        />
                                    </fieldset>
                                </Col>
                            </div>
                            <Field name="sugub_salary_adjust" component={renderCheckboxField}
                                   type="checkbox" label='급여 협의 가능'
                            />
                        </>
                    )}
                    {salaryMonth && (
                        <>
                            <label>월급은 어느정도로 책정할까요?<small style={{color:"red"}}> 필수</small></label>
                            <FormText>주 40시간 기준 최저월급 약 1,822,480원입니다.</FormText>
                            <br/>

                            <div className="input-group">
                                <Col md="4">
                                    <fieldset className="form-group">
                                        <Field name="salary_start" component={renderNumberField}
                                               type="text"
                                               value={salaryRange[0]}
                                               onChange={(e)=>{
                                                   let newValue = e.target.value;
                                                   if(typeof e.target.value === 'string') newValue = Number(e.target.value.replace(/,/gi, ''));
                                                   if(typeof salaryRange[1] === 'string')
                                                       setSalaryRange([newValue, Number(salaryRange[1].replace(/,/gi, '')) ]);
                                                   else{
                                                       setSalaryRange([newValue, salaryRange[1]])
                                                   }
                                               }}
                                               inputAddonText={'원'}
                                        />
                                    </fieldset>

                                </Col>
                                {/*{sugub_salary_adjust && (*/}
                                <>
                                    <Col md="4" >
                                        <Slider
                                            value={salaryRange}
                                            max={8000000}
                                            min={1000000}
                                            step={100000}
                                            onChange={handleSalaryChange}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="range-slider"
                                        />
                                    </Col>
                                    <Col md="4" >
                                        <fieldset className="form-group">
                                            <Field name="salary_end" component={renderNumberField}
                                                   value={salaryRange[1]}
                                                   onChange={(e)=>{
                                                       let newValue = e.target.value;
                                                       if(typeof e.target.value === 'string') newValue = Number(e.target.value.replace(/,/gi, ''));
                                                       if(typeof salaryRange[0] === 'string')
                                                           setSalaryRange([Number(salaryRange[0].replace(/,/gi, '')), newValue]);
                                                       else{
                                                           setSalaryRange([salaryRange[0], newValue ])
                                                       }

                                                   }}
                                                   type="text"
                                                   inputAddonText={'원'}
                                            />
                                        </fieldset>
                                    </Col>
                                </>
                                {/*)}*/}

                            </div>
                            <Field name="sugub_salary_adjust" component={renderCheckboxField}
                                   type="checkbox" label='급여 협의 가능'
                            />
                        </>
                    )}

                </CardBody>
            </Card>

            <div className="ml-auto text-center">
                <button type="button" className="btn btn-lg btn-outline-info" onClick={previousPage}>
                    <span className="btn-label">
                      {/*<i className="nc-icon nc-minimal-left" />*/}
                    </span>
                    이전
                </button>
                <button type="submit" className="btn btn-info btn-lg">
                    다음
                    <span className="btn-label">
                      {/*<i className="nc-icon nc-minimal-right" />*/}
                    </span>
                </button>
            </div>
        </form>
    )
}


function mapStateToProps(state) {
    const selector = formValueSelector('sugub_wizard');
    const metaSelector = getFormMeta('sugub_wizard');
    const salary_gubun = selector(state, 'salary_gubun');
    const sugub_salary_adjust = selector(state, 'sugub_salary_adjust');
    return {
        formMeta: metaSelector(state),
        salary_gubun: salary_gubun,
        sugub_salary_adjust: sugub_salary_adjust
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'sugub_wizard',
    // enableReinitialize: true,
    onSubmitSuccess: () => {
        window.scrollTo(0, 0)
    },
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    //enableReinitialize: true,
    // validate: validateSugubForm
    validate: SugubValidate
})(SugubFormStep5))

