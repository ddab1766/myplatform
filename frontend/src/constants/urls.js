
const DEV_URL = (() => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/'
  }  else {
    // return 'https://chaegong.co.kr/'
    return 'https://chaema.co.kr/'
  }
})();

const ROOT_URL = (() => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000/'
  }  else {
      // return 'http://localhost:8000/'
    return 'https://chaema.co.kr/'
  }
})();
// const ES_COMPANY_URL = 'https://42398c563e91434ebffe97cfdc95d449.ent-search.asia-northeast1.gcp.cloud.es.io/api/as/v1/engines/chaegong/search.json';
// const ES_COMPANY_URL = 'https://696ffa3b9c50480188e36a22dfd350d0.ent-search.asia-northeast1.gcp.cloud.es.io/api/as/v1/engines/company-baseinfo/search.json';
// const ES_JIKJONG_URL = 'https://42398c563e91434ebffe97cfdc95d449.ent-search.asia-northeast1.gcp.cloud.es.io/api/as/v1/engines/jikjong/search.json';
// const ES_JIKJONG_URL = 'https://9f7c02c5019b47909f20102fb4b6e6d8.ent-search.asia-northeast1.gcp.cloud.es.io/api/as/v1/engines/jikjong/search.json';
// const ES_JIKJONG_URL = 'https://696ffa3b9c50480188e36a22dfd350d0.ent-search.asia-northeast1.gcp.cloud.es.io/api/as/v1/engines/jikjong/search.json';

const AuthUrls = {
    COMPANY_HOME:`${DEV_URL}Company/`,
    USER_HOME:`${DEV_URL}User/`,
    MANAGER_HOME:`${DEV_URL}Mng/dashboard`,

    LOGIN: `${ROOT_URL}rest-auth/login/`,
    SIGNUP: `${ROOT_URL}rest-auth/registration/`,
    USER_PROFILE: `${ROOT_URL}rest-auth/user/`,
    SIGNUP_CHECK: `${ROOT_URL}rest-auth/registration/exists/`,              // 회원가입 체크용
    CHANGE_PASSWORD: `${ROOT_URL}rest-auth/password/change/`,
    RESET_PASSWORD: `${ROOT_URL}rest-auth/password/reset/`,
    RESET_PASSWORD_CONFIRM: `${ROOT_URL}rest-auth/password/reset/confirm/`,
    USER_ACTIVATION: `${ROOT_URL}rest-auth/registration/verify-email/`,
    KAKAO_LOGIN: `${ROOT_URL}rest-auth/kakao/`,
    KAKAO_PROFILE: `${ROOT_URL}rest-auth/kakao/login/`,                     // 카카오 프로필
    FACEBOOK_LOGIN: `${ROOT_URL}rest-auth/facebook/`,
    GOOGLE_LOGIN: `${ROOT_URL}rest-auth/google/`,
    NAVER_LOGIN: `${ROOT_URL}rest-auth/naver/`,
    NAVER_LOGIN_CALLBACK: `${ROOT_URL}rest-auth/naver/callback/`,           // 로그인 callback
    COMPANY_INFO: `${ROOT_URL}es/`,                                         // ElasticSearch ( CompanyBaseInfo.json )
    JIKJONG_INFO: `${ROOT_URL}es/`,                                         // ElasticSearch

    USER: `${ROOT_URL}api/user/`,                                           // 유저api
    USER_LIST: `${ROOT_URL}v1/user/`,                                       // 유저list

    // JOB_QUESTION: `${ROOT_URL}api/jobQuestion/`,                            // 채용공고 질문
    // JOB_ANSWER: `${ROOT_URL}api/jobAnswer/`,                                // 채용공고 답변
    // CAREER: `${ROOT_URL}api/career/`,                                       // 경력
    // EDUCATION: `${ROOT_URL}api/education/`,                                 // 학력
    // LANGUAGE: `${ROOT_URL}api/language/`,                                   // 외국어
    // RESUME: `${ROOT_URL}api/resume/`,                                       // 이력서

    // CREATE_URLKEY: `${ROOT_URL}naverapi/shorturl/`,                         // 네이버 단축URL
    // PAYMENT: `${ROOT_URL}api/payments/`,                                    // Import 결제 모듈

    SEND_AUTH_SMS: `${ROOT_URL}sms/auth/`,                                  // 인증 SMS 발송
    SEND_INFO_SMS: `${ROOT_URL}sms/info/`,                                  // Info SMS 발송
    CREATE_TEMPREGISTER:`${ROOT_URL}tempRegister/`,                         // 이력서접수시 임시아이디생성
    PAGYEON_LIST: `${ROOT_URL}api/erp/pagyeon/`,                            // 파견사원 리스트


};

