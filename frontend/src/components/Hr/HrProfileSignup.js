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
                    <h3>????????? ?????? ????????? ??????????????????.<br/>
                        <small>?????? ??? ????????? ?????? ???????????? ???????????? ???????????? ???????????????.</small>
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
                                        <Field name="manager_phone" label="????????? ?????????" component={renderField}
                                               type="text"
                                               required={true}
                                        />
                                    </fieldset>
                                </Col>
                            </Row>
                            <hr/>
                            {/*<fieldset className="form-group">
                                    <div style={{marginBottom: '20px',fontSize: '1.1em'}}>????????? ????????????(????????????)</div>
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
                                <Field name="introduce" label="????????????" component={renderTextAreaField}
                                       type="text"
                                    // required={true}
                                />
                            </fieldset>

                            <fieldset className="form-group">
                                <Field name="homepage" label="????????????" component={renderField}
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
                            }??????
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

    if(!values.phone){
        errors.phone = '???????????? ???????????????.'
    }
    // if (!values.manager_email) {
    //     errors.manager_email = '???????????? ???????????????.'
    // }
    // if (!values.manager_phone) {
    //     errors.manager_phone = '???????????? ???????????????.'
    // }
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

