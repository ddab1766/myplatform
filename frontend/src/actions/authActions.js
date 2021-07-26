import axios from "axios";
import {initialize, SubmissionError} from 'redux-form';
import history from "../utils/historyUtils";
import {actions as notifActions} from 'redux-notifications';
import {AuthTypes, CommonTypes, SugubTypes} from "../constants/actionTypes";
import {apiUrls, AuthUrls, vUrls} from "../constants/urls";
import store from "../store";
import {getUserToken} from "../utils/authUtils";
import {applyAdvertise, updateHrSpecial, updateUserSpecial} from "./userActions";
import defaultClient from "../utils/defaultClient";
import {getAlarm} from "./alarmActions";
import {getCoworker} from "./coworkerActions";
import {Alert} from "rsuite";

const {notifSend} = notifActions;

export function authLogin(token) {
    return {
        type: AuthTypes.LOGIN,
        payload: token
    };
}

export function setSugubList(payload) {
    return {
        type: AuthTypes.SUGUB_LIST,
        payload: payload
    };
}

export function loginNaverUser(obj) {
    return axios.post(AuthUrls.NAVER_LOGIN, {
        access_token: obj.response.access_token
    })
        .then((response) => {
            console.log(response);
            const token = response.data.key;
            store.dispatch(authLogin(token));
            localStorage.setItem("token", token);
            history.push("/");
        })
        .catch(error => {
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        })
}


export function loginKakaoUser(obj) {
    return axios.post(AuthUrls.KAKAO_LOGIN, {
        access_token: obj.response.access_token
    })
        .then((response) => {
            console.log(response);
            const token = response.data.key;
            store.dispatch(authLogin(token));
            localStorage.setItem("token", token);
            history.push("/");
        })
        .catch(error => {
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        })
}

export function loginFacebookUser(obj) {
    return axios.post(AuthUrls.FACEBOOK_LOGIN, {
        access_token: obj.accessToken
    })
        .then((response) => {
            const token = response.data.key;
            store.dispatch(authLogin(token));
            localStorage.setItem("token", token);
            store.dispatch(getUserProfile());
            // history.push("/");
        })
        .catch(error => {
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        })
}

// Google 로그인
export function loginGoogleUser(obj) {
    return axios.post(AuthUrls.GOOGLE_LOGIN, {
        access_token: obj.accessToken
    })
        .then((response) => {
            const token = response.data.key;
            store.dispatch(authLogin(token));
            localStorage.setItem("token", token);
            store.dispatch(getUserProfile());
            // history.push("/");
        })
        .catch(error => {
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        })
}

export function postCompanyProfile(formValues) {
    const token = getUserToken(store.getState());

    console.log('postCompanyProfile formValues1', formValues)
    let companyFormValues = new FormData();
    if (formValues.phone) {
        formValues.phone = formValues.phone.replace(/-/gi, '')
    }
    // companyFormValues.append('manager_phone', formValues.manager_phone);
    companyFormValues.append('company_recuser', formValues.recuser ? formValues.recuser : 1);
    if (typeof formValues.custname === 'object') {
        if(formValues.custname['custname1']) {
            companyFormValues.append('custname', formValues.custname['custname1']);
        }else{ // create select
            companyFormValues.append('custname', formValues.custname['label']);
        }
    }else{
        companyFormValues.append('custname', formValues.custname);
    }
    if (formValues.custid) companyFormValues.append('custid', formValues.custid);
    if (formValues.emp_count) companyFormValues.append('emp_count', formValues.emp_count);
    if (formValues.gross_total) companyFormValues.append('gross_total', formValues.gross_total);
    if (formValues.homepage) companyFormValues.append('homepage', formValues.homepage);

    return axios
        .post(apiUrls.CUSTOM_COMPANY_PROFILE, companyFormValues, {
            headers: {
                authorization: 'Token ' + token
            }
        })
        .then((response)=>{
            console.log('postCompanyProfile!')
            Alert.success('기업정보가 등록되었습니다.');
            console.log('response?', response)
            store.dispatch({
                type: AuthTypes.UPDATE_COMPANYPROFILE,
                payload: response.data.id
            });
            store.dispatch(setCompanyProfile(response.data))
            store.dispatch(getCoworker());
            return response.data
        })
        .catch(error =>{
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        })
}

