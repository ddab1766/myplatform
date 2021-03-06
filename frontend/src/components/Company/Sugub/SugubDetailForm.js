import React, {useEffect, useState} from "react";
import {Field, formValueSelector, reduxForm} from "redux-form";
import history from "utils/historyUtils";

import {Col, Container, Form, FormGroup, Row, Spinner,Label} from "reactstrap";
import {connect} from "react-redux";
import {updateSugub} from "../../../actions/sugubActions";
import {makeStyles} from "@material-ui/core";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    addrRenderField,
    multiSelectField,
    renderDateField,
    renderField,
    renderSelectField,
    renderTextAreaField,test1
} from "../../../utils/renderUtils_mng";
import DaumPostcode from "../../Etc/DaumPostcode_mng";
import {renderCheckboxField, renderError, renderMuiCheckbox, renderNumberField} from "../../../utils/renderUtils";
import SugubDetailValidate from "./SugubDetailValidate";
import {isMobile} from "react-device-detect";
import {Button, FlexboxGrid, Icon} from "rsuite";
import styled from "styled-components";

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
const Style_ul = styled.ul`
  display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0;
                
`;
const Style_li = styled.li`
  list-style: none;
    display: flex;
    margin: 0 5px 5px 0;
`;

const SelectLabel = styled.label`
    margin: 0;
      padding: 5px 15px;
      box-sizing: border-box;
      position: relative;
      display: inline-block;
      border: solid 1px #DDD;
      background-color: #FFF;
      line-height: 140%;
      text-align: center;
      box-shadow: 0 0 0 rgba(255, 255, 255, 0);
      transition: border-color .15s ease-out,  color .25s ease-out,  background-color .15s ease-out, box-shadow .15s ease-out;
      cursor: pointer;
`
const RadioLabel = styled.label`
   margin: 0;
    padding: 0 15px;
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    border: solid 1px #DDD;
    background-color: #FFF;
    line-height: 28px;
    text-align: center;
    box-shadow: 0 0 0 rgb(255 255 255 / 0%);
    transition: border-color .15s ease-out, color .25s ease-out, background-color .15s ease-out, box-shadow .15s ease-out;
    cursor: pointer;
    border-radius: 24px;
    height: 30px;
    font-size: 14px;
`
const RadioInput = styled.input`
    width: 0;
  height: 0;
  position: absolute;
  left: -9999px;
  &:checked + ${SelectLabel}{
        background-color: #4B9DEA;
      color: #FFF !important;
      box-shadow: 0 0 10px rgba(102, 179, 251, 0.5);
      border-color: #4B9DEA;
      // z-index: 1;
  }
  &:checked + ${RadioLabel}{
        background-color: #4B9DEA;
      color: #FFF !important;
      box-shadow: 0 0 10px rgba(102, 179, 251, 0.5);
      border-color: #4B9DEA;
      // z-index: 1;
  }
`
const renderRadioGroup = ({ input, label, name, type, options, code_topidx, code_topcd,placeholder, required,
                          defaultValue, meta: { touched, error }, ...rest }) => {

    const list = options.filter(v => v.code_topidx === code_topidx && v.code_topcd === code_topcd).map((value, index) => {
        return (
            <Style_li>
                <RadioInput {...input} {...rest} type="radio" id={value.code_id} name={code_topidx}
                       value={value.code_id} checked={typeof input.value === 'object' ?
                           (input.value.code_id === value.code_id) : (input.value === value.code_id)}/>
                <RadioLabel htmlFor={value.code_id}>{value.code_name}</RadioLabel>
            </Style_li>
        )
    })
    return (
        <>
            <FormGroup row>
                {label && (
                    <Label sm={3}>{label}<small style={{color: "red"}}>{required ? '??????' : ''}</small></Label>
                )}
                <Col sm={9}>
                    <Style_ul
                        >
                        {list}
                    </Style_ul>
                    {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
                </Col>
            </FormGroup>
        </>
    )


    // {/*<>*/}
    // {/*    <RadioInput {...input} {...rest} type="radio" checked={input.value.code_id === rest.value} />*/}
    // {/*    <Label1 htmlFor={rest.id}>?????????</Label1>*/}
    // {/*</>*/}
}
const required = value => (value || typeof value === 'number' ? undefined : '??????????????????.')
const number = value =>
    value && isNaN(Number(value)) ? 'Must be a number' : undefined
const SugubFormDetail = (props) => {
    const {handleSubmit, error, submitting} = props;
    const [isSelected, setIsSelected] = useState(false);
    const [comcode, setComcode] = useState([]);
    const [jikjong, setJikjong] = useState([]);
    const [jikTopcdM, setJikTopcdM] = useState();
    const [jikTopcdS, setJikTopcdS] = useState();
    const [sugub, setSugub] = useState(props.location.state && props.location.state.sugub);
    const [gigan, setGigan] = useState(false);
    const [type, setType] = useState(false);
    const [career, setCareer] = useState(false);
    const [salary, setSalary] = useState(false);
    const [salaryUnit, setSalaryUnit] = useState('???');

    // ????????????
    useEffect(()=>{
        if(typeof props.chae_cd =='object'){
            if(props.chae_cd.code_id === 'AC0100000'){ // ?????????
                setGigan(true);
                setType(false);
                props.change('hire_type', null)
            } else if(props.chae_cd.code_id === 'AC0300000'){ // ???????????????
                setGigan(false);
                setType(true);
                props.change('chae_gigan', null);
                props.change('chae_gigan_type', null);
            }
        }else{
            if(props.chae_cd === 'AC0100000'){
                setGigan(true);
                setType(false);
                props.change('hire_type', null)
            } else if(props.chae_cd === 'AC0300000'){
                setGigan(false);
                setType(true);
                props.change('chae_gigan', null);
                props.change('chae_gigan_type', null);
            }
        }

    }, [props.chae_cd]);
    // ????????????
    useEffect(()=>{
        if(props.sugub_career_gb === undefined) return
        if(typeof props.sugub_career_gb =='object'){
            if(props.sugub_career_gb.code_id === 'AB0200000'){
                setCareer(true)
            } else {
                setCareer(false);
                props.change('career_start', null);
                props.change('career_end', null);
            }
        }else{
            if(props.sugub_career_gb === 'AB0200000'){
                setCareer(true)
            } else {
                setCareer(false);
                props.change('career_start', null);
                props.change('career_end', null);
            }
        }
    }, [props.sugub_career_gb]);
    // ????????????
    useEffect(()=>{
        if(typeof props.salary_gubun =='object'){
            if(props.salary_gubun.code_id !== ''){
                setSalary(true)
                if(props.salary_gubun.code_id === 'AI0100000') {
                    setSalaryUnit('??????')
                }else{
                    setSalaryUnit('???')
                }
            } else {
                setSalary(false);
                props.change('salary_start', null);
                props.change('salary_end', null);
            }
        }else{
            if(props.salary_gubun !== ''){
                setSalary(true)
                if(props.salary_gubun === 'AI0100000') {
                    setSalaryUnit('??????')
                }else{
                    setSalaryUnit('???')
                }
            } else {
                setSalary(false);
                props.change('salary_start', null);
                props.change('salary_end', null);
            }
        }
    }, [props.salary_gubun]);



    const classes = useStyles();
    // let sugub;
    useEffect(() => {
        if(typeof props.location.state === 'undefined'){
            history.push('/Company');
        } else{
            if(props.comcode) setJikjong(props.comcode.filter(v=> v.code_topidx === 'AA'))
            //??????????????? ???????????????,???
            setJikTopcdM(props.location.state.sugub.sugub_jikjong_top.code_id);
            setJikTopcdS(props.location.state.sugub.sugub_jikjong_mid.code_id);
        }

    }, []);

    useEffect(() => {
        if(isMobile) document.querySelector('.navbar-brand').style.marginLeft='40px';
        if(props.comcode) setComcode(props.comcode.filter(v=> (v.code_topidx === 'AB' && v.code_topcd === null )
            || v.code_topidx === 'AC' || v.code_topidx === 'AO' || v.code_topidx === 'AQ' || v.code_topidx === 'AI'
            || v.code_topidx === 'AY' || v.code_topidx === 'AZ' || v.code_topidx === 'AD'
            || v.code_topidx === 'AE' || v.code_topidx === 'AF' || v.code_topidx === 'AG'))

    }, []);

    const handleBack = () => {
        history.push('/Company/Sugub');
        document.querySelector('.navbar-brand').style.marginLeft='0px';
    }
    return sugub ? (
        <>
            {isMobile && <div style={{position:'fixed',top:'12px',marginLeft:'10px',zIndex:'1035',color: 'white'}}
                              onClick={handleBack}>
                <Icon icon="chevron-circle-left" size="2x" />
            </div>}
            <Container>
                <div className="title">
                    <h3 className="text-md-left">??????????????? ?????? ????????? ??????????????????.</h3>
                    <small>
                        ????????? ????????? ??????????????? ??? ????????? ????????? ???????????????.<br/>
                        ????????? ???????????? ???????????? ???????????? ?????? ???????????????.
                    </small>
                </div>
                <br/>
                <div className={classes.root}>
                    <Form onSubmit={handleSubmit} className="sugubForm" >
                        <Row>
                            <Col className="col-auto col-sm-6 col-md-6">


                                {/*2. ????????????*/}
                                <Accordion className={classes.container} defaultExpanded>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>????????????</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div style={style}>
                                            <Field
                                                name="sugub_title"
                                                component={renderField}
                                                label="????????????"
                                                placeholder={'(???) ?????? ???????????? 1???, ???????????? 1???<'}
                                                type="text"
                                                labelSize={3}
                                                colSize={9}
                                                required={true}
                                            />
                                            <Field
                                                name="sugub_jikjong_top"
                                                label="??????(?????????)"
                                                component={renderSelectField}
                                                code_topidx="AA"
                                                code_topcd={null}
                                                options={jikjong}
                                                disableOption="--"
                                                onChange={(e) => setJikTopcdM(e.target.value)}
                                                required={true}
                                            />

                                            <Field
                                                name="sugub_jikjong_mid"
                                                label="??????(?????????)"
                                                component={renderSelectField}
                                                code_topidx="AA"
                                                code_topcd={jikTopcdM}
                                                options={jikjong}
                                                disableOption="--"
                                                onChange={(e) => setJikTopcdS(e.target.value)}
                                                required={true}
                                            />

                                            <Field
                                                name="sugub_jikjong_low"
                                                label="??????(?????????)"
                                                component={multiSelectField}
                                                code_topidx="AA"
                                                code_topcd={jikTopcdS}
                                                options={jikjong}

                                            />
                                            <Field
                                                name="sugub_end_dt"
                                                label="???????????????"
                                                component={renderDateField}
                                                labelSize={3}
                                                colSize={9}
                                                required={true}
                                            />
                                            {/*<Field*/}
                                            {/*    name="chae_cd"*/}
                                            {/*    label="????????????"*/}
                                            {/*    component={renderSelectField}*/}
                                            {/*    code_topidx="AC"*/}
                                            {/*    code_topcd={null}*/}
                                            {/*    options={comcode}*/}
                                            {/*    disableOption="--"*/}
                                            {/*    required={true}*/}
                                            {/*/>*/}

                                            <Field
                                                component={renderRadioGroup}
                                                name="chae_cd"
                                                code_topidx="AC"
                                                code_topcd={null}
                                                options={comcode}
                                                label="????????????"
                                                required={true}
                                            />

                                            { gigan && (
                                                <Row>
                                                    <Col>
                                                        <Field
                                                            name="chae_gigan"
                                                            component={renderField}
                                                            label="????????????"
                                                            type="number"
                                                            labelSize={6}
                                                            colSize={4}
                                                            required={true}
                                                            // required={true}
                                                            // validate={[required, number]}
                                                        />
                                                    </Col>
                                                    <Col style={isMobile ? {alignSelf: 'flex-end',marginBottom: '-20px'}
                                                    : {alignSelf: ''}}>
                                                        <div style={!isMobile ? {marginLeft:'-60px'} :  {marginLeft:''} }>
                                                            <Field
                                                                component={renderRadioGroup}
                                                                name="chae_gigan_type"
                                                                code_topidx="AE"
                                                                code_topcd={null}
                                                                options={comcode}
                                                            />
                                                            {/*<Field*/}
                                                            {/*    name="chae_gigan_type"*/}
                                                            {/*    component={renderSelectField}*/}
                                                            {/*    // label="??????????????????"*/}
                                                            {/*    code_topidx="AE"*/}
                                                            {/*    code_topcd={null}*/}
                                                            {/*    options={comcode}*/}
                                                            {/*    // required={true}*/}
                                                            {/*    disableOption="??????????????? ??????????????????"*/}
                                                            {/*/>*/}
                                                        </div>
                                                    </Col>
                                                </Row>
                                            )}

                                            {type && (
                                                <>
                                                    <Field
                                                        name="hire_type"
                                                        label="????????????"
                                                        component={renderSelectField}
                                                        code_topidx="AD"
                                                        code_topcd={null}
                                                        options={comcode}
                                                        disableOption="--"
                                                        required={true}
                                                    />
                                                </>
                                            )}

                                            <Field
                                                name="work_position"
                                                component={renderField}
                                                label="????????????"
                                                type="text"
                                                labelSize={3}
                                                colSize={9}
                                                required={true}
                                            />

                                            <Row>
                                                <Col>
                                                    <Field
                                                        name="spec"
                                                        component={renderTextAreaField}
                                                        label="??????/????????????"
                                                        // required={true}
                                                    />
                                                </Col>
                                            </Row>

                                            <Field
                                                name="work_role"
                                                component={renderTextAreaField}
                                                label="????????????"
                                                required={true}
                                            />

                                            <Field
                                                component={renderRadioGroup}
                                                name="sugub_career_gb"
                                                code_topidx="AB"
                                                code_topcd={null}
                                                options={comcode}
                                                label="??????"
                                                required={true}
                                            />
                                            {/*<Field*/}
                                            {/*    name="sugub_career_gb"*/}
                                            {/*    component={renderSelectField}*/}
                                            {/*    label="??????"*/}
                                            {/*    required={true}*/}
                                            {/*    code_topidx="AB"*/}
                                            {/*    code_topcd={null}*/}
                                            {/*    options={comcode}*/}
                                            {/*    disableOption="--"*/}
                                            {/*/>*/}
                                            {career && (
                                                <Row>
                                                    <Col md={3}>{' '}</Col>
                                                    <Col md={3}>
                                                        <Field
                                                            name="career_start"
                                                            component={renderNumberField}
                                                            type="number"
                                                            inputAddonText={'???'}
                                                        />
                                                    </Col>
                                                    <Col md={1}>{'~'}</Col>

                                                    <Col md={3}>
                                                        <Field
                                                            name="career_end"
                                                            component={renderNumberField}
                                                            type="number"
                                                            inputAddonText={'???'}
                                                        />
                                                    </Col>
                                                </Row>
                                            )}

                                            <Field
                                                name="education_cd"
                                                component={renderSelectField}
                                                label="??????"
                                                required={true}
                                                code_topidx="AO"
                                                code_topcd={null}
                                                options={comcode}
                                                disableOption="--"
                                            />

                                            <Field
                                                name="hire_count"
                                                component={renderField}
                                                label="???????????????"
                                                type="number"
                                                labelSize={3}
                                                colSize={2}
                                                required={true}
                                                validate={[required, number]}
                                            />
                                            <Row>
                                                <Col md={3}>??????<small style={{color:"red"}}> {'??????'}</small></Col>
                                                <Col md={3}>
                                                    <Field
                                                        name="age_start"
                                                        component={renderNumberField}
                                                        // label="??????(??????)"
                                                        inputAddonText={'???'}
                                                        type="number"
                                                        // labelSize={3}
                                                        required={true}
                                                        // required={true}
                                                        // validate={[required, number]}
                                                    />
                                                </Col>
                                                <Col md={1}>{'~'}</Col>
                                                <Col md={3}>
                                                    <Field
                                                        name="age_end"
                                                        type="number"
                                                        component={renderNumberField}
                                                        inputAddonText={'???'}
                                                        // label="??????(??????)"
                                                        required={true}
                                                        // labelSize={3}
                                                        // disableOption="??????????????? ??????????????????"
                                                    />
                                                </Col>
                                            </Row>

                                            <Field
                                                name="salary_gubun"
                                                component={renderSelectField}
                                                label="??????"
                                                code_topidx="AI"
                                                code_topcd={null}
                                                required={true}
                                                options={comcode}
                                                disableOption="--"

                                            />
                                            {salary && (
                                                <Row>
                                                    <Col md={3}>{' '}</Col>
                                                    <Col md={4}>
                                                        <Field
                                                            name="salary_start"
                                                            // component={renderField}
                                                            component={renderNumberField}
                                                            type="number"
                                                            inputAddonText={salaryUnit}
                                                        />
                                                    </Col>
                                                    <Col md={1}>{'~'}</Col>

                                                    <Col md={4}>
                                                        <Field
                                                            name="salary_end"
                                                            component={renderNumberField}
                                                            type="number"
                                                            inputAddonText={salaryUnit}
                                                        />
                                                    </Col>
                                                </Row>
                                            )}
                                            <Row>
                                                <Col md={3}>
                                                    <label>?????? ?????? ??????</label>
                                                </Col>
                                                <Col md={9}>
                                                    <Field name="sugub_salary_adjust"
                                                           component={renderMuiCheckbox}
                                                           labelSize={3}
                                                           colSize={1}
                                                        // component={renderCheckboxField}
                                                           type="checkbox"
                                                    />
                                                </Col>
                                            </Row>

                                            <FormGroup row>
                                                <Field
                                                    name="work_load_addr_code"
                                                    component={addrRenderField}
                                                    label="????????????"
                                                    type="text"
                                                    labelSize={3}
                                                    colSize={3}
                                                />
                                                <DaumPostcode formName="update_sugubDetail" filed1="work_load_addr" filed2='work_load_addr_code' filed3='work_load_addr_detail'/>
                                            </FormGroup>
                                            <Field name="work_load_addr" label="?????????" component={renderField}
                                                   type="text"
                                                   labelSize={3}
                                                   colSize={9}
                                            />
                                            <fieldset className="form-group">
                                                <Field name="work_load_addr_detail" label="????????????" component={renderField}
                                                       type="text"
                                                       labelSize={3}
                                                       colSize={9}
                                                />
                                            </fieldset>



                                            <Field
                                                name="sugub_gender"
                                                component={renderSelectField}
                                                label="????????????"
                                                code_topidx="AQ"
                                                code_topcd={null}
                                                options={comcode}
                                                disableOption="--"
                                            />

                                        </div>

                                    </AccordionDetails>
                                </Accordion>

                            </Col>
                            <Col className="col-auto col-sm-6 col-md-6">
                                {/*4. ????????????*/}
                                <Accordion className={classes.container} defaultExpanded>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>????????????</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div style={style}>
                                            <Field
                                                name="work_dept"
                                                component={renderField}
                                                label="????????????"
                                                placeholder={'(???) ???????????????'}
                                                type="text"
                                                labelSize={3}
                                                colSize={9}
                                                required={true}
                                            />
                                            {/*<Row>
                                                <Col>
                                                    <Field
                                                        name="wrk_condition"
                                                        component={renderTextAreaField}
                                                        label="????????????"

                                                    />
                                                </Col>
                                            </Row>*/}
                                            <Row>
                                                <Col>
                                                    <Field
                                                        name="cont_chg_gb"
                                                        component={renderSelectField}
                                                        label="????????????"
                                                        required={true}
                                                        code_topidx="AF"
                                                        code_topcd={null}
                                                        options={comcode}
                                                        disableOption="--"
                                                    />
                                                </Col>
                                            </Row>
                                            <Field
                                                name="work_type"
                                                component={renderSelectField}
                                                label="????????????"
                                                code_topidx="AG"
                                                code_topcd={null}
                                                options={comcode}
                                                disableOption="--"
                                                required={true}
                                            />
                                            <Row>
                                                <Col md={3}>????????????<small style={{color:"red"}}> {'??????'}</small></Col>
                                                <Col md={3}>
                                                    <Field
                                                        name="work_time_start"
                                                        component={renderField}
                                                        // label="??????(??????)"
                                                        // inputAddonText={'???'}
                                                        type="text"
                                                        placeholder="(???) 0900"
                                                        // labelSize={3}
                                                        required={true}
                                                        // required={true}
                                                        // validate={[required, number]}
                                                    />
                                                </Col>
                                                <Col md={1}>{'~'}</Col>
                                                <Col md={3}>
                                                    <Field
                                                        name="work_time_end"
                                                        type="text"
                                                        component={renderField}
                                                        // inputAddonText={'???'}
                                                        placeholder="(???) 1800"
                                                        // label="??????(??????)"
                                                        required={true}
                                                        // labelSize={3}
                                                        // disableOption="??????????????? ??????????????????"
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={3}>????????????<small style={{color:"red"}}> {'??????'}</small></Col>
                                                <Col md={3}>
                                                    <Field
                                                        name="work_rest_start"
                                                        component={renderField}
                                                        // label="??????(??????)"
                                                        // inputAddonText={'???'}
                                                        type="text"
                                                        placeholder="(???) 1200"
                                                        // labelSize={3}
                                                        required={true}
                                                        // required={true}
                                                        // validate={[required, number]}
                                                    />
                                                </Col>
                                                <Col md={1}>{'~'}</Col>
                                                <Col md={3}>
                                                    <Field
                                                        name="work_rest_end"
                                                        type="text"
                                                        component={renderField}
                                                        // inputAddonText={'???'}
                                                        placeholder="(???) 1300"
                                                        // label="??????(??????)"
                                                        required={true}
                                                        // labelSize={3}
                                                        // disableOption="??????????????? ??????????????????"
                                                    />
                                                </Col>
                                            </Row>
                                            {/*<Row>*/}
                                            {/*    <Col>*/}
                                            {/*        <Field*/}
                                            {/*            name="work_time_start"*/}
                                            {/*            component={renderField}*/}
                                            {/*            label="????????????"*/}
                                            {/*            required={true}*/}
                                            {/*            type="number"*/}
                                            {/*            labelSize={6}*/}
                                            {/*            colSize={5}*/}
                                            {/*            placeholder="(???) 0900"*/}
                                            {/*        />*/}
                                            {/*    </Col>*/}
                                            {/*    <span className="col-form-label" style={{marginLeft: '-25px'}}>~</span>*/}
                                            {/*    <Col>*/}
                                            {/*        <Field*/}
                                            {/*            name="work_time_end"*/}
                                            {/*            component={renderField}*/}
                                            {/*            type="number"*/}
                                            {/*            labelSize={5}*/}
                                            {/*            colSize={5}*/}
                                            {/*            placeholder="(???) 1800"*/}

                                            {/*        />*/}
                                            {/*    </Col>*/}
                                            {/*</Row>*/}
                                            {/*<Row>*/}
                                            {/*    <Col>*/}
                                            {/*        <Field*/}
                                            {/*            name="work_rest_start"*/}
                                            {/*            component={renderField}*/}
                                            {/*            label="????????????"*/}
                                            {/*            // required={true}*/}
                                            {/*            type="number"*/}
                                            {/*            labelSize={6}*/}
                                            {/*            colSize={5}*/}
                                            {/*            placeholder="(???) 1200"*/}

                                            {/*        />*/}
                                            {/*    </Col>*/}
                                            {/*    <span className="col-form-label" style={{marginLeft: '-25px'}}>~</span>*/}
                                            {/*    <Col>*/}
                                            {/*        <Field*/}
                                            {/*            name="work_rest_end"*/}
                                            {/*            component={renderField}*/}
                                            {/*            type="number"*/}
                                            {/*            labelSize={5}*/}
                                            {/*            colSize={5}*/}
                                            {/*            placeholder="(???) 1300"*/}

                                            {/*        />*/}
                                            {/*    </Col>*/}
                                            {/*</Row>*/}
                                            <Field
                                                name="work_rest_comment"
                                                component={renderTextAreaField}
                                                label="???????????? ????????????"
                                            />

                                            <Field
                                                name="bokri"
                                                component={renderTextAreaField}
                                                label="????????????"
                                            />
                                            <Row>
                                                <Col md={3}>????????????(??????)</Col>
                                                <Col md={3}>
                                                    <Field
                                                        name="ot_daily"
                                                        component={renderNumberField}
                                                        inputAddonText={'??????'}
                                                        type="number"
                                                    />
                                                </Col>
                                                <Col md={4}>???????????? ?????? ??????</Col>
                                                <Col md={2}>
                                                    <Field
                                                        name="ot_daily_yn"
                                                        component={renderMuiCheckbox}
                                                        // inputAddonText={'??????'}
                                                        type="checkbox"
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={3}>????????????(??????)</Col>
                                                <Col md={3}>
                                                    <Field
                                                        name="ot_night"
                                                        component={renderNumberField}
                                                        inputAddonText={'??????'}
                                                        type="number"
                                                    />
                                                </Col>
                                                <Col md={4}>???????????? ?????? ??????</Col>
                                                <Col md={2}>
                                                    <Field
                                                        name="ot_night_yn"
                                                        component={renderMuiCheckbox}
                                                        // inputAddonText={'??????'}
                                                        type="checkbox"
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={3}>????????????(??????)</Col>
                                                <Col md={3}>
                                                    <Field
                                                        name="ot_holiday"
                                                        component={renderNumberField}
                                                        inputAddonText={'??????'}
                                                        type="number"
                                                    />
                                                </Col>
                                                <Col md={4}>???????????? ?????? ??????</Col>
                                                <Col md={2}>
                                                    <Field
                                                        name="ot_holiday_yn"
                                                        component={renderMuiCheckbox}
                                                        // inputAddonText={'??????'}
                                                        type="checkbox"
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Field
                                                        name="etc"
                                                        component={renderTextAreaField}
                                                        label="?????? ????????????"
                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion className={classes.container} defaultExpanded>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>????????????</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div style={style}>
                                            <Field name="company_name_yn" label="????????? ?????????" component={renderMuiCheckbox}
                                                   type="checkbox"
                                            />
                                            <Field name="salary_yn" label="?????? ?????????" component={renderMuiCheckbox}
                                                   type="checkbox" //defaultChecked={true}
                                            />
                                            <Field name="dpt_name_yn" label="????????? ?????????" component={renderMuiCheckbox}
                                                   type="checkbox" //defaultChecked={true}
                                            />
                                            <Field name="main_work_yn" label="???????????? ?????????" component={renderMuiCheckbox}
                                                   type="checkbox" //defaultChecked={true}
                                            />
                                            <Field name="condition_yn" label="???????????? ?????????" component={renderMuiCheckbox}
                                                   type="checkbox" //defaultChecked={true}
                                            />
                                            <Field name="special_condition_yn" label="???????????? ?????????" component={renderMuiCheckbox}
                                                   type="checkbox" //defaultChecked={true}
                                            />
                                            {/*<Field name="welfare_yn" label="???????????? ?????????" component={renderMuiCheckbox}*/}
                                            {/*       type="checkbox" //defaultChecked={true}*/}
                                            {/*/>*/}

                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </Col>
                        </Row>
                        {renderError(error)}
                        <hr/>
                        <Row>
                            <Col className="text-center">
                                <button className="btn btn-lg btn-outline-info" onClick={() => history.push('/Company/sugub/')}>??????</button>
                                <button action="submit" className="btn btn-lg btn-info" disabled={submitting}>
                                    {submitting === true && (
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />)
                                    }????????????</button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Container>
        </>
    ) : (<></>)
}

// const sugubDetailValidate = values => {
//     const errors = {};
//     const required = '?????? ?????????????????????.';
//     //????????????
//     if(!values.sugub_title){
//         errors.sugub_title = required
//     }
//     //??????(???)
//     if(!values.sugub_jikjong_top){
//         errors.sugub_jikjong_top = required
//     }
//     //??????(???)
//     if(!values.sugub_jikjong_mid){
//         errors.sugub_jikjong_mid = required
//     }
//     //????????????
//     if(!values.chae_cd){
//         errors.chae_cd = required
//     }else{
//         if(typeof values.chae_cd === 'object' && values.chae_cd.code_id === 'AC0100000' ){ // ?????????
//             //????????????
//             if(!values.chae_gigan) errors.chae_gigan = required
//             //????????????
//             if(!values.chae_gigan_type) errors.chae_gigan_type = required
//
//         }else if(values.chae_cd === 'AC0100000'){
//             //????????????
//             if(!values.chae_gigan) errors.chae_gigan = required
//             //????????????
//             if(!values.chae_gigan_type) errors.chae_gigan_type = required
//         }
//         if(typeof values.chae_cd === 'object' && values.chae_cd.code_id === 'AC0300000' ){ // ???????????????
//             //????????????
//             if(!values.hire_type) errors.hire_type = required
//         }else if(values.chae_cd === 'AC0300000'){
//             //????????????
//             if(!values.hire_type) errors.hire_type = required
//         }
//     }
//
//     //???????????????
//     if(!values.sugub_end_dt){
//         errors.sugub_end_dt = required
//     }
//     //????????????
//     if(!values.work_position){
//         errors.work_position = required
//     }else if(values.work_position.length >= 50){
//         errors.work_position = '50?????? ????????? ??????????????????.'
//     }
//     //?????? ????????????
//     // if(!values.spec){
//     //     errors.spec = required
//     // }else if(values.spec.length >= 1000){
//     //     errors.spec = '1000?????? ????????? ??????????????????.'
//     // }
//     //????????????
//     if(!values.work_role){
//         errors.work_role = required
//     }else if(values.work_role.length >= 1000){
//         errors.work_role = '1000?????? ????????? ??????????????????.'
//     }
//     //????????????
//     if(!values.sugub_career_gb) {
//         errors.sugub_career_gb = required
//     }else {
//         if(typeof values.sugub_career_gb === 'object' && values.sugub_career_gb.code_id === 'AB0200000' ) { // ??????
//             //????????????
//             if (!values.career_start) errors.career_start = required;
//             //????????????
//             if (!values.career_end) errors.career_end = required;
//         } else if(values.chae_cd === 'AB0200000'){
//             //????????????
//             if (!values.career_start) errors.career_start = required;
//             //????????????
//             if (!values.career_end) errors.career_end = required;
//         }
//     }
//
//     //????????????
//     if(!values.education_cd){
//         errors.education_cd = required
//     }
//     //????????????
//     if(!values.age_start) {
//         errors.age_start = required
//     }
//     //????????????
//     if(!values.age_end) {
//         errors.age_end = required
//     }
//     //????????????
//     if(!values.salary_start) {
//         errors.salary_start = required
//     }
//     //????????????
//     if(!values.salary_end) {
//         errors.salary_end = required
//     }
//     //????????????
//     if(!values.work_dept) {
//         errors.work_dept = required
//     }
//     //????????????
//     if(!values.work_type) {
//         errors.work_type = required
//     }
//     //????????????
//     if(!values.cont_chg_gb) {
//         errors.cont_chg_gb = required
//     }
//     //????????????
//     if(!values.work_dept) {
//         errors.work_dept = required
//     }
//     //????????????(??????)
//     if(!values.work_time_start){
//         errors.work_time_start = required
//     }else if(values.work_time_start && values.work_time_start.length !== 4) {
//         errors.work_time_start = '(???) 0900'
//     }
//     //????????????(??????)
//     if(!values.work_time_end){
//         errors.work_time_end = required
//     }else if(values.work_time_end && values.work_time_end.length !== 4) {
//         errors.work_time_end = '(???) 1800'
//     }
//     //????????????(??????)
//     // if(!values.work_rest_start){
//     //     errors.work_rest_start = required
//     // }else if(values.work_rest_start && values.work_rest_start.length !== 4) {
//     //     errors.work_rest_start = '(???) 1200'
//     // }
//     // //????????????(??????)
//     // if(!values.work_rest_end){
//     //     errors.work_rest_end = required
//     // }else if(values.work_rest_end && values.work_rest_end.length !== 4) {
//     //     errors.work_rest_end = '(???) 1300'
//     // }
//
//     return errors
// }

const selector = formValueSelector('update_sugubDetail');

function mapStateToProps(state, props) {
    const chae_cd = selector(state, 'chae_cd');
    const chae_gigan = selector(state, 'chae_gigan');
    const chae_gigan_type = selector(state, 'chae_gigan_type');
    const sugub_career_gb = selector(state, 'sugub_career_gb');
    const salary_gubun = selector(state, 'salary_gubun');
    if(props.match.params['sugubid']){ // ??????

    }else{ // ?????????
        delete props.location.state.sugub.id;
        delete props.location.state.sugub.sugub_status;
        delete props.location.state.sugub.manager;
    }
    return props.location.state && ({
        initialValues: {
            ...props.location.state.sugub,
            company_name_yn: props.location.state.sugub.jobadvertise[0] ? props.location.state.sugub.jobadvertise[0].company_name_yn : false,
            salary_yn: props.location.state.sugub.jobadvertise[0] ? props.location.state.sugub.jobadvertise[0].salary_yn : false,
            main_work_yn: props.location.state.sugub.jobadvertise[0] ? props.location.state.sugub.jobadvertise[0].main_work_yn : false,
            dpt_name_yn: props.location.state.sugub.jobadvertise[0] ? props.location.state.sugub.jobadvertise[0].dpt_name_yn : false,
            condition_yn: props.location.state.sugub.jobadvertise[0] ? props.location.state.sugub.jobadvertise[0].condition_yn : false,
            special_condition_yn: props.location.state.sugub.jobadvertise[0] ? props.location.state.sugub.jobadvertise[0].special_condition_yn : false,
        },
        comcode: state.comcode.comcode,
        chae_cd: chae_cd,
        sugub_career_gb: sugub_career_gb,
        salary_gubun: salary_gubun,
        chae_gigan: chae_gigan,
        chae_gigan_type: chae_gigan_type,
    })
}

export default connect(mapStateToProps)(reduxForm({
    form: "update_sugubDetail",
    enableReinitialize: true,
    validate: SugubDetailValidate,
    onSubmit: updateSugub,
    onSubmitSuccess: (result, dispatch)=>{
        history.push('/Company/Sugub');
    },
    onSubmitFail: (errors) => {
        console.log(errors);
        window.scrollTo(0, 0);
    },
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SugubFormDetail));
