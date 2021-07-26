import React, {useEffect, useState} from 'react'
import {change, Field, formValueSelector, initialize, reduxForm} from 'redux-form'
import {required} from "redux-form-validators"
import {connect, useSelector} from "react-redux";
import {Card, CardBody, Col, Row, Spinner} from "reactstrap";
import Chip from "@material-ui/core/Chip";
import store from "../../store";
import {renderError} from "../../utils/renderUtils";
import {Checkbox} from "rsuite";
import HrProfileValidate from "./HrProfileValidate";


const HrProfileFormStep3 = props => {
    const {handleSubmit, pristine, previousPage, submitting, error} = props;
    const {service_address} = props;

    const {comcode} = useSelector(state => ({ comcode: state.comcode.comcode}));
    const [addressOptions, setAddressOptions] = useState(comcode.filter(v=> v.code_topidx === 'BE'));
    const [addressData, setAddressData] = useState(service_address ? service_address : []);

    // 서비스 가능 지역
    useEffect(()=>{
        if(addressData && addressData.length >= 0 ){
            store.dispatch(change('hr_profile_wizard', 'service_address', addressData));
        }
    },[addressData]);

    const handleClick = (e, data, selected) => {
        if(selected){
            setAddressData(addressData.concat(data));
            e.currentTarget.classList.add('MuiChip-primary');
            e.currentTarget.classList.remove('MuiChip-outlined');
        }else{
            setAddressData(addressData.filter(v => v !== data));
            e.currentTarget.classList.add('MuiChip-outlined');
            e.currentTarget.classList.remove('MuiChip-primary');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className="card card-sugub">
                <CardBody>
                    <div style={{marginBottom: '20px',fontSize: '1.1em'}}>서비스 가능한 지역을 선택해주세요.(중복가능)</div>
                    <Checkbox onChange={(e, checked)=>{
                        if(checked) setAddressData(comcode.filter(v=> v.code_topidx === 'BE'))
                        else {
                            setAddressData([])
                        }
                    }}
                    > 전국
                    </Checkbox>
                    {addressOptions.map( data => {
                        if(addressData && addressData.length > 0){
                            if(addressData.filter(v=> v.code_id === data.code_id).length > 0){
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
                    })}
                </CardBody>
                { renderError(error) }
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
}

function mapStateToProps(state, props) {
    const selector = formValueSelector('hr_profile_wizard');
    const service_address = selector(state, 'service_address');
    return {
        service_address: service_address
    }
}

export default connect(mapStateToProps, {})(reduxForm({
    form: 'hr_profile_wizard', //Form name is same
    // enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate: HrProfileValidate,
})(HrProfileFormStep3))

