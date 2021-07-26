const validateSignup = values => {
  const errors = {};
  const { password1, password2 } = values;
  const required = '필수 입력사항입니다.';

  if (!values.username) {
    errors.username = required
  }
  if (!values.password1){
    errors.password1 = required
  }else if (password1 !== password2) {
    errors.password2 = "비밀번호가 같지 않습니다."
  }
  if(!values.date_of_birth){
    errors.date_of_birth = required
  }else if(values.date_of_birth.length > 10){
    errors.date_of_birth = '10자리 이하로 입력해주세요.'
  }
  if(!values.phone){
    errors.phone = required
  }else if(values.phone.length > 13){
    errors.phone = '13자리 이하로 입력해주세요.'
  }else if(!values.authSuccess){
    errors.phone = '인증이 완료되지 않았습니다.'
  }

  //if(!values.authSuccess){
    // errors.phone = '인증이 완료되지 않았습니다.'
    // errors.auth_number = '인증이 완료되지 않았습니다.'
  // }

  return errors;
};

export default validateSignup