import React from 'react'
import {reduxForm} from 'redux-form'
import {connect} from "react-redux";
import {sugubFormSubmit} from "../../../actions/sugubActions";
import {Card, CardBody, Spinner} from "reactstrap";
import SugubValidate from "./SugubValidate";


const SugubFormStep8Finish = props => {
    const {handleSubmit, pristine, previousPage, submitting} = props;
    console.log('step8_finish props:',props);

    return (
        <form onSubmit={handleSubmit}>
            <Card className="card card-sugub text-center">
                <h3>채용의뢰서 작성이 완료되었습니다.</h3>
                <div className="centered">
                    요청버튼을 누르면 담당자가 확인 후 채용이 진행됩니다.
                </div>
                {/*<CardHeader>채용의뢰서 작성이 완료되었습니다.</CardHeader>*/}
                <CardBody>
                    <div className="centered">
                        <img
                            alt="..."
                            className="border-gray centered"
                            width={"250px"}
                            src={require("assets/img/undraw_well_done_i2wr.svg")}
                        />
                    </div>
                    <br/>
                    <br/>

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

function mapStateToProps(state, props) {
    return {
        initialValues: {
            ...state.form.sugub_wizard.values,
            companyprofile: state.auth.company.id
        }
        // company: state.auth.company
    }
}

const afterSubmit = (result, dispatch, props) => {
    // store.dispatch(reset('sugub_wizard'));
    // store.dispatch(reset('sugub_create_wizard'));
    // dispatch(initialize('sugub_wizard', {}))
    // dispatch(initialize('sugub_create_wizard', {}))
    // history.push("/Company/Sugub")
    console.log('afterSubmit..! props', props)
    // props.nextPage()
}


export default connect(mapStateToProps, {})(reduxForm({
    // form: 'sugub_create_wizard',
    form: 'sugub_wizard',
    destroyOnUnmount: false,
    enableReinitialize: true,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate: SugubValidate,
    // onSubmitSuccess: afterSubmit,
    // onSubmit: postSugub,
    onSubmit: sugubFormSubmit,
})(SugubFormStep8Finish))

