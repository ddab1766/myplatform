import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Card, CardBody} from "reactstrap";
import {renderMuiDateField} from "../../../utils/renderUtils";
import SugubValidate from "./SugubValidate";

const SugubFormStep7 = props => {
    const {handleSubmit, pristine, previousPage, submitting} = props;
    const {comCode} = props;

    return (
        <form onSubmit={handleSubmit}>
            <Card className="card card-sugub">
                <CardBody>
                    <fieldset className="form-group">
                        <Field name="sugub_end_dt" label="채용마감일(서류접수마감일)은 언제인가요?" component={renderMuiDateField}
                               required={true}
                        />
                    </fieldset>
                    {/*<p>SugubForm_Step7</p>*/}
                    {/*<label>선호하는 성별이 있으신가요?</label>*/}
                    {/*<fieldset className="form-group">
                        <Field name="sugub_gender" component={renderRadioField}
                               code_topidx='AQ'
                               code_topcd={null}
                               options={comCode}
                               label="선호하는 성별이 있으신가요?"
                               required={true}
                               type="radio"
                        />
                    </fieldset>*/}
                </CardBody>
            </Card>

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


export default reduxForm({
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
})(SugubFormStep7)

