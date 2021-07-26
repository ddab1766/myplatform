import {CommonTypes} from "../constants/actionTypes";

export default function (state = {}, action) {
    //console.log('action.data', action.data)
    switch(action.type) {
        case CommonTypes.LOADING:
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            };
        case CommonTypes.RESET:
            return {
                ...state,
                loading: false,
                data: null,
                error: null
            };
        case CommonTypes.SUCCESS:
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case CommonTypes.ERROR:
            return {
                loading: false,
                data: null,
                error: action.error
            };
        case CommonTypes.GET_API_DATA:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: action.error
            };
        case CommonTypes.SORT:
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
