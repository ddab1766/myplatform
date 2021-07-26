import axios from "axios";
import {AlarmTypes} from "../constants/actionTypes";
import {apiUrls, vUrls} from "../constants/urls";
import store from "../store";
import {getUserToken} from "../utils/authUtils";


export function getAlarm() {
    const token = getUserToken(store.getState());
    return function (dispatch) {
        axios
            .get(vUrls.ALARM, {
                headers: {
                    authorization: 'Token ' + token
                }
            })
            .then((response)=>{
                console.log('getAlarm res', response)
                dispatch({
                    type: AlarmTypes.GET_ALARM,
                    payload: response.data
                });

            })
    }
}

export function readAlarm(id) {
    const token = getUserToken(store.getState());
    return function (dispatch) {
        axios
            .patch(apiUrls.ALARM + id + '/', { is_read: true}, {
                headers: {
                    authorization: 'Token ' + token
                }})
            .then(response=>{
                dispatch({
                    type: AlarmTypes.READ_ALARM,
                    payload: response.data
                })
                console.log('readAlarm res', response)
            })
            .catch((e)=>{
                dispatch({
                    type: AlarmTypes.READ_ALARM_ERROR
                })
            })
    }
}
