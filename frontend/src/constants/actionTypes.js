export const AuthTypes = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    CHANGE_PASSWORD: "CHANGE_PASSWORD",
    USER_PROFILE: "USER_PROFILE",
    USER_SPECIAL: "USER_SPECIAL",
    COMPANY_PROFILE: "COMPANY_PROFILE",
    HR_PROFILE: "HR_PROFILE",
    DELETE_HR_SPECIAL: "DELETE_HR_SPECIAL",
    DELETE_INTEREST_SUGUB: "DELETE_INTEREST_SUGUB",  // 관심수급 취소
    ADD_INTEREST_SUGUB: "ADD_INTEREST_SUGUB",        // 관심수급 추가
    ADD_HR_ACCOUNT: "ADD_HR_ACCOUNT",                // HR 세금계산서 담당자 추가
    DELETE_HR_ACCOUNT: "DELETE_HR_ACCOUNT",          // HR 세금계산서 담당자 삭제
    // SUGUB_LIST: "SUGUB_LIST",
    REC_USER: "REC_USER",                            // 추천유저
    REC_COMPANY: "REC_COMPANY",                      // 추천기업
    SIGNUP_CHECK: "SIGNUP_CHECK",                    // 회원가입 확인
    URL_KEY: "URL_KEY",                              // URL
    RESUME: "RESUME",                                // 이력서
    UPDATE_COMPANYPROFILE: "UPDATE_COMPANYPROFILE",  // 회사정보 업데이트
    GET_APPLICANT: "GET_APPLICANT",
    DELETE_APPLICANT: "DELETE_APPLICANT",
    ALARM_SETTING_EDIT: "ALARM_SETTING_EDIT"
    // GET_APPLIED : "GET_APPLIED",                     // 지원리스트
    // COMPLETE_APPLIED : "COMPLETE_APPLIED"            // 지원리스트 업데이트
};

export const CommonTypes = {
    GET_API_DATA: "GET_API_DATA",
    SET_API_DATA: "SET_API_DATA",
    SORT: 'SORT',
    LOADING: "LOADING",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
    RESET: "RESET"
};

export const ComcodeTypes = {
    GET_COMCODE: "GET_COMCODE",
    GET_HR_PROFILE: "GET_HR_PROFILE",
    INIT_COMCODE: "INIT_COMCODE"
};

export const AlarmTypes = {
    GET_ALARM: "GET_ALARM",
    READ_ALARM: "READ_ALARM",
    READ_ALARM_ERROR: "READ_ALARM_ERROR",
    CLEAN_ALARM: "CLEAN_ALARM"
};

export const SugubTypes = {
    GET_SUGUB: "GET_SUGUB",
    LOADING: "LOADING",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
    RESET: "RESET"
}
export const CoworkerTypes = {
    GET_COWORKER: "GET_COWORKER",
    DELETE_COWORKER: "DELETE_COWORKER",
    UPDATE_COWORKER: "UPDATE_COWORKER",
    CLEAN_COWORKER: "CLEAN_COWORKER"
}
