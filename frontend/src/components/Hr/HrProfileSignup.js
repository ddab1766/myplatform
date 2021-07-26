import React, {useEffect, useState} from "react";
import {change, Field, initialize, reduxForm} from "redux-form";
import {renderAsyncCreatableSelectField, renderError, renderField, renderTextAreaField} from "../../utils/renderUtils";
import {updateHrProfile} from "../../actions/authActions";
import {connect, useSelector} from "react-redux";
import {Card, CardBody, CardHeader, Col, Container, Row, Spinner} from "reactstrap";
import FormHelperText from "@material-ui/core/FormHelperText";
import store from "../../store";
import history from "utils/historyUtils";
import DaumPostcode from "../Etc/DaumPostcode_mng";
import Chip from "@material-ui/core/Chip";

const HrProfileSignup = (props) => {
    const {handleSubmit, error, submitting} = props;
    let initialValues = store.getState().form.hrupdate.initial;
    const {comcode, hr} = useSelector(state => ({
            comcode: state.comcode.comcode,
            hr: state.auth.hr
        })
    );

    const [addressOptions, setAddressOptions] = useState(comcode.filter(v=> v.code_topidx === 'BE'));
    const [lowData, setLowData] = useState([]);

    useEffect(() => {
        if(!hr) return
        let newObj = [];
        addressOptions.filter(v => {
            hr.service_address.map(item => {
                if( v.code_id === item) newObj.push(v)
            })
        });
        setLowData(newObj)
    }, [addressOptions]);

    useEffect(()=>{
        if(lowData && lowData.length > 0 ){
            store.dispatch(change('hrupdate', 'service_address', lowData));
        }
    },[lowData]);

    const handleClick = (e, data, selected) => {
        // setLowData(service_address);
        if(selected){
            setLowData(lowData.concat(data));
            e.currentTarget.classList.add('MuiChip-primary');
            e.currentTarget.classList.remove('MuiChip-outlined');
        }else{
            setLowData(lowData.filter(v => v !== data));
            e.currentTarget.classList.add('MuiChip-outlined');
            e.currentTarget.classList.remove('MuiChip-primary');
        }
        // props.change('service_address', lowData)
    };

    return (
        <div className="content">
            <Container>
                <div className="title">
                    <h3>파트너 회사 정보를 등록해주세요.<br/>
                        <small>등록 후 파트너 전용 사이트로 이동하여 이력서를 접수하세요.</small>
                    </h3>
                </div>
                <hr/>
                <form className=""
                      onSubmit={handleSubmit}
                >

                    <Card>

                        <CardHeader>

                        </CardHeader>
                        {/* </AppBar> */}
                        <CardBody>
                            {/* EnterKey Prevent */}
                            <Row>
                                <Col md={6}>
                                    <fieldset className="form-group">
                                        <Field name="custname" label="회사명" component={renderAsyncCreatableSelectField}
                                               type="text"
                                               required={true}
                                               disabled={initialValues && initialValues.custname ? true : false}
                                        />
                                        {initialValues && initialValues.custname && (
                                            <FormHelperText>회사명 수정은 admin@chaegong.co.kr 로 문의해주세요</FormHelperText>
                                        )}
                                    </fieldset>
                                </Col>
                                <Col md={6}>
                                    <fieldset className="form-group">
                                        <Field name="custid" label="사업자번호" component={renderField}
                                               type="text"
                                               required={true}
                                               disabled={initialValues && initialValues.custid ? true : false}
                                        />
                                        {initialValues && initialValues.custid && (
                                            <FormHelperText>사업자번호 수정은 admin@chaegong.co.kr 로 문의해주세요</FormHelperText>
                                        )}
                                    </fieldset>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <fieldset className="form-group">
                                        <Field name="gross_total" label="매출액(억)/투자금액" component={renderField}
                                               type="number"
                                               required={true}
                                        />
                                    </fieldset>
                                </Col>
                                <Col md={6}>
                                    <fieldset className="form-group">
                                        <Field name="emp_count" label="임직원수(명)" component={renderField}
                                               type="number"
                                               required={true}
                                        />
                                    </fieldset>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <fieldset className="form-group">
                                        <Field name="manager_phone" label="담당자 연락처" component={renderField}
                                               type="text"
                                               required={true}
                                        />
                                    </fieldset>
                                </Col>
                            </Row>
                            <hr/>
                            {/*<fieldset className="form-group">
                                    <div style={{marginBottom: '20px',fontSize: '1.1em'}}>서비스 가능지역(중복가능)</div>
                                    {addressOptions.map( data => {
                                        if(lowData && lowData.length > 0){
                                            if(lowData.filter(v=> v.code_id === data.code_id).length > 0){
                                                return (
                                                    <Chip label={data.code_name}
                                                          value={data.code_id}
                                                        // onDelete={(e)=>console.log('e', e)}
                                                        // deleteIcon={<DoneIcon />}
                                                          onClick={(e) => {handleClick(e,data, false)}}
                                                          color="secondary"
                                                          variant="outlined"
                                                    />
                                                )
                                            }else{
                                                return (
                                                    <Chip label={data.code_name}
                                                          value={data.code_id}
                                                          onClick={(e) => handleClick(e,data, true)}
                                                          variant="outlined"
                                                    />
                                                )
                                            }
                                        } else {
                                            return (
                                                <>
                                                    <Chip label={data.code_name}
                                                          value={data.code_id}
                                                          onClick={(e) => handleClick(e,data,true)}
                                                          variant="outlined"
                                                    />
                                                </>
                                            )
                                        }
                                    })
                                    }
                                </fieldset>*/}
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
                                <Field name="load_addr" label="주소" component={renderField}
                                       type="text"
                                       labelSize={3}
                                       colSize={9}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <Field name="load_addr_detail" label="상세주소" component={renderField}
                                       type="text"
                                       labelSize={3}
                                       colSize={9}
                                />
                            </fieldset>

                            <fieldset className="form-group">
                                <Field name="introduce" label="회사소개" component={renderTextAreaField}
                                       type="text"
                                    // required={true}
                                />
                            </fieldset>

                            <fieldset className="form-group">
                                <Field name="homepage" label="홈페이지" component={renderField}
                                       type="text"
                                />
                            </fieldset>
                            <hr/>
                            {renderError(error)}

                        </CardBody>
                    </Card>
                    <div className="centered">
                        <button action="submit" className="btn btn-lg btn-primary" disabled={submitting}>
                            {submitting === true && (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />)
                            }등록
                        </button>
                    </div>
                </form>
            </Container>
        </div>
    )
};


const validate = values => {
    const errors = {};
    console.log('validate values', values)
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

    if(!values.phone){
        errors.phone = '필수입력 사항입니다.'
    }
    // if (!values.manager_email) {
    //     errors.manager_email = '필수입력 사항입니다.'
    // }
    // if (!values.manager_phone) {
    //     errors.manager_phone = '필수입력 사항입니다.'
    // }
    // errors.
    // if(!values.homepage){
    //
    // }else if(values.homepage && !validator.isURL(values.homepage)){
    //     errors.homepage = '올바른 URL주소를 입력해주세요'
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
                },
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
    history.push("/Hr/Profile");
    // dispatch(initialize('companyupdate', {}))
}

export default connect(mapStateToProps)(reduxForm({
    form: "hrupdate",
    validate,
    onSubmitSuccess: afterSubmit,
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: updateHrProfile
})(HrProfileSignup));