// HR 회원가입 + 전문직종 등록 form
export function hrSignupSpecialFormSubmit(formValues, dispatch, props){
    return signupUser(formValues, dispatch, props)
        .then((response)=>{
            console.log('hrSignupSpecialFormSubmit response', response)
            return hrSpecialFormSubmit(formValues, dispatch, props)
        })
}

// HR 전문직종 Wizard Form
export function hrSpecialFormSubmit(formValues, dispatch, props) {
    return axios
        .post(AuthUrls.LOGIN, formValues)
        .then((response) => {
            const token = response.data.key;
            dispatch(authLogin(token));
            localStorage.setItem("token", token);
            // dispatch(getUserProfile());
            return token
        })
        .then(()=> {
            updateHrProfile(formValues, dispatch)
                .then(()=>{
                    props.nextPage();
                    return updateHrSpecial(formValues, dispatch)
                        .then(()=>{
                            history.push('/Hr/Profile')
                        })
                });
        })
}


export function loginUser(formValues, dispatch, props) {
    const loginUrl = AuthUrls.LOGIN;

    /** (개인)로그인 + 유저프로필 + 유저스페셜 등록 */
    if (props.form === 'signup_wizard') {
        return axios
        /** 로그인*/
            .post(loginUrl, formValues)
            .then((response) => {
                const token = response.data.key;
                dispatch(authLogin(token));
                localStorage.setItem("token", token);
                // history.push('/User/profile')
                // return response
            })
            /** 유저프로필 수정*/
            .then(() => {
                const token = getUserToken(store.getState());
                // phone '-' 제거
                if (formValues.phone) {
                    formValues.phone = formValues.phone.replace(/-/gi, '')
                }
                return axios
                    .patch(AuthUrls.USER_PROFILE, formValues, {
                        headers: {
                            authorization: 'Token ' + token
                        }
                    })
                    .then((response) => {
                        /** 유저스페셜 수정*/
                        formValues.user = response.data;
                        return updateUserSpecial(formValues, dispatch)
                    })
            })
            .then(()=> history.push("/User/profile"))
            .catch(error => {
                console.log('signup_wizard err:', error)
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });
    }

    // HR 로그인 + HR프로필 + HR스페셜
    else if (props.form === 'hr_profile_wizard') {
        return axios
            .post(loginUrl, formValues)
            .then((response) => {
                const token = response.data.key;
                dispatch(authLogin(token));
                localStorage.setItem("token", token);
                dispatch(getUserProfile());
                return token
            })
            .then((token)=> {
                return axios
                    .patch(AuthUrls.USER_PROFILE, formValues, {
                        headers: {
                            authorization: 'Token ' + token
                        }
                    })
                    .then((response)=>{
                        formValues.user = response.data;
                        updateHrProfile(formValues, dispatch)
                            .then(()=>{
                                return updateHrSpecial(formValues, dispatch)
                            });
                    })
            })
    }
    // 로그인
    else if (props.form === 'login') {
        console.log('login!')
        return axios.post(loginUrl, formValues).then((response) => {
            const token = response.data.key;
            dispatch(authLogin(token));
            localStorage.setItem("token", token);
            dispatch(getUserProfile(props));
            dispatch(getCoworker);
            const myInterval = () => {
                setTimeout(()=>{
                    if(store.getState().auth.user && (store.getState().auth.hr || store.getState().auth.user.is_admin)){
                        if (props.location.state) {
                            history.push(props.location.state.from.pathname);
                        } else if (props.location.pathname.match('/User')) {
                            history.push('/User')
                        } else if (props.location.pathname.match('/Company')) {
                            history.push('/Company')
                        } else if (props.location.pathname.match('/auth')) {
                            history.push('/Mng')
                        } else {
                            history.push('/')
                        }
                    } else if(store.getState().auth.user && (store.getState().auth.company && !store.getState().auth.user.is_admin)){
                        history.push('/Mng')
                    }
                    else{
                        myInterval();
                    }
                },500)
                // if(store.getState().auth.hr === null){
                //         alert('파트너스 정보가 없습니다. 기업정보를 입력해 주세요.');
                //         // history.push('/Hr')
                //     }
            }
            myInterval();
        }).catch(error => {
            // console.log(error)
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
        // 팝업 로그인
    } else if (props.form === 'popup_login') {
        console.log('popup_login!')
        return axios.post(loginUrl, formValues).then((response) => {
            const token = response.data.key;
            dispatch(authLogin(token))
            localStorage.setItem("token", token);
            dispatch(getUserProfile());
            dispatch(getCoworker());
        }).catch(error => {
            console.log('login error')
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
    }
}

export function logoutUser() {
    localStorage.removeItem("token");
    // store.dispatch(notifSend({
    //     message: "안전하게 로그아웃 되었습니다.",
    //     kind: "info",
    //     dismissAfter: 3000
    // }));
    Alert.success('안전하게 로그아웃 되었습니다.');

    // history.push('/');
    return {
        type: AuthTypes.LOGOUT
    };
}

export function signupUser(formValues, dispatch, props) {
    const signupUrl = AuthUrls.SIGNUP;
    let signup = {};
    // 회원가입 + 유저프로필 + 유저스페셜 등록
    if (props.form === 'signup_wizard') {
        signup.email = formValues.email;
        signup.password1 = formValues.password1;
        signup.password2 = formValues.password2;
        signup.recuser = formValues.recuser;
        formValues.password = formValues.password1;
        if (formValues.phone) {
            formValues.phone = (formValues.phone).replace(/-/gi, '')
        }
        if (formValues.date_of_birth) {
            formValues.date_of_birth = formValues.date_of_birth.replace(/-/gi, '')
        }
        return axios
            .post(signupUrl, signup)
            .then(() => {
                loginUser(formValues, dispatch, props)
                //return response
            })
            .catch((error) => {
                console.log('signupUser error')
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            })

    }
    //회원가입 + 기업프로필 + 수급 등록
    else if (props.form === 'sugub_wizard') {
        let signup = {};
        signup.email = formValues.email;
        signup.nickname = formValues.nickname;
        signup.phone = formValues.phone;
        signup.password1 = formValues.password1;
        signup.password2 = formValues.password2;
        signup.recuser = formValues.recuser;
        formValues.password = formValues.password1;
        console.log('signup', JSON.stringify(signup))
        return axios
            .post(signupUrl, signup)
            .then((response) => {
                const token = response.data.key;
                console.log(response)
                dispatch(authLogin(token))
                dispatch(getUserProfile(props))
                // loginUser(formValues, dispatch, props)
                return response.data
            })
            .catch((error) => {
                console.log('signupUser company error')
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            })
        // HR 회원가입
    } else if (props.form === 'hr_profile_wizard') {
        let signup = {};
        signup.email = formValues.email;
        signup.nickname = formValues.nickname;
        signup.phone = formValues.phoen;
        signup.password1 = formValues.password1;
        signup.password2 = formValues.password2;
        signup.recuser = formValues.recuser;
        formValues.password = formValues.password1;
        return axios
            .post(signupUrl, signup)
            .then((response)=>{
                // loginUser(formValues, dispatch, props)
                return response.data
            })
        // hr, company 페이지 회원가입
    } else if (props.form === 'signup') {
        // console.log('signup formValues:', props.match.path.indexOf('Company'))

        return axios
            .post(signupUrl, formValues)
            .then((response) => {
                const token = response.data.key;
                console.log(response)
                dispatch(authLogin(token))
                dispatch(getUserProfile(props))
                localStorage.setItem("token", token);
                if(props.match.path.indexOf('Company') !== -1){
                    history.push("/Company/signup_done");
                } else if(props.match.path.indexOf('Hr') !== -1){
                    history.push("/Hr/signup_done");
                } else{
                    history.push('/Company/signup_done')
                }
            })
            .catch((error) => {
                console.log('singup err:', error)
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });
        // 팝업 회원가입
    } else if (props.form === 'popup_signup_wizard') {
        let applyFormValues = new FormData();
        if (formValues.phone) {
            formValues.phone = formValues.phone.replace(/-/gi, '')
        };
        if (formValues.date_of_birth){
            formValues.date_of_birth = formValues.date_of_birth.replace(/-/gi, '')
        };
        let signup = {};
        signup.email = formValues.email;
        signup.password1 = formValues.password1;
        signup.password2 = formValues.password2;
        signup.recuser = formValues.recuser;
        return axios
            .post(signupUrl, signup)
            .then((response) => {
                const token = response.data.key;
                dispatch(authLogin(token))
                localStorage.setItem("token", token);
                return token
            })
            .then((token) => {
                return axios
                    .patch(AuthUrls.USER_PROFILE, formValues, {
                        headers: {
                            authorization: 'Token ' + token
                        }
                    })
                    .then((response) => {
                        console.log('response:', response)
                        if (formValues.jobInfo){
                            applyFormValues.append('jobadvertise',formValues.jobInfo[0].id);
                            applyFormValues.append('user', response.data.id);
                            applyFormValues.append('applied_status', 'BW1000000'); // 이력서 미등록
                        }
                        return response
                    })
            })
            .then((response)=>{
                console.log('applyFormValues:', applyFormValues)
                applyAdvertise(applyFormValues) // 채용 지원
            })
            .catch((error) => {
                console.log('popup_signup_wizard err:', error)
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });
    }
}
export function updateCPImage(data, field, id, dispatch, props) {
    let formValues = new FormData();
    formValues.append(field, data, data.name);

    defaultClient
        .patch(apiUrls.CUSTOM_COMPANY_PROFILE + id + '/', formValues, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(({ data }) => {
            store.dispatch(setCompanyProfile(data))
        })
        .catch(err => console.log(err));

}

// formValues => FormData()
const getFormData = object => Object.keys(object).reduce((formData, key) => {
    if(key === 'service_address') {
        for (var i = 0; i < object['service_address'].length; i++) {
            formData.append("service_address", object['service_address'][i])
        }
    }else if(key === 'services'){
        for(var i=0; i < object['services'].length; i++){
            formData.append("services", object['services'][i])
        }
    }else if(key === 'hrfee') {
        for (var i = 0; i < object['hrfee'].length; i++) {
            console.log('object[\'hrfee\'][i]', object['hrfee'][i])
            formData.append("hrfee", object['hrfee'][i])
        }
    }else {
        formData.append(key, object[key]);
    }
    return formData;
}, new FormData());


export function updateHrProfile(formValues, dispatch) {
    console.log('updateHrProfile formValues', formValues)

    const token = getUserToken(store.getState());
    delete formValues.status_cd;
    if (typeof formValues.custname === 'object') {
        if(formValues.custname['custname1']) {
            formValues.custname = formValues.custname['custname1'];
        }else{
            formValues.custname = formValues.custname['label'];
        }
    }
    if (formValues.manager_phone) {
        formValues.manager_phone = formValues.manager_phone.replace(/-/gi, '')
    }
    if(!formValues.cmp_manager) delete formValues.cmp_manager;
    if(!formValues.since) delete formValues.since;

    if (typeof formValues.cust_gubun === 'object') {
        formValues.cust_gubun = formValues.cust_gubun.code_id
    }

    if (formValues.service_address) {
        // [ {label: '', value: ''}, ...] 형태 => ["AA0103000", ... ]
        if (typeof formValues.service_address[0] === 'object'){
            const service_address = formValues.service_address.map((list) => {
                return list['code_id']
            });
            formValues.service_address = service_address;
        }
    }

    if (formValues.services) {
        // [ {label: '', value: ''}, ...] 형태 => ["AA0103000", ... ]
        if (typeof formValues.services[0] === 'object'){
            const services = formValues.services.map((list) => {
                return list['code_id']
            });
            formValues.services = services;
        }
    }

    let hrfee = [];
    // 제공 서비스
    if(formValues.services && formValues.services.length > 0){
        // 파견 수수료
        if(formValues.services.includes('AC0100000') && formValues.hrfee_AC0100000){
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
        if(formValues.services.includes('AC0200000') && formValues.hrfee_AC0200000){
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
        if(formValues.services.includes('AC0300000') && formValues.hrfee_AC0300000){
            formValues.hrfee_AC0300000.map( item => {
                let temp = {};
                temp['fee_gubun'] =  'AC0300000';
                if(typeof item.start !== 'number'){
                    temp['start'] =  Number(item.start.replaceAll(',', ''));
                    temp['end'] =  Number(item.end.replaceAll(',', ''));
                }else {
                    temp['start'] =  item.start;
                    temp['end'] =  item.end;
                }

                temp['fee_start'] = item.fee_start;
                hrfee.push(temp);
            })
        }
        // 헤드헌팅 수수료
        if(formValues.services.includes('AC0400000') && formValues.hrfee_AC0400000){
            formValues.hrfee_AC0400000.map( item => {
                let temp = {};
                temp['fee_gubun'] =  'AC0400000';
                if(typeof item.start !== 'number'){
                    temp['start'] =  Number(item.start.replaceAll(',', ''));
                    temp['end'] =  Number(item.end.replaceAll(',', ''));
                }else {
                    temp['start'] =  item.start;
                    temp['end'] =  item.end;
                }
                temp['fee_start'] = Number(item.fee_start);
                hrfee.push(temp);
            })
        }
    }

    formValues.hrfee = hrfee;

    // let formData = getFormData(formValues)
    // if(typeof formValues.company_logo === 'object'){
    //     formData.append('company_logo', formValues.company_logo);
    // }

    // FormData의 값 확인
    // for (var pair of formData.entries()) { console.log(pair[0]+ ', ' + pair[1]); }

    if(token){
        if(formValues.id) {
            return axios
                .patch(apiUrls.HR_PROFILE + formValues.id + '/', formValues, {
                    headers: {
                        authorization: 'Token ' + token,
                    }
                })
                .then((response) => {
                    Alert.success('회사 정보가 정상적으로 수정되었습니다.');
                    dispatch(getUserProfile());
                    // 이미지 formData..
                    if(typeof formValues.company_logo === 'object'){
                        let formData = getFormData(formValues);
                        formData.append('company_logo', formValues.company_logo);
                        axios.patch(apiUrls.HR_PROFILE + formValues.id + '/', formData,{
                            headers: {
                                authorization: 'Token ' + token,
                                'content-type': 'multipart/form-data'
                            }
                        })
                    }
                })
                .catch((error) => {
                    console.log('updateHrProfile error', error);
                    const processedError = processServerError(error.response.data);
                    throw new SubmissionError(processedError);
                });
        }else{

            // return axios
            //     .post(apiUrls.HR_PROFILE, formData, {
            //         headers: {
            //             authorization: 'Token ' + token,
            //             'content-type': 'multipart/form-data'
            //         }
            //     })
            //     .then((response) => {
            //         Alert.success('회사 정보가 정상적으로 등록되었습니다.');
            //         // console.log('res', response)
            //         // dispatch(setHrProfile(response.data));
            //         dispatch(getUserProfile());
            //         dispatch(getCoworker());
            //     })
            //     .catch((error) => {
            //         console.log('updateHrProfile error', error);
            //         const processedError = processServerError(error.response.data);
            //         throw new SubmissionError(processedError);
            //     });
        }
    }
}

export function updateCompanyProfile(formValues, dispatch, props) {
    // console.log('updateCompanyProfile', formValues)
    const token = getUserToken(store.getState());

    if (typeof formValues.custname === 'object') {
        if(formValues.custname['custname1']) {
            formValues.custname = formValues.custname['custname1'];
        }else{
            formValues.custname = formValues.custname['label'];
        }
    }

    if (typeof formValues.status_cd === 'object') {
        if(formValues.status_cd) formValues.status_cd = formValues.status_cd.code_id;
    }
    if (formValues.manager_phone) {
        formValues.manager_phone = formValues.manager_phone.replace(/-/gi, '')
    }
    if (typeof formValues.cmp_manager === 'object') {
        if(formValues.cmp_manager) formValues.cmp_manager = formValues.cmp_manager.id;
    }

    if(formValues.emp_count === null) delete formValues.emp_count;
    if(formValues.gross_total === null) delete formValues.gross_total;

    // // 대표이미지
    // if (formValues.company_image){
    //     delete formValues.company_image;
    // }
    // // 로고
    // if (formValues.company_logo){
    //     delete formValues.company_logo;
    // }
    // console.log('updateCompanyProfile token', token)
    let formData = getFormData(formValues);
    if(typeof formValues.company_logo === 'object'){
        formData.append('company_logo', formValues.company_logo);
    }

    // formValues.user = [formValues.user.id];
    if(formValues.id) {
        return axios
        // .patch(apiUrls.CUSTOM_COMPANY_PROFILE + formValues.id + '/', formValues, {
            .patch(apiUrls.CUSTOM_COMPANY_PROFILE + formValues.id + '/', formData, {
                headers: {
                    authorization: 'Token ' + token,
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response) => {
                console.log("1.updatecompany profile res: ", response);
                Alert.success('회사 정보가 정상적으로 수정되었습니다.');
                // dispatch(setCompanyProfile(response.data));
                dispatch(getCompanyProfile());
                // dispatch({
                //     type: AuthTypes.COMPANY_PROFILE,
                //     payload: response.data
                // })
                dispatch(initialize('companyupdate', {}));
                // history.goBack();
            })
            .catch((error) => {
                console.log('1.updatecomapnyProfile error', error)
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });
    }else{
        return axios
            .post(apiUrls.CUSTOM_COMPANY_PROFILE, formValues, {
                headers: {
                    authorization: 'Token ' + token
                }
            })
            .then((response) => {
                Alert.success('회사 정보가 정상적으로 등록되었습니다.');
                // dispatch(setCompanyProfile(response.data));
                dispatch(initialize('companyupdate', {}));
                dispatch(getCompanyProfile());
                return response.data
            })
            .catch((error) => {
                console.log('2.updatecomapnyProfile error', error)
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });
    }
}

function setUserProfile(payload) {
    return {
        type: AuthTypes.USER_PROFILE,
        payload: payload
    };
}

function setCompanyProfile(payload) {
    return {
        type: AuthTypes.COMPANY_PROFILE,
        payload: payload
    };
}

function setHrProfile(payload) {
    return {
        type: AuthTypes.HR_PROFILE,
        payload: payload
    };
}

function setRecUser(payload) {
    return {
        type: AuthTypes.REC_USER,
        payload: payload
    }
}

function setRecCompany(payload) {
    return {
        type: AuthTypes.REC_COMPANY,
        payload: payload
    }
}

function setUrlKey(payload) {
    return {
        type: AuthTypes.URL_KEY,
        payload: payload
    }
}

// 추천한 유저
export function getRecUser(recUser) {
    console.log('getRecUser : ', recUser);
    return function (dispatch) {
        dispatch(setRecUser(recUser))
    }
}

// 추천한기업
export function getRecCompany(recCompany) {
    console.log('getRecCompany : ', recCompany);
    return function (dispatch) {
        dispatch(setRecCompany(recCompany))
    }
}

// URL KEY
export function getUrlKey(urlkey) {
    return function (dispatch) {
        dispatch(setUrlKey(urlkey))
    }
}

export function getUserProfile() {
    // console.log('getUserProfile')
    return function (dispatch) {
        const token = getUserToken(store.getState());
        if (token) {
            defaultClient.get(AuthUrls.USER_PROFILE, {
                headers: {
                    authorization: 'Token ' + token
                }
            }).then(response => {
                dispatch(setUserProfile(response.data));
                dispatch(getAlarm())
                // 일반기업
                if (response.data.companyprofile.length > 0) {
                    return defaultClient.get(vUrls.CUSTOM_COMPANY_PROFILE, {
                        headers: {
                            authorization: 'Token ' + token
                        },
                        params: {
                            user: response.data.id
                        }
                    }).then((res) => {
                        dispatch(setCompanyProfile(res.data[0]))
                    }).catch((error) => {
                        console.log(error);
                        const processedError = processServerError(error.response.data);
                        throw new SubmissionError(processedError);
                    });
                    // HR기업
                }else if(response.data.hrprofile.length > 0){
                    // dispatch(setHrProfile(response.data.hrprofile[0]))
                    return defaultClient.get(apiUrls.HR_PROFILE +  response.data.hrprofile[0] + '/', {
                        headers: {
                            authorization: 'Token ' + token
                        }
                        // ,
                        // params: {
                        //     user: response.data.id
                        // }
                    }).then((response) => {
                        console.log('getUserProfile response.data', response.data)
                        dispatch(setHrProfile(response.data))

                    }).catch((error) => {
                        console.log(error);
                        const processedError = processServerError(error.response.data);
                        throw new SubmissionError(processedError);
                    });
                }

            }).catch((error) => {
                console.log("getUserProfile error:", error);
                const processedError = processServerError(error.response.data);
                // throw new SubmissionError(processedError);
                // TODO: send notification and redirect
                alert(processedError._error)
                dispatch(logoutUser())
                // history.push('/')
            });
        } else {
            //alert('로그인이 필요한 서비스입니다.');
        }
    };
}

// export function getCompanyProfile(user) {
//     return function (dispatch) {
//         const token = getUserToken(store.getState());
//         console.log('getCompanyProfile user:', user)
//         axios.get(AuthUrls.CUSTOM_COMPANY_PROFILE_LIST, {
//             // todo 권한 설정
//             headers: {
//                 authorization: 'Token ' + token
//             },
//             params: {
//                 user: user
//             }
//         })
//             .then((res) => {
//                 dispatch(setCompanyProfile(res.data[0]))
//             }).catch((error) => {
//             console.log(error);
//             const processedError = processServerError(error.response.data);
//             throw new SubmissionError(processedError);
//         });
//
//     };
// }

export function getCompanyProfile() {
    return function (dispatch) {
        const token = getUserToken(store.getState());
        if (token) {
            axios.get(AuthUrls.USER_PROFILE, {
                headers: {
                    authorization: 'Token ' + token
                }
            }).then(response => {
                axios.get(vUrls.CUSTOM_COMPANY_PROFILE, {
                    // todo 권한 설정
                    headers: {
                        authorization: 'Token ' + token
                    },
                    params: {
                        user: response.data.id
                    }
                })
                    .then((res) => {
                        console.log('getCompanyProfile res', res)
                        dispatch(setCompanyProfile(res.data[0]))
                    })

            }).catch((error) => {
                console.log(error);
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });
        }
    };
}

export function getHrUserProfile() {
    return function (dispatch) {
        const token = getUserToken(store.getState());
        console.log("authAction: getHrUserProfile ! ");
        if (token) {
            axios.get(AuthUrls.USER_PROFILE, {
                headers: {
                    authorization: 'Token ' + token
                }
            }).then(response => {
                console.log("getHrUserProfile: ", response.data);
                if (!response.data.emp_no) {
                    // history.push("/Company/Profile_edit");
                    dispatch(setUserProfile(response.data));
                } else {
                    dispatch(setUserProfile(response.data));
                    dispatch(setHrProfile(response.data));
                }
            }).catch((error) => {
                // If request is bad...
                // Show an error to the user
                console.log("error:", error);
                // TODO: send notification and redirect
            });
        }
    };
}

export function changePassword(formValues, dispatch, props) {
    const changePasswordUrl = AuthUrls.CHANGE_PASSWORD;
    const token = getUserToken(store.getState());

    if (token) {
        return axios
        /** 로그인*/
            .post(AuthUrls.LOGIN, formValues)
            .then((response) => {
                return axios.post(changePasswordUrl, formValues, {
                    headers: {
                        authorization: 'Token ' + token
                    }
                })
                    .then((response) => {
                        Alert.success('비밀번호가 변경되었습니다.');
                        // dispatch(notifSend({
                        //     message: "Password has been changed successfully",
                        //     kind: "info",
                        //     dismissAfter: 5000
                        // }));
                        // redirect to the route '/profile'
                        // history.push("/Company/My");
                    })
                    .catch((error) => {
                        // If request is bad...
                        // Show an error to the user
                        const processedError = processServerError(error.response.data);
                        throw new SubmissionError(processedError);
                    });
            })
            .catch((error) => {
                // If request is bad...
                // Show an error to the user
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });


    }
}

export function resetPassword(formValues, dispatch, props) {
    const resetPasswordUrl = AuthUrls.RESET_PASSWORD;

    return axios.post(resetPasswordUrl, formValues)
        .then(response => {
            // console.log('response', response)
            history.push("/Company/reset_password_done");
        }).catch((error) => {
            // If request is bad...
            // Show an error to the user
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}

export function confirmPasswordChange(formValues, dispatch, props) {
    const {uid, token} = props.match.params;
    const resetPasswordConfirmUrl = AuthUrls.RESET_PASSWORD_CONFIRM;
    const data = Object.assign(formValues, {uid, token});

    return axios.post(resetPasswordConfirmUrl, data)
        .then(response => {
            Alert.success('비밀번호가 변경되었습니다.');
            // dispatch(notifSend({
            //     message: "Password has been reset successfully, please log in",
            //     kind: "info",
            //     dismissAfter: 5000
            // }));

            history.push("/Company/change_password_done");
        }).catch((error) => {
            // If request is bad...
            // Show an error to the user
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}

export function activateUserAccount(formValues, dispatch, props) {
    const {key} = props.match.params;
    const activateUserUrl = AuthUrls.USER_ACTIVATION;
    const data = Object.assign(formValues, {key});

    return axios.post(activateUserUrl, data)
        .then(response => {
            Alert.success('이메일이 인증되었습니다.');
            // dispatch(notifSend({
            //     message: "Your account has been activated successfully, please log in",
            //     kind: "info",
            //     dismissAfter: 5000
            // }));

            history.push("/Company/My");
        }).catch((error) => {
            // If request is bad...
            // Show an error to the user
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}

// User 모델 업데이트
export function updateProfile(formValue, dispatch) {
    const token = getUserToken(store.getState());

}
export function uploadProfileImage(image) {
    console.log('uploadProfileImage image:', image)
    const token = getUserToken(store.getState());
    let formValues = new FormData();
    formValues.append('profile_image', image, image.name);
    return axios
        .patch(AuthUrls.USER_PROFILE, formValues, {
            headers: {
                authorization: 'Token ' + token,
                'content-type': 'multipart/form-data'
            }
        })
        .then((response) => {
            // store.dispatch(getUserProfile());
            // store.dispatch({
            //     type: AuthTypes.USER_PROFILE,
            //     payload: response.data.id
            // })
            // setImageFile(data.company_image)
            // props.getCompanyProfile()
        })
        .catch(err => console.log(err));
}

// 세금계산서 발행 담당자 추가
export function postHrAccountInfo(formValues) {
    const token = getUserToken(store.getState());
    return axios.post(apiUrls.HR_ACCOUNT, formValues, {
        headers: {
            authorization: 'Token ' + token,
        }
    }).then((response)=>{
        Alert.success('담당자가 추가되었습니다.');
        store.dispatch({
            type: AuthTypes.ADD_HR_ACCOUNT,
            payload: response.data
        })
    }).catch((error) => {
        const processedError = processServerError(error.response.data);
        throw new SubmissionError(processedError);
    });
}

// 세금계산서 발행 담당자 삭제
export function deleteHrAccountInfo(id) {
    const token = getUserToken(store.getState());
    return function (dispatch) {
        axios.delete(apiUrls.HR_ACCOUNT + id + '/',  {
            headers: {
                authorization: 'Token ' + token,
            }
        }).then((response)=>{
            Alert.error('담당자가 삭제되었습니다.');
            dispatch({
                type: AuthTypes.DELETE_HR_ACCOUNT,
                payload: id
            })
        }).catch((error) => {
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
    }
}


export function updateUserProfile(formValues) {
    const token = getUserToken(store.getState());

    // todo 카카오 회원가입 임시
    // if (!formValues.email) {
    //     formValues.email = 'kakao@kakao.com'
    // }

    if (formValues.phone) {
        formValues.phone = (formValues.phone).replace(/-/gi, '')
    }
    if (formValues.date_of_birth) {
        formValues.date_of_birth = formValues.date_of_birth.replace(/-/gi, '')
    }
    if (formValues.address) {
        if (typeof formValues.address === 'object'){
            formValues.address = formValues.address.code_id;
        }
    }
    if (formValues.education_level) {
        if (typeof formValues.education_level === 'object'){
            formValues.education_level = formValues.education_level.code_id;
        }
    }
    if (formValues.status) {
        if (typeof formValues.status === 'object'){
            formValues.status = formValues.status.code_id;
        }
    }
    // 프로필 이미지
    if (formValues.profile_image){
        delete formValues.profile_image;
    }

    return axios.patch(AuthUrls.USER_PROFILE, formValues, {
        headers: {
            authorization: 'Token ' + token
        }
    })
        .then(response => {
            Alert.success('기본 프로필이 수정되었습니다.');
            store.dispatch(getUserProfile());
        }).catch((error) => {
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}

export function updateAlarmSetting(id, value, gubun) {
    const token = getUserToken(store.getState());
    let params = {};
    if(gubun === 'SMS') params['allow_sms'] = value;

    return function (dispatch) {
        axios
            .patch(apiUrls.ALARM_SETTING + id + '/', params
                ,{
                    headers: {
                        authorization: 'Token ' + token
                    }
                })
            .then(()=>{
                dispatch({
                    type: AuthTypes.ALARM_SETTING_EDIT,
                    payload: {
                        id: id,
                        value: value,
                        gubun: gubun
                    }
                });
                Alert.success('설정값이 변경되었습니다.');
            })
            .catch((error) => {
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });
    }
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
