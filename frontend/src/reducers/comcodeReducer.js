import {ComcodeTypes} from "../constants/actionTypes";

export default function (state = {}, action) {
    switch(action.type) {
        case ComcodeTypes.GET_COMCODE:
            return { ...state, comcode: action.payload};
        case ComcodeTypes.INIT_COMCODE:
            return { ...state, comcode: null};
        default:
            return state;
    }
    // return state;
}
