import React, {useState} from "react";
import {Field, initialize, reduxForm} from "redux-form";
import {renderAsyncCreatableSelectField, renderError, renderField, renderTextAreaField} from "../../utils/renderUtils";
import {updateHrProfile} from "../../actions/authActions";
import {connect, useSelector} from "react-redux";
import {Card, CardBody, CardHeader, Col, Container, Row, Spinner} from "reactstrap";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import store from "../../store";
import history from "utils/historyUtils";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import DaumPostcode from "../Etc/DaumPostcode_mng";
import Nothing from "../Common/Nothing";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component="span">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const HrProfileEdit = (props) => {
    const {handleSubmit, error, submitting} = props;
    let initialValues = store.getState().form.hrupdate.initial;
    const {company, hr} = props;

    const [value, setValue] = useState(0);
    const [previewURL, setPreviewURL] = useState(null);
    const [previewImageURL, setPreviewImageURL] = useState(null);


    const hrprofile_file = useSelector((store) =>
        store.form.hrupdate.values ? store.form.hrupdate.values.hrprofile_file : null
    );
    const company_logo_file = useSelector((store) =>
        store.form.hrupdate.values ? store.form.hrupdate.values.company_logo_file : null
    );
    const company_image = useSelector((store) =>
        store.form.hrupdate.values ? store.form.hrupdate.values.company_image : null
    );

    // tab value
    const handleChange = (event, newValue) => {
        const syncErrors = store.getState().form.hrupdate.syncErrors;
        if(syncErrors === undefined) {
            setValue(newValue);
        }else{
            alert('?????? ??????????????? ??????????????????!')
        }
    };

    return (
        <div className="content">
            <Container>
                <div className="title">
                    <h3>????????? ?????? ????????? ???????????? ????????????.<br/>
                        <small></small>
                    </h3>
                </div>
                <hr/>
                <form className=""
                      onSubmit={handleSubmit}
                >
                    {/*<Col className="text-right">
                        <fieldset className="form-group">
                            <button action="submit" className="btn btn-lg btn-primary" disabled={submitting}>
                                {submitting === true && (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />)
                                } ????????????
                            </button>
                        </fieldset>
                    </Col>*/}
                    <Card>

                        <CardHeader>
                            <Tabs value={value} onChange={handleChange} textColor="Primary" aria-label="simple tabs example" indicatorColor="primary">
                                <Tab label="????????????" {...a11yProps(0)} />
                                <Tab label="????????????" {...a11yProps(1)} />
                                <Tab label="?????????" {...a11yProps(2)} />
                                <Tab label="????????????" {...a11yProps(3)} />
                            </Tabs>
                        </CardHeader>
                        {/* </AppBar> */}
                        <CardBody>
                            <TabPanel value={value} index={0}>
                                {/* EnterKey Prevent */}
                                <Row>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="custname" label="?????????" component={renderAsyncCreatableSelectField}
                                                   type="text"
                                                   required={true}
                                                   disabled={initialValues && initialValues.custname ? true : false}
                                            />
                                            {initialValues && initialValues.custname && (
                                                <FormHelperText>????????? ????????? admin@chaegong.co.kr ??? ??????????????????</FormHelperText>
                                            )}
                                        </fieldset>
                                    </Col>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="custid" label="???????????????" component={renderField}
                                                   type="text"
                                                   required={true}
                                                   disabled={initialValues && initialValues.custid ? true : false}
                                            />
                                            {initialValues && initialValues.custid && (
                                                <FormHelperText>??????????????? ????????? admin@chaegong.co.kr ??? ??????????????????</FormHelperText>
                                            )}
                                        </fieldset>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="gross_total" label="?????????(???)/????????????" component={renderField}
                                                   type="number"
                                                   required={true}
                                            />
                                        </fieldset>
                                    </Col>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="emp_count" label="????????????(???)" component={renderField}
                                                   type="number"
                                                   required={true}
                                            />
                                        </fieldset>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="manager_email" label="????????? ?????????" component={renderField}
                                                   type="text"
                                                   required={true}
                                            />
                                        </fieldset>
                                    </Col>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="manager_phone" label="????????? ?????????" component={renderField}
                                                   type="text"
                                                   required={true}
                                                   placeholder={"ex) 010-0000-0000"}
                                            />
                                        </fieldset>
                                    </Col>
                                </Row>
                                {/*<fieldset className="form-group">*/}
                                {/*    <Field name="load_addr" label="?????? ??????" component={renderField}*/}
                                {/*           type="text"*/}
                                {/*    />*/}
                                {/*</fieldset>*/}
                                <Row>
                                    <Col md={1}>
                                        <fieldset className="form-group">
                                            <Field
                                                name="load_addr_code"
                                                component={renderField}
                                                label=""
                                                type="text"
                                            />
                                        </fieldset>
                                    </Col>
                                    <Col>
                                        <DaumPostcode formName="hrupdate" filed1="load_addr" filed2='load_addr_code' filed3='load_addr_detail'/>
                                    </Col>
                                </Row>
                                <fieldset className="form-group">
                                    <Field name="load_addr" label="??????" component={renderField}
                                           type="text"
                                           labelSize={3}
                                           colSize={9}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <Field name="load_addr_detail" label="????????????" component={renderField}
                                           type="text"
                                           labelSize={3}
                                           colSize={9}
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <Field name="homepage" label="????????????" component={renderField}
                                           type="text"
                                    />
                                </fieldset>
                                <hr/>
                                {renderError(error)}
                            </TabPanel>
                            <TabPanel index={1} value={value}>
                                <fieldset className="form-group">
                                    <Field name="introduce" label="????????????" component={renderTextAreaField}
                                           type="text"
                                        // required={true}
                                    />
                                </fieldset>
                                <FormHelperText className="text-right">?????? ?????? 10,000??? ??????</FormHelperText>
                                <fieldset className="form-group">
                                    <Field name="hr_bokri" label="????????????" component={renderTextAreaField}
                                           type="text"
                                    />
                                </fieldset>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <>
                                    <Row>
                                        <Col className="col-md-4">
                                            <p>???????????????</p>
                                            {hr && hr.hrprofile_image ? (
                                                <ImageList file={hr.hrprofile_image}/>
                                            ) : <Nothing text={'??????'}/>}

                                            {typeof company_image === 'object' && (
                                                <div className="thumbnail img-circle">
                                                    <img src={previewImageURL} alt="..." style={{width:410, height:250}}/>
                                                </div>
                                            ) }
                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="company_image"
                                                type="file"
                                                onChange={(event)=>{
                                                    event.preventDefault();
                                                    let reader = new FileReader();
                                                    let imagefile = event.target.files[0];
                                                    reader.onloadend = () => setPreviewImageURL(reader.result);
                                                    reader.readAsDataURL(imagefile);
                                                    props.change('company_image', event.target.files[0]);
                                                }}
                                            />

                                            <label htmlFor="company_image">
                                                <Button color="primary"
                                                        variant="outlined"
                                                        component="span"
                                                        type="submit"
                                                    // className={classes.button}
                                                >
                                                    ????????????
                                                </Button>
                                            </label>
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <Col className="col-md-4">
                                            <p>???????????????(410x250)</p>

                                            {typeof company_logo_file === 'object' && (
                                                <div className="thumbnail img-circle">
                                                    <img src={previewURL} alt="..." style={{width:410, height:250}}/>
                                                </div>
                                            )}

                                            {hr && hr.company_logo !== null && (
                                                <div className="thumbnail img-circle">
                                                    <img src={hr.company_logo} alt="..." style={{width:410, height:250}}/>
                                                </div>
                                            )}

                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="company_logo"
                                                type="file"
                                                onChange={(event)=>{
                                                    event.preventDefault();
                                                    let reader = new FileReader();
                                                    let logofile = event.target.files[0];
                                                    reader.onloadend = () => setPreviewURL(reader.result);
                                                    reader.readAsDataURL(logofile);
                                                    props.change('company_logo_file', event.target.files[0]);
                                                }}
                                            />
                                            <label htmlFor="company_logo">
                                                <Button color="primary"
                                                        variant="outlined"
                                                        component="span"
                                                        type="submit"
                                                    // className={classes.button}
                                                >
                                                    ????????????
                                                </Button>
                                            </label>
                                        </Col>
                                    </Row>
                                </>
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                <p>??????????????? ??? ?????? ??????????????? ?????????????????????</p>
                                {/* ?????? ????????? ?????? */}
                                {hrprofile_file && (
                                    <a href='#' target="_blank">{hrprofile_file.name}<br/></a>
                                )}

                                <input
                                    // accept="image/*"
                                    style={{ display: 'none' }}
                                    id="hrfile"
                                    type="file"
                                    onChange={(event)=>{
                                        event.preventDefault();
                                        let reader = new FileReader();
                                        let file = event.target.files[0];
                                        reader.onloadend = () => setPreviewURL(reader.result);
                                        reader.readAsDataURL(file);
                                        props.change('hrprofile_file', event.target.files[0])
                                    }}
                                />
                                <label htmlFor="hrfile">
                                    <Button color="primary"
                                            variant="outlined"
                                            component="span"
                                            type="submit"
                                    >
                                        ????????????
                                    </Button>
                                </label>
                                <hr/>
                                <p >???????????? ??????</p>
                                {hr && hr.hrprofile_file ? (
                                    <FileList file={hr.hrprofile_file}/>
                                ) : <Nothing text={'?????????'}/>}
                            </TabPanel>
                        </CardBody>
                    </Card>
                    <hr/>
                    <div className={"text-center"}>
                        <button className="btn btn-lg btn-outline-info "
                                onClick={()=>history.push(`/Mng/Profile`)}
                                disabled={submitting}
                        >????????????
                        </button>
                        <button action="submit" className="btn btn-lg btn-info" disabled={submitting}>
                            {submitting === true && (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />)
                            } ??????
                        </button>
                    </div>
                </form>

            </Container>
        </div>
    )
};

