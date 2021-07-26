import React, {useEffect, useState} from "react";
// reactstrap components
import {Button, Input, Modal, Table} from "reactstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";
import {getUserProfile} from "../../actions/authActions";
import {AuthUrls} from "../../constants/urls";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {
    deleteJobApplicant,
    getJobApplicant,
    getResume,
    updateApplyAdvertise,
    updateJobAnswer,
} from "../../actions/userActions";
import LoaderSpinner from "../Etc/LoaderSpinner";
import FormHelperText from "@material-ui/core/FormHelperText";
import {Field, reduxForm} from "redux-form";
import {renderField, renderRadioField, renderTextAreaField} from "../../utils/renderUtils";
import PropTypes from "prop-types";

// 지원리스트
const ApplyList = (props) => {

    const {type} = props.match.params;
    const {user, applyList} = props;
    const {handleSubmit} = props;
    // state로 변경
    // const [applyList, setApplyList] = useState(null);
    // const [applyList, setApplyList] = useState(props.applied);
    const [alert, setAlert] = useState(null);
    const [submitAlert, setSubmitAlert] = useState(null);
    const [myResumes, setMyResumes] = useState([]);
    const [selectResume, setSelectResume] = useState([]);
    const [jobQuestions, setJobQuestions] = useState(null);
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    // const [state, dispatch] = useReducer(reducer, initialState)

    ApplyList.prototype = {
        user: PropTypes.isRequired
    }

    // 인담자 질문 Modal
    const toggleModal = () => setModal(!modal);
    // 구직자 답변 Modal
    const toggleModal2 = () => setModal2(!modal2);

    useEffect(()=>{
        if(!user) props.getUserProfile();
        // if(!applyList) props.getJobApplicant();
    },[]);

    // 이력서 가져오기
    useEffect(() => {
        if (user) {
            let params = {};
            params.user = user.id;
            // props.getResume(params);
            getResume(params).then((data)=>setMyResumes(data));
        }
    }, [user]);

    // 지원리스트 가져오기
    useEffect(() => {
        if (user) {
            // setApplyList(null);
            let params = {};
            params.user = user.id;
            params.jobadvertise_status = type === 'ing' ? 'CA0300000' : 'CA0400000'; // 공고게시중, 공고마감
            // getJobApplicant(params).then((data)=>setApplyList(data))
            props.getJobApplicant(params)
        }
    }, [type]);

    // 인담자 질문
    useEffect( () => {
        if(applyList && applyList.length > 0 && applyList[0].jobadvertise) {
            axios
                .get(AuthUrls.JOB_QUESTION, {
                    params: {
                        jobadvertise: applyList[0].jobadvertise.id
                    }
                })
                .then(({data}) => {
                    // console.log('res', data)
                    setJobQuestions(data)
                })
        }
    },[applyList]);

    console.log('applyList.', applyList)
    console.log('jobQuestions.', jobQuestions)

    const warningWithConfirmMessage = list => {
        // console.log('warningWithConfirmMessage list', list)
        // 접수대기 or 이력서미등록이 아니면
        if (list.applied_status !== 'BW0100000' && list.applied_status !== 'BW1000000' ) {
            window.alert("진행중인 채용건은 취소가 불가능합니다!");
            return false;
        } else {
            setAlert(
                (
                    <ReactBSAlert
                        warning
                        style={{display: "block", marginTop: "100px"}}
                        title="지원을 취소하시겠습니까?"
                        // onConfirm={() => successDelete(list)}
                        onConfirm={() => deleteJobApplicant(list.id)}
                        onCancel={() => hideAlert()}
                        confirmBtnBsStyle="info"
                        cancelBtnBsStyle="danger"
                        confirmBtnText="예"
                        cancelBtnText="아니오"
                        showCancel
                    >
                        취소시 복구할 수 없습니다.
                    </ReactBSAlert>
                )
            );
        }

    };

    const hideAlert = () => setAlert(null);

    // 이력서 제출
    const onSubmitResume = (applicant, selectResume) => {
        let resume = myResumes.filter(value => value.id === Number(selectResume))[0];
        setSubmitAlert(
            (
                <ReactBSAlert
                    warning
                    style={{display: "block", marginTop: "100px"}}
                    title="최종지원하시겠습니까?"
                    onConfirm={() =>
                        updateApplyAdvertise(applicant, resume).then((res)=>{
                            // setApplyList(null)
                            // let params = {};
                            // params.user = user.id;
                            // params.jobadvertise_status = 'CA0300000';
                            // // getJobApplicant(params).then((data)=>setApplyList(data));
                            // props.getJobApplicant(params);
                            // props.getJobApplicant();
                            setSubmitAlert(null)})}
                    onCancel={() => setSubmitAlert(null)}
                    confirmBtnBsStyle="info"
                    cancelBtnBsStyle="danger"
                    confirmBtnText="예"
                    cancelBtnText="아니오"
                    showCancel
                >
                    최종지원된 이력서는 수정할 수 없습니다.
                </ReactBSAlert>
            )
        );
    };

    return applyList ? (
        <>
            <Table className="table-shopping">
                <thead>
                    <th>마감일</th>
                    <th>지원회사</th>
                    <th>모집요강</th>
                    <th>이력서</th>
                    <th>상태</th>
                    <th>지원취소</th>
                </thead>
                {applyList.length > 0 ? (
                    <tbody>
                    {applyList.map((list) => (
                            <tr>
                                {/* 이력서 존재 */}
                                {list.resume ?
                                    (
                                        <>
                                            <td className="">{list.jobadvertise.jobadvertise_end_dt}</td>
                                            <td>
                                                <div className="img-container">
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/agenda.png")}
                                                    />
                                                </div>
                                            </td>
                                            <td className="td-name">
                                                <Link className="nav-link"
                                                      to={`/User/List/${list.jobadvertise.id}`}>{list.jobadvertise.company_name}</Link>
                                                <>
                                                    {/*{list.jobadvertise.main_work && list.jobadvertise.main_work.split('\n').map(line=>{
                                                    return (<small>{line}<br/></small>)
                                                })}<br/>*/}
                                                    <small>{list.jobadvertise.jobadvertise_title}</small>
                                                </>
                                            </td>
                                            {/* 채공이력서 */}
                                            {list.resume_pdf ? (
                                                <td>
                                                    <a className=""
                                                       href={list.resume_pdf}
                                                       target="_blank"
                                                    >{list.resume_filename}</a>
                                                    {' '}<i className="fa fa-external-link"></i>
                                                </td>
                                                /* 기타이력서 */
                                            ) : (
                                                <td>
                                                    <a className=""
                                                       href={list.resume.resume_file}
                                                       target="_blank"
                                                    >{list.resume.resume_filename}</a>
                                                    {' '}<i className="fa fa-external-link"></i>
                                                </td>
                                            )

                                            }
                                            <td className="">{list.applied_status_nm}<br/>
                                                {/* 추가 질문 사항이 있는 경우 */}
                                                {jobQuestions && jobQuestions.length > 0 ? (
                                                    <>
                                                        { !list.job_answers_json[0] ? (

                                                            <Link to={'#'} onClick={()=>{
                                                                toggleModal();
                                                                props.change('id', list.id)
                                                            }}>
                                                                <FormHelperText>추가 질문사항에 답해주세요!{' '}
                                                                    <i className="fa fa-hand-grab-o" style={{fontSize:20, color: "#00ca6d"}}/>
                                                                </FormHelperText>
                                                            </Link>

                                                        ):(
                                                            <>
                                                                <FormHelperText onClick={toggleModal2}><button className="btn">내 답변보기</button></FormHelperText>
                                                                {/*구직자 답변보기 Modal*/}
                                                                <Modal isOpen={modal2} toggle={toggleModal2}>
                                                                    <div className="modal-header">
                                                                        <button
                                                                            aria-label="Close"
                                                                            className="close"
                                                                            type="button"
                                                                            onClick={()=>toggleModal2}
                                                                        >
                                                                            <span aria-hidden={true} onClick={toggleModal2}>×</span>
                                                                        </button>
                                                                        <h5
                                                                            className="modal-title text-center"
                                                                            id="shareModal"
                                                                        >
                                                                            내 답변내역<br/>
                                                                            <small></small>
                                                                        </h5>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        {list.job_answers_json[0] && (
                                                                            Object.entries(list.job_answers_json[0]).map( ([key, value]) => {
                                                                                    return (
                                                                                        <><li>{key}</li><p>{value}</p></>
                                                                                    )
                                                                                }
                                                                            )
                                                                        )}
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <Button
                                                                            className="btn-link"
                                                                            color="default"
                                                                            type="button"
                                                                            onClick={toggleModal2}
                                                                        >
                                                                            닫기
                                                                        </Button>
                                                                    </div>
                                                                </Modal>
                                                            </>
                                                        )}
                                                    </>
                                                ):(<></>)}
                                            </td>
                                            <td>
                                                {alert}
                                                <Button
                                                    className="btn btn-neutral"
                                                    color="default"
                                                    data-placement="left"
                                                    onClick={() => warningWithConfirmMessage(list)}
                                                    // outline
                                                >
                                                    취소
                                                </Button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="">{list.jobadvertise.jobadvertise_end_dt}</td>
                                            <td>
                                                <div className="img-container">
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/agenda.png")}
                                                    />
                                                </div>
                                            </td>
                                            <td className="td-name">
                                                <Link className="nav-link"
                                                      to={`/User/List/${list.jobadvertise.id}`}>{list.jobadvertise.company_name}</Link>
                                                <>
                                                    <small>{list.jobadvertise.jobadvertise_title}</small>
                                                </>
                                            </td>
                                            <td>
                                                {myResumes.length > 0 ? (
                                                    <Input type="select" name="resume_id"
                                                           value={selectResume}
                                                           onChange={e => {
                                                               onSubmitResume(list, e.currentTarget.value);
                                                               // setSelectResume(e.currentTarget.value)
                                                           }}
                                                    >
                                                        <option>이력서를 선택해주세요</option>
                                                        {myResumes.map((resume, index) => {
                                                            if (!resume.resume_filename) { // 채공이력서
                                                                return <option
                                                                    value={resume.id}>| {resume.resume_title}</option>
                                                            } else { //
                                                                return <option
                                                                    value={resume.id}>| {resume.resume_filename}</option>
                                                            }
                                                        })}

                                                    </Input>):(<Link to={'/User/Resume'}>등록하러가기</Link> )}
                                                {/* 이력서 제출 Alert */}
                                                {submitAlert}
                                            </td>
                                            <td className="">{list.applied_status_nm}</td>
                                            <td>
                                                {/* 취소 Alert*/}
                                                {alert}
                                                <Button
                                                    className="btn btn-neutral"
                                                    color="default"
                                                    data-placement="left"
                                                    onClick={() => warningWithConfirmMessage(list)}
                                                    // outline
                                                >
                                                    취소
                                                </Button>
                                            </td>
                                        </>
                                    )
                                }
                            </tr>

                        )
                    )}
                    </tbody>
                ):(
                    <td>지원 내역이 없습니다.</td>
                )}
            </Table>
            <Modal isOpen={modal} toggle={toggleModal}>
                <form onSubmit={handleSubmit}>
                    <div className="modal-header">
                        <button
                            aria-label="Close"
                            className="close"
                            type="button"
                            onClick={()=>toggleModal}
                        >
                            <span aria-hidden={true} onClick={toggleModal}>×</span>
                        </button>
                        <h5
                            className="modal-title text-center"
                            id="shareModal"
                        >
                            추가질문사항<br/>
                            <small>지원하신 공고의 인사담당자가 직접작성하였습니다.</small>
                        </h5>
                    </div>
                    <div className="modal-body">
                        {jobQuestions &&
                        jobQuestions.map( (jobQuestion, index) => {
                            console.log('jobQuestion', jobQuestion)
                            return (
                                <>
                                    {/*<Field name='id' value={}*/}
                                    <li key={index}>{jobQuestion.job_question_comment}</li>
                                    {jobQuestion.jobanswers &&
                                    jobQuestion.jobanswers.map( (jobanswer, index) => {
                                        console.log('jobanswer', jobanswer)
                                        if(jobanswer.job_answer_type==='CE0100000'){
                                            return (<fieldset className="form-group"><Field name={"Q."+ jobQuestion.job_question_comment + index} className="form-control" component={renderField}/></fieldset>)
                                        }else if(jobanswer.job_answer_type==='CE0200000'){
                                            return (<fieldset className="form-group"><Field name={"Q."+ jobQuestion.job_question_comment + index} className="form-control" component={renderTextAreaField}/></fieldset>)
                                        }else if(jobanswer.job_answer_type==='CE0300000'){
                                            return (
                                                jobanswer.job_answer_comment.map( (option, index) => {
                                                    return (
                                                        <fieldset className="form-group">
                                                            <label>
                                                                <Field name={"Q."+ jobQuestion.job_question_comment + index} component={renderRadioField}
                                                                       type="radio" value={option} label={option}
                                                                />
                                                            </label>
                                                            {/*<Field name={"Q."+ jobQuestion.job_question_comment}*/}
                                                            {/*       type="radio"*/}
                                                            {/*       className="form-control"*/}
                                                            {/*       value={option}*/}
                                                            {/*       component={'input'}/>{option}*/}
                                                        </fieldset>
                                                    )
                                                })
                                            )
                                        }
                                    })
                                    }
                                </>
                            )
                        })
                        }
                    </div>
                    <div className="modal-footer">
                        <div className="left-side">
                            <Button
                                className="btn-link"
                                color="default"
                                type="button"
                                onClick={toggleModal}
                            >
                                취소
                            </Button>
                        </div>
                        <div className="divider"/>
                        <div className="right-side">
                            <Button className="btn-link" color="danger" type="submit"
                                    onClick={toggleModal}>
                                제출
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>

        </>
    ) : (<LoaderSpinner/>)
}

// export default ApplyList;
function mapStateToProps(state, props) {
    return {
        user: state.auth.user,
        applyList: state.auth.applied
    }
}

export default connect(mapStateToProps, {getUserProfile, getResume, getJobApplicant})(reduxForm({
    form: "job_answer",
    onSubmit: updateJobAnswer,
    onSubmitSuccess: () => {
        // console.log('onSubmitSuccess props', props)
    },
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
})(ApplyList));