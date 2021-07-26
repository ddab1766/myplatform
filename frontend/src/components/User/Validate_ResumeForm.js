const validateResume = values => {
  const errors = {};

  const required = '필수 입력사항입니다.';
  
  // 이력서 제목
  if(!values.resume_title){
    errors.resume_title = required
  }
  // 이력서 이름
  if(!values.resume_username){
    errors.resume_username = required
  }
  // 이력서 연락처
  if(!values.resume_phone){
    errors.resume_phone = required
  }
  // else if(/^-*$/g.test(values.resume_phone)){
  //   errors.resume_phone = '-없이 입력해주세요.'
  else if(values.resume_phone.length > 11){
    errors.resume_phone = '11자리 이하로 입력해주세요.'
  }
  // 이력서 생년월일
  if(!values.resume_birth){
    errors.resume_birth = required
  }
  else if(values.resume_birth.length > 8){
    errors.resume_birth = '8자리 이하로 입력해주세요.'
  }


  return errors
}

export default validateResume