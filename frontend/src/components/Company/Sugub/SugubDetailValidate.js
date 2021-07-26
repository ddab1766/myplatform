const SugubDetailValidate = values => {
  const errors = {};
    const required = '필수 입력사항입니다.';
    //수급제목
    if(!values.sugub_title){
        errors.sugub_title = required
    }
    //직종(대)
    if(!values.sugub_jikjong_top){
        errors.sugub_jikjong_top = required
    }
    //직종(중)
    if(!values.sugub_jikjong_mid){
        errors.sugub_jikjong_mid = required
    }
    //채용형태
    if(!values.chae_cd){
        errors.chae_cd = required
    }else{
        if(typeof values.chae_cd === 'object' && values.chae_cd.code_id === 'AC0100000' ){ // 파견건
            //계약기간
            if(!values.chae_gigan) errors.chae_gigan = required
            //계약형태
            if(!values.chae_gigan_type) errors.chae_gigan_type = required

        }else if(values.chae_cd === 'AC0100000'){
            //계약기간
            if(!values.chae_gigan) errors.chae_gigan = required
            //계약형태
            if(!values.chae_gigan_type) errors.chae_gigan_type = required
        }
        if(typeof values.chae_cd === 'object' && values.chae_cd.code_id === 'AC0300000' ){ // 채용대행건
            //고용형태
            if(!values.hire_type) errors.hire_type = required
        }else if(values.chae_cd === 'AC0300000'){
            //고용형태
            if(!values.hire_type) errors.hire_type = required
        }
    }

    //채용마감일
    if(!values.sugub_end_dt){
        errors.sugub_end_dt = required
    }
    //포지션명
    if(!values.work_position){
        errors.work_position = required
    }else if(values.work_position.length >= 50){
        errors.work_position = '50글자 이하로 작성해주세요.'
    }
    //필수 우대사항
    // if(!values.spec){
    //     errors.spec = required
    // }else if(values.spec.length >= 1000){
    //     errors.spec = '1000글자 이하로 작성해주세요.'
    // }
    //담당업무
    if(!values.work_role){
        errors.work_role = required
    }else if(values.work_role.length >= 1000){
        errors.work_role = '1000글자 이하로 작성해주세요.'
    }
    //경력구분
    if(!values.sugub_career_gb) {
        errors.sugub_career_gb = required
    }else {
        if(typeof values.sugub_career_gb === 'object' && values.sugub_career_gb.code_id === 'AB0200000' ) { // 경력
            //경력시작
            if (!values.career_start) errors.career_start = required;
            //경력종료
            if (!values.career_end) errors.career_end = required;
        } else if(values.chae_cd === 'AB0200000'){
            //경력시작
            if (!values.career_start) errors.career_start = required;
            //경력종료
            if (!values.career_end) errors.career_end = required;
        }
    }

    //학력구분
    if(!values.education_cd){
        errors.education_cd = required
    }
    //연령시작
    if(!values.age_start) {
        errors.age_start = required
    }
    //연령종료
    if(!values.age_end) {
        errors.age_end = required
    }
    //연봉시작
    if(!values.salary_start) {
        errors.salary_start = required
    }
    //연봉종료
    if(!values.salary_end) {
        errors.salary_end = required
    }
    //근무부서
    if(!values.work_dept) {
        errors.work_dept = required
    }
    //근무형태
    if(!values.work_type) {
        errors.work_type = required
    }
    //전환여부
    if(!values.cont_chg_gb) {
        errors.cont_chg_gb = required
    }
    //근무부서
    if(!values.work_dept) {
        errors.work_dept = required
    }
    //근무시간(시작)
    if(!values.work_time_start){
        errors.work_time_start = required
    }else if(values.work_time_start && values.work_time_start.length !== 4) {
        errors.work_time_start = '(예) 0900'
    }
    //근무시간(종료)
    if(!values.work_time_end){
        errors.work_time_end = required
    }else if(values.work_time_end && values.work_time_end.length !== 4) {
        errors.work_time_end = '(예) 1800'
    }
    //휴식시간(시작)
    // if(!values.work_rest_start){
    //     errors.work_rest_start = required
    // }else if(values.work_rest_start && values.work_rest_start.length !== 4) {
    //     errors.work_rest_start = '(예) 1200'
    // }
    // //휴식시간(종료)
    // if(!values.work_rest_end){
    //     errors.work_rest_end = required
    // }else if(values.work_rest_end && values.work_rest_end.length !== 4) {
    //     errors.work_rest_end = '(예) 1300'
    // }

    return errors
}

export default SugubDetailValidate
