import axios from "axios";
import {SubmissionError} from 'redux-form';
import history from "../utils/historyUtils";
import {actions as notifActions} from 'redux-notifications';
import {apiUrls, AuthUrls, vUrls} from "../constants/urls";
import store from "../store";
import {getUserToken} from "../utils/authUtils";
import moment from "moment";
import {
    authLogin,
    getCompanyProfile,
    getUserProfile,
    postCompanyProfile,
    signupUser,
    updateUserProfile
} from "./authActions";
import {CommonTypes, SugubTypes} from "../constants/actionTypes";
import defaultClient from "../utils/defaultClient";
import {Alert} from "rsuite";


const { notifSend } = notifActions;


function setSugub(payload) {
    return {
        type: CommonTypes.GET_API_DATA,
        payload: payload
    };
}
export function postEstimate(){
    return axios
        .post(apiUrls.JOB_ADVERTISE ,  {
            headers: {
                authorization: 'Token ' + store.getState().auth.token
            },
            params: {
                jobadvertise_status: 'CA0100000' // 공고미등록
            }
        })
        .then((response)=>{
            console.log('suspendJobAd res', response);
            Alert.error('접수요청을 취소하였습니다.');
            return response.data
        })
}


// 공고 게시 중지 요청
export function suspendJobAd(id) {
    return axios
        .patch(apiUrls.JOB_ADVERTISE + id + '/', {
            jobadvertise_status: 'CA0100000' // 공고미등록
        }, {
            headers: {
                authorization: 'Token ' + store.getState().auth.token
            },
        })
        .then((response)=>{
            console.log('suspendJobAd res', response);
            Alert.error('접수요청을 취소하였습니다.');
            return response.data
        })
}

// 회원가입 후 수급 등록
export function sugubSignupFormSubmit(formValues, dispatch, props){
    return signupUser(formValues, dispatch, props)
        .then((response)=>{
            return sugubFormSubmit(formValues, dispatch, props)
        })
}

// 문답형 수급 등록 form
export function sugubFormSubmit(formValues, dispatch, props){
    const token = getUserToken(store.getState());

    if (formValues.phone) {
        formValues.phone = (formValues.phone).replace(/-/gi, '')
    }

    // 로그인된 경우
    if (token){
        props.nextPage();
        // 유저정보변경
        updateUserProfile(formValues).then(()=>{
            // 신규 회사등록
            if(formValues.custname) {
                // 유저정보변경
                postCompanyProfile(formValues).then(()=>{
                    return postSugub(formValues, dispatch)
                        .then(()=>{
                            props.nextPage(1);
                        })
                })
            }else{
                return postSugub(formValues, dispatch)
                    .then(()=>{
                        props.nextPage(1);
                    })
            }
        })

    }else {
        return axios
            .post(AuthUrls.LOGIN, formValues)
            .then((response) => {
                const token = response.data.key;
                dispatch(authLogin(token));
                localStorage.setItem("token", token);
                // 유저정보변경
                updateUserProfile(formValues).then(()=>{
                    props.nextPage();
                    // 신규 회사등록
                    if(formValues.custname) {
                        console.log('신규 회사등록2');
                        postCompanyProfile(formValues).then(()=>{
                            return postSugub(formValues, dispatch)
                                .then(()=>{
                                    props.nextPage(1);
                                })
                        })
                    }else{
                        return postSugub(formValues, dispatch)
                            .then(()=>{
                                props.nextPage(1);
                            })
                    }
                })
            })
            .catch(error => {
                console.log('LOGIN error', error);
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });
    }
}

// 수급디테일
export function getSugubDetail(id) {
    const token = getUserToken(store.getState());
    return axios
        .get(vUrls.SUGUB + id + '/', {
            headers: {
                authorization: 'Token ' + token
            },
        }).then((response)=>{
            return response.data
        })
}


