import {ComcodeTypes} from "../constants/actionTypes";

export default function (state = {}, action) {
    switch(action.type) {
        case ComcodeTypes.GET_HR_PROFILE:
            return { ...state, hr_list: action.payload};
        default:
            return state;
    }
    // return state;
}
