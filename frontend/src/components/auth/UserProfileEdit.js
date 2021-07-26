import React, {useEffect, useState} from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from 'react-redux'
import {renderError, renderField, renderRadioField, renderSelectField,} from "../../utils/renderUtils";
import {updateUserProfile} from "../../actions/authActions";
import {Container, Spinner} from "reactstrap"

const UserProfileEdit = (props) => {
    const {handleSubmit, error, submitting} = props;
    const [comCode, setComcode] = useState([]);

    useEffect(() => {
        if(props.comcode) setComcode(props.comcode.filter(v=> v.code_topidx === 'BE' || v.code_topidx === 'BX'))
    }, []);


    return (
        <div className="content">
            <Container>
                <form
                    className="mx-3"
                    onSubmit={handleSubmit}
                    // onSubmit={onSubmit}
                >
                    <h3 className="text-md-left">프로필을 완성해주세요.<br/>
                        <small>추천인/후보자들에게 좋은 일자리를 제공하기 위해, 다음 정보를 입력하면 매칭 확률이 올라갑니다.</small>
                    </h3>
                    <hr/>
                    <fieldset className="form-group">
                        <Field name="username" label="이름" component={renderField}
                               type="text"
                        />
                    </fieldset>

                    <label>성별</label>
                    <fieldset className="form-group">
                        <label>
                            <Field name="gender" component={renderRadioField}
                                   type="radio" value="M" label={'남자'}
                            />
                        </label>
                        <label>
                            <Field name="gender" component={renderRadioField}
                                   type="radio" value="F" label={'여자'}
                            />
                        </label>
                        {/*<Field name="gender" component={renderError} />*/}
                    </fieldset>
                    <fieldset className="form-group">
                        <Field name="address" label="거주지역" component={renderSelectField}
                               type="text"
                               code_topidx="BE"
                               code_topcd={null}
                               options={comCode}
                               disableOption="거주지역을 선택해주세요."
                        />
                    </fieldset>
                    <fieldset className="form-group">
                        <Field name="education_level" label="학력" component={renderSelectField}
                               type="text"
                               code_topidx="BX"
                               code_topcd={null}
                               options={comCode}
                               disableOption="학력을 선택해주세요."
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="phone" label="연락처" component={renderField}
                               type="text" placeholder={"ex) 010-0000-0000"}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="date_of_birth" label="생년월일" component={renderField}
                               type="text" placeholder={"ex) 1989-09-06 "}
                        />
                    </fieldset>
                    {renderError(error)}
                    <fieldset className="form-group">

                        <button action="submit"
                                className="btn btn-primary"
                                disabled={submitting}
                        >
                            {submitting === true && (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />)
                            }저장
                        </button>
                    </fieldset>

                </form>
            </Container>
        </div>
    )
}

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = '필수입력 항목입니다.'
    } else if (!values.phone) {
        errors.phone = '필수입력 항목입니다.'
    } else if (!values.date_of_birth) {
        errors.date_of_birth = '필수입력 항목입니다.'
    }

    return errors
};

function mapStateToProps(state, props) {
    return {
        // initialValues: state.auth.user,
        initialValues: props.location.state.user,
        comcode: state.comcode.comcode
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: "update_user_profile",
    enableReinitialize: true,
    destroyOnUnmount: false,
    // forceUnregisterOnUnmount: true,
    validate,
    onSubmit: updateUserProfile
})(UserProfileEdit));
