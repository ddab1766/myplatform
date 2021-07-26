import React, {useEffect, useState} from "react";
import {reduxForm} from "redux-form";
import {Container} from "reactstrap";
import {connect} from "react-redux";
import axios from "axios";
import {AuthUrls} from "../../constants/urls";
import {getUserToken} from "../../utils/authUtils";
import store from "../../store";
import Question from "./Question";
import {Link} from "react-router-dom";

function JobQuestion(props) {
    const {handleSubmit, submitting, error} = props;
    const [comcode, setComcode] = useState(null);
    const [jobQuestions, setJobQuestions] = useState([]);
    const token = getUserToken(store.getState());


    console.log('props', props)

    useEffect(() => {
        axios
            .get(AuthUrls.JOB_QUESTION, {
                params: {
                    jobadvertise: props.match.params.jobid
                }
            })
            .then( ({data})=>{
                setJobQuestions(data)
            })
    }, []);

    function onAddQuestion(e) {
        e.preventDefault()
        let formValues = new FormData()
        formValues.append('jobadvertise', props.match.params.jobid);
        axios
            .post(AuthUrls.JOB_QUESTION, formValues, {
                headers: {
                    authorization: 'Token ' + token
                }
            })
            .then( ({data}) => {
                console.log('onAddQuestion data', data)
                setJobQuestions(jobQuestions.concat(data))
            })
    }
    const onDelete = (list) => {
        console.log('onDelete:', list)
        axios
            .delete(AuthUrls.JOB_QUESTION + list.id + '/')
            .then((res) => {
                setJobQuestions(jobQuestions.filter(value => {
                    return value !== list
                }))
            })
    };

    return (
        <>
            <Container>
                <div className="content">
                    <h3 className="title">추가 질문사항이 있으신가요?<br/>
                        <small>
                            해당 질문사항은 구직자가 지원 시 답하게 됩니다. 질문 생성 후 저장을 해주세요.
                        </small>
                    </h3>
                    <button
                        className="btn btn-outline-default"
                        onClick={onAddQuestion}>질문추가
                        <span className="btn-label">
                            <i className="nc-icon nc-simple-add" />
                        </span>
                    </button>

                    <hr/>

                    {jobQuestions.map((jobQuestion, index) => (
                        (
                            <>
                                <Question key={index} form={`AddQuestionForm_${index}`} jobQuestion={jobQuestion}
                                          deleteBtn={onDelete}
                                />
                            </>
                        )
                    ))}

                    <hr/>

                    <Link
                        to={'/Company/Sugub/CC0100000'}
                    >
                        <button className="btn btn-lg btn-primary">
                            의뢰내역페이지로 이동
                            <span className="btn-label">
                                <i className="nc-icon nc-minimal-right" />
                            </span>
                        </button>
                    </Link>
                </div>
            </Container>
        </>
    )
}

function mapStateToProps(state, props) {
    return {
        // initialValues: props.jobQuestion
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: "jobQuestion",
    // onSubmit: updateUserCareer,
})(JobQuestion));