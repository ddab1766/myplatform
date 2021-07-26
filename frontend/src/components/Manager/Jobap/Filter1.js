// import React, {useEffect, useState} from 'react'
// import {reduxForm} from 'redux-form'
// import {
//     Checkbox,
//     ControlLabel,
//     Form,
//     FormControl,
//     FormGroup,
//     Icon,
//     Input,
//     InputGroup,
//     Panel,
//     Radio,
//     RadioGroup,
//     TagPicker
// } from 'rsuite';
// import store from "../../../store";
//
// class CheckField extends React.PureComponent {
//     render() {
//         const { name, message, label, accepter, data, topidx, topcd, error, ...props } = this.props;
//         const list = data.map((v,index) => {
//             if (v.code_topidx === topidx && v.code_topcd === topcd) {
//                 return (
//                     <Checkbox key={index} value={v.code_id}>{v.code_name}</Checkbox>
//                 )
//             } else{
//                 return null;
//             }
//         }).filter(o => o);
//         return (
//             <FormGroup className={error ? 'has-error' : ''}>
//                 <ControlLabel>{label} </ControlLabel>
//                 <FormControl
//                     name={name}
//                     accepter={accepter}
//                     errorMessage={error}
//                     inline
//                 >{list}</FormControl>
//
//                 {/*<HelpBlock>{message}</HelpBlock>*/}
//             </FormGroup>
//         );
//     }
// }
//
// const area0 = ["서울","인천","대전","광주","대구","울산","부산","경기","강원","충북","충남","전북","전남","경북","경남","제주"];
// const SugubEditForm = props => {
//     const [comCode, setComcode] = useState([]);
//     useEffect(() => {
//         setComcode(store.getState().comcode.comcode);
//
//     }, [])
//     const selectOptions = comCode.filter(v =>v.code_topidx === 'AA' && v.code_topcd === null).map((v,index) =>{
//         return {'label': v.code_name, 'value': v.code_name}
//     });
//     const areaOptions = area0.map((v,index) =>{
//         return {'label': v, 'value': index}
//     });
//     return (
//         <>
//             <style jsx>{`
//                 .rs-form-inline > *{
//                 margin-bottom: 0px;
//                 }
//
//             `}</style>
//             <Panel header="조회조건" collapsible bordered defaultExpanded style={{background:'white'}}>
//                 <Form layout="inline"
//                     // onChange={formValue => {
//                     //     setFormValue( formValue );
//                     // }}
//                     // formValue={formValue}
//                 >
//                     <FormGroup controlId="radioList">
//                         <ControlLabel>보기 </ControlLabel>
//                         <RadioGroup name="radioList" inline defaultValue="A">
//                             <Radio value="A">전체</Radio>
//                             <Radio value="B">진행중</Radio>
//                             <Radio value="C">종료</Radio>
//                         </RadioGroup>
//                     </FormGroup>
//                     <br/>
//                     {/*<CheckField name="gubun" data={comCode} label="경력"*/}
//                     {/*            accepter={CheckboxGroup} topidx='AB' topcd={null}*/}
//                     {/*            inline*/}
//                     {/*/>*/}
//                     {/*<br/>*/}
//                     {/*<CheckField name="gubun1" data={comCode} label="학력"*/}
//                     {/*            accepter={CheckboxGroup} topidx='AO' topcd={null}*/}
//                     {/*            inline*/}
//                     {/*/>*/}
//                     {/*<br/>*/}
//                     <label className="rs-control-label">기업명</label>
//                     <TagPicker data={selectOptions} style={{ minWidth:300,width:"auto",marginLeft:'9px',marginBottom:'5px' }} placeholder="선택"/>
//                     <br/>
//                     <label className="rs-control-label">지원자 이름</label>
//                     <FormGroup controlId="radioList">
//                         <InputGroup style={{width:150,marginLeft:'9px'}}>
//                             <Input />
//                             <InputGroup.Button>
//                                 <Icon icon="search" />
//                             </InputGroup.Button>
//                         </InputGroup>
//                     </FormGroup>
//                     <label className="rs-control-label">핸드폰</label>
//                     <FormGroup controlId="radioList">
//                         <InputGroup style={{width:150,marginLeft:'9px'}}>
//                             <Input />
//                             <InputGroup.Button>
//                                 <Icon icon="search" />
//                             </InputGroup.Button>
//                         </InputGroup>
//                     </FormGroup>
//                     {/*<label className="rs-control-label">지역 </label>*/}
//                     {/*<TagPicker data={areaOptions} style={{ minWidth:300,width:"auto",marginLeft:'9px' }} placeholder="선택"/>*/}
//
//                 </Form>
//             </Panel>
//         </>
//     )
// }
// function mapStateToProps(state, props) {
//     return {
//         initialValues: state.common.data,
//     }
// }
// // export default connect(mapStateToProps)(reduxForm({
// //     form: 'SugubEditForm',
// //     enableReinitialize: true,
// //     // onSubmit:submitForm
// // })(SugubEditForm))
// export default reduxForm({
//     form: 'SugubEditForm', // a unique identifier for this form
//     enableReinitialize: true,
//     onSubmitFail: (errors) => {
//         document.getElementsByClassName('main-panel')[0].scrollTop=0;
//     }
// })(SugubEditForm)
