import React, {useEffect, useState} from 'react'
import {Field, reduxForm} from 'redux-form'
import history from "../../../utils/historyUtils";
import {connect} from "react-redux";
import {Col, Form, FormGroup, Row, Spinner} from "reactstrap"
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DaumPostcode from "../../Etc/DaumPostcode_mng"
import {
    addrRenderField,
    multiSelectField,
    renderDateField,
    renderField,
    renderSelectField,
    renderTextAreaField
} from "../../../utils/renderUtils_mng";

const style = {
    width: '100%',
}
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
    },
    container:{
        marginBottom:'10px',
    }
}));
const required = value => (value || typeof value === 'number' ? undefined : '필수값입니다.')
const number = value =>
    value && isNaN(Number(value)) ? 'Must be a number' : undefined
const SugubCreateForm = (props) => {
    const { handleSubmit,comcode, submitting} = props
    const [jikTopcdM, setJikTopcdM] = useState();
    const [jikTopcdS, setJikTopcdS] = useState();
    const classes = useStyles();

    useEffect(() => {
        setJikTopcdM(props.history.location.state.sugub.sugub_jikjong_top.code_id);
        setJikTopcdS(props.history.location.state.sugub.sugub_jikjong_mid.code_id);
    }, [])


    return  (
        <>
            <div className={classes.root}>
                <Form onSubmit={handleSubmit} className="sugubForm" >
                    <Row>
                        <Col className="col-auto col-sm-6 col-md-6">
                            {/*<Accordion className={classes.container} defaultExpanded>*/}
                            {/*    <AccordionSummary*/}
                            {/*        expandIcon={<ExpandMoreIcon />}*/}
                            {/*        aria-controls="panel1a-content"*/}
                            {/*        id="panel1a-header"*/}
                            {/*    >*/}
                            {/*        <Typography className={classes.heading}>업체정보</Typography>*/}
                            {/*    </AccordionSummary>*/}
                            {/*    <AccordionDetails>*/}
                            {/*        <div style={style}>*/}
                            {/*            <FormGroup row>*/}
                            {/*                <Label className="" sm="2" >기업명</Label>*/}
                            {/*                <Col sm="10">*/}
                            {/*                    /!*<Input className="form-control"  type="text"  value={store.getState().auth.company.custname} disabled/>*!/*/}
                            {/*                </Col>*/}
                            {/*            </FormGroup>*/}
                            {/*            <FormGroup row>*/}
                            {/*                <Label className="" sm="2" >인사담당자</Label>*/}
                            {/*                <Col sm="10">*/}
                            {/*                    /!*<Input className="form-control"  type="text"  value={store.getState().auth.user.email} disabled/>*!/*/}
                            {/*                </Col>*/}
                            {/*            </FormGroup>*/}
                            {/*            <Field*/}
                            {/*                name="custid"*/}
                            {/*                label="사업자번호"*/}
                            {/*                component={rowRenderField}*/}
                            {/*                type="text"*/}
                            {/*                labelSize={2}*/}
                            {/*                colSize={10}*/}
                            {/*            />*/}
                            {/*        </div>*/}
                            {/*    </AccordionDetails>*/}
                            {/*</Accordion>*/}

                            {/*2. 의뢰정보*/}
                            <Accordion className={classes.container} defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>의뢰정보</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div style={style}>
                                        <Field
                                            name="sugub_title"
                                            component={renderField}
                                            label="의뢰제목"
                                            type="text"
                                            labelSize={3}
                                            colSize={9}
                                        />
                                        <Field
                                            name="chae_cd"
                                            label="채용형태"
                                            component={renderSelectField}
                                            code_topidx="AC"
                                            code_topcd={null}
                                            options={comcode}
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
                                            required={true}
                                            validate={[ required ]}
                                        />
                                        {/*<Field*/}
                                        {/*    name="manager"*/}
                                        {/*    component={SelectField}*/}
                                        {/*    label="수급담당자"*/}
                                        {/*    options={users}*/}
                                        {/*    selectLabel="email"*/}
                                        {/*    required={true}*/}
                                        {/*    validate={[ required ]}*/}
                                        {/*    */}
                                        {/*/>*/}

                                        {/*<Field*/}
                                        {/*    name="apply_gubun"*/}
                                        {/*    component={renderSelectField}*/}
                                        {/*    label="접수기간구분"*/}
                                        {/*    code_topidx="AY"*/}
                                        {/*    code_topcd={null}*/}
                                        {/*    options={comcode}*/}
                                        {/*    disableOption="--"*/}

                                        {/*/>*/}

                                        {/*<Field*/}
                                        {/*    name="submit_doc"*/}
                                        {/*    component={renderSelectField}*/}
                                        {/*    label="지원서양식"*/}
                                        {/*    code_topidx="AZ"*/}
                                        {/*    code_topcd={null}*/}
                                        {/*    options={comcode}*/}
                                        {/*    disableOption="--"*/}

                                        {/*/>*/}

                                        <Field
                                            name="sugub_jikjong_top"
                                            label="직종코드(대)"
                                            component={renderSelectField}
                                            code_topidx="AA"
                                            code_topcd={null}
                                            options={comcode}
                                            onChange={(e) => setJikTopcdM(e.target.value)}

                                        />

                                        <Field
                                            name="sugub_jikjong_mid"
                                            label="직종코드(중)"
                                            component={renderSelectField}
                                            code_topidx="AA"
                                            code_topcd={jikTopcdM}
                                            options={comcode}
                                            onChange={(e) => setJikTopcdS(e.target.value)}

                                        />

                                        <Field
                                            name="sugub_jikjong_low"
                                            label="직종코드(소)"
                                            component={multiSelectField}
                                            code_topidx="AA"
                                            code_topcd={jikTopcdS}
                                            options={comcode}

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

                                        />

                                        {/*<Field*/}
                                        {/*    name="hire_type"*/}
                                        {/*    component={renderSelectField}*/}
                                        {/*    label="고용형태"*/}
                                        {/*    code_topidx="AD"*/}
                                        {/*    code_topcd={null}*/}
                                        {/*    options={comcode}*/}
                                        {/*    disableOption="--"*/}

                                        {/*/>*/}
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
                                                        options={comcode}
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
                                            options={comcode}
                                            disableOption="--"
                                            required={true}
                                            validate={[ required ]}
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
                                            options={comcode}
                                        />

                                        <Field
                                            name="education_cd"
                                            component={renderSelectField}
                                            label="학력"
                                            code_topidx="AO"
                                            code_topcd={null}
                                            options={comcode}

                                        />

                                        <Field
                                            name="sugub_gender"
                                            component={renderSelectField}
                                            label="선호성별"
                                            code_topidx="AQ"
                                            code_topcd={null}
                                            options={comcode}
                                            disableOption="--"

                                        />

                                        <Field
                                            name="salary_gubun"
                                            component={renderSelectField}
                                            label="급여"
                                            code_topidx="AI"
                                            code_topcd={null}
                                            options={comcode}
                                            disableOption="--"

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

                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Field
                                                    name="wrk_condition"
                                                    component={renderTextAreaField}
                                                    label="근무조건"

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
                        </Col>
                        <Col className="col-auto col-sm-6 col-md-6">


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
                                        {/*<Field*/}
                                        {/*    name="work_site_gubun"*/}
                                        {/*    component={renderSelectField}*/}
                                        {/*    label="근무지"*/}
                                        {/*    code_topidx="AK"*/}
                                        {/*    code_topcd={null}*/}
                                        {/*    options={comcode}*/}
                                        {/*    disableOption="--"*/}
                                        {/*    */}
                                        {/*/>*/}
                                        <FormGroup row>
                                            <Field
                                                name="work_post_addr_code"
                                                component={addrRenderField}
                                                label="우편번호"
                                                type="text"
                                                labelSize={3}
                                                colSize={3}

                                            />
                                            <DaumPostcode formName="SugubEditForm" filed1="work_load_addr" filed2='work_post_addr_code' filed3='work_load_addr_detail'/>
                                        </FormGroup>
                                        <Field name="work_load_addr" label="근무지" component={renderField}
                                               type="text"
                                               labelSize={3}
                                               colSize={9}

                                        />
                                        <fieldset className="form-group">
                                            <Field name="work_load_addr_detail" label="상세주소" component={renderField}
                                                   type="text"
                                                   labelSize={3}
                                                   colSize={9}

                                            />
                                        </fieldset>
                                        <Field
                                            name="work_position"
                                            component={renderField}
                                            label="포지션"
                                            type="text"
                                            labelSize={3}
                                            colSize={9}

                                        />
                                        <Field
                                            name="jikname"
                                            component={renderField}
                                            label="직무"
                                            type="text"
                                            labelSize={3}
                                            colSize={9}

                                        />
                                        <Field
                                            name="work_role"
                                            component={renderTextAreaField}
                                            label="담당업무"

                                        />
                                        <Field
                                            name="bokri"
                                            component={renderTextAreaField}
                                            label="복리후생"

                                        />

                                        <Field
                                            name="work_dept"
                                            component={renderField}
                                            label="근무부서"
                                            type="text"
                                            labelSize={3}
                                            colSize={9}

                                        />
                                        <Field
                                            name="work_type"
                                            component={renderSelectField}
                                            label="근무형태"
                                            code_topidx="AG"
                                            code_topcd={null}
                                            options={comcode}
                                            disableOption="--"

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

                                                />
                                            </Col>
                                        </Row>
                                        <Field
                                            name="work_rest_comment"
                                            component={renderTextAreaField}
                                            label="근무시간 기타사항"

                                        />

                                        {/* <Field
                        name="salary_term"
                        component={renderField}
                        label="급여범위코드"
                        type="text"
                    /> */}

                                        {/*<Field*/}
                                        {/*    name="work_house_gubun"*/}
                                        {/*    component={renderCheckbox}*/}
                                        {/*    label="재택가능구분"*/}
                                        {/*/>*/}
                                        {/*<Field*/}
                                        {/*    name="work_near_subway"*/}
                                        {/*    component={renderSelectField}*/}
                                        {/*    label="인근지하철"*/}
                                        {/*    code_topidx="AM"*/}
                                        {/*    code_topcd={null}*/}
                                        {/*    options={comcode}*/}
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
                                        {/*    options={comcode}*/}
                                        {/*    disableOption="--"*/}
                                        {/*    */}
                                        {/*/>*/}
                                    </div>

                                </AccordionDetails>
                            </Accordion>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-right">
                            <button className="btn btn-primary " onClick={() => history.goBack()}>뒤로가기</button>
                            <button action="submit" className="btn btn-primary" disabled={submitting}>
                                {submitting === true && (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />)
                                }등록</button>
                        </Col>
                    </Row>
                </Form>
            </div>

        </>
    )
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        company: state.auth.company,
        comcode: state.comcode.comcode
    }
}
export default connect(mapStateToProps)(reduxForm({
    form: 'SugubCreateForm',
    enableReinitialize: true,
    // onSubmit: postSugub,
    onSubmitSuccess: () => {
        history.goBack();
    },
    onSubmitFail: (errors) => {
         window.scrollTo(0, 0);
    }
})(SugubCreateForm))
// export default reduxForm({
//     form: 'SugubEditForm', // a unique identifier for this form
//     enableReinitialize: true,
// })(SugubEditForm)