// 수급리스트
export function getSugub(params) {
    console.log('params', params)
    const token = getUserToken(store.getState());
    store.dispatch({
        type: SugubTypes.LOADING
    });
    if(token){
        return defaultClient
            .get(vUrls.SUGUB + 'card_list/', {
                headers:{
                    authorization: 'Token ' + token
                },
                params: {
                    page: params ? params.page : 1,
                    size: 100
                }
            })
            .then((response) => {
                store.dispatch({
                    type: SugubTypes.GET_SUGUB,
                    payload: response.data
                });
                // console.log('getSugub response', response)
                // store.dispatch(setSugub(response.data.results))
                // store.dispatch(setSugub(response.data))
                return response.data
            })
            .catch(error => {
                console.log('getSugub error', error);
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });
    }else {
        return defaultClient
            .get(vUrls.SUGUB + 'card_list/', {
                headers:{
                },
                params: {
                    page: params ? params.page : 1,
                    size: 100
                }
            })
            .then((response) => {
                store.dispatch({
                    type: SugubTypes.GET_SUGUB,
                    payload: response.data
                });
                // console.log('getSugub response', response)
                // store.dispatch(setSugub(response.data.results))
                // store.dispatch(setSugub(response.data))
                return response.data
            })
            .catch(error => {
                console.log('getSugub error', error);
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });
    }

}
// Hr수급리스트
export function getHrSugub(params) {
    const token = getUserToken(store.getState());
    let setParams;
    if(params != null && params != ''){
        setParams = params + '/'
    } else{
        setParams = '';
    }
    if(token) {
        return defaultClient
            .get(vUrls.HR_SUGUB + setParams, {
                headers: {
                    authorization: 'Token ' + token
                },

            })
            .then((response) => {
                return response.data
            })
            .catch(error => {
                console.log('getSugub error', error);
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });
    }else {
        return defaultClient
            .get(vUrls.HR_SUGUB)
            .then((response) => {
                return response.data
            })
            .catch(error => {
                console.log('getSugub error', error);
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });
    }
}
// 수급요청
export function postSugub(formValues, dispatch, props) {
    const token = getUserToken(store.getState());
    const reqSugubUrl = apiUrls.SUGUB;

    if (formValues.sugub_jikjong_low) {
        //직종(소) [ {label: '', value: ''}, ...] 형태 => ["AA0103000", ... ]
        if (typeof formValues.sugub_jikjong_low[0] === 'object'){
            const jikjong_low = formValues.sugub_jikjong_low.map((list) => {
                //return list['value']
                return list['code_id'] //이준상 수정
            });
            formValues.sugub_jikjong_low = jikjong_low;
        }
    }

    if (typeof formValues.salary_start === 'string') {
        formValues.salary_start = Number(formValues.salary_start.replaceAll(',', ''));
    }
    if (typeof formValues.salary_end === 'string') {
        formValues.salary_end = Number(formValues.salary_end.replaceAll(',', ''));
    }

    if(typeof formValues.companyprofile === 'object' ){
        formValues.companyprofile = formValues.companyprofile.id
    }
    //이준상 추가 시작
    if (typeof formValues.chae_cd === 'object'){
        formValues.chae_cd = formValues.chae_cd.code_id
    }
    if (typeof formValues.education_cd === 'object'){
        formValues.education_cd = formValues.education_cd.code_id
    }
    if (typeof formValues.salary_gubun === 'object'){
        formValues.salary_gubun = formValues.salary_gubun.code_id
    }
    if (typeof formValues.sugub_career_gb === 'object'){
        formValues.sugub_career_gb = formValues.sugub_career_gb.code_id
    }
    if (typeof formValues.sugub_gender === 'object'){
        formValues.sugub_gender = formValues.sugub_gender.code_id
    }
    if (typeof formValues.sugub_jikjong_mid === 'object'){
        formValues.sugub_jikjong_mid = formValues.sugub_jikjong_mid.code_id
    }
    if (typeof formValues.sugub_jikjong_top === 'object'){
        formValues.sugub_jikjong_top = formValues.sugub_jikjong_top.code_id
    }
    if (typeof formValues.sugub_status === 'object'){
        formValues.sugub_status = formValues.sugub_status.code_id
    }
    //이준상 추가 끝
    return axios
        .post(reqSugubUrl, formValues, {
            headers:{
                authorization: 'Token ' + token
            }
        })
        .then( (response) => {
            Alert.success('수급이 정상적으로 등록되었습니다.');
            dispatch(getCompanyProfile())
        })
        .catch(error => {
            console.log('error', error);
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}

// 수급수정
export function updateSugub(formValues, dispatch, props) {

    const token = getUserToken(store.getState());
    const reqSugubUrl = apiUrls.SUGUB;

    if (typeof formValues.chae_cd === 'object'){
        formValues.chae_cd = formValues.chae_cd.code_id
    }
    if (typeof formValues.chae_gigan_type === 'object'){
        if(formValues.chae_gigan_type) formValues.chae_gigan_type = formValues.chae_gigan_type.code_id
    }
    if (typeof formValues.education_cd === 'object'){
        formValues.education_cd = formValues.education_cd.code_id
    }
    if (typeof formValues.sugub_gender === 'object'){
        if(formValues.sugub_gender) formValues.sugub_gender = formValues.sugub_gender.code_id
    }
    if (typeof formValues.sugub_career_gb === 'object'){
        formValues.sugub_career_gb = formValues.sugub_career_gb.code_id
    }
    if (typeof formValues.sugub_status === 'object'){
        formValues.sugub_status = formValues.sugub_status.code_id
    }
    if (typeof formValues.hire_type === 'object'){
        if(formValues.hire_type) formValues.hire_type = formValues.hire_type.code_id
    }
    if (typeof formValues.sugub_jikjong_top === 'object'){
        formValues.sugub_jikjong_top = formValues.sugub_jikjong_top.code_id
    }
    if (typeof formValues.sugub_jikjong_mid === 'object'){
        formValues.sugub_jikjong_mid = formValues.sugub_jikjong_mid.code_id
    }
    if (typeof formValues.salary_gubun === 'object'){ // 급여구분(AI)
        formValues.salary_gubun = formValues.salary_gubun.code_id
    }
    if (typeof formValues.work_type === 'object'){ //근무형태(AG)
        if(formValues.work_type) formValues.work_type = formValues.work_type.code_id
    }
    if (typeof formValues.cont_chg_gb === 'object'){ // 전환여부
        if(formValues.cont_chg_gb) formValues.cont_chg_gb = formValues.cont_chg_gb.code_id
    }
    if (formValues.sugub_jikjong_low) {
        // 직종(소) [ {label: '', value: ''}, ...] 형태 => ["AA0103000", ... ]
        if (typeof formValues.sugub_jikjong_low[0] === 'object'){

            const jikjong_low = formValues.sugub_jikjong_low.map((list) => {
                if(Object.keys(list).includes('code_id')){
                    return list['code_id']
                } else{
                    return list['value']
                }
            });
            console.log('jikjong_low', jikjong_low)
            formValues.sugub_jikjong_low = jikjong_low;
        }
    }
    // 수급마감일
    if(formValues.sugub_end_dt){
        formValues.sugub_end_dt = moment(formValues.sugub_end_dt).format('YYYY-MM-DD');
    }

    // if(typeof formValues.user === 'object' ){
    //     formValues.user = formValues.user.id
    // }
    if(typeof formValues.companyprofile === 'object' ){
        formValues.companyprofile = formValues.companyprofile.id
    }
    if(formValues.id){
        return axios
            .patch(reqSugubUrl + formValues.id + '/', formValues, {
                headers:{
                    authorization: 'Token ' + token
                }
            })
            .then( (response) => {
                Alert.success('수급이 정상적으로 수정되었습니다.');
                dispatch(getCompanyProfile());
                // history.push("/Company/Sugub/CC0100000")
            })
            .catch(error => {
                console.log('error', error.response.data);
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });
    }else{
        return axios
            .post(reqSugubUrl, formValues, {
                headers:{
                    authorization: 'Token ' + token
                }
            })
            .then( (response) => {
                Alert.success('수급이 정상적으로 등록되었습니다.');
                dispatch(getCompanyProfile())
            })
            .catch(error => {
                console.log('error', error);
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });
    }

}

// 수급요청 & 회사정보
export function updateSugubCompany(formValues, dispatch, props) {
    const token = getUserToken(store.getState());
    if(formValues.custname) {
        postCompanyProfile(formValues).then(()=>{
            return postSugub(formValues, dispatch)
                .then(()=>{
                    history.push('/Company/Sugub')
                })
        })
    }

    /** 회사정보 업데이트
     return updateCompanyProfile(formValues, dispatch)
     .then((response)=>{

            return postSugub(formValues, dispatch);

        });
     */
}

// 수급삭제
export function deleteSugub(id, dispatch) {
    const token = getUserToken(store.getState());
    return axios
        .delete(apiUrls.SUGUB + id + '/', {
            headers: {
                authorization: 'Token ' + token
            }
        })
        .then( (res) => {
            Alert.error('삭제되었습니다.');
            return res
        })
        .catch( error => {
            console.log('deleteSugub error', error);
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        })
}

// 채용공고 요청
export function updateJobAd(formValues) {
    // console.log( 'updateJobAd', formValues );
    const token = getUserToken(store.getState());
    return axios
        .post(apiUrls.JOB_ADVERTISE, formValues, {
            headers: {
                authorization: 'Token ' + token
            }
        })
        .then( (response) => {
            Alert.success('공고게시가 요청되었습니다.');
            history.push('/Company/Sugub')
            // todo 서비스 중지(구직자용)
            // history.push(`/Company/JobQuestion/${response.data.id}`);
        })
        .catch(error => {
            console.log('error', error);
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}

// 채용공고별 질문/답변
export function updateJobQuestion(formValues) {
    console.log('formValues', formValues)
    if(formValues.job_answer_comment && typeof formValues.job_answer_comment === 'object'){
        // console.log('?')
        // return false
    }
    return axios
        .patch(AuthUrls.JOB_QUESTION + formValues.id + '/', formValues)
        .then((res)=>{
            // store.dispatch(notifSend({
            //     message: "저장되었습니다.",
            //     kind: "info",
            //     dismissAfter: 1000
            // }));
            Alert.success('저장되었습니다.');
            // history.push("/Company/Sugub/CC0100000");
        })
        .then(()=>{
        })
        .catch(error => {
            console.log('error', error);
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}


// util functions
function processServerError(error) {
    return  Object.keys(error).reduce(function(newDict, key) {
        if (key === "non_field_errors") {
            newDict["_error"].push(error[key]);
        } else if (key === "token") {
            // token sent with request is invalid
            newDict["_error"].push("The link is not valid any more.");
        } else {
            newDict[key] = error[key];
        }

        return newDict
    }, {"_error": []});
}
