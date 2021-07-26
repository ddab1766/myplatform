import React, {useEffect, useState} from 'react'
import {change, Field, formValueSelector, initialize, reduxForm} from 'redux-form'
// import validateSugubForm from '../Validate_SugubForm'
import {connect, useSelector} from "react-redux";
import {Card, CardBody, Col, Row, Spinner} from "reactstrap";
import {hrProfileFormSubmit, updateHrSpecial} from "../../actions/userActions";
import store from "../../store";
import Chip from "@material-ui/core/Chip";
import {
    renderAsyncCreatableSelectField,
    renderError,
    renderField,
    renderRadioField,
    renderTextAreaField
} from "../../utils/renderUtils";
import {required} from "redux-form-validators";
import FormHelperText from "@material-ui/core/FormHelperText";
import HrProfileValidate from "./HrProfileValidate";


const HrProfileFormStep4 = props => {
    const {handleSubmit, pristine, previousPage, submitting, error} = props;
    const {comCode} = props;
    const {cust_gubun} = props;

    useEffect(()=>{
        if(props.cust_gubun === 'CI0100000'){
            props.change('cust_gubun', cust_gubun)
        } else if(props.cust_gubun === 'CI0200000') { // 채용대행
            props.change('cust_gubun', cust_gubun)
        }
    }, [cust_gubun]);

    console.log('HrProfileFormStep4 chae_gubun', cust_gubun)
    return (
        <form onSubmit={handleSubmit}>
            <Card className="card card-sugub">
                <CardBody>
                    <label>사업자유형이 어떻게 되나요?<small style={{color:"red"}}> 필수</small></label>
                    <fieldset className="form-group">
                        <Field name="cust_gubun" component={renderRadioField}
                               code_topidx='CI'
                               code_topcd={null}
                               options={comCode}
                               selectValue={cust_gubun}
                               validate={[required({message: "필수 입력사항입니다."})]}
                               type="radio"
                        />
                    </fieldset>
                    { renderError(error) }

                </CardBody>
            </Card>
            <div className="text-center">
                <button type="button" className="btn btn-lg btn-outline-info" onClick={previousPage}>
                    <span className="btn-label">
                      {/*<i className="nc-icon nc-minimal-left" />*/}
                    </span>
                    이전
                </button>
                <button action="submit" className="btn btn-lg btn-info">
                    다음
                    <span className="btn-label">
                      {/*<i className="nc-icon nc-minimal-right" />*/}
                    </span>
                </button>
            </div>
        </form>

    )
};




function mapStateToProps(state, props) {
    const selector = formValueSelector('hr_profile_wizard');
    const cust_gubun = selector(state, 'cust_gubun');
    return {
        cust_gubun: cust_gubun
    }
}


export default connect(mapStateToProps, {})(reduxForm({
    form: 'hr_profile_wizard', //Form name is same
    // enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate: HrProfileValidate
    // onSubmitSuccess: afterSubmit,
    // onSubmit: updateHrProfile
})(HrProfileFormStep4))

