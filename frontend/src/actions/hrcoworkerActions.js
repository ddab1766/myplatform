import axios from "axios";
import {CoworkerTypes} from "../constants/actionTypes";
import {apiUrls} from "../constants/urls";
import store from "../store";
import {getUserToken} from "../utils/authUtils";


export function getHrCoworker() {
    const token = getUserToken(store.getState());
    return function (dispatch) {
        axios
            .get(apiUrls.HR_COWORKER, {
                headers: {
                    authorization: 'Token ' + token
                }})
            .then((response)=>{
                dispatch({
                    type: CoworkerTypes.GET_COWORKER,
                    payload: response.data.results
                });
                console.log('getCoworker res', response)
            })
    }
}

// 권한 삭제
export function deleteHrCoworker(id) {
    const token = getUserToken(store.getState());
    return function (dispatch) {
        axios
            .delete(`${apiUrls.HR_COWORKER}${id}/` , {
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
export function updateHrCoworker(id, permission) {
    const token = getUserToken(store.getState());
    return function (dispatch) {
        axios
            .patch(`${apiUrls.HR_COWORKER}${id}/` , {
                    hrprofile_auth_id: permission
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
