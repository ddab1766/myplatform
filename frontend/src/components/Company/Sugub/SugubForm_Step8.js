import React from 'react'
import {Field, initialize, reduxForm} from 'redux-form'
import {renderField,} from "utils/renderUtils";
import {required} from "redux-form-validators"
import {connect} from "react-redux";
import {sugubFormSubmit} from "../../../actions/sugubActions";
import {Card, CardBody, Spinner} from "reactstrap";
import {renderAsyncCreatableSelectField} from "../../../utils/renderUtils";
import CompanyProfileValidate from "../CompanyProfileValidate";


const SugubFormStep8 = props => {
    const {handleSubmit, pristine, previousPage, submitting} = props;
    console.log('step8 props', props)

    return (
        <form onSubmit={handleSubmit}>
            <Card className="card card-sugub">
                <CardBody>
                    <fieldset className="form-group">
                        <Field name="custname" label="회사이름" component={renderAsyncCreatableSelectField}
                               type="text"
                               required={true}
                               validate={[required({message: "필수 입력사항입니다."})]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="phone" component={renderField}
                               label="연락처"
                               type="text"
                               required={true}
                               placeholder={'(예) 010-0000-0000'}
                               validate={[required({message: "필수 입력사항입니다."})]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="custid" label="사업자번호" component={renderField}
                               type="text"
                        />
                    </fieldset>
                </CardBody>
            </Card>
            <div className="text-center">
                <button type="button" className="btn btn-lg btn-outline-info" onClick={previousPage}>
                    <span className="btn-label">
                      {/*<i className="nc-icon nc-minimal-left" />*/}
                    </span>
                    이전
                </button>
                <button action="submit" className="btn btn-lg btn-info" disabled={submitting}>
                    {submitting === true && (
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />)
                    }
                    <span className="btn-label">
                      {/*<i className="nc-icon nc-check-2" />*/}
                    </span>
                    요청
                </button>
            </div>
        </form>
    )
}

const afterSubmit = (result, dispatch, props) => {
    console.log('SugubFormStep8 afterSubmit', result);
    dispatch(initialize('sugub_wizard', {}));
    dispatch(initialize('sugub_create_wizard', {}));
    // history.push("/Company/Sugub");
}


function mapStateToProps(state) {
    return {
        initialValues: {
            ...state.form.sugub_wizard.values,
            // user: state.auth.user,
        },
    }
}

export default connect(mapStateToProps, {})(reduxForm({
    form: 'sugub_wizard', //Form name is same
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    // validate: validateSugubForm,
    validate: CompanyProfileValidate,
    onSubmitSuccess: afterSubmit,
    // onSubmit: updateSugubCompany
    onSubmit: sugubFormSubmit
})(SugubFormStep8))

