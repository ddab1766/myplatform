import {CoworkerTypes} from "../constants/actionTypes";


export default function (state = {}, action) {
    switch(action.type) {
        case CoworkerTypes.GET_COWORKER:
            return { ...state, coworker: action.payload};
        case CoworkerTypes.DELETE_COWORKER:
            return { ...state, coworker: state.coworker.filter(v=> v.id !== action.payload)};
        case CoworkerTypes.UPDATE_COWORKER:
            return {
                ...state,
                coworker: state.coworker.map((v, index)=> {
                    if (v.id === action.payload.id){
                        return action.payload
                    }else{
                        return v
                    }

                }, {})
            };
        case CoworkerTypes.CLEAN_COWORKER:
            return [];
        default:
            return state;
    }
}
