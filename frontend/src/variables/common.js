import React from "react";
import FaceIcon from '@material-ui/icons/Face';

const JIKJONGTOP = [
    {'code_id': 'AA0100000', 'code_name': '경영/사무', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-paper'},
    {'code_id': 'AA0200000', 'code_name': '영업/고객상담', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-single-02'},
    {'code_id': 'AA0300000', 'code_name': 'IT/인터넷', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-laptop'},
    {'code_id': 'AA0400000', 'code_name': '디자인', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-palette'},
    {'code_id': 'AA0500000', 'code_name': '서비스', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-satisfied'},
    {'code_id': 'AA0600000', 'code_name': '전문직', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-atom'},
    {'code_id': 'AA0700000', 'code_name': '의료', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-ambulance'},
    {'code_id': 'AA0800000', 'code_name': '생산/제조', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-single-02'},
    {'code_id': 'AA0900000', 'code_name': '건설', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-settings'},
    {'code_id': 'AA1000000', 'code_name': '유통/무역', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-world-2'},
    {'code_id': 'AA1100000', 'code_name': '미디어', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-single-02'},
    {'code_id': 'AA1200000', 'code_name': '교육', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-hat-3'},
    {'code_id': 'AA1300000', 'code_name': '특수계층/공공', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-zoom-split'}
];

const JIKJONGTOP_SIMPLE = [
    {'code_id': 'AA0100000', 'code_name': '경영/사무', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-paper'},
    {'code_id': 'AA0200000', 'code_name': '영업/고객상담', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-single-02'},
    {'code_id': 'AA0300000', 'code_name': 'IT/인터넷', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-laptop'},
    // {'code_id': 'AA0400000', 'code_name': '디자인', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-palette'},
    {'code_id': 'AA0500000', 'code_name': '서비스', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-satisfied'},
    // {'code_id': 'AA0600000', 'code_name': '전문직', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-atom'},
    // {'code_id': 'AA0700000', 'code_name': '의료', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-ambulance'},
    // {'code_id': 'AA0800000', 'code_name': '생산/제조', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-single-02'},
    // {'code_id': 'AA0900000', 'code_name': '건설', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-settings'},
    {'code_id': 'AA1000000', 'code_name': '유통/무역', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-world-2'},
    // {'code_id': 'AA1100000', 'code_name': '미디어', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-single-02'},
    // {'code_id': 'AA1200000', 'code_name': '교육', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-hat-3'},
    // {'code_id': 'AA1300000', 'code_name': '특수계층/공공', 'code_topidx': 'AA', 'code_topcd': null, 'icon': <FaceIcon/>, 'iclassName':'nc-icon nc-zoom-split'}
];


const JIKJONGTOP_ALL = [
    {'code_id': '', 'code_name': '전체', 'icon': <FaceIcon/>},
    {'code_id': 'AA0100000', 'code_name': '경영/사무', 'icon': <FaceIcon/>},
    {'code_id': 'AA0200000', 'code_name': '영업/고객상담', 'icon': <FaceIcon/>},
    {'code_id': 'AA0300000', 'code_name': 'IT/인터넷', 'icon': <FaceIcon/>},
    {'code_id': 'AA0400000', 'code_name': '디자인', 'icon': <FaceIcon/>},
    {'code_id': 'AA0500000', 'code_name': '서비스', 'icon': <FaceIcon/>},
    {'code_id': 'AA0600000', 'code_name': '전문직', 'icon': <FaceIcon/>},
    {'code_id': 'AA0700000', 'code_name': '의료', 'icon': <FaceIcon/>},
    {'code_id': 'AA0800000', 'code_name': '생산/제조', 'icon': <FaceIcon/>},
    {'code_id': 'AA0900000', 'code_name': '건설', 'icon': <FaceIcon/>},
    {'code_id': 'AA1000000', 'code_name': '유통/무역', 'icon': <FaceIcon/>},
    {'code_id': 'AA1100000', 'code_name': '미디어', 'icon': <FaceIcon/>},
    {'code_id': 'AA1200000', 'code_name': '교육', 'icon': <FaceIcon/>},
    {'code_id': 'AA1300000', 'code_name': '특수계층/공공', 'icon': <FaceIcon/>},
    {'code_id': 'AA1400000', 'code_name': '운전/수행기사', 'icon': <FaceIcon/>}
];

const JIKJONG_GROUP = [
    {  code_id: "AA0101000", code_name: "기획/전략/경영", code_topidx: "AA", code_topcd: "AA0100000", top: "경영/사무"}
,{code_id: "AA0102000", code_name: "마케팅/광고/분석", code_topidx: "AA", code_topcd: "AA0100000", top: "경영/사무"}
,{code_id: "AA0103000", code_name: "홍보/PR/사보", code_topidx: "AA", code_topcd: "AA0100000", top: "경영/사무"}
,{code_id: "AA0104000", code_name: "경리/출납/결산", code_topidx: "AA", code_topcd: "AA0100000", top: "경영/사무"}
,{code_id: "AA0105000", code_name: "회계/재무/세무/IR", code_topidx: "AA", code_topcd: "AA0100000", top: "경영/사무"}
,{code_id: "AA0106000", code_name: "총무/법무/사무", code_topidx: "AA", code_topcd: "AA0100000", top: "경영/사무"}
,{code_id: "AA0107000", code_name: "비서", code_topidx: "AA", code_topcd: "AA0100000", top: "경영/사무"}
,{code_id: "AA0108000", code_name: "인사/교육/노무", code_topidx: "AA", code_topcd: "AA0100000", top: "경영/사무"}
,{code_id: "AA0109000", code_name: "사무지원", code_topidx: "AA", code_topcd: "AA0100000", top: "경영/사무"}
,{code_id: "AA0110000", code_name: "전시/컨벤션/세미나", code_topidx: "AA", code_topcd: "AA0100000", top: "경영/사무"}
,{code_id: "AA0201000", code_name: "일반영업", code_topidx: "AA", code_topcd: "AA0200000", top: "영업/고객상담"}
,{code_id: "AA0202000", code_name: "영업기획/관리/지원", code_topidx: "AA", code_topcd: "AA0200000", top: "영업/고객상담"}
,{code_id: "AA0203000", code_name: "기술영업", code_topidx: "AA", code_topcd: "AA0200000", top: "영업/고객상담"}
,{code_id: "AA0204000", code_name: "IT/솔루션영업", code_topidx: "AA", code_topcd: "AA0200000", top: "영업/고객상담"}
,{code_id: "AA0205000", code_name: "광고영업", code_topidx: "AA", code_topcd: "AA0200000", top: "영업/고객상담"}
,{code_id: "AA0206000", code_name: "금융/보험영업", code_topidx: "AA", code_topcd: "AA0200000", top: "영업/고객상담"}
,{code_id: "AA0207000", code_name: "판매/매장관리", code_topidx: "AA", code_topcd: "AA0200000", top: "영업/고객상담"}
,{code_id: "AA0208000", code_name: "TM/아웃바운드", code_topidx: "AA", code_topcd: "AA0200000", top: "영업/고객상담"}
,{code_id: "AA0209000", code_name: "TM/인바운드", code_topidx: "AA", code_topcd: "AA0200000", top: "영업/고객상담"}
,{code_id: "AA0210000", code_name: "고객센터/CS", code_topidx: "AA", code_topcd: "AA0200000", top: "영업/고객상담"}
,{code_id: "AA0211000", code_name: "QA/CS강사/수퍼바우저", code_topidx: "AA", code_topcd: "AA0200000", top: "영업/고객상담"}
,{code_id: "AA0301000", code_name: "웹개발", code_topidx: "AA", code_topcd: "AA0300000", top: "IT/인터넷"}
,{code_id: "AA0302000", code_name: "응용프로그램개발", code_topidx: "AA", code_topcd: "AA0300000", top: "IT/인터넷"}
,{code_id: "AA0303000", code_name: "시스템개발", code_topidx: "AA", code_topcd: "AA0300000", top: "IT/인터넷"}
,{code_id: "AA0304000", code_name: "서버/네트워크/보안", code_topidx: "AA", code_topcd: "AA0300000", top: "IT/인터넷"}
,{code_id: "AA0305000", code_name: "ERP/시스템분석/설계", code_topidx: "AA", code_topcd: "AA0300000", top: "IT/인터넷"}
,{code_id: "AA0306000", code_name: "데이터베이스/DBA", code_topidx: "AA", code_topcd: "AA0300000", top: "IT/인터넷"}
,{code_id: "AA0307000", code_name: "퍼블리싱/UI개발", code_topidx: "AA", code_topcd: "AA0300000", top: "IT/인터넷"}
,{code_id: "AA0308000", code_name: "웹디자인", code_topidx: "AA", code_topcd: "AA0300000", top: "IT/인터넷"}
,{code_id: "AA0309000", code_name: "하드웨어/소프트웨어", code_topidx: "AA", code_topcd: "AA0300000", top: "IT/인터넷"}
,{code_id: "AA0310000", code_name: "통신/모바일", code_topidx: "AA", code_topcd: "AA0300000", top: "IT/인터넷"}
,{code_id: "AA0311000", code_name: "웹기획/PM", code_topidx: "AA", code_topcd: "AA0300000", top: "IT/인터넷"}
,{code_id: "AA0312000", code_name: "웹마스터/QA/테스터", code_topidx: "AA", code_topcd: "AA0300000", top: "IT/인터넷"}
,{code_id: "AA0313000", code_name: "컨텐츠/사이트운영", code_topidx: "AA", code_topcd: "AA0300000", top: "IT/인터넷"}
,{code_id: "AA0314000", code_name: "게임/GAME", code_topidx: "AA", code_topcd: "AA0300000", top: "IT/인터넷"}
,{code_id: "AA0315000", code_name: "IT/디자인/컴퓨터교육", code_topidx: "AA", code_topcd: "AA0300000", top: "IT/인터넷"}
,{code_id: "AA0316000", code_name: "동영상/편집/코덱", code_topidx: "AA", code_topcd: "AA0300000", top: "IT/인터넷"}
,{code_id: "AA0317000", code_name: "인공지능(AI)/빅데이터", code_topidx: "AA", code_topcd: "AA0300000", top: "IT/인터넷"}
,{code_id: "AA0401000", code_name: "그래픽디자인/CG", code_topidx: "AA", code_topcd: "AA0400000", top: "디자인"}
,{code_id: "AA0402000", code_name: "출판/편집디자인", code_topidx: "AA", code_topcd: "AA0400000", top: "디자인"}
,{code_id: "AA0403000", code_name: "제품/산업디자인", code_topidx: "AA", code_topcd: "AA0400000", top: "디자인"}
,{code_id: "AA0404000", code_name: "캐릭터/만화/애니", code_topidx: "AA", code_topcd: "AA0400000", top: "디자인"}
,{code_id: "AA0405000", code_name: "의류/패션/잡화디자인", code_topidx: "AA", code_topcd: "AA0400000", top: "디자인"}
,{code_id: "AA0406000", code_name: "전시/공간디자인", code_topidx: "AA", code_topcd: "AA0400000", top: "디자인"}
,{code_id: "AA0407000", code_name: "광고/시각디자인", code_topidx: "AA", code_topcd: "AA0400000", top: "디자인"}
,{code_id: "AA0408000", code_name: "디자인기타", code_topidx: "AA", code_topcd: "AA0400000", top: "디자인"}
,{code_id: "AA0501000", code_name: "웨딩/행사/이벤트", code_topidx: "AA", code_topcd: "AA0500000", top: "서비스"}
,{code_id: "AA0502000", code_name: "안내/도우미/나레이터", code_topidx: "AA", code_topcd: "AA0500000", top: "서비스"}
,{code_id: "AA0503000", code_name: "보안/경호/안전", code_topidx: "AA", code_topcd: "AA0500000", top: "서비스"}
,{code_id: "AA0504000", code_name: "주차/세차/주유", code_topidx: "AA", code_topcd: "AA0500000", top: "서비스"}
,{code_id: "AA0505000", code_name: "AS/서비스/수리", code_topidx: "AA", code_topcd: "AA0500000", top: "서비스"}
,{code_id: "AA0506000", code_name: "외식/식음료", code_topidx: "AA", code_topcd: "AA0500000", top: "서비스"}
,{code_id: "AA0507000", code_name: "호텔/카지노/콘도", code_topidx: "AA", code_topcd: "AA0500000", top: "서비스"}
,{code_id: "AA0508000", code_name: "여행/관광/항공", code_topidx: "AA", code_topcd: "AA0500000", top: "서비스"}
,{code_id: "AA0509000", code_name: "레저/스포츠", code_topidx: "AA", code_topcd: "AA0500000", top: "서비스"}
,{code_id: "AA0510000", code_name: "미용/피부관리/애견", code_topidx: "AA", code_topcd: "AA0500000", top: "서비스"}
,{code_id: "AA0511000", code_name: "요리/제빵사/영양사", code_topidx: "AA", code_topcd: "AA0500000", top: "서비스"}
,{code_id: "AA0512000", code_name: "가사/청소/육아", code_topidx: "AA", code_topcd: "AA0500000", top: "서비스"}
,{code_id: "AA0601000", code_name: "경영분석/컨설턴트", code_topidx: "AA", code_topcd: "AA0600000", top: "전문직"}
,{code_id: "AA0602000", code_name: "증권/투자/펀드/외환", code_topidx: "AA", code_topcd: "AA0600000", top: "전문직"}
,{code_id: "AA0603000", code_name: "설문/통계/리서치", code_topidx: "AA", code_topcd: "AA0600000", top: "전문직"}
,{code_id: "AA0604000", code_name: "헤드헌팅/노무/직업상담", code_topidx: "AA", code_topcd: "AA0600000", top: "전문직"}
,{code_id: "AA0605000", code_name: "외국어/번역/통역", code_topidx: "AA", code_topcd: "AA0600000", top: "전문직"}
,{code_id: "AA0606000", code_name: "법률/특허/상표", code_topidx: "AA", code_topcd: "AA0600000", top: "전문직"}
,{code_id: "AA0607000", code_name: "세무/회계/CPA", code_topidx: "AA", code_topcd: "AA0600000", top: "전문직"}
,{code_id: "AA0608000", code_name: "채권/보험/보상/심사", code_topidx: "AA", code_topcd: "AA0600000", top: "전문직"}
,{code_id: "AA0609000", code_name: "도서관사서", code_topidx: "AA", code_topcd: "AA0600000", top: "전문직"}
,{code_id: "AA0610000", code_name: "연구소/R&D", code_topidx: "AA", code_topcd: "AA0600000", top: "전문직"}
,{code_id: "AA0611000", code_name: "임원/CEO", code_topidx: "AA", code_topcd: "AA0600000", top: "전문직"}
,{code_id: "AA0612000", code_name: "문화/예술/종교", code_topidx: "AA", code_topcd: "AA0600000", top: "전문직"}
,{code_id: "AA0613000", code_name: "특수직", code_topidx: "AA", code_topcd: "AA0600000", top: "전문직"}
,{code_id: "AA0701000", code_name: "의사/치과/한의사", code_topidx: "AA", code_topcd: "AA0700000", top: "의료"}
,{code_id: "AA0702000", code_name: "수의사", code_topidx: "AA", code_topcd: "AA0700000", top: "의료"}
,{code_id: "AA0703000", code_name: "약사", code_topidx: "AA", code_topcd: "AA0700000", top: "의료"}
,{code_id: "AA0704000", code_name: "간호사", code_topidx: "AA", code_topcd: "AA0700000", top: "의료"}
,{code_id: "AA0705000", code_name: "간호조무사", code_topidx: "AA", code_topcd: "AA0700000", top: "의료"}
,{code_id: "AA0706000", code_name: "의료기사", code_topidx: "AA", code_topcd: "AA0700000", top: "의료"}
,{code_id: "AA0707000", code_name: "사무/원무/코디", code_topidx: "AA", code_topcd: "AA0700000", top: "의료"}
,{code_id: "AA0708000", code_name: "보험심사과", code_topidx: "AA", code_topcd: "AA0700000", top: "의료"}
,{code_id: "AA0709000", code_name: "의료기타직", code_topidx: "AA", code_topcd: "AA0700000", top: "의료"}
,{code_id: "AA0801000", code_name: "생산/제조/포장/조립", code_topidx: "AA", code_topcd: "AA0800000", top: "생산/제조"}
,{code_id: "AA0802000", code_name: "생산관리/품질관리", code_topidx: "AA", code_topcd: "AA0800000", top: "생산/제조"}
,{code_id: "AA0803000", code_name: "기계/기계설비", code_topidx: "AA", code_topcd: "AA0800000", top: "생산/제조"}
,{code_id: "AA0804000", code_name: "금속/금형", code_topidx: "AA", code_topcd: "AA0800000", top: "생산/제조"}
,{code_id: "AA0805000", code_name: "비금속/요업/신소재", code_topidx: "AA", code_topcd: "AA0800000", top: "생산/제조"}
,{code_id: "AA0806000", code_name: "전기/전자/제어", code_topidx: "AA", code_topcd: "AA0800000", top: "생산/제조"}
,{code_id: "AA0807000", code_name: "반도체/디스플레이/LCD", code_topidx: "AA", code_topcd: "AA0800000", top: "생산/제조"}
,{code_id: "AA0808000", code_name: "화학/에너지", code_topidx: "AA", code_topcd: "AA0800000", top: "생산/제조"}
,{code_id: "AA0809000", code_name: "섬유/의류/패션", code_topidx: "AA", code_topcd: "AA0800000", top: "생산/제조"}
,{code_id: "AA0810000", code_name: "바이오/제약/식품", code_topidx: "AA", code_topcd: "AA0800000", top: "생산/제조"}
,{code_id: "AA0811000", code_name: "설계/CAD/CAM", code_topidx: "AA", code_topcd: "AA0800000", top: "생산/제조"}
,{code_id: "AA0812000", code_name: "안경/렌즈/광학", code_topidx: "AA", code_topcd: "AA0800000", top: "생산/제조"}
,{code_id: "AA0901000", code_name: "토목/조경/도시/측량", code_topidx: "AA", code_topcd: "AA0900000", top: "건설"}
,{code_id: "AA0902000", code_name: "건축/인테리어/설계", code_topidx: "AA", code_topcd: "AA0900000", top: "건설"}
,{code_id: "AA0903000", code_name: "전기/소방/통신/설비", code_topidx: "AA", code_topcd: "AA0900000", top: "건설"}
,{code_id: "AA0904000", code_name: "환경/플랜트", code_topidx: "AA", code_topcd: "AA0900000", top: "건설"}
,{code_id: "AA0905000", code_name: "현장/시공/감리/공무", code_topidx: "AA", code_topcd: "AA0900000", top: "건설"}
,{code_id: "AA0906000", code_name: "안전/품질/검사/관리", code_topidx: "AA", code_topcd: "AA0900000", top: "건설"}
,{code_id: "AA0907000", code_name: "부동산/개발/경매분양", code_topidx: "AA", code_topcd: "AA0900000", top: "건설"}
,{code_id: "AA0908000", code_name: "본사/관리/전산", code_topidx: "AA", code_topcd: "AA0900000", top: "건설"}
,{code_id: "AA1001000", code_name: "물류/유통/운송", code_topidx: "AA", code_topcd: "AA1000000", top: "유통/무역"}
,{code_id: "AA1002000", code_name: "해외영업/무역영업", code_topidx: "AA", code_topcd: "AA1000000", top: "유통/무역"}
,{code_id: "AA1003000", code_name: "구매/자재/재고", code_topidx: "AA", code_topcd: "AA1000000", top: "유통/무역"}
,{code_id: "AA1004000", code_name: "납품/배송/택배", code_topidx: "AA", code_topcd: "AA1000000", top: "유통/무역"}
,{code_id: "AA1005000", code_name: "상품기획/MD", code_topidx: "AA", code_topcd: "AA1000000", top: "유통/무역"}
,{code_id: "AA1006000", code_name: "무역사무/수출입", code_topidx: "AA", code_topcd: "AA1000000", top: "유통/무역"}
// ,{code_id: "AA1007000", code_name: "운전/기사", code_topidx: "AA", code_topcd: "AA1000000", top: "유통/무역"}
,{code_id: "AA1008000", code_name: "중장비/화물", code_topidx: "AA", code_topcd: "AA1000000", top: "유통/무역"}
,{code_id: "AA1101000", code_name: "방송연출/PD/감독", code_topidx: "AA", code_topcd: "AA1100000", top: "미디어"}
,{code_id: "AA1102000", code_name: "카메라/조명/미술", code_topidx: "AA", code_topcd: "AA1100000", top: "미디어"}
,{code_id: "AA1103000", code_name: "진행/아나운서", code_topidx: "AA", code_topcd: "AA1100000", top: "미디어"}
,{code_id: "AA1104000", code_name: "작가/시나리오", code_topidx: "AA", code_topcd: "AA1100000", top: "미디어"}
,{code_id: "AA1105000", code_name: "기자", code_topidx: "AA", code_topcd: "AA1100000", top: "미디어"}
,{code_id: "AA1106000", code_name: "연예/엔터테인먼트", code_topidx: "AA", code_topcd: "AA1100000", top: "미디어"}
,{code_id: "AA1107000", code_name: "공연/무대/스텝", code_topidx: "AA", code_topcd: "AA1100000", top: "미디어"}
,{code_id: "AA1108000", code_name: "영화제작/배급", code_topidx: "AA", code_topcd: "AA1100000", top: "미디어"}
,{code_id: "AA1109000", code_name: "광고/카피/CF", code_topidx: "AA", code_topcd: "AA1100000", top: "미디어"}
,{code_id: "AA1110000", code_name: "음악/음향/사운드", code_topidx: "AA", code_topcd: "AA1100000", top: "미디어"}
,{code_id: "AA1111000", code_name: "인쇄/출판/편집", code_topidx: "AA", code_topcd: "AA1100000", top: "미디어"}
,{code_id: "AA1112000", code_name: "사진/포토그라퍼", code_topidx: "AA", code_topcd: "AA1100000", top: "미디어"}
,{code_id: "AA1201000", code_name: "유치원/보육", code_topidx: "AA", code_topcd: "AA1200000", top: "교육"}
,{code_id: "AA1202000", code_name: "초중고/특수학교", code_topidx: "AA", code_topcd: "AA1200000", top: "교육"}
,{code_id: "AA1203000", code_name: "입시/보습/속셈학원", code_topidx: "AA", code_topcd: "AA1200000", top: "교육"}
,{code_id: "AA1204000", code_name: "외국어/어학원", code_topidx: "AA", code_topcd: "AA1200000", top: "교육"}
,{code_id: "AA1205000", code_name: "학습지/과외/방문", code_topidx: "AA", code_topcd: "AA1200000", top: "교육"}
,{code_id: "AA1206000", code_name: "전문직업/IT강사", code_topidx: "AA", code_topcd: "AA1200000", top: "교육"}
,{code_id: "AA1207000", code_name: "대학교수/행정직", code_topidx: "AA", code_topcd: "AA1200000", top: "교육"}
,{code_id: "AA1208000", code_name: "교육기획/교재", code_topidx: "AA", code_topcd: "AA1200000", top: "교육"}
,{code_id: "AA1209000", code_name: "학원관리/운영/상담", code_topidx: "AA", code_topcd: "AA1200000", top: "교육"}
,{code_id: "AA1301000", code_name: "공무원", code_topidx: "AA", code_topcd: "AA1300000", top: "특수계층/공공"}
,{code_id: "AA1302000", code_name: "장교/군인/부사관", code_topidx: "AA", code_topcd: "AA1300000", top: "특수계층/공공"}
,{code_id: "AA1303000", code_name: "병역특례", code_topidx: "AA", code_topcd: "AA1300000", top: "특수계층/공공"}
,{code_id: "AA1304000", code_name: "중장년/고령인/실버", code_topidx: "AA", code_topcd: "AA1300000", top: "특수계층/공공"}
,{code_id: "AA1305000", code_name: "장애인/국가유공자", code_topidx: "AA", code_topcd: "AA1300000", top: "특수계층/공공"}
,{code_id: "AA1306000", code_name: "사회복지/요양/봉사", code_topidx: "AA", code_topcd: "AA1300000", top: "특수계층/공공"}
,{code_id: "AA1401000", code_name: "임원기사", code_topidx: "AA", code_topcd: "AA1400000", top: "운전/수행기사"}
]

export { JIKJONGTOP, JIKJONGTOP_ALL, JIKJONG_GROUP, JIKJONGTOP_SIMPLE };