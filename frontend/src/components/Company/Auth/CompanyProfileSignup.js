// import React, {useEffect, useState} from "react";
// import {Field, reduxForm} from "redux-form";
// import {renderAsyncCreatableSelectField, renderError, renderField, renderTextAreaField} from "../../../utils/renderUtils";
// import {getCompanyProfile, updateCompanyProfile} from "../../../actions/authActions";
// import {connect, useSelector} from "react-redux";
// import {Card, CardBody, CardHeader, Col, Container, Row, Spinner} from "reactstrap";
// import Button from "@material-ui/core/Button";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import store from "../../../store";
// import axios from "axios";
// import {apiUrls} from "../../../constants/urls";
// import LoaderSpinner from "../../Etc/LoaderSpinner";
// import history from "utils/historyUtils";
// // import Card from "@material-ui/core/Card";
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import PropTypes from 'prop-types';
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import validator from "validator";
//
// function TabPanel(props) {
//     const { children, value, index, ...other } = props;
//
//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box p={3}>
//                     <Typography component="span">{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }
//
// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
// };
//
// function a11yProps(index) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }
//
// const CompanyProfileSignup = (props) => {
//     const {handleSubmit, error, submitting} = props;
//     let initialValues = store.getState().form.companyupdate.initial;
//     const company = props.company;
//
//     const [image, setImage] = useState(null);
//     const [imageFile, setImageFile] = useState(null);
//     const [logo, setLogo] = useState(null);
//     const [logoFile, setLogoFile] = useState(null);
//     const [value, setValue] = useState(0);
//
//     // const hrprofile_file = useSelector((store) =>
//     //     store.form.companyupdate.values ? store.form.companyupdate.values.hrprofile_file : null
//     // );
//     const company_logo = useSelector((store) =>
//         store.form.companyupdate.values ? store.form.companyupdate.values.company_logo : null
//     );
//     const company_image = useSelector((store) =>
//         store.form.companyupdate.values ? store.form.companyupdate.values.company_image : null
//     );
//
//     // tab value
//     const handleChange = (event, newValue) => {
//         // setValue(newValue);
//         const syncErrors = store.getState().form.companyupdate.syncErrors;
//         if(syncErrors === undefined) {
//             setValue(newValue);
//         }else{
//             alert('?????? ??????????????? ??????????????????!')
//         }
//     };
//
//     // Company_image
//     useEffect(()=>{
//         if(company && image){
//             let formValues = new FormData();
//             console.log('image', image)
//             formValues.append('company_image', image, image.name);
//             axios
//                 .patch(apiUrls.CUSTOM_COMPANY_PROFILE + company.id + '/', formValues, {
//                     headers: {
//                         'content-type': 'multipart/form-data'
//                     }
//                 })
//                 .then(({data}) => {
//                     setImageFile(data.company_image)
//                     props.getCompanyProfile()
//                 })
//                 .catch(err => console.log(err));
//         }
//     }, [image]);
//     // Company_logo
//     useEffect(()=>{
//         if(company && logo){
//             let formValues = new FormData();
//             formValues.append('company_logo', logo, logo.name);
//             axios
//                 .patch(apiUrls.CUSTOM_COMPANY_PROFILE + company.id + '/', formValues, {
//                     headers: {
//                         'content-type': 'multipart/form-data'
//                     }
//                 })
//                 .then(({data}) => {
//                     setLogoFile(data.company_logo);
//                     props.getCompanyProfile()
//                 })
//                 .catch(err => {
//                     console.log('Company_logo err', err.response.data);
//                     console.log('Company_logo status', err.response.status);
//                 });
//         }
//     }, [logo]);
//
//     console.log('CompanyProfileEdit company:', company)
//
//
//     return (
//         <div className="content">
//             <Container>
//                 <div className="title">
//                     <h3>?????? ????????? ??????????????????.<br/>
//                         <small>?????????/?????????????????? ?????? ???????????? ???????????? ??????, ?????? ????????? ???????????? ??????????????? ???????????? ????????????.</small>
//                     </h3>
//                 </div>
//                 <hr/>
//                 <form className="mx-5"
//                       onSubmit={handleSubmit}
//                 >
//                     <Col className="text-right">
//                         <fieldset className="form-group">
//                             <button action="submit" className="btn btn-lg btn-primary" disabled={submitting}>
//                                 {submitting === true && (
//                                     <Spinner
//                                         as="span"
//                                         animation="border"
//                                         size="sm"
//                                         role="status"
//                                         aria-hidden="true"
//                                     />)
//                                 }??????
//                             </button>
//                         </fieldset>
//                     </Col>
//                     <Card>
//                         <CardHeader>
//                             <Tabs value={value} onChange={handleChange} textColor="Primary" aria-label="simple tabs example" indicatorColor="primary">
//                                 <Tab label="????????????" {...a11yProps(0)} />
//                                 <Tab label="????????????" {...a11yProps(1)} />
//                                 <Tab label="?????????" {...a11yProps(2)} />
//                             </Tabs>
//                         </CardHeader>
//                         <CardBody>
//                             <TabPanel value={value} index={0}>
//                                 {/* EnterKey Prevent */}
//                                 <fieldset className="form-group">
//                                     <Field name="custname" label="????????????" component={renderAsyncCreatableSelectField}
//                                            type="text" required
//                                            disabled={initialValues && initialValues.custname ? true : false}
//                                     />
//                                     {initialValues && initialValues.custname && (
//                                         <FormHelperText>????????? ????????? admin@chaegong.co.kr ??? ??????????????????</FormHelperText>
//                                     )}
//                                 </fieldset>
//
//                                 <fieldset className="form-group">
//                                     <Field name="custid" label="???????????????" component={renderField}
//                                            type="text"
//                                         // required={true}
//                                            disabled={initialValues && initialValues.custid ? true : false}
//                                     />
//                                     {initialValues && initialValues.custid && (
//                                         <FormHelperText>??????????????? ????????? admin@chaegong.co.kr ??? ??????????????????</FormHelperText>
//                                     )}
//                                 </fieldset>
//
//                                 <fieldset className="form-group">
//                                     <Field name="gross_total" label="?????????(???)/????????????" component={renderField}
//                                            type="number" //validate={[required({message: "?????? ?????????????????????."})]}
//                                     />
//                                 </fieldset>
//
//                                 <fieldset className="form-group">
//                                     <Field name="emp_count" label="????????????(???)" component={renderField}
//                                            type="number" //validate={[required({message: "?????? ?????????????????????."})]}
//                                     />
//                                 </fieldset>
//
//                                 <fieldset className="form-group">
//                                     <Field name="manager_email" label="??????????????? ?????????" component={renderField}
//                                            type="text"
//                                            required={true}
//                                     />
//                                 </fieldset>
//                                 <fieldset className="form-group">
//                                     <Field name="manager_phone" label="??????????????? ?????????" component={renderField}
//                                            type="text"
//                                            required={true}
//                                            placeholder={"ex) 010-0000-0000"}
//                                     />
//                                 </fieldset>
//                                 {renderError(error)}
//                                 <hr/>
//                                 {/*<fieldset className="form-group">
//                                     <button action="submit" className="btn btn-primary" disabled={submitting}>
//                                         {submitting === true && (
//                                             <Spinner
//                                                 as="span"
//                                                 animation="border"
//                                                 size="sm"
//                                                 role="status"
//                                                 aria-hidden="true"
//                                             />)
//                                         }??????
//                                     </button>
//                                 </fieldset>*/}
//
//                             </TabPanel>
//                             <TabPanel index={1} value={value}>
//                                 <fieldset className="form-group">
//                                     <Field name="introduce" label="????????????" component={renderTextAreaField}
//                                            type="text"
//                                     />
//                                 </fieldset>
//                                 <FormHelperText className="text-right">?????? ?????? 5,000??? ??????</FormHelperText>
//                             </TabPanel>
//                             <TabPanel value={value} index={2}>
//                                 <Row>
//                                     {company && (
//                                         <>
//                                             <Col className="col-md-4">
//                                                 <div className='title'>???????????????</div>
//                                                 {imageFile != null ? (
//                                                     <div className="thumbnail img-circle">
//                                                         <img src={imageFile} alt="..." style={{width:300, height:300}}/>
//                                                     </div>
//                                                 ): (<div className="thumbnail img-circle">
//                                                     {company.company_image ? (
//                                                         <img src={company.company_image} alt="..." style={{width:300, height:300}}/>
//                                                     ):(<><br/>?????? ???????????? ?????????????????????</>)}
//                                                 </div>)
//                                                 }
//                                                 <input
//                                                     // accept="image/*"
//                                                     // className={classes.input}
//                                                     style={{ display: 'none' }}
//                                                     id="company_image"
//                                                     type="file"
//                                                     onChange={(e)=>setImage(e.target.files[0])}
//                                                 />
//
//                                                 <label htmlFor="company_image">
//                                                     <Button color="primary"
//                                                             variant="outlined"
//                                                             component="span"
//                                                             type="submit"
//                                                         // className={classes.button}
//                                                     >
//                                                         ?????????
//                                                     </Button>
//                                                 </label>
//                                             </Col>
//
//                                             <Col className="col-md-4">
//                                                 <div className='title'>???????????????</div>
//                                                 {logoFile != null ? (
//                                                     <div className="thumbnail img-circle">
//                                                         <img src={logoFile} alt="..." style={{width:300, height:300}}/>
//                                                     </div>
//                                                 ): (<div className="thumbnail img-circle">
//                                                     {company.company_logo ? (
//                                                         <img src={company.company_logo} alt="..." style={{width:300, height:300}}/>
//                                                     ) : (<><br/>?????? ???????????? ?????????????????????</>)}
//                                                 </div>)
//                                                 }
//                                                 <input
//                                                     accept="image/*"
//                                                     // className={classes.input}
//                                                     style={{ display: 'none' }}
//                                                     id="company_logo"
//                                                     type="file"
//                                                     onChange={(e)=>setLogo(e.target.files[0])}
//                                                 />
//                                                 <label htmlFor="company_logo">
//                                                     <Button color="primary"
//                                                             variant="outlined"
//                                                             component="span"
//                                                             type="submit"
//                                                         // className={classes.button}
//                                                     >
//                                                         ?????????
//                                                     </Button>
//                                                 </label>
//                                             </Col>
//                                         </>
//                                     )}
//                                 </Row>
//                             </TabPanel>
//                         </CardBody>
//                     </Card>
//                 </form>
//             </Container>
//         </div>
//     )
// };
//
//
// const validate = values => {
//     const errors = {};
//     if (!values.custname) {
//         errors.custname = '???????????? ???????????????.'
//     }
//     // if (!values.custid) {
//     //     errors.custid = '???????????? ???????????????.'
//     // }
//     // if (!values.gross_total) {
//     //     errors.gross_total = '???????????? ???????????????.'
//     // }
//
//     // if (!values.emp_count) {
//     //     errors.emp_count = '???????????? ???????????????.'
//     // } else if (isNaN(Number(values.emp_count))) {
//     //     errors.emp_count = '????????? ??????????????????.'
//     // }
//     if (!values.manager_email) {
//         errors.manager_email = '???????????? ???????????????.'
//     }else if(!validator.isEmail(values.manager_email)){
//         errors.manager_email = '????????? ??????????????? ??????????????????.'
//     }
//     if (!values.manager_phone) {
//         errors.manager_phone = '???????????? ???????????????.'
//     }
//
//     return errors;
// };
//
//
// // function mapStateToProps(state, props) {
// //     if(props.location) {
// //         // console.log('props.location', props.location)
// //         return {
// //             initialValues: {
// //                 ...props.location.state.company,
// //                 custname: {
// //                     label: props.location.state.company.custname,
// //                     value: props.location.state.company.custname
// //                 },
// //                 // user: props.location.state.user
// //             },
// //             company: props.location.state.company,
// //         }
// //     }else{
// //         console.log('props.user', props.user)
// //         return {
// //             // todo navbar ?????? ??? user : undefined
// //             initialValues: {
// //                 // user: props.user
// //             },
// //         }
// //     }
// // }
//
// const afterSubmit = (result, dispatch) => {
//     history.push("/Company/Profile");
// }
//
// export default connect(null, {getCompanyProfile, updateCompanyProfile})(reduxForm({
//     form: "companyupdate",
//     validate,
//     onSubmitSuccess: afterSubmit,
//     destroyOnUnmount: false,
//     onSubmit: updateCompanyProfile
// })(CompanyProfileSignup));
//
