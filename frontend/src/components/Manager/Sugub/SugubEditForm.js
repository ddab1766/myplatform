import React, {useEffect, useState} from 'react'
import {change, Field, reduxForm} from 'redux-form'
import history from "../../../utils/historyUtils";
import {
    addrRenderField,
    multiSelectField,
    renderCheckbox,
    renderDateField,
    renderField,
    renderSelectField,
    renderTextAreaField
} from "../../../utils/renderUtils_mng";
import {Col, Form, FormGroup, Row, Spinner} from "reactstrap"
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DaumPostcode from "../../Etc/DaumPostcode_mng"
import store from "../../../store";
import {getPermisson} from "../../../actions/commonActions"

const style = {
    width: '100%',
}
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

const required = value => (value || typeof value === 'number' ? undefined : '필수값입니다.')
const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined
const SugubEditForm = props => {
    const { handleSubmit, submitting } = props;
    const [comCode, setComcode] = useState([]);
    const [jikComCode, setJikComcode] = useState([]);
    const [users, setUsers] = useState([]);
    const [indamUsers, setIndamUsers] = useState([]);
    const [companys, setCompanys] = useState([]);
    const [jikTopcdM, setJikTopcdM] = useState();
    const [jikTopcdS, setJikTopcdS] = useState();
    const [isHR, setIsHR] = useState(false);
    const classes = useStyles();
    const JIKJONGTOP = [
        { 'code_id': 'AA0100000', 'code_name': '경영/사무', 'code_topidx': 'AA', 'code_topcd': null, },
        { 'code_id': 'AA0200000', 'code_name': '영업/고객상담', 'code_topidx': 'AA', 'code_topcd': null, },
        { 'code_id': 'AA0300000', 'code_name': 'IT/인터넷', 'code_topidx': 'AA', 'code_topcd': null, },
        { 'code_id': 'AA0400000', 'code_name': '디자인', 'code_topidx': 'AA', 'code_topcd': null, },
        { 'code_id': 'AA0500000', 'code_name': '서비스', 'code_topidx': 'AA', 'code_topcd': null, },
        { 'code_id': 'AA0600000', 'code_name': '전문직', 'code_topidx': 'AA', 'code_topcd': null, },
        { 'code_id': 'AA0700000', 'code_name': '의료', 'code_topidx': 'AA', 'code_topcd': null, },
        { 'code_id': 'AA0800000', 'code_name': '생산/제조', 'code_topidx': 'AA', 'code_topcd': null, },
        { 'code_id': 'AA0900000', 'code_name': '건설', 'code_topidx': 'AA', 'code_topcd': null, },
        { 'code_id': 'AA1000000', 'code_name': '유통/무역', 'code_topidx': 'AA', 'code_topcd': null, },
        { 'code_id': 'AA1100000', 'code_name': '미디어', 'code_topidx': 'AA', 'code_topcd': null, },
        { 'code_id': 'AA1200000', 'code_name': '교육', 'code_topidx': 'AA', 'code_topcd': null, },
        { 'code_id': 'AA1300000', 'code_name': '특수계층/공공', 'code_topidx': 'AA', 'code_topcd': null, }
    ];

    //공통코드 셀렉 옵션
    useEffect(() => {
        setComcode(store.getState().comcode.comcode);
        setJikComcode(store.getState().comcode.comcode);
    }, []);
    //페이지 로드시 HR 판단
    useEffect(() => {
        if (getPermisson(store.getState().auth) === 3) {
            setIsHR(true);
        } else {
            setIsHR(false);
    }
    }, [])
    //페이지 로드시 직종코드 중, 소 의 초기값
    useEffect(() => {
        setJikTopcdM(props.history.location.state.sugub.sugub_jikjong_top);
        setJikTopcdS(props.history.location.state.sugub.sugub_jikjong_mid);
    }, [])
    useEffect(() => {
        //수급담당자 셀렉 옵션
        // axios.get(AuthUrls.USER_LIST, {params:{is_admin:'True'}})
        //     .then(({ data }) => {
        //         setUsers(data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        // 인사담당자 셀렉 옵션
        // axios.get(AuthUrls.USER, '')
        //     .then(({ data }) => {
        //         setIndamUsers(data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        //기업명 셀렉 옵션
        // axios.get(AuthUrls.CUSTOM_COMPANY_PROFILE_LIST, '')
        //     .then(({ data }) => {
        //         setCompanys(data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }, []);
    //직종코드 (대) 변경시 이벤트
    const handleJikCodeChangeTOP = (value) => {
        setJikTopcdM(value.target.value);

    }
    //직종코드 (중) 변경시 이벤트
    const handleJikCodeChangeMID = (value) => {
        setJikTopcdS(value.target.value);
    }
    //기업 변경시 사업자 번호 등록 이벤트
    const handleChangeCompany = (value) => {
        store.dispatch(change('SugubEditForm', 'custid', value.custid));
    }
    return (
        <>
            {comCode && comCode.length > 0 && (
                <div className={classes.root}>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col className="col-auto col-sm-6 col-md-6">
                                <Accordion className={classes.container} defaultExpanded>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>업체정보</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div style={style}>
                                            <Field
                                                name="companyprofile_nm"
                                                label="기업명"
                                                component={renderField}
                                                type="text"
                                                labelSize={3}
                                                colSize={9}
                                                disabled={true}
                                            />

                                            <Field
                                                name="user_nm"
                                                label="담당자"
                                                component={renderField}
                                                type="text"
                                                labelSize={3}
                                                colSize={9}
                                                disabled={true}
                                            />
                                            <Field
                                                name="custid"
                                                label="사업자번호"
                                                component={renderField}
                                                type="text"
                                                labelSize={3}
                                                colSize={9}
                                                disabled={true}
                                            />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>

                                {/*2. 수급정보*/}
                                <Accordion className={classes.container} defaultExpanded>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>수급정보</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div style={style}>
                                            <Field
                                                name="chae_cd"
                                                label="채용형태"
                                                component={renderSelectField}
                                                code_topidx="AC"
                                                code_topcd={null}
                                                options={comCode}
                                                disableOption="--"
                                                disabled={isHR}
                                            />

                                            {/*<Field*/}
                                            {/*    name="sugub_end_dt"*/}
                                            {/*    label="채용마감일"*/}
                                            {/*    component={renderField}*/}
                                            {/*    type="text"*/}
                                            {/*    labelSize={3}*/}
                                            {/*    colSize={9}*/}
                                            {/*/>*/}
                                                <Field
                                                name="sugub_end_dt"
                                                label="채용마감일"
                                                component={renderDateField}
                                                labelSize={3}
                                                colSize={9}
                                                disabled={isHR}
                                            />
                                            {/*<Field*/}
                                            {/*    name="manager"*/}
                                            {/*    component={SelectField}*/}
                                            {/*    label="수급담당자"*/}
                                            {/*    options={users}*/}
                                            {/*    selectLabel="email"*/}
                                            {/*    required={true}*/}
                                            {/*    validate={[ required ]}*/}
                                            {/*    disabled={isHR}*/}
                                            {/*/>*/}

                                            <Field
                                                name="apply_gubun"
                                                component={renderSelectField}
                                                label="접수기간구분"
                                                code_topidx="AY"
                                                code_topcd={null}
                                                options={comCode}
                                                disableOption="--"
                                                disabled={isHR}
                                            />

                                            <Field
                                                name="submit_doc"
                                                component={renderSelectField}
                                                label="지원서양식"
                                                code_topidx="AZ"
                                                code_topcd={null}
                                                options={comCode}
                                                disableOption="--"
                                                disabled={isHR}
                                            />

                                            <Field
                                                name="sugub_jikjong_top"
                                                label="직종코드(대)"
                                                component={renderSelectField}
                                                code_topidx="AA"
                                                code_topcd={null}
                                                options={JIKJONGTOP}
                                                disableOption="--"
                                                onChange={handleJikCodeChangeTOP}
                                                disabled={isHR}
                                            />

                                            <Field
                                                name="sugub_jikjong_mid"
                                                label="직종코드(중)"
                                                component={renderSelectField}
                                                code_topidx="AA"
                                                code_topcd={jikTopcdM}
                                                options={jikComCode}
                                                disableOption="--"
                                                onChange={handleJikCodeChangeMID}
                                                disabled={isHR}
                                            />

                                            <Field
                                                name="sugub_jikjong_low"
                                                label="직종코드(소)"
                                                component={multiSelectField}
                                                code_topidx="AA"
                                                code_topcd={jikTopcdS}
                                                options={jikComCode}
                                                disabled={isHR}
                                            />

                                            <Field
                                                name="hire_count"
                                                component={renderField}
                                                label="채용인원수"
                                                type="number"
                                                labelSize={3}
                                                colSize={2}
                                                required={true}
                                                validate={[required, number]}
                                                disabled={isHR}
                                            />

                                            <Field
                                                name="hire_type"
                                                component={renderSelectField}
                                                label="고용형태"
                                                code_topidx="AD"
                                                code_topcd={null}
                                                options={comCode}
                                                disableOption="--"
                                                disabled={isHR}
                                            />
                                            <Row>
                                                <Col>
                                            <Field
                                                name="chae_gigan"
                                                component={renderField}
                                                label="계약기간"
                                                type="number"
                                                labelSize={6}
                                                colSize={4}
                                                required={true}
                                                validate={[required, number]}
                                                disabled={isHR}
                                            />
                                                </Col>
                                                <Col>
                                                    <div style={{marginLeft:'-60px'}}>
                                            <Field
                                                name="chae_gigan_type"
                                                component={renderSelectField}
                                                // label="계약기간구분"
                                                code_topidx="AE"
                                                code_topcd={null}
                                                options={comCode}
                                                disableOption="--"
                                                disabled={isHR}
                                            />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Field
                                                name="cont_chg_gb"
                                                component={renderSelectField}
                                                label="전환여부"
                                                code_topidx="AF"
                                                code_topcd={null}
                                                options={comCode}
                                                disableOption="--"
                                                disabled={isHR}
                                            />

                                        </div>
                                        {/* <Field
                        name="career_start"
                        component={renderField}
                        label="경력시작"
                        type="text"
                    />
                    <Field
                        name="career_end"
                        component={renderField}
                        label="경력종료"
                        type="text"
                    /> */}
                                    </AccordionDetails>
                                </Accordion>
                            </Col>
                            <Col className="col-auto col-sm-6 col-md-6">
                                {/*3. 근무조건*/}
                                <Accordion className={classes.container} defaultExpanded>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>근무조건</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div style={style}>

                                            <Field
                                                name="sugub_career_gb"
                                                component={renderSelectField}
                                                label="경력"
                                                code_topidx="AB"
                                                code_topcd={null}
                                                options={comCode}
                                                disableOption="--"
                                                disabled={isHR}
                                            />

                                            <Field
                                                name="education_cd"
                                                component={renderSelectField}
                                                label="학력"
                                                code_topidx="AO"
                                                code_topcd={null}
                                                options={comCode}
                                                disableOption="--"
                                                disabled={isHR}
                                            />

                                            <Field
                                                name="sugub_gender"
                                                component={renderSelectField}
                                                label="선호성별"
                                                code_topidx="AQ"
                                                code_topcd={null}
                                                options={comCode}
                                                disableOption="--"
                                                disabled={isHR}
                                            />

                                            <Field
                                                name="salary_gubun"
                                                component={renderSelectField}
                                                label="급여"
                                                code_topidx="AI"
                                                code_topcd={null}
                                                options={comCode}
                                                disableOption="--"
                                                disabled={isHR}
                                            />

                                            {/* <Col md="auto" md="2">
                            <Field
                                name="salary_start"
                                component={renderField}
                                label="최소급여"
                                type="text"
                            />
                        </Col>
                        <Col md="auto" md="2">
                            <Field
                                name="salary_end"
                                component={renderField}
                                label="최대급여"
                                type="text"
                            />
                        </Col> */}

                                            <Row>
                                                <Col>
                                                    <Field
                                                        name="spec"
                                                        component={renderTextAreaField}
                                                        label="필수/우대사항"
                                                        disabled={isHR}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Field
                                                        name="wrk_condition"
                                                        component={renderTextAreaField}
                                                        label="근무조건"
                                                        disabled={isHR}
                                                    />
                                                </Col>
                                            </Row>
                                            {/* <Field
                        name="age_start"
                        component={renderField}
                        label="시작나이"
                        type="text"
                    />
                    <Field
                        name="age_end"
                        component={renderField}
                        label="종료나이"
                        type="text"
                    /> */}
                                            {/* <Field
                        name="work_load_addr"
                        component={renderField}
                        label="실근무지(도로명주소)"
                        type="text"
                    />
                    <Field
                        name="work_load_addr_detail"
                        component={renderField}
                        label="실근무지(도로명상세)"
                        type="text"
                    /> */}
                                        </div>
                                        <hr />
                                    </AccordionDetails>
                                </Accordion>

                                {/*4. 근무정보*/}
                                <Accordion className={classes.container} defaultExpanded>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>근무정보</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div style={style}>
                                            <Field
                                                name="work_site_gubun"
                                                component={renderSelectField}
                                                label="근무지"
                                                code_topidx="AK"
                                                code_topcd={null}
                                                options={comCode}
                                                disableOption="--"
                                                disabled={isHR}
                                            />
                                            <FormGroup row>
                                                <Field
                                                    name="work_load_addr_code"
                                                    component={addrRenderField}
                                                    label="우편번호"
                                                    type="text"
                                                    labelSize={3}
                                                    colSize={3}
                                                    disabled={isHR}
                                                />
                                                <DaumPostcode formName="SugubEditForm" filed1="work_load_addr" filed2='work_post_addr_code' filed3='work_load_addr_detail'/>
                                            </FormGroup>
                                            <Field name="work_load_addr" label="실근무지" component={renderField}
                                                   type="text"
                                                   labelSize={3}
                                                   colSize={9}
                                                   disabled={isHR}
                                            />
                                            <fieldset className="form-group">
                                                <Field name="work_load_addr_detail" label="나머지주소" component={renderField}
                                                       type="text"
                                                       labelSize={3}
                                                       colSize={9}
                                                       disabled={isHR}
                                                />
                                            </fieldset>
                                            <Field
                                                name="work_position"
                                                component={renderField}
                                                label="포지션"
                                                type="text"
                                                labelSize={3}
                                                colSize={9}
                                                disabled={isHR}
                                            />
                                            <Field
                                                name="jikname"
                                                component={renderField}
                                                label="직무"
                                                type="text"
                                                labelSize={3}
                                                colSize={9}
                                                disabled={isHR}
                                            />
                                            <Field
                                                name="work_role"
                                                component={renderTextAreaField}
                                                label="담당업무"
                                                disabled={isHR}
                                            />
                                            <Field
                                                name="bokri"
                                                component={renderTextAreaField}
                                                label="복리후생"
                                                disabled={isHR}
                                            />

                                            <Field
                                                name="work_dept"
                                                component={renderField}
                                                label="근무부서"
                                                type="text"
                                                labelSize={3}
                                                colSize={9}
                                                disabled={isHR}
                                            />
                                            <Field
                                                name="work_type"
                                                component={renderSelectField}
                                                label="근무형태"
                                                code_topidx="AG"
                                                code_topcd={null}
                                                options={comCode}
                                                disableOption="--"
                                                disabled={isHR}
                                            />
                                            {/*<Field*/}
                                            {/*    name="work_type_comment"*/}
                                            {/*    component={renderField}*/}
                                            {/*    label="근무요일"*/}
                                            {/*    type="text"*/}
                                            {/*    labelSize={3}*/}
                                            {/*    colSize={9}*/}
                                            {/*/>*/}
                                            <Row>
                                                <Col>
                                                    <Field
                                                        name="work_time_start"
                                                        component={renderField}
                                                        label="근무시간"
                                                        type="text"
                                                        labelSize={6}
                                                        colSize={5}
                                                        placeholder="0900"
                                                        disabled={isHR}
                                                    />
                                                </Col>
                                                <span className="col-form-label" style={{marginLeft: '-25px'}}>~</span>
                                                <Col>
                                                    <Field
                                                        name="work_time_end"
                                                        component={renderField}
                                                        type="text"
                                                        labelSize={5}
                                                        colSize={5}
                                                        placeholder="1800"
                                                        disabled={isHR}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Field
                                                        name="work_rest_start"
                                                        component={renderField}
                                                        label="휴게시간"
                                                        type="text"
                                                        labelSize={6}
                                                        colSize={5}
                                                        placeholder="1200"
                                                        disabled={isHR}
                                                    />
                                                </Col>
                                                <span className="col-form-label" style={{marginLeft: '-25px'}}>~</span>
                                                <Col>
                                                    <Field
                                                        name="work_rest_end"
                                                        component={renderField}
                                                        type="text"
                                                        labelSize={5}
                                                        colSize={5}
                                                        placeholder="1300"
                                                        disabled={isHR}
                                                    />
                                                </Col>
                                            </Row>
                                            <Field
                                                name="work_rest_comment"
                                                component={renderTextAreaField}
                                                label="근무시간 기타사항"
                                                disabled={isHR}
                                            />

                                            {/* <Field
                        name="salary_term"
                        component={renderField}
                        label="급여범위코드"
                        type="text"
                    /> */}

                                            <Field
                                                name="work_house_gubun"
                                                component={renderCheckbox}
                                                label="재택가능구분"
                                                disabled={isHR}
                                            />
                                            {/*<Field*/}
                                            {/*    name="work_near_subway"*/}
                                            {/*    component={renderSelectField}*/}
                                            {/*    label="인근지하철"*/}
                                            {/*    code_topidx="AM"*/}
                                            {/*    code_topcd={null}*/}
                                            {/*    options={comCode}*/}
                                            {/*    disableOption="--"*/}
                                            {/*/>*/}
                                            {/*<Field*/}
                                            {/*    name="work_traffic"*/}
                                            {/*    component={renderTextAreaField}*/}
                                            {/*    label="교통편상세"*/}
                                            {/*/>*/}
                                            {/*<Field*/}
                                            {/*    name="sugub_status"*/}
                                            {/*    component={renderSelectField}*/}
                                            {/*    label="수급진행상태"*/}
                                            {/*    code_topidx="CC"*/}
                                            {/*    code_topcd={null}*/}
                                            {/*    options={comCode}*/}
                                            {/*    disableOption="--"*/}
                                            {/*    disabled={isHR}*/}
                                            {/*/>*/}
                                        </div>

                                    </AccordionDetails>
                                </Accordion>
                            </Col>
                        </Row>
                        <fieldset className="form-group">
                            <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
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
                                수정</button><div></div>
                            <button type="button" className="btn btn-primary btn-block" onClick={() => history.goBack()}>뒤로가기</button>
                        </fieldset>
                    </Form>
                </div>
            ) }
        </>
    )
}
function mapStateToProps(state, props) {
    return {
        initialValues: state.common.data,
    }
}
// export default connect(mapStateToProps)(reduxForm({
//     form: 'SugubEditForm',
//     enableReinitialize: true,
//     // onSubmit:submitForm
// })(SugubEditForm))
export default reduxForm({
    form: 'SugubEditForm', // a unique identifier for this form
    enableReinitialize: true,
    onSubmitFail: (errors) => {
        document.getElementsByClassName('main-panel')[0].scrollTop=0;
    }
})(SugubEditForm)
