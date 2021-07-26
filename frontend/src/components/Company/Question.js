import React, {useEffect, useState} from "react";
import {Field, FieldArray, reduxForm} from "redux-form";
import {Button, Card, CardBody, Container, Spinner} from "reactstrap";
import {renderArrayFields, renderError, renderField, renderSelectField,} from "../../utils/renderUtils";
import {connect} from "react-redux";
import FormHelperText from "@material-ui/core/FormHelperText";
import axios from "axios";
import {apiUrls} from "../../constants/urls";
import {updateJobQuestion} from "../../actions/sugubActions";

function Question(props) {
    const {handleSubmit, submitting, error, jobQuestion} = props;
    const [comcode, setComcode] = useState(null);
    const [selectedAnswerType, setSelectedAnswerType] = useState(
        jobQuestion.jobanswers[0] && jobQuestion.jobanswers[0].job_answer_comment ? 'CE0300000' : null);

    useEffect(()=>{
        axios
            .get(apiUrls.COMMON, {
                params: {
                    code_topidx__in: 'CE'
                }
            })
            .then( ({data}) => {
                // 주관식단답형, 주관식서술형, 단일선택형
                setComcode(data.filter(v => v.code_id == 'CE0100000' || v.code_id == 'CE0200000' || v.code_id == 'CE0300000'))
            })
            .catch(error => {
            })
    },[]);

    return (
        <>
            <Container>
                <form
                    className="mx-3"
                    onSubmit={handleSubmit}
                >
                    <Card>
                        <CardBody>
                            <fieldset className="form-group">
                                <Field name="job_question_comment" label="항목제목" component={renderField}
                                       type="text"
                                />
                                <FormHelperText>예) 사용 가능한 데이터베이스 언어를 알려주세요.</FormHelperText>
                            </fieldset>
                            <fieldset className="form-group">
                                <Field name="job_answer_type" label="답변유형" component={renderSelectField}
                                       type="text"
                                       code_topidx="CE"
                                       code_topcd={null}
                                       options={comcode}
                                       onChange={(e)=>setSelectedAnswerType(e.target.value)}
                                    // disableOption="답변유형"
                                />
                            </fieldset>
                            { selectedAnswerType !== 'CE0300000' ? (
                                <>
                                {/*<fieldset className="form-group">
                                    <Field name="job_answer_comment" label="답변"
                                           component={selectedAnswerType !== 'CE0200000' ? renderField : renderTextAreaField}
                                           type="text" disabled={inputDisabled}
                                    />
                                </fieldset>*/}
                                </>
                            ) : (
                                <fieldset className="form-group">
                                    <FieldArray name={`job_answer_comment`} component={renderArrayFields}/>
                                </fieldset>
                            )}
                            <fieldset className="col-md-3 ml-auto">
                                {renderError(error)}
                                <button type="submit" className="btn" disabled={submitting}>
                                    {submitting === true && (
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />)
                                    }
                                    저장
                                </button>
                                <Button
                                    className="btn"
                                    color="default"
                                    data-placement="left"
                                    //id="tooltip848814788"
                                    title="삭제하기"
                                    type="button"
                                    onClick={ (e) => props.deleteBtn(props.jobQuestion)}
                                >
                                    <i className="nc-icon nc-simple-remove"/>
                                </Button>
                            </fieldset>
                            {props.removeAlert}
                        </CardBody>
                    </Card>
                </form>
            </Container>
        </>
    )
}


function mapStateToProps(state, props) {
    const jobanswers = props.jobQuestion.jobanswers;
    console.log('jobanswer:', jobanswers)
    if(jobanswers.length > 0) {
        // let jobanswer_comments
        // if(typeof jobanswers[0].job_answer_comment == 'string'){
        //     jobanswer_comments = jobanswers[0].job_answer_comment
        // }
        return {
            initialValues: {
                ...props.jobQuestion,
                job_answer_type: jobanswers[0].job_answer_type,
                job_answer_comment: jobanswers[0].job_answer_comment
            }
        }
    }else{
        return {
            initialValues: {
                ...props.jobQuestion,
                job_answer_type: 'CE0100000',
                job_answer_comment: null
            }
        }
    }
}
const validate = values => {
    const errors = {};
    if (!values.job_question_comment) {
        errors.job_question_comment = '필수입력 항목입니다.'
    }

    return errors
};

export default connect(mapStateToProps)(reduxForm({
    form: "jobQuestion",
    onSubmit: updateJobQuestion,
    validate
})(Question));