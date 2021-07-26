import React from "react";

export function getCountTotalJobApplicant(sugub) {
    return sugub.jobadvertise && sugub.jobadvertise.length > 0 ? (sugub.jobadvertise[0].jobapplicants.filter(v =>
        v.applied_status.code_id !== 'BW0702000').length)+'명' : (<>0명</>) ;
}
export function getCountMyJobApplicant(sugub,id) {
    return sugub.jobadvertise && sugub.jobadvertise.length > 0 ? (sugub.jobadvertise[0].jobapplicants.filter(v =>
        (v.hrprofile.id === id || v.hrprofile === id)
        && v.applied_status.code_id !== 'BW0702000').length) : (<>0</>) ;

}
//파일 뷰어 url
export function fileViewerUrl(url){

        if(url !== null && url !== undefined &&
            (url.indexOf('doc') !== -1 || url.indexOf('docx') !== -1 ||
             url.indexOf('xls') !== -1 ||
            url.indexOf('pptx') !== -1 || url.indexOf('ppt') !== -1
            )
        ) {
            return '/Viewer/' + url
        } else{
            return url
        }
}
//접수마감인지 체크 함수 (미사용중)
const dateDiff = (_date1,_date2) => {
        var diffDate_1 = _date1 instanceof Date ? _date1 :new Date(_date1);
        var diffDate_2 = _date2 instanceof Date ? _date2 :new Date(_date2);

        diffDate_1 =new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
        diffDate_2 =new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());

        var diff = diffDate_2.getTime() - diffDate_1.getTime();
        diff = Math.ceil(diff / (1000 * 3600 * 24));

        return diff > 0;
}
// 지원자 상태 코드
export function appliedStatusCode(comcode) {
    return comcode.filter(v =>
        (v.code_id === 'BW0100000' ||
            v.code_id === 'BW0200000' ||
            v.code_id === 'BW0302000' ||
            v.code_id === 'BW0301000' ||
            v.code_id === 'BW0401000' ||
            v.code_id === 'BW0402000' ||
            v.code_id === 'BW0801000') && v.code_id !== "BW0702000"
    )
}
// 지원자 상태 필터
export function appliedStatusFilter(jobaps,type) {
    if(type === 1){
        return jobaps.filter(v => v.applied_status.code_id === 'BW0100000')
    }else if(type === 2){
        return jobaps.filter(v => v.applied_status.code_id === 'BW0200000' || v.applied_status.code_id === 'BW0302000')
    }else if(type === 3){

        return jobaps.filter(v => v.applied_status.code_id === 'BW0301000')
    }else if(type === 4){
        return jobaps.filter(v => v.applied_status.code_id === 'BW0401000' ||
            v.applied_status.code_id === 'BW0402000')
    }else if(type === 5){
        return jobaps.filter(v => v.applied_status.code_id === 'BW0801000')
    }else if(type === 0){
        return jobaps.filter(v => v.applied_status.code_id !== "BW0702000")
    }
}
// 월별 조회
export function filterByMonth(data, date){
    var start = new Date(date.getFullYear(),date.getMonth(), 1);
    var end = new Date(date.getFullYear(),date.getMonth()+1, 0);
    return data.filter(v=>new Date(v.created_time) >= start && new Date(v.created_time) <= end)
}
// 5줄 이상 제한
export function limitedText(textData, linkUrl){
    let text;
    if(!textData) return null;
    text = textData.split('\n').map((line, index)=> {
        if(index === 5) return (<>...</>);
        else if(index > 5) return null;
        return (<>{line}<br/></>)
    });
    return text
}
// 텍스트 줄바꿈
export function brText(textData, linkUrl){
    let text;
    if(!textData) return null;
    text = textData.split('\n').map((line, index)=> {
        return (<>{line}<br/></>)
    });
    return text
}
//생년월일 포맷(YYYY-MM-DD)
export function birthFormat(birth){
    return birth.replace(/(.{4})/,"$1-").replace(/(.{7})/,"$1-")
}
export function dateFormat(date){
    return date.replace(/(.{4})/,"$1/").replace(/(.{7})/,"$1/")
}
//전화번호 포맷(nnn-nnnn-nnnn)
export function phoneFormat(num){
    if(num.indexOf('-') === -1){
        return num.replace(/(.{3})/,"$1-").replace(/(.{8})/,"$1-")
    }else{
        return num
    }
}
//1000단위 콤마
export function thousands(value){
    if(value !== null && value !== undefined) {
        return value.toString().replace(/(?=(?!(\b))(\d{3})+$)/g, '$1,');
    } else{
        return '?'
    }
}
// 채팅 수신자
export function recipients(chatroom, currentUser){
    if(chatroom.chatroom_messages){
        return chatroom.participants.filter(participant => participant.id !== currentUser.id)[0]
    }
}

// 채팅 메시지
export function messages(chatroom){
    if(chatroom.chatroom_messages){
        return chatroom.chatroom_messages[0].content
    }
}

export function getPermission(user, coworker, gubun) {
    if(gubun === 'hr'){
        if(coworker.filter(v => v.user.email === user.email)[0] !== undefined) {
            return coworker.filter(v => v.user.email === user.email)[0].hrprofile_auth['code_id']
        }
    }else {
        if(coworker.filter(v => v.user.email === user.email)[0] !== undefined){
            return coworker.filter(v => v.user.email === user.email)[0].companyprofile_auth['code_id']
        }
    }
}

// 사업자번호 체크 유효성 검사
export function checkCorporateRegistrationNumber(value) {
    var numberMap = value.replace(/-/gi, '').split('').map(function (d){
		return parseInt(d, 10);
	});

	if(numberMap.length === 10){
		var keyArr = [1, 3, 7, 1, 3, 7, 1, 3, 5];
		var chk = 0;

		keyArr.forEach(function(d, i){
			chk += d * numberMap[i];
		});

		chk += parseInt((keyArr[8] * numberMap[8])/ 10, 10);
		console.log(chk);
		return Math.floor(numberMap[9]) === ( (10 - (chk % 10) ) % 10);
	}

	return false;
}
