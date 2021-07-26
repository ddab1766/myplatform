import axios from "axios";
import {ComcodeTypes, CommonTypes} from "../constants/actionTypes";
import defaultClient from '../utils/defaultClient';
import {apiUrls, vUrls} from "../constants/urls";
import store from "../store";
import {getUserToken} from "../utils/authUtils";

// export const getApiData = async (url, id) => {
//     const response = await defaultClient.get(url + id);
//     console.log(url + id)
//     return {
//       type: CommonTypes.GET_API_DATA,
//       payload : response.data
//     }
// }
export function getPermisson(props){
    //HR
    if(typeof props.hr !== 'undefined' && props.hr !== null){
        return 3;
    }
    //인담자
    else if(typeof props.company !== 'undefined'  && props.company !== null){
        return 2;
    }
}
function setComCode(payload) {
    return {
        type: ComcodeTypes.GET_COMCODE,
        payload: payload
    };
}
export function getComCode() {
    return axios.get(apiUrls.COMMON)
        .then(({data}) => {
            console.log('getComcode:', data)
            store.dispatch(setComCode(data))
        })
}

function setHrList(payload) {
    return {
        type: ComcodeTypes.GET_HR_PROFILE,
        payload: payload
    };
}

export function getHrCard() {
    return axios
        .get(vUrls.HR_PROFILE_CARD)
        .then(({data})=> {
            console.log('getHrCard data', data)
            return data
        })
}

export function getHrProfile() {
    // const token = getUserToken(store.getState());
    return function (dispatch) {
        defaultClient
            .get(vUrls.HR_PROFILE + 'simple/')
            .then(({data})=>{
                dispatch({
                    type: CommonTypes.GET_API_DATA,
                    payload: data
                });
            })
    }
}


export function getHrList(params) {
    const token = getUserToken(store.getState());

    if(params){
        return defaultClient.get(vUrls.HR_PROFILE + `${params.id}/`, {
            params: {
                // is_expose: true
            }
        })
            .then(({data}) => {

                return data
            })
    }
    else if(token){
        return defaultClient.get(vUrls.HR_PROFILE,{
            headers:{
                // token 없을경우 보내지 않기
                authorization: 'Token ' + token
            }})
            .then(({data}) => {
                store.dispatch({
                    type: CommonTypes.GET_API_DATA,
                    payload: data
                });
                return data
            })
    }
    else{
        return defaultClient.get(vUrls.HR_PROFILE,{
            headers:{
                // token 없을경우 보내지 않기
                //authorization: 'Token ' + token
            }})
            .then(({data}) => {
                store.dispatch({
                    type: CommonTypes.GET_API_DATA,
                    payload: data
                });
                return data
            })
    }
}

export const getApiData = async (url, id) => {
    const response = await defaultClient.get(url, id);
    console.log(url, id)
    return {
        type: CommonTypes.GET_API_DATA,
        payload : response.data
    }
};
export const setApiData = async (payload) => {
    return {
        type: CommonTypes.SET_API_DATA,
        payload : payload
    }
};

