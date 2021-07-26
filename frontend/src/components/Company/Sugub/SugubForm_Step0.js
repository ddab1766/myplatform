// import React from 'react'
// import {reduxForm} from 'redux-form'
// import validateSugubForm from '../Validate_SugubForm'
// import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Radio from "@material-ui/core/Radio";
//
//
// const SugubFormStep0 = props => {
//     const {handleSubmit} = props;
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <FormControl>
//                 <FormLabel component="legend">원하시는 채용건이 있으신가요?</FormLabel>
//                 <RadioGroup row
//                     //valueSelected={input.value}
//                     //onChange={(e) => input.onChange(e.target.value)}
//                 >
//                     <FormControlLabel value="AC0100000" control={<Radio/>} label="파견 건"/>
//                     <FormControlLabel value="AC0300000" control={<Radio/>} label="채용대행 건"/>
//                     <FormControlLabel value="" control={<Radio/>} label="아직 없어요"/>
//                 </RadioGroup>
//                 <span className="form-check-sign">{''}</span>
//                 {/*{touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}*/}
//             </FormControl>
//             <div className="col-md-2 ml-auto">
//                 <button type="submit" className="btn btn-primary">
//                     다음
//                 </button>
//             </div>
//         </form>
//     )
// }
//
// export default reduxForm({
//     form: 'sugub_wizard', // <------ same form name
//     destroyOnUnmount: false, // <------ preserve form data
//     forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
//     validate: validateSugubForm
// })(SugubFormStep0)
