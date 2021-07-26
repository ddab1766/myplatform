import {SugubTypes} from "../constants/actionTypes";

export default function (state = {}, action) {
    switch(action.type) {
        case SugubTypes.SUCCESS:
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case SugubTypes.ERROR:
            return {
                loading: false,
                data: null,
                error: action.error
            };
        case SugubTypes.GET_SUGUB:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: action.error
            };
        default:
            return state
            // throw new Error(`Unhandled action type: ${action.type}`);
    }
}
