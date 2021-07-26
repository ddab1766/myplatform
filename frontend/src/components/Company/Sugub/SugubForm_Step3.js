import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Card, CardBody} from "reactstrap";
import {renderTextAreaField} from "../../../utils/renderUtils";
import SugubValidate from "./SugubValidate";


const SugubFormStep3 = props => {
    const {handleSubmit, previousPage} = props;


    return (
        <form onSubmit={handleSubmit}>
            <Card className="card card-sugub">
                <CardBody>
                    <fieldset className="form-group">
                        <Field name="work_role" label="담당업무를 입력해주세요" component={renderTextAreaField}
                               required={true}
                               type="text"
                               placeholder={
                                   "(예) 비용정산, 세금계산서 처리\n(예) 프로젝트 서류 지원\n(예) 기타 팀지원 업무"}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="spec" label="필수요청 및 우대사항이 있다면 입력해주세요" component={renderTextAreaField}
                               // required={true}
                               type="text"
                               placeholder={"(예) 즉시 출근 및 즉시 면접 가능자\n(예) 근거리 거주자 우대"}
                        />
                    </fieldset>
                </CardBody>
            </Card>
            <hr/>
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
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    // validate: validateSugubForm
    validate: SugubValidate
})(SugubFormStep3)
