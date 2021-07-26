import React from 'react'
import {initialize, reduxForm} from 'redux-form'
// import validateSugubForm from '../Validate_SugubForm'
import {connect} from "react-redux";
import {Card, CardBody, Spinner} from "reactstrap";
import {hrProfileFormSubmit, updateHrSpecial} from "../../actions/userActions";
import HrProfileValidate from "./HrProfileValidate";


const HrProfileFormStep6 = props => {
    const {handleSubmit, pristine, previousPage, submitting} = props;

    return (
        <form onSubmit={handleSubmit}>
            <Card className="card card-sugub text-center">

                <CardBody>
                    <div className="centered">
                        <img
                            alt="..."
                            className="border-gray centered"
                            width={"200px"}
                            src={require("assets/img/undraw_well_done_i2wr.svg")}
                        />
                    </div>
                    <br/>
                    <br/>
                    <h3>
                        모든 정보를 입력 완료하셨습니다.<br/>
                        <small>아래 등록버튼을 눌러주세요.</small>
                    </h3>
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
                      <i className="nc-icon nc-check-2" />
                    </span>
                    등록
                </button>
            </div>

        </form>
    )
}

function mapStateToProps(state, props) {
    return {
        initialValues: {
            ...state.form.hr_profile_wizard.values,
        }
    }
}

const afterSubmit = (result, dispatch, props) => {
    dispatch(initialize('hr_profile_wizard', {}));
}


export default connect(mapStateToProps, {})(reduxForm({
    form: 'hr_profile_wizard',
    destroyOnUnmount: false,
    enableReinitialize: true,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    onSubmitSuccess: afterSubmit,
    onSubmit: hrProfileFormSubmit,
})(HrProfileFormStep6))

