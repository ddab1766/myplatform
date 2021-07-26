const validateSign = values => {
  const errors = {};

  const required = '필수 입력사항입니다.';
  
  //직종(중)
  if(!values.jikjong_mid){
    errors.jikjong_mid = required
  }
  //직종(소)
  if(!values.jikjong_low){
    errors.jikjong_low = required
  }
  //경력기간
  if(!values.career_gigan){
    errors.career_gigan = required
  }else if(values.career_gigan < 0){
    errors.hope_salary = '입력 불가능한 숫자입니다.'
  }

  //희망연봉
  if(!values.hope_salary){
    errors.hope_salary = required
  }else if(values.hope_salary < 0){
    errors.hope_salary = '입력 불가능한 숫자입니다.'
  }

  //거주지
  if(!values.address){
    errors.address = required
  }
  //최종학력
  if(!values.education_level){
    errors.education_level = required
  }
  //성별
  if(!values.gender){
    errors.gender = required
  }
  //이름
  if(!values.username){
    errors.username = required
  }

  /*//경력구분
  if(!values.sugub_career_gb){
    errors.sugub_career_gb = required
  }
  //필수 우대사항
  if(!values.spec){
    errors.spec = required
  }else if(values.spec.length >= 100){
    errors.spec = '100글자 이하로 작성해주세요.'
  }
  //포지션명
  if(!values.work_position){
    errors.work_position = required
  }else if(values.work_position.length >= 50){
    errors.work_position = '50글자 이하로 작성해주세요.'
  }
  //담당업무
  if(!values.work_role){
    errors.work_role = required
  }else if(values.work_role.length >= 1000){
    errors.work_role = '1000글자 이하로 작성해주세요.'
  }*/

  return errors
}

export default validateSign