import React, {useEffect, useState} from 'react'
import {Field, formValueSelector, reduxForm} from 'redux-form'
import {connect} from "react-redux";
import {renderField} from "utils/renderUtils";
import {Card, CardBody} from "reactstrap";
import DaumPostcode from "../../Etc/DaumPostcode";
import {isMobile} from "react-device-detect";
import SugubValidate from "./SugubValidate";

const SugubFormStep6 = props => {
    const {handleSubmit, pristine, previousPage, submitting} = props;
    const [isSelected, setIsSelected] = useState(false);

    useEffect(()=>{
        if(props.work_load_addr === undefined || props.work_load_addr === '' || props.work_load_addr === null) {
            setIsSelected(false)
        }else{
            setIsSelected(true)
        }
    }, [props.work_load_addr]);
    return (
        <form onSubmit={handleSubmit}>
            {!isMobile ?
                <Card className="card card-sugub">
                    <CardBody>
                        <label>실근무지는 어디인가요?<small style={{color: "red"}}> 필수</small></label>
                        <div style={{display: isSelected ? "none" : null}}>
                            <DaumPostcode
                                // autoClose={ !isSelected ? false : true}
                                // animation={true}
                            />
                        </div>
                        <fieldset className="form-group">
                            <Field name="work_load_addr" label="" component={renderField}
                                   type="text"
                            />
                        </fieldset>
                        <label>나머지주소를 적어주세요</label>
                        <fieldset className="form-group">
                            <Field name="work_load_addr_detail" component={renderField}
                                   type="text"
                            />
                        </fieldset>
                        {/*<label>복리후생이 있다면 알려주세요</label>
                    <fieldset className="form-group">
                        <Field name="bokri" component={renderTextAreaField}
                               type="text"
                        />
                    </fieldset>*/}
                    </CardBody>
                </Card>
                :
                <>
                <label>실근무지는 어디인가요?<small style={{color: "red"}}> 필수</small></label>
                        <div style={{display: isSelected ? "none" : null}}>
                            <DaumPostcode
                                // autoClose={ !isSelected ? false : true}
                                // animation={true}
                            />
                        </div>
                        <fieldset className="form-group">
                            <Field name="work_load_addr" label="" component={renderField}
                                   type="text"
                            />
                        </fieldset>
                        <label>나머지주소를 적어주세요</label>
                        <fieldset className="form-group">
                            <Field name="work_load_addr_detail" component={renderField}
                                   type="text"
                            />
                        </fieldset>
                </>
            }
            <div className="ml-auto text-center">
                <button type="button" className="btn btn-lg btn-outline-info" onClick={previousPage}>
                    <span className="btn-label">
                      {/*<i className="nc-icon nc-minimal-left" />*/}
                    </span>
                    이전
                </button>
                <button type="submit" className="btn btn-info btn-lg">
                    다음
                    <span className="btn-label">
                      {/*<i className="nc-icon nc-minimal-right" />*/}
                    </span>
                </button>
            </div>
        </form>
    )
}

const selector = formValueSelector('sugub_wizard');

function mapStateToProps(state, props) {
    const work_load_addr = selector(state, 'work_load_addr');
    return {
        work_load_addr: work_load_addr
    }
}
export default connect(mapStateToProps)(reduxForm({
    form: 'sugub_wizard',
    // enableReinitialize: true,
    onSubmitSuccess: () => {
        window.scrollTo(0, 0)
    },
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    //enableReinitialize: true,
    // validate: validateSugubForm
    validate: SugubValidate
})(SugubFormStep6))

