import React, {useCallback, useEffect, useRef, useState} from "react";
import {Col, Label, Modal, ModalBody, Row, Spinner} from "reactstrap";
import axios from "axios";
import {apiUrls, AuthUrls} from "../../../constants/urls";
import store from "../../../store";
import {getUserToken} from "../../../utils/authUtils";
import history from "../../../utils/historyUtils";
import {Uploader, Button, Icon, Avatar, Alert} from "rsuite"
import {checkApply} from "../../../actions/userActions";
import moment from "moment";
import SugubHistory from "../SugubHistory";
import ReactBSAlert from "react-bootstrap-sweetalert";
import { useObserver } from 'mobx-react';
import useStore from './useStore';

const reducePromises = (array, callback) => (
    array.reduce((prevPrms, currElem, index) => (
        prevPrms.then(async prevRes => {
            const currRes = await callback(currElem, index);
            return [...prevRes, currRes];
        })
    ), Promise.resolve([]))
)

const styles = {
    lineHeight: '100px'
};
const subject = {
    fontSize: '1rem',
    backgroundColor: '#7a7c7d',
    padding: '5px',
    color: 'white'
};
const Resume = (props) => {
    const {sugub,modal,toggleModal,toggleReload,onPrevious,handleSubmitEstimate,setLoading,loading,toggle,setSugub} = props;
    const [resumeFile, setResumeFile] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [username, setUsername] = useState([]);
    const [phone, setPhone] = useState([]);
    const [birth, setBirth] = useState([]);
    // const [modal, setModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [failData, setFailData] = useState([]);
    const [person, setPerson] = useState([]);
    const [cnt, setCnt] = useState(false);
    const [dup, setDup] = useState([]);
    const [resultModal, setResultModal] = useState(false);
    const { counter } = useStore();
    const toggleResultModal = () => setResultModal(!resultModal)

    useEffect(() => {
        setResumeFile([]);
        setFileList([]);
        setFailData([]);
        setDup([]);

    },[modal])
    function renderFilename(data){
        var hr = store.getState().auth.hr.custname;
        var position = sugub.work_position;
        var username = data.name;
        var format = data.file.name.split('.')[1];
        var date = moment(new Date()).format('YYYYMMDD')

        return hr+'_'+position+'_'+username+'_'+date+'.'+format;
    }



    //이력서 접수 실패시 , 임시 아이디 롤백
    const deleteUserAccount = async (id) => {
        try{
            console.log('delete')
            await axios.delete(AuthUrls.CREATE_TEMPREGISTER,{params:id}).then(console.log('secfce')).catch(error => console.log(error));
        } catch(e){
            console.log(e);
        }
    }
    console.log(person)
    const postData = useCallback(() => {
        const token = getUserToken(store.getState());
        const jobAds = sugub.jobadvertise[0];
        setSubmitting(true);
        let faildata = [];
        var test = sugub;
        reducePromises(person, (user,i) => {
            console.log(user,i)
            return axios.post(AuthUrls.CREATE_TEMPREGISTER,{
                birth:user.birth,
                username:user.name,
                phone:user.phone,
                // hrprofile:store.getState().auth.hr.id,
                jikjong_top:sugub.sugub_jikjong_top.code_id,
                jikjong_mid:sugub.sugub_jikjong_mid.code_id
            }, {
                headers: {
                    authorization: 'Token ' + store.getState().auth.token
                },
            }).then((res) => {
                console.log(res);
                let formValues = new FormData();
                formValues.append('jobadvertise', jobAds.id);
                console.log('sssssssssssssssss',res.data.resume_id)
                formValues.append(`resume_pdf`, user.file.blobFile, renderFilename(user));

                formValues.append('resume_filename', user.file.name);
                formValues.append('applied_status', 'BW0100000');
                formValues.append('applied_username', user.name);
                formValues.append('applied_phone', user.phone);
                formValues.append('applied_birth', user.birth);
                formValues.append('user', res.data.user_id);
                formValues.append('resume', res.data.resume_id);

                return axios.post(apiUrls.JOB_APPLICANT, formValues, {
                    headers: {
                        'content-type': 'multipart/form-data',
                        authorization: 'Token ' + token
                    },
                })
                    .then((data) => {
                        // toggleReload(data)
                        counter.number.jobadvertise[0].jobapplicants.push(data.data)
                        toggle();
                        console.log('success1',data.data)

                        // test = test.map(val =>
                        // val.id === data.jobapp
                        //     ? {
                        //         ...val,
                        //         interview_jobapp:[data]
                        //     } : val
                        // );
                    })
                    .catch(function (error) {
                        deleteUserAccount(res.data.user_id);
                        console.log(error);
                        faildata.push(username[i]);
                    });
            }).catch(function(error){
                setSubmitting(false);
                console.log(error.response);
                faildata.push(username[i]+' : '+error.response);
                // alert('업로드를 실패했습니다.');
            })
        })
            .then(results => {
                console.log('success3')
                if(faildata.length > 0){
                    alert('결과 : 실패 ' +  faildata.length + '건\n' + '[' + faildata + ']');
                    // toggleModal();
                    setSubmitting(false);
                    setLoading(false)
                } else{
                    Alert.success('이력서를 성공적으로 접수하였습니다.')
                    // toggleModal();
                    setSubmitting(false);
                    setLoading(false)

                }
            })
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        var errCheck ;
        reducePromises(person, (user,i) => {
            console.log(user.birth.length, user.phone.length)
            if(user.birth.length !== 8){
                alert('생년월일 에러')
                errCheck = true;
            }
            if(user.phone.length !== 11){
                alert('핸드폰번호 에러')
                errCheck = true;
            }
        }).then(()=>{
            console.log(errCheck)
            if(!errCheck){
                if(dup.length > 0){
                    if(window.confirm("다른 채용건에 접수중인 지원자가 있습니다. 그래도 진행하시겠습니까?")){
                    }else{
                        return false;
                    }
                }
                handleSubmitEstimate(postData);
            }
        })
        // postData();
    };
    async function showMessages(files) {
        var p = [];
        var array = [];
        var err = [];
        var a = files
        const messages = await Promise.all(
            files.map(value=>{
                var file=value;
                if(file.name.match(/_/g) === null || (file.name.match(/_/g) !== null && file.name.match(/_/g).length !== 2)){
                    // alert('파일명 형식 오류');
                    err.push({
                        'filename' : file.name,
                        'error' : '파일명 형식 오류'
                    })
                    a = a.filter(v=>v.name !== file.name)
                } else{
                    var userinfo = file.name.split('_');
                    var birth = userinfo[0]
                    var name = userinfo[1]
                    var phone = userinfo[2].split('.')[0]
                    if(birth.length !== 8){
                        // alert('생년월일 에러')
                        a = a.filter(v=>v.name !== file.name)
                        err.push({
                            'filename' : file.name,
                            'error' : '잘못된 생년월일'
                        })
                    }
                    else if(phone.length !== 11){
                        // alert('핸드폰번호 에러')
                        a = a.filter(v=>v.name !== file.name)
                        err.push({
                            'filename' : file.name,
                            'error' : '잘못된 핸드폰번호'
                        })
                    } else{
                        p.push({
                            file:file,
                            name:name,
                            phone:phone,
                            birth:birth
                        });
                        return checkApply(name, phone, birth).then((data) => {
                            if(data[0].is_applied){
                                array.push(file.name)
                            }
                        })
                    }
                }
            })

        );
        console.log(err)
        if(err.length > 0){
            toggleResultModal()
        }
        setFailData(err)
        setFileList(a)
        setDup(array)
        setPerson(p)
    }
    const handleUploadChange = (files) => {
        setFileList(files)
        setResumeFile([...resumeFile, files])
        showMessages(files);
    };
    console.log(fileList)
    console.log(person)
    return useObserver(()=>(
        <>
            {resultModal &&
            <ReactBSAlert
                confirmBtnText="확인"
                danger
                style={{display: "block", marginTop: "100px"}}
                title="업로드 실패!"
                onConfirm={toggleResultModal}
                confirmBtnBsStyle="info"
                cancelBtnBsStyle="danger"
            >
                {failData.map(v=>{
                    return <div>{v.filename}
                        <span style={{color:'red',marginLeft:10}}>
                            <Icon icon="info"/>{v.error}</span>
                    </div>
                })}
            </ReactBSAlert>
            }
            {/*<form onSubmit={handleSubmit}>*/}
            {/*    <div className="modal-body">*/}
            <Row>
                <Col md="2" style={{paddingRight:0,paddingLeft:0,borderRight: '1px solid lightgray'}}>
                    <div style={subject}>2. 이력서</div>
                </Col>
                <Col md="10">
                    파일명은 반드시 양식을 따라주시기 바랍니다.
                    <br/> - 생년월일8자리_이름_전화번호11자리(19900713_홍길동_01012345678) *정확한 정보 필수!

                    <hr/>
                    <div>다른 채용건에 진행중인 지원자</div>
                    {person && person.length > 0 ? dup.map(v=> <div style={{color:'red'}}>{v + "\n"}</div> ) : <div> - 파일을 먼저 업로드 해주세요.</div>}
                    <hr/>

                    <div>
                        <Label>파일 업로드</Label>
                        <Uploader autoUpload={false} onChange={handleUploadChange} draggable multiple fileList={fileList}
                                  onRemove={(file) => {
                                      if(dup.includes(file.name)){
                                          setDup(dup.filter(v=>v !== file.name));
                                      }
                                  }}
                        >
                            <div style={styles}>클릭하거나 파일을 드래그해주세요.</div>
                        </Uploader>
                    </div>
                    {/*</div>*/}
                    <div className="modal-footer">
                        {/*<Button onClick={onPrevious} size="lg" >이전</Button>*/}
                        <Button type="submit" onClick={handleSubmit} className="m-3"
                                size="lg" appearance="primary" loading={loading} disabled={person.length < 1}>
                            이력서 제출
                        </Button>
                    </div>
                </Col>
            </Row>
            {/*</form>*/}
        </>
    ))
}

export default Resume;
