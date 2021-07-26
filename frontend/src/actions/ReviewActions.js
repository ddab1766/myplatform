import axios from "axios";
import {SubmissionError} from 'redux-form';

import {actions as notifActions} from 'redux-notifications';
import {apiUrls} from "../constants/urls";
import {getUserToken} from "../utils/authUtils";
import store from "../store";
import {Alert} from "rsuite";

const {notifSend} = notifActions;

// 수급리뷰
export function updateSugubReview(formValues, dispatch, props) {
    const token = getUserToken(store.getState());
    console.log('updateSugubReview formValue1',formValues )
    // console.log('updateSugubReview props', props)
    // formValues.user = formValues.id
    const point = [];
    const temp = Object.keys(formValues).map((value) => {
        let dic = {}
        if (/^ZD.*$/g.test(value)) {
            console.log('value:', value)
            // dic['sugub_review'] = formValues['sugub']
            dic['point_gubun'] = value
            dic['point'] = formValues[value]
            point.push(dic);
        }
        return null;
    }).filter(o => o)

    formValues.sugubreview_point = point
    console.log('updateSugubReview formValue2',formValues )
    return axios
        .post(apiUrls.SUGUB_REVIEW, formValues, {
            headers: {
                authorization: 'Token ' + token
            }
        })
        .then(({data})=>{
            Alert.success('리뷰가 등록 되었습니다.');
            // history.push('/Mng/SugubListDetail')
        }).catch(error => {
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        })
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
        } else {
            newDict['_error'] = error[key];
        }
        console.log('newDict:2:',newDict)

        return newDict
    }, {"_error": []});
}