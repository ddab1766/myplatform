import React, {useEffect, useState} from 'react'
import {Field, reduxForm} from 'redux-form'
import validate from "./Validate_SignForm";
import {connect} from "react-redux";
import axios from "axios";
import {AuthUrls as apiUrls} from "../../constants/urls";
import store from "../../store";
import {renderCheckboxField, renderField, renderRadioField, renderSelectField} from "../../utils/renderUtils";
import {Card, CardBody, CardTitle, Col} from "reactstrap";

const SignFormStep5 = props => {
    const {handleSubmit, previousPage, error} = props;
    const [questions, setQuestions] = useState([]);

    // const values = props.values;
    const states = store.getState();
    console.log('state:', states);

    useEffect(() => {
        const jikjong_low = states.form.signup_wizard.values.jikjong_low.map(list => {
            return list['code_id']
        })
        console.log('jikjong_low', jikjong_low)

        axios
            .get(apiUrls.QUESTIONS, {
                params: {
                    jikjong_mid: states.form.signup_wizard.values.jikjong_mid,
                    // jikjong_low__in: states.form.signup_wizard.values.jikjong_low
                    jikjong_low__in: jikjong_low.join(", ")
                }
            })
            .then(({data}) => {
                console.log('res data:', data);
                setQuestions(data.filter(value => value.question_comment !== null));
            })

    }, []);


    let options = [];

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Card className="card card-plain">
                    <CardTitle>Step-5( 직종(중)에 관한 질문 )</CardTitle>
                    <CardBody>
                        <div>
                            {questions.map((q, index) => {
                                return (
                                    <div>
                                        <label>{q.question_comment}</label>
                                        <fieldset className="form-group">
                                            {q.answers.map((a, index) => {
                                                // 주관식단답형
                                                if (a.answer_type_id === 'CE0100000') {
                                                    return (
                                                        <Field name={'Q.' + q.question_comment}
                                                               type={'text'}
                                                               value={a.answer_comment}
                                                               component={renderField}
                                                               placeholder={a.answer_placeholder}
                                                        />
                                                    )
                                                    // 주관식서술형
                                                } else if (a.answer_type_id === 'CE0200000') {
                                                    return (
                                                        <Field name={'Q.' + q.question_comment}
                                                               type={'text'}
                                                               value={a.answer_comment}
                                                               component={renderField}
                                                        />
                                                    )
                                                    // 단일선택형
                                                } else if (a.answer_type_id === 'CE0300000') {
                                                    return (
                                                        <div>
                                                            <Field name={'Q.' + q.question_comment}
                                                                   type={'radio'}
                                                                   label={a.answer_comment}
                                                                   value={a.answer_comment}
                                                                   component={renderRadioField}
                                                            />{' '}
                                                        </div>
                                                    )
                                                    // 단일선택형(텍스트추가)
                                                } else if (a.answer_type_id === 'CE0400000') {
                                                    return (
                                                        <div className="input-group">
                                                            <Field name={'Q.' + q.question_comment}
                                                                   type={'radio'}
                                                                   label={a.answer_comment}
                                                                   value={a.answer_comment}
                                                                   component={renderRadioField}
                                                            />{' '}
                                                            <div className="input-group-append">
                                                                <Field name={'Q.' + q.question_comment + 'add'}
                                                                       type={'text'}
                                                                       value={''}
                                                                       component={renderField}
                                                                       placeholder={a.answer_placeholder}
                                                                />{' '}
                                                            </div>
                                                        </div>
                                                    )
                                                    // 복수선택형
                                                } else if (a.answer_type_id === 'CE0500000') {
                                                    return (
                                                        <div>
                                                            <Field name={'Q.' + index + q.question_comment}
                                                                   type="checkbox"
                                                                // id={a.answer_comment}
                                                                // value={a.answer_comment}
                                                                   format={v => v === a.answer_comment}
                                                                   normalize={v => v ? a.answer_comment : null}
                                                                // component="input"
                                                                   label={a.answer_comment}
                                                                   component={renderCheckboxField}
                                                            />{' '}
                                                        </div>
                                                    )
                                                    // 복수선택형(텍스트추가)
                                                } else if (a.answer_type_id === 'CE0600000') {
                                                    return (
                                                        <div className="input-group">
                                                            <Field name={'Q.' + q.question_comment}
                                                                   type={'checkbox'}
                                                                   format={v => v === a.answer_comment}
                                                                   normalize={v => v ? a.answer_comment : null}
                                                                // component="input"
                                                                   label={a.answer_comment}
                                                                   component={renderCheckboxField}
                                                            />{' '}
                                                            <div className="button-wrapper input-group-append">
                                                                <Field name={'Q.' + q.question_comment + 'add'}
                                                                       type={'text'}
                                                                       value={''}
                                                                       component={renderField}
                                                                       placeholder={a.answer_placeholder}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                    // 목록선택형
                                                } else if (a.answer_type_id === 'CE0700000') {
                                                    options.push({label: a.answer_comment, value: a.answer_comment})
                                                }
                                            })}
                                            {/* 목록선택형 */}
                                            {options.length > 0 && (
                                                <Field name={'Q.' + q.question_comment}
                                                       component={renderSelectField}
                                                       type="text"
                                                       options={options}
                                                    // disableOption="거주지역"
                                                />
                                            )}
                                        </fieldset>
                                    </div>
                                )
                            })}
                            <hr/>
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

function mapStateToProps(state) {
    return {
        // values: state.form.signup_wizard.values
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'signup_wizard',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
    //onSubmit: loginUser
})(SignFormStep5))

