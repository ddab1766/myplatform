import React, {useEffect, useRef, useState} from 'react'
import {change, Field, formValueSelector, reduxForm, reset, getFormSyncErrors} from 'redux-form'
import {renderSelectField} from "utils/renderUtils";
import {connect, useSelector} from "react-redux";
import store from "../../store";
import {Card, CardBody} from "reactstrap";
import Chip from "@material-ui/core/Chip";
import {renderError} from "../../utils/renderUtils";
import HrProfileValidate from "./HrProfileValidate";


const HrProfileFormStep1 = props => {
    const {handleSubmit, error, syncErrors, synchronousError } = props;
    const {services} = props;
    const {comcode} = useSelector(state => ({ comcode: state.comcode.comcode}));

    const [servicesOptions, setServicesOption] = useState(comcode.filter(v=> v.code_topidx === 'AC' & v.code_topcd === null));
    const [servicesData, setServicesData] = useState(services ? services : []);

    // 제공서비스
    useEffect(()=>{
        if(servicesData && servicesData.length >= 0 ){
            store.dispatch(change('hr_profile_wizard', 'services', servicesData));
        }
    },[servicesData]);

    const handleServicesClick = (e, data, selected) => {
        if(selected){
            setServicesData(servicesData.concat(data));
            e.currentTarget.classList.add('MuiChip-primary');
            e.currentTarget.classList.remove('MuiChip-outlined');
        }else{
            setServicesData(servicesData.filter(v => v !== data));
            e.currentTarget.classList.add('MuiChip-outlined');
            e.currentTarget.classList.remove('MuiChip-primary');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className="card card-sugub">
                <CardBody>
                    <fieldset className="form-group">
                        <div style={{marginBottom: '20px',fontSize: '1.1em'}}>제공 가능한 서비스를 모두 선택해주세요</div>
                        {servicesOptions.map( data => {
                            if(servicesData && servicesData.length > 0){
                                if(servicesData.filter(v=> v.code_id === data.code_id).length > 0){
                                    return (
                                        <Chip label={data.code_name}
                                              value={data.code_id}
                                            // onDelete={(e)=>console.log('e', e)}
                                            // deleteIcon={<DoneIcon />}
                                              onClick={(e) => {handleServicesClick(e,data, false)}}
                                              color="secondary"
                                              variant="outlined"
                                        />
                                    )
                                }else{
                                    return (
                                        <Chip label={data.code_name}
                                              value={data.code_id}
                                              onClick={(e) => handleServicesClick(e,data, true)}
                                              variant="outlined"
                                        />
                                    )
                                }
                            } else {
                                return (
                                    <>
                                        <Chip label={data.code_name}
                                              value={data.code_id}
                                              onClick={(e) => handleServicesClick(e,data,true)}
                                              variant="outlined"
                                        />
                                    </>
                                )
                            }
                        })}
                    </fieldset>
                    { renderError(error) }
                    <br/>
                </CardBody>
            </Card>

            <hr/>
            {services && services.length > 0 && (
                <div className="text-center">
                    <button type="submit" className="btn btn-info btn-lg">
                        다음
                        <span className="btn-label">
                            {/*<i className="nc-icon nc-minimal-right" />*/}
                            </span>
                    </button>
                </div>
            )}

        </form>
    )
}

const validateForm = values => {
    const errors = {};
    const {services} = values;
    if (services && services.length === 0 ) {
        errors.services = "필수 입력 사항입니다"
    }
    return errors;
};

function mapStateToProps(state, props) {
    const selector = formValueSelector('hr_profile_wizard');
    const services = selector(state, 'services');
    const syncErrors = getFormSyncErrors('hr_profile_wizard');
    // console.log('get syncErrors', syncErrors)

    return {
        comcode: state.comcode.comcode,
        services: services,
        synchronousError : syncErrors
    }
}
export default connect(mapStateToProps)(reduxForm({
    form: 'hr_profile_wizard',
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    // validate: validateForm
    validate: HrProfileValidate
})(HrProfileFormStep1))
