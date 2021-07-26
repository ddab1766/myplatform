import axios from "axios";
import defaultClient from '../utils/defaultClient';
import {apiUrls} from "../constants/urls";
import store from "../store";
import {getUserToken} from "../utils/authUtils";
import qs from "qs";
import { Alert } from 'rsuite';
// 환불신청
export function postRefund(formValues, dispatch) {
    const token = getUserToken(store.getState());
    console.log(formValues)
    return axios
        .post(apiUrls.REFUND, formValues, {
            headers: {
                authorization: 'Token ' + token,
                'content-type': 'multipart/form-data'
            },
        })
        .then(({data})=>{
            console.log(data)

            Alert.success('환불신청이 정상적으로 등록되었습니다.');
            // window.location.reload();
            // dispatch(getUserProfile());
        })
        .catch((error) => {
            console.log('updateHrSpecial err:', error)
        });
}
// 환불내역
export function getRefundHistory() {
    const token = getUserToken(store.getState());
    return axios
        .get(apiUrls.REFUND,{
            headers: {
                authorization: 'Token ' + token,
            },

        })
        .then(({data})=>{
            console.log(data)
            return data
            // dispatch(getUserProfile());
        })
        .catch((error) => {
            console.log('updateHrSpecial err:', error)
        });
}
export function getEmployeeList(filter) {
    const token = getUserToken(store.getState());

    if(token){
        return axios.get(apiUrls.EMPLOYEE_LIST,{
            headers:{
                authorization: 'Token ' + token
            },
            params:{ ...filter},
            paramsSerializer: params => {
                return qs.stringify(params, {arrayFormat: 'repeat'})
            }
        })
            .then(({data}) => {
                console.log(data)
                return data
            })
    }

}
// 계약서 업로드
export function uploadContract(formData,id) {
    const token = getUserToken(store.getState());
    console.log('uploadcontract')
    if(token){
        return defaultClient.patch(apiUrls.CONTRACT + id + '/' , formData,{
            headers:{
                authorization: 'Token ' + token
            },
        }).then(res => {
            // return res;
            Alert.success('정상적으로 처리되었습니다.')

        }).catch((error) => {
            console.log(error.response.data);
            alert('실패했습니다.');
            // window.location.reload();
        });
    }
}
// 수수료현황 가져오기
export function getFee(filter) {
    const token = getUserToken(store.getState());

    if(token){
        return axios.get(apiUrls.FEE,{
            headers:{
                authorization: 'Token ' + token
            },
            params:{
                ...filter
            }
        })
            .then(({data}) => {
                return data
            })
    }
}


