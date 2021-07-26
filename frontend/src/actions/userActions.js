import {SubmissionError} from 'redux-form';
import {getUserToken} from "utils/authUtils";
import store from "../store";
import axios from "axios";
import history from "../utils/historyUtils";
import {actions as notifActions} from "redux-notifications";
import {AuthTypes} from "../constants/actionTypes";
import {apiUrls, AuthUrls, vUrls} from "../constants/urls";
import defaultClient from "../utils/defaultClient";
import React from "react";
import {generatePDFDocument} from "../components/Etc/PdfToBlob";
import {getUserProfile, updateUserProfile} from "./authActions";
import qs from "qs";
import {Alert} from "rsuite";

const {notifSend} = notifActions;

function setUserSpecial(payload) {
    return {
        type: AuthTypes.USER_SPECIAL,
        payload: payload
    };
}

function setResume(payload) {
    return {
        type: AuthTypes.RESUME,
        payload: payload
    };
}
// 중복지원 체크
export function checkApply(name,phone,birth){
    const token = getUserToken(store.getState());
    return axios
        .get(apiUrls.CHECK_APPLY, {
                headers: {
                    authorization: 'Token ' + token,
                },
                params: {
                    applied_username: name,
                    applied_phone: phone,
                    applied_birth:birth
                }
            }
        ).then(({data})=>{
            console.log(data)
            return data
        })
}
// 관심 수급 리스트
export function getInterestSugub() {
    const token = getUserToken(store.getState());

    return axios
        .get(apiUrls.INTEREST_SUGUB,
            {
                headers: {
                    authorization: 'Token ' + token
                },
            }).then(({data})=>{
            return data
        })
}

// 관심 수급 등록
export function postInterestSugub(sugub_id) {
    const token = getUserToken(store.getState());
    return function (dispatch) {
        axios.post(apiUrls.INTEREST_SUGUB,
            {
                sugub: sugub_id
            },
            {
                headers: {
                    authorization: 'Token ' + token
                },
            }).then(({data})=>{
            Alert.success('관심 등록이 완료되었습니다.')
            dispatch({
                type: AuthTypes.ADD_INTEREST_SUGUB,
                payload: data
            });
            return data
        })
    }
}

// 관심 수급 취소
export function deleteInterestSugub(id) {
    const token = getUserToken(store.getState());
    return function (dispatch) {
        axios.delete(apiUrls.INTEREST_SUGUB + id + '/', {
            headers: {
                authorization: 'Token ' + token
            },
        }).then(({data}) => {
            // window.notify.onChange('관심 등록이 취소되었습니다.');
            Alert.error('관심 등록이 취소되었습니다.')
            dispatch({
                type: AuthTypes.DELETE_INTEREST_SUGUB,
                payload: id
            });
            return data
        })
    }
}

// 지원 취소
export function deleteJobApplicant(id) {
    const token = getUserToken(store.getState());
    axios.delete(apiUrls.JOB_APPLICANT + id + '/',{
        headers: {
            authorization: 'Token ' + token
        },
    })
        .then((response)=>{
            store.dispatch({
                type: AuthTypes.DELETE_APPLICANT,
                payload: id
            });
            Alert.error('지원이 취소 되었습니다.');
            return response
        })
}

// 지원자리스트( HR )
export function getHrJobApp(filter) {
    const token = getUserToken(store.getState());
    return axios
        .get(vUrls.HR_JOB_APPLICANT, {
            headers: {
                authorization: 'Token ' + token
            },
            params:{ ...filter},
            paramsSerializer: params => {
                return qs.stringify(params, {arrayFormat: 'repeat'})
            }
        })
        .then((response) => {
            return response.data
        })
        .catch(error => {
            console.log('getJobApplicant error', error);
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        })
}

