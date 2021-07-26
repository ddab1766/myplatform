import React, {useState,useEffect} from 'react';
import {Col, Form, Label, Modal, ModalBody, Row, Spinner} from 'reactstrap';
import {infoField, renderTextAreaField} from "../../../utils/renderUtils_mng";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import Container from "@material-ui/core/Container";
import {getUserToken} from "../../../utils/authUtils";
import store from "../../../store";
import axios from "axios";
import {apiUrls} from "../../../constants/urls";
import {Uploader, Button, Icon, RadioGroup, Radio} from "rsuite";
import Resume from "./Resume";
import {Link} from "react-router-dom";
import {fileViewerUrl} from "../../../function/common"
import {required} from "redux-form-validators";
const SuggestHis = {
    borderTop: '1px solid lightgray',
    borderBottom: '1px solid lightgray',
    padding: '7px',
};
const subject = {
    fontSize: '1rem',
    backgroundColor: '#7a7c7d',
    padding: '5px',
    color: 'white'
};
const Estimate = (props) => {
    const {modal, toggle, sugub, toggleReload,setSugub} = props;
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [step, setStep] = useState(0);
    const [suggestHis, setSuggestHis] = useState(null);
    const [newUpload, setNewUpload] = useState(true);
    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };
    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);


    useEffect(() => {
        sugub.estimate_sugub && sugub.estimate_sugub.map(v=>{
            if(v.hrprofile.id === props.hr.id){
                console.log('ddd',sugub.estimate_sugub.map(v=>v.hrprofile.id === props.hr.id).length > 0)
                setSuggestHis(v)
                setNewUpload(false)
            }
        })
    }, []);

    const handleSubmit = (callback) => {
        // if(newUpload && !file){
        //     alert('가견적 파일을 업로드 해주세요.')
        //     return false;
        // }
        if(newUpload && !store.getState().form.estimate.values){
            alert('코멘트를 입력해 주세요.')
            return false;
        }
        const token = getUserToken(store.getState());
        setLoading(true)
        if(!newUpload){
            callback();
        } else{ //이력 없는경우
            let formValues = new FormData();
            formValues.append('sugub', sugub.id);
            formValues.append('comments', store.getState().form.estimate.values.comments);
            if(file) {
                formValues.append('estimate_file', file.blobFile);
                formValues.append('estimate_filename', file.name);
            }
            return axios.post(apiUrls.ESTIMATE, formValues,{
                headers: {
                    authorization: 'Token ' + token,
                },
            })
                .then((data) => {
                    console.log('견적제안 완료')
                    // window.notify.onChange('가견적을 제안하였습니다.');
                    // toggle();
                    callback();
                })
                .catch(function (error) {
                    alert('가견적 업로드 에러')
                    console.log(error);
                });
        }
    }
    const handleUploadChange = (file) => {
        console.log(file[0])
        setFile(file[0])
    };
    const handleSuggestRadio = (value) => {
        if(value === 'A') {
            setNewUpload(false)
        } else{
            setNewUpload(true)
        }

    }
    console.log(suggestHis)
    return <>
        {  (
            <div>
                <Modal isOpen={modal} toggle={toggle} backdrop={true} scrollable={true} size="lg">
                    {/*{step === 0 ? (*/}
                    {/*    <>*/}
                    <div className="modal-header text-left">
                        <button
                            aria-hidden={true}
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={toggle}
                        >
                            <i className="nc-icon nc-simple-remove" />
                        </button>
                        <h5 className="modal-title" id="myModalLabel">
                            {/*가견적 제안<span style={{fontSize:'12px',color:'#007bff'}}> STEP 1/2</span>*/}
                            이력서 접수
                        </h5>

                    </div>
                    <ModalBody className="p-4">
                        <Container>
                            <Row>
                                <Col md="2" style={{paddingRight:0,paddingLeft:0,borderRight: '1px solid lightgray'}}>
                                    <div style={subject}>1. 가견적</div>
                                </Col>
                                <Col md="10">
                                    <Form onSubmit={handleSubmit} className="estimate">
                                        {suggestHis ? (
                                                <>
                                                    <div>해당 채용건에 동일한 회사에서 제안한 이력이 있습니다.</div>
                                                    <br/>
                                                    <div style={SuggestHis}>
                                                        <dl>
                                                            <dt>작성자</dt>
                                                            <dd>{suggestHis.user.nickname}</dd>
                                                        </dl>
                                                        <dl>
                                                            <dt>파일</dt>
                                                            <dd><a href={`${suggestHis.estimate_file.length > 0 && fileViewerUrl(suggestHis.estimate_file[0].estimate_file)}`} target='_blank' >
                                                                {suggestHis.estimate_file.length > 0 && suggestHis.estimate_file[0].estimate_filename}</a></dd>
                                                        </dl>
                                                        <dl>
                                                            <dt>코멘트</dt>
                                                            <dd>{suggestHis.comments}</dd>
                                                        </dl>
                                                        <dl>
                                                            <dt>제안일자</dt>
                                                            <dd>{suggestHis.created_time}</dd>
                                                        </dl>

                                                    </div>
                                                    <br/>
                                                    <div style={{textAlign:'center'}}>
                                                        <div>위의 내용으로 제안하시겠습니까?</div>
                                                        <RadioGroup name="radioList" inline onChange={handleSuggestRadio} defaultValue={!newUpload ? 'A' : 'B'}>
                                                            <Radio value="A">위의 내용으로 제안</Radio>
                                                            <Radio value="B">새로 제안</Radio>
                                                        </RadioGroup>
                                                    </div>
                                                </>)
                                            :
                                            (<div>해당 채용건에 가견적을 제안한 이력이 없습니다. 가견적을 먼저 제안해주세요!</div>)}
                                        <br/>
                                        {(newUpload || !suggestHis) && (
                                            <>
                                                <Row>
                                                    <Col className="col-3">
                                                        파일
                                                    </Col>
                                                    <Col className="col-9">
                                                        <Uploader autoUpload={false} onChange={handleUploadChange} >
                                                            <Button>업로드</Button>
                                                        </Uploader>

                                                        {/*<input type="file" onChange={handleUploadChange} id="estimate_file"  required />*/}

                                                    </Col>
                                                </Row>
                                                <br/>
                                                <Field
                                                    name="comments"
                                                    component={renderTextAreaField}
                                                    label="코멘트"
                                                    labelSize={3}
                                                    colSize={9}
                                                />
                                            </>
                                        )}

                                    </Form>
                                </Col>
                            </Row>

                            <Resume setSugub={setSugub} setLoading={setLoading} loading={loading} sugub={sugub}
                                    onPrevious={onPrevious} handleSubmitEstimate={handleSubmit}
                                    toggleReload={toggleReload} toggle={toggle}/>
                        </Container>
                    </ModalBody>
                    {/*<div className="modal-footer" style={{padding: '14px'}}>*/}
                    {/*    <Button appearance="primary" onClick={onNext} size="lg"  //onClick={handleSubmit}*/}
                    {/*    >이력서 접수</Button>*/}
                    {/*</div> */}
                    {/*</>) :*/}
                    {/*        (<Resume setLoading={setLoading} loading={loading} sugub={sugub}*/}
                    {/*                 onPrevious={onPrevious} handleSubmitEstimate={handleSubmit}*/}
                    {/*                 toggleReload={toggleReload} toggle={toggle}/>)*/}
                    {/*    }*/}
                </Modal>
            </div>
        )
        }
    </>
}
function mapStateToProps(state) {
    return {
        user: state.auth.user,
        company: state.auth.company,
        hr:state.auth.hr
    }
}
export default connect(mapStateToProps)(reduxForm({
    form: "estimate",
})(Estimate));

// export default Estimate;
