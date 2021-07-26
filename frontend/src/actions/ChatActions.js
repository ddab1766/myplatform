import axios from "axios";
import {SubmissionError} from 'redux-form';

import {actions as notifActions} from 'redux-notifications';
import {vUrls} from "../constants/urls";
import {getUserToken} from "../utils/authUtils";
import store from "../store";

const {notifSend} = notifActions;

// 채팅리스트
export function getChat() {
    const token = getUserToken(store.getState());
    return axios
        .get(vUrls.CHAT, {
            headers: {
                authorization: 'Token ' + token
            }
        })
        .then(({data})=>{
            console.log('vUrls.CHAT data', data);
            return data.results
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