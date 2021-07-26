import React, {useEffect, useState} from 'react'
import {Field, reduxForm} from 'redux-form'
import history from "../../../utils/historyUtils";
import {
    addrRenderField,
    renderField,
    renderSelectField,
    SelectField,
    renderCheckbox,
    renderTextAreaField
} from "../../../utils/renderUtils_mng";
import axios from 'axios';
import {apiUrls, AuthUrls} from "../../../constants/urls";
import {Col, Form, FormGroup, Row, Spinner} from "reactstrap";
import DaumPostcode from "../../Etc/DaumPostcode_mng";
import ImageUpload from "../../CustomUpload/ImageUpload.jsx";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {makeStyles} from "@material-ui/core/styles";
import store from '../../../store';
import {getUserToken} from "../../../utils/authUtils";
const number = value =>
    value && isNaN(Number(value)) ? '숫자만 입력 가능합니다.' : undefined
const required = value => (value || typeof value === 'number' ? undefined : '필수값입니다.')
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        // fontWeight: theme.typography.fontWeightBold,
    },
    container:{
        marginBottom:'10px',
    }
}));
const CompanyEditForm = (props) => {
    const [ comCode, setComcode ] = useState([]);
    const [users, setUsers] = useState([]);
    const classes = useStyles();
    useEffect(()=>{

        //수급담당자 셀렉 옵션
        axios.get(AuthUrls.USER_LIST, {params:{is_admin:'True'}})
            .then(({ data }) => {
                setUsers(data);
            })
            .catch(error => {
                console.log(error);
            });
        setComcode(store.getState().comcode.comcode);


    },[]);
    const handleImage = (data,field) => {
        console.log('dddd')
        const token = getUserToken(store.getState());
        let formValues = new FormData();
        formValues.append(field, data, data.name);
        axios
            .patch(apiUrls.CUSTOM_COMPANY_PROFILE + props.initialValues.id + '/', formValues, {
                headers: {
                    authorization: 'Token ' + token,
                    'content-type': 'multipart/form-data'
                }
            })
            .then(({ data }) => {
                console.log(data);
            })
            .catch(err => console.log(err.response.data));
    }
    const { handleSubmit, submitting } = props

    return (
        <div className={classes.root}>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col className="col-auto col-sm-3 col-md-3">
                        <Accordion className={classes.container} defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>기업 이미지</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="text-center">
                                <div className={classes.root}>
                                    <ImageUpload handleImage={handleImage} imagePreviewUrl={props.history.location.state.comp.company_image} company={props.history.location.state.comp.custname} field='company_image'/>
                                    <hr/>
                                    <ImageUpload handleImage={handleImage} imagePreviewUrl={props.history.location.state.comp.company_logo} company={props.history.location.state.comp.custname} field='company_logo' avatar />
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </Col>
                    <Col className="col-auto col-sm-9 col-md-9">
                        <Accordion className={classes.container} defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>기본정보</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={classes.root}>
                                    <Field
                                        name="custname"
                                        label="회사명"
                                        component={renderField}
                                        type="text"
                                        labelSize={3}
                                        colSize={9}
                                    />
                                    <Field
                                        name="custid"
                                        label="사업자번호"
                                        component={renderField}
                                        type="text"
                                        labelSize={3}
                                        colSize={9}
                                    />
                                    <Field
                                        name="homepage"
                                        label="홈페이지"
                                        component={renderField}
                                        type="text"
                                        labelSize={3}
                                        colSize={9}
                                        placeholder="www.example.com"
                                    />
                                    <Field
                                        name="introduce"
                                        label="회사소개"
                                        component={renderTextAreaField}
                                        type="text"
                                        labelSize={3}
                                        colSize={9}
                                    />
                                    <Field
                                        name="cmp_manager"
                                        component={SelectField}
                                        label="담당매니저"
                                        options={users}
                                        selectLabel="email"
                                        validate={[ required ]}
                                    />

                                    <Field
                                        name="upjong"
                                        label="업종"
                                        component={renderField}
                                        type="text"
                                        labelSize={3}
                                        colSize={9}
                                    />
                                    {/*<Field*/}
                                    {/*    name="stock_gubun"*/}
                                    {/*    component={renderCheckbox}*/}
                                    {/*    label="상장구분"*/}
                                    {/*    // type="text"*/}
                                    {/*    labelSize={3}*/}
                                    {/*    colSize={9}*/}
                                    {/*/>*/}
                                    <Field
                                        name="group_company"
                                        component={renderField}
                                        label="그룹사"
                                        type="text"
                                        labelSize={3}
                                        colSize={9}
                                    />
                                    <Field
                                        name="gross_total"
                                        label="매출액"
                                        component={renderField}
                                        type="text"
                                        labelSize={3}
                                        colSize={9}
                                        validate={[number]}
                                    />
                                    {/*<Field*/}
                                    {/*    name="load_addr_code"*/}
                                    {/*    component={renderField}*/}
                                    {/*    label="주소(도로명코드)"*/}
                                    {/*    type="text"*/}
                                    {/*/>*/}
                                    {/*<Field*/}
                                    {/*    name="load_addr"*/}
                                    {/*    component={renderField}*/}
                                    {/*    label="주소(도로명주소)"*/}
                                    {/*    type="text"*/}
                                    {/*/>*/}
                                    {/*<Field*/}
                                    {/*    name="load_addr_detail"*/}
                                    {/*    component={renderField}*/}
                                    {/*    label="주소 상세"*/}
                                    {/*    type="text"*/}
                                    {/*/>*/}
                                    <FormGroup row>
                                        <Field
                                            name="post_addr_code"
                                            component={addrRenderField}
                                            label="우편번호"
                                            type="text"
                                            labelSize={2}
                                            colSize={2}
                                        />
                                        <DaumPostcode formName="CompanyEditForm" filed1="post_addr" filed2='post_addr_code' filed3='post_addr_detail'/>
                                    </FormGroup>

                                    <Field name="post_addr" label="본사주소" component={renderField}
                                           type="text"
                                           labelSize={3}
                                           colSize={9}
                                    />
                                    <fieldset className="form-group">
                                        <Field name="post_addr_detail" label="나머지주소" component={renderField}
                                               type="text"
                                               labelSize={3}
                                               colSize={9}
                                        />
                                    </fieldset>
                                    {/*<Field*/}
                                    {/*    name="post_addr_code"*/}
                                    {/*    component={renderField}*/}
                                    {/*    label="주소(우편번호)"*/}
                                    {/*    type="text"*/}
                                    {/*/>*/}
                                    {/*<Field*/}
                                    {/*    name="post_addr"*/}
                                    {/*    component={renderField}*/}
                                    {/*    label="주소(지번주소)"*/}
                                    {/*    type="text"*/}
                                    {/*/>*/}
                                    {/*<Field*/}
                                    {/*    name="post_addr_detail"*/}
                                    {/*    component={renderField}*/}
                                    {/*    label="주소 상세"*/}
                                    {/*    type="text"*/}
                                    {/*/>*/}

                                    <Field
                                        name="nation"
                                        component={renderField}
                                        label="국가"
                                        type="text"
                                        labelSize={3}
                                        colSize={9}
                                    />

                                    <Field
                                        name="emp_count"
                                        component={renderField}
                                        label="임직원수"
                                        type="text"
                                        labelSize={3}
                                        colSize={9}
                                    />

                                    {/*<Field
                                        name="manager_email"
                                        component={renderField}
                                        label="인사담당자 이메일"
                                        type="text"
                                        labelSize={3}
                                        colSize={9}
                                    />

                                    <Field
                                        name="manager_phone"
                                        component={renderField}
                                        label="인사담당자 연락처"
                                        type="text"
                                        labelSize={3}
                                        colSize={9}
                                    />*/}

                                    {/*<Field*/}
                                    {/*    name="company_recuser_id"*/}
                                    {/*    component={renderField}*/}
                                    {/*    label="추천인"*/}
                                    {/*    type="text"*/}
                                    {/*    labelSize={3}*/}
                                    {/*    colSize={9}*/}
                                    {/*/>*/}

                                    {/*<Field*/}
                                    {/*    name="ticket"*/}
                                    {/*    component={renderField}*/}
                                    {/*    label="티켓"*/}
                                    {/*    type="text"*/}
                                    {/*    labelSize={3}*/}
                                    {/*    colSize={9}*/}
                                    {/*/>*/}

                                    {/*<Field
                                        name="company_form"
                                        component={renderSelectField}
                                        label="기업형태"
                                        code_topidx="CF"
                                        code_topcd={null}
                                        options={comCode}
                                        disableOption="--"
                                    />*/}


                                    <Field
                                        name="status_cd"
                                        component={renderSelectField}
                                        label="승인상태"
                                        code_topidx="CB"
                                        code_topcd={null}
                                        options={comCode}
                                        disableOption="--"
                                    />
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </Col>
                </Row>

                <fieldset className="form-group text-right">
                    <button type="button" className="btn btn-outline-primary" onClick={() => history.goBack()}>뒤로가기</button>
                    <button type="submit" disabled={submitting} className="btn btn-primary">
                        {
                            submitting && (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            )
                        }
                        수정</button>

                </fieldset>
            </Form>
        </div>
    )
}

export default reduxForm({
    form: 'CompanyEditForm', // a unique identifier for this form
    enableReinitialize: true,
    onSubmitFail: (errors) => {
        document.getElementsByClassName('main-panel')[0].scrollTop=0;
    }
})(CompanyEditForm)