// import React from "react";
// // reactstrap components
// import history from "../../utils/historyUtils";
// import {Field, reduxForm} from 'redux-form'
// import {renderField} from "../../utils/renderUtils";
//
// const PagyeonForm = (props) => {
//     const { handleSubmit } = props
//
//     return (
//         <>
//             <form onSubmit={handleSubmit} className="mx-5">
//                 <div class="form-row">
//                 <fieldset className="form-group col-md-2">
//                     <Field
//                         name="emp_name"
//                         label="성명"
//                         component={renderField}
//                         type="text"
//                     />
//                 </fieldset>
//                 </div>
//                 {/* <Field
//                         name="id"
//                         label="수급"
//                         options={sugubs}
//                         component={SelectField}
//                         selectLabel="sugub_title"
//                     /> */}
//                 {/* <Field
//                         name="companyprofile"
//                         label="기업"
//                         options={companys}
//                         component={SelectField}
//                         selectLabel="custname"
//                     /> */}
//                 <div class="form-row">
//                     <fieldset className="form-group col-md-2">
//                         <Field
//                             name="birth"
//                             label="생년월일"
//                             component={renderField}
//                             type="text"
//                         />
//                     </fieldset>
//
//                 </div>
//                 <div class="form-row">
//                 <fieldset className="form-group col-md-2">
//                         <Field
//                             name="telno"
//                             component={renderField}
//                             label="연락처"
//                             type="text"
//                         />
//                     </fieldset>
//                 </div>
//                 <div class="form-row">
//                     <fieldset className="form-group col-md-3">
//                         <Field
//                             name="term_from_to"
//                             label="계약기간"
//                             component={renderField}
//                             type="text"
//                         />
//                     </fieldset>
//                 </div>
//                 <div class="form-row">
//                     <fieldset className="form-group col-md-2">
//                         <Field
//                             name="zipcode"
//                             label="우편번호"
//                             component={renderField}
//                             type="text"
//                         />
//                     </fieldset>
//                 </div>
//                 <fieldset className="form-group">
//                     <Field
//                         name="addr"
//                         label="주소"
//                         component={renderField}
//                         type="text"
//                     />
//                 </fieldset>
//                 <fieldset className="form-group">
//                     <Field
//                         name="addr_2"
//                         component={renderField}
//                         label="상세주소"
//                         type="text"
//                     />
//                 </fieldset>
//                 {/* <Field
//                         name="resume_filename"
//                         component={renderField}
//                         label="이력서"
//                         type="text"
//                     /> */}
//                 <div class="form-row">
//                     <fieldset className="form-group col-md-2">
//                         <label>입사일</label>
//                         <Field name="ip_start" component="input" type="date"/>
//
//                     </fieldset>
//                     <fieldset className="form-group col-md-2">
//                         <label>퇴사일</label>
//                         <Field name="ip_end" component="input" type="date"/>
//                     </fieldset>
//                 </div>
//                 <div class="form-row">
//                     <fieldset className="form-group col-md-2">
//                         <Field
//                             name="mng_id"
//                             component={renderField}
//                             label="담당자"
//                             type="text"
//                         />
//                     </fieldset>
//                 </div>
//                 <fieldset className="form-group">
//                     <button action="submit" className="btn btn-primary">등록</button>
//                     <button type="button" className="btn btn-primary" onClick={() => history.back()}>뒤로가기</button>
//                 </fieldset>
//             </form>
//         </>
//     )
// };
//
// export default reduxForm({
//     form: 'PagyeonForm', // a unique identifier for this form
//     enableReinitialize: true,
// })(PagyeonForm)