import {AuthTypes} from "../constants/actionTypes";

export default function(state = {}, action) {
    switch(action.type) {
        case AuthTypes.LOGIN:
            return { ...state, authenticated: true, token: action.payload};
        case AuthTypes.LOGOUT:
            return { ...state, authenticated: false, token: null, user: null, company: null, hr: null, user_special: null, applied: null, urlkey: null};
        case AuthTypes.USER_PROFILE:
            return { ...state, user: action.payload};
        case AuthTypes.UPDATE_COMPANYPROFILE:
            const newUser = state.user
            newUser.companyprofile = [action.payload];
            return { ...state, user: newUser};
        case AuthTypes.USER_SPECIAL:
            return { ...state, user_special: action.payload};
        case AuthTypes.COMPANY_PROFILE:
            return { ...state, company: action.payload};
        case AuthTypes.HR_PROFILE:
            return { ...state, hr: action.payload};
        case AuthTypes.DELETE_HR_SPECIAL:
            const newArray = [...state.hr.hrspecial.filter(v => v.id !== action.payload)];
            state.hr.hrspecial = newArray;
            return { ...state, hr: state.hr};
        case AuthTypes.SUGUB_LIST:
            return { ...state, sugub: action.payload} ;
        case AuthTypes.REC_USER:
            return { ...state, recUser: action.payload} ;
        case AuthTypes.URL_KEY:
            return { ...state, urlkey: action.payload} ;
        case AuthTypes.RESUME:
            return { ...state, resume: action.payload} ;
        case AuthTypes.GET_APPLICANT:
            return { ...state, applied: action.payload };
        case AuthTypes.DELETE_APPLICANT:
            return { ...state, applied: state.applied.filter( v => v.id !== action.payload)};
        case AuthTypes.ADD_INTEREST_SUGUB:
            const newArray3 = [...state.user.interestsugub_user, action.payload];
            state.user.interestsugub_user = newArray3;
            return { ...state, user: state.user};
        case AuthTypes.DELETE_INTEREST_SUGUB:
            const newArray2 = [...state.user.interestsugub_user.filter(v => v.id !== action.payload)];
            state.user.interestsugub_user = newArray2;
            return { ...state, user: state.user};
        case AuthTypes.ADD_HR_ACCOUNT: // 세금계산서 담당자 추가
            const newAccount = [...state.hr.hraccountinfo, action.payload];
            state.hr.hraccountinfo = newAccount;
            return { ...state, hr: state.hr};
        case AuthTypes.DELETE_HR_ACCOUNT: // 세금계산서 담당자 삭제
            const deleteAccount = [...state.hr.hraccountinfo.filter(v => v.id !== action.payload)];
            state.hr.hraccountinfo = deleteAccount;
            return { ...state, hr: state.hr}
        case AuthTypes.ALARM_SETTING_EDIT: // 알람설정 변경
            let newSetting = [];
            newSetting = state.user.alarm_settings.map( v => {
                    if(v.id === action.payload.id){
                        if(action.payload.gubun === 'SMS'){
                            v.allow_sms = action.payload.value
                            return v
                        }else{
                            return v
                        }
                    }else{
                        return v
                    }
                }, {});

            return {
                ...state,
                user: {
                    ...state.user,
                    alarm_settings: newSetting
                }
            }

        // default:
        //     return state
        // case AuthTypes.GET_APPLIED: // 지원목록
        //     return { ...state, applied: action.payload} ;
        // case AuthTypes.COMPLETE_APPLIED: //지원목록 업데이트
        //     const index = state.applied.findIndex(v => v.id !== action.payload);
        //     const newArray = [...state.applied];
        //     newArray[index].completed = true ;
        //     return {
        //         ...state,
        //         applied: newArray
        //     }
    }
    return state;
}