// 지원자리스트
export function getJobApp(params) {
    const token = getUserToken(store.getState());
    return defaultClient
        .get(vUrls.JOB_APPLICANT, {
            headers: {
                authorization: 'Token ' + token
            },
            params: params
        })
        .then((response) => {
            return response.data
        })
        .catch(error => {
            console.log('getJobApplicant error', error);
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        })
}
// 지원자리스트
export function getJobApplicant(params) {
    const token = getUserToken(store.getState());
    return function (dispatch) {
        // 로딩
        dispatch({
            type: AuthTypes.GET_APPLICANT,
            payload: null
        });
        defaultClient
            .get(vUrls.JOB_APPLICANT, {
                headers: {
                    authorization: 'Token ' + token
                },
                params: params
            })
            .then((response) => {
                dispatch({
                    type: AuthTypes.GET_APPLICANT,
                    payload: response.data
                });
                // store.dispatch(setApplied(response.data));
                // return response.data
            })
            .catch(error => {
                console.log('getJobApplicant error', error);
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            })
    }
}


// 채용공고 불러오기
export function getJobAdvertise(params) {
    return defaultClient
        .get(vUrls.JOB_ADVERTISE, {
            params: params
        }).then((response)=>{
            return response.data
        }).catch((error) => {
            console.log("getJobAdvertise error:", error);
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}

export function getUserSpecial(params) {
    const token = getUserToken(store.getState());
    // return function (dispatch) {
    console.log('getUserSpecial! params', params)
    if(params.user){
        return defaultClient
            .get(vUrls.USER_SPECIAL, {
                headers: {
                    authorization: 'Token ' + token
                },
                params: params
            })
            .then(response => {
                store.dispatch(setUserSpecial(response.data));
                return response.data
            })
            .catch((error) => {
                console.log("getUserSpecial error:", error);
                // TODO: send notification and redirect
            });
    }
}

export function deleteHrSpecial(id) {
    const token = getUserToken(store.getState());
    return function (dispatch) {
        axios.delete(apiUrls.HR_SPECIAL + id + '/', {
            headers: {
                authorization: 'Token ' + token
            },
        }).then((response)=>{
            console.log('deleteHrSpecial res', response)
            Alert.error('전문직종이 삭제되었습니다.');
            dispatch({
                type: AuthTypes.DELETE_HR_SPECIAL,
                payload: id
            })
        }).catch((err)=>{
            console.log('deleteHrSpecial err', err)
            // window.notify.onChange(err.statusText);
        })
    }
}

// HRPROFILE 문답형 FORM
export function hrProfileFormSubmit(formValues, dispatch, props) {
    const token = getUserToken(store.getState());
    // 제공서비스
    if (formValues.services) {
        //직종(소) [ {label: '', value: ''}, ...] 형태 => ["AA0103000", ... ]
        if (typeof formValues.services[0] === 'object'){
            const services = formValues.services.map((list) => {
                return list['code_id']
            });
            formValues.services = services;
        }
    }
    // 서비스가능지역
    if (formValues.service_address) {
        //직종(소) [ {label: '', value: ''}, ...] 형태 => ["AA0103000", ... ]
        if (typeof formValues.service_address[0] === 'object'){
            const service_address = formValues.service_address.map((list) => {
                return list['code_id']
            });
            formValues.service_address = service_address;
        }
    }

    let hrfee = [];
    // 파견 수수료
    if(formValues.hrfee_AC0100000){
        const feeData = () => {
            let temp = {};
            temp['fee_gubun'] =  'AC0100000';
            temp['fee_start'] = Number(formValues.hrfee_AC0100000[0]['fee_start']);
            temp['fee_end'] = Number(formValues.hrfee_AC0100000[0]['fee_end']);
            return temp
        };
        hrfee.push(feeData())
    }
    // 도급 수수료
    if(formValues.hrfee_AC0200000){
        const feeData = () => {
            let temp = {};
            temp['fee_gubun'] =  'AC0200000';
            temp['fee_start'] = Number(formValues.hrfee_AC0200000[0]['fee_start']);
            temp['fee_end'] = Number(formValues.hrfee_AC0200000[0]['fee_end']);
            return temp
        };
        hrfee.push(feeData())
    }
    // 채용대행 수수료
    if(formValues.hrfee_AC0300000){
        formValues.hrfee_AC0300000.map( item => {
            let temp = {};
            temp['fee_gubun'] =  'AC0300000';
            temp['start'] =  Number(item.start.replaceAll(',', ''));
            temp['end'] =  Number(item.end.replaceAll(',', ''));
            temp['fee_start'] = item.fee_start;
            hrfee.push(temp);
        })
    }
    // 헤드헌팅 수수료
    if(formValues.hrfee_AC0400000){
        formValues.hrfee_AC0400000.map( item => {
            let temp = {};
            temp['fee_gubun'] =  'AC0400000';
            temp['start'] =  Number(item.start.replaceAll(',', ''));
            temp['end'] =  Number(item.end.replaceAll(',', ''));
            temp['fee_start'] = Number(item.fee_start);
            hrfee.push(temp);
        })
    }

    if (typeof formValues.custname === 'object') {
        if(formValues.custname['custname1']) {
            formValues.custname = formValues.custname['custname1'];
        }else{ // create select
            formValues.custname = formValues.custname['label'];
        }
    }

    if (formValues.phone) {
        formValues.phone = formValues.phone.replace(/-/gi, '')
    }

    formValues.hrfee = hrfee;
    props.nextPage();
    // 유저정보변경
    updateUserProfile(formValues).then(()=>{
        return axios
            .post(apiUrls.HR_PROFILE, formValues, {
                headers: {
                    authorization: 'Token ' + token
                },
            })
            .then(({data})=>{
                props.nextPage(1);
                Alert.success('회사 정보가 정상적으로 등록되었습니다.');
                store.dispatch(getUserProfile());
            })
            .catch((error) => {
                console.log('updateHrSpecial err:', error)
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });
    })
}

export function updateHrSpecial(formValues, dispatch, props) {
    const token = getUserToken(store.getState());

    console.log('updateHrSpecial props', props)
    if (formValues.hr_jikjong_low) {
        // 직종(소) [ {label: '', value: ''}, ...] 형태 => ["AA0103000", ... ]
        if (typeof formValues.hr_jikjong_low[0] === 'object'){
            const jikjong_low = formValues.hr_jikjong_low.map((list) => {
                return list['code_id']
            });
            formValues.hr_jikjong_low = jikjong_low;
        }
    }

    return axios
        .post(apiUrls.HR_SPECIAL, formValues, {
            headers: {
                authorization: 'Token ' + token
            },
        })
        .then(({data})=>{
            props.nextPage(1);
            Alert.success('전문직종 정보가 정상적으로 등록되었습니다.');
            dispatch(getUserProfile());
        })
        .catch((error) => {
            console.log('updateHrSpecial err:', error)
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}

export function updateUserSpecial(formValues, dispatch) {
    const token = getUserToken(store.getState());
    if(!token) return;

    if (formValues.jikjong_top) {
        if (typeof formValues.jikjong_top === 'object'){
            formValues.jikjong_top = formValues.jikjong_top.code_id;
        }
    }

    if (formValues.jikjong_mid) {
        if (typeof formValues.jikjong_mid === 'object'){
            formValues.jikjong_mid = formValues.jikjong_mid.code_id;
        }
    }

    if (formValues.jikjong_low) {
        // 직종(소) [ {label: '', value: ''}, ...] 형태 => ["AA0103000", ... ]
        if (typeof formValues.jikjong_low[0] === 'object'){
            const jikjong_low = formValues.jikjong_low.map((list) => {
                return list['code_id']
            });
            formValues.jikjong_low = jikjong_low;
        }
    }

    const answers = Object.keys(formValues).map((value) => {
        if (/^Q.*$/g.test(value)) {
            console.log('value:', value)
            return formValues[value]
        }
        return null;
    }).filter(o => o)

    // userSpecial.answers_json = answers;
    console.log(JSON.stringify(formValues))
    if(formValues.id){
        console.log('이건 업데이트')
        return axios
            .patch(apiUrls.USER_SPECIAL + formValues.id + '/', formValues,{
                headers: {
                    authorization: 'Token ' + token
                },
            })
            .then((res)=>{
                Alert.success('전문분야 정보가 정상적으로 수정 되었습니다.')
                dispatch(getUserProfile());
            })
            .catch((error) => {
                console.log('updateUserSpecial patch err:', error)
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });
    }else{
        return axios
            .post(apiUrls.USER_SPECIAL, formValues, {
                headers: {
                    authorization: 'Token ' + token
                },
            })
            .then(response => {
                Alert.success('전문분야 정보가 정상적으로 등록되었습니다.');
            })
            .then(()=>{
                dispatch(getUserProfile());
            })
            .catch((error) => {
                console.log('updateUserSpecial err:', error)
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });
    }

}

export function getResume(params) {
    return axios
        .get(vUrls.RESUME, {
            params: params
        })
        .then((response) => {
            // console.log('getResume response', response)
            // dispatch(setResume(response.data));
            return response.data
        })
        .catch((error) => {
            console.log('getResume err:', error)
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}

export function updateUserResume(formValues, dispatch) {
    const token = getUserToken(store.getState());
    console.log('userResume FormValues: ', formValues);
    if (!token) return null;

    // formValues.userspecial = formValues.userspecial;

    if (formValues.resume_phone) {
        formValues.resume_phone = formValues.resume_phone.replace(/-/gi, '')
    }

    if (!formValues.resume_id) {
        return axios
            .post(AuthUrls.RESUME, formValues, {
                headers: {
                    authorization: token
                }
            })
            .then(response => {
                console.log('updateUserResume response', response)
                return response.data;
                // dispatch(notifSend({
                //     message: "이력서가 생성되었습니다.",
                //     kind: "info",
                //     dismissAfter: 5000
                // }));
                Alert.success('이력서가 생성되었습니다.');
            })
    } else {
        return axios
            .patch(AuthUrls.RESUME + formValues.resume_id + '/', formValues)
            .then(response => {
                // dispatch(notifSend({
                //     message: "기본사항이 저장되었습니다.",
                //     kind: "info",
                //     dismissAfter: 3000
                // }));
                Alert.success('기본사항이 저장되었습니다.');
            })
    }
}

// 경력
export function updateUserCareer(formValues, dispatch, newId) {

    const token = getUserToken(store.getState());
    console.log('formValues1:', formValues);
    if (formValues.career_start && typeof formValues.career_start !== 'string')
        formValues.career_start = formValues.career_start.format('YYYYMM');
    if (formValues.career_end && typeof formValues.career_end !== 'string')
        formValues.career_end = formValues.career_end.format('YYYYMM');

    if (!formValues.id) {
        console.log('newId: ', newId)
    }
    console.log('formValues2:', formValues);

    return axios
        .patch(AuthUrls.CAREER + formValues.id + '/', formValues)
        .then(response => {
            // dispatch(notifSend({
            //     message: "경력사항 정보가 정상적으로 등록되었습니다.",
            //     kind: "info",
            //     dismissAfter: 5000
            // }));
            Alert.success('경력사항 정보가 정상적으로 등록되었습니다.');
        })
}

// 학력
export function updateUserEducation(formValues, dispatch) {
    const token = getUserToken(store.getState());

    if (formValues.education_start && typeof formValues.education_start !== 'string')
        formValues.education_start = formValues.education_start.format('YYYYMM');
    if (formValues.education_end && typeof formValues.education_end !== 'string')
        formValues.education_end = formValues.education_end.format('YYYYMM');

    //alert(JSON.stringify(formValues));

    return axios
        .patch(AuthUrls.EDUCATION + formValues.id + '/', formValues)
        .then(response => {
            // dispatch(notifSend({
            //     message: "학력사항 정보가 정상적으로 등록되었습니다.",
            //     kind: "info",
            //     dismissAfter: 3000
            // }));
            Alert.success('학력사항 정보가 정상적으로 등록되었습니다.');
            //history.push("/User/profile");
        })
}

// 외국어
export function updateUserLanguage(formValues, dispatch) {
    // alert(JSON.stringify(formValues));
    return axios
        .patch(AuthUrls.LANGUAGE + formValues.id + '/', formValues)
        .then(response => {
            // dispatch(notifSend({
            //     message: "외국어 정보가 정상적으로 등록되었습니다.",
            //     kind: "info",
            //     dismissAfter: 3000
            // }));
            Alert.success('외국어 정보가 정상적으로 등록되었습니다.');
        })
}

// 인담자 질문에 대한 답변 등록
export function updateJobAnswer(formValues, props){
    const token = getUserToken(store.getState());
    const answers = Object.keys(formValues).map((value) => {
        if (/^Q.*$/g.test(value)) {
            return formValues[value]
        }
        return null;
    }).filter(o => o);

    formValues.job_answers_json = answers;
    console.log('updateJobAnswer formValues', formValues)

    return axios
        .patch(apiUrls.JOB_APPLICANT + formValues.id + '/', formValues, {
            headers: {
                authorization: 'Token ' + token
            },
        })
        .then((res)=>{
            // store.dispatch(notifSend({
            //     message: "제출 완료 되었습니다.",
            //     kind: "info",
            //     dismissAfter: 1000
            // }));
            Alert.success('제출 완료 되었습니다.');
            store.dispatch(getJobApplicant());
            return res
        })
}

// 관심공고 등록하기
export function interestAdv(user, jobadvertise) {
    return axios
        .post(apiUrls.INTEREST_ADV, {
            user: user,
            jobadvertise: jobadvertise
        })
        .then((res) => {
            console.log(res)
            // store.dispatch(notifSend({
            //     message: "관심공고로 등록되었습니다.",
            //     kind: "info",
            //     dismissAfter: 1000
            // }));
            Alert.success('관심공고로 등록되었습니다.');
        })
}


// 채용공고 지원하기
export function applyAdvertise(formValues) {
    const token = getUserToken(store.getState());
    console.log('applyAdvertise formValue:', JSON.stringify(formValues))
    return axios
        .post(apiUrls.JOB_APPLICANT, formValues, {
            headers:{
                authorization: 'Token ' + token
            }
        })
        .then(res => {
            // alert('지원 완료 되었습니다.');
            // store.dispatch(notifSend({
            //     message: "지원 완료 되었습니다.",
            //     kind: "info",
            //     dismissAfter: 3000
            // }));
            Alert.success('지원 완료 되었습니다.');
            history.push('/User/Status/ing');
            return res
        })
        .catch((error) => {
            console.log('applyAdvertise JOB_APPLICANT err', error)
            const processedError = processServerError(error.response.data);
            // throw new SubmissionError(processedError);
            alert(processedError._error)
            return error.response
        });
}

// 휴대폰 인증 SMS 발송
export async function sendAuthSms(phone_number) {
    return axios
        .post(AuthUrls.SEND_AUTH_SMS, {
            phone_number: phone_number
        })
        .then((response)=>{
            return response
        })
        .catch((error)=>{
            console.log('sendAuthSms error', error)
            const processedError = processServerError(error.response.data);
            return processedError
            // throw new SubmissionError(processedError);
        })
}

// 휴대폰 인증 확인
export async function certifyAuthSms(phone_number, auth_number) {
    return axios
        .get(AuthUrls.SEND_AUTH_SMS, {
            params:{
                phone_number: phone_number,
                auth_number: auth_number
            },
        })
        .then((response)=>{
            return response
        })
        .catch((error)=>{
            console.log('certifyAuthSms error', error)
            const processedError = processServerError(error.response.data);
            return processedError
            // throw new SubmissionError(processedError);
        })
}

// 공지사항 불러오기
export async function getNotification() {
    return axios
        .get(vUrls.NOTIFICATION)
        .then((response)=>{
            // console.log('NOTIFICATION', response)
            return response
        })
        .catch((error)=>{
            console.log('getNotification error', error)
            const processedError = processServerError(error.response.data);
            // return processedError
            throw new SubmissionError(processedError);
        })
}

// FAQ 불러오기
export async function getFAQ() {
    return axios
        .get(vUrls.FAQ)
        .then((response)=>{
            return response
        })
        .catch((error)=>{
            console.log('getFAQ error', error)
            const processedError = processServerError(error.response.data);
            // return processedError
            throw new SubmissionError(processedError);
        })
}


// 문의사항 ( Q&A )
export function updateQna(formValues) {
    return axios.post(apiUrls.QNA, formValues)
        .then(({data})=>{
            Alert.success('문의사항이 등록되었습니다.');
            history.push('/HelpCenter')
        })
        .catch((error)=>{
            console.log('updateQna error', error);
            const processedError = processServerError(error.response.data);
            // return processedError
            throw new SubmissionError(processedError);
        })
}

// 채용공고 지원 ( 이력서 추가 )
export async function updateApplyAdvertise(applicant, resume) {
    const token = getUserToken(store.getState());
    let formValues = new FormData();
    formValues.append('user', applicant.user);
    formValues.append('resume', resume.id);
    formValues.append('applied_status', 'BW0100000');
    // console.log('resume:', resume)
    // console.log('updateApplyAdvertise formValues: ', JSON.stringify(formValues))
    // 채공이력서 지원시 PDF 변환
    if (!resume.resume_filename) {
        generatePDFDocument(resume)
            .then((blob) => {
                const file = new File([blob], resume.resume_username + '_' + resume.resume_phone + '.pdf')
                formValues.append('resume_pdf', file, file.name);
                formValues.append('resume_filename', file.name);
                return formValues
            })
            .then((formValues)=>{
                return axios
                    .patch(apiUrls.JOB_APPLICANT + applicant.id + '/', formValues, {
                        headers:{
                            authorization: 'Token ' + token
                        }
                    })
                    .then((response) => {
                        // store.dispatch(notifSend({
                        //     message: "지원되었습니다.",
                        //     kind: "info",
                        //     dismissAfter: 3000
                        // }));
                        Alert.success('지원되었습니다.');
                        store.dispatch(getJobApplicant());
                        return response
                    })
            })
            .catch((error) => {
                const processedError = processServerError(error.response.data);
                console.log('채공이력서 지원시 error', processedError);
            })
        // 기타이력서로 지원 시
    }else{
        return axios
            .patch(apiUrls.JOB_APPLICANT + applicant.id + '/', formValues, {
                headers:{
                    authorization: 'Token ' + token
                }
            })
            .then((response) => {
                // store.dispatch(notifSend({
                //     message: "지원되었습니다.",
                //     kind: "info",
                //     dismissAfter: 3000
                // }));
                Alert.success('지원되었습니다.');
                // console.log('기타이력서 response',response)
                return response
            })
            .catch((error) => {
                const processedError = processServerError(error.response.data);
                console.log('기타이력서로 지원 시 error', processedError);
            });
    }
}

// util functions
function processServerError(error) {
    console.log('processServerError error', error)
    return Object.keys(error).reduce(function (newDict, key) {
        if (key === "non_field_errors") {
            newDict["_error"].push(error[key]);
        } else if (key === "user") {
            newDict["_error"].push(error[key]);
        } else if (key === "token") {
            // token sent with request is invalid
            newDict["_error"].push("The link is not valid any more.");
        } else{
            newDict['_error'] = error[key];
        }
        console.log('newDict:2:',newDict)

        return newDict
    }, {"_error": []});
}
