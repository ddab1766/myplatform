import React, {useEffect, useState} from 'react'
import {Field, formValueSelector, reduxForm} from 'redux-form'
import {renderRadioField} from "utils/renderUtils";
import {renderField, renderSelectField} from "../../../utils/renderUtils";
import {Card, CardBody, Col, Row} from "reactstrap";
import {connect} from "react-redux";
import SugubValidate from "./SugubValidate";


const SugubFormStep2 = props => {
    const {handleSubmit, previousPage} = props;
    const [gigan, setGigan] = useState(false);
    const [type, setType] = useState(false);
    const {comCode} = props;

    useEffect(()=>{
        if(props.chae_cd === 'AC0100000'){ // 파견
            setGigan(true);
            setType(false);
            props.change('hire_type', null)
        }else if(props.chae_cd === 'AC0200000') { // 도급
            setGigan(true);
            setType(false);
            props.change('hire_type', null)
        } else if(props.chae_cd === 'AC0300000') { // 채용대행
            setGigan(false);
            setType(true);
            props.change('chae_gigan', null);
            props.change('chae_gigan_type', null)
        }else if(props.chae_cd === 'AC0400000') { // 헤드헌팅
            setGigan(false);
            setType(true);
            props.change('chae_gigan', null);
            props.change('chae_gigan_type', null)
        }
    }, props.chae_cd);

    return (
        <form onSubmit={handleSubmit}>
            <Card className="card card-sugub">
                <CardBody>
                    <label>채용형태는 무엇인가요?<small style={{color:"red"}}> 필수</small></label>
                    <fieldset className="form-group">
                        <Field name="chae_cd" component={renderRadioField}
                               code_topidx='AC'
                               code_topcd={null}
                               options={comCode}
                               selectValue={props.chae_cd}
                            // label={"원하시는 채용형태는 무엇인가요?"}
                               required={true}
                            // onChange={(e)=>onChangeChae(e.target.value)}
                               type="radio"
                        />
                    </fieldset>
                    {gigan && (
                        <>
                            <label>계약기간 및 계약형태는 어떻게 되나요?(개월)</label>
                            <fieldset className="form-group">
                                <Row>
                                    <Col sm={3} xs={4}>
                                        <Field name="chae_gigan" component={renderField}
                                               type="number"
                                            // placeholder={'예) 12'}
                                               required={true}
                                        />
                                    </Col>
                                    <Col sm={5} xs={8}>
                                        <Field name="chae_gigan_type" component={renderSelectField}
                                               code_topidx='AE'
                                               code_topcd={null}
                                               options={comCode}
                                               disableOption="계약형태를 선택해주세요"
                                               required={true}
                                            // validate={[required({message: "필수 입력사항입니다."})]}
                                        />
                                    </Col>
                                    {/*<Col md={4}>
                                        <Field
                                            name="cont_chg_gb"
                                            component={renderSelectField}
                                            label="전환여부"
                                            code_topidx="AF"
                                            code_topcd={null}
                                            options={comCode}
                                            required={true}
                                        />
                                    </Col>*/}
                                </Row>
                            </fieldset>
                        </>
                    )}
                    {type && (
                        <>
                            <label>고용형태는 무엇인가요?<small style={{color:"red"}}> 필수</small></label>
                            <fieldset className="form-group">
                                <Field name="hire_type" component={renderRadioField}
                                       code_topidx='AD'
                                       code_topcd={null}
                                       selectValue={props.hire_type}
                                       options={comCode}
                                       type="radio"
                                />
                            </fieldset>
                        </>
                    )}
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
}

const selector = formValueSelector('sugub_wizard');


function mapStateToProps(state, props) {
    const chae_cd = selector(state, 'chae_cd');
    const hire_type = selector(state, 'hire_type');
    return {
        chae_cd: chae_cd,
        hire_type: hire_type
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'sugub_wizard',
    // enableReinitialize: true,
    onSubmitSuccess: () => {
        window.scrollTo(0, 0)
    },
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate: SugubValidate
})(SugubFormStep2))