const ImageList = ({file}) => {
    return file ? (
        <>
            {
                file.map( v =>{
                    return (
                        <img src={v.hr_image} alt="..." style={{width:410, height:250}}/>
                    )
                })
            }
        </>
    ) : (
        <ul>?????? ????????? ????????????.</ul>
    )
}

const FileList = ({file}) => {
    return file ? (
        <ul>
            {file.map( v =>{
                return (
                    <li>
                        <a className="nav-link"
                           href={v.hr_file}
                        >{v.hr_filename}
                        </a>
                    </li>
                )
            })
            }
        </ul>
    ) : (
        <ul>??????????????? ????????????.</ul>
    )
}


const validate = values => {
    const errors = {};
    console.log('validate values', values)
    if (!values.custname) {
        errors.custname = '???????????? ???????????????.'
    }
    if (!values.custid) {
        errors.custid = '???????????? ???????????????.'
    }
    if (!values.gross_total) {
        errors.gross_total = '???????????? ???????????????.'
    }

    if (!values.emp_count) {
        errors.emp_count = '???????????? ???????????????.'
    } else if (isNaN(Number(values.emp_count))) {
        errors.emp_count = '????????? ??????????????????.'
    }
    if (!values.manager_email) {
        errors.manager_email = '???????????? ???????????????.'
    }
    if (!values.manager_phone) {
        errors.manager_phone = '???????????? ???????????????.'
    }
    // errors.
    // if(!values.homepage){
    //
    // }else if(values.homepage && !validator.isURL(values.homepage)){
    //     errors.homepage = '????????? URL????????? ??????????????????'
    // }

    return errors;
};


function mapStateToProps(state, props) {
    if(state.auth.hr)
        return {
            initialValues: {
                ...state.auth.hr,
                custname: {
                    label: state.auth.hr.custname,
                    value: state.auth.hr.custname,
                }
            },
            hr: state.auth.hr
        }
    else{
        return {
            initialValues: null
        }
    }

}

const afterSubmit = (result, dispatch) => {
    dispatch(initialize('hrupdate', {}))
    dispatch(initialize('companyupdate', {}))
    history.push("/Hr/Profile");
}

export default connect(mapStateToProps)(reduxForm({
    form: "hrupdate",
    validate,
    onSubmitSuccess: afterSubmit,
    enableReinitialize: true,
    // destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: updateHrProfile
})(HrProfileEdit));

