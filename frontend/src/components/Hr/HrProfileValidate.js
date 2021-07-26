import validator from "validator";
import {checkCorporateRegistrationNumber} from "../../function/common";


const HrProfileValidate = values => {
    const {services, custname, custid, phone} = values;
    const errors = {};
    const required = '필수 입력사항입니다.';

    if (services && services.length === 0 ) {
        errors.services = required
    }
    if (!custname) {
        errors.custname = required
    }

    if(custid){
        if(custid.length > 12) errors.custid = '올바른 사업자번호를 입력해주세요.';
        if(!checkCorporateRegistrationNumber(custid)) errors.custid = '올바른 사업자번호를 입력해주세요.';
    }

    if(!phone){
        errors.phone = required
    }else if(phone.length > 13){
        errors.phone = '13글자 이하로 작성해주세요.'
    }

    return errors;
};

export default HrProfileValidate;