// api urls - ModelViewSet
const apiUrls = {
    // common
    COMMON: `${ROOT_URL}api/common/`,                                       // 공통코드
    ALARM: `${ROOT_URL}api/alarm/`,                                             // 알람
    JIKJONG: `${ROOT_URL}api/jikjong/`,                                         // 직종
    QUESTIONS: `${ROOT_URL}api/question/`,                                      // 직종별 질문
    QNA: `${ROOT_URL}api/qna/`,                                                 // 문의사항(Q&A)

    // backend
    ALARM_SETTING: `${ROOT_URL}api/backend/setting/alarm/`,                     // 알람 셋팅
    // django Invitations
    INVITE: `${ROOT_URL}api/backend/invitations/`,                              // 초대
    INVITE_EMAIL: `${ROOT_URL}api/backend/invitations/create_and_send/`,        // 초대메일 전송

    // userprofile
    CUSTOM_PROFILE: `${ROOT_URL}api/userprofile/userprofile/`,                  // USER_PROFILE
    USER_SPECIAL: `${ROOT_URL}api/userprofile/userSpecial/`,                    // 전문분야
    INTEREST_ADV: `${ROOT_URL}api/interestadv/`,                                // 관심 채용공고
    INTEREST_SUGUB: `${ROOT_URL}api/userprofile/interest/`,                     // 관심 수급
    COMPANY_ADVERKEY: `${ROOT_URL}api/userprofile/comadvkey/`,                  // 기업 광고 URL ( 유저id )
    ADVERKEY: `${ROOT_URL}api/userprofile/advkey/`,                             // 광고 URL ( 광고id, 유저id )

    // hrprofile
    HR_PROFILE: `${ROOT_URL}api/hrprofile/hrprofile/`,                          // HR_PROFILE
    HR_COWORKER: `${ROOT_URL}api/hrprofile/coworker/`,                          // 기업 동료(HR)
    HR_SPECIAL: `${ROOT_URL}api/hrprofile/hrspecial/`,                          // HR_SPECIAL
    HR_ACCOUNT: `${ROOT_URL}api/hrprofile/account/`,                          // HR_ACCOUNT

    // companyprofile
    CUSTOM_COMPANY_PROFILE: `${ROOT_URL}api/companyprofile/companyprofile/`,    // COMPANY_PROFILE
    SUGUB: `${ROOT_URL}api/companyprofile/sugub/`,                              // 수급의뢰서
    SUGUB_REVIEW: `${ROOT_URL}api/companyprofile/sugubreview/`,                 // 수급 리뷰
    JOB_ADVERTISE: `${ROOT_URL}api/companyprofile/jobAd/`,                      // 채용공고
    JOB_APPLICANT: `${ROOT_URL}api/companyprofile/jobApp/`,                     // 지원자
    COWORKER: `${ROOT_URL}api/companyprofile/coworker/`,                        // 기업 동료
    ESTIMATE: `${ROOT_URL}api/companyprofile/estimate/`,                        // 예상견적서 ESTIMATE
    CHECK_APPLY: `${ROOT_URL}api/companyprofile/jobApp/apply_check/`,           // 중복지원 체크
    INTERVIEW: `${ROOT_URL}api/companyprofile/interview/`,           // 면접일정
    // employee
    EMPLOYEE_LIST: `${ROOT_URL}api/employee/employee/get_employee/`,            // 파견사원 리스트
    CONTRACT: `${ROOT_URL}api/employee/contract/`,                              // 계약서
    FEE: `${ROOT_URL}api/employee/fee/`,                                        // 수수료 현황
    REFUND: `${ROOT_URL}api/employee/refund/`,                                  // 환불

};

// v1 Urls
const vUrls = {
    // common
    NOTIFICATION: `${ROOT_URL}v1/noti/`,                                        // 공지사항 (notification)
    FAQ: `${ROOT_URL}v1/FAQ/`,                                                  // 자주묻는질문 ( FAQ )
    ALARM: `${ROOT_URL}v1/alarm/`,                                              // 알림
    CHAT: `${ROOT_URL}v1/chat/`,                                                // 채팅

    // admin
    // SUGUB_ADMIN: `${ROOT_URL}v1/sugub/admin/`,                                  // 수급 전체(admin용)

    // userprofile
    CUSTOM_PROFILE: `${ROOT_URL}v1/userprofile/`,                               // USER_PROFILE
    USER_SPECIAL: `${ROOT_URL}v1/userspecial/`,                                 // 전문분야
    RESUME: `${ROOT_URL}v1/resume/`,                                            // 이력서

    // hrprofile
    PARTNERS_LIST: `${ROOT_URL}v1/hrprofile/partners_list/`,                    // HR_PROFILE 파트너스 리스트
    HR_PROFILE: `${ROOT_URL}v1/hrprofile/`,                                     // HR_PROFILE
    HR_PROFILE_CARD: `${ROOT_URL}v1/hrprofile/card/`,                           // HR_PROFILE CARD
    // HR_SUGUB: `${ROOT_URL}v1/hrsugub/`,                                         // HR_SUGUB
    HR_SUGUB: `${ROOT_URL}v1/sugub/hr/`,                                        // HR_SUGUB
    HR_MY_SUGUB: `${ROOT_URL}v1/sugub/my_sugub/`,                                        // HR_SUGUB
    HR_FAVORITE_SUGUB: `${ROOT_URL}v1/sugub/favorite_sugub/`,                                        // HR_SUGUB
    HR_JOB_APPLICANT: `${ROOT_URL}v1/jobApp/hr/`,                               // 지원자

    // companyprofile
    CUSTOM_COMPANY_PROFILE: `${ROOT_URL}v1/companyprofile/`,                    // COMPANY_PROFILE
    SUGUB: `${ROOT_URL}v1/sugub/`,                                              // 수급의뢰서
    SUGUB_LIST: `${ROOT_URL}v1/sugub/card_list/`,                               // 수급의뢰서
    SUGUB_REVIEW: `${ROOT_URL}v1/sugubreview/`,                                 // 수급 리뷰
    JOB_APPLICANT: `${ROOT_URL}v1/jobApp/`,                                     // 지원자
    JOB_ADVERTISE: `${ROOT_URL}v1/jobAd/`,                                      // 채용공고(ListView)


};

export {DEV_URL, AuthUrls, vUrls, apiUrls};
