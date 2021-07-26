import React, {useEffect, useState} from 'react'
import {Field, formValueSelector, getFormMeta, reduxForm} from 'redux-form'
import {renderField,} from "utils/renderUtils";
import {Card, CardBody, Col, Row} from "reactstrap";
import Slider from "@material-ui/core/Slider";
import {renderSelectField} from "../../../utils/renderUtils";
import {connect} from "react-redux";
import SugubValidate from "./SugubValidate";


const SugubFormStep4 = props => {
    const {handleSubmit, pristine, previousPage, formMeta, submitting, error} = props;

    const {comCode} = props;
    // const [comCode, setComCode] = useState([]);
    const [careerRange, setCareerRange] = React.useState([2, 5]);
    const [renderCareerInput, setRenderCareerInput] = useState(formMeta.sugub_career_gb && formMeta.sugub_career_gb.visited ? true : false);

    console.log('getFormMeta', props.formMeta)

    const handleChange = (event, newValue) => {
        setCareerRange(newValue);
        props.change('career_start', newValue[0]);
        props.change('career_end', newValue[1]);
    };
    const onChangeCareer = (e, newValue) => {
        if(newValue === 'AB0200000'){
            setRenderCareerInput(true);
        }
       else{
            setRenderCareerInput(false)
            props.change('career_start', null);
            props.change('career_end', null);
        }
    };

    useEffect(()=>{
        if( props.sugub_career_gb === 'AB0200000'){
            setRenderCareerInput(true);
        }else{
            setRenderCareerInput(false);
        }
    }, [props.sugub_career_gb]);



    return (
        <form onSubmit={handleSubmit}>
            <Card className="card card-sugub">
                <CardBody>
                    <fieldset className="form-group">
                        <Field name="sugub_career_gb" label="원하시는 경력이 있으신가요?" component={renderSelectField}
                               code_topidx="AB"
                               code_topcd={null}
                               type="text"
                               options={comCode}
                               disableOption={'선택해주세요'}
                               required={true}
                               onChange={(e)=>onChangeCareer(e, e.target.value)}
                        />
                    </fieldset>
                    {renderCareerInput && (
                        <><label>경력구간을 선택해주세요.(슬라이더를 조정해주세요)</label>
                            <div className="input-group">
                                <Row>
                                    <Col md="3" xs={4}>
                                        <fieldset className="form-group">
                                            <Field name="career_start" component={renderField}
                                                   type="number"
                                                   value={careerRange[0]}
                                                   onChange={(e)=>{
                                                       setCareerRange([e.target.value, careerRange[1] ])
                                                   }}
                                                   required={true}
                                                // disabled={true}
                                                   inputAddon={true}
                                                   inputAddonText={'년'}
                                            />
                                        </fieldset>
                                    </Col>
                                    <Col md="6" xs={4}>
                                        <Slider
                                            value={careerRange}
                                            max={15}
                                            min={0}
                                            onChange={handleChange}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="range-slider"
                                            // getAriaValueText={valuetext}
                                        />
                                    </Col>
                                    <Col md="3" xs={4}>
                                        <fieldset className="form-group">
                                            <Field name="career_end" component={renderField}
                                                   type="number"
                                                   onChange={(e)=>{
                                                       setCareerRange([careerRange[0], e.target.value])
                                                   }}
                                                   value={careerRange[1]}
                                                   required={true}
                                                // disabled={true}
                                                   inputAddon={true}
                                                   inputAddonText={'년'}
                                            />
                                        </fieldset>
                                    </Col>
                                </Row>
                            </div>
                        </>
                    )}
                    <fieldset className="form-group">
                        <Field name="education_cd" label="원하시는 학력이 있으신가요?" component={renderSelectField}
                               code_topidx="AO"
                               code_topcd={null}
                               type="text"
                               options={comCode}
                               required={true}
                               disableOption={'선택해주세요'}
                        />
                    </fieldset>
                    <fieldset className="form-group">
                        <Field name="hire_count" label="채용인원은 몇명인가요?" component={renderField}
                               // code_topidx="AO"
                               // code_topcd={null}
                               type="number"
                               // options={comCode}
                               required={true}
                               // disableOption={'선택해주세요'}
                        />
                    </fieldset>
                </CardBody>
            </Card>
            <hr/>
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
};

const mapStateToProps = (state, ownProps) => {
    const metaSelector = getFormMeta('sugub_wizard');
    const selector = formValueSelector('sugub_wizard');
    const sugub_career_gb = selector(state, 'sugub_career_gb')
    return {
        formMeta: metaSelector(state),
        sugub_career_gb: sugub_career_gb
    };
};

export default connect(mapStateToProps)(reduxForm({
    form: 'sugub_wizard',
    // enableReinitialize: true,
    onSubmitSuccess: () => {
        window.scrollTo(0, 0)
    },
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    // validate: validateSugubForm
    validate: SugubValidate
})(SugubFormStep4))

