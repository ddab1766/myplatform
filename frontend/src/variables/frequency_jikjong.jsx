import React from "react";

// 구직자 자주 찾으시는 직종
const USER_JIKJONG  = [
    {
        jikjong_mid_cd: 'AA0107000', jikjong_mid_name: '비서',
        jikjong_low_cd: 'AA0107010', jikjong_low_name: '임원비서',
        description: '비서, 임원비서, 수행비서, 수행원, 비서 자격증', pagyeon_code: 'O, 317(사무 지원 종사자의 업무)'
    },
    {
        jikjong_mid_cd: 'AA0105000', jikjong_mid_name: '회계/재무/세무/IR',
        jikjong_low_cd: 'AA0105010', jikjong_low_name: '재무',
        description: '재무보조, 회계보조, 정산, 결산, 급여 등 기타 재무 업무', pagyeon_code: 'O, 16(행정, 경영 및 재정 전문가의 업무)'
    },
    {
        jikjong_mid_cd: 'AA1401000', jikjong_mid_name: '임원기사',
        jikjong_low_cd: 'AA1401010', jikjong_low_name: '제네시스',
        description: '수행기사, 임원기사, 임원수행 등', pagyeon_code: 'O, 842(자동차 운전 종사자의 업무)'
    }
];

// 인사담당자 자주 찾으시는 직종 
const COMPANY_JIKJONG = [
    {
        jikjong_mid_cd: 'AA0107000', jikjong_mid_name: '비서',
        jikjong_low_cd: 'AA0107010', jikjong_low_name: '임원비서',
        description: '비서, 임원비서, 수행비서, 수행원, 비서 자격증', pagyeon_code: 'O, 317(사무 지원 종사자의 업무)'
    },
    {
        jikjong_mid_cd: 'AA0109000', jikjong_mid_name: '사무지원',
        jikjong_low_cd: 'AA0109150', jikjong_low_name: '팀사무지원',
        description: '사무업무, 사무보조', pagyeon_code: 'O, 317(사무 지원 종사자의 업무)'
    },
    {
        jikjong_mid_cd: 'AA1401000', jikjong_mid_name: '임원기사',
        jikjong_low_cd: 'AA1401010', jikjong_low_name: '제네시스',
        description: '수행기사, 임원기사, 임원수행 등', pagyeon_code: 'O, 842(자동차 운전 종사자의 업무)'
    }
];

export {USER_JIKJONG, COMPANY_JIKJONG}