import React, {useState} from 'react'
import {Field, FieldArray, formValueSelector, reduxForm} from 'redux-form'
import {required, numericality} from "redux-form-validators"
import {renderField} from "utils/renderUtils";
import {Card, CardBody, Col, FormText, Row} from "reactstrap";
import {connect} from "react-redux";
import Slider from "@material-ui/core/Slider";
import {renderAsyncCreatableSelectField, renderError, renderNumberField} from "../../utils/renderUtils";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import HrProfileValidate from "./HrProfileValidate";


const HrProfileFormStep2 = props => {
    const {handleSubmit, previousPage, error} = props;
    const {services} = props;

    const [taxRange, setTaxRange] = React.useState([5, 7]);
    const [taxRange2, setTaxRange2] = React.useState([5, 7]);

    const handleChange = (event, newValue) => {
        setTaxRange(newValue);
        props.change('hrfee_AC0100000[0].fee_start', newValue[0]);
        props.change('hrfee_AC0100000[0].fee_end', newValue[1]);
    };

    const handleChange2 = (event, newValue) => {
        setTaxRange2(newValue);
        props.change('hrfee_AC0200000[0].fee_start', newValue[0]);
        props.change('hrfee_AC0200000[0].fee_end', newValue[1]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className="card card-sugub">
                <CardBody>
                    <fieldset className="form-group">
                        { services && (
                            <>
                                {services.filter(v=>v.code_id ==='AC0100000').length > 0 && (
                                    <>

                                        <div style={{marginBottom: '20px',fontSize: '1.1em'}}>인재파견 서비스의 수수료는 어느정도인가요?</div>
                                        <FieldArray name={`hrfee_AC0100000`} component={renderServices1}
                                                    handleChange={handleChange} taxRange={taxRange} setTaxRange={setTaxRange}/>
                                    </>
                                )}
                                {services.filter(v=>v.code_id ==='AC0200000').length > 0 && (
                                    <>
                                        <div style={{marginBottom: '20px',fontSize: '1.1em'}}>도급 서비스의 수수료는 어느정도인가요?</div>
                                        <FieldArray name="hrfee_AC0200000" component={renderServices1}
                                                    handleChange={handleChange2} taxRange={taxRange2} setTaxRange={setTaxRange2}/>
                                    </>
                                )}
                                {services.filter(v=>v.code_id ==='AC0300000').length > 0 && (
                                    <>
                                        <div style={{marginBottom: '20px',fontSize: '1.1em'}}>채용대행 서비스의 연봉 구간별 수수료는 어느정도인가요?</div>

                                        <FieldArray name="hrfee_AC0300000" component={renderServices} />
                                    </>
                                )}
                                {services.filter(v=>v.code_id ==='AC0400000').length > 0 && (
                                    <>
                                        <div style={{marginBottom: '20px',fontSize: '1.1em'}}>헤드헌팅 서비스의 연봉 구간별 수수료는 어느정도인가요?</div>
                                        <FieldArray name="hrfee_AC0400000" component={renderServices} />
                                    </>
                                )}
                            </>
                        )}
                    </fieldset>
                    { renderError(error) }

                </CardBody>
            </Card>
            <hr/>

            <div className="text-center">
                <button type="button" className="btn btn-lg btn-outline-info" onClick={previousPage}>
                    <span className="btn-label">
                      {/*<i className="nc-icon nc-minimal-left" />*/}
                    </span>
                    이전
                </button>
                <button action="submit" className="btn btn-lg btn-info">
                    다음
                    <span className="btn-label">
                      {/*<i className="nc-icon nc-minimal-right" />*/}
                    </span>
                </button>
            </div>
        </form>
    )
};

// 인재파견
const renderServices1 = ({ fields, taxRange, setTaxRange, handleChange, meta: { error, submitFailed } }) => {
    if(fields.length === 0) fields.push({});
    return (
        <>
            <div>
                {submitFailed && error && <span>{error}</span>}
            </div>
            {fields && fields.map((item, index) => (
                <div className="input-group" key={index}>
                    <Row>
                        <Col md="3" xs={4}>
                            <fieldset className="form-group">
                                <Field name={`${item}.fee_start`} component={renderField}
                                       type="number"
                                       value={taxRange[0]}
                                       onChange={(e)=>{
                                           setTaxRange([e.target.value, taxRange[1]])
                                       }}
                                       validate={[required({message: "필수 입력사항입니다."})]}
                                       inputAddon={true}
                                       inputAddonText={'%'}
                                />
                            </fieldset>
                        </Col>
                        <Col md="6" xs={4}>
                            <Slider
                                value={taxRange}
                                max={20}
                                min={0}
                                step={0.1}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                            />
                        </Col>
                        <Col md="3" xs={4}>
                            <fieldset className="form-group">
                                <Field name={`${item}.fee_end`} component={renderField}
                                       type="number"
                                       value={taxRange[1]}
                                       onChange={(e)=>{
                                           setTaxRange([taxRange[0], e.target.value])
                                       }}
                                       validate={[required({message: "필수 입력사항입니다."})]}
                                       inputAddon={true}
                                       inputAddonText={'%'}
                                />
                            </fieldset>
                        </Col>
                    </Row>
                </div>
            ))}
        </>
    )
}


// 채용대행
const renderServices = ({ fields, meta: { error, submitFailed } }) => {
    if(fields.length === 0) fields.push({});
    return (
        <>
            <div>
                <FormText style={{fontSize: '1.2em'}}>
                    예시) 3,000만원 ~ 4,000만원 : 10%<br/>
                </FormText>
                {submitFailed && error && <span>{error}</span>}
            </div>
            <br/>
            <>
                {fields.map((item, index) => (
                    <div key={index}>

                        {/*<h6>구간 #{index + 1} {item}</h6>*/}
                        <div className="input-group"
                             style={{
                                 border: '1px solid rgba(0, 0, 0, 0.12)',
                                 minHeight: '50px',
                                 marginBottom: '10px',
                                 padding: '20px',
                                 backgroundColor: '#FFFFFF'
                             }}
                        >
                            <Row>
                            <Col md="4">
                                <fieldset className="form-group">
                                    <Field name={`${item}.start`} component={renderNumberField}
                                           required={true}
                                           validate={[
                                               required({message: "필수 입력사항입니다."}),
                                           ]}
                                           inputAddonText={'만원'}
                                    />
                                </fieldset>
                            </Col>

                            <Col md="4" >
                                <fieldset className="form-group">
                                    <Field name={`${item}.end`} component={renderNumberField}
                                           inputAddonText={'만원'}
                                           validate={[required({message: "필수 입력사항입니다."})]}
                                    />
                                </fieldset>
                            </Col>
                            <Col md="3" >
                                <fieldset className="form-group">
                                    <Field name={`${item}.fee_start`} component={renderField}
                                           type={'number'}
                                           inputAddon={true}
                                           inputAddonText={'%'}
                                           validate={[required({message: "필수 입력사항입니다."})]}
                                    />
                                </fieldset>
                            </Col>
                            <Col md={"1"}>
                                {index >= 1 && (
                                    <IconButton aria-label="delete" >
                                        <DeleteIcon fontSize="small" onClick={()=>fields.remove(index)}/>
                                    </IconButton>
                                    /*<button
                                    className="btn"
                                    type="button"
                                    title="Remove"
                                    onClick={() => fields.remove(index)}
                                    >
                                        <i className="fa fa-trash"/>
                                    </button>*/
                                )}
                            </Col>
                            </Row>
                        </div>
                    </div>

                ))}
            </>
            <button type="button" className="btn" onClick={() => fields.push()}>
                <i className="nc-icon nc-simple-add"/>
                구간추가
            </button>
        </>
    )
};



function mapStateToProps(state, props) {
    const selector = formValueSelector('hr_profile_wizard');
    const chae_cd = selector(state, 'chae_cd')
    const services = selector(state, 'services')
    const hrfee_AC0100000 = selector(state, 'hrfee_AC0100000');
    return {
        chae_cd: chae_cd,
        services: services,
        hrfee_AC0100000: hrfee_AC0100000
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'hr_profile_wizard',
    // enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate: HrProfileValidate
})(HrProfileFormStep2))


// export default connect(mapStateToProps, {getUserProfile, getRecUser})(reduxForm({
//     form: "signup",
//     validate: validateForm,
//     onSubmit: signupUser
// })(Signup));