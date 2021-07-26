import React, {useState} from "react";
import {Field, reduxForm} from "redux-form";
import {renderAsyncCreatableSelectField, renderError, renderField} from "../../utils/renderUtils";
import {getCompanyProfile, setCompanyProfile, updateCompanyProfile, updateCPImage} from "../../actions/authActions";
import {connect} from "react-redux";
import {Col, Container, Row, Spinner} from "reactstrap";
import FormHelperText from "@material-ui/core/FormHelperText";
import store from "../../store";
import LoaderSpinner from "../Etc/LoaderSpinner";
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from "@material-ui/core/Card";
import ImageUpload from "../CustomUpload/ImageUpload.jsx";

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
const Mng_CompanyProfileEdit = (props) => {
    const { handleSubmit, error, submitting } = props;
    const company = store.getState().auth.company;
    const [value, setValue] = useState(0);

    // tab value
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log('CompanyProfileEdit company', company)
    const handleImage = (data,field) => {
        updateCPImage(data,field, company.id);
    }


    return 1 == 1 ? (
        <>
            <div className="content">
                <Container>
                    <div className="title">
                        <h3>회사 정보를 등록해주세요.<br />
                            <small>추천인/후보자들에게 좋은 일자리를 제공하기 위해, 다음 정보를 리뷰하여 회사등록을 승인하고 있습니다.</small>
                        </h3>
                    </div>
                    <hr />
                    <Card>
                        {/* <AppBar position="static" color="default"> */}
                        <Tabs value={value} onChange={handleChange} textColor="Primary" aria-label="simple tabs example" indicatorColor="primary">
                            <Tab label="정보" {...a11yProps(0)} />
                            {/*<Tab label="이미지" {...a11yProps(1)} />*/}
                        </Tabs>
                        {/* </AppBar> */}
                        <TabPanel value={value} index={0}>
                            <Row>
                                <Col className="col-auto col-sm-3 col-md-3">
                                    <ImageUpload handleImage={handleImage} image={company.company_image} field='company_image'/>
                                    <hr/>
                                    <ImageUpload handleImage={handleImage} image={company.company_logo} field='company_logo' avatar />
                                </Col>
                                <Col className="col-auto col-sm-9 col-md-9">
                                    {/* EnterKey Prevent */}
                                    <form className="mx-5" onSubmit={handleSubmit} >
                                        <fieldset className="form-group">
                                            <Field name="custname" label="회사이름＊" component={renderAsyncCreatableSelectField}
                                                   type="text"
                                                   disabled={company.custname ? true : false}
                                            />
                                            {company.custname && (
                                                <FormHelperText>회사명 수정은 admin@chaegong.co.kr 로 문의해주세요</FormHelperText>
                                            )}
                                        </fieldset>

                                        <fieldset className="form-group">
                                            <Field name="custid" label="사업자번호＊" component={renderField}
                                                   type="text"
                                                   disabled={company.custid ? true : false}
                                            />
                                            {company.custid && (
                                                <FormHelperText>사업자번호 수정은 admin@chaegong.co.kr 로 문의해주세요</FormHelperText>
                                            )}
                                        </fieldset>

                                        <fieldset className="form-group">
                                            <Field name="gross_total" label="매출액(억)/투자금액＊" component={renderField}
                                                   type="number" //validate={[required({message: "This field is required."})]}
                                            />
                                        </fieldset>

                                        <fieldset className="form-group">
                                            <Field name="emp_count" label="임직원수(명)＊" component={renderField}
                                                   type="number" //validate={[required({message: "This field is required."})]}
                                            />
                                        </fieldset>

                                        <fieldset className="form-group">
                                            <Field name="manager_email" label="인사담당자 이메일＊" component={renderField}
                                                   type="text"
                                            />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <Field name="manager_phone" label="인사담당자 연락처＊" component={renderField}
                                                   type="text" placeholder={"ex) 010-0000-0000"}
                                            />
                                        </fieldset>
                                        {renderError(error)}
                                        <hr />
                                        <fieldset className="form-group">
                                            <button action="submit" disabled={submitting} className="btn btn-info">{
                                                submitting && (
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />
                                                )
                                            }등록</button>
                                        </fieldset>
                                    </form>
                                </Col>
                            </Row>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            {company && (
                                <Row className="justify-content-md-center">
                                    <Col className="col-md-4">
                                        <div className='title'>대표이미지</div>
                                        <ImageUpload handleImage={handleImage} image={company.company_image} field='company_image'/>
                                    </Col>

                                    <Col className="col-md-4">
                                        <div className='title'>로고이미지</div>
                                        <ImageUpload handleImage={handleImage} image={company.company_logo} field='company_logo'/>
                                    </Col>
                                </Row>
                            )}
                        </TabPanel>
                    </Card>
                </Container></div>
        </>
    ) : (<LoaderSpinner />)
}


const validate = values => {
    const errors = {};
    if (!values.custname) {
        errors.custname = '필수입력 사항입니다.'
    }
    if (!values.custid) {
        errors.custid = '필수입력 사항입니다.'
    }
    if (!values.gross_total) {
        errors.gross_total = '필수입력 사항입니다.'
    }

    if (!values.emp_count) {
        errors.emp_count = '필수입력 사항입니다.'
    } else if (isNaN(Number(values.emp_count))) {
        errors.emp_count = '숫자로 입력해주세요.'
    }
    if (!values.manager_email) {
        errors.manager_email = '필수입력 사항입니다.'
    }
    if (!values.manager_phone) {
        errors.manager_phone = '필수입력 사항입니다.'
    }

    return errors;
};


function mapStateToProps(state, props) {
    if (props.location) {
        return {
            initialValues: {
                ...props.location.state.company,
                custname: {
                    label: props.location.state.company.custname,
                    value: props.location.state.company.custname
                },
                user: props.location.state.user
            },
            company: props.location.state.company,
        }
    } else {
        // console.log('props.user', props.user)
        return {
            initialValues: {
                user: props.user
            },
        }
    }
}

export default connect(mapStateToProps, { getCompanyProfile, updateCompanyProfile })(reduxForm({
    form: "companyupdate",
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
    onSubmit: updateCompanyProfile
})(Mng_CompanyProfileEdit));

