import axios from "axios";
import {CoworkerTypes} from "../constants/actionTypes";
import {apiUrls} from "../constants/urls";
import store from "../store";
import {getUserToken} from "../utils/authUtils";
import {SubmissionError} from "redux-form";
import {Alert} from "rsuite";


export function deleteInvite(id) {
    const token = getUserToken(store.getState());
    return function (dispatch) {
        axios.delete(apiUrls.INVITE + id + '/', {
            headers: {
                authorization: 'Token ' + token
            }})
            .then((response) => {
                Alert.success('초대를 취소하였습니다.');
                return response
            })
            .catch((error) => {
                alert(error.response.data.email)
            });
    }
}

export function inviteCoworker(formValues) {
    const token = getUserToken(store.getState());
    return axios.post(apiUrls.INVITE_EMAIL, formValues, {
        headers: {
            authorization: 'Token ' + token
        }})
        .then((response) => {
            console.log('inviteCoworker response :', response)
            Alert.success('초대메일을 전송하였습니다.');
            return response.data
        })
        .catch((error) => {
            alert(error.response.data.email)
        });
}

export function getInvite() {
    const token = getUserToken(store.getState());
    return axios.get(apiUrls.INVITE, {
        headers: {
            authorization: 'Token ' + token
        }
    })
        .then((resonpse) => {
            return resonpse.data
            // Alert.success('초대메일을 전송하였습니다.');
        })
        .catch((error) => {
            alert(error)
            // alert(error.response.data.email)
            // Alert.error(error.response.data.email)
            // console.log('inviteCoworker error', error.response.data)
            // const processedError = processServerError(error.response.data);
            // throw new SubmissionError(processedError);
        });
}


export function getCoworker() {
    const token = getUserToken(store.getState());
    return function (dispatch) {
        axios
            .get(apiUrls.COWORKER, {
                headers: {
                    authorization: 'Token ' + token
                }})
            .then((response)=>{
                console.log('getCoworker response data', response.data)
                dispatch({
                    type: CoworkerTypes.GET_COWORKER,
                    payload: response.data.results
                });
                console.log('getCoworker res', response)
            })
    }
}

// 권한 삭제
export function deleteCoworker(id) {
    const token = getUserToken(store.getState());
    return function (dispatch) {
        axios
            .delete(`${apiUrls.COWORKER}${id}/` , {
                headers: {
                    authorization: 'Token ' + token
                }})
            .then((response)=>{
                console.log('deleteCoworker response', response)
                dispatch({
                    type: CoworkerTypes.DELETE_COWORKER,
                    payload: id
                });
                console.log('deleteCoworker res', response)
            })
    }
}

// 권한 변경
export function updateCoworker(id, permission) {
    const token = getUserToken(store.getState());
    return function (dispatch) {
        axios
            .patch(`${apiUrls.COWORKER}${id}/` , {
                    companyprofile_auth_id: permission
                },
                {
                    headers: {
                        authorization: 'Token ' + token
                    },
                })
            .then((response)=>{
                console.log('updateCoworker response', response)
                dispatch({
                    type: CoworkerTypes.UPDATE_COWORKER,
                    payload: response.data
                });
                console.log('updateCoworker res', response)
            })
    }
}

//
// export function readAlarm(id) {
//     const token = getUserToken(store.getState());
//     return function (dispatch) {
//         axios
//             .patch(apiUrls.READ_ALARM + id + '/', { is_read: true}, {
//                 headers: {
//                     authorization: 'Token ' + token
//                 }})
//             .then(response=>{
//                 dispatch({
//                     type: AlarmTypes.READ_ALARM,
//                     payload: response.data
//                 })
//                 console.log('readAlarm res', response)
//             })
//             .catch((e)=>{
//                 dispatch({
//                     type: AlarmTypes.READ_ALARM_ERROR
//                 })
//             })
//     }
// }

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
