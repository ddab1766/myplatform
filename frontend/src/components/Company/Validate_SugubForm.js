// const validate = values => {
//   const errors = {}
//   const required = '필수 입력사항입니다.';
//
//   //직종(중)
//   if(values.sugub_jikjong_mid === ''){
//     errors.sugub_jikjong_mid = required
//   }else if(values.sugub_jikjong_top === values.sugub_jikjong_mid){
//     errors.sugub_jikjong_mid = required
//   }
//   //직종(소)
//   if(!values.sugub_jikjong_low){
//     errors.sugub_jikjong_low = required
//   }
//   //수급마감일
//   if(!values.sugub_end_dt){
//     errors.sugub_end_dt = required
//   }else if (values.sugub_end_dt.length  !== 10  ){
//     errors.sugub_end_dt = '(예) 2021-06-04 형태로 입력 해야합니다.'
//   }
//   //채용형태
//   if(!values.chae_cd){
//     errors.chae_cd = required
//   }
//   //계약기간
//   if(!values.chae_gigan){
//     errors.chae_gigan = required
//   }else if(values.chae_gigan < 1){
//     errors.chae_gigan = '값은 1이상이여야 합니다.'
//   }else if (values.chae_gigan.length >= 3){
//     errors.chae_gigan = '두자리 숫자로 작성해주세요.'
//   }
//   //계약형태
//   if(!values.chae_gigan_type){
//     errors.chae_gigan_type = required
//   }
//   //고용형태
//   if(!values.hire_type){
//     errors.hire_type = required
//   }
//   //포지션명
//   if(!values.work_position){
//     errors.work_position = required
//   }else if(values.work_position.length >= 50){
//     errors.work_position = '50글자 이하로 작성해주세요.'
//   }
//   //필수 우대사항
//   if(!values.spec){
//     // errors.spec = required
//   }else if(values.spec.length > 5000){
//     errors.spec = '5000글자 이하로 작성해주세요.'
//   }
//   //담당업무
//   if(!values.work_role){
//     errors.work_role = required
//   }else if(values.work_role.length > 5000){
//     errors.work_role = '5000글자 이하로 작성해주세요.'
//   }
//   //경력구분
//   if(!values.sugub_career_gb) {
//     errors.sugub_career_gb = required
//   }
//   //경력시작
//   if(!values.career_start) {
//     errors.career_start = required
//   }else if(values.career_start < 1){
//     errors.career_start = '값은 1이상이여야 합니다.'
//   }
//   //경력종료
//   if(!values.career_end) {
//     errors.career_end = required
//   }else if(values.career_end < 1){
//     errors.career_end = '값은 1이상이여야 합니다.'
//   }
//   //학력구분
//   if(!values.education_cd){
//     errors.education_cd = required
//   }
//   //채용인원
//   if(!values.hire_count){
//     errors.hire_count = required
//   }else if(values.hire_count < 1){
//     errors.hire_count = '값은 1이상이여야 합니다.'
//   }
//   //수급성별
//   if(!values.sugub_gender){
//     errors.sugub_gender = required
//   }
//   //연령시작
//   if(!values.age_start) {
//     errors.age_start = required
//   }else if(values.age_start < 1){
//     errors.age_start = '값은 1이상이여야 합니다.'
//   }
//   //연령종료
//   if(!values.age_end) {
//     errors.age_end = required
//   }else if(values.age_end < 1){
//     errors.age_end = '값은 1이상이여야 합니다.'
//   }
//   //급여구분
//   if(!values.salary_gubun){
//     errors.salary_gubun = required
//   }
//
//   //연봉시작
//   if(!values.salary_start) {
//     errors.salary_start = required
//   }else if(values.salary_start < 1){
//     errors.salary_start = '값은 1이상이여야 합니다.'
//   }
//   //연봉종료
//   if(!values.salary_end) {
//     errors.salary_end = required
//   }else if(values.salary_end < 1){
//     errors.salary_end = '값은 1이상이여야 합니다.'
//   }
//
//   //실근무지
//   if(!values.work_load_addr){
//     errors.work_load_addr = required
//   }else if(values.work_load_addr.length > 100){
//     errors.work_load_addr = '100자 이하만 허용됩니다.'
//   }
//   // 실근무지상세
//   // if(!values.work_load_addr_detail){
//   //   errors.work_load_addr_detail = required
//   // }
//
//   return errors
// }
//
// export default validate
