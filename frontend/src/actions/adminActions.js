import axios from "axios";
import {initialize, SubmissionError} from 'redux-form';
import history from "../utils/historyUtils";
import {actions as notifActions} from 'redux-notifications';
import {AuthTypes} from "../constants/actionTypes";
import {apiUrls, AuthUrls, vUrls} from "../constants/urls";
import store from "../store";
import {getUserToken} from "../utils/authUtils";
import {applyAdvertise, updateHrSpecial, updateUserSpecial} from "./userActions";
import defaultClient from "../utils/defaultClient";
import {getAlarm} from "./alarmActions";
import moment from "moment";
import {getCompanyProfile} from "./authActions";
import {Alert} from "rsuite";

const {notifSend} = notifActions;

// formValues => FormData()
const getFormData = object => Object.keys(object).reduce((formData, key) => {
    console.log(typeof object[key] === 'object')
    console.log(object[key],key)
    if (typeof object[key] === 'object') {
        formData.append(key, object[key].code_id);
    } else{
        formData.append(key, object[key]);
    }
    return formData;
}, new FormData());


// HR회사 프로필 등록/수정
export function updateHrStatusCd(id,data) {
    const token = getUserToken(store.getState());
    return axios
        .patch(apiUrls.HR_PROFILE + id + '/', { status_cd: data }, {
            headers: {
                authorization: 'Token ' + token,
            }
        })
        .then((response) => {
            Alert.success('회사 정보가 정상적으로 수정되었습니다.');
        })
        .catch((error) => {
            console.log('updateHrProfile error', error);
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}
export function updateHrProfile(formValues, dispatch) {
    console.log('updateHrProfile formValues', formValues)

    const token = getUserToken(store.getState());
    // if (typeof formValues.company_form === 'object'){
    //         formValues.company_form = formValues.company_form.code_id
    // }
    if (typeof formValues.status_cd === 'object'){
            formValues.status_cd = formValues.status_cd.code_id
    }
    if (typeof formValues.cmp_manager === 'object'){
        console.log(formValues.cmp_manager.value)
            formValues.cmp_manager = formValues.cmp_manager.value
    }
    // if (typeof formValues.custname === 'object') {
    //     formValues.custname = formValues.custname['label'];
    // }
    // if (formValues.manager_phone) {
    //     formValues.manager_phone = formValues.manager_phone.replace(/-/gi, '')
    // }
    // if (typeof formValues.status_cd === 'object') {
    //     formValues.status_cd = formValues.status_cd
    // }
    // let formData = getFormData(formValues)

    return axios
        .patch(apiUrls.HR_PROFILE + formValues.id + '/', formValues, {
            headers: {
                authorization: 'Token ' + token,
            }
        })
        .then((response) => {
            Alert.success('회사 정보가 정상적으로 수정되었습니다.');
            history.goBack();
        })
        .catch((error) => {
            console.log('updateHrProfile error', error);
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });

}

export function updateCompanyProfile(formValues, dispatch, props) {
    const token = getUserToken(store.getState());

    // let formData = getFormData(formValues)
    console.log(formValues);
    // if (typeof formValues.company_form === 'object') {
    //     if(formValues.company_form) formValues.company_form = formValues.company_form.code_id;
    // }
    if (typeof formValues.status_cd === 'object') {
        if(formValues.status_cd) formValues.status_cd = formValues.status_cd.code_id;
    }
    // delete formValues.company_image;
    //     delete formValues.company_logo;


    if (typeof formValues.cmp_manager === 'object'){
        console.log(formValues.cmp_manager.value)
            formValues.cmp_manager = formValues.cmp_manager.value
    }

    // 대표이미지
    if (formValues.company_image){
        delete formValues.company_image;
    }
    // 로고
    if (formValues.company_logo){
        delete formValues.company_logo;
    }

    return axios
        .patch(apiUrls.CUSTOM_COMPANY_PROFILE + formValues.id + '/', formValues, {
            headers: {
                authorization: 'Token ' + token
            }
        })
        .then((response) => {
            console.log("1.updatecompany profile res: ", response);
            Alert.success('회사 정보가 정상적으로 수정되었습니다.');
            history.goBack();
        })
        .catch((error) => {
            console.log('1.updatecomapnyProfile error', error)
            // const processedError = processServerError(error.response.data);
            // throw new SubmissionError(processedError);
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
}
// util functions
function processServerError(error) {

    return Object.keys(error).reduce(function (newDict, key) {
        console.log('error', key)
        if (key === "non_field_errors") {
            newDict["_error"].push("아이디가 존재하지 않거나 비밀번호가 일치하지 않습니다.");
        } else if (key === "token") {
            // token sent with request is invalid
            newDict["_error"].push("The link is not valid any more.");
        } else {
            // newDict[key] = error[key];
            newDict['_error'] = error[key];
        }

        console.log('newDict:1:',newDict)

        return newDict
    }, {"_error": []});
